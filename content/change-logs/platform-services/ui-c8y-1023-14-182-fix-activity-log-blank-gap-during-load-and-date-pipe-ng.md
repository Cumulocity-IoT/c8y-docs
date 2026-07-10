---
date: ""
title: Activity log displays dates correctly and loads without visual gaps or console errors
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
ticket: MTM-67114
version: 1023.14.182
---
Two independent bugs in application's Activity log
1. Blank gap during archive load- loading state for archive entries loading
2. DatePipe NG02100 error flooding the console- fixed, no errors in console anymore.