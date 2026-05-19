---
date: ""
title: Aggregated data point requests no longer fire when the slider is disabled
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
version: 1023.14.160
---
When the slider setting was disabled in data point graph or data explorer, there were still unnecessary requests to fetch aggregated data points, which caused performance issues and wasted resources. The requests are now correctly skiped when the slider is disabled, improving performance and reducing unnecessary network traffic.