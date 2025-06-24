---
date: ""
title: Alarm list widget does not include child devices alarms by default after upgrade to new implementation
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
ticket: MTM-63974
version: 1021.22.99
---
In the migrated "Alarm list" widget, child device alarms were not being displayed even though they were shown by default in the legacy version. During migration, the toggle for showing child device alarms was incorrectly set to disabled. This issue has been fixed. The option now defaults to enabled, so migrated widgets will show child device alarms correctly without requiring configuration changes.
Note: The migration applies until the widget configuration is saved, then this change must be done manually.