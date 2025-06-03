---
date: ""
title: The measurements without units could not be exported correctly
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
ticket: MTM-63706
version: 1021.77.1
---
Previously, measurements without unit resulted in exports containing only headers while omitting the actual measurement values. This bug has been fixed, ensuring complete data export including both headers and values.