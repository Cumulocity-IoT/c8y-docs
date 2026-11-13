---
date: '2026-12-01'
title: Smart rules (NEW) is generally available and legacy smart rules are deprecated
change_type:
  - value: change-QHu1GdukP
    label: Feature
  - value: change-inv-3bw8e
    label: Announcement
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-5296
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---

**[TODO PAB-5296: set the release date in the file name and in `date`, add `version`, and publish together with the GA cutover (T056, T101, T113).]**

Smart rules (NEW) is now generally available. Smart rules (NEW) lets you create and manage rules directly from the context of a device, group, or asset in applications such as Device Management, Cockpit, and Digital Twin Manager. The rules run in Streaming Analytics.

You can now create a rule directly from an official rule template, which is labeled **Official** in the **Add rule** dialog. You no longer need to create an Analytics Builder model first. Custom rule templates that you build with Analytics Builder are labeled **Custom** and are shown in the same list. A rule name is mandatory.

The general availability release includes the following changes:

- **Smart Rules API**: A public, versioned REST API lets you list rule templates with their parameters, and create, read, list, update, and delete rule instances. You configure rule instances with the names of the parameters. **[TODO PAB-5296: link to the published Smart Rules API specification (T053).]**
- **Restricting the official rule templates**: Administrators can restrict the available official rule templates with the `smartrules.samples.allowlist` tenant option.
- **Deployment target selection**: For a group or an asset, you select whether the rule applies to the devices or to the assets beneath it.
- **Activating or deactivating all rules of a rule template**: You can activate or deactivate all rules of a rule template in one step.
- **Sizing guidance**: The documentation describes which factors drive the resource usage of smart rules (NEW), and when to move to a larger or dedicated microservice.
- **Roles**: The **Smart rule instances** READ and ADMIN permissions are assigned to the default global roles. Existing users of these roles receive access automatically. Global Manager and Business User receive READ and ADMIN. Global Reader and Reader User receive READ.

Legacy smart rules, which you create with the smart rules builder in the Cockpit application, are now deprecated. Their removal is planned for 2027. Existing legacy smart rules continue to work until their removal, and there is no change to the user interface. We recommend that you use smart rules (NEW) for all new rules and migrate your existing legacy smart rules. The documentation describes how to migrate each legacy rule template.

For details, see [Smart rules (NEW) plugin](/streaming-analytics/smart-rules-plugin/#getting-started) and [Smart rules (NEW) and legacy smart rules](/streaming-analytics/smart-rules-plugin/#new-and-legacy-smart-rules).
