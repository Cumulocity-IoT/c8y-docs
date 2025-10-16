---
date:
title: OPC UA gateway now runs on Java 17
product_area: Device management & connectivity
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component-Tf05_KQ-B
    label: OPC UA
build_artifact:
  - value: tc-MLn0oFRX-
    label: opcua
ticket: DM-4962
version: 1022.0.0
---
Because Java 11 is outdated and no longer supported, the OPC UA gateway has been modernized and now runs on Java 17. 
This update enhances security and performance, ensuring the gateway remains reliable and efficient.
Please ensure that your environment is compatible with Java 17 to take full advantage of the improvements. 
**Caution:** Please be aware that this update also replaces the internal gateway database and additional data migration 
or re-registration of device gateway may be required.
Please refer to [Upgrading from 2021 to 2022 gateway version](/device-integration/opcua/#upgrade-2021-to-2022) documentation section.