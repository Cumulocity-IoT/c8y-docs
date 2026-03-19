---
date: '2026-03-12'
title: Devices are now correctly added to initial device group
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Platform services
component:
  - value: component-OG_650_b2
    label: Core platform
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-65958
version: 2026.64.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-03-12'
  - label: apj.cumulocity.com
    date: '2026-03-18'
  - label: jp.cumulocity.com
    date: '2026-03-18'
---
An issue has been resolved affecting the initial group assignment during [single device registration](/device-management-application/registering-devices/#single-device-registration) when using the “create device certificates during device registration” option with {{< product-c8y-iot >}} CA certificates.

Previously, devices registered individually were not correctly added to their designated initial device group upon first connection.

With this update, when a single device is registered and an initial device group is specified, the device is now properly assigned to the target group upon its first connection.
