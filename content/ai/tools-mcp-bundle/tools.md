---
weight: 10
title: Tools
layout: redirect
---

Tools are actions that AI agents perform to access data or execute operations. They enable agents to interact with {{< product-c8y-iot >}} and external systems beyond just generating text responses.

![Default tools can be tested in the detail view](/images/agents/mcp_tool_details.png)

### What are tools? {#what-are-tools}

A tool is a function that an agent calls during a conversation to:

- Query device data or measurements.
- Retrieve information from {{< product-c8y-iot >}} APIs.
- Execute operations or commands.
- Access external services or databases.

When you ask an agent a question that requires data, the agent determines which tools to use, calls them with appropriate parameters, and incorporates the results into its response.

**Example conversation:**

User: "What is the current temperature of device 12345?"

Agent process:

1. Recognizes it needs device data.
2. Calls the "get device measurements" tool with device ID 12345.
3. Receives the measurement data.
4. Formulates a natural language response: "The current temperature is 23.5°C."

### Using and testing built-in {{< product-c8y-iot >}} tools {#builtin-tools}

The AI Agent Manager provides default tools for accessing {{< product-c8y-iot >}} data. They are provided by the `cumulocity-default` MCP server and include, among others:

- **Inventory**: Search, retrieve, create, update, and delete managed objects such as devices, and list their child objects.
- **Measurements**: Find the supported series of a device, retrieve measurements, and create measurements.
- **Alarms and events**: Raise and list alarms and events, and update the status of alarms.
- **Operations**: Execute and list operations, and request device actions such as a restart, a shell command, or a log file.
- **API requests**: Send GET requests to the {{< product-c8y-iot >}} REST API.
- **Further tools**: Read and update tenant options, send emails, read the {{< product-c8y-iot >}} documentation, and call other agents.

{{< c8y-admon-important >}}
These tools access and also change the data that the executing user has access to. Test such tools in a testing environment.
{{< /c8y-admon-important >}}

These tools are available automatically and require no additional configuration. They always use the authorization of the current user and therefore cannot access more data than the user accesses. However, be aware that they change or delete data.

To give an agent access to the complete API of your tenant through a single tool, use the `codemode` tool of [AI Workbench](/ai/ai-workbench/).

### Testing tools {#testing-tools}

To test a tool:

1. Navigate to **AI Agent Manager** > **Tools**. The list shows all tools of all configured MCP servers, with the name of the MCP server as a tag.
2. Select a tool. The details show the description of the tool.
3. Optionally, click **Show details** to see the tool properties, such as its parameters, and the MCP server that provides the tool.
4. Enter a message in the chat to test the tool. A test agent calls the tool and shows the results.

Tools that may delete or overwrite data ask for your approval before they run, unless you select **Auto** below the message field.

### Assigning tools to agents {#assigning-tools}

To enable an agent to use tools:

1. Navigate to **AI Agent Manager** > **Agents** and open the agent.
2. Navigate to the **Tools** tab.
3. Browse or search the available tools.
4. Select the tools the agent needs.
5. Click **Save**.

The agent now accesses these tools during conversations when needed.

{{< c8y-admon-info >}}
Object agents cannot use custom tools. They use tools internally to structure their responses according to the defined schema.
{{< /c8y-admon-info >}}


### Best practices {#best-practices}

- **Tool selection**: Assign only the tools an agent actually needs. Too many tools confuse the agent and increase processing time.

- **Performance**: Tools that take a long time to execute slow down agent responses. Optimize tool performance or use caching where appropriate.
