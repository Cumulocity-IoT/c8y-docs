---
title: Digital Twin Manager Data Service service-level agreement
layout: bundle
weight: 23
---

{{< c8y-admon-info >}}
The Digital Twin Manager Data Service is currently in Public Preview. Preview features are not subject to a service-level agreement. The following text is for information purposes only.
{{< /c8y-admon-info >}}

This agreement is made between {{< company-c8y >}} ("Provider") and the Customer ("Customer") who uses the {{< product-c8y-iot >}} Digital Twin Manager Data Service ("Service") for propagating Internet of Things ("IoT") device measurements to assets on Provider's cloud instances ("software-as-a-service", "SaaS").

### Service description

The Service propagates measurements from devices to the assets they are linked to in the Digital Twin Manager asset hierarchy, so that operational data can be consumed in asset context by dashboards, analytics, smart rules, and business applications. The Service performs the following core functions:

* Processes all incoming device measurements of the tenant in real time.
* Resolves the [linked data points](/dtm/asset-hierarchy/#datapoints) configured in the Digital Twin Manager application for the measurement source.
* Creates one asset-side measurement per linked target asset, carrying the value, unit, type, and time of the source measurement under the target fragment and series defined by the linked data point.

The Service is a stateless, best-effort forwarding pipeline. It does not store measurements. The device measurement and the created asset measurement are both stored by the {{< product-c8y-iot >}} platform and are subject to the [Platform service-level agreement](/service-terms/service-level/#platform-sla) and to the retention rules configured by Customer.

### The load model {#dtm-load-model}

The load the Service puts on the platform is not determined by the number of device measurements Customer sends, but by the number of measurements the Service creates from them. This number is called the **upstream measurement rate** and is the single quantity against which the Service is dimensioned and measured:

```
upstream measurements per second
  = device measurements per second
  × average number of linked assets matched per device measurement
```

The multiplier between the two rates is called **fan-out**. Fan-out is entirely determined by Customer configuration and varies by orders of magnitude between tenants or even assets depending on their configured linked data points: a device measurement carrying more series can match more linked data point, and each linked asset adds another created measurement. A device sending 10 measurements per second whose data points are linked to 30 assets produces an upstream measurement rate of 300 per second, not 10.

Because fan-out is Customer-defined, the service-level objectives below apply to the upstream measurement rate, not to the device measurement rate.

### Customer responsibilities

To ensure the successful operation of the Service, you must fulfill the following responsibilities.

#### Load management

You are responsible for the upstream measurement rate your tenant generates, and therefore for all three factors that produce it:

* **Ingestion rate**: The number of measurements your devices send per second.
* **Measurement shape**: The number of fragments and series carried by each measurement. Every series that matches a linked data point contributes to fan-out.
* **Linking configuration**: The number of assets each device data point is linked to. Every additional link on a data point multiplies the load produced by every measurement carrying that data point.

Before creating or changing linked data points, calculate the resulting upstream measurement rate and verify that it stays within the limits stated under [Limitations and constraints](#dtm-limitations-and-constraints). A configuration change that adds links to a high-frequency device can multiply your load without any change in device behavior.

#### Monitoring

You are responsible for monitoring the data flow of the Service and for reacting to the alarms it raises in your tenant, in particular alarms indicating rejected or dropped measurements. Reduce your load, your fan-out, or both, if the Service reports that it cannot keep up. You are equally responsible for reviewing the status the Digital Twin Manager application reports for your data point links, and for resolving links flagged with a warning or an error.

#### Cost and quota implications

Measurements created by the Service are regular platform measurements. They count towards your data storage, your [service quotas](/service-terms/quotas/), and your license metrics in the same way as measurements sent by devices. Customer is responsible for configuring appropriate data retention rules for asset-side measurements.

### Limitations and constraints {#dtm-limitations-and-constraints}

The following limitations and constraints apply to the Service:

* **Best-effort delivery**: The Service is a real-time pipeline with bounded internal buffers. It does not guarantee that every device measurement results in an asset measurement. When the incoming load exceeds the processing or write capacity available to it, the Service applies back pressure and, once its buffers are exhausted, discards asset-side measurements rather than growing without bound. Discarded measurements are counted, and are logged together with the identifiers of the source measurements they were derived from.
* **Overload depends on total load, not only on your own**: On shared cloud instances the Service processes the traffic of multiple tenants within a shared capacity. Whether measurements are discarded depends both on your tenant's upstream measurement rate and on the aggregate rate of all tenants served by the same instance. Capacity is not reserved per tenant.
* **Per tenant traffic limit**: The Service can currently sustain a maximum of 500 upstream measurements per second for a single tenant. Beyond this rate, propagation latency increases and measurements may be discarded.
* **No redelivery from the source**: A device measurement is considered handled as soon as the Service takes it in for processing, not once the corresponding asset measurement has been written. If the Service subsequently discards the measurement or fails to write it, the platform does not offer it to the Service again. Nothing is replayed automatically, and the loss is permanent unless Customer initiates recovery by reprocessing the measurement.
* **Recovery and Reprocessing**: Measurements discarded by the Service can be re-submitted through the reprocessing API of the Service, for as long as the source measurements are retained by the platform. Recovery is a Customer-initiated action; the Service does not replay discarded data automatically.
* **No backfill**: Creating a data point link propagates measurements arriving from that point onwards. Measurements received before the link was created are not propagated retroactively.
* **Linking has no temporal dimension**: A linked data point requires a configured source and describes only the present. It carries no validity period and no record of which source was linked at which time, so changing or removing a link does not alter asset measurements already created under the previous configuration. A newly created or changed link also does not take effect instantly: it may take up to 60 seconds before the first measurement is created on the asset under the new configuration.
* **Links reported as faulty do not propagate**: Only linked data points that the Digital Twin Manager application reports as [healthy](/dtm/asset-hierarchy/#understanding-states) create measurements on the asset. A link shown with a warning or error indicator — for example because no source device has been selected yet, or because the configured source no longer exists in the inventory — is not propagated, and the asset receives no measurements for that data point until the reported problem is resolved. In this case also no error is reported during the propagation of the source measurement; the Service simply does not create an asset measurement for that link.
* **No ordering guarantee**: Measurements are processed concurrently. The order in which asset measurements are created does not necessarily follow the order in which the source measurements were received. Consumers must rely on the measurement time, not on arrival order.
* **Duplicate suppression is best effort**: The underlying notification transport delivers at least once. The Service suppresses duplicates on a best-effort basis and does not guarantee that a device measurement is propagated exactly once.
* **Individual message tracing**: The Service is engineered as a high-throughput streaming pipeline and does not maintain per-message transaction logs or audit trails. {{< company-c8y >}} does not perform ad-hoc tracing or investigations for individual missing or delayed measurements without evidence of a deterministic, reproducible defect.
* **No customization of the propagation**: The Service copies the measurement value to the linked asset as defined by the data point link. Customer cannot supply custom logic to transform, filter, aggregate, enrich, or rate-limit the measurements the Service creates, and cannot change the payload or the timing of the created measurements. Use cases requiring transformation or aggregation must be implemented outside the Service, for example in a Customer microservice or in {{< product-c8y-iot >}} Streaming Analytics.

### Service quality

#### Service-level objectives

The following objectives measure the quality of the Service:

| Service level indicator  | Monthly target                                |
| ------------------------ | --------------------------------------------- |
| Service availability     | As per [Platform service-level agreement](/service-terms/service-level/#service-availability) |
| Propagation latency      | 95 percentile of sustained load ≤ 30 seconds  |
| Propagation completeness | ≥ 99.9% of sustained load                     |

#### Service-level indicator definitions

The service quality indicators are defined as follows:

* **Propagation latency**: The time between the arrival of a device measurement in the {{< product-c8y-iot >}} platform and the availability of the corresponding asset measurement, measured over a calendar month.
* **Propagation completeness**: The share of asset measurements successfully written by the Service, relative to the asset measurements the Customer's linking configuration required it to write, measured over a calendar month.
* **95th percentile**: 95 percent of the measurements are propagated within the service level objective.
* **Upstream measurement rate**: The number of asset measurements the Service creates per second, as defined under [The load model](#dtm-load-model).
* **Sustained load**: The regular and predictable steady-state upstream measurement rate, within the per tenant traffic limit. Sustained load is the 95 percentile of the previous 30 day upstream measurement rate. The objectives above do not apply to load exceeding the per tenant traffic limit, nor to bursts above the sustained load.

#### Support and maintenance

Support and maintenance are provided as outlined in the [Platform service-level agreement](/service-terms/service-level/#support-and-maintenance).
