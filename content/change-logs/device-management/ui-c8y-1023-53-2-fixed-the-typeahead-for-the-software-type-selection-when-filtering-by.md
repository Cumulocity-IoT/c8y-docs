---
date: ""
title: Fix software type filter losing selection in typeahead
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
version: 1023.53.2
---
When filtering software by type, the typeahead field did not consistently preserve or display the selected software type. In some cases, the selection state became inconsistent, making filtering behavior confusing. This issue has been resolved - the software type typeahead now correctly maintains the selected value and reliably filters results based on the chosen software type.