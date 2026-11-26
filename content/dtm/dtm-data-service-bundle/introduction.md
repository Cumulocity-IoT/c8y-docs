---
weight: 10
title: Introduction
layout: redirect
helpContent:
- label: dtm-data-service
  title: DTM Data Service
  content: "The DTM Data Service propagates new measurements of a source device to the assets that have a data point linked to that device. It creates the measurements on the linked assets, so you have the measurements of your devices directly on the asset, for dashboards, analytics, and other applications.


  The service creates measurements on the linked assets only while it is enabled for your tenant. Use **Manage DTM Data Service** in the **Data points** tab of an asset to see whether the service is enabled, and to enable or disable it."
---

The *DTM Data Service* is the {{< product-c8y-iot >}} service that [propagates measurements](#measurement-propagation) from devices to assets in the Digital Twin Manager (DTM) application. For each new measurement of a device, it creates a measurement on every asset with a matching [linked data point](/dtm/asset-hierarchy/#datapoints), so you can use the data of an asset in dashboards, analytics, and other applications.

### How it works {#how-it-works}

1. You link a data point of an asset to a measurement series of a source device, see [To create linked data points](/dtm/asset-hierarchy/#to-create-linked-datapoints).
2. The device sends a measurement with the linked fragment and series.
3. If the DTM Data Service is enabled for your tenant, it creates a measurement on the asset with the value and unit of the device measurement.

For details, see [Measurement propagation](#measurement-propagation).

### Enabling and disabling the service {#enabling-the-service}

The DTM Data Service is enabled for your tenant when you link the first data point to a source device. For details and for disabling the service, see [To manage the DTM Data Service](#enable-measurement-propagation).

{{< c8y-admon-req >}}
* The DTM Data Service is subscribed to your tenant by default. If it is not, ask your platform operator.
* The Data Points extension package must be installed to manage linked data points in the DTM application, see [Data points](/dtm/asset-hierarchy/#datapoints).
{{< /c8y-admon-req >}}

{{< c8y-admon-related >}}
* [Data points](/dtm/asset-hierarchy/#datapoints) for creating and managing linked data points
* [Service-level agreement for measurement propagation](/service-terms/service-level/#dtm-data-service-sla) for load, limits, delivery, and cost implications
{{< /c8y-admon-related >}}
