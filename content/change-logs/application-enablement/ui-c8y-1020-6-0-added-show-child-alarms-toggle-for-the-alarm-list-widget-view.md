---
date: '2024-07-25'
title: Alarm list widget configuration now supports showing or hiding child alarms
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-55763
version: 1020.6.0
---
The "Alarm list" widget is used to display alarms in dashboards and other places in the {{< product-c8y-iot >}} UI. Previously, child alarms were always shown which could lead to information overload for users monitoring many alarms. With this change, a new toggle has been added to the widget configuration which allows showing or hiding the child alarms in the alarm list. This provides users with more flexibility to customize the widget to their specific use case and makes it easier to focus on the relevant top-level alarms.
