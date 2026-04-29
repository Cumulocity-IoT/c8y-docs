---
date: ""
title: Export actions disabled for users without inventory write permissions
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
ticket: MTM-66664
version: 1023.78.0
---
Previously, users without inventory write permissions could access all export actions on the Cockpit Exports page and only received an error after attempting to save. This is now fixed. The "Add export" button is disabled with a tooltip explaining insufficient permissions. Duplicate and Delete row actions are hidden for read-only users. The Edit action is replaced with a View action so read-only users can still inspect export details without being able to modify them. In the export detail view, Save buttons are disabled for users without the required permissions.