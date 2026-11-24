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

The **Smart rules (NEW)** tab shows the list of rules on the left and the details of the selected rule on the right.

To find a rule, enter a part of its name in the **Search rule** field above the list. The search is not case-sensitive. While a search is active, the list shows the number of matching rules.

Below the list, a counter shows which rules are shown, for example, "1 - 25 of 60". The list shows 25 rules per page. If there are more rules, use the page buttons to move between the pages. If there are more than 25 rules, you can show 50 or 100 rules per page with **Items per page**.

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

![Rule from a custom rule template in the smart rules (NEW) plugin](/images/streaming-analytics/smart-rules-plugin/rule-editor.png)

### Selecting the deployment target {#selecting-the-deployment-target}

The deployment target defines which objects a rule applies to. The plugin shows it in the **Input source** section of the rule, below the name of the input source parameter.

When you create a rule in the context of a group or an asset, you select the deployment target with radio buttons. For a device or a smart group, there is no choice, and the plugin shows the deployment target as text.

|Context|Deployment target|Description|
|:---|:---|:---|
|Device|Device &lt;name&gt;|The rule applies to the device. There is no choice.|
|Group|All devices of group &lt;name&gt;|The rule applies to all devices beneath the group, including the devices in its subgroups. This is the default.|
|Group|Assets of group &lt;name&gt;|The rule applies to the assets beneath the group, including the assets in its subgroups, but not to the devices. This option is not available by default, see below.|
|Smart group|All devices of smart group &lt;name&gt;|The rule applies to all devices in the smart group. There is no choice.|
|Asset|All devices of asset &lt;name&gt;|The rule applies to all devices beneath the asset, including the devices of its child assets. This is the default.|
|Asset|Asset &lt;name&gt;|The rule applies only to the asset itself, not to the devices beneath it.|

The **Assets of group** option is only shown if it is enabled for your tenant. If it is not enabled, the plugin shows **All devices of group** as text, and you cannot select a different deployment target for a group. To enable the option, contact [product support](/additional-resources/contacting-support/). An existing rule that already applies to the assets of a group keeps this deployment target and shows the option, also if it is not enabled for your tenant.

To change the deployment target of an existing rule, switch the rule to **Inactive** first. While a rule is active, its deployment target is read-only.

The following images show the deployment target for a group, with the **Assets of group** option enabled, and for an asset:

![Deployment target for a group](/images/streaming-analytics/smart-rules-plugin/deployment-target-group.png)

![Deployment target for an asset](/images/streaming-analytics/smart-rules-plugin/deployment-target-asset.png)

#### Deployment target in the Smart Rules API {#deployment-target-in-the-smart-rules-api}

In the Smart Rules API, the deployment target of a rule instance is defined by its `context` object. The `context` object contains the `id` of the device, group, or asset, and the following optional lookup options:

|Lookup option|Description|Default when omitted|
|:---|:---|:---|
|`subDevices`|Includes the child devices of the context.|`true`|
|`recurseGroups`|Includes the subgroups of a group, recursively.|`true`|
|`recurseAssets`|Includes the child assets of an asset, recursively.|`true`|
|`subAssets`|Includes the child assets of the context.|`false`|
|`selectRoot`|Includes the context object itself. A device is always included, regardless of this option.|`false`|

A `context` object with only an `id` behaves like the default deployment target in the plugin: for a device, the rule applies to the device. For a group or an asset, the rule applies to all devices beneath it. The API stores the resolved values of all five lookup options with the rule instance.

The deployment targets of the plugin correspond to the following lookup options:

|Deployment target|`subDevices`|`recurseGroups`|`recurseAssets`|`subAssets`|`selectRoot`|
|:---|:---|:---|:---|:---|:---|
|Device &lt;name&gt;, All devices of group &lt;name&gt;, All devices of smart group &lt;name&gt;, All devices of asset &lt;name&gt; (the defaults)|`true`|`true`|`true`|`false`|`false`|
|Assets of group &lt;name&gt;|`false`|`true`|`false`|`true`|`false`|
|Asset &lt;name&gt;|`false`|`false`|`false`|`false`|`true`|

**[TODO PAB-5296: before publication, confirm the defaults and the mapping table against the T099 test and the implemented Smart Rules API. On apama-in-c8y develop (2026-11-18), the v1 endpoints return "not implemented" (T018, T020) and T099 is open. The defaults above are taken from the v1 contract (`smartrules-v1.openapi.yaml`) and research decision D7a, and the mapping from the plugin code (`deployment-target.ts`). Add the link to the published Smart Rules API specification (T053).]**

For the complete description of the Smart Rules API, see **[TODO PAB-5296: link to the Smart Rules API in the {{< openapi >}}]**.

### Activating or deactivating all rules of a rule template {#activating-or-deactivating-all-rules-of-a-rule-template}

You can activate or deactivate all rules of a custom rule template in one step. You do this in Analytics Builder, in the model editor or the instance editor of the rule template. You need the **CEP management** permission with the ADMIN level. The **Smart rule instances** permission is not sufficient.

Official rule templates are not shown in Analytics Builder. To activate or deactivate the rules of an official rule template, switch each rule to **Active** or **Inactive** in the smart rules (NEW) plugin.

**[TODO PAB-5296: describe the bulk state change operation of the Smart Rules API (`PUT /service/cep/smartrules/v1/templates/{templateId}/instances/state`) once it is implemented (T057, T058). It also covers official rule templates. On develop (2026-11-17) the endpoint exists but returns "not implemented".]**

#### To activate or deactivate all rules of a rule template {#to-activate-or-deactivate-all-rules-of-a-rule-template}

1. In Analytics Builder, open the model editor or the instance editor of the custom rule template.
2. In the top bar, click the instance summary, for example, "3/5 instances active".
3. Select **Activate all** or **Deactivate all**.
   **Activate all** is only shown if the rule template has inactive rules in **Production** mode. **Deactivate all** is only shown if the rule template has active rules.
   ![Instance summary menu with Activate all and Deactivate all](/images/streaming-analytics/smart-rules-plugin/bulk-instances-menu.png)
4. Check the summary in the confirmation dialog and confirm.
   ![Confirmation dialog for activating all rules](/images/streaming-analytics/smart-rules-plugin/bulk-activate-dialog.png)

The rules are changed one at a time, and the dialog shows the progress. You can cancel the operation. In this case, the operation stops after the current rule.

**Deactivate all** deactivates all active rules of the rule template. **Activate all** activates the inactive rules in **Production** mode, except for the following rules, which the summary lists as skipped:

- Rules without a name.
- Rules with a required parameter that has no value.

Rules in other modes are not activated.

If a rule cannot be activated or deactivated, the dialog shows the number of failed rules. Click **Show details** to see the affected rules and the reason. The rules that were changed successfully keep their new state. The operation does not undo them.

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
