---
date: ""
title: Legacy dashboards no longer shown in the Device Management application
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
ticket: DM-5725
version: 1023.14.178
---
Dashboards created without an explicit application association (legacy dashboards lacking the `c8y_AppliedToApplications` fragment) were incorrectly included when resolving device dashboards in the Device Management application. The Device Management application now only shows dashboards explicitly bound to it, preventing unintended display of dashboards that belong to other applications or were created before application-scoped dashboards were introduced.