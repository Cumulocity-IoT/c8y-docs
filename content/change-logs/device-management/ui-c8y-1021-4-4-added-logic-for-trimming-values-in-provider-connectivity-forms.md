---
date: '2024-11-28'
title: Trimmed values in connectivity provider forms
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-4076
version: 1021.4.4
---
To prevent server errors caused by invalid header values with prohibited characters, such as leading or trailing spaces, whitespaces are now automatically trimmed from input values in the connectivity provider forms in the **Connectivity** tab. 
