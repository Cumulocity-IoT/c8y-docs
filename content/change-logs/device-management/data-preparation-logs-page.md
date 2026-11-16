---
date: 
title: "Data Preparation: view the logs of your rules"
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
ticket: "PAB-5355"
version: "27.250.0"
---
{{< c8y-admon-preview >}}
This feature is in Public Preview, that is, it is not enabled by default and may be subject to change in the future.
{{< /c8y-admon-preview >}}

The Data Preparation application has a new **Logs** page, which shows the log messages of your rules, including the `console` output of their smart functions. Use it to check that a deployed rule processes live messages as expected, or to find out why it produces wrong output or failed to deploy. You do not need access to the Administration application.

- **Tenant-scoped**: The page only shows Data Preparation messages of your own tenant, whether the microservice serves one tenant or many.
- **Filter by rule**: Select a rule to show only its messages. You can select a rule whatever its deployment status.
- **View logs from the rule editor**: In the rule editor, click **More…** and select **View logs** to open the **Logs** page for the rule in a new browser tab.
- **Console capture**: Selecting a deployed rule starts capturing all of its `console` output while the page is open. Up to 3 rules per tenant can be captured at the same time. You can change this limit with a tenant option.
- **Download**: You can download the messages for a date and time range as a text file.

Output written with `console.error`, and errors thrown by a smart function, are always written to the log. Output written with `console.log`, `console.info`, `console.warn`, and `console.debug` is now only written while the Data Preparation **Logs** page is open with the rule selected, or while a background capture is running for it.

For details, see [Logs and diagnostics](/data-preparation/logs-and-diagnostics/).
