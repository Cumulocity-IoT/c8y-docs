---
date: '2026-03-31'
title: Redirecting to the last viewed tab on a dashboard now works properly
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
ticket: MTM-62145
version: 1021.59.2
---
Previously, when navigating back to a dashboard, the application did not always redirect the user to the last viewed tab on that dashboard, which was confusing and inconvenient. This issue has now been fixed. With this change, users will always be redirected to the last tab they were viewing on a dashboard when returning to it, providing a more consistent and seamless navigation experience within the application. This improvement applies to all existing and new dashboards.
