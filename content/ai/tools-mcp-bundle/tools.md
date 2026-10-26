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

Before you test, select under **User approval when testing this tool** whether the test agent asks for your approval before calling the tool: **Never**, **If risky** (the default), or **Always**. For the meaning of each option, see [Requiring user approval](#user-approval).

### Assigning tools to agents {#assigning-tools}

To enable an agent to use tools:

1. Navigate to **AI Agent Manager** > **Agents** and open the agent.
2. Navigate to the **Tools** tab.
3. Browse or search the available tools.
4. Select the tools the agent needs.
5. Click **Save**.

The agent now accesses these tools during conversations when needed. The first tool you select requires user approval for every call. To change this, see [Requiring user approval](#user-approval).

{{< c8y-admon-info >}}
Object agents cannot use custom tools. They use tools internally to structure their responses according to the defined schema.
{{< /c8y-admon-info >}}

### Requiring user approval {#user-approval}

Before an agent calls a tool, it can pause and ask the chat user to approve the call. The user sees the tool and its parameters, and approves or denies the call. This lets a person check calls that change data or contact external systems before they run.

User approval is required by default. A tool call runs without approval only when the tool declares that it only reads data and doesn't contact external systems, or when the agent configuration explicitly turns approval off for the tool.

#### What tools declare about themselves {#tool-declarations}

The developer of an MCP server can describe what each tool does, as hints defined by the [Model Context Protocol](https://modelcontextprotocol.io/specification/2026-07-28/schema#tool-annotations). In the **Tools** tab of an agent, each tool shows these hints as tags:

| Tag | Meaning |
|---|---|
| **Read-only** | The tool only reads data. |
| **Changes data** | The tool adds or changes data but doesn't delete or overwrite it. |
| **Destructive** | The tool may delete or overwrite data. |
| **External systems** | The tool may contact systems outside {{< product-c8y-iot >}}, for example to send an email. |
| **Not declared** | The tool declares nothing, so it counts as both **Destructive** and **External systems**. |

A hint the tool doesn't declare counts as the riskier option:

- A tool that doesn't declare that it is read-only counts as changing data.
- A tool that doesn't declare that it is non-destructive counts as destructive.
- A tool that doesn't declare that it stays inside {{< product-c8y-iot >}} counts as contacting external systems.

{{< c8y-admon-important >}}
The MCP server that provides a tool also provides its hints. {{< product-c8y-iot >}} can't verify them. Assign tools only from MCP servers you trust.
{{< /c8y-admon-important >}}

#### Approval options {#approval-options}

For each tool, an agent uses one of the following options:

| Option | Behavior |
|---|---|
| **Never** | The tool runs without asking for approval, even when it changes data. |
| **If risky** | The chat user approves calls to tools that are **Destructive** or contact **External systems**. Tools that declare nothing count as risky. |
| **Always** | The chat user approves every call to the tool. |

#### Setting user approval for an agent {#setting-user-approval}

To set user approval for an agent:

1. Navigate to **AI Agent Manager** > **Agents** and open the agent.
2. Navigate to the **Tools** tab.
3. Under **User approval for all tools**, select an option. It applies to every tool the agent uses.
4. To set one tool differently, select **Override for this tool** on its row and select an option for the tool. The tool's own option starts at what its hints suggest:
    - **Always** if the tool may be **Destructive** or contact **External systems**.
    - **Never** if the tool is **Read-only** and doesn't contact external systems.
    - **If risky** otherwise.
5. Click **Save**.

To put a tool back on the agent's setting, clear **Override for this tool**.

When you select the first tool of an agent, **User approval for all tools** is set to **Always**. If the agent already uses tools with different settings, for example because it was configured through the REST API, no option is selected until you select one for all tools.

#### User approval in the chat {#user-approval-in-the-chat}

Below the message field of a chat, users select how approval requests are handled. With **Manual**, the user approves each call. With **Auto**, calls of tools set to **If risky** run without asking. Calls of tools set to **Always** still ask for approval every time, even with **Auto**.

#### Agents configured through the REST API {#user-approval-rest-api}

An agent configured through the REST API without any approval settings requires approval for every tool call, unless the tool declares that it only reads data and doesn't contact external systems. In the chat, **Auto** answers these approval requests.

Applications that call an agent through the REST API must handle approval requests: the agent stops at the tool call and returns an approval request. To continue, the application sends the conversation again, including the user's decision.

### Best practices {#best-practices}

- **Tool selection**: Assign only the tools an agent actually needs. Too many tools confuse the agent and increase processing time.

- **Performance**: Tools that take a long time to execute slow down agent responses. Optimize tool performance or use caching where appropriate.

- **User approval**: Keep **Always** for tools that change important data or contact external systems. Use **Never** only for tools that can't do harm, such as read-only tools that stay inside {{< product-c8y-iot >}}.
