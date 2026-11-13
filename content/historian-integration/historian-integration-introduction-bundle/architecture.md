---
title: Architecture
weight: 10
layout: redirect
---

Both integration methods connect to {{< product-c8y-iot >}} through thin-edge.io. The OPC UA device gateway and the AVEVA PI connector run as containers managed by thin-edge.io, which sends the data to {{< product-c8y-iot >}} as devices, measurements, events, and alarms.

![Historian integration architecture: both integration methods reach Cumulocity through thin-edge.io](/images/historian-integration/historian-integration-architecture.png)

{{< c8y-admon-info >}}
Both integration methods run in your environment, next to the historian. Only outbound connections from your network to the {{< product-c8y-iot >}} platform are required.
{{< /c8y-admon-info >}}
