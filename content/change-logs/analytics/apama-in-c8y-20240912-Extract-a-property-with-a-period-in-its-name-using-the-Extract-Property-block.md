---
date: 2024-10-17
title: Extract a property with a period in its name using the Extract Property block
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-4604
version: 25.262.0
---
The [Extract Property](https://cumulocity.com/docs/streaming-analytics/block-reference/#extract-property) block in Analytics Builder now includes a new optional checkbox called **Ignore Separators In Property Path**. This allows you to extract a property that has a separator such as a period (.) in the property name.
For example, if the **Ignore Separators In Property Path** checkbox is selected and the **Property Path** parameter is specified as `location.city`, then the property name `location.city` is extracted from the input value.
For compatibility, the previous behavior remains as the default, that is, the new checkbox is not selected by default.
