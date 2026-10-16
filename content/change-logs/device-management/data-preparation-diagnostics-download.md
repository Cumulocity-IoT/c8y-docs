---
date: 
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
version: 
---
{{< c8y-admon-preview >}}
This feature is in Public Preview, that is, it is not enabled by default and may be subject to change in the future.
{{< /c8y-admon-preview >}}

You can now download a diagnostics archive for your tenant from the Data Preparation application, for example, to investigate a problem with your rules. Click the **User** button to open the right drawer, and then click **Download diagnostics** in the **Diagnostics** section.

The ZIP file contains your rules and the Data Preparation configuration of your tenant. If you also have READ permission for "CEP management", it also contains the basic diagnostics information of the microservice that runs the rules. It only contains data of your own tenant.

For details, see [Downloading diagnostics](/data-preparation/logs-and-diagnostics/#download-diagnostics).
