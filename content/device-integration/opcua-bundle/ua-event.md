---
weight: 120
title: OPC UA events
layout: redirect
date: '2025-09-01T10:26:32Z'
lastmod: '2025-09-01T10:40:39Z'
---
### Model change events {#model-change-events}

The model change events are created by the OPC UA server to notify about the changes in an address space node on runtime.
The gateway subscribes to the events of type BaseModelChangeEventType on connection to the servers. The subscription to this event can be enabled or disabled for each server
using the `subscribeModelChangeEvent` property during the server configuration. The changes for the events with type GeneralModelChangeEventType and SemanticChangeEventType, which are subtypes
of BaseModelChangeEventType, are handled and address space information is persisted in the {{< product-c8y-iot >}} inventory as well as in the local address space file of the gateway.
