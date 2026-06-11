---
weight: 7
title: AI assistant
layout: bundle
outputs:
  - html
  - json
sector:
  - device_management
---

The AI assistant is the primary interface for creating and refining smart functions in Data Preparation. Instead of writing code manually, you describe what your device data looks like and what you want to achieve, and the AI generates the Javascript transformation logic for you.

{{< c8y-admon-important >}}
AI-generated code is produced on a best-effort basis. Always review the generated smart function and test cases before deploying a rule to production. Verify that the code handles your data correctly by running the provided tests and inspecting the outputs.
{{< /c8y-admon-important >}}

The AI assistant is powered by the [AI Agent Manager](/ai/aim-introduction/). To use the assistant, your tenant must have a [global AI provider configured](/ai/aim-introduction/#getting-started-by-configuring-a-global-provider). If you need to use a specific AI model or provider for Data Preparation, you can configure a [local provider](/ai/agents/#local-providers) for the Data Preparation agent.

### Overview {#overview}

The AI assistant panel is on the left side of the rule editor. You interact with it by typing messages in the text box or by selecting one of the suggested actions. The AI responds with explanations in the chat and updates the smart function code and test cases directly in their respective panels.

When you create/open a new rule, the AI greets you and offers several starting points:

- **Convert to a Cumulocity measurement** — generate code to map device data to measurements.
- **Convert to a Cumulocity alarm** — generate code to create alarms from device conditions.
- **Help me to generate input data to test with** — produce sample payloads for your tests.
- **Create a rule based on information about the IoT device** — describe your device and let the AI determine the correct data format.

### Writing effective prompts {#effective-prompts}

The quality of the generated code depends on the context you provide. The more specific and detailed your prompt, the better the result.

#### Provide sample data {#provide-sample-data}

The most effective approach is to add a representative payload to the **Test data** panel before prompting. When sample data is present, the AI analyzes its structure and generates code that matches your actual device output exactly.

For example, enter a JSON payload in the test data input:

```json
{"temperature": 22.5, "humidity": 65, "batteryLevel": 87}
```

Then ask: "Convert to a Cumulocity measurement"

The AI uses the field names, value types, and structure from your sample to produce precise transformation code.

#### Be specific about your requirements {#specific-requirements}

Good prompts include:

- **The data format**: JSON, CBOR, binary, Protobuf, OPC UA, or other protocols.
- **Which fields to extract**: Name the sensor readings, statuses, or identifiers you need.
- **The desired output type**: Measurements, events, alarms, or a combination.
- **Units and naming**: Specify units (°C, %, hPa) and the Cumulocity fragment names you prefer.
- **Conditional logic**: Describe thresholds or conditions (for example, "raise an alarm if temperature exceeds 80°C").

**Examples of effective prompts:**

| Prompt | Why it works |
|--------|--------------|
| "My device sends JSON with fields temp and vibration. Convert into two measurements using the clientID as the externalId." | Specifies format, fields, output type, and device identity. |
| "My HVAC device gives a temperature reading. Always send a measurement. If temperature is above 76°F, also raise an alarm." | Describes conditional logic clearly. |
| "I have a Modbus device sending binary data. Here is the decode function..." | Provides the codec so the AI can integrate it directly. |
| "Convert this climate sensor JSON to a measurement. Filter out readings where temperature is below 15°C or above 35°C." | Includes validation requirements. |

#### Prompts to avoid {#prompts-to-avoid}

- Vague requests without sample data or context (for example, "Write me some code").
- Prompts that assume the AI knows your specific device without providing its data format.
- Requests to use features not supported by the smart function API — the AI informs you if something is not possible.

### Using suggestions {#using-suggestions}

After each response, the AI offers clickable **suggested next requests** that guide you toward common next steps. These suggestions are contextual — they change based on the current state of your code and conversation.

Click any suggestion to send it as your next message. You can also type your own request instead.

### Tool call indicators {#tool-call-indicators}

When the AI updates the smart function or test cases, you see confirmation indicators in the chat:

- **Updated smart function** — the AI has modified the Javascript code in the code editor.
- **Updated tests** — the AI has added or modified test cases in the test data panel.

These indicators confirm that the corresponding panel has been updated. Expand them to see a summary of what changed.

### Explaining code {#explaining-code}

To understand what the current smart function does, click **Explain code** above the code editor. The AI responds in the chat with a plain-language description of the transformation logic — explaining what data is extracted, how it is processed, and what outputs are produced.

This is useful when you inherit a rule from another user or want to verify the behavior of AI-generated code before deploying.

### Iterative refinement {#iterative-refinement}

You do not need to get everything right in a single prompt. The AI maintains context across the conversation, so you can build up your smart function step by step:

1. Start with a simple conversion (for example, "Convert to a Cumulocity measurement").
2. Add complexity (for example, "Also group humidity and pressure into a separate fragment called c8y_Environment").
3. Handle edge cases (for example, "Add error handling for missing fields").
4. Generate tests (for example, "Generate test cases to validate this code").

Each iteration builds on the previous code. The AI does not start from scratch unless you explicitly ask it to.

### Fixing failing tests {#fixing-failing-tests-ai}

If tests fail after a code change, click **Fix smart function**. The AI analyzes the failing tests, identifies what went wrong, and updates the code so that all tests pass. Review the changes before deploying — the AI adjusts code to match your expected outputs, so confirm the changes are correct across all scenarios.

### Working with binary and IoT-specific data {#binary-data}

The AI supports a range of IoT data formats beyond JSON:

- **CBOR** — Concise Binary Object Representation, common in constrained IoT devices.
- **Protobuf** — Protocol Buffers, used by gRPC and Sparkplug B.
- **OPC UA** — Binary DataValue and Variant encoding for industrial protocols.
- **Base64-encoded payloads** — the AI can decode and process these.

When working with binary data, provide either:
- A sample payload (the AI attempts to detect the format automatically), or
- A description of the format or a decode function for the AI to integrate.

If the AI cannot determine the format, it asks for clarification rather than guessing.

### Test generation {#test-generation}

Ask the AI to generate test cases for your current code. The AI creates tests that cover:

- Normal operation with typical values.
- Edge cases such as zero values, boundary conditions, or extreme readings.
- Error scenarios with missing fields or unexpected data types.

To protect your test suite, the AI only adds or modifies tests — it never deletes existing tests. If you ask the AI to remove a test, it explains this limitation and offers to create a new test with updated content instead.

When the number of tests grows large, the AI can offer to consolidate related tests by grouping similar scenarios into a single test with multiple inputs, while leaving the original tests untouched for you to clean up manually.

### Limitations {#limitations}

The AI assistant is designed to help you work efficiently while protecting your data:

- **Tests are protected** — the AI adds and updates tests but never deletes them. Your test suite only grows, ensuring previously validated scenarios remain covered.
- **Code stays within the smart function API** — the AI only generates code that uses the supported [smart function interfaces](/data-preparation/smart-functions/). If you request something outside the API capabilities, the AI informs you of the limitation.
- **Best-effort generation** — while the AI produces high-quality code for most IoT scenarios, always run tests and review the output before deploying. Complex or unusual data formats may require additional prompts or manual adjustments.
- **Recommended AI model** — the assistant uses the AI model configured in your tenant's AI Agent Manager. The quality of responses depends on the configured provider. Anthropic’s claude-sonnet-4-6 is the recommended and tested model.
