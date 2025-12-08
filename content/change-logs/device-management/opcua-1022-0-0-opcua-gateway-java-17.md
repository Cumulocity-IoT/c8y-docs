---
date: '2025-11-13'
title: OPC UA gateway now runs on Java 17
product_area: Device management & connectivity
change_type:
  - value: change-inv-3bw8e
    label: Announcement
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
Ensure that your environment is compatible with Java 17 to take full advantage of the improvements. 

{{< c8y-admon-important >}}
Be aware that this update also replaces the internal gateway database and additional data migration 
or re-registration of device gateway may be required.
{{< /c8y-admon-important >}}

Refer to [Upgrading from 1021 to 1022 gateway version](/device-integration/opcua/#upgrade-1021-to-1022) in the documentation.
