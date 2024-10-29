---
date: ""
title: Typeahead control validation fixed when using JSON path in 'displayProperty'
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
ticket: DM-3955
version: 1020.35.2
---
Previously, when using a JSON path in the `displayProperty` of a typeahead control, the validation not allowing free entries (allowFreeEntries = false) was not working correctly and could lead to unexpected behavior, such as creating orphan entries when an item needs to be assigned to a parent entity. This issue has now been fixed. This change improves the reliability and usability of typeahead controls in forms.