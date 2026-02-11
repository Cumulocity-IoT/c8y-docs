---
date: ""
title: Fix aborting message generation in HTML widget AI code assistant
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
version: 1023.42.5
---
HTML widget AI code assistant had issues with aborting messages. In some circumstances loading of assistant message was caught in endless loop. It is fixed now and user can abort message sending.