---
date: '2026-05-20'
title: Aggregated data point requests now skipped when the slider is disabled
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66241
version: 1023.81.5
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-05-20'
  - label: apj.cumulocity.com
    date: '2026-05-19'
  - label: jp.cumulocity.com
    date: '2026-05-19'
  - label: us.cumulocity.com
    date: '2026-05-20'
  - label: cumulocity.com
    date: '2026-05-20'
---
When the slider setting was disabled in the data graph or data explorer, there were still unnecessary requests to fetch aggregated data points, which caused performance issues and wasted resources. The requests are now correctly skipped when the slider is disabled, improving performance and reducing unnecessary network traffic.
