---
weight: 15
title: Understanding the smart rules (NEW) plugin
layout: redirect
---

### Analytics Builder workflow versus smart rules plugin {#analytics-builder-workflow-versus-smart-rules-plugin}

#### Standard Analytics Builder workflow {#standard-analytics-builder-workflow}
In the standard Analytics Builder workflow, to deploy analytics instances, users must switch from their primary workflow to the Analytics Builder:

1. Navigate to the Streaming Analytics application.
2. Go to **Analytics Builder**.
3. Select your model and navigate to the **Instances** page.
4. Create instances/rules for the model in the instance editor.
5. Configure and deploy rules from the instance editor.

This process requires switching between applications and can be time-consuming when managing rules for multiple devices or groups.

For detailed information about the instance editor workflow, refer to [Instance editor](/streaming-analytics/analytics-builder/#using-the-instance-editor).

#### With smart rules plugin {#with-smart-rules-plugin}
The smart rules plugin streamlines this process by enabling Analytics Builder model instance creation and deployment directly from device and group contexts, eliminating the need for switching to a different application.

### Understanding the smart rules interface {#understanding-the-smart-rules-interface}

A rule has the following fields and properties:

|   Field              | Description           |
|----------------------| ----------------------|
| **Name**             | Automatically populated with the model name but can be customized for more descriptive names.<br>When creating multiple rules from the same model without changing the rule name, the plugin automatically appends #1, #2, #3, etc. to differentiate instances. Rules are sorted by instance name. |
| **Note**             | You can add a note for the rule.                                                                                                                                                                                                                                |
| **Created**          | Shows the timestamp when the rule was created.                                                                                                                                                                                                               |
| **Last Updated**     | Shows the timestamp when the rule was last updated.                                                                                                                                                                                                          |
| **Model Name**       | Displays the name of the model associated with the rule. This field is read-only.                                                                                                                                        |
| **Template parameters** | Template parameters configured as "From Context" are automatically populated based on your current device/group context.<br>Context-based parameters are read-only as they inherit values from the current context.<br>Non-context template parameters remain editable for user configuration. |
| **Active/Inactive**  | Deploy the rule by toggling from inactive to active state.<br>Once the rule is deployed, all fields and properties become read-only unless the rule is undeployed.                                                        |

### Integration with Analytics Builder instance editor {#integration-with-analytics-builder-instance-editor}

The smart rules plugin maintains seamless bidirectional integration with the Analytics Builder instance editor.

Rules created in the Analytics Builder instance editor appear in the smart rules plugin only when the mode is set to **Production**. Non-production modes indicate the rule is under development or testing and not ready for deployment.

Rules created through the smart rules plugin automatically appear in the corresponding model's instance editor. These rules can be edited, modified, or deleted from the instance editor.

To prevent deployment of incomplete rules, the instance editor includes enhanced validation on the instance name. The instance name is required and must be unique within your tenant. The instance is available for deployment only after you provide a unique, non-empty instance name.

{{< c8y-admon-info>}}
This validation applies only to models configured with template parameters with the value selection set to "From Context".
{{< /c8y-admon-info>}}

- When the instance name is empty, a message **Set distinct instance name to select production mode** is displayed below the mode field.
- If you enter a duplicate instance name, an error message **Instance name already exists** appears below the instance name field and prevents you from proceeding.

![Production mode validation](/images/streaming-analytics/smart-rules-plugin/production-mode-validation.png)

This validation ensures that all production-ready rules have proper identification and prevents deployment conflicts.