---
weight: 30
title: Text and object agents
layout: redirect
---

The AI Agent Manager supports two base types of agents: text agents and object agents. Understanding the difference helps you choose the right type for your use case.

### Text agents {#text-agents}

Text agents return natural language responses as plain text. They are designed for conversational interactions where the agent provides explanations, answers, or guidance in a human-readable format.

**Use cases:**
- Conversational interfaces where users ask questions in natural language.
- Explanations and guidance for device troubleshooting.
- General-purpose AI assistants that interact through chat.
- Generating reports or summaries in text format.

**Response format:**

By default, text agents return plain text:

```
The current temperature is 23.5°C and the humidity level is at 45%.
```

Add the `?fullResponse=true` query parameter to receive a JSON response with additional metadata, including tool calls, reasoning steps, and usage statistics.

**API endpoint:**

```
POST /service/ai/agent/text/{agent-name}
```

### Object agents {#object-agents}

Object agents return structured data in JSON format according to a predefined schema. They are designed for programmatic integrations where the response must follow a specific structure.

**Use cases:**
- APIs that require structured responses.
- Data extraction where specific fields must be populated.
- Integration with other systems that expect JSON.
- Form filling or data validation workflows.

**Response format:**

Object agents always return JSON that matches the defined schema:

```json
{
  "temperature": 23.5,
  "humidity": 45,
  "status": "normal"
}
```

**Schema definition:**

When creating an object agent, define the expected response structure using JSON schema:

```json
{
  "type": "object",
  "properties": {
    "temperature": {
      "type": "number",
      "description": "Current temperature in Celsius"
    },
    "humidity": {
      "type": "number",
      "description": "Current humidity percentage"
    },
    "status": {
      "type": "string",
      "enum": ["normal", "warning", "critical"]
    }
  },
  "required": ["temperature", "humidity", "status"]
}
```

The agent uses this schema to structure its response, ensuring consistent output format.

**API endpoint:**

```
POST /service/ai/agent/object/{agent-name}
```

**UI support:**

When creating an object agent a new **Schema** tab is shown. In this view you can define the correct schema and a validation will check, if you are following the right JSON Schema standard.

### Key differences {#key-differences}

| Aspect | Text agents | Object agents |
|--------|-------------|---------------|
| Response format | Plain text (or JSON with `?fullResponse=true`) | Always JSON |
| Schema | Not required | Requires JSON schema |
| Tools | Supports custom tools | Cannot use additional tools (uses tools internally for structuring) |
| Use case | Conversational AI | Programmatic integration |
| Flexibility | High - can adapt response format | Low - follows strict schema |

### Choosing the right type {#choosing-the-right-type}

**Choose text agents when:**
- Building conversational interfaces or chatbots.
- Users need natural language explanations.
- Response format varies based on context.
- You want to use custom tools for data access.

**Choose object agents when:**
- Integrating with APIs or other systems.
- Response must follow a strict structure.
- Extracting specific data fields from user input.
- Building forms or structured data collection.

### Testing agent types {#testing-agent-types}

You test both agent types in the AI Agent Manager:

1. Navigate to **Administration** > **AI Agent Manager**.
2. Create or open an agent.
3. The agent type is selected during creation and cannot be changed later.
4. For object agents, define the JSON schema in the configuration.
5. Use the **Test** tab to verify responses match your expectations.

### Converting between types {#converting-between-types}

You cannot convert an existing agent from one type to another. To change the agent type, create a new agent with the desired type and copy the relevant configuration.
