---
date:
title: OPC UA gateway now runs on Java 17
product_area: Device management & connectivity
change_type:
  - value: change-3BQrQ6adS
    label: API change
component:
  - value: component-Tf05_KQ-B
    label: OPC UA
build_artifact:
  - value: tc-MLn0oFRX-
    label: opcua
ticket: DM-4961
version: TODO
---
Together with the update to Java 17, the internal database of the OPC UA gateway has been changed from MapDB and ChronicleMap to RocksDB. This change enhances the performance and reliability of the gateway, ensuring compatibility with Java 17.
Please note that this update may require additional data migration or re-registration of device gateways. It is recommended to back up your existing local gateway data before proceeding with the update.
Some gateway properties related to the internal database have been removed:
- gateway.mappingExecution.alarmStatusStore.maxEntries
- gateway.mappingExecution.deviceTypeMappingStore.maxServerMappingsEntries
- gateway.mappingExecution.alarmStatusStore.averageKeySize
- gateway.mappingExecution.deviceTypeMappingStore.averageMappingsKeySize
- gateway.mappingExecution.deviceTypeMappingStore.averageMappingsValueSize
- gateway.mappingExecution.alarmStatusStore.maxBloatFactor
- gateway.mappingExecution.deviceTypeMappingStore.maxMappingsBloatFactor
