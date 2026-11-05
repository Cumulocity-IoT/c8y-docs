---
weight: 40
title: Troubleshooting
layout: redirect
---

### Troubleshooting measurement propagation {#troubleshooting-measurement-propagation}

1. **No measurements are propagated to the asset**
   - Check the status of the linked data point. Only linked data points with the status **Linked** propagate measurements, see [Understanding states](/dtm/asset-hierarchy/#understanding-states) and [Source warnings and errors](/dtm/asset-hierarchy/#source-warnings-and-errors).
   - Check that the DTM Data Service is enabled for your tenant. Click **Manage DTM Data Service** in the **Data points** tab, or use `GET /service/dtmdata/enabled`. The response contains `measurements.enabled` and `measurements.mode`. If the DTM Data Service is disabled, enable it, see [To manage the DTM Data Service](#enable-measurement-propagation).
   - A value in the **Latest value** column does not mean that measurements are propagated, see [Understanding the columns](/dtm/asset-hierarchy/#understanding-the-columns-in-the-datapoints-list).
   - Check that the source of the linked data point is a device. Measurements with an asset as source are not propagated.
   - Check that the source device sends measurements with exactly the fragment and series configured as source of the linked data point, including upper and lower case. This applies in particular to custom data points.
   - Check that the measurements were received after the data point was linked or its source was changed, and allow up to about a minute for a new or changed link to become active. See [Limitations and constraints](/service-terms/service-level/#dtm-limitations-and-constraints) in the service-level agreement for measurement propagation.
2. **Measurements are propagated to some of the linked assets only**
   - Check the source device for an alarm of type `c8y_DtmMeasurementFanOutLimitExceeded`. If the alarm exists, the device measurement is linked to more assets than allowed, see [Fan-out limit](#fan-out-limit).
3. **The status of a linked data point is empty**
   - The DTM Data Service did not create the latest measurement of the asset, see [Understanding states](/dtm/asset-hierarchy/#understanding-states). Propagated measurements contain the fragment `c8y_dtm_data_service`.
4. **Propagated measurements are not shown for the expected time range**
   - Propagated asset measurements have the time of the device measurement. If a device sends measurements with a time in the past, for example after reconnecting or because of a wrong device clock, the asset measurements are shown at that time as well. Check the time of the measurements of the source device.
