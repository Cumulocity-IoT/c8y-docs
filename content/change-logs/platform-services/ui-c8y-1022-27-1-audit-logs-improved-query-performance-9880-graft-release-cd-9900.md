---
date: ""
title: Improved query performance for audit logs
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
ticket: MTM-64464
version: 1022.27.1
---
In the past, loading the audit logs list in the Administration app was slow, especially for tenants with a large number of audit log entries. This change optimizes the query used to retrieve the audit logs from backend, resulting in a significant performance improvement. Users will now experience much faster loading times when viewing the audit log list, even for tenants with extensive audit history.