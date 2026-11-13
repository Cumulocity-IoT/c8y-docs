---
weight: 15
title: Understanding the smart rules (NEW) plugin
layout: redirect
---

### Analytics Builder workflow versus smart rules plugin {#analytics-builder-workflow-versus-smart-rules-plugin}

#### Standard Analytics Builder workflow {#standard-analytics-builder-workflow}

In the standard Analytics Builder workflow, you switch from your primary workflow to Analytics Builder to deploy analytics instances:

1. Navigate to the Streaming Analytics application.
2. Go to **Analytics Builder**.
3. Select your model and navigate to the **Instances** page.
4. Create instances for the model in the instance editor.
5. Configure and deploy the instances from the instance editor.

This process requires switching between applications. It takes time when you manage rules for many devices or groups.

For details about the instance editor workflow, refer to [Instance editor](/streaming-analytics/analytics-builder/#using-the-instance-editor).

#### With smart rules plugin {#with-smart-rules-plugin}

The smart rules plugin lets you create, configure, and activate rules directly from the context of a device, group, or asset. You do not switch to a different application. You also do not need to create an Analytics Builder model to use an official rule template.

### Rule templates and rule instances {#rule-templates-and-rule-instances}

A **rule template** defines the logic of a rule and the parameters that you configure. A **rule instance** is a rule that you create from a rule template for a specific device, group, or asset, with your own parameter values. In the plugin, a rule instance is shown as a rule.

The plugin shows all rule templates in one list, sorted by name. Each rule template has an origin label:

|Origin|Description|
|:---|:---|
|**Official**|A rule template that {{< product-c8y-iot >}} provides. Official rule templates are based on the Analytics Builder samples. They are managed by the system. You cannot edit or delete them, and they are not shown in the Analytics Builder model list.|
|**Custom**|A rule template that is created in your tenant. It is an Analytics Builder model with a template parameter with the value selection set to "From Context".|

When {{< product-c8y-iot >}} updates an official rule template, existing rules keep their configuration and continue to run.

Your administrator can restrict which official rule templates are available, see [Restricting the available official rule templates](#restricting-the-available-official-rule-templates).

### Understanding the smart rules interface {#understanding-the-smart-rules-interface}

A rule has the following fields and properties:

|   Field              | Description           |
|----------------------| ----------------------|
| **Name**             | The name of the rule. A name is mandatory. The name must be unique among the rules of the same rule template.<br>The field is populated with the name of the rule template. When you create more than one rule from the same rule template without changing the name, the plugin appends #1, #2, #3, and so on. Rules are sorted by name. |
| **Note**             | An optional note for the rule. |
| **Created**          | The time when the rule was created. |
| **Last updated**     | The time when the rule was last updated. |
| **Model name**       | The name of the rule template of the rule. This field is read-only. |
| **Origin**           | The origin of the rule template, **Official** or **Custom**. This field is read-only. |
| **Parameters**       | The parameters of the rule template.<br>The input source parameter takes its value from the current device, group, or asset context. You cannot change the context. For a group or an asset, you select the deployment target, see [Selecting the deployment target](#selecting-the-deployment-target).<br>You can edit all other parameters. |
| **Active/Inactive**  | Switch the rule to **Active** to deploy it.<br>While the rule is active, all fields and properties are read-only. To edit the rule, switch it to **Inactive**. |

**[TODO PAB-5296: retake the screenshots of the rule details and the rule editor against the GA UI, after PAB-5451 and the v1 UI migration (T029).]**

### Selecting the deployment target {#selecting-the-deployment-target}

When you create a rule in the context of a group or an asset, you select which objects the rule applies to. The plugin shows this choice as radio buttons below the input source parameter.

|Context|Deployment target|Description|
|:---|:---|:---|
|Device|Device &lt;name&gt;|The rule applies to the device. There is no choice.|
|Group|All devices of group &lt;name&gt;|The rule applies to all devices in the group and in its subgroups. This is the default.|
|Group|Assets of group &lt;name&gt;|The rule applies to the assets in the group and in its subgroups, but not to the devices. This option is only shown if it is enabled for your tenant. **[TODO PAB-5296: confirm with PM whether to name the `streaming-analytics.analyticsbuilder.assets-group` feature toggle here, or whether it is on by default at GA.]**|
|Smart group|All devices of smart group &lt;name&gt;|The rule applies to all devices in the smart group. There is no choice.|
|Asset|All devices of asset &lt;name&gt;|The rule applies to all devices that are children of the asset. This is the default.|
|Asset|Asset &lt;name&gt;|The rule applies to the asset itself.|

**[TODO PAB-5296: add a screenshot of the deployment target selector, taken against the GA UI.]**

#### Deployment target in the Smart Rules API {#deployment-target-in-the-smart-rules-api}

In the Smart Rules API, the deployment target of a rule instance is defined by its `context` object. The `context` object contains the `id` of the device, group, or asset, and the following optional lookup options:

|Lookup option|Description|Default when omitted|
|:---|:---|:---|
|`subDevices`|Includes the child devices of the context.|`true`|
|`recurseGroups`|Includes the subgroups of a group, recursively.|`true`|
|`recurseAssets`|Includes the child assets of an asset, recursively.|`true`|
|`subAssets`|Includes the child assets of the context.|`false`|
|`selectRoot`|Includes the context object itself.|`false`|

A `context` object with only an `id` behaves like the default deployment target in the plugin: for a device, the rule applies to the device. For a group or an asset, the rule applies to all devices beneath it. The API stores the resolved values of all five lookup options with the rule instance.

**[TODO PAB-5296: confirm the five default values and their descriptions against the T099 test and the published Smart Rules API specification before publication. Add the link to the published Smart Rules API specification (T053, User Story 10).]**

For the complete description of the Smart Rules API, see **[TODO PAB-5296: link to the Smart Rules API in the {{< openapi >}}]**.

### Activating or deactivating all rules of a rule template {#activating-or-deactivating-all-rules-of-a-rule-template}

You can activate or deactivate all rules of a custom rule template in one step. You do this in Analytics Builder, in the model editor or the instance editor of the rule template.

**[TODO PAB-5296: confirm the permission that the UI requires for the bulk operation, and how to activate or deactivate all rules of an official rule template (Smart Rules API bulk state change, T058).]**

#### To activate or deactivate all rules of a rule template {#to-activate-or-deactivate-all-rules-of-a-rule-template}

1. In Analytics Builder, open the model or the instance editor of the custom rule template.
2. In the top bar, click the instance summary, for example, "3/5 instances active".
3. Select **Activate all** or **Deactivate all**.
4. In the confirmation dialog, check the summary and confirm.

The dialog shows the progress of the operation. You can cancel the operation. In this case, the operation stops after the current rule.

The following rules are not changed:

- Rules that are not in **Production** mode.
- Rules without a name.
- Rules with a missing required parameter.

If a rule cannot be activated or deactivated, the dialog shows the number of failed rules. Click **Show details** to see the affected rules and the reason. Rules that are not affected keep their new state.

**[TODO PAB-5296: add a screenshot of the instance summary menu and the bulk operation dialog, taken against the GA UI. Describe the bulk state change operation of the Smart Rules API once it is available (T057, T058).]**

### Integration with Analytics Builder instance editor {#integration-with-analytics-builder-instance-editor}

Rules that you create with the smart rules plugin are also shown in the instance editor of their rule template in Analytics Builder. You can edit or delete them there. For an official rule template, you cannot open the model, but you can manage its rules from the plugin.

**[TODO PAB-5296: confirm with the team how rules of official rule templates are reached in Analytics Builder in the GA UI, and update the sentence above.]**

Rules that you create in the Analytics Builder instance editor are shown in the smart rules plugin only if their mode is set to **Production**. Other modes indicate that the rule is under development or testing.

The instance editor validates the instance name. The instance name is required and must be unique. You can only deploy the instance after you enter a unique, non-empty instance name.

{{< c8y-admon-info >}}
This validation applies only to models with template parameters with the value selection set to "From Context".
{{< /c8y-admon-info >}}

- When the instance name is empty, the message **Set distinct instance name to select production mode** is shown below the mode field.
- When you enter a duplicate instance name, the error message **Instance name already exists** is shown below the instance name field. You cannot proceed.

![Production mode validation](/images/streaming-analytics/smart-rules-plugin/production-mode-validation.png)
**[TODO PAB-5296: retake this screenshot against the GA UI.]**
