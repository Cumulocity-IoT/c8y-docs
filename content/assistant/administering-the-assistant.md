---
title: Administering the Assistant
layout: bundle
outputs:
  - html
  - json
  - markdown
sector:
  - ai
weight: 40
---

{{< c8y-admon-preview >}}
The Assistant is currently in Public Preview and might change or is not feature complete. While we try to keep changes as low as possible, breaking changes and feature removals happen.
{{< /c8y-admon-preview >}}

Make the Assistant available to your users, add it to more applications, and adjust its behavior in the AI Agent Manager.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

- To use the Assistant: READ or ADMIN permission for the permission type "AI agent".
- To configure the model, the kill switch, and the agents of the Assistant: ADMIN permission for the permission type "AI agent".
- To install plugins in applications: the permissions to manage applications in the Administration application.
{{< /c8y-admon-req >}}

### Requirements {#requirements}

The **Assistant** button appears in the header of an application only if all of the following conditions apply:

- The application contains the Assistant plugin. The Cockpit application contains it by default.
- The user has READ or ADMIN permission for the permission type "AI agent".
- The tenant is subscribed to the microservices `ai` (AI Agent Manager) and `ai-workbench` (AI Workbench).
- AI agents are turned on in the [control panel](/ai/control-panel/#ai-agent-availability).
- The **AI Agent Manager** preview feature is active. To activate it, open the right drawer (by clicking your username initials) in the Administration application and select **Manage preview features**. Then activate the toggle next to **AI Agent Manager**.

To answer questions, the Assistant also needs the following configuration:

- A model configuration in the control panel. The Assistant uses this default model, unless you change the model of the Assistant agent. For details, see [Model configuration](/ai/control-panel/#model-configuration).
- The `ai-workbench` MCP server in the AI Agent Manager. The AI Agent Manager adds it automatically when the tenant is subscribed to AI Workbench. If it is missing, the Assistant shows "AI agent is not available." and names the missing MCP server.

### To add the Assistant to other applications {#adding-the-assistant-to-other-applications}

The Assistant plugin is part of the **AI Plugins** extension package. The Cockpit application loads the plugin by default. To add the Assistant to another application:

1. In the Administration application, navigate to **Ecosystem** > **Extensions**.
2. Click the **AI Plugins** extension package.
3. Under **Package plugins**, click **Install plugin** next to the **Assistant** plugin and select the application.

The **Assistant** button appears in the header of the application. For details on extensions and plugins, see [Extensions](/standard-tenant/ecosystem/#extensions).

{{< c8y-admon-important >}}
If you installed the Assistant plugin in the Cockpit application yourself before the Cockpit application loaded it by default, remove the plugin in the **Plugins** tab of the Cockpit application. Otherwise, the plugin loads twice.
{{< /c8y-admon-important >}}

To remove the Assistant from an application, including the Cockpit application, remove the plugin in the **Plugins** tab of the application. For details, see [Plugins](/standard-tenant/ecosystem/#plugins).

### The Assistant agent {#the-assistant-agent}

The Assistant answers with the agent `c8y-assistant-agent`, a text agent with a maximum of 80000 output tokens. The agent appears as a [subscribed agent](/ai/agents/#subscribed-agents) in the AI Agent Manager. To see it, navigate to **AI Agent Manager** > **Agents** and click **Subscribed**.

The main tools of `c8y-assistant-agent` are:

- `codemode` of AI Workbench: Reads and changes the data of your tenant. For details, see [AI Workbench and code mode](/ai/ai-workbench/).
- `cumulocity-read-documentation`: Reads the {{< product-c8y-iot >}} documentation.
- `trigger-ui-action`: Reloads the current view or navigates to another page in the application of the user.

### Tool approval {#tool-approval}

By default, `c8y-assistant-agent` asks for approval before each call of `codemode`, even if the user selects **Auto** below the message field. `codemode` does not declare whether it changes data, so its default approval option is **Always**. Reading the documentation and reloading or navigating the view require no approval.

To change these settings, override the agent as described in [To change the Assistant](#changing-the-assistant), and set the **User approval** of each tool in the **Tools** tab. For example, set `codemode` to **Ask** so that users who select **Auto** run code without approval. For details on the approval options, see [Approval options](/ai/tools-mcp/#approval-options).

### To change the Assistant {#changing-the-assistant}

Subscribed agents are read-only. To change the system prompt, the tools, the tool approval, or the model of the Assistant, create a custom agent with the same name. The custom agent overrides the subscribed agent in all applications.

1. Navigate to **AI Agent Manager** > **Agents** and click **Subscribed**.
2. In the actions menu of `c8y-assistant-agent`, select **Clone**. The copy keeps the name of the agent and opens.
3. Change the agent, for example, in the **System prompt**, **Tools**, or **Model configuration** tab.
4. Click **Save**.

From now on, the Assistant uses your custom agent.

Note the following:

- The system prompt of `c8y-assistant-agent` uses the variables `c8yContextSummary`, `c8yRouteContext`, `c8yPlatformContext`, `c8yDashboardContext`, and `c8yHelpContext`, which contain the context of the screen. Keep them in your system prompt, or the Assistant loses the context.
- Your custom agent does not receive the updates that new versions of the Assistant plugin bring to the subscribed agent. To use the subscribed agent again, delete your custom agent.

For details, see [Overruling subscribed agents](/ai/agents/#aligning-subscribed-agents) and [Local providers](/ai/agents/#local-providers).

### Kill switch {#kill-switch}

When you turn off AI agents with the **AI agent availability** switch in the control panel, the **Assistant** button disappears from the header of all applications, and the AI Agent Manager refuses all requests of the Assistant. When you turn AI agents on again, the button appears again. For details, see [AI agent availability](/ai/control-panel/#ai-agent-availability).

### Observability {#observability}

The runs of the Assistant appear on the [**Observability**](/ai/observability/) page with the agent name `c8y-assistant-agent`. The page shows who runs the agent, how long each run takes, how many tokens it uses, and which tools it calls.

### Data sent to the LLM provider {#data-sent-to-the-llm-provider}

With each message, the Assistant sends the following data to the LLM provider of the model configuration:

- The system prompt of `c8y-assistant-agent`, including the following context of the screen:
  - The ID, name, and type of the device, group, or other object.
  - The address of the page.
  - The ID and name of the dashboard, and the titles and types of its widgets.
  - The documentation path of the context help.
- The messages of the conversation.
- The descriptions of the tools.
- The results of the tool calls, which contain data of your tenant and content of the documentation.

For details on data protection and the LLM providers, see [AI aspects](/concepts/concepts-ai/).

{{< c8y-admon-related >}}
- [Using the Assistant](/assistant/using-the-assistant/) for the user view of the Assistant.
- [Control panel](/ai/control-panel/) for the model configuration and the kill switch.
- [Governance and safety](/ai-intro/ai-governance/) for the permissions, the tool approval, and the audit trail of all agents.
{{< /c8y-admon-related >}}
