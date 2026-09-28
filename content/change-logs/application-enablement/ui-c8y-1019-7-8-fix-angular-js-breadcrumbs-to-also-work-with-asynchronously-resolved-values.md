---
date: '2024-03-14'
title: AngularJS breadcrumbs updated to work with asynchronous values
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-3188
version: 1019.7.8
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The AngularJS breadcrumbs component has been updated to properly display breadcrumbs when values are resolved asynchronously. Previously, asynchronously set values would not correctly appear in the breadcrumbs. This update ensures that breadcrumbs will now display as expected regardless of synchronous or asynchronous value resolution. In particular, this fixes breadcrumbs on **SmartREST templates** and **Device credentials** pages.
