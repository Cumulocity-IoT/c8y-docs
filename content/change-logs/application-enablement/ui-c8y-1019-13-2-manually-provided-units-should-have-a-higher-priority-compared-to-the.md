---
date: '2024-03-27'
title: Custom units overrule data point units
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
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
In some cases, users want to override the units of a data point with a custom unit. Previously, the data point unit had a higher priority than the manually specified unit, which was not the desired behavior. With this change, manually provided units now have a higher priority compared to the actual data point units. This ensures that the custom unit specified by the user is always used instead of the default data point unit.
