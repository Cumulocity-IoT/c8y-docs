---
weight: 10
title: Introduction
layout: redirect
helpContent:
- label: dtm-data-service
  title: DTM Data Service
  content: "The DTM Data Service copies new measurements of a source device to the assets that have a data point linked to that device. This gives you the measurements of your devices directly on the asset, for dashboards, analytics, and other applications.


  The service propagates measurements only while it is enabled for your tenant. Use **Manage DTM Data Service** in the **Data points** tab of an asset to see whether the service is enabled, and to enable or disable it."
---

The *DTM Data Service* is the {{< product-c8y-iot >}} service that propagates measurements from devices to assets in the Digital Twin Manager (DTM) application.

### What the DTM Data Service is used for {#what-it-is-used-for}

In an asset hierarchy, devices send measurements, but the assets that represent machines, rooms, or buildings do not. To view the data of an asset, you would need to look at each device that belongs to it.

With [linked data points](/dtm/asset-hierarchy/#datapoints), you define which measurement series of a device belong to an asset. The DTM Data Service then copies each new measurement of that series from the device to the asset. As a result, you can:

- View the data of an asset in one place, even if several devices deliver it.
- Use the measurements of an asset in dashboards, analytics, and other applications in the same way as measurements of any other managed object.
- Keep the device measurements unchanged, because the service creates new measurements on the asset and does not modify the device measurements.

### How it works {#how-it-works}

1. You link a data point of an asset to a measurement series of a source device, see [To create linked data points](/dtm/asset-hierarchy/#to-create-linked-datapoints).
2. The device sends a measurement with the linked fragment and series.
3. If the DTM Data Service is enabled for your tenant, it creates a measurement on the asset with the value and unit of the device measurement.

For details, see [Measurement propagation](#measurement-propagation).

### Enabling and disabling the service {#enabling-the-service}

The DTM Data Service is enabled for your tenant when you link the first data point to a source device. For details and for disabling the service, see [To manage the DTM Data Service](#enable-measurement-propagation).

{{< c8y-admon-req >}}
* Your tenant must be subscribed to the DTM Data Service, in addition to the Digital Twin Manager application, the Dtm-plugins extension, and the Dtm microservice.
* The Data Points extension package must be installed to manage linked data points in the DTM application, see [Data points](/dtm/asset-hierarchy/#datapoints).
{{< /c8y-admon-req >}}

{{< c8y-admon-related >}}
* [Data points](/dtm/asset-hierarchy/#datapoints) for creating and managing linked data points
* [Service-level agreement for measurement propagation](/service-terms/service-level/#dtm-data-service-sla) for load, limits, delivery, and cost implications
{{< /c8y-admon-related >}}
