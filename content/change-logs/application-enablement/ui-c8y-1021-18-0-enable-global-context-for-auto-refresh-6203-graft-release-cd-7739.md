---
date: '2024-12-19'
title: Auto refresh can now be enabled globally in dashboards
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-58878
version: 1021.18.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Previously, auto refresh was only available in certain parts of the application, such as the **Alarms** page, "Alarms" widget and "Map" widget. With this change, auto refresh can now be enabled globally in any dashboard. This means that the data displayed in widgets, that support this functionality and have it enabled, will be automatically updated at set and common intervals, without the need to manually refresh or set their intervals separately. The impact of this change is an improved user experience as users will always see the most up-to-date information without having to take any additional action.
