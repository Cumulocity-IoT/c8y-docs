---
title: REST API
layout: bundle
outputs:
  - html
  - json
  - markdown
sector:
  - app_enablement
weight: 60
---

The AI Agent Manager provides a REST API for programmatic management of agents, providers, and conversations. This allows you to integrate AI agents into your own applications and workflows.

### API overview {#api-overview}

The API is exposed by the AI Agent Manager microservice at:

```
/service/ai/
```

All API endpoints require authentication with valid {{< product-c8y-iot >}} credentials. The API supports standard CRUD operations for agents, tools, providers, and tenant settings that mostly require the ROLE_AI_AGENT_ADMIN permission. You best explore the full CRUD API via the OpenAPI documentation. You access this documentation in multiple ways:

- Download the OpenAPI JSON from `/service/ai/api-json`. You can load this file into a tool like Postman.
- To browse the API interactively within your tenant, subscribe to and install the **Api-doc** extension from **Administration** > **Ecosystem** > **Extensions**, then open the **API documentation** application. It lists the APIs of all microservices in your tenant that provide an OpenAPI specification, including the AI Agent Manager.

The following documentation only covers how to integrate agents that are already created into any UI or third-party server. All endpoints are explained in the OpenAPI documentation.

### Interacting with agents {#interacting-with-agents}

To talk to an agent, you only require the `ROLE_AI_AGENT_READ` permission. The idea is that any end-user can talk to an agent, but not all users can create, update, or delete such agents. The following examples show how to use the API to talk to an already defined agent:


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

**Request body:**

The request body is validated, and requests that don't follow these rules are rejected with the HTTP status 400 (Bad Request):

