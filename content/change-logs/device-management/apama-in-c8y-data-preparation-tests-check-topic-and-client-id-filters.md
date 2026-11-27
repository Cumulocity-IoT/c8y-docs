---
date:
title: "Data Preparation: tests check that inputs match the rule's topic and client ID filters"
product_area: "Device management & connectivity"
change_type:
  - value: "change-2c7RdTdXo4"
    label: "Improvement"
component:
  - value: "component-dPrp1xK9z"
    label: "Data Preparation"
build_artifact:
  - value: "tc-KXXmo2SUR"
    label: "apama-in-c8y"
ticket: "PAB-5553"
version:
---
{{< c8y-admon-preview >}}
This feature is in Public Preview, that is, it is not enabled by default and may be subject to change in the future.
{{< /c8y-admon-preview >}}

When you run Data Preparation tests, a test input whose topic or client ID does not match the rule's topic or client ID filter now reports an error, and the rule does not run for that input.

Previously, a rule received the test input even if its topic or client ID did not match the rule's filters, although a deployed rule never receives such a message.

{{< c8y-admon-important >}}
Existing tests whose inputs do not match the rule's filters now fail. Update the topic or client ID of those inputs to match the rule's filters.
{{< /c8y-admon-important >}}
