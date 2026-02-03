---
date: '2024-06-06'
title: Device management services functionality is now available as plugin
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-2973
version: 1020.0.0
---
The services component was previously an integral part of the default Device Management application. With this change, the functionality for services has been modularized into a plugin. By default, users will still have access to services within the Device Management application. However, if not needed, the functionality can be removed by deactivating the plugin. This approach offers flexibility for users who may or may not require certain functionalities within the application.
