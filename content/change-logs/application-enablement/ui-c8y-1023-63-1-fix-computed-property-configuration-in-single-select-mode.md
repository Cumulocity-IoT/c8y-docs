---
date: ""
title: Fix computed property configuration opening twice in single select mode
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
ticket: MTM-66278
version: 1023.63.1
---
When using the asset property selector in single-select mode, selecting a computed property with configuration opened the configuration modal twice instead of once, creating a confusing user experience. The configuration modal now opens only once, as expected. This fix ensures that configuring computed properties in single-select mode works smoothly without duplicate modal windows.