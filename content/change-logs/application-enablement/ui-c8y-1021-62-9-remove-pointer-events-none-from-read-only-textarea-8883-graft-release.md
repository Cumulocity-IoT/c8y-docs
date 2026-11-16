---
date: '2025-05-08'
title: Allow pointer events on read-only text areas
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
ticket: MTM-63298
version: 1021.62.9
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Previously, read-only text areas had the CSS property `pointer-events: none` which prevented any pointer interactions such as clicking, selecting text or scrolling. With this change, the `pointer-events: none` CSS property has been removed from read-only text areas. This allows users to interact with read-only text areas using pointer events like clicking to focus or scrolling the text area content if it overflows, thereby providing a more intuitive and consistent user experience.
