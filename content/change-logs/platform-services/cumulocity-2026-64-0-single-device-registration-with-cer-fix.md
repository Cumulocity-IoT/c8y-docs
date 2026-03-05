---
date: ''
title: Fix for Single Device Registration Process Using C8y CA Certificates
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

---
Resolved an issue affecting the initial group assignment during [single device registration](https://cumulocity.com/docs/device-management-application/registering-devices/#single-device-registration) when using the “create device certificates during device registration” option with {{< product-c8y-iot >}} CA certificates.

Previously, devices registered individually were not correctly added to their designated initial device group upon first connection.

With this update, when a single device is registered and an initial device group is specified, the device is now properly assigned to the target group upon its first connection.
