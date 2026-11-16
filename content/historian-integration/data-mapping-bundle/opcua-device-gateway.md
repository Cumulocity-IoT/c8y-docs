---
title: OPC UA device gateway
weight: 10
layout: redirect
---

With the OPC UA device gateway, the structure of the historian's address space determines the device structure in {{< product-c8y-iot >}}. The browse paths of a device protocol are relative to a starting node. If no constraints are set, the gateway applies the protocol to every node, at any depth of the tree, whose subtree contains the configured browse paths. For each matching node, the gateway creates a child device of the server device and reports the mapped variables on it.

To reproduce an asset hierarchy of the historian, for example one device per pump or production line, choose root nodes that correspond to the assets. Use the constraints of the device protocol to limit it to specific servers or root node IDs. For details, see [Applying constraints](/device-integration/opcua/#applying-constraints).

The gateway converts numeric values outside the range of a Java long to double values in scientific notation. This can result in a less precise, rounded value.
