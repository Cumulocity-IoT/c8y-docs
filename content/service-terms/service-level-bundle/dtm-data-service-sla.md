---
title: Digital Twin Manager Data Service service-level agreement
layout: bundle
weight: 23
---

This agreement is made between {{< company-c8y >}} ("Provider") and the Customer ("Customer") who uses the {{< product-c8y-iot >}} Digital Twin Manager Data Service ("Service") for propagating Internet of Things ("IoT") device measurements to assets on Provider's cloud instances ("software-as-a-service", "SaaS").

### Service description

The Service propagates measurements from devices to the assets they are linked to in the Digital Twin Manager asset hierarchy. The Service performs the following core functions:

* Processes incoming device measurements of the tenant in real time.
* Resolves the [linked data points](/dtm/asset-hierarchy/#datapoints) configured in the Digital Twin Manager application for the measurement source.
* Creates one asset measurement per linked target asset, carrying the value, unit, type, and time of the source measurement under the target fragment and series defined by the linked data point.

The Service is stateless. Both the device measurement and the created asset measurement are stored by the {{< product-c8y-iot >}} platform and are subject to the [Platform service-level agreement](/service-terms/service-level/#platform-sla) and to the retention rules configured by Customer.

### Load model {#dtm-load-model}

The load the Service puts on the platform is not determined by the number of measurements Customer's devices send, but by the number of asset measurements the Service creates from them. This number is called the **upstream measurement rate**. It is the quantity against which the Service is dimensioned and measured:

```text
upstream measurements per second
  = device measurements per second
  × average number of linked assets per device measurement
```

The multiplier between the two rates is called **fan-out**. Fan-out is the number of asset measurements the Service creates for each device measurement it receives. It depends on the number of series each device measurement carries and on the number of assets each series is linked to. For example, a device sending 10 measurements per second, each linked to 30 assets, produces an upstream measurement rate of 300 per second, not 10.

Because fan-out is defined by Customer's linking configuration, the service-level objectives below apply to the upstream measurement rate, not to the device measurement rate.

### Customer responsibilities

Customer acknowledges the following Customer responsibilities:

* **Load management**: Each incoming measurement series is propagated once for every asset the series is linked to. Customer is responsible for keeping the resulting upstream measurement rate within the limits stated under [Limitations and constraints](#dtm-limitations-and-constraints) whenever Customer adds or changes links.
* **Cost and quota implications**: Asset measurements created by the Service are regular platform measurements. They count towards Customer's data storage, [service quotas](/service-terms/quotas/), and license metrics in the same way as measurements sent by devices. Customer is responsible for configuring appropriate data retention rules for asset measurements.

### Limitations and constraints {#dtm-limitations-and-constraints}

Customer acknowledges the following limitations and constraints in using the Service:

* **Per-tenant traffic limit**: The Service can currently sustain a maximum upstream measurement rate of 500 measurements per second for a single tenant. Beyond this rate, propagation latency increases and asset measurements may be discarded.
* **Delivery under overload**: The Service is a real-time pipeline with bounded internal buffers. If the incoming load exceeds the processing or write capacity available to the Service and back-pressure persists, the Service may discard asset measurements. Discarded measurements are counted and logged together with the metadata required for reprocessing.
* **Shared capacity**: On shared cloud instances, the Service processes the traffic of multiple tenants within a shared capacity. Capacity is not reserved per tenant. Whether asset measurements are discarded depends both on the upstream measurement rate of Customer's tenant and on the aggregate rate of all tenants served by the same instance.
* **Recovery and reprocessing**: Measurements discarded by the Service can be re-submitted through the reprocessing API of the Service, as long as the source measurements are retained by the platform. Recovery is initiated by Customer. The Service does not replay discarded measurements automatically.
* **No backfill**: A linked data point only propagates measurements that arrive after the link has been created and its source has been configured. Measurements received earlier are not propagated retroactively.
* **Link activation delay**: A new or changed link does not take effect instantly. It may take up to 60 seconds until the first asset measurement is created under the new configuration.
* **No link history**: A linked data point describes only the current configuration. It has no validity period and keeps no record of which source was linked at which time. Changing or removing a link does not alter asset measurements already created under the previous configuration.
* **Incomplete or broken links do not propagate**: Only linked data points with the status [Linked](/dtm/asset-hierarchy/#understanding-states) in the Digital Twin Manager application create asset measurements. Links with the status "Incomplete" (for example, no source device selected) or "Source missing" (for example, the source device was deleted from the inventory) are not propagated until the problem is resolved. The Service does not report an error for such links during propagation. It does not create an asset measurement for them.
* **No ordering guarantee**: Measurements are processed concurrently. The order in which asset measurements are created does not necessarily follow the order in which the source measurements were received. Applications consuming asset measurements must rely on the measurement time, not on the order of arrival.
* **At-least-once delivery**: The underlying notification transport delivers messages at least once. The Service does not guarantee that a device measurement is propagated exactly once, so an asset measurement may occasionally be created more than once.
* **Individual message tracing**: The Service is engineered as a high-throughput streaming pipeline and does not maintain per-message transaction logs or audit trails. {{< company-c8y >}} does not perform ad-hoc tracing or investigations for individual missing or delayed measurements without evidence of a deterministic, reproducible defect.

### Service quality

#### Service-level objectives

The following objectives measure the quality of the Service:

| Service-level indicator  | 30-day target                                 |
| ------------------------ | --------------------------------------------- |
| Service availability     | As per [Platform service-level agreement](/service-terms/service-level/#service-availability) |
| Propagation latency      | 95th percentile of sustained load ≤ 30 seconds |
| Propagation durability   | ≥ 99.9% of sustained load                     |

#### Service-level indicator definitions

The service-level indicators are defined as follows:

* **Propagation latency**: The time between the arrival of a device measurement in the {{< product-c8y-iot >}} platform and the availability of the corresponding asset measurement, measured over the previous 30 days.
* **Propagation durability**: The share of asset measurements successfully created by the Service, relative to the asset measurements required by Customer's linking configuration, measured over the previous 30 days.
* **95th percentile**: 95 percent of the asset measurements are propagated within the service-level objective.
* **Upstream measurement rate**: The number of asset measurements the Service creates per second, as defined under [Load model](#dtm-load-model).
* **Sustained load**: The regular and predictable steady-state upstream measurement rate within the per-tenant traffic limit. Sustained load is the 95th percentile of the upstream measurement rate over the previous 30 days.

### Support and maintenance

Support and maintenance are provided as outlined in the [Platform service-level agreement](/service-terms/service-level/#support-and-maintenance).
