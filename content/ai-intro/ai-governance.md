---
title: Governance and safety
layout: bundle
outputs:
  - html
  - json
  - markdown
sector:
  - ai
weight: 40
---

Administrators control which LLM provider the agents use, what the agents are allowed to do, and when they run. The AI Agent Manager records every agent run, and administrators review the runs on the **Observability** page. The controls apply to all agents of the AI Agent Manager, including the expert agents and the agents that you build.

### Model configuration {#model-configuration}

The model configuration in the control panel sets the LLM provider, the model, and the API key that all agents use by default. A local provider gives a single agent a different provider or model.

- The tested providers are Anthropic, OpenAI, Google Gemini, and Azure OpenAI. {{< product-c8y-iot >}} supports further providers without guarantee.
- If your organization does not allow an external LLM provider, connect a self-hosted model that provides an OpenAI-compatible API.
- The platform stores the API key and never returns it in readable form.
- Without a model configuration, the {{< product-c8y-iot >}} platform never connects to any external LLM provider.

For details, see [Model configuration](/ai/control-panel/#model-configuration) and [Local providers](/ai/agents/#local-providers).

### Permissions {#permissions}

Two layers of permissions limit what an agent does:

- **Permission type "AI agent"**: Users with READ permission talk to agents and view the agents, the tools, and the **Observability** page. Users with ADMIN permission also create and change agents and use the control panel.
- **Permissions of the user**: The built-in tools and code mode run with the permissions of the user who runs the agent. An agent cannot access more data than this user, but it can change or delete the data that this user has access to.

MCP servers that you add use the authentication that you configure for them. Forward the authentication of the user only to MCP servers that you trust. For details, see [Configuring MCP servers](/ai/tools-mcp/#configuring-mcp-servers).

### Tool approval {#tool-approval}

Tool approval asks a user to approve a tool call before the tool runs. In the **Tools** tab of an agent, the **User approval** of each tool is one of the following options:

- **Never**: The tool runs without asking for approval, even if it changes data.
- **Ask**: Users approve each call in the chat, unless they select **Auto** below the message field.
- **Always**: Users approve every call, even in **Auto** mode and even if they approved the tool earlier in the conversation.

A tool without its own option gets an option from what it declares about itself:

- **Never** for a tool that only reads data and does not contact external systems.
- **Ask** for a tool that changes data but does not delete data or contact external systems.
- **Always** for all other tools, including tools that declare nothing.

The **Tools** tab shows what each tool declares about itself.

If a user denies a tool call, the tool does not run, and the **Observability** page shows the call as **Denied**. Applications that call agents through the REST API receive an approval request for such tool calls and must answer it.

For details, see [Requiring user approval](/ai/tools-mcp/#user-approval) for agents and [Tool approval](/ai/rest-api/#tool-approval) in the REST API.

For testing agents with tool approval, see [Test](/ai/agents/#ai-agent-test).

### Kill switch {#kill-switch}

The **AI agent availability** switch in the control panel turns off all AI agents of the tenant at once, for example, to stop an agent that behaves unexpectedly or to stop the costs of an LLM provider immediately. While AI agents are turned off:

- The AI Agent Manager refuses every agent run, including the expert agents, the AI Agent Chat widget, and calls through the REST API.
- All agent definitions, MCP server configurations, and the model configuration remain.
- The **Observability** page remains available.

The switch does not block MCP clients that connect to AI Workbench directly. To prevent such access, unsubscribe your tenant from the AI Workbench microservice.

For details, see [AI agent availability](/ai/control-panel/#ai-agent-availability).

### Audit trail and observability {#observability}

The AI Agent Manager records every agent run and every tool call as audit logs of your tenant. On the **Observability** page, you see which agents run, who runs them, whether they succeed, how long they take, how many tokens they use, and which tools they call. The audit trail only contains metadata, never the prompts, the responses, or the tool results.

To analyze the content of agent runs, export a trace of every run to your own OpenTelemetry collector. You decide whether the export includes the prompts and responses, and whether it includes the user ID.

For details, see [Observability](/ai/observability/) and [OpenTelemetry export](/ai/control-panel/#opentelemetry-export).

### Data handling {#data-handling}

When an agent runs, the AI Agent Manager sends the system prompt, the conversation, the descriptions of the tools, and the results of the tool calls to the configured LLM provider. Your agreement with the LLM provider governs how the provider handles this data.

Depending on your {{< product-c8y-iot >}} environment, the AI Agent Manager also exports traces of agent runs to a collector operated by {{< company-c8y >}}. Administrators opt out of this export through the REST API. For details, see [{{< company-c8y >}}-managed telemetry export](/ai/rest-api/#managed-telemetry-export).

For details on data protection and for answers to frequently asked questions, see [AI aspects](/concepts/concepts-ai/).

{{< c8y-admon-related >}}
- [Control panel](/ai/control-panel/) for the kill switch, the model configuration, and the OpenTelemetry export.
- [Observability](/ai/observability/) for the audit trail of agent runs.
- [AI aspects](/concepts/concepts-ai/) for data protection and frequently asked questions.
{{< /c8y-admon-related >}}
