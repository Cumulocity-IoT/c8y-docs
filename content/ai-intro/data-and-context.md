---
title: Data and context
layout: bundle
outputs:
  - html
  - json
  - markdown
sector:
  - ai
weight: 35
---

{{< product-c8y-iot >}} gives agents access to the data of your tenant, to the context of the user, and to the {{< product-c8y-iot >}} documentation. The better the data and the context that an agent receives, the more precise its answers.

### Tenant data {#tenant-data}

Agents read and change the data of your tenant through tools, for example, devices, groups, measurements, alarms, and events. The built-in tools and code mode run with the permissions of the user who runs the agent, so an agent never accesses more data than this user. Tool approval decides which calls a user approves before they run.

**Status**: Public Preview. For details, see [Tools and MCP servers](/ai-intro/agent-enablement/#tools-and-mcp-servers) and [Tool approval](/ai-intro/ai-governance/#tool-approval).

### AI Workbench (code mode) {#code-mode}

AI Workbench provides code mode: an agent writes a short JavaScript function that finds and calls the APIs it needs, instead of calling a separate tool for each API operation. AI Workbench runs the function in an isolated sandbox and returns only the result to the agent. The sandbox provides the {{< product-c8y-iot >}} core REST API and the APIs of the services in your tenant that provide an OpenAPI specification or an MCP server.

Agents of the AI Agent Manager use code mode through the `codemode` tool. When you assign the tool to an agent, the agent can work with the complete API of your tenant. For details, see [Using code mode in agents](/ai/ai-workbench/#using-code-mode-in-agents).

The code runs with the permissions of the user. Each run has a limit of 120 seconds of runtime, 50 seconds of CPU time, and 200 calls of APIs and discovery functions.

Use code mode for tasks with many steps or large amounts of data, for example, to find all devices with a critical alarm that run an outdated firmware version. External agents, such as AI coding assistants, can also connect to AI Workbench and use code mode. For the connection details, see [Connecting MCP clients](/ai/ai-workbench/#connecting-mcp-clients).

**Status**: Public Preview. For details, see [AI Workbench and code mode](/ai/ai-workbench/).

### Screen context {#screen-context}

The Assistant uses the screen that the user is on as context. With each message, it receives the device, group, or other object of the page, the address of the page, the dashboard on the screen with the titles and types of its widgets, and the documentation topic of the context help of the page. In the chat, users remove this context or select other assets as context.

Use the screen context to ask about the device, group, or dashboard that you look at without naming it.

**Status**: Public Preview. For details, see [Context](/assistant/using-the-assistant/#context).

### Documentation {#documentation}

Agents look up the {{< product-c8y-iot >}} documentation with the built-in tool `cumulocity-read-documentation`. If the current page has context help, the Assistant reads the documentation topic of this context help first.

**Status**: Public Preview. For details, see [The Assistant agent](/assistant/administering-the-assistant/#the-assistant-agent).

### Context for your own agents {#context-for-your-own-agents}

Your own agents receive context through variables. Define variables in the system prompt with double curly brackets, for example, `{{deviceId}}`, and pass their values with each request.

**Status**: Public Preview. For details, see [Variables](/ai/agents/#ai-agent-variables).

{{< c8y-admon-important >}}
The data that an agent reads goes to the LLM provider as part of the conversation. For details on data protection, see [AI aspects](/concepts/concepts-ai/).
{{< /c8y-admon-important >}}

{{< c8y-admon-related >}}
- [Agentic AI capabilities overview](/ai-intro/ai-overview/) for how the parts of the agentic AI capabilities fit together.
- [Agent enablement](/ai-intro/agent-enablement/) for building and customizing agents.
- [Governance and safety](/ai-intro/ai-governance/) for permissions and tool approval.
{{< /c8y-admon-related >}}
