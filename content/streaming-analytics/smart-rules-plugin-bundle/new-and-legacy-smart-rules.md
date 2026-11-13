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
|Status|Generally available.|Deprecated. Removal is planned for 2027.|
|Rule templates|Official rule templates, and custom rule templates that you create in Analytics Builder.|A fixed set of rule templates.|
|Where you create rules|The **Smart rules (NEW)** tab of a device, group, or asset in Device Management, Cockpit, Digital Twin Manager, and other applications with the plugin.|The **Smart rules** tab of a device or group in Cockpit, or the global smart rules in Cockpit.|
|Deployment target|A device, a group, or an asset. For a group or an asset, you select the deployment target.|A device, a group, or all devices (global smart rules).|
|Activating or deactivating many rules|All rules of a rule template in one step.|One rule at a time.|
|Programmatic access|The Smart Rules API.|The legacy smart rules REST API.|
|Restricting the available rule templates|With the `smartrules.samples.allowlist` tenant option.|Not available.|

**[TODO PAB-5296: confirm the "Programmatic access" and "Where you create rules" rows with PM, and add the link to the Smart Rules API specification once it is published.]**

### Migrating from legacy smart rules {#migrating-from-legacy-smart-rules}

There is no automatic migration. Existing legacy smart rules continue to run unchanged until their removal. To migrate a legacy smart rule, create an equivalent smart rule (NEW) and then deactivate the legacy smart rule.

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

**[TODO PAB-5296: confirm the mapping with PM, including the parameter differences between each legacy rule template and its official rule template, smart rule variables, and the combined geofence approach.]**

#### To migrate a legacy smart rule {#to-migrate-a-legacy-smart-rule}

1. In Cockpit, open the legacy smart rule and note its parameters and its device or group.
2. Navigate to the same device or group and click the **Smart rules (NEW)** tab.
3. Click **Add rule** and select the matching official rule template.
4. Enter a name and the same parameter values as in the legacy smart rule. For a group, select the deployment target.
5. Save and activate the new rule.
6. Check that the new rule works as expected. Then deactivate the legacy smart rule in Cockpit.

A global legacy smart rule applies to all devices. To migrate it, create the new rule on a group that contains the devices.

While both rules are active, both rules create alarms, emails, or operations. Deactivate the legacy smart rule as soon as you have checked the new rule.

For details on creating rules, see [Creating your first smart rule](/streaming-analytics/smart-rules-plugin/#creating-your-first-smart-rule).
