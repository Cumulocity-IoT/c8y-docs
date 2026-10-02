---
date: ""
title: "Data Preparation: download a diagnostics archive"
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
ticket: "PAB-5360"
version: ""
---
{{< c8y-admon-preview >}}
This feature is in Public Preview, that is, it is not enabled by default and may be subject to change in the future.
{{< /c8y-admon-preview >}}

When you contact product support about a problem with your rules, you can now provide a single diagnostics archive from the Data Preparation application. Click the **User** button to open the right drawer, and then click **Download diagnostics** in the **Diagnostics** section.

The ZIP file contains your rules, the Data Preparation configuration of your tenant, and the basic diagnostics information of the microservice that runs the rules. It only contains data of your own tenant. To include the diagnostics information of the microservice, you also need READ permission for "CEP management".

For details, see [Downloading diagnostics](/data-preparation/logs-and-diagnostics/#download-diagnostics).
