---
date: '2026-03-31'
title: Reset to default functionality for application plugins works properly
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-62327
version: 1021.32.4
---
In certain situations, the **Reset to default** button in the list of plugins installed to a certain application did not work properly which could lead to inconsistencies. This has been addressed so that the default application plugins will be loaded properly on resetting the plugins to default.
