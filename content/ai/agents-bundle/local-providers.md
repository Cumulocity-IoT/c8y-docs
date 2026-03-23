---
weight: 40
title: Local providers
layout: redirect
---

Local providers allow you to configure agent-specific AI provider and model settings that override the global provider configuration. This enables you to use different AI models or providers for different agents based on their specific requirements.

### What are local providers? {#what-are-local-providers}

A local provider is an agent-specific configuration that defines:
- Which AI provider to use (for example, OpenAI, Anthropic, Google).
- Which model to use (for example, gpt-4, claude-3-7-sonnet).
- Provider-specific settings like API keys, base URLs, or custom parameters.

When an agent has a local provider configured, it uses those settings instead of the global provider settings.

### When to use local providers {#when-to-use-local-providers}

Consider the following:

- **Different model requirements**: Some use cases benefit from specific models. For example, use a faster, cheaper model for simple queries and a more powerful model for complex reasoning tasks.

- **Cost optimization**: Route less critical agents to more cost-effective models while keeping important agents on premium models.

- **Provider-specific features**: Access features only available from certain providers, such as extended thinking modes or specialized capabilities.

- **Testing and comparison**: Test different models side-by-side by creating multiple agents with different local providers.

- **Separate billing**: Use different API keys for different agents to track usage or allocate costs to different departments.

### Global provider versus local provider {#global-vs-local}

| Aspect | Global provider | Local provider |
|--------|-----------------|----------------|
| Scope | All agents without local providers | Single agent only |
| Configuration location | AI Agent Manager settings | Individual agent settings |
| Fallback | Used when no local provider is defined | Overrides global provider |
| Use case | Default for most agents | Special requirements |

### Configuring a local provider {#configuring-local-provider}

To configure a local provider for an agent:

1. Navigate to **Administration** > **AI Agent Manager**.
2. Open the agent you want to configure or create a new agent.
3. In the agent configuration, expand the **Local provider** tab.

In this view you can configure your local provider (only with JSON). Therefore (depending on the provider to use) 
you can define a new `provider`, `model` or `apiKey`. This settings are always merged with the "global provider" and therefore allow to e.g. only overwrite the model to be used.

For example to use an Open AI API like LLM hosted for example on an own infrastructure, the following configuration could be used:
```json
{
  "provider": "openai",
  "model": "my-custom-gpt",
  "baseURL": "https://your-custom-endpoint.com/v1",
  "strictMode": false
}
```

### Testing local providers {#testing-local-providers}

After configuring a local provider:

1. Navigate to the **Test** tab of the agent.
2. Enter a test prompt.
3. Verify the response uses the local provider.

### Managing multiple local providers {#managing-multiple-providers}

You configure local providers independently for each agent. This allows you to:

- Use OpenAI for agent A, Anthropic for agent B, and Google for agent C.
- Test the same agent configuration with different models by creating duplicate agents with different local providers.
- Maintain separate API keys for different use cases or cost centers.

### Security considerations {#security-considerations}

- **API keys**: Local provider API keys are stored securely in {{< product-c8y-iot >}} and cannot be read after configuration. Only users with appropriate permissions access local provider settings.

- **Access control**: Ensure only authorized users have permission to configure agents and local providers, as this grants access to external AI services.

### Removing a local provider {#removing-local-provider}

To remove a local provider and revert to the global provider simply empty the JSON object.

### Troubleshooting local providers {#troubleshooting}

- **Agent not responding**: Verify the API key is valid and the provider account has sufficient credits.

- **Different results than expected**: Check the model selection and advanced settings in the local provider configuration.

- **Provider not available**: Ensure the provider is supported by the AI Agent Manager. For the current list of supported providers, refer to the Vercel AI SDK documentation.
