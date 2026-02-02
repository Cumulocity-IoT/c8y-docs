---
weight: 20
title: Subscribed agents
layout: redirect
---

Subscribed agents are AI agents that are provided by installed applications in your {{< product-c8y-iot >}} tenant. These agents are automatically available in the AI Agent Manager once the providing application or plugin is deployed.

### What are subscribed agents? {#what-are-subscribed-agents}

When developers build applications or plugins that include AI functionality, they define agents to be exported. These agents are then "subscribed" to your tenant and appear in the AI Agent Manager list.

Subscribed agents come with predefined:
- System prompts that define their behavior and expertise.
- Tool configurations that allow them to interact with specific {{< product-c8y-iot >}} data or services.

**Pre-configured**: Subscribed agents are fully configured by the application provider. You do not need to define system prompts or tools.

**Application-specific**: Each subscribed agent is designed for a specific use case within an application (for example, a device troubleshooting agent for a specific device management app).

**Require global provider**: Subscribed agents use your configured global provider unless they specify a local provider. Without a global provider configured, subscribed agents remain inactive.

**Read-only configuration**: You cannot modify the system prompt or tools of subscribed agents. However, you view their configuration to understand their capabilities. You also overwrite the subscribed agent with a custom agent. Custom agents with the same name as the subscribed one are preferred.

**Automatic updates**: When the providing application updates the agent definition, changes appear automatically in your AI Agent Manager as long as you haven't overwritten it.

### Viewing subscribed agents {#viewing-subscribed-agents}

To view subscribed agents:

1. Navigate to **Administration** > **AI Agent Manager**.
2. In the agents list, subscribed agents display with a badge indicating their source application.
3. Click on a subscribed agent to view its details, including the system prompt and available tools.

### Testing subscribed agents {#testing-subscribed-agents}

You test subscribed agents the same way as custom agents:

1. Open the subscribed agent in the AI Agent Manager.
2. Navigate to the **Test** tab.
3. Enter a prompt and observe the agent's response.

### Overruling subscribed agents {#aligning-subscribed-agents}

While you cannot change the core configuration of subscribed agents, you align them by overruling the agent. Click the three dots next to the subscribed agent and select **Clone agent**. The cloned agent then aligns to your needs, and all subscribed agents by any app only use this new custom agent.

### Subscribed agent versioning {#versioning-agents}

While agents in general are not versioned, subscribed agents are versioned. They are provided by a custom or subscribed plugin that gets versioned, so the agents also exist in different versions. The AI Agent Manager shows the "latest" version of the plugin-agent. However, a custom application might use a different version. If the agent is overruled, always the custom user-defined agent is used. 

### Removing subscribed agents {#removing-subscribed-agents}

Subscribed agents are removed automatically when you uninstall or remove the providing application. You cannot manually delete subscribed agents while their source application remains installed. If the source application is subscribed, you need to unsubscribe this application to uninstall the agent.
