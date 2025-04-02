---
date: ""
title: Role description displayed trusted HTML fix to avoid XSS attacks
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
version: 1018.503.152
---
Previously, it was possible to put malicious code into description of inventory role and when it's displayed, that code would be executed as it was treated as trusted HTML. E.g. if description would be "<img src="x" onerror="alert(123)" />", browser alert method would be called when displayed.
Description is treated as potentially dangerous now (as most user provided properties) and attacks described above are not possible. There is no visual change for customers, non-harmful markdown is still interpreted (tags, classes are not stripped away).