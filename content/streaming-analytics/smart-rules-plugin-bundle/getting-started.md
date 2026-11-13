---
weight: 10
title: Getting started with the smart rules (NEW) plugin
layout: redirect
---

### What is the smart rules (NEW) plugin {#what-is-the-smart-rules-plugin}

The smart rules (NEW) plugin lets you create and manage rules directly from the context of a device, group, or asset in applications such as Device Management, Cockpit, and Digital Twin Manager.

Each rule is a **rule instance** of a **rule template**. A rule template defines what the rule does and which parameters you configure. The plugin offers two kinds of rule templates:

- **Official** rule templates are provided by {{< product-c8y-iot >}}. They are ready to use. You do not need to create or open an Analytics Builder model.
- **Custom** rule templates are Analytics Builder models that are created in your tenant and that have template parameters with the value selection set to "From Context".

The rules run in Streaming Analytics. For details about Analytics Builder, refer to [Analytics Builder](/streaming-analytics/analytics-builder/#getting-started).

### Prerequisites {#prerequisites}

Before you use the smart rules (NEW) plugin, make sure that the following requirements are met:

- The tenant is subscribed to a Streaming Analytics microservice that supports the Analytics Builder capability.
- The smart rules (NEW) plugin is installed in the application that you want to use, and the **Smart rules (NEW) plugin** is enabled in **Preview feature**.
- You have the required permissions to view or manage smart rules (NEW). Refer to [Managing permissions to smart rules (NEW) instances](#managing-permissions-to-smart-rules-instances).

#### Managing permissions to smart rules (NEW) instances {#managing-permissions-to-smart-rules-instances}

The **Smart rule instances** permission under [global roles](/standard-tenant/managing-permissions/#to-add-a-global-role) controls access to smart rules (NEW).

|Permission|Description|
|---------|-----------|
|**READ**|Grants read-only access to rule templates and rule instances. Users with this permission can view rules, but cannot create, update, activate, deactivate, or delete them.|
|**ADMIN**|Grants permission to create, read, update, activate, deactivate, and delete rule instances.|

The following default global roles include the **Smart rule instances** permission:

|Global role|Smart rule instances permission|
|:---|:---|
|Global Manager|READ and ADMIN|
|Business User|READ and ADMIN|
|Global Reader|READ|
|Reader User|READ|

**[TODO PAB-5296: confirm the display names of the four default global roles in the GA release with the core platform team. The Managing permissions page lists "Global Manager" and "Global Reader", and the legacy roles "business" and "readers".]**

Existing members of these roles receive access automatically. You do not need to assign the permission manually.

The **CEP management** permissions also grant access to smart rules (NEW). The **Smart rule instances** permission grants read-only access to the underlying Analytics Builder model. To create, edit, or delete Analytics Builder models, you need the **CEP management** permissions. For details, see [Permissions](/streaming-analytics/introduction-analytics/#permissions).

### Creating your first smart rule {#creating-your-first-smart-rule}

This section shows you how to create a rule from an official rule template. The rule creates an alarm when a measurement value of a device is outside a threshold range. You do not need to create or open an Analytics Builder model.

At least one device must be registered in {{< product-c8y-iot >}}. Preferably, this device already sends measurements to {{< product-c8y-iot >}}.

#### To create a smart rule from an official rule template {#to-create-a-smart-rule-from-an-official-rule-template}

1. In the Device Management application, navigate to **Devices** > **All devices** and select a device.
2. Click the **Smart rules (NEW)** tab.
   ![Smart rules tab](/images/streaming-analytics/smart-rules-plugin/empty-smart-rule.png)
   **[TODO PAB-5296: retake this screenshot against the GA UI, after PAB-5451 and the v1 UI migration (T029).]**
3. Click **Add rule**.
   The **Add rule** dialog lists the rule templates that apply to the current context. Each rule template shows an **Official** or **Custom** label.
   **[TODO PAB-5296: add a screenshot of the Add rule dialog with the Official and Custom labels, taken against the GA UI.]**
4. Select the rule template "On measurement explicit threshold create alarm" and click **OK**.
5. Configure the rule:
   - In the name field, enter a name for the rule. A name is mandatory. It must be unique among the rules of the same rule template.
   - Optionally, add a note.
   - The **Device or group of devices** parameter takes its value from the current context. You cannot change it.
   - In **Input fragment and series**, select the measurement that the rule monitors.
   - In **Threshold lower range** and **Threshold upper range**, enter the range of valid values.
   - Optionally, change **Alarm type** and **Alarm text**.
6. Click **Save** to save the rule. To save and activate the rule at the same time, switch the rule to **Active**.

The rule is shown in the list of rules with its status (**Active** or **Inactive**). While the rule is active, it creates an alarm each time a measurement value is outside the threshold range.

![Smart rules list](/images/streaming-analytics/smart-rules-plugin/smart-rules-list.png)
**[TODO PAB-5296: retake this screenshot against the GA UI. It must show the combined list of rules with the Official and Custom labels.]**

You can create rules from groups and assets in the same way. For a group or an asset, you also select the deployment target, see [Selecting the deployment target](/streaming-analytics/smart-rules-plugin/#selecting-the-deployment-target).

#### To create a smart rule from a custom rule template {#to-create-a-smart-rule-from-a-custom-rule-template}

If the official rule templates do not cover your use case, a user with the **CEP management** permissions creates a custom rule template in Analytics Builder. A custom rule template is an Analytics Builder model with the following properties:

- The model has a template parameter for the input source, with **Value selection** set to "From Context".
- In this template parameter, **Restrict to** includes the context types where the rule is available, for example, "Device".

For details, see [Define template parameters](/streaming-analytics/analytics-builder/#to-define-the-template-parameters-for-the-instances-of-the-current-model).

After you save the model, it is shown with the **Custom** label in the **Add rule** dialog. Create a rule from it in the same way as from an official rule template.

{{< c8y-admon-info >}}
To change the logic of an official rule template, use **Create model from sample** in Analytics Builder to create a duplicate of the sample. The duplicate is a custom rule template. Changes to the duplicate do not affect the official rule template.
{{< /c8y-admon-info >}}

### Troubleshooting {#troubleshooting}

**A rule template is not shown in the Add rule dialog**

- For an official rule template: Your administrator can restrict the available official rule templates, see [Restricting the available official rule templates](/streaming-analytics/smart-rules-plugin/#restricting-the-available-official-rule-templates). If the list of official rule templates is not as expected, check the microservice log for warnings about the `smartrules.samples.allowlist` tenant option, for example, about a value that is not valid JSON or about unknown sample names. For details, see [Log files of the Apama-ctrl microservice](/streaming-analytics/troubleshooting/#logfiles).
- For a custom rule template: Make sure that the Analytics Builder model has a template parameter with the value selection set to "From Context".
- Make sure that the current context matches the context types of the rule template. For example, a rule template that is restricted to "Groups" is not shown in the context of a device. To show it in the context of a device, select "Device" in the **Restrict to** dropdown.

**Previously created rules are not shown in the list of rules**

- Make sure that the instances are set to **Production** mode in the Analytics Builder instance editor.
- Make sure that the instances have a name in the Analytics Builder instance editor.
- Make sure that you are viewing the correct device, group, or asset.

**A rule cannot be activated**

- Click the runtime error icon <img src="/images/streaming-analytics/analytics-builder/runtime_error.png" alt="Error icon" style="display:inline-block; margin:0"> to view information about the error.
- Make sure that the rule has a name and that all required parameters have a value.
