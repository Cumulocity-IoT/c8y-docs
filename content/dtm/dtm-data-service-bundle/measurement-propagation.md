---
weight: 20
title: Measurement propagation
layout: redirect
---

### How measurements are propagated

*Measurement propagation* means that for each new measurement of a source device, a measurement is created on every asset with a data point linked to it. The new measurement has the asset as source. The device measurement itself is not changed.

The DTM Data Service propagates measurements only while it is enabled for your tenant, see [To manage the DTM Data Service](#enable-measurement-propagation).

For each incoming device measurement, one measurement is created for each linked asset:

- The source of the measurement is the asset.
- Time and type of the measurement are taken from the device measurement.
- The measurement contains the fragment `c8y_dtm_data_service`. The fragment identifies the measurement as propagated by the DTM Data Service.
- Each linked series is created with the fragment and series of the linked data point on the asset, and with the value and unit of the device measurement. If several data points of the same asset are linked to the same device measurement, they are combined into one asset measurement.
- Fragments and series of the device measurement which are not linked are not included in the asset measurement.

Device measurements are matched to linked data points by fragment and series only. The measurement type configured for a linked data point does not affect propagation.

Propagated asset measurements are regular measurements in {{< product-c8y-iot >}}. For details on load, limits, delivery and cost implications, see the [DTM Data Service Service-Level Agreement](/service-terms/service-level/#dtm-data-service-sla).

### Fan-out limit {#fan-out-limit}

The number of assets a single device measurement is propagated to is limited. If the limit is exceeded, measurements for further linked assets are not created and an alarm of type `c8y_DtmMeasurementFanOutLimitExceeded` is raised on the source device. For the default limit and how to request a different limit, see [Fan-out](/service-terms/service-level/#dtm-fan-out) in the DTM Data Service Service-Level Agreement.
