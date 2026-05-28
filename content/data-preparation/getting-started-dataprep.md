---
weight: 8
title: Getting started
layout: bundle
sector:
  - device_management
---

This walkthrough guides you through creating and deploying your first Data Preparation rule that maps device messages into {{< product-c8y-iot >}} measurements. It covers the full journey: creating a rule, generating code with the AI assistant, testing it, and deploying it.

For background on what Data Preparation is and what rules do, see [Introduction](/data-preparation/). For a reference of the rule editor's panels, see [Rule editor](/data-preparation/rule-editor/). For details on writing smart functions, see [Smart functions](/data-preparation/smart-functions/).

### Before you start {#prerequisites}

You need:

- A tenant with Data Preparation enabled. Data Preparation is currently in Private Preview --- contact [product support](/additional-resources/contacting-support/) to enable it.
- Access to the AI Agent Manager for AI-assisted code generation. See the [AI Agent Manager](/ai/) documentation.
- A sample message payload you want to process. For this walkthrough, any JSON payload works.

### Step 1: Create your first rule {#create-rule}

1. Open the Data Preparation application. The landing page shows your list of rules. On a fresh tenant the list is empty.
2. Click **Create rule** to open the rule creation wizard.

The wizard has three pages:

1. **Source transport**: select the transport from which messages will be received. MQTT is currently the only supported transport.
2. **Filter**: specify a topic filter or a client ID filter. These determine which incoming messages this rule processes.
   - **Topic filter**: Only process messages about specific data types or device functions. For example, `sensors/temperature` captures all temperature readings. Use `*` as a wildcard (e.g., `sensors/factories/France/*` captures all sensor data from that region).
   - **Client ID filter**: If you do not know the topic for your device data, use the client ID to filter for messages from specific devices or device gateways. For example, your device's serial number or assigned device ID. Use `*` as a wildcard (e.g., `serial-number-1af2`, `gateway-*`).
   
   Note that these are not MQTT-style filters --- use `*` rather than `#` or `+`.
3. **Confirm**: review the source, topic, and client ID, then enter a **name** and **description** for the rule.

Click **Create** to finish. The new rule is created in the **draft** state and the rule editor opens.

### Step 2: Provide sample data {#provide-sample-data}

The rule editor shows the AI assistant panel and an empty sample data area. Paste a representative payload into the sample data field, for example:

```json
{ "deviceId": "SN-001", "tempCelsius": 22.5 }
```

The AI assistant uses this sample to understand the structure of your messages.

### Step 3: Generate code with the AI assistant {#generate-code}

The AI assistant offers a set of suggested prompts to get you started. For this walkthrough:

1. Click the **Convert to a {{< product-c8y-iot >}} measurement** suggestion.
2. The AI generates a smart function and explains what it did. The generated code appears in a panel that pops up from the bottom of the editor.
3. To get a more detailed explanation of any part of the code, click **Explain code**.

You can refine the code by sending further prompts to the AI. The AI also suggests follow-up actions you can apply with one click.

For more on what the AI assistant can do and how it works, see the [AI chat](/data-preparation/rule-editor/#ai-chat) section of the rule editor reference.

### Step 4: Test the rule {#test-rule}

The test output panel appears alongside the sample data. To check that the smart function does what you expect:

1. Make sure your sample data is in the test input area. See [Test data](/data-preparation/rule-editor/#test-data) for details on managing test inputs.
2. Click **Run tests**. The platform compiles and executes your smart function against the sample input.
3. Review the resulting output: the {{< product-c8y-iot >}} objects (measurements, events, alarms, operations) the function would produce, along with any log output.

If the output is not what you expect, ask the AI to refine the code, then run the tests again. Repeat until the output is correct.

### Step 5: Deploy the rule {#deploy-rule}

When you have finished editing your smart function, click **Save and deploy**. The platform:

- Saves the current draft as the deployed version of the rule.
- Starts the rule running against live device traffic.
- Begins mapping incoming messages into {{< product-c8y-iot >}} objects according to your smart function.

If a measurement is produced for a device the platform has not seen before, a new device is created automatically based on the `externalId` in the measurement.

### Draft and deployed states {#draft-deployed}

Each rule has two versions:

- The **draft** version is what you edit in the rule editor. Changes to the draft do not affect live processing.
- The **deployed** version is what runs against live device traffic. It is updated only when you click **Save and deploy**.

This separation lets you safely iterate on a rule --- including with the AI assistant and test runs --- without disturbing the running version. You can edit the draft as much as you like; the deployed rule keeps running with its last-saved smart function until you redeploy.

### Next steps {#next-steps}

Your rule now appears on the Data Preparation landing page with its deployment status. From here you can:

- Continue to refine the rule. Open it from the landing page and edit the draft. Click **Save and deploy** to push your changes live.
- Create additional rules for other topics, transports, or message formats.
- Learn more about the editor and what each panel does in [Rule editor](/data-preparation/rule-editor/).
- Learn how to write smart functions directly, including the full API and examples, in [Smart functions](/data-preparation/smart-functions/).
