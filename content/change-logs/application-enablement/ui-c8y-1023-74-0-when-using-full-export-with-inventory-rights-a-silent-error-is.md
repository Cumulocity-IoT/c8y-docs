---
date: ""
title: Full export for users with only inventory rights no longer causes silent errors
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66010
version: 1023.74.0
---
With the current change, the `Full export` option will be disabled for users with only inventory rights. This will prevent data from being exported, even if the UI does not display an error message.