---
date: 2023-12-06T12:57:38.253Z
title: Improved performance of migration operation
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Device management & connectivity
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-1866
version: 10.18.10.0
---

The performance of the <code>migrateLwm2mDevices</code> operation has been improved. New command line arguments have been introduced with the operation. A list of legacy LWM2M devices can be specified directly from the shell command. Moreover, the migration of the LWM2M client registration objects can be skipped by using an argument.

For details, refer to <a href="/device-integration/lwm2m/#migration-of-the-lwm2m-devices" class="no-ajaxy">Migration of the LWM2M devices</a>. [DM-1866]
