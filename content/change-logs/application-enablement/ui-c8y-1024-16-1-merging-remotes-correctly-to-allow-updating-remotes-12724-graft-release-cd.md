---
date: ""
title: Plugins are now merged correctly during update operations
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
ticket: MTM-66892
version: 1024.16.1
---
When updating plugins in the Web SDK, the merging process was not handling the merge correctly, which could cause updates to fail or produce unexpected results. Plugins are now merged properly during update operations, ensuring that all plugins are updated as expected.