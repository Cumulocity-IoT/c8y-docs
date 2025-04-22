---
date: ""
title: Remove `pointer-events: none` from read-only textarea (#8883) [GRAFT][release/cd] (#8884)
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
---
Previously, read-only textareas had the CSS property `pointer-events: none` which prevented any pointer interactions such as clicking, selecting text or scrolling. With this change, the `pointer-events: none` CSS property is removed from read-only textareas. This allows users to interact with read-only textareas using pointer events like clicking to focus or scrolling the textarea content if it overflows, thereby providing a more intuitive and consistent user experience.