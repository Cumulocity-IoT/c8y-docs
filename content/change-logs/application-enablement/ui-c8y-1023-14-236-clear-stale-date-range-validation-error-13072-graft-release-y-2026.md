---
date: 2026-11-10
title: Fixed validation of custom date ranges
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
ticket: MTM-67772
version: 1023.14.236
---
In custom date ranges, for example, in the data explorer, in dashboard time contexts, and in alarm filters, the validation error stayed visible after you corrected the range, and you could apply ranges shorter than one minute. This issue has been fixed. The error now clears as soon as the range is valid, and ranges under one minute are rejected.
