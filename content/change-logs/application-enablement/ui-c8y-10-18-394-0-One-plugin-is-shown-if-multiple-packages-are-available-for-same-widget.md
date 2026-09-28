---
date: '2023-12-06'
title: One plugin is shown if multiple packages are available for same widget
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Application enablement & solutions
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-54208
version: 10.18.394.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
In the application plugin view, if multiple packages (subscribed and custom) were available for the same widget, the platform displayed multiple entries for the same installed plugin. Now only one plugin is shown.
