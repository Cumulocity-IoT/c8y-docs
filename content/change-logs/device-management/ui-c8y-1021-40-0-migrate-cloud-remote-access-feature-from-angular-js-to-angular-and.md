---
date: '2025-03-20'
title: >-
  Cloud remote access feature migrated to Angular and made extendable via
  hookService
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-4367
version: 1021.40.0
---
The Cloud Remote Access feature in {{< product-c8y-iot >}} enables users to remotely access and manage their devices. As part of ongoing improvements, this feature has been migrated from the older AngularJS framework to the newer Angular framework. This migration aligns the feature with the latest web technologies and provides a more modern and maintainable codebase. Additionally, the Cloud Remote Access feature is now extendable via the hookService, allowing developers to customize and enhance its functionality to suit their specific requirements. While the core functionality of Cloud Remote Access remains the same, users may notice minor visual changes in the user interface due to the framework migration.

Customers maintaining their own Device Management application, can refer to [this git diff](https://github.com/Cumulocity-IoT/devicemanagement/compare/v1021.39.1...v1021.40.0) to identify the changes required to switch to the new implementation.
