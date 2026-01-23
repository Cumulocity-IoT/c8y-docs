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

**Different model requirements**: Some use cases benefit from specific models. For example, use a faster, cheaper model for simple queries and a more powerful model for complex reasoning tasks.

**Cost optimization**: Route less critical agents to more cost-effective models while keeping important agents on premium models.

**Provider-specific features**: Access features only available from certain providers, such as extended thinking modes or specialized capabilities.

**Testing and comparison**: Test different models side-by-side by creating multiple agents with different local providers.

**Separate billing**: Use different API keys for different agents to track usage or allocate costs to different departments.

### Global provider vs local provider {#global-vs-local}

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
3. In the agent configuration, expand the **Provider** section.
4. Select **Use local provider** instead of global provider.
5. Choose the provider (for example, Anthropic, OpenAI).
6. Select the model to use.
7. Enter the API key for this provider (stored securely in the platform).
8. Add any advanced provider-specific settings in the **Advanced** tab.
9. Click **Save**.

The agent now uses its local provider configuration instead of the global provider.

### Advanced provider options {#advanced-options}

Local providers support advanced configuration through provider-specific options. These options vary by provider and allow you to customize behavior.

**Example: Enable thinking mode for Anthropic:**

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

**Example: Custom base URL for OpenAI-compatible APIs:**

```json
{
  "openai": {
    "baseURL": "https://your-custom-endpoint.com/v1",
    "strictMode": false
  }
}
```

For available options, refer to the Vercel AI SDK documentation for your specific provider.

### Testing local providers {#testing-local-providers}

After configuring a local provider:

1. Navigate to the **Test** tab of the agent.
2. Enter a test prompt.
3. Verify the response uses the local provider.
4. Enable debug mode to see provider information in the response metadata.

### Managing multiple local providers {#managing-multiple-providers}

You configure local providers independently for each agent. This allows you to:

- Use OpenAI for agent A, Anthropic for agent B, and Google for agent C.
- Test the same agent configuration with different models by creating duplicate agents with different local providers.
- Maintain separate API keys for different use cases or cost centers.

### Security considerations {#security-considerations}

**API keys**: Local provider API keys are stored securely in {{< product-c8y-iot >}} and cannot be read after configuration. Only users with appropriate permissions access local provider settings.

**Access control**: Ensure only authorized users have permission to configure agents and local providers, as this grants access to external AI services.

### Removing a local provider {#removing-local-provider}

To remove a local provider and revert to the global provider:

1. Open the agent configuration.
2. In the **Provider** section, select **Use global provider**.
3. Click **Save**.

The agent now uses the global provider configuration.

### Troubleshooting local providers {#troubleshooting}

**Agent not responding**: Verify the API key is valid and the provider account has sufficient credits.

**Different results than expected**: Check the model selection and advanced settings in the local provider configuration.

**Provider not available**: Ensure the provider is supported by the AI Agent Manager. For the current list of supported providers, refer to the Vercel AI SDK documentation.
