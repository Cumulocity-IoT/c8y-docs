---
date: ""
title: Removed length limits for fragment, series, and label on a data point form
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
ticket: MTM-65464
version: 1023.17.15
---
Data point forms previously imposed character length restrictions on fragment, series, and label fields, which could prevent users from entering longer, more descriptive and detailed identifiers for their data points, or from being able to select a data point that has been created with longer identifiers via API. This change removes the length limits for the fragment, series, and label fields on data point forms, allowing users to enter values of any length without being restricted by character count constraints. Additionally, visual improvements have been made to properly handle longer labels in the data point graph or data point list.