- Only the fields `prompt`, `messages`, and `variables` are accepted. Unknown fields are rejected. Settings such as the temperature or the maximum output tokens cannot be passed per request. Define them in the [agent settings](/ai/agents/#ai-agent-settings) instead.
- Use either `prompt` or `messages`, but not both.
- `messages` must not contain an entry with the role `system`. The system prompt is defined in the `system` field of the agent definition.

**Full response format:**

Add `?fullResponse=true` to receive a detailed JSON response:

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

The raw request and response bodies exchanged with the LLM provider (`steps[].request.body` and `steps[].response.body`) are not included in the full response.

**Object agents:**

The same APIs exist for an object agent. Only replace `text` with `object` in the URL:

```
POST /service/ai/agent/object/{agent-name}
{
  "prompt": "John Doe lives at 123 Main Street"
}
```

The output of an object agent is validated against the JSON schema of the agent, including string formats such as `date-time` or `email`. If the generated object doesn't match the schema, the request fails with the HTTP status 400 instead of returning the object.

### Resolving agents of an application {#resolving-agents-of-an-application}

Agents that are provided by an application or plugin can exist in several versions, see [Subscribed agent versioning](/ai/agents/#versioning-agents). To use the agent of a specific application, add the `x-from-app` header with the context path of the application, for example, `my-app` for an application available under `/apps/my-app`, or `my-app@1.0.1` for a versioned plugin:

```
POST /service/ai/agent/text/{agent-name}
x-from-app: my-app@1.0.1
{
  "prompt": "What is the status of device 12345?"
}
```

If a custom agent with the same name exists, it still takes precedence over the agent of the application. The AI Agent Manager forwards the header automatically to all agent-to-agent calls, so subagents are resolved from the same application.

The header is supported by the endpoints that read, test, and talk to a single agent. The `fromApp` query parameter, which was used for the same purpose, is deprecated. Use the `x-from-app` header instead.

### Streaming {#streaming}

To receive a streaming response, set the `Accept` header to `text/event-stream` or `application/x-ndjson`. In both cases, the response is a stream of server-sent events with the content type `text/event-stream`. Each event consists of a line starting with `data:` followed by a JSON value, and an empty line.

Two modes are supported:

- Without a query parameter, each event contains the next chunk of the response text as a JSON string.
- With `?fullResponse=true`, each event contains a JSON object that describes a part of the response, such as the start of a step, a text delta, a tool call, a tool result, or the token usage.

The following examples show the response for the prompt "Hello world" with the [Echo provider](/ai/control-panel/#adding-model-configuration), which returns the input with the prefix "Echo: ".

Without `?fullResponse=true`:

```
data: "Echo: "

data: "Hello "

data: "world"

```

With `?fullResponse=true`:

```
data: {"type":"start"}

data: {"type":"start-step","request":{},"warnings":[]}

data: {"type":"text-start","id":"text-1"}

data: {"type":"text-delta","id":"text-1","text":"Echo: "}

data: {"type":"text-delta","id":"text-1","text":"Hello "}

data: {"type":"text-delta","id":"text-1","text":"world"}

data: {"type":"text-end","id":"text-1"}

data: {"type":"finish-step","finishReason":"stop","rawFinishReason":"stop","usage":{"inputTokens":17,"outputTokens":5,"totalTokens":22},"response":{"id":"aitxt-pGyMbD2YGEkFHuTacgM3ziJk","timestamp":"2026-10-20T14:01:25.845Z","modelId":"echo"}}

data: {"type":"finish","finishReason":"stop","rawFinishReason":"stop","totalUsage":{"inputTokens":17,"outputTokens":5,"totalTokens":22}}

```

The `usage` objects are shortened in this example. The `start-step` events don't include the request body sent to the LLM provider. The model that answered is available as `response.modelId` in the `finish-step` events.

### Testing agent definitions {#testing-agent-definitions}

Users with the ROLE_AI_AGENT_ADMIN permission can test an agent definition without saving it, with `POST /service/ai/agent/test/text` for text agents and `POST /service/ai/agent/test/object` for object agents. The request body is a complete agent definition, including the `prompt` to send. Streaming and `?fullResponse=true` work the same way as for saved agents.

To test integrations without calling an LLM provider and without costs, use the `echo` provider. For text agents, it returns the input with the prefix `"Echo: "`. For object agents, it returns a mock object based on the JSON schema:

```
POST /service/ai/agent/test/text
{
  "name": "test-agent",
  "provider": {
    "name": "echo",
    "model": "echo"
  },
  "agent": {
    "system": "You are a helpful assistant.",
    "prompt": "Hello world"
  }
}
```

Returns `Echo: Hello world`.

### Tenant settings {#tenant-settings}

The tenant-wide settings of the AI Agent Manager, such as the kill switch of the [control panel](/ai/control-panel/#ai-agent-availability), are available at `/service/ai/settings`:

- `GET /service/ai/settings` returns the current settings. Requires the ROLE_AI_AGENT_ADMIN or ROLE_AI_AGENT_READ permission.
- `PUT /service/ai/settings` updates the provided fields and keeps all other fields. Requires the ROLE_AI_AGENT_ADMIN permission.
- `POST /service/ai/settings` replaces all settings. Fields that are not provided are reset to their default value. Requires the ROLE_AI_AGENT_ADMIN permission.

| Field | Default | Description |
|-------|---------|-------------|
| `killSwitch` | `false` | If `true`, all AI agents of the tenant are disabled. |
| `telemetryOptOut` | `false` | If `true`, the tenant opts out of the [{{< company-c8y >}}-managed telemetry export](#managed-telemetry-export). |
| `telemetryExport` | `{"enabled": false}` | The configuration of the [OpenTelemetry export](/ai/control-panel/#opentelemetry-export) to your own collector, see below. |

For example, to disable all AI agents of the tenant:

```
PUT /service/ai/settings
{
  "killSwitch": true
}
```

While `killSwitch` is `true`, every agent run is rejected with the HTTP status 403 (Forbidden) and the message "AI agents are disabled for this tenant". This applies to text and object agents, streaming calls, and tests.

#### OpenTelemetry export {#opentelemetry-export}

The `telemetryExport` object configures the [OpenTelemetry export](/ai/control-panel/#opentelemetry-export) of the control panel. Some of its fields are only available via the REST API.

| Field | Default | Description |
|-------|---------|-------------|
| `enabled` | `false` | Required. If `true`, a trace of every agent run is exported to `endpoint`. |
| `endpoint` | - | The OTLP/HTTP base URL of the collector, for example, `https://collector.example.com:4318`. The path `/v1/traces` is appended automatically. |
| `protocol` | `http/protobuf` | The OTLP/HTTP encoding, `http/protobuf` or `http/json`. Only available via the REST API. |
| `serviceName` | `c8y-ai-agents` | The resource attribute `service.name` of the exported traces. Only available via the REST API. |
| `sampleRatio` | `1` | The share of agent runs that is exported, from `0` to `1`. For example, `0.25` exports every fourth run on average. Only available via the REST API. |
| `recordContent` | `true` | If `true`, the prompts, responses, and tool call arguments and results are included in the traces. |
| `recordUserId` | `false` | If `true`, the ID of the user who ran the agent is included in the traces. |
| `traceViewerUrlTemplate` | - | A URL with the placeholder `{telemetryId}` that the [Observability](/ai/observability/) page uses to link runs to their trace. |

`PUT /service/ai/settings` replaces the `telemetryExport` object as a whole, so always provide all of its fields that you want to keep. For example, to export half of the agent runs as JSON without content:

```
PUT /service/ai/settings
{
  "telemetryExport": {
    "enabled": true,
    "endpoint": "https://collector.example.com:4318",
    "protocol": "http/json",
    "sampleRatio": 0.5,
    "recordContent": false,
    "recordUserId": false,
    "traceViewerUrlTemplate": "https://grafana.example.com/explore?traceID={telemetryId}"
  }
}
```

The auth token of the export is not part of the settings. It is stored encrypted and managed at `/service/ai/settings/telemetry/credentials`. All requests require the ROLE_AI_AGENT_ADMIN permission:

- `GET /service/ai/settings/telemetry/credentials` returns whether a token is stored and the header name, for example, `{"configured": true, "authHeaderName": "Authorization"}`. The token is never returned.
- `PUT /service/ai/settings/telemetry/credentials` stores the token. Provide the full header value as `authToken`, for example, `{"authHeaderName": "Authorization", "authToken": "Bearer <token>"}`. If `authHeaderName` is not provided, `Authorization` is used. To change only the header name and keep the stored token, send `***` as `authToken`.
- `DELETE /service/ai/settings/telemetry/credentials` removes the token.

#### {{< company-c8y >}}-managed telemetry export {#managed-telemetry-export}

Depending on your {{< product-c8y-iot >}} environment, the AI Agent Manager also exports a trace of every agent run to an OpenTelemetry collector operated by {{< company-c8y >}}. These traces include the prompts, responses, and tool call arguments and results of the agent runs, but never the ID of the user who ran the agent. This export is independent of your own `telemetryExport` and of its `recordContent` setting.

To opt out of the {{< company-c8y >}}-managed telemetry export, set `telemetryOptOut` to `true`:

```
PUT /service/ai/settings
{
  "telemetryOptOut": true
}
```

The opt-out is only available via the REST API. It does not affect your own `telemetryExport` or the [Observability](/ai/observability/) page, which keep working.

### Observability {#observability}

The audit trail of the [Observability](/ai/observability/) page is available at `/service/ai/observability`. Both requests require the ROLE_AI_AGENT_ADMIN or ROLE_AI_AGENT_READ permission and only return metadata, never the content of a run.

`GET /service/ai/observability` returns the agent runs of the tenant, newest first. It supports the following query parameters:

| Parameter | Description |
|-----------|-------------|
| `pageSize` | The number of runs per page. The default is 50. |
| `currentPage` | The page to return, starting with 1. |
| `dateFrom`, `dateTo` | Only return runs in this time range, as ISO 8601 date. |
| `sortOrder` | `desc` (default) for newest first, `asc` for oldest first. |
| `agentName` | Only return runs of agents whose name contains this text, regardless of upper or lower case. Only the 2000 newest runs of the date range are searched. |

For example, `GET /service/ai/observability?pageSize=1&agentName=weather` returns:

```json
{
  "records": [
    {
      "id": "8712",
      "time": "2026-10-27T09:41:12.512Z",
      "kind": "run",
      "agentName": "weather-agent",
      "runResult": "succeeded",
      "durationMs": 2380,
      "usage": { "inputTokens": 1820, "outputTokens": 164, "totalTokens": 1984 },
      "finishReason": "stop",
      "telemetryId": "4bf92f3577b34da6a3ce929d0e0e4736",
      "user": "jane.doe"
    }
  ],
  "currentPage": 1,
  "pageSize": 1,
  "totalRecords": 12
}
```

`runResult` is `succeeded` or `failed`. The `telemetryId` is the ID of the OpenTelemetry trace of the run.

`GET /service/ai/observability/tools?telemetryId=<telemetryId>` returns the tool calls of a run in the order they were called, in the same format with `kind` set to `tool`. Each record has a `toolName` and a `toolCallResult`, which is `succeeded`, `failed`, or `denied` if the user rejected the tool call. Only the 10000 newest tool calls of the date range are searched. To find the tool calls of older runs, limit the request to the time of the run with `dateFrom` and `dateTo`. The `time` of a run is the time when it ended, so use the `time` minus the `durationMs` of the run as `dateFrom` and the `time` as `dateTo`, with a few seconds of margin on both sides.
