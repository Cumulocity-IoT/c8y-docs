---
date: '2026-02-04'
title: Home dashboard widget titles are now translated by default
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
ticket: MTM-65811
version: 1023.22.16
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-04'
---
Home dashboards in applications like Cockpit and Device Management previously required manual configuration to display widget titles in the user´s language. Now, the `Translate widget titles` setting is enabled by default for all newly created home dashboards, ensuring that widget titles automatically appear in the appropriate language based on the user´s locale. This change applies only to new dashboards and does not affect existing dashboards or other dashboard types such as Cockpit asset dashboards, so your current configurations remain unchanged.
