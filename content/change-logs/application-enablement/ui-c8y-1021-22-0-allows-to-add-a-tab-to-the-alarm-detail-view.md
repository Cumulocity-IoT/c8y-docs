---
date: ""
title: allows to add a tab to the alarm detail view
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
ticket: MTM-59811
version: 1021.22.0
---
In some cases, it may be required to show additional, custom information related to alarms. With this change, it is now possible to extend the alarm details view with custom tabs to display alarm related information. This allows integrating 3rd party data or visualizations that provide additional context for an alarm. Existing alarm details will not be affected, the new custom tabs will be added in addition to the already existing tabs.