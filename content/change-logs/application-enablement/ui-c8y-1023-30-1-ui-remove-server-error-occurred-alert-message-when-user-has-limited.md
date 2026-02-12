---
date: ""
title: Removed misleading error alerts and made the alarms view unavailable for users without permission
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
ticket: MTM-63546
version: 1023.30.1
---
Previously, when users without alarm permissions viewed the alarms page, repeated "server error occurred" alerts appeared, hiding the actual permission message. With this change, the misleading error alerts have been removed. The alarms view and its navigator entry are now hidden for users without alarm permissions, showing a clear "You don't have permission to view alarms" message instead.
