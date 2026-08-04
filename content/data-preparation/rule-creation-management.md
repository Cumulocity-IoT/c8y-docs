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

1. **Source** — configure the transport, and the topic or client ID filter. If other rules already exist, the **Topic filter** field suggests topics used by those rules as you type. Although you would not want to use exactly the same topic that is already handled by another rule, this helps with entering similar topic names, for example, where only the version suffix of a device is different. Then choose whether to start by capturing live messages from the transport, or skip capture and manually enter test data after the rule is created. 
2. **Live capture** (optional) — if you choose to capture, the platform listens for messages matching your filters and displays them in real time. Select a captured message to use as the initial test data for your rule. For details, see [Live capture](#live-capture).
3. **Confirm and create** — review or edit the source configuration, then enter a **name** and optional **description** for the rule. On this page you can edit the source configuration if the filter for the rule itself should be different from the filter you used to capture the sample data. 

Click **Create** to add the rule and open the rule editor.

For a step-by-step guide to creating a rule, see [Create your first rule](/data-preparation/getting-started-dataprep/#create-rule).

### Live capture {#live-capture}

Live capture lets you inspect real incoming device messages to get a sample message to use for creating and testing your rule. This is the easiest way to get started when your devices are already connected and sending data to the platform.

To use live capture to select a sample message for your new rule:
1. Click **Create rule** to open the rule creation wizard. 
2. Use the **Source** fields on the first page to specify which messages should be captured for the rule you are creating. You can use `*` wildcards if you don't know the exact topic or client ID, but make sure your filters are specific enough to focus on the device you wish to onboard. 
3. Click **Start live capture from device**. The wizard advances to the live capture step and begins listening for messages that match your filters. Incoming messages appear in a list as they arrive. Each entry shows the timestamp, topic, and client ID.
4. Click a message in the list to select it. The selected message is added as a test message when the rule is created.
5. If you do not see the expected messages or realize you have entered the wrong filters, click **Edit capture source** to change the topic or client ID filter and start a new capture session. Alternatively, you can click **Back** to cancel live capture and click **Enter test data later** to proceed directly to the confirm step.
6. Click **Next** to proceed to the confirm step and finish creating the rule.

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
| **Not deployed** | The draft rule exists but is not deployed. |
| **Draft changed since last deployment** | The rule is deployed, but the draft has been edited since the last deployment. Live processing continues with the last deployed version. |

The draft and deployed versions of a rule are independent. You can edit a draft freely without affecting the deployed version. The platform only updates the deployed version when you click **Save and deploy** in the rule editor.

### Managing rules {#managing-rules}

The rules list gives you an overview of all rules in your tenant. Click **Configure columns** to select which rule details to show or hide:

- **Name**: The rule name. Click the name to open the rule editor.
- **Source**: The transport and filters configured for the rule.
- **Description**: The optional description entered when the rule was created.
- **Deployment status**: The current deployment status of the rule.

#### To enable or disable a deployed rule {#enable-disable-rule}

You can temporarily disable (pause) a deployed rule from the rules list without deleting it. This stops the rule from processing incoming data but keeps its configuration.

Use the deployment action icon in the rules list to switch a deployed rule between enabled and disabled states:
- Click the deployment disable (pause) icon <i class="dlt-c8y-icon-pause icon-20 text-primary"></i> next to a deployed rule to disable it. Disabled rules do not process incoming data.
- Click the deployment enable icon <i class="dlt-c8y-icon-deploy icon-20 text-primary"></i> next to a disabled rule to enable it and resume processing.

If you have unsaved draft changes and click the deployment enable icon <i class="dlt-c8y-icon-deploy icon-20 text-primary"></i> in the rules list, the platform re-enables the last deployed version. It does not deploy your draft changes.

If you click **Save and deploy** in the rule editor for a deployed rule with draft changes, the platform replaces the deployed version with the draft and sets the deployment status to enabled.

{{< c8y-admon-important >}}
The disable and enable deployed rule icons are only visible if:
- The rule has been deployed previously.
- No deployment or undeployment process is in progress.
- Your role has ADMIN permission for "Data Preparation deployments".
{{< /c8y-admon-important >}}

#### Searching and filtering {#search-filter}

Use the search bar at the top of the list to filter rules by name, source, or description. The list updates as you type.

#### Reloading the list {#reload}

Click the **Reload** button to refresh the rules list and show the latest deployment statuses.

### To edit a rule {#edit-rule}

Click the rule name in the list. The rule editor opens for that rule.

In the rule editor you can update the smart function code, add test data, and run tests. For a full reference of the rule editor and its panels, see [Rule editor](/data-preparation/rule-editor/).

### To edit rule settings {#edit-rule-settings}

You can change rule settings such as the topic filter and rule description without leaving the rule editor.

1. Open the rule editor for the rule.
2. Click **More…** in the action bar and select **Edit rule settings** from the dropdown menu. Alternatively, hover over the topic name at the top of the editor and click the edit icon <i class="dlt-c8y-icon-edit1 icon-20 text-primary"></i> that appears.
4. Update the settings as needed, then click **Update**.

If you enter a topic filter that is already handled by another rule, the dialog shows a warning, but you can still save and deploy your changes. 

{{< c8y-admon-important >}}
Editing rule settings only updates the rule editor's current draft. Your changes appear in the editor immediately, but they are not saved until you click **Save draft** or **Save and deploy**. They are not visible in the rules list until you deploy the updated rule.

The list of topic filters already handled by other rules excludes draft changes that are different to the deployed state. 
{{< /c8y-admon-important >}}

### To duplicate a rule {#duplicate-rule}

Duplicating a rule creates a new, independent rule that starts with the same source configuration, description, smart function code, and test data as an existing rule. Use this to reuse a rule as a starting point for a similar device such as a newer version. You can also use this feature to rename an existing rule by creating a duplicate and then deleting the original rule. 

1. In the rules list, hover over the rule you want to duplicate and click the duplicate icon <i class="dlt-c8y-icon-duplicate icon-20 text-primary"></i>. The icon may be shown under a 3-dot menu.
2. Enter a name for the new rule. A suggested name based on the original rule's name is pre-filled, and you can change it. The name must be unique among existing rules.
3. Update the transport, topic filter, client ID filter, or description to match the purpose of the new rule. Usually you should change at least the topic filter.
4. You can either copy the AI chat history from the previous rule or start with an empty conversation. Since AI performs better with a small window of previous messages, do not include the history if you are creating a rule for a different device where the previous messages may be unnecessary or misleading. However, if you are duplicating to try out improvements to an existing rule, or to rename an existing rule, then including the previous messages may be helpful.
5. Click **Duplicate** to create the duplicate.

The new rule is created as an undeployed draft, even if the original rule was deployed. Deploy it separately from the rule editor when you are ready. Duplicating a rule always uses the original rule's latest saved draft, whether or not that draft has been deployed.

### To delete a rule {#delete-rule}

- Click the delete icon <i class="dlt-c8y-icon-editing-trash text-danger icon-20"></i> next to the rule in the list. The rule is permanently deleted from both the draft and deployed state. This action cannot be undone.

{{< c8y-admon-important >}}
Deleting a deployed rule stops it immediately. No further messages are processed by that rule after deletion.
{{< /c8y-admon-important >}}
