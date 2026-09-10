---
date: ""
title: Data point export now honors inventory roles scoped to fragment types
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
ticket: MTM-67381
version: 1024.16.18
---
Users whose measurement READ permission came from an inventory role restricted to specific fragment types could see data in the data explorer, but "Generate export" failed with a permission error. The export now succeeds, and if a device has both readable and unreadable data points, the readable ones are exported.
