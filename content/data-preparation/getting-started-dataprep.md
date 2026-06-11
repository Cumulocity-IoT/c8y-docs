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

1. Open the Data Preparation application. The main page shows your list of rules.
2. Click **Create rule** to open the rule creation wizard.

The wizard has three steps:

1. **Source** — configure which messages will be handled by this Data Preparation rule by specifying the transport and at least one filter:
   - **Source transport**: select the transport from which messages are received. Currently this is always MQTT.
   - **Topic filter**: filter based on the MQTT topic the device messages are received from. Use `*` as a wildcard to match zero or more characters, for example,  `/sensors/factories/France/*/temperature/*` captures all temperature sensor data from that region. Note that transport-specific wildcards such as `+` and `#` are not supported here. 
   - **Client ID filter**: if you do not know the topic, filter by the client ID of your device or gateway instead. Use `*` as a wildcard if needed, for example, `serialnumber-1aaaf2ac-*`, `device-gateway-1234*`.
   If your device is already connected to Cumulocity you can now capture a device message to test with using the source data you entered. Alternatively you can skip the live capture and enter your device messages for testing manually after creating the rule. 
2. **Live capture** (optional) — if you started a live capture, messages matching your filters appear in a list as they arrive. Select one message to use as the initial test data for your rule, then click **Next**. See [Live capture](/data-preparation/rule-creation-management/#live-capture) for more information.
3. **Confirm and create** — review the source configuration and enter a **name** and optional **description** for the rule. On this page you can edit the source configuration if the filter for the rule itself should be different from the filter you used to capture the sample data. 

Click **Create** to add the rule and open the rule editor.

### Step 2: Provide test data {#provide-sample-data}

The rule editor shows the AI assistant panel, and the test data area where you enter expected device messages to guide the AI assistant and to check your data preparation rule handles the messages correctly. 

If you selected a message using live capture during rule creation, the captured message is already shown as a test input. If not, you can manually enter a typical payload into the input area, for example:

```json
{ "deviceId": "SN-001", "tempCelsius": 22.5 }
```

### Step 3: Generate smart function code with the AI assistant {#generate-code}

The AI assistant offers a set of suggested prompts to get you started. For this walkthrough:

1. Click the **Convert to a {{< product-c8y-iot >}} measurement** suggestion.
2. The AI generates a smart function and explains what it did. The generated code appears in a panel that pops up from the bottom of the editor. Review this to check the logic is correct.
3. You can refine the code by sending further prompts to the AI. The AI also suggests follow-up actions you can apply with one click.
4. To get a more detailed explanation of the code at any time, click **Explain code**.

For more on what the AI assistant can do and how it works, see the [AI chat](/data-preparation/rule-editor/#ai-chat) section of the rule editor reference.

### Step 4: Test the rule {#test-rule}

The test output panel appears alongside the input data. To check that the smart function produces the desired outputs:

1. Make sure your test data is in the input area. See [Test data](/data-preparation/rule-editor/#test-data) for details on managing test inputs.
2. Click **Run tests**. The platform executes your smart function against the test input.
3. Review the resulting output: the {{< product-c8y-iot >}} objects (measurements, events, alarms, operations) the function would produce and the {{< product-c8y-iot >}} external "source" device it would create them on. Any `console.log` output from the smart function is also displayed here. 
4. If the output is not what you expect, ask the AI to refine the code, then run the tests again. Repeat until the output is correct.
5. (Optional) Once the output is correct, click **Save expected output** to record the correct output for this test. If you make further changes that produce different output when you run the tests in future, this will be flagged as an error. This automated verification avoids the need to keep manually checking the output to avoid regressions. 
6. (Optional) You can now add more tests to check for edge cases such as missing values, out of range values, and other inputs that might require special handling in your rule. To do this, open the tests drop-down, and duplicate the existing test to a new one that describes what it's for. You can also generate tests using the AI assistant. For any edge cases where it's not possible to generate a valid {{< product-c8y-iot >}} object, raise a Javascript exception so that an alarm will be created to notify you about the problem. 

While working on the draft rule, click **Save** regularly to ensure your changes are persisted. 

### Step 5: Deploy the rule {#deploy-rule}

When you have finished editing your smart function, click **Save and deploy**. The platform:

- Saves the current draft code and also copies it to the deployed version of the rule.
- Starts the rule running against live device traffic, so that incoming messages will be transformed into {{< product-c8y-iot >}} objects using your smart function.

If a measurement or alarm is produced for a device the platform has not seen before, a new device is created automatically based on the `externalId` in the measurement. For details, see [Device onboarding](/data-preparation/device-onboarding/).

### Draft and deployed states {#draft-deployed}

Each rule has two versions:

- The **draft** version is what you edit in the rule editor. Changes to the draft do not affect live processing.
- The **deployed** version is what runs against live device traffic. It is updated only when you click **Save and deploy**.

This separation lets you safely iterate on a rule --- including with the AI assistant and test runs --- without disturbing the running version. You can edit the draft as much as you like. The deployed rule keeps running with its last-saved smart function until you redeploy.

### Next steps {#next-steps}

Your rule now appears on the Data Preparation rule list with its deployment status. From here you can:

- Continue to work on the rule. Open it from the rules list page and edit the draft. Click **Save and deploy** to push your changes live.
- Create additional rules for other topics, transports, or message formats.
- Learn more about the editor and what each panel does in [Rule editor](/data-preparation/rule-editor/).
- Learn how to write smart functions directly, including the full API and examples, in [Smart functions](/data-preparation/smart-functions/).
