---
date: ""
title: Fixed an issue where the SSO form would break when selecting multiple default global roles, default applications, or both
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-62499
version: 1018.503.150
---
Previously, when users attempted to configure single sign-on settings and selected multiple default global roles, multiple default applications, or a combination of both, the form extended beyond the visible area, making some fields inaccessible. Users can now properly view and complete all form fields regardless of their selection.