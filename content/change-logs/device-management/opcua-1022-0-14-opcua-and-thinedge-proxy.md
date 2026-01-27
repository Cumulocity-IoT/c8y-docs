---
date: ""
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
version: 1022.0.14
---
The OPC UA gateway now connects to {{< product-c8y-iot >}} through the local [{{< product-c8y-iot >}} thin-edge.io proxy](https://thin-edge.github.io/thin-edge.io/references/cumulocity-proxy/).
Consequently, OPC UA gateway thin-edge.io usage without the {{< product-c8y-iot >}} proxy is now deprecated and will be removed in a future version.
Please update your gateway configuration to use this local proxy model corresponding to our [revised documentation](/device-integration/opcua/#thinedge-recommended-config).
