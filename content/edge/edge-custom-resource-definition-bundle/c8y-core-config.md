---
weight: 35
title: Cumulocity Core
layout: redirect
---

The core specification specifies the fields for configuring the {{< product-c8y-iot >}} core node and its resource limits.

|<div style="width:150px">Field</div>|Required|<div style="width:115px">Type</div>|Default|Description|
|:---|:---|:---|:---|:---|
|resources.limits|Yes|Structure|Defaults to CPU Limit: 3000m<br>Memory Limit: 6GB|Specify resource limits for the {{< product-c8y-iot >}} Core container. For more information, see [Resource limits specification](/edge/edge-custom-resource-definition/#resources-limits-spec).
