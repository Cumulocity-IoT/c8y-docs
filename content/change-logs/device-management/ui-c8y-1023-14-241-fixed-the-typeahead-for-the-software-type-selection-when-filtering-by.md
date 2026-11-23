---
date: ""
title: Fixed typeahead for software type selection when filtering by type
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-5654
version: 1023.14.241
---
Context: When you filter software by type, the software type selection field offers a typeahead that suggests matching types as you type. Previously, this typeahead did not work correctly in the filter, so you could not reliably find and select the software type you wanted. Change: The typeahead for the software type selection now shows the matching software types as you type in the filter, and you can select a suggestion directly. Impact: You can find and select software types faster when you filter by type. Existing filters, software entries, and saved views are not affected, and you do not need to take any action.