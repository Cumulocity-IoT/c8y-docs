---
date: ""
title: Fix legacy AngularJS widget IDs resolving to their Angular equivalents
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
ticket: DM-7067
version: 1023.14.210
---
When you migrated custom widgets from AngularJS to Angular in the Device management app, the system did not properly resolve legacy widget IDs to their new Angular equivalents. This caused custom widgets to fail loading or display incorrectly after the migration. The system now correctly maps legacy AngularJS widget IDs to their corresponding Angular widget IDs, ensuring that your existing custom widgets continue to work seamlessly after the migration. This fix applies to all custom widgets in your Device management app installations, allowing you to upgrade without losing functionality or needing to manually update widget references.