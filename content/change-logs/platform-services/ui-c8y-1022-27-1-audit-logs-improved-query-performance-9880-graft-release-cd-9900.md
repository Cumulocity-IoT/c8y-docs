---
date: '2025-09-18'
title: Improved audit logs list performance
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
In the past, loading the audit logs list in the Administration application was slow, especially for tenants with a large number of audit log entries. This change results in a significant performance improvement. Users will now experience much faster loading times when viewing the audit log list, even for tenants with an extensive audit history.
