---
date: 2023-12-06T12:55:41.157Z
title: New LWM2M configuration tab
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
ticket: DM-342
version: 10.18.483.0
---
The details of a LWM2M device now show a <b>LWM2M configuration</b> tab which replaces the <b>LWM2M bootstrap parameters</b> tab. The new tab is better structured and allows detailed configuration. It contains all configuration options of the former <b>LWM2M bootstrap parameters</b> tab as well as additional setting options:

- LWM2M device settings such as awake time registration parameter, request timeout, serialization format, binary delivery encoding, use timestamp resources, keeping old values
- Device security modes selection including the new X.509 certificate mode and selection for LWM2M bootstrap and server individually
- Firmware update configurations
- A set of LWM2M Server configurations that can be written to the device during bootstrap

For details, refer to the [LWM2M](/device-integration/lwm2m/) user documentation.

If the new <b>LWM2M configuration</b> tab is not displayed and the <b>LWM2M bootstrap parameters</b> tab is displayed instead, the LWM2M agent is installed in an older version that does not yet support the new tab.
