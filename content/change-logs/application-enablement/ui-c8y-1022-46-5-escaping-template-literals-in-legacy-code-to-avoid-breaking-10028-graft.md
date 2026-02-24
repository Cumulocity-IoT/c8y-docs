---
date: '2026-03-31'
title: Escaped template literals in legacy HTML widget code to avoid breaking
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
ticket: MTM-64630
version: 1022.46.5
---
In legacy HTML widget code, template literals were not properly escaped which could lead to broken functionality in certain scenarios. This change ensures that all template literals are now correctly escaped.
