---
weight: 42
title: Microservices
layout: redirect
---

The microservice specification allows specifying resources to allocate to default microservices, including the Apama, Smart Rules, OPCUA Management Service, and DataBroker Agent Server microservices.

|<div style="width:150px">Field</div>|Required|<div style="width:115px">Type</div>|Default|Description|
|:---|:---|:---|:---|:---|
|name|Yes|String|| The name of the {{< product-c8y-iot >}} microservice. The allowed values are apama-ctrl, smartrule, opcua-mgmt-service and databroker-agent-server
|resources.limits|No|Structure|Defaults to CPU Limit: 1000m<br>Memory Limit: 1 GB|Specify resource limits for the {{< product-c8y-iot >}} microservice container. For more information, see [Resource limits specification](/edge-kubernetes/edge-custom-resource-definition/#k8-edge-resources-limits-spec).
