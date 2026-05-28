---
weight: 9
title: Rule creation and management
layout: bundle
sector:
  - device_management
---

The Data Preparation landing page is the central place to create, view, and manage your rules. Each rule defines how incoming device messages from a specific source are processed and mapped into {{< product-c8y-iot >}} objects.

For a guided walkthrough of the full process, see [Getting started](/data-preparation/getting-started-dataprep/). For details on writing and editing smart functions in the rule editor, see [Rule editor](/data-preparation/rule-editor/).

### To create a rule {#create-rule}

1. Open the Data Preparation application. The landing page shows the list of existing rules.
2. Click **Create rule** to open the rule creation wizard.

For a step-by-step guide to creating a rule, see [Create your first rule](/data-preparation/getting-started-dataprep/#create-rule).

### To save or deploy a rule {#save-deploy-rule}

In the rule editor, you have two options:

- Click **Save draft** to save the current code and test data without deploying. The rule continues to run (if deployed) with the previously deployed version.
- Click **Save and deploy** to save the current draft and start deploying it. The rule begins processing live messages immediately. If the rule was not previously deployed, it becomes active. If it was already deployed, the deployed version is updated to the current draft.

When a rule is first deployed and a measurement is produced for a device that the platform has not seen before, a new device is created automatically. <!-- TODO: Add link once page exists. See [Creating devices](/data-preparation/creating-devices/) for more details about how devices are created. -->

### Deployment status {#deployment-status}

Each rule has deployment status chips that indicate whether it is currently processing live messages, and if the current draft is different to the deployed version:

| Status | Description |
|---|---|
| **Deployed** | The rule is active and processing incoming messages. |
| **Not deployed** | The rule exists but is not active. |
| **Draft changed since last deployment** | The rule is deployed, but the draft has been edited since the last deployment. Live processing continues with the last deployed version. |

The draft and deployed versions of a rule are independent. You can edit a draft freely without affecting the deployed version. The deployed version is only updated when you click **Save and deploy** in the rule editor.


### Managing rules {#managing-rules}

The rules list gives you an overview of all rules in your tenant. Click **Configure columns** to select which rule details to show/hide:

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

### To duplicate a rule {#duplicate-rule}

- Click the **Duplicate** icon next to the rule in the list. A copy of the rule is created in the **Draft** state. The duplicate has the same smart function, test data, topic filter, and client ID filter as the original.

### To delete a rule {#delete-rule}

- Click the **Delete** icon next to the rule in the list. The rule is permanently deleted. This action cannot be undone.

{{< c8y-admon-important >}}
Deleting a deployed rule stops it immediately. No further messages are processed by that rule after deletion.
{{< /c8y-admon-important >}}
