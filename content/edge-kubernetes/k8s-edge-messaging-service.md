---
weight: 70
title: Messaging Service
layout: bundle
sector:
  - edge_server
---
The {{< product-c8y-iot >}} Messaging Service is an optional component of the {{< product-c8y-iot >}} platform, required for enabling the [microservice-based data broker](/data-broker/ms-data-broker) and [Notifications 2.0](https://{{< domain-c8y >}}/api/core/#tag/About-notifications-2.0). If you installed Edge using the c8yedge tool, you can enable Messaging Service using the `c8yedge config --set messagingService.enabled=true` command. Alternatively, you can enable it by updating the `spec.messagingService` field in the Edge custom resource (CR). For more details on the `spec.messagingService` field, refer to [Edge custom resource - Messaging Service](/edge-kubernetes/edge-custom-resource-definition/#messagingService).

For additional guidance, see the [Installing Edge](/edge-kubernetes/installing-edge-on-k8/) and [Modifying Edge](/edge-kubernetes/manage-edge/#modify-edge).
