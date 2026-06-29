---
date: ""
title: Custom widgets now shown correctly in device dashboards
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
In the Device Management application, custom widgets configured for specific application dashboards were not displayed because legacy dashboards without an explicit application association were being included in the dashboard resolution process, which conflicted with app-specific dashboards. The Device Management app now filters device dashboards strictly to those explicitly bound to the current application. Legacy dashboards that lack a c8y_AppliedToApplications fragment are no longer included, ensuring custom widgets appear as expected.