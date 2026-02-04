---
date: '2026-01-29'
title: OPC UA gateway with the thin-edge.io proxy support
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
ticket: DM-4971
version: 1023.1.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
    date: '2026-02-04'
  - label: jp.cumulocity.com
    date: '2026-02-04'
---
The OPC UA gateway now connects to {{< product-c8y-iot >}} through the local [{{< product-c8y-iot >}} thin-edge.io proxy](https://thin-edge.github.io/thin-edge.io/references/cumulocity-proxy/).
Consequently, OPC UA gateway thin-edge.io usage without the {{< product-c8y-iot >}} proxy is now deprecated and will be removed in a future version.
Please update your gateway configuration to use this local proxy model corresponding to our [revised documentation](/device-integration/opcua/#thinedge-recommended-config).
