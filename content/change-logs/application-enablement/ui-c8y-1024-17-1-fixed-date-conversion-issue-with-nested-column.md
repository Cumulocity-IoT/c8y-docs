---
date: ""
title: Fixed date conversion issue in the asset table widget
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
ticket: MTM-67326
version: 1024.17.1
---
Asset table widgets now correctly convert and display nested timestamp fragments (such as UTC strings) into localized dates when the Date display format is selected. We have also resolved an issue where conditional formatting with the Icon display type caused date and time values to vanish, ensuring both the icon and text value render properly.