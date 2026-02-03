---
date: '2025-01-09'
title: Removed obsolete AngularJS device list map module
product_area: Device management & connectivity
change_type:
  - value: change-3BQrQ6adS
    label: API change
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-3089
version: 1021.28.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
As a result of the device map component migration to Angular, the obsolete AngularJS device list map module (`c8y.parts.deviceListMap`) has been removed from the `@c8y/ng1-modules` package. If your application uses the **Device map** page, you can use the new `deviceMapFeatureProvider` from the `@c8y/ngx-components/device-map` package as a replacement.
