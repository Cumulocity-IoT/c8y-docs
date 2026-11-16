---
date: '2025-11-13'
title: OPC UA gateway local database upgrade
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
ticket: DM-4961
version: 1022.0.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Together with the update to Java 17, the internal database of the OPC UA gateway has been changed from MapDB and ChronicleMap to RocksDB. 
This change enhances the performance and reliability of the gateway, ensuring compatibility with Java 17.

{{< c8y-admon-important >}}
Note that this update may require additional data migration or re-registration of device gateways. 
Refer to [Upgrading from 1021 to 1022 gateway version](/device-integration/opcua/#upgrade-1021-to-1022) in the documentation. 

It is recommended to back up your existing local gateway data before proceeding with the update.
{{< /c8y-admon-important >}}

Some gateway properties related to the internal database have been removed and are no longer applicable:
- gateway.mappingExecution.alarmStatusStore.maxEntries
- gateway.mappingExecution.deviceTypeMappingStore.maxServerMappingsEntries
- gateway.mappingExecution.alarmStatusStore.averageKeySize
- gateway.mappingExecution.deviceTypeMappingStore.averageMappingsKeySize
- gateway.mappingExecution.deviceTypeMappingStore.averageMappingsValueSize
- gateway.mappingExecution.alarmStatusStore.maxBloatFactor
- gateway.mappingExecution.deviceTypeMappingStore.maxMappingsBloatFactor
