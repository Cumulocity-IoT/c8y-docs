---
date: '2025-11-26'
title: Analytics Builder models now detect hierarchy changes in groups and assets
change_type:
  - value: change-QHu1GdukP
    label: Feature
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: APMF-94
version: 26.260.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---

Analytics Builder models consuming data from device groups or assets now automatically detect hierarchy changes. This includes the addition, update, or deletion of devices, subgroups, and assets. The model dynamically adapts to these structural changes, ensuring continuous and accurate data processing.

For details, refer to [Support for dynamic changes to group and asset hierarchy](/streaming-analytics/analytics-builder/#dynamic-hierarchy-changes).

{{< c8y-admon-info >}}
This is also applicable to the [Smart rules plugin](/streaming-analytics/smart-rules-plugin#what-is-the-smart-rules-plugin).
{{</ c8y-admon-info >}}
