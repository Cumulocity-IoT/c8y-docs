---
weight: 120
title: O
layout: bundle
sector:
  - getting_started
---


### OPC UA {#opc-ua}

OPC Unified Architecture (OPC UA) is a standard to enable the communication between industrial devices. OPC UA is designed to work across technology boundaries (cross-platform).

One component of the OPC UA integration in {{< product-c8y-iot >}} is the OPC UA device gateway. The OPC UA device gateway is a stand-alone Java program that communicates with OPC UA server(s) and the {{< product-c8y-iot >}} platform. It stores data into the {{< product-c8y-iot >}} database via REST. The gateway must be registered as {{< product-c8y-iot >}} device.

For details see [Device management > Protocol integration > OPC UA](/protocol-integration/opcua).


### Operations {#operations}

Operations are cloud-to-device messages so that devices can be remotely controlled and managed by {{< product-c8y-iot >}}. Typical operations are installing a new software, switching a relay in a power meter or sending a credit to a vending machine.

For details see [Getting started > Technical concepts > {{< product-c8y-iot >}}'s domain model > Operations](/concepts/domain-model/#operations).
