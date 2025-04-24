---
date: 2023-12-06T10:33:39.707Z
title: X.509 security mode support
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
LWM2M device connections with X.509 certificates are now supported.
The X.509 security mode can be selected separately for the Bootstrap server and the LWM2M server either during device registration or, for existing devices, by using the new **LWM2M configuration** tab.
The Certificate Authority that issued device certificates must be added and enabled in the [trusted certificates](/device-certificate-authentication/managing-trusted-certificates/) in the tenant.

Together with this change also the following changes are introduced:

##### Separate security mode for Bootstrap and LWM2M server

Now all LWM2M device security modes can be selected separately for Bootstrap server and LWM2M server connections. This can be defined either during the device registration or using the **LWM2M configuration** tab of the device.

##### Disable authentication for Bootstrap or LWM2M server

Under **Connectivity** in the **LWM2M configuration** tab, the Bootstrap or LWM2M server connection can be disabled for a device.

##### PSK-generated option for LWM2M server security mode

During device registration, the "PSK generated" option can be selected for LWM2M Server connection to make LWM2M agent to generate the PSK ID and PSK key credentials for the device. These will be set to the device during the bootstrap process.
For details, refer to the [LWM2M](/device-integration/lwm2m/) user documentation.
