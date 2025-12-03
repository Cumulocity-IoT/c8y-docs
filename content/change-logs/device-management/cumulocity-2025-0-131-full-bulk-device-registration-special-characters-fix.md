---
date: 2025-12-03
title: Fixed issue with special characters in full bulk device registration
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device management & connectivity
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-65091
version: 2025.0.131
---
In a previous version of the {{< product-c8y-iot >}} 2025 release, validation for the Device Request API had been added to ensure that IDs do not contain characters that are forbidden in usernames.

With this change, this validation has been reverted for **full** [bulk device registration](/device-management-application/registering-devices/#bulk-device-registration) scenarios. In these cases, the ID of the device request is also used to create external IDs for automatically created managed objects,
and characters such as colons are particularly useful for configuring the identity of some devices in the field.
