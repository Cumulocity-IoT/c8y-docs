---
date: ""
title: Data point graph slider using wrong data source has been fixed.
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
ticket: MTM-65603
version: 1023.14.16
---
The slider widget was in some rare cases incorrectly requesting data from the wrong device target, leading to no data being displayed. This issue has been resolved and the slider now correctly retrieves the data.