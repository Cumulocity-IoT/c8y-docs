---
date: ""
title: All fields in single sign-on configuration form accessible when selecting multiple options
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-62499
version: 1018.503.150
---
Previously, when users configured single sign-on settings and selected multiple default global roles, multiple default applications, or a combination of both, the form extended beyond the visible area, making some fields inaccessible. Users can now properly view and edit all fields regardless of their selection.