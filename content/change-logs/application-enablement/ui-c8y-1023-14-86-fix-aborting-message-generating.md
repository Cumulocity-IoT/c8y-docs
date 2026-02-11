---
date: ""
title: Fix aborting message generating.
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
ticket: MTM-65298
version: 1023.14.86
---
HTML widget AI code assistant had issues with aborting messages. In some circumstances loading of assistant message was caught in endless loop. It is fixed now and user can abort message sending.