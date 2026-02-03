---
date: 2024-07-30
title: Added support for device certificate authentication
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-54838
version: 10.20.485.0
---
{{< product-c8y-iot >}} now supports the ability to infer the full certificate chain from an intermediate certificate, enabling devices that are only able to send the device certificate to connect to {{< product-c8y-iot >}}. For full details refer to [Device authentication](/device-integration/device-integration-rest/#device-authentication).
