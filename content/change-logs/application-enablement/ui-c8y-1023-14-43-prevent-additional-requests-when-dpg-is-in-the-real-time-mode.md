---
date: ""
title: prevent additional requests when the data points graph is in real time mode
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
ticket: MTM-65548
version: 1023.14.43
---
When the data points graph widget operates in real time mode, it was making unnecessary additional requests to fetch data, which could impact performance and increase server load.