---
date: ""
title: Fixed error state display for FormGroupComponent
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
ticket: MTM-66800
version: 1023.88.1
---
The FormGroupComponent did not reliably show validation errors in some cases, for example, when a numeric input was adjusted using keyboard arrow keys, the red border and error message appeared inconsistently. The component now correctly displays error messages and visual indicators when form validation fails. This ensures that users receive clear feedback about form validation issues and can take appropriate action to correct their input.