---
date: ""
title: Restore hidden-labels modifier on read-only forms
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
ticket: MTM-67545
version: 1024.15.11
---
The `hidden-labels` modifier was not being applied correctly to read-only forms, which caused labels to display when they should have been hidden. This modifier is now properly restored and applied to read-only forms, ensuring that labels remain hidden as expected when you use the `hidden-labels` modifier on your forms.