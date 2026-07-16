---
date: ""
title: internationalization extra option now applied correctly
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
ticket: MTM-67185
version: 1023.14.185
---
The internationalization extra option was not being applied correctly in certain scenarios, which could result in incomplete or missing translations in the user interface. The system now properly processes and applies the i18nExtra option during initialization, ensuring that all custom internationalization settings are respected and loaded as expected. This fix ensures that your custom translation configurations work reliably across your applications and installations without requiring workarounds or manual adjustments.