---
title: Introduction
layout: bundle
outputs:
  - html
  - json
  - markdown
sector:
  - app_enablement
weight: 10
helpcontent:
- label: aim-introduction
  title: AI Agent Manager
  content: "The AI Agent Manager enables you to create and manage AI agents — intelligent assistants that help users interact with your IoT data and systems through natural language conversations. Instead of building custom AI integrations from scratch, you configure pre-built agents that understand your specific use cases and have access to the tools they need.

  
  An AI agent consists of three main components: a system prompt that defines the agent's role and expertise, tools that perform actions such as querying device data or triggering operations, and an AI provider which is the underlying AI model that powers the agent. Once configured, users interact with agents through natural language without needing to know technical details.

  
  You create specialized assistants for specific use cases like equipment monitoring or device troubleshooting. Connect agents to Cumulocity IoT data through built-in tools or extend them with custom tools via MCP servers. The built-in test interface shows you what tools the agent is calling and how it reasons.

  
  The AI Agent Manager has three pages in the navigator: Control panel, Agents, and Tools. In the control panel, you turn all AI agents on or off for your tenant and configure the default provider, model, and API key.

  
  To get started, open AI Agent Manager > Control panel in the Administration application and add a model configuration. Tested providers include Anthropic, OpenAI, Google Gemini, and Azure OpenAI. Use Test configuration to validate your settings before saving them. Without a model configuration, the Cumulocity IoT platform is never connected to any external Large Language Model provider."
---


{{< c8y-admon-preview >}}
The feature is currently in public preview and might change or is not feature complete. While we try to keep changes as low as possible, breaking changes and feature removals happen. To enable the feature, open the right drawer (by clicking on your username initials) in the **Administration** application and select **Manage preview features**. Then activate the toggle next to **AI Agent Manager**.
{{< /c8y-admon-preview >}}

The AI Agent Manager enables you to create and manage AI agents—intelligent assistants that help users interact with your IoT data and systems through natural language conversations. Instead of building custom AI integrations from scratch, you configure pre-built agents that understand your specific use cases and have access to the tools required to be helpful.

![Testing an agent in the AI Agent Manager](/images/agents/testing_an_agent.png)

### What is an AI agent? {#what-is-an-ai-agent}

An AI agent is a configured AI assistant with a specific purpose and behavior. Each agent consists of:

- **System prompt**: Defines the agent's role, personality, and expertise (for example, "You are a factory monitoring assistant").
- **Tools**: Actions the agent performs, such as querying device data, triggering operations, or accessing custom services.
- **AI provider**: The underlying AI model (such as Claude, GPT, or others) that powers the agent.

Once configured, users interact with agents through natural language without needing to know technical details about APIs or system prompts.

### What you do with AI agents {#what-you-do-with-ai-agents}

- **Create specialized assistants**: Configure agents for specific use cases like equipment monitoring, predictive maintenance analysis, or device troubleshooting. Each agent has its own expertise and access to relevant data.

- **Add tools and capabilities**: Connect agents to {{< product-c8y-iot >}} data through built-in tools or extend them with custom tools via MCP (Model Context Protocol) servers. This allows agents to query device data, retrieve measurements, or trigger actions.

- **Test and refine**: Use the built-in test interface to interact with your agents and see how they respond. The test interface shows you exactly what tools the agent is calling and how it reasons about your questions.

- **Provide conversational interfaces**: Once configured, agents maintain conversations with context, using variables to personalize responses and access to tools to fetch real-time data.

- **Manage AI providers**: Configure the default provider and model for all agents in the control panel and override them for specific agents. The system supports multiple providers including OpenAI, Anthropic, Google, and others, abstracting away the complexity of working with different APIs.

- **Control AI usage**: Turn off all AI agents in your tenant at once with the kill switch in the control panel, for example, to stop AI activity immediately.

### Navigating the AI Agent Manager {#navigating-the-ai-agent-manager}

Once the preview feature is enabled, the **AI Agent Manager** appears as its own entry in the navigator of the **Administration** application. It contains the following pages:

- **Control panel**: Turn all AI agents on or off for your tenant and configure the default provider, model, and API key. This page is only visible to users with the `ROLE_AI_AGENT_ADMIN` permission. See [Control panel](/ai/control-panel/).
- **Agents**: Browse, create, configure, and test agents. See [Agents](/ai/agents/).
- **Tools**: Browse and test the available tools and configure MCP servers. See [Tools and MCP](/ai/tools-mcp/).

If AI agents are disabled in the control panel, the **Agents** and **Tools** pages are hidden.

### Getting started by configuring a model {#getting-started-by-configuring-a-global-provider}

{{< c8y-admon-important >}}
Without a model configuration (global provider), the {{< product-c8y-iot >}} platform is never connected to any external Large Language Model provider, even if the list already shows subscribed agents.
{{< /c8y-admon-important >}}

Start by configuring the default provider and model in the control panel. This model configuration, also called the global provider, is used by default on each agent interaction as long as the agent does not define another provider or model in its local provider configuration.

1. Navigate to **AI Agent Manager** > **Control panel**.
2. In the **Model configuration** section, click **Add configuration**.
3. Select a provider. The tested providers are:
   - Anthropic
   - OpenAI
   - Google Gemini (**Google Generative AI**)
   - Azure OpenAI

   Additional providers are supported but not tested by the {{< product-c8y-iot >}} team. They work without guarantee. The same applies to open source models based on the OpenAI API, which are supported by selecting **Custom / self-hosted** and entering the base URL of the endpoint.
4. Enter the model to use.
5. Add an API key provided by your provider. This is securely stored inside the platform and cannot be read afterwards.
6. Add provider-specific settings in the **Custom provider settings** editor, if necessary.
7. Click **Test configuration**. The provider responds to a short test prompt if the configuration is correct.
8. Click **Save**.

For details on all fields, see [Model configuration](/ai/control-panel/#model-configuration).

You can also validate your configuration by creating a new agent:

1. Navigate to **AI Agent Manager** > **Agents**.
2. Click **Add agent** in the action bar, keep the generated name, and click **Add agent**. The new agent opens with the **Test** tab selected.
3. Write "Hello world" and send the message.
4. The agent responds with a hello message.

If successful, your provider is correctly configured, and you can start to use and test AI agents. Next, learn more about subscribed agents, object agents, local providers, and MCP tools:
 - Learn how to turn AI agents on or off and manage the model configuration in the [control panel](/ai/control-panel/).
 - Learn what [subscribed agents](/ai/agents/#what-are-subscribed-agents) are and how you can align them.
 - Understand the difference between an [object and a text agent](/ai/agents/#text-and-object-agents).
 - See how you can leverage [local providers](/ai/agents/#local-providers) to overwrite the provider or model of a global provider.
 - Understand the available [tools and how you can extend them with MCP](/ai/tools-mcp/).
 - Let agents work with the complete API of your tenant in [code mode with AI Workbench](/ai/ai-workbench/).
 - You can also manage agents programmatically [via the REST API](/ai/rest-api/) for integration into your own applications and workflows. 
