---
title: Agent enablement
layout: bundle
outputs:
  - html
  - json
  - markdown
sector:
  - ai
weight: 30
---

Build your own agents, connect them to your data and to other systems, and use them in your applications and streaming models. The expert agents of {{< product-c8y-iot >}} are agents of the AI Agent Manager as well.

### AI Agent Manager {#ai-agent-manager}

The AI Agent Manager is the place where you create, test, and manage agents. It is part of the Administration application. For each agent, you define:

- A system prompt in plain language that describes the role and the behavior of the agent.
- The tools that the agent can call.
- Optionally, a different LLM provider or model than the default of the tenant.

Text agents answer in a chat. Object agents return JSON that matches a schema that you define, for use in your own applications. A built-in test chat shows which tools the agent calls and how many tokens it uses. Agents that applications provide appear as subscribed agents, which you override with your own version.

Use the AI Agent Manager to create agents for your own use cases, such as an agent that troubleshoots one device type, or to change the behavior of an expert agent.

**Status**: Public Preview. For details, see [AI Agent Manager](/ai/aim-introduction/) and [Agents](/ai/agents/).

### Tools and MCP servers {#tools-and-mcp-servers}

Tools let agents read and change data and call other systems. The AI Agent Manager provides built-in tools for the inventory, measurements, alarms, events, operations, and the {{< product-c8y-iot >}} documentation. You assign tools to each agent individually.

To connect other systems, add MCP servers. The Model Context Protocol (MCP) is an open standard for tools of AI agents. An MCP server runs outside of {{< product-c8y-iot >}} or as a microservice in your tenant. After you test the connection, its tools appear next to the built-in tools. When you remove the server, its tools are no longer available to the agents.

Use MCP servers to give agents access to systems such as an ERP or a maintenance management system, or to your own custom logic.

**Status**: Public Preview. For details, see [Tools and MCP](/ai/tools-mcp/).

### Code mode with AI Workbench {#code-mode}

AI Workbench is a microservice that provides code mode. In code mode, an agent writes a short JavaScript function that finds and calls the APIs it needs, instead of calling a separate tool for each API operation. AI Workbench runs the function in an isolated sandbox and returns only the result to the agent. The sandbox provides the {{< product-c8y-iot >}} core REST API and the APIs of the microservices in your tenant that provide an OpenAPI specification or an MCP server.

The code runs with the permissions of the user. Each run has a limit of 120 seconds of runtime, 50 seconds of CPU time, and 200 calls of APIs and discovery functions.

Use code mode for tasks with many steps or large amounts of data, for example, to find all devices with a critical alarm that run an outdated firmware version. MCP clients outside of {{< product-c8y-iot >}}, such as AI coding assistants, also connect to AI Workbench.

**Status**: Public Preview. For details, see [AI Workbench and code mode](/ai/ai-workbench/).

### AI Agent Prompt block {#ai-agent-prompt-block}

The AI Agent Prompt block calls an agent of the AI Agent Manager from an Analytics Builder model. The block fills a prompt template with up to five input values and outputs the text response of the agent. Connect the output to other blocks, for example, to create an alarm with the explanation of the agent.

Each time the block runs, it calls the agent and uses tokens of your LLM provider. Connect it so that it only runs for the events that need an answer from the agent.

Use the block to add explanations or recommendations to events that a streaming model detects.

**Status**: Public Preview. For details, see [AI Agent Prompt](/streaming-analytics/block-reference/#ai-agent-prompt).

### REST API {#rest-api}

The AI Agent Manager provides a REST API under `/service/ai/`. With the API, your applications send messages to text and object agents, stream the responses, pass variables, and use the agents of an application. Administrators also manage agents, tools, providers, and tenant settings through the API.

Use the REST API to integrate agents into your own applications, microservices, and workflows.

**Status**: Public Preview. For details, see [REST API](/ai/rest-api/).

{{< c8y-admon-important >}}
The built-in tools and code mode run with the permissions of the user who runs the agent, and they can add, change, or delete data. System prompts, variables, and block inputs are vulnerable to prompt injection. Validate the input that you pass to agents, and test agents in a testing environment.
{{< /c8y-admon-important >}}

{{< c8y-admon-related >}}
- [AI capabilities overview](/ai-intro/ai-overview/) for how the parts of the AI capabilities fit together.
- [Expert agents](/ai-intro/expert-agents/) for the agents that the {{< product-c8y-iot >}} applications provide.
- [Governance and safety](/ai-intro/ai-governance/) for controlling which tools need approval and for monitoring agent runs.
{{< /c8y-admon-related >}}
