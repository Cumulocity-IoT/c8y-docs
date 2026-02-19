---
title: Introduction
layout: bundle
outputs:
  - html
  - json
sector:
  - app_enablement
weight: 10
helpcontent:
- label: aim-introduction
  title: AI Agent Manager
  content: "The AI Agent Manager enables you to create and manage AI agents — intelligent assistants that help users interact with your IoT data and systems through natural language conversations. Instead of building custom AI integrations from scratch, you configure pre-built agents that understand your specific use cases and have access to the tools they need.

  
  An AI agent consists of three main components: a system prompt that defines the agent's role and expertise, tools that perform actions such as querying device data or triggering operations, and an AI provider which is the underlying AI model that powers the agent. Once configured, users interact with agents through natural language without needing to know technical details.

  
  You create specialized assistants for specific use cases like equipment monitoring or device troubleshooting. Connect agents to Cumulocity IoT data through built-in tools or extend them with custom tools via MCP servers. The built-in test interface shows you what tools the agent is calling and how it reasons.

  
  To get started, configure a global provider and model in the Administration application. Tested providers include Anthropic, OpenAI, and Google Gemini. After configuring your provider, validate it by creating a test agent. Without a global LLM provider configured, the Cumulocity IoT platform is never connected to any external Large Language Model provider."
---


{{< c8y-admon-preview >}}
The feature is currently in public preview and might change or is not feature complete. While we try to keep changes as low as possible, breaking changes and feature removals happen. To enable the feature, open the right drawer (by clicking on your username initials) in the **Administration** application and select **Manage preview features**. Then activate the toggle next to **AI Agent Manager**.
{{< /c8y-admon-preview >}}

The AI Agent Manager enables you to create and manage AI agents—intelligent assistants that help users interact with your IoT data and systems through natural language conversations. Instead of building custom AI integrations from scratch, you configure pre-built agents that understand your specific use cases and have access to the tools required to be helpful.

![The AI Manager default view and a test prompt](/images/agents/testing_an_agent.png)

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

- **Manage AI providers**: Configure which AI provider and model to use globally or for specific agents. The system supports multiple providers including OpenAI, Anthropic, Google, and others, abstracting away the complexity of working with different APIs.

### Getting started by configuring a global provider {#getting-started-by-configuring-a-global-provider}

{{< c8y-admon-important >}}
Without a global LLM provider configured, the {{< product-c8y-iot >}} platform is never connected to any external Large Language Model provider, even if the list already shows subscribed agents.
{{< /c8y-admon-important >}}

Start by configuring a global provider and model. A global provider is the LLM provider and model that is used by default on each agent interaction as long as the agent does not define another provider or model in its local provider configuration. Use the AI Agent Manager UI in the **Administration** application:

1. Open the AI Agent Manager main view. You see a list of agents provided in your instance.
2. In the toolbar, click **Add global provider**.
3. In the modal, configure your provider. The tested providers are:
   - Anthropic
   - OpenAI
   - Google Gemini
   
   Additional providers are supported but not tested by the {{< product-c8y-iot >}} team. They work without guarantee. The same applies to open source models based on the OpenAI API, which are supported by using the OpenAI provider and changing the baseURL and the strict mode in the advanced settings.
   ![The modal helps to configure your global provider](/images/agents/configuring_a_provider.png)
4. Define the model to use.
5. Add an API key provided by your provider. This is securely stored inside the platform and cannot be read afterwards.
6. Add advanced provider-specific settings if necessary. The advanced settings editor accepts JSON and validates via a JSON schema.
7. Save the provider.

The next step is to validate your provider. The easiest way is to create a new agent:

1. Click **Add agent** at the bottom of the list.
2. Select **Test** and write "Hello world".
3. The agent responds with a hello message.

If successful, your provider is correctly configured, and you can start to use and test AI agents. Next, learn more about subscribed agents, object agents, local providers, and MCP tools:
 - Learn what [subscribed agents](/ai/agents/#what-are-subscribed-agents) are and how you can align them.
 - Understand the difference between an [object and a text agent](/ai/agents/#text-and-object-agents).
 - See how you can leverage [local providers](/ai/agents/#local-providers) to overwrite the provider or model of a global provider.
 - Understand the available [tools and how you can extend them with MCP](/ai/tools-mcp/).
 - You can also manage agents programmatically [via the REST API](/ai/rest-api/) for integration into your own applications and workflows. 
