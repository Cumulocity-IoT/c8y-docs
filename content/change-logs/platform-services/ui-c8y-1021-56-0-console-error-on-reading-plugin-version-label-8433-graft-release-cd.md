---
date: ""
title: Added plugin label to package content information for plugin versions
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-62700
version: 1021.56.0
---
In the "Package contents" section of the selected plugin version, each plugin listed will have its own label indicating its type. Previously, no label was shown and a console log error was thrown.