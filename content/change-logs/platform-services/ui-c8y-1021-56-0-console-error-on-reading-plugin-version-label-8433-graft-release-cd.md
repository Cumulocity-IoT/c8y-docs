---
date: '2025-04-10'
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
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
In the **Versions** tab of an extension, the **Package contents** section of a selected plugin version now shows a label for each plugin version listed indicating its type. Previously, no label was shown and a console log error was thrown.
