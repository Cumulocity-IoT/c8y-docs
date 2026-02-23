---
date: ""
title: KPI widget decimal places now validated to be integer values
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66093
version: 1021.22.151
---
The KPI widget's decimal places property previously accepted decimal numbers (such as 2.5), which caused the widget to fail displaying values correctly. The decimal places property is now validated to only accept integer values between 1 and 10, ensuring that the KPI widget displays values as expected. This validation prevents configuration errors and ensures consistent behavior across all KPI widgets in your dashboards.