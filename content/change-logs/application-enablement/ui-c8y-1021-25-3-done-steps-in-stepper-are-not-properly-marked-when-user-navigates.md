---
date: ""
title: Stepper navigation marks steps incorrectly when navigating back and forth
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
ticket: MTM-60759
version: 1021.25.3
---
In some scenarios, users may navigate back and forth between steps in a stepper component. Previously, when navigating this way, the stepper incorrectly marked and displayed completed steps as incomplete. This has now been fixed so that the stepper component correctly reflects the done steps when the user navigates backwards and forwards through the steps.