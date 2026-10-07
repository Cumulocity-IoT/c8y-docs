---
date: ""
title: Prevent dashboard widgets from being saved to another dashboard
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
ticket: MTM-67837
version: 1024.19.9
---
Widget changes made on one dashboard could be incorrectly saved to another dashboard. This issue has been fixed. Changes now apply only to the dashboard you're currently editing.