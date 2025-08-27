---
date:
title: Deprecation of OPC UA gateway legacy thin-edge.io configuration
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
ticket: DM-4855
version:
---
To simplify deployment, the Cumulocity OPC UA gateway now connects through the local Cumulocity proxy running on the thin-edge.io device.
Consequently, the legacy configuration option to enable the thin-edge.io mode is now deprecated. Please update your gateway
configuration to use this local proxy model corresponding to our [revised documentation](/device-integration/opcua/#thinedge-recommended-config).
