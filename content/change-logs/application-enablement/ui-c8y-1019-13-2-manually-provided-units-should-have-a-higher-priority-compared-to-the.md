---
date: 2024-03-27
title: Custom units overrule datapoint units
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-58426
version: 1019.13.2
---
In some cases, users want to override the units of a datapoint with a custom unit. Previously, the datapoint unit had a higher priority than the manually specified unit, which was not the desired behavior. With this change, manually provided units now have a higher priority compared to the actual datapoint units. This ensures that the custom unit specified by the user is always used instead of the default datapoint unit.
