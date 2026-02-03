---
date: 2023-12-20
title: Fixed issue with c8ycli locale-compile
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
ticket: MTM-56601
version: 10.18.500.11
---
Fixed an issue with `c8ycli locale-compile` on Windows where the compiled JSON file was not created if the path to the PO file included folders.
