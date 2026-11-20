---
date:
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
---

Smart rules (NEW) is now generally available. Smart rules (NEW) lets you create and manage rules directly from the context of a device, group, or asset in applications such as Device Management, Cockpit, and Digital Twin Manager. The rules run in Streaming Analytics.

You can now create a rule directly from an official rule template, which is labeled **Official** in the **Add rule** dialog. You no longer need to create an Analytics Builder model first. Custom rule templates that you build with Analytics Builder are labeled **Custom** and are shown in the same list. A rule name is mandatory.

The general availability release includes the following changes:

- **Smart Rules API**: A public, versioned REST API lets you list rule templates with their parameters, and create, read, list, update, and delete rule instances. You configure rule instances with the names of the parameters. **[TODO PAB-5296: link to the published Smart Rules API specification (T053).]**
- **Restricting the official rule templates**: Administrators can restrict the available official rule templates with the `smartrules.samples.allowlist` tenant option.
- **Deployment target selection**: For an asset, you select whether the rule applies to all devices beneath the asset or to the asset itself. For a group, the rule applies to all devices beneath the group. If it is enabled for your tenant, you can also apply the rule to the assets of the group.
- **Activating or deactivating all rules of a rule template**: In Analytics Builder, you can activate or deactivate all rules of a custom rule template in one step.
- **Sizing guidance**: The documentation describes which factors drive the resource usage of smart rules (NEW), and when to move to a larger or dedicated microservice.
- **Roles**: The **Smart rule instances** READ and ADMIN permissions are assigned to the default global roles. Existing users of these roles receive access automatically. The Global Manager and business roles receive READ and ADMIN. The Global Reader and readers roles receive READ.

Legacy smart rules, which you create with the smart rules builder in the Cockpit application, are now deprecated. Their removal is planned for 2027. Existing legacy smart rules continue to work until their removal, and there is no change to the user interface. We recommend that you use smart rules (NEW) for all new rules and migrate your existing legacy smart rules. The documentation describes how to migrate each legacy rule template.

For details, see [Smart rules (NEW) plugin](/streaming-analytics/smart-rules-plugin/#getting-started) and [Smart rules (NEW) and legacy smart rules](/streaming-analytics/smart-rules-plugin/#new-and-legacy-smart-rules).
