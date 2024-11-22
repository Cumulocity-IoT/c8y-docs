---
date: ""
title: Improved validation error for invalid branding variant names
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
ticket: MTM-60927
version: 1021.6.2
---
Previously, when specifying an invalid branding variant name via the UI or API, the resulting validation error was not clear and made it difficult to identify the issue. With this change, the platform now provides a more meaningful and specific validation error message when an invalid branding variant name is entered. This improvement helps users quickly identify and correct any issues with the specified branding variant name, saving time and effort in the configuration process.