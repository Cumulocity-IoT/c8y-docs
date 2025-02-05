---
date: 2024-03-01
title: Deprecation of Cumulocity Linux Agent
change_type:
  - value: change-inv-3bw8e
    label: Announcement
product_area: Edge
component:
  - value: component-IpOEfM7nQ
    label: Edge Appliance VM
build_artifact:
  - value: tc-Tk9F8QhaO
    label: edge-appliance-vm
version: 10.18.0.0
---
With the release of {{< product-c8y-iot >}} Edge version 10.18, we are announcing the deprecation of the {{< product-c8y-iot >}} Linux Agent included in the {{< product-c8y-iot >}} Edge offering. Version 10.18 will mark the final release to feature the {{< product-c8y-iot >}} Linux Agent.

Previously, {{< product-c8y-iot >}} Edge utilized the {{< product-c8y-iot >}} Linux Agent to support protocols such as Modbus and CANopen, as well as to collect and publish resource consumption metrics. Moving forward, Edge will internally manage the collection and publication of resource consumption metrics.

If your use case involves Modbus-TCP or Modbus-RTU, we recommend migrating to the thin-edge.io connectors for {{< product-c8y-iot >}}. For users of CANopen, we suggest considering migration to one of our partner-supported solutions or deploying {{< product-c8y-iot >}} Linux Agent as an additional component.

We are fully committed to assisting and guiding you through this transition. Should you have any questions or require further assistance, reach out to our support team.

We sincerely appreciate your understanding and cooperation as we strive to improve and expand our product offerings.
