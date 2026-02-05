---
date: ""
title: remove server error alert and hide alarms view when user has limited access to alarms
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
When users with limited alarm permission viewed alarms, repeated "server error occurred" alerts appeared, hiding the actual permission message. The misleading error alerts have been removed, and the alarms view is now unavailable for users without alarm permission, showing a clear "You don't have permission to view alarms" message instead.