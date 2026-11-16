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

Subscribed agents properties:

- **Pre-configured**: Subscribed agents are fully configured by the application provider. You do not need to define system prompts or tools.

- **Application-specific**: Each subscribed agent is designed for a specific use case within an application (for example, a device troubleshooting agent for a specific device management app).

- **Require global provider**: Subscribed agents use your configured global provider unless they specify a local provider. Without a global provider configured, subscribed agents remain inactive.

- **Read-only configuration**: You cannot modify the system prompt or tools of subscribed agents. However, you view their configuration to understand their capabilities. You also overwrite the subscribed agent with a custom agent. Custom agents with the same name as the subscribed one are preferred.

- **Automatic updates**: When the providing application updates the agent definition, changes appear automatically in your AI Agent Manager as long as you haven't overwritten it.

### Viewing subscribed agents {#viewing-subscribed-agents}

To view subscribed agents:

1. Navigate to **AI Agent Manager** > **Agents**.
2. In the action bar, click **Subscribed** to only show subscribed agents. Subscribed agents show a **subscribed** tag. Hover over the tag to see the source application.
3. Click a subscribed agent to view its details. The header shows the source **Application**, and the **System prompt** tab shows the system prompt of the agent.

![You can investigate the system prompt of a subscribed agent](/images/agents/viewing_a_subscribed_agent.png)

### Testing subscribed agents {#testing-subscribed-agents}

You test subscribed agents the same way as custom agents:

1. Open the subscribed agent in the AI Agent Manager.
2. Navigate to the **Test** tab.
3. Enter a prompt and observe the agent's response.

### Overruling subscribed agents {#aligning-subscribed-agents}

While you cannot change the core configuration of subscribed agents, you align them by overruling the agent with a custom agent of the same name. To do so, use one of the following options:

- In the agent list, click the actions menu of the subscribed agent and select **Clone**.
- In the details of the subscribed agent, click **Clone agent** in the information banner.

The clone keeps the name of the subscribed agent and opens, so you can align it to your needs. From now on, all calls to this agent name, from any application, use the new custom agent.

In the agent list, the custom agent shows an **overrides** tag, and the subscribed agent shows an **overridden** tag and a dimmed icon. The details of an overridden agent show a warning that it is not used while the custom agent exists. To hide overridden agents from the list, turn on **Hide overridden** in the action bar.

To use the subscribed agent again, delete the custom agent that overrides it.

### Subscribed agent versioning {#versioning-agents}

While agents in general are not versioned, subscribed agents are versioned. They are provided by a custom or subscribed plugin that gets versioned, so the agents also exist in different versions. The AI Agent Manager shows the "latest" version of the plugin-agent. However, a custom application might use a different version. If the agent is overruled, always the custom user-defined agent is used. 

### Removing subscribed agents {#removing-subscribed-agents}

Subscribed agents are removed automatically when you uninstall or remove the providing application. You cannot manually delete subscribed agents while their source application remains installed, so the **Delete** action is disabled for them. If the source application is subscribed, you need to unsubscribe this application to uninstall the agent.
