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
The Activity log in applications previously displayed a blank gap while loading archive entries and dates for these entries were not displayed (also the console was flooded with DatePipe NG02100 errors). The Activity log now loads archive entries smoothly without blank gaps, date for each entry is displayed and the DatePipe errors no longer appear in the console.