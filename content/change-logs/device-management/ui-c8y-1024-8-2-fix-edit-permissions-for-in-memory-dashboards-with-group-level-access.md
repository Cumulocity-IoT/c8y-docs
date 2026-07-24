---
date: ""
title: Fixed edit permissions for in-memory dashboards with group-level access
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-6671
version: 1024.8.2
---
In-memory dashboards are dashboards that exist only in your browser session and are not saved to the server. Previously, when you had group-level access to a dashboard, you were unable to edit it even if your group permissions allowed editing. This prevented you from making necessary changes to dashboards shared with your group. The edit permissions for in-memory dashboards now correctly respect group-level access controls, allowing you to edit dashboards when your group has the appropriate permissions. This change ensures that group-based access controls work consistently across all dashboard types, whether they are saved to the server or exist only in your browser session.