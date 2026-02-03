---
date: 2024-04-25
title: Private smart rules no longer require the contextData property
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
ticket: MTM-55916
version: 1019.22.0
---
In the past, private smart rules had the property `contextData` in `c8y_Context`, even if the rule did not use it. This is no longer required. Private smart rules can now be created without the `contextData` property, to avoid storing redundant data in the database. This change only affects the creation of new private smart rules. Existing smart rules are not impacted.
