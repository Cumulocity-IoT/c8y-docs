---
weight: 130
title: Measurements
layout: bundle
sector: 
  - device_management
---

The **Measurements** tab creates a single graph per measurement fragment sent by the device. This means all included series will be shown together in one graph. Therefore, any device integrations must be made considering this grouping. Its visibility is controlled by the device's supported measurements. {{< product-c8y-iot >}} automatically and dynamically populates the device's supported measurements based on previously sent measurements. This means the measurements tab effectively appears after the device has sent its first measurement.

**SmartREST example**

There are several static templates available to create measurements in the 2xx range of message IDs. We provide the 200 static template to create a measurement with a dynamic fragment and series:

`200,c8y_Temperature,T,25`

While using this template is possible for many use cases, we recommend you to create a custom template for all use cases where dynamically defining fragment and series are not required.
