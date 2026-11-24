---
title: Expert agents
layout: bundle
outputs:
  - html
  - json
  - markdown
sector:
  - ai
weight: 20
---

Expert agents are agents for specific tasks that come with the {{< product-c8y-iot >}} applications and plugins. You use them without writing a system prompt or selecting tools. They run in the AI Agent Manager, where they appear as [subscribed agents](/ai/agents/#subscribed-agents), and they use the model configuration of your tenant.

To change the behavior of an expert agent, create a custom agent with the same name in the AI Agent Manager. The custom agent then overrides the expert agent in all applications. For details, see [Overruling subscribed agents](/ai/agents/#aligning-subscribed-agents).

### Assistant {#assistant-intro}

The Assistant is an AI-powered companion that helps you understand and work with your {{< product-c8y-iot >}} application. It is available in a panel on the right-hand side of the screen and uses the content you are currently viewing as context, for example, a device, a group, or a dashboard. You can close the Assistant whenever you like and reopen it using the icon in the application header. The Assistant:

- Answers questions with live data from your tenant and with information from the {{< product-c8y-iot >}} documentation.
- Changes data in your tenant on your request, with the permissions of your user.
- Reloads the current view after a change, or navigates to a page that helps you.

Use the Assistant to ask questions about the assets you look at, to find information without leaving the application, or to make changes without navigating through several pages.

The Assistant is available in the Cockpit application by default. Other applications add it through the Assistant plugin.

**Status**: Public Preview. For details, see [Assistant](/assistant/assistant-introduction/).

### AI assistant in Data Preparation {#data-preparation-ai-assistant}

[Data Preparation](/data-preparation/data-preparation-introduction/) transforms incoming device messages before {{< product-c8y-iot >}} stores them. Each rule runs a [smart function](/concepts/smart-function-concept/), a Javascript function that turns a message into measurements, events, alarms, or operations. The AI assistant in the rule editor creates and refines this smart function from a sample payload and a description of your goal, and creates test cases for it.

The AI assistant is used only once, at design time, while you create or refine a rule. The deployed rule runs the smart function code that you reviewed and tested. Incoming data is prepared without agentic AI, so the behavior is predictable and deterministic, and processing a message causes no AI cost.

Use the AI assistant to map device payloads in your own format to {{< product-c8y-iot >}} data without writing the code yourself.

**Status**: Public Preview, as part of Data Preparation. Data Preparation has its own preview feature. For details, see [AI assistant](/data-preparation/rule-editor/#ai-assistant).

### AI generation in widgets {#ai-in-widgets}

Two widgets create their content with an agent of the AI Agent Manager:

- **"HTML" widget**: The widget configuration contains an AI chat that creates and refines the HTML code of the widget.
- **"SCADA" widget**: In the **SVG configuration** section, **Generate with AI** analyzes the properties, measurements, alarms, and events of the selected asset and creates an SVG visualization.

<!-- TODO: The HTML widget section in the Cockpit documentation does not describe the AI chat yet. Add it there and link it here. -->

Use these features to create a first version of a widget without writing HTML, JavaScript, or SVG code.

**Status**: The widgets are generally available. The AI generation requires the AI Agent Manager, which is in Public Preview. For details, see [HTML](/cockpit/widgets-collection/#html) and [SCADA](/cockpit/widgets-collection/#scada).

### "AI Agent Chat" widget {#ai-agent-chat-widget}

The "AI Agent Chat" widget adds a chat with an agent of your choice to a dashboard. In the widget configuration, you select the agent and optionally set the **Chat title**, the **Welcome text**, and whether to **Show header with agent details and controls**.

If you select a device or group in the **Asset selection** section, the widget passes it to the agent as context. Users then ask questions such as "Are there any active alarms?" without naming the asset. In the chat, the asset appears as a chip that users remove to send messages without context, and add again later.

Use the "AI Agent Chat" widget to offer one of your own agents to the users of a dashboard, for example, an agent that knows the maintenance procedures of one machine type.

The widget is not available by default. To use it, install the **AI Agent Chat Widget** plugin in the application and add the widget to a dashboard. For details on installing plugins, see [Extensions](/standard-tenant/ecosystem/#extensions). The widget is available to users with READ or ADMIN permission for the permission type "AI agent" while the AI Agent Manager preview feature is active.

**Status**: Public Preview, as part of the AI Agent Manager.

{{< c8y-admon-related >}}
- [AI capabilities overview](/ai-intro/ai-overview/) for how the expert agents fit into the AI capabilities.
- [Subscribed agents](/ai/agents/#subscribed-agents) for viewing, testing, and overriding expert agents in the AI Agent Manager.
- [Agent enablement](/ai-intro/agent-enablement/) for building your own agents.
{{< /c8y-admon-related >}}
