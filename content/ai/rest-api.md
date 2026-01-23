---
title: REST API
layout: bundle
outputs:
  - html
  - json
sector:
  - app_enablement
weight: 60
---

The AI Agent Manager provides a REST API for programmatic management of agents, providers, and conversations. This allows you to integrate AI agents into your own applications and workflows.


The AI Agent Manager REST API allows you to programmatically manage agents, configure providers, and interact with agents from your own applications, plugins, or microservices.

### API overview {#api-overview}

The API is exposed by the AI Agent Manager microservice at:

```
/service/ai/
```

All API endpoints require authentication with valid {{< product-c8y-iot >}} credentials. The API supports standard CRUD operations for agents, tools, and providers that mostly require the `ROLE_AI_AGENT_ADMIN` role. You best explore the full CRUD API via the OpenAPI documentation. You access this documentation in multiple ways:

- Download the OpenAPI JSON by accessing /service/ai/api-json. This file then loads into a tool like Postman or similar.
- Install the **AI Agent Manager OpenAPI** plugin from AI-Plugins in your **Administration** > **Ecosystem** > **Extensions** view into a cloned application. This lists all endpoints.

The following documentation only shows how you integrate already created agents into any UI or a third-party server. All endpoints are in the OpenAPI documentation.

### Interacting with agents {#interacting-with-agents}

To talk to an agent you require only the `ROLE_AI_AGENT_READ` role. The idea is, that any end-user can talk to an agent, but not all users can create, update or delete such agents. The following examples show how to use the API to talk to a already defined agent:


**Simple prompt:**

```
POST /service/ai/agent/text/{agent-name}
{
  "prompt": "What is the temperature of device 12345?"
}
```

Returns a plain text response.

**With variables:**

Use variables to inject dynamic data into prompts or system prompts:

```
POST /service/ai/agent/text/{agent-name}
{
  "variables": {
    "deviceId": "12345"
  },
  "prompt": "What is the status of device {{deviceId}}?"
}
```

Define variables in the system prompt using double curly brackets: `{{variableName}}`.

**Maintaining conversations:**

Use the `messages` array to maintain conversation context:

```
POST /service/ai/agent/text/{agent-name}
{
  "messages": [
    { "role": "user", "content": "Hi!" },
    { "role": "assistant", "content": "Hello! How can I help you?" },
    { "role": "user", "content": "Tell me about device 12345." }
  ]
}
```

The agent uses the conversation history to provide contextual responses.

**Full response format:**

Add `?fullResponse=true` to receive detailed JSON response:

```
POST /service/ai/agent/text/{agent-name}?fullResponse=true
{
  "prompt": "Hello"
}
```

The full response includes:
- Text response
- Tool calls and results
- Token usage statistics
- Reasoning steps (if enabled)
- Provider metadata

{{< c8y-admon-info >}}
The same APIs exist for an object agent. Only replace `text` with `object` in the url.
{{< /c8y-admon-info >}}

### Streaming

By switching the content-type to a streaming type, you get a streaming response from the API. Two modes are currently supported:

- Text only is returned if no query parameter is attached.
- A data SSE stream that also includes tool calls and status information is returned if the `?fullResponse=true` parameter is set.

Add the `text/event-stream` or `application/x-ndjson` accept header to force streaming. A `fullResponse` return is determined by two line breaks and the keyword `data:`.
 ```
