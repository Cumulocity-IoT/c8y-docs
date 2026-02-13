---
date: '2026-02-13'
title: >-
  Message generation can now properly be terminated in HTML widget AI code
  assistant
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
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-13'
---
The HTML widget AI code assistant previously had issues when users attempted to terminate message generation. In some cases, the loading state of assistant messages could become stuck in an endless loop, preventing users from canceling the operation or further interacting with the assistant. This issue has been fixed, and users can now successfully terminate message generation when needed, allowing them to stop the assistant and regain control of the interface without being stuck in a loading state.
