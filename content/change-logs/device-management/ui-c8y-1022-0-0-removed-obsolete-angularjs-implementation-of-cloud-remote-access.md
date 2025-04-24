---
date: 2025-02-17
title: Removed obsolete AngularJS implementation of Cloud Remote Access feature
product_area: Device management & connectivity
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-4367
version: 1022.0.0
---
As part of our ongoing improvement efforts, in a previous version, we have migrated the Cloud Remote Access feature from the older AngularJS framework to the newer Angular framework.
The new Angular-based implementation makes the old AngularJS-based implementation obsolete.
The AngularJS-based implementation will therefore be removed from the [@c8y/ng1-modules npm package](https://www.npmjs.com/package/@c8y/ng1-modules) starting with version 1022.0.0.

Customers maintaining their own Device Management application can refer to [this git diff](https://github.com/Cumulocity-IoT/devicemanagement/compare/v1021.39.1...v1021.40.0) to identify the changes required to switch to the new implementation.