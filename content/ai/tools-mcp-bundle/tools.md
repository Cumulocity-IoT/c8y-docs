---
weight: 10
title: Tools
layout: redirect
---

Tools are actions that AI agents perform to access data or execute operations. They enable agents to interact with {{< product-c8y-iot >}} and external systems beyond just generating text responses.

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

The AI Agent Manager provides default tools for accessing {{< product-c8y-iot >}} data:

- **Device queries**: Search and retrieve device information.
- **Measurement retrieval**: Access current and historical measurements.
- **Alarm management**: Query alarms and their status.
- **Event access**: Retrieve events from devices.
- **Operation status**: Check operation execution status.

{{< c8y-admon-important >}}
These tools access and also change the data that the executing user has access to. Test such tools in a testing environment.
{{< /c8y-admon-important >}}

These tools are available automatically and require no additional configuration. Test these tools by accessing the **Tools** section of the AI Agent Manager. Open a tool, which displays the tool's description and parameters. Enter something into the chat box to test the tool. These tools always use the authorization of the current user and therefore cannot access more data than the user accesses. However, be aware that they change or delete data.

### Assigning tools to agents {#assigning-tools}

To enable an agent to use tools:

1. Open the agent configuration.
2. Navigate to the **Tools** tab.
3. Browse available tools.
4. Select the tools the agent needs.
5. Click **Save**.

The agent now accesses these tools during conversations when needed.

{{< c8y-admon-info >}}
Object agents cannot use custom tools. They use tools internally to structure their responses according to the defined schema.
{{< /c8y-admon-info >}}


### Best practices {#best-practices}

- **Tool selection**: Assign only the tools an agent actually needs. Too many tools confuse the agent and increase processing time.

- **Performance**: Tools that take a long time to execute slow down agent responses. Optimize tool performance or use caching where appropriate.
