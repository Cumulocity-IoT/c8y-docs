---
title: Agents
layout: bundle
outputs:
  - html
  - json
sector:
  - app_enablement
weight: 20
---

Agents are the basic building block of any agentic workflow. The AI Agent Manager simplifies the creation of agents by providing a UI that lets you quickly define an agent with a system prompt that then, on its own, calls tools. This quick starts agentic workflows in a couple of minutes, not hours. 

### Custom agents {#ai-agent-custom-agents}

To create a custom agent, navigate to **Administration** > **AI Agent Manager** and click **Add agent**. Select an agent name and the type of agent. This introduction only describes text agents. For details about object agents, refer to [Text and object agents](/ai/agents/#text-and-object-agents). When selecting a name, remember that naming conflicts can occur with subscribed agents provided from applications or plugins. It is good practice to use a prefix other than `c8y-`, as this is the default prefix used by the platform.

Once the custom agent is created, you align it to your needs using the following tabs:

- **Test**: Test your agent directly in the AI Agent Manager.
- **Settings**: Allows to set settings like the maximum output tokens or temperature.
- **Test variables**: Set variable values for your test.
- **System prompt**: The system prompt of the agent. You align it and then test the changes. The system prompt persists only when you save it.
- **Tools**: Assign tools to your agent. 
- **Local provider**: Allows to set different LLM provider or models for one agent ((read more)[(/ai/agents/#local-providers)]).
 - **Advanced**: Enables advanced settings in JSON format.

### System prompts {#ai-agent-system-prompt}

The system prompt defines your agent's behavior, expertise, and personality. It is the foundational instruction that shapes how the agent interprets user questions and formulates responses. Unlike user messages that change with each conversation, the system prompt remains constant and guides the agent throughout all interactions.

**What to include in a system prompt:**

- Write clear and specific instructions about the agent's role and purpose. For example, "You are a device troubleshooting assistant for industrial IoT equipment" is more effective than "You are helpful."

- Define the agent's tone and communication style. Specify whether responses are formal, conversational, technical, or simplified for non-technical users.

- Set boundaries and limitations. Explicitly state what the agent does not do or what topics it avoids. For example, "You do not provide financial advice or make purchasing decisions."

- Include domain knowledge and context. Add relevant background information about your IoT environment, device types, or specific terminology the agent needs to understand.

- Specify output format preferences. Indicate whether responses are concise bullet points, detailed explanations, or follow a specific structure.

**Do's:**

- Be specific and concrete rather than vague or general.
- Test different prompt variations to find what works best for your use case.
- Include examples of desired behavior directly in the prompt.
- Update the system prompt based on observed agent behavior.
- Keep the prompt focused on a single, clear purpose.
- Use the agent's perspective (write as "You are..." not "The agent is...").

**Don'ts:**

- Avoid contradictory instructions that confuse the agent.
- Do not make the prompt excessively long (generally stay under 2000 words).
- Avoid assumptions about what the agent "knows" - be explicit.
- Do not include user-specific information that changes per interaction (use variables instead).
- Avoid overly complex or nested conditional logic.
- Do not use ambiguous language that has multiple interpretations.


### Variables {#ai-agent-variables}

Variables allow you to inject dynamic data into your system prompt or user prompts at runtime. Instead of hardcoding specific values, you define placeholders that get replaced with actual values when the agent is called.

#### Defining variables in prompts {#defining-variables-in-prompts}

Use double curly brackets to define variables: `{{variableName}}`. You place variables anywhere in the system prompt or in API calls.

Example system prompt with variables:
```
You are a monitoring assistant for factory {{factoryId}}. When users ask about equipment, focus on devices in the {{location}} area. Current shift manager is {{shiftManager}}.
```

#### Providing variable values {#providing-variable-values}

When testing in the AI Agent Manager, use the **Test variables** tab to set values for your variables before testing the agent. You simply provide the variable as JSON where the key is the variable name and the value is the value you want the variable to be. For the above example you would need to add to the **Test variables** tab the following JSON:

```JSON
{
  "factoryId": "FAC-001",
  "location": "Building A",
  "shiftManager": "John Smith"
}
```

When calling the agent via REST API, provide variables in the request body:
```json
{
  "variables": {
    "factoryId": "FAC-001",
    "location": "Building A",
    "shiftManager": "John Smith"
  },
  "prompt": "What is the status of equipment in {{location}}?"
}
```

#### Use cases for variables {#use-cases-for-variables}

- Personalizing responses with user-specific information (names, roles, preferences).
- Contextualizing agents for different locations, facilities, or departments.
- Injecting current state information that changes frequently.
- Reusing the same agent configuration across multiple contexts.

Variables make agents flexible and reusable without requiring multiple agent configurations for similar use cases.

### Settings and advanced settings {#ai-agent-settings}

The settings allow you to fine-tune the agent's behavior using parameters from the Vercel AI SDK. These settings control aspects like response randomness, length limits, and provider-specific features.

#### Common settings {#ai-agent-common-settings}

There are common settings that you can set in the **Setting** tab:

| Parameter           | Range      | Description          |
|---------------------|------------|----------------------|
| maxOutputTokens | Number (min: 1) | Sets the maximum length of the response in tokens. Use this to enforce concise responses or prevent excessively long outputs. |
| temperature | 0.0 to 1.0 | Controls response randomness. Higher values make output more random, lower values more deterministic. Note: Cannot be used simultaneously with topP. |
| topP | 0.0 to 1.0 | Nucleus sampling parameter. Only tokens with top probability mass are considered (e.g., 0.1 = top 10%). Note: Cannot be used simultaneously with temperature. |
| topK | Number (min: 1) | Limits sampling to the top K options. For example, 40 means only the top 40 token options are considered. |
| presencePenalty | -1.0 to 1.0 | Encourages the model to introduce new topics. Positive values make the agent less likely to repeat topics already mentioned. |
| frequencyPenalty | -1.0 to 1.0 | Reduces repetition of tokens based on their frequency in the response. Positive values discourage repeated words. |
| seed | Number (min: 0) | Sets a seed for reproducible results. Using the same seed with the same inputs produces consistent outputs. |
| maxRetries | Number (min: 0) | Number of times to retry the request on failure. For example, 2 means the system will retry up to 2 times. |
| stopSequences | Array of strings | Sequences that, when generated, will stop the response. For example, "END" or "\n\n". Only available for text agents. |

#### Advanced settings {#advanced-settings}
In the **Advanced settings** tab a user can specify more options, which don't have yet an UI form. The options are based on the used Vercel AI SDK. For a complete list of available parameters and provider-specific options, refer to the [Vercel AI SDK documentation](https://sdk.vercel.ai/docs/ai-sdk-core/generating-text).

#### Provider-specific options {#provider-specific-options}

Some AI providers support additional features configured through the `providerOptions` field. For example, Anthropic's extended thinking mode:

```json
{
  "anthropic": {
    "thinking": {
      "type": "enabled",
      "budgetTokens": 12000
    }
  }
}
```

#### When to use settings {#when-to-use-settings}

- Adjust temperature when responses are too random or too rigid.
- Set maxTokens to control costs or enforce response brevity.
- Use penalties to reduce repetitive language in longer conversations.
- Enable provider-specific features for specialized capabilities.

Test different settings to find the optimal configuration for your use case.

### Tools {#ai-agent-tools}

Tools extend your agent's capabilities by allowing it to access data and perform actions beyond generating text. In the **Tools** tab, you assign tools from configured MCP servers to your agent.

To assign tools to an agent:

1. Navigate to the **Tools** tab in the agent configuration.
2. Browse the list of available tools from configured MCP servers.
3. Select the tools your agent needs to answer user questions.
4. Click **Save** to update the agent configuration.

The agent automatically determines when to call assigned tools based on user questions and tool descriptions. For example, if you assign a "get device measurements" tool, the agent calls it when users ask about current temperature or sensor readings.

For detailed information about tools, configuring MCP servers, and how agents use tools, refer to [Tools and MCP servers](/ai/tools-mcp/).

{{< c8y-admon-info >}}
Object agents cannot use custom tools. They use tools internally to structure responses according to their defined schema.
{{< /c8y-admon-info >}}

### Test {#ai-agent-test}

The **Test** tab provides an interactive interface to test your agent directly in the AI Agent Manager. This allows you to validate the agent's behavior, system prompt, and tool usage before deploying it in production.

To test an agent:

1. Open the agent configuration in the AI Agent Manager.
2. Navigate to the **Test** tab.
3. If your agent uses variables, set them in the **Test variables** tab first.
4. Enter a prompt in the chat interface.
5. Review the agent's response.

The test interface maintains conversation context, allowing you to have multi-turn conversations and verify the agent remembers previous messages.
