---
date: ""
title: "Data Preparation: edit rule settings and duplicate rules"
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
ticket: "PAB-5133"
version: "27.179.0"
---
{{< c8y-admon-preview >}}
This feature is in Public Preview, that is, it is not enabled by default and may be subject to change in the future.
{{< /c8y-admon-preview >}}

You can now create a new rule by duplicating an existing one, and change a rule's topic filter, client ID filter, and description after creation.

- **Edit rule settings**: In the rule editor, click **More…** in the action bar and select **Edit rule settings** from the dropdown menu.
- **Duplicate rule**: In the rules list, hover over a rule and click the duplicate icon <i class="dlt-c8y-icon-duplicate icon-20 text-primary"></i> to create a new, undeployed draft rule with the same source configuration, description, smart function code, and test data. Enter a unique name for the new rule before confirming.
- **Topic filter suggestions**: When entering a topic filter, either while creating or editing a rule, the field now suggests topics already used by other rules to help with entry of similar topic names. It also warns (without blocking) if the topic filter you enter exactly matches one already used by another rule. This helps you spot accidental overlaps between similar topics, for example when onboarding a new batch of devices with topics similar to an existing one.

For details, see [Rule creation and management](/data-preparation/rule-creation-management/).
