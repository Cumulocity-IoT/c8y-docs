---
title: OPC UA device gateway
weight: 10
layout: redirect
---

With the OPC UA device gateway, the structure of the historian's address space determines the device structure in {{< product-c8y-iot >}}. The gateway applies a device protocol to every root node in the address space that contains the configured browse paths. For each of these root nodes, the gateway creates a child device of the server device and reports the mapped variables of the root node on this child device.

To reproduce an asset hierarchy of the historian, for example one device per pump or production line, choose root nodes that correspond to the assets. Use the constraints of the device protocol to limit it to specific servers or root node IDs. For details, see [Applying constraints](/device-integration/opcua/#applying-constraints).

The gateway converts numeric values outside the range of a Java long to double values in scientific notation. This can result in a less precise, rounded value.
