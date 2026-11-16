---
title: AI Workbench and code mode
layout: bundle
outputs:
  - html
  - json
  - markdown
sector:
  - app_enablement
weight: 55
---

AI Workbench is a microservice that provides code mode for AI agents. In code mode, an agent writes and runs code against the {{< product-c8y-iot >}} APIs instead of calling a separate tool for every API operation. AI Workbench runs this code in an isolated sandbox and only returns the result to the agent.

AI Workbench is an MCP server with a single tool, `codemode`. You can assign this tool to agents in the AI Agent Manager or connect to AI Workbench from any MCP-capable client.

![The codemode tool of AI Workbench on the Tools page](/images/agents/ai_workbench_codemode_tool.png)

### What is code mode? {#what-is-code-mode}

With classic tool calling, every tool call is a round trip to the LLM: the model calls a tool, receives the complete result into its context, and then decides on the next call. Tasks that need many steps or process large data sets therefore cost many round trips and many tokens.

In code mode, the agent writes a small asynchronous JavaScript function instead. The function finds the APIs the agent needs, calls them, and combines the results. Only the return value of the function goes back to the model. As a result, agents:

- Solve multi-step tasks with fewer round trips to the model.
- Use fewer tokens, because intermediate data stays in the sandbox.
- Produce more consistent results, especially when they work with large data sets or chain many API calls.

For example, to find the devices with an active critical alarm that run outdated firmware, the agent can run the following function in a single tool call:

```js
async () => {
  // A server-side query does the heavy lifting...
  const { alarms } = await c8y.getAlarmCollectionResource({
    status: 'ACTIVE', severity: 'CRITICAL', pageSize: 100,
  })
  const deviceIds = [...new Set(alarms.map(a => a.source.id))]

  // ...and code combines the APIs only for the small remainder.
  const outdated = []
  for (const id of deviceIds) {
    const mo = await c8y.getManagedObjectResource({ id })
    if (mo.c8y_Firmware?.version !== '4.2.0') {
      outdated.push({ id, name: mo.name, version: mo.c8y_Firmware?.version })
    }
  }
  return { outdated }
}
```

With classic tool calling, each of these API calls would be a separate round trip through the LLM.

### Available APIs {#available-apis}

Inside the sandbox, every API is available as a typed method, grouped in namespaces:

- `c8y`: The {{< product-c8y-iot >}} core REST API, for example, inventory, alarms, events, measurements, identity, device control, users, tenants, and audit logs. This namespace is always available.
- One namespace for each microservice in your tenant that provides an OpenAPI specification or an MCP server, for example, `dtm` for the Digital Twin Manager. If a microservice provides both, its MCP server is used.

Each method takes a single object as input: path, query, and header parameters are top-level keys, and the request payload is passed as `body`.

The agent discovers the available APIs at runtime with the following functions, which are also available in the sandbox:

- `codemode.describe()`: Lists the namespaces available in your tenant. `codemode.describe("<namespace>")` lists all methods of a namespace, and `codemode.describe("<namespace>.<method>")` shows the input and output types of a method.
- `codemode.search()`: Searches the methods by name, REST path, summary, and description.
- `docs.search()` and `docs.read()`: Search and read documentation topics, for example, the syntax of the inventory query language.

The description of the `codemode` tool explains this workflow to the model, so you don't need to describe it in the system prompt of your agents.

AI Workbench discovers the APIs of your tenant automatically and caches them for up to 30 minutes. After you subscribe to a new microservice, you can refresh the cache immediately with `POST /service/ai-workbench/refresh-apis`.

### Security and limits {#security-and-limits}

- The code runs in an isolated V8 sandbox without network access. Every API call passes through a single gate that adds the authentication of the user.
- API calls run with the permissions of the user who uses the agent or the MCP client. The code cannot access more data than the user, but it can change or delete data the user has access to.
- To discover the available APIs, AI Workbench uses its own service user with read permissions. This only determines which APIs are listed, not which data an agent can access.
- Each run is limited to 120 seconds of runtime, 50 seconds of CPU time, and 200 calls of APIs and discovery functions. The memory of the sandbox is limited as well.

{{< c8y-admon-important >}}
The [AI agent availability switch](/ai/control-panel/#ai-agent-availability) of the control panel blocks all agents of the AI Agent Manager, including their use of code mode. It does not block MCP clients that connect to AI Workbench directly. To prevent direct access, unsubscribe your tenant from the AI Workbench microservice.
{{< /c8y-admon-important >}}

### Prerequisites {#prerequisites}

The `ai-workbench` microservice must be available in your tenant. You can check this in the Administration application under **Ecosystem** > **Microservices**.

### Using code mode in agents {#using-code-mode-in-agents}

AI Workbench announces its MCP server in its microservice manifest. The AI Agent Manager discovers it automatically and lists it as the `ai-workbench` MCP server. No further configuration is required.

To use code mode in an agent:

1. Navigate to **AI Agent Manager** > **Agents** and open a custom text agent.
2. Open the **Tools** tab.
3. Search for `codemode` and select the tool.
4. Click **Save**.

The `codemode` tool covers the complete API of your tenant, so the agent usually doesn't need the individual built-in tools for the same data. You can still combine it with other tools.

To try code mode without creating an agent, navigate to **AI Agent Manager** > **Tools**, select the `codemode` tool, and ask a question in the chat, for example, "How many devices are registered in my tenant?". Because the code can change data, you are asked to approve each run unless you select **Auto** below the message field.

### Connecting MCP clients {#connecting-mcp-clients}

You can also use AI Workbench from MCP-capable clients outside of {{< product-c8y-iot >}}, for example, AI coding assistants or desktop chat applications. Use the following connection details:

- **URL**: `https://<your-tenant-domain>/service/ai-workbench/mcp`
- **Transport**: Streamable HTTP
- **Authentication**: An `Authorization` header with every request, either Basic authentication with your {{< product-c8y-iot >}} credentials or a Bearer token. With a session cookie only, the code runs, but its API calls fail.

For example, a configuration for an MCP client could look like this. The exact format depends on your client:

```json
{
  "mcpServers": {
    "cumulocity": {
      "type": "http",
      "url": "https://<your-tenant-domain>/service/ai-workbench/mcp",
      "headers": {
        "Authorization": "Basic <base64 of tenantId/username:password>"
      }
    }
  }
}
```

Besides the `codemode` tool, the server provides the prompt `code-mode-guide`, which explains the workflow and lists the namespaces available in your tenant.

{{< c8y-admon-info >}}
When you connect an external MCP client, the LLM of that client processes the data returned by code mode. The model configuration of the AI Agent Manager does not apply to such clients.
{{< /c8y-admon-info >}}

### Making your microservice available in code mode {#making-your-microservice-available}

If you develop your own microservice, you can make its API available in code mode:

- **OpenAPI specification**: Add the `openApiSpec` property to the manifest of your microservice. It contains the path of the OpenAPI specification relative to the microservice, for example, `"openApiSpec": "/v3/api-docs"`. For several specifications, use an array of objects with a `label` and a `path`. Each operation becomes a method named after its `operationId`, so use unique and descriptive operation IDs.
- **MCP server**: Expose an MCP server with the `exposeMcpServers` property of the manifest, using the transport type `http`. The tools of the server become available in code mode and in the AI Agent Manager, see [MCP servers](/ai/tools-mcp/#mcp-servers).

To hide an operation of your OpenAPI specification from code mode, add the vendor extension `x-workbench-exclude: true` to the operation.
