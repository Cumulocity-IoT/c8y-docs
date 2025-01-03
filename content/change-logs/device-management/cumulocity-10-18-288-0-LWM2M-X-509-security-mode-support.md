---
date: 2024-03-26T10:33:39.707Z
title: X.509 security mode support for LWM2M devices
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
The Certificate Authority that issued device certificates must be added and enabled in [trusted certificates](/docs/device-management-application/managing-device-data/#managing-trusted-certificates) in the tenant.
