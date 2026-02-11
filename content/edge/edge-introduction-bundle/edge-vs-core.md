---
weight: 30
title: Cumulocity Edge versus other Cumulocity deployments
layout: bundle
sector:
  - edge
---

Edge uses the same software as {{< product-c8y-iot >}} platform.

However, while the base software is the same, there are differences regarding the activated optional features and pre-installed agents.

The following differences apply:

|<div style="width:250px">Area</div>|Edge|{{< product-c8y-iot >}} platform
|:---|:---|:--
|Multi-tenancy|No; single tenant|Yes
|Cluster|No; single server|Yes
|High availability|HA capabilities depend on the underlying virtualization technology, server failure could lead to temporary downtime|Full HA: No downtime on server failure, optionally even for data center failure
|Vertical scalability|Yes, limited to appr. 100 tps per CPU core|Yes, but not used
|Horizontal scalability|No|Yes, nearly unlimited scalability
|Upgrades with no downtime|No|Yes
|Root access|Yes|Yes, if customer is hosting
|Installation|Online and Offline|Online
|Messaging Service|Included|Included
|MQTT Service|Included|Included
|Streaming Analytics|Included|Optional
|Microservice-based data broker|Included|Optional
|Microservice Hosting|Included|Optional
|OPC UA|Included|Optional
|Cloud Field Bus|Included|Optional
|Data Hub|No|Optional