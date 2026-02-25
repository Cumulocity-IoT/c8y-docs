---
date: '2025-04-10'
title: Role description no longer displayed as trusted HTML to improve security
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
ticket: MTM-59286
version: 1021.56.4
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Previously, it was possible to put malicious code into the description of inventory roles and when it was displayed, that code was treated as trusted HTML. For example, if a description was "&lt;img src="x" onerror="alert(123)" /&gt;", the browser alert method was called when displayed.
The description is treated as potentially dangerous now (as most user-provided properties) and XSS attacks as described above are no longer possible. There is no visual change for customers, non-harmful markdown is still interpreted (tags, classes are not stripped away).
