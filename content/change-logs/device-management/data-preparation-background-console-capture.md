---
date: ""
title: "Data Preparation: capture the console output of a rule in the background"
product_area: "Device management & connectivity"
change_type:
  - value: "change-QHu1GdukP"
    label: "Feature"
component:
  - value: "component-dPrp1xK9z"
    label: "Data Preparation"
build_artifact:
  - value: "tc-KXXmo2SUR"
    label: "apama-in-c8y"
ticket: "PAB-5357"
version: ""
---
{{< c8y-admon-preview >}}
This feature is in Public Preview, that is, it is not enabled by default and may be subject to change in the future.
{{< /c8y-admon-preview >}}

Some problems with a rule only occur occasionally, for example, when a device sends an unusual message from time to time. To catch these, you can now capture the `console` output of a deployed rule for 15 minutes, 30 minutes, or 1 hour without keeping the **Logs** page open. Select the rule on the Logs page and click **Capture in background**. Come back later and view or download the captured output.

A background capture counts toward the limit on console capture for its whole duration. Redeploying or deleting the rule ends the background capture.

For details, see [Capturing in the background](/data-preparation/logs-and-diagnostics/#background-capture).
