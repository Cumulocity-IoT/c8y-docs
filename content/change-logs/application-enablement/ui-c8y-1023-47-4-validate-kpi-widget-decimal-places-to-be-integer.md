---
date: '2026-02-25'
title: KPI widget decimal places now validated as integer
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
version: 1023.47.4
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-25'
  - label: apj.cumulocity.com
    date: '2026-02-26'
  - label: jp.cumulocity.com
    date: '2026-02-26'
  - label: emea.cumulocity.com
    date: '2026-02-27'
  - label: us.cumulocity.com
    date: '2026-02-27'
  - label: cumulocity.com
    date: '2026-02-27'
---
The KPI widget's decimal places property previously accepted decimal numbers (such as 2.5), which caused the widget to fail displaying values correctly. The property is now validated to only accept integer values between 1 and 10, ensuring that the KPI widget displays values as expected. This validation prevents configuration errors and guarantees that your KPI widgets will render properly with the correct number of decimal places.
