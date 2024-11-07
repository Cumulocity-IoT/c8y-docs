---
date: 2024-09-02
title: Added validation and alarming for device type resources API
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-Tf05_KQ-B
    label: OPC UA
build_artifact:
  - value: tc-MLn0oFRX-
    label: opcua
ticket: DM-2145
version: 10.20.79.0
---
A new validation for the device type resources API of the OPC UA service (CREATE and UPDATE operations) has been implemented to prevent duplicate `browsePath` entries in the mappings. Refer to [Device type resources](protocol-integration/opcua/#device-type-resources) for details about the browse path. 
Additionally, if an error occurs during the device type matching in the OPC UA device gateway, a MAJOR alarm will be triggered on the server object.