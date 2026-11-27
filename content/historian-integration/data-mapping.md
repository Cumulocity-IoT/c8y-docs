---
title: Data mapping
weight: 30
layout: bundle
---

{{< product-c8y-iot >}} maps historian data to its [domain model](/concepts/domain-model/) of devices, measurements, events, and alarms. The following table shows how the main historian concepts are represented with each integration method.

| Historian concept | OPC UA device gateway | AVEVA PI connector |
|---|---|---|
| Historian | A server child device of the gateway device. | The thin-edge.io device on which the connector runs. |
| Asset or tag group | A child device of the server, created for each root node that matches a device protocol. | Not mapped. All tags are reported on the thin-edge.io device. |
| Tag value | A measurement series, with the type, series, and unit defined in the device protocol. Alternatively an event, alarm, or custom action. | A measurement series. You can define an optional display name and unit per tag in the datapoints configuration. |
| Collection mode | Subscription, cyclic read, or manual read, as defined in the data reporting of the device protocol. | Polling of the PI Web API at the configured poll interval. |
| Timestamps | Source and server timestamps are kept in the `c8y_ua_DataValue` fragment of events. | The timestamp of the value in the PI Web API response is used as the measurement time. |
| Quality | Values with a `Bad` or `Uncertain` status code raise a WARNING alarm on the server device. The alarm is cleared when the status returns to `Good`. | Not evaluated. Values are sent to {{< product-c8y-iot >}} regardless of their PI quality status. |
