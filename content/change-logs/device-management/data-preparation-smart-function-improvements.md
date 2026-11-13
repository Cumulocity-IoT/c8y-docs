---
date: 
title: "Data Preparation: smart function improvements"
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
ticket: "PAM-35434"
version: ""
---
{{< c8y-admon-preview >}}
This feature is in Public Preview, that is, it is not enabled by default and may be subject to change in the future.
{{< /c8y-admon-preview >}}

Smart functions now run faster when you deploy many rules. `Base64`, `TextDecoder`, and `OPCUACodec` also handle strings that contain NUL characters correctly.

For details, see [Standard libraries and imports](/data-preparation/smart-functions/#globals).
