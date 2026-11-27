---
weight: 25
title: Smart rules (NEW) and legacy smart rules
layout: redirect
---

### Comparing smart rules (NEW) and legacy smart rules {#comparing-smart-rules-new-and-legacy-smart-rules}

{{< product-c8y-iot >}} provides two versions of smart rules:

- **Smart rules (NEW)** are rules that you create with the smart rules (NEW) plugin from official or custom rule templates. They run in Streaming Analytics.
- **Legacy smart rules** are the rules that you create with the smart rules builder in the Cockpit application from the [Smart rules collection](/cockpit/smart-rules-collection/). They use the Smartrule microservice.

Legacy smart rules are deprecated. Their removal is planned for 2027. Use smart rules (NEW) for all new rules.

|Topic|Smart rules (NEW)|Legacy smart rules|
|:---|:---|:---|
|Status|Public Preview.|Deprecated. Removal is planned for 2027.|
|Rule templates|Official rule templates, and custom rule templates that you create in Analytics Builder.|A fixed set of rule templates.|
|Where you create rules|The **Smart rules** tab with the **New** label of a device, group, or asset in Device Management, Cockpit, Digital Twin Manager, and other applications with the plugin.|The **Smart rules** tab of a device or group in Cockpit, or the **Global smart rules** page in Cockpit.|
|Deployment target|A device, a group, or an asset. A rule on a group applies to all devices beneath the group, including the devices in its subgroups.|A device, a group and its direct children, or the whole inventory (global smart rules).|
|Activating or deactivating many rules|All rules of a custom rule template in one step, in Analytics Builder.|One rule at a time.|
|Restricting the available rule templates|With the `smartrules.samples.allowlist` tenant option.|Not available.|

### Migrating from legacy smart rules {#migrating-from-legacy-smart-rules}

There is no automatic migration. Existing legacy smart rules continue to run unchanged until their removal. To migrate a legacy smart rule, create an equivalent smart rule (NEW), and then deactivate or delete the legacy smart rule. If you need help, contact [product support](/additional-resources/contacting-support/).

Most legacy rule templates have an official rule template with the same name:

|Legacy rule template|Official rule template|
|:---|:---|
|On alarm send SMS|On alarm send SMS|
|On alarm send email|On alarm send email|
|On alarm escalate it|No official rule template. Create a custom rule template in Analytics Builder.|
|On alarm duration increase severity|On alarm duration increase severity|
|On geofence create alarm|On geofence create alarm|
|On geofence send email|On geofence send email|
|Calculate energy consumption|Calculate energy consumption|
|On missing measurements create alarm|On missing measurements create alarm|
|On alarm execute operation|On alarm execute operation|
|On measurement threshold create alarm|On measurement threshold create alarm|
|On measurement explicit threshold create alarm|On measurement explicit threshold create alarm|

The parameters of an official rule template can differ from the parameters of the legacy rule template with the same name. When you create the new rule, check each parameter. In the email and SMS rule templates, the subject and text support substitution identifiers such as `#{source.name}`, `#{severity}`, and `#{text}`. If your legacy smart rule uses [smart rule variables](/cockpit/smart-rules-collection/#smart-rule-variables), check that the new rule produces the text that you expect.

#### To migrate a legacy smart rule {#to-migrate-a-legacy-smart-rule}

1. In Cockpit, open the legacy smart rule and note its parameters and its device or group.
2. Navigate to the same device or group and click the **Smart rules** tab with the **New** label.
3. Click **Add rule** and select the matching official rule template.
4. Enter a name and the parameter values of the legacy smart rule. If the plugin offers a choice of deployment target, select it. See [Selecting the deployment target](/streaming-analytics/smart-rules-plugin/#selecting-the-deployment-target).
5. Switch the new rule to **Active**.
6. Check that the new rule works as expected. Then deactivate or delete the legacy smart rule in Cockpit.

While both rules are active, both rules create alarms, emails, SMS, or operations. Deactivate or delete the legacy smart rule as soon as you have checked the new rule.

Take the following differences into account:

- **Rules on a group**: A legacy smart rule on a group applies to the group and its direct children. A smart rule (NEW) on a group applies to all devices beneath the group, including the devices in its subgroups. If the group has subgroups, the new rule can apply to more devices than the legacy smart rule.
- **Global smart rules**: There is no global smart rule (NEW). A global legacy smart rule applies to the whole inventory. To migrate it, create a smart rule (NEW) on each group or asset that contains the devices that the rule must monitor. For a device that is not in a group or an asset, create the rule on the device.

For details on creating rules, see [Creating your first smart rule](/streaming-analytics/smart-rules-plugin/#creating-your-first-smart-rule).
