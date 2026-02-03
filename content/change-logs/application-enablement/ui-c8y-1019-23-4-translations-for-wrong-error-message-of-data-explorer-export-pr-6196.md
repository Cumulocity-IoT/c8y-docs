---
date: 2024-05-13
title: Fixed incorrect error message when exporting data in the data explorer
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-57881
version: 1019.23.4
---
In the data explorer, when attempting to export data that exceeds the configured maximum number of rows, an incorrect error message was displayed. This change fixes the error message to provide the correct information to the user. The user will now see an accurate error message explaining that the export failed because the number of rows selected exceeds the configured maximum limit.
