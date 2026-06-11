---
weight: 9
title: Rule creation and management
layout: bundle
sector:
  - device_management
---

The Data Preparation rules list is where you create, view, and manage your rules. Each rule defines how incoming device messages from a specific source are processed and transformed into {{< product-c8y-iot >}} objects.

For a guided walkthrough of the full process, see [Getting started](/data-preparation/getting-started-dataprep/). For details on writing and editing smart functions in the rule editor, see [Rule editor](/data-preparation/rule-editor/).

### To create a rule {#create-rule}

1. Open the Data Preparation application. The rules list shows the list of existing rules for transforming device messages into {{< product-c8y-iot >}} objects.
2. Click **Create rule** to open the rule creation wizard.

The wizard guides you through three steps:

1. **Source** — configure the transport and topic or client ID filter. Then choose whether to start by capturing live messages from the transport, or skip so you can manually enter test data after the rule is created. 
2. **Live capture** (optional) — if you choose to capture, the platform listens for messages matching your filters and displays them in real time. Select a captured message to use as the initial test data for your rule. For details, see [Live capture](#live-capture).
3. **Confirm and create** — review or edit the source configuration, then enter a **name** and optional **description** for the rule. On this page you can edit the source configuration if the filter for the rule itself should be different from the filter you used to capture the sample data. 

Click **Create** to add the rule and open the rule editor.

For a step-by-step guide to creating a rule, see [Create your first rule](/data-preparation/getting-started-dataprep/#create-rule).

### Live capture {#live-capture}

Live capture lets you inspect real incoming device messages to get a sample message to use for creating and testing your rule. This is the easiest way to get started when your devices are already connected and sending data to the platform.

To use live capture to select a sample message for your new rule:
- Click **Create rule** to open the rule creation wizard. 
- Use the **Source** fields on the first page to specify which messages should be captured for the rule you are creating. You can use `*` wildcards if you don't know the exact topic or client ID, but make sure your filters are specific enough to focus on the device you wish to onboard. 
- Click **Start live capture from device**. The wizard advances to the live capture step and begins listening for messages that match your filters. Incoming messages appear in a list as they arrive. Each entry shows the timestamp, topic, and client ID.
- Click a message in the list to select it. The selected message is added as a test message when the rule is created.
- If you do not see the expected messages or realize you have entered the wrong filters, click **Edit Capture Source** to change the topic or client ID filter and start a new capture session. Alternatively, you can click **Back** to cancel live capture and click **Enter test data later** to proceed directly to the confirm step.
- Click **Next** to proceed to the confirm step and finish creating the rule.

Live capture stops automatically after 20 messages are received, or after 5 minutes. When capture stops, you can click **Resume** to continue capturing more messages. 

After the wizard completes, you can edit the captured message, or duplicate it to create new tests for edge cases such as missing or out of range values. 

### To save or deploy a rule {#save-deploy-rule}

In the rule editor, you have two options for saving your rule:

- Click **Save draft** to save the current code and test data without affecting what is deployed. If the rule is already deployed, the previously deployed version continues to run unaffected.
- Click **Save and deploy** to save the current draft and deploy it, which updates the deployed state to the current draft rule and enables it. The status chip at the top of the editor indicates when it is deployed and processing live messages. 

When you deploy a rule and it creates an object (such as a measurement) for a device that the platform has not seen before, the platform creates a new device automatically. For details, see [Device onboarding](/data-preparation/device-onboarding/).

#### Deployment status {#deployment-status}

Each rule has deployment status chips that indicate whether it is currently processing live messages, and if the current draft is different to the deployed version:

| Status | Description |
|---|---|
| **Deployed** | The rule is active and processing incoming messages. |
| **Not deployed** | The rule exists but is not active. |
| **Draft changed since last deployment** | The rule is deployed, but the draft has been edited since the last deployment. Live processing continues with the last deployed version. |

The draft and deployed versions of a rule are independent. You can edit a draft freely without affecting the deployed version. The platform only updates the deployed version when you click **Save and deploy** in the rule editor.

### Managing rules {#managing-rules}

The rules list gives you an overview of all rules in your tenant. Click **Configure columns** to select which rule details to show or hide:

- **Name**: the rule name. Click the name to open the rule editor.
- **Source**: the transport and filters configured for the rule.
- **Description**: the optional description entered when the rule was created.
- **Deployment status**: the current deployment status of the rule.

#### Searching and filtering {#search-filter}

Use the search bar at the top of the list to filter rules by name, source, or description. The list updates as you type.

#### Reloading the list {#reload}

Click the **Reload** button to refresh the rules list and show the latest deployment statuses.

### To edit a rule {#edit-rule}

- Click the rule name in the list. The rule editor opens for that rule.

In the rule editor you can update the smart function code, add test data, and run tests. For a full reference of the rule editor and its panels, see [Rule editor](/data-preparation/rule-editor/).

### To delete a rule {#delete-rule}

- Click the **Delete** icon <i class="dlt-c8y-icon-editing-trash text-danger icon-20"></i> next to the rule in the list. The rule is permanently deleted from both the draft and deployed state. This action cannot be undone.

{{< c8y-admon-important >}}
Deleting a deployed rule stops it immediately. No further messages are processed by that rule after deletion.
{{< /c8y-admon-important >}}
