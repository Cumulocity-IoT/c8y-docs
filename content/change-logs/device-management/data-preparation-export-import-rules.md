---
date: 
title: "Data Preparation: export and import rules"
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
ticket: "PAB-5174"
version: ""
---
{{< c8y-admon-preview >}}
This feature is in Public Preview, that is, it is not enabled by default and may be subject to change in the future.
{{< /c8y-admon-preview >}}

You can now export a rule as a rule package and import it into the same or another tenant, for example, to move a rule from a test tenant to a production tenant.

- **Export rule**: In the rules list, hover over a rule and click the export icon <i class="dlt-c8y-icon-data-export icon-20 text-primary"></i>. Alternatively, in the rule editor, click **More…** and select **Export rule**. The *tar.gz* file contains the latest saved draft of the rule, including its test data and AI chat history.
- **Import**: In the rules list, click **Import** in the action bar and select a *tar.gz* file. Enter a unique name for the rule. The rule is created as an undeployed draft, and importing never replaces an existing rule.

Rule packages use the same format as the deploy endpoint of the REST API. This format now also includes the AI chat history of the rule in an optional *ai-chat.yaml* file. The server now decodes a `%` followed by two hexadecimal digits in a test filename as a UTF-8 byte, so that test names can contain characters that filenames cannot.

For details, see [Rule creation and management](/data-preparation/rule-creation-management/#export-rule) and [Rule package format](/data-preparation/external-development/#rule-package-format).
