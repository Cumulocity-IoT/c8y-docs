---
date: '2026-03-31'
title: Fixed disabling c8y-select component in multi-select mode
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
ticket: MTM-63732
version: 1022.4.8
---
The c8y-select component had an issue where the `disabled` option did not work when using the multi-select mode. This change fixes the issue so that setting the `disabled` input to true now properly disables the c8y-select component while in multi-select mode. This impacts any applications or pages using the c8y-select component in multi-select mode where the disabled option must function correctly.
