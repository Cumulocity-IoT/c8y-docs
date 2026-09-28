---
weight: 60
title: Management security
layout: bundle
---

Whenever a security-relevant event occurs, it must be logged for potential auditing. Security-relevant events may happen both on application level as well as in the IoT network. A simple example of a security-relevant event on application level is a login to the application. An example of a security-relevant event on the network level is using a local software or local control on a device to manipulate the device.

To capture security-relevant events, {{< product-c8y-iot >}} offers an [auditing interface](https://{{< domain-c8y >}}/api/core/#tag/Audit-API). This interface enables applications and agents to write audit logs, which are persistently stored and cannot be externally modified after being written. {{< product-c8y-iot >}} itself also writes own audit records related to login and device control operations.

To receive security-related reports about the {{< product-c8y-iot >}} platform, interested parties with a maintenance contract can subscribe to Early Warnings in the [{{< c8y-tech-community >}}]({{< c8y-tech-community-link >}}).

To report security incidents, please contact [product support](/additional-resources/contacting-support).
