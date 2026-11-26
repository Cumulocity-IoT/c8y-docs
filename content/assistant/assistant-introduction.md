---
title: Introduction
layout: bundle
outputs:
  - html
  - json
  - markdown
sector:
  - ai
weight: 10
---

{{< c8y-admon-preview >}}
The Assistant is currently in Public Preview and might change or is not feature complete. While we try to keep changes as low as possible, breaking changes and feature removals happen. To enable the AI Agent Manager and the Assistant, open the right drawer (by clicking on your username initials) in the Administration application and select **Manage preview features**. Then activate the toggle next to **AI Agent Manager**.
{{< /c8y-admon-preview >}}

The Assistant is a context-aware AI chat in the header of {{< product-c8y-iot >}} applications. It knows which screen you are on, for example, the device, the group, or the dashboard that you look at, and uses it as context for your questions. You ask in plain language, and the Assistant answers with data from your tenant and with information from the {{< product-c8y-iot >}} documentation.

### What the Assistant does {#what-the-assistant-does}

- **Answers questions about your data**: The Assistant reads the data of your tenant, for example, devices, groups, measurements, alarms, and events, and answers questions such as "Are there any active critical alarms for this group?".
- **Looks up the documentation**: The Assistant reads the {{< product-c8y-iot >}} documentation. When you ask about a page that has context help, the Assistant reads the documentation topic of this context help first.
- **Changes data**: On your request, the Assistant creates, updates, or deletes data. For example, it renames a device or acknowledges an alarm. It uses your permissions, so it cannot access more data than you.
- **Updates the view**: After the Assistant changes data that the current page shows, it reloads the view. If another page helps you, for example, the page of a device that you asked about, it navigates to that page.

Some actions require your approval before the Assistant runs them. For details, see [Tool calls and approval](/assistant/using-the-assistant/#tool-calls-and-approval).

### Where the Assistant is available {#where-the-assistant-is-available}

The Assistant is available in the Cockpit application by default. Other applications add it through the Assistant plugin. For details, see [To add the Assistant to other applications](/assistant/administering-the-assistant/#adding-the-assistant-to-other-applications).

The **Assistant** button appears in the header only if your user and your tenant meet the requirements: your user has permission to use AI agents, the AI Agent Manager and AI Workbench are available in your tenant, the AI Agent Manager preview feature is active, and AI agents are turned on. For details, see [Requirements](/assistant/administering-the-assistant/#requirements).

### How the Assistant works {#how-the-assistant-works}

The Assistant consists of three parts:

- **The chat**: The user interface in the application. It shows the conversation and the tool calls, and it runs no AI itself.
- **The Assistant plugin**: Adds the chat to the header of an application and provides the definition of the agent `c8y-assistant-agent`.
- **The AI Agent Manager**: Runs the agent. It sends your messages to the model, calls the tools with your permissions, and streams the answer to the chat. For details, see [How an agent run works](/ai/aim-introduction/#how-an-agent-run-works).

The agent `c8y-assistant-agent` is an agent of the [AI Agent Manager](/ai/aim-introduction/):

- It uses the model that your administrator configures in the control panel.
- It reads and changes the data of your tenant in code mode with [AI Workbench](/ai/ai-workbench/).
- Every run appears on the [**Observability**](/ai/observability/) page of the AI Agent Manager.

Administrators adjust the behavior of the Assistant in the AI Agent Manager. For details, see [To change the Assistant](/assistant/administering-the-assistant/#changing-the-assistant).

### Assistant in the header and in Data Preparation {#assistant-and-other-ai-chats}

The Assistant is available in two places, with different agents and purposes:

| Feature | Where | Agent | Purpose |
|---------|-------|-------|---------|
| Assistant | Header of the application | `c8y-assistant-agent` | Questions and changes about the current screen and the whole tenant |
| Assistant in Data Preparation | Rule editor of Data Preparation | The Data Preparation agent | Creating smart functions that transform device messages |

For details on the Assistant in Data Preparation, see [Expert agents](/ai-intro/expert-agents/#data-preparation-ai-assistant).

{{< c8y-admon-related >}}
- [Using the Assistant](/assistant/using-the-assistant/) for opening the Assistant, working with context, and approving tool calls.
- [Administering the Assistant](/assistant/administering-the-assistant/) for the requirements, the installation in other applications, and the agents of the Assistant.
- [Agentic AI capabilities overview](/ai-intro/ai-overview/) for how the Assistant fits into the agentic AI capabilities.
{{< /c8y-admon-related >}}
