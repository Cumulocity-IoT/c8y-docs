---
date: '2023-12-06'
title: Disabling OPC UA Server endpoint validation
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Device management & connectivity
component:
  - value: component-Tf05_KQ-B
    label: OPC UA
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-2425
version: 10.18.253.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The endpoint validation happening during the connection to an OPC UA server can now optionally be disabled. This can be done in the gateway configuration by changing the <code>gateway.connectivity.validateDiscoveredEndpoints</code> setting to "false". Alternatively, it can be controlled via the OPC UA server managed object by setting the fragment <code>validateDiscoveredEndpoints</code> to "false".  For details, refer to <a href="/device-integration/opcua/" class="no-ajaxy">OPC UA</a>.
