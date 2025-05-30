---
weight: 15
title: Understanding the Analytics Rules plugin
layout: redirect
---

### Analytics Builder Workflow vs Plugin Approach

#### Standard Analytics Builder Workflow
In the standard Analytics Builder workflow, to deploy analytics instances, users must switch from their primary workflow to the Analytics Builder:

1. Navigate to Streaming Analytics application.
2. Go to Analytics Builder.
3. Select your model and navigate to the Instances page.
4. Create instances/rules for the model in the instance editor.
5. Configure and deploy rules from the instance editor.

This process requires switching between applications and can be time-consuming when managing rules for multiple devices or groups.

For detailed information about the instance editor workflow, refer to the [Instance Editor documentation](/streaming-analytics/analytics-builder/#using-the-instance-editor).

#### With Analytics Rules Plugin
The Analytics Rules plugin streamlines this process by enabling rule creation and deployment directly from device and group contexts within Device Management and Cockpit applications, eliminating the need for application switching.

### Accessing Analytics Rules from Group Context in Host Applications

**Prerequisites**: You need a model with a template parameter configured with **Value Selection** set to **From Context** and **Source or Destination** restricted to **Groups**.

#### From Cockpit Application
1. Navigate to **Cockpit** application.
2. Create a group and assign a device to that group.
3. Go to **Groups** and select the created group.
4. Click the **Analytics rules** tab in the group details view on the top bar.
5. Click **Add rule** to open the Add analytics rule dialog box. Only models configured with "From Context" template parameters and restricted to "Groups" will be listed. Select your configured model and click **OK**.
6. Update the rule name if needed. Click **Save** to save the rule, or toggle to **Active** to save and deploy immediately.

![Cockpit group context](/images/streaming-analytics/analytics-rules-plugin/cockpit-group.png)

#### From Device Management Application
The process is identical to Cockpit - navigate to **Device Management** > **Groups**, select a group, and access the **Analytics rules** tab. Follow steps 5-6 from the Cockpit process above for creating and configuring rules.

### Understanding the Analytics Rules Interface

A rule has the following fields and properties:

- **Rule Name**: Automatically populated with the model name but can be customized to provide more descriptive names. When creating multiple rules from the same model without changing the rule name, the plugin automatically appends #1, #2, #3, etc. for distinction.
- **Note**: You can add a note for the rule.
- **Created**: Shows when the rule was created.
- **Last Updated**: Shows the timestamp of when the rule was last updated.
- **Model Name**: The name of the model for which the rule is created.
- **Help Icon**: A popover dialog that contains the model description.
- **Template Parameters**: Template parameters configured as "From Context" are automatically populated based on your current device/group context. Context-based parameters are read-only as they inherit values from the current context. Non-context template parameters remain editable for user configuration.
- **Active/Inactive**: Deploy the rule by toggling from inactive to active state. Once the rule is deployed, all fields and properties become read-only unless the rule is undeployed.
- **Delete**: To delete the rule, click the delete button.

Rules are sorted by instance name. All plugin-created rules are automatically set to Production mode for immediate deployment.

### Integration with Analytics Builder Instance Editor

The Analytics Rules plugin maintains seamless bidirectional integration with the Analytics Builder instance editor.

Rules created in the Analytics Builder instance editor appear in the Analytics Rules plugin only when the mode is set to **Production**. Non-production modes indicate the rule is under development or testing and not ready for deployment.

Rules created through the Analytics Rules plugin automatically appear in the corresponding model's instance editor page. Plugin-created rules are set to **Production mode** by default. These rules can be edited, modified, or deleted from the instance editor.

To ensure quality and prevent deployment of incomplete rules, the instance editor includes enhanced validation for Production mode. The instance name field is required and must be unique within your tenant. Production mode only becomes available after you provide a unique, non-empty instance name.

{{< c8y-admon-info>}}
This validation applies only to models configured with template parameters where Value Selection is set to "From Context".
{{< /c8y-admon-info>}}

- When the instance name is empty, Production mode is disabled in the dropdown and displays the message **Set distinct instance name to select production mode** below the mode field.
- If you enter a duplicate instance name, the system shows **Instance name already exists** below the instance name field and prevents you from proceeding.

![Production mode validation](/images/streaming-analytics/analytics-rules-plugin/production-mode-validation.png)

This validation ensures that all production-ready rules have proper identification and prevents deployment conflicts.