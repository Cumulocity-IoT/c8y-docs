---
date: 2024-03-26T10:33:39.707Z
title: Separate security modes for bootstrap and LWM2M server
change_type:
  - value: change-QHu1GdukP
    label: Feature
product_area: Device management & connectivity
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-554
version: 10.18.288.0
---
All LWM2M device security modes can now be selected separately for bootstrap server and LWM2M server connections. This can be defined either during the device registration or via the respective settings in the **LWM2M configuration** tab of the device.
For LWM2M bulk device registrations, it is now required to define the security mode for both LWM2M server in the `securityMode` field and the bootstrap server in the `bootstrapSecurityMode` field in the CSV file.
For details, refer to the [LWM2M security fields](/protocol-integration/lwm2m/#all-security-field-details) user documentation.