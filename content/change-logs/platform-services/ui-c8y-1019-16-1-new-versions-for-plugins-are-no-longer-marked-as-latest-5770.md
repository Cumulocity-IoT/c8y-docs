---
date: 2024-04-04
title: New plugin versions are no longer automatically marked as latest
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
ticket: MTM-57691
version: 10.19.16.1
---
In the past, when a new version of a plugin was uploaded, it was automatically marked as the latest version. This could lead to confusion if an older version of the plugin was intended to be used as the latest one. With this change, new plugin versions are no longer automatically marked as latest when they are uploaded. This gives users more control to explicitly decide which version of a plugin should be marked as the latest one. Existing plugins and their latest version marking are not impacted by this change.
