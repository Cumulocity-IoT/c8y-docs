---
title: Digital Twin Manager Data Service service-level agreement
layout: bundle
weight: 23
---

This agreement is made between {{< company-c8y >}} ("Provider") and the Customer ("Customer") who uses the {{< product-c8y-iot >}} Digital Twin Manager Data Service ("Service") for propagating Internet of Things ("IoT") device measurements to assets on Provider's cloud instances ("software-as-a-service", "SaaS").

### Service description

The Service propagates measurements from devices to the assets they are linked to in Digital Twin Manager assets. The Service performs the following core functions:

* Processes incoming device measurements of the tenant in real time.
* Resolves the [linked data points](/dtm/asset-hierarchy/#datapoints) configured in the Digital Twin Manager application for the measurement source.
* Creates one asset measurement per linked target asset. The asset measurement carries the type and time of the source measurement and, for each matching linked data point on the asset, the value and unit of the linked series under the target fragment and series defined by the linked data point.

Both the device measurement and the created asset measurement are stored by the {{< product-c8y-iot >}} platform and are subject to the [Platform service-level agreement](/service-terms/service-level/#platform-sla) and to the retention rules configured by Customer.

### Fan-out {#dtm-fan-out}

A linked data point on a Digital Twin Manager asset is always linked to one series of a measurement of a source device. As measurements can carry multiple series, a single device measurement and each of its series can match linked data points on several assets. For each device measurement it receives, the Service creates one asset measurement for every asset with at least one matching linked data point. Linked data points on the same asset are combined into one asset measurement.

The number of asset measurements created for one device measurement is called **fan-out**. Fan-out is not a fixed value per device. The Service resolves it at runtime for each device measurement, based on which series the measurement carries and on how many assets these series are linked to. Measurements of the same device can therefore have different fan-outs. Fan-out is capped by the fan-out limit stated under [Limitations and constraints](#dtm-limitations-and-constraints). If a device measurement exceeds the limit, the Service creates asset measurements up to the limit and discards the rest.

The number of asset measurements the Service has to create per second, within the fan-out limit, is called the **upstream measurement rate**. It is the device measurement rate multiplied by the average fan-out. For example, a device sends 10 measurements per second. Each measurement carries a temperature series linked to 3 assets and a pressure series linked to 2 other assets. The fan-out is 5, and the upstream measurement rate is 50 asset measurements per second. If the pressure series were linked to 2 of the same assets as the temperature series instead, the fan-out would be 3.

Asset measurements are regular platform measurements and add to the load on the platform. The service-level objectives below therefore apply to the upstream measurement rate, not to the device measurement rate.

When asset measurements are discarded by the fan-out limit, the Service raises a `c8y_DtmMeasurementFanOutLimitExceeded` alarm with severity MINOR on the source device. The alarm names the device measurement, its type and series, the number of asset measurements it would have created, and the limit. Customer must check for these alarms to find device measurements whose fan-out exceeds the limit. The Service raises the alarm at most once per minute and names only one device measurement each time. Other devices that exceed the limit within the same minute do not receive an alarm for it. The Service does not clear the alarm. If Customer clears it while device measurements are still limited, the Service raises it again.

### Customer responsibilities

Customer acknowledges the following Customer responsibilities:

* **Fan-out**: [Fan-out](#dtm-fan-out) is defined by Customer's linking configuration. Whenever Customer adds or changes linked data points, Customer is responsible for keeping the fan-out of each device measurement within the fan-out limit and the resulting upstream measurement rate within the per-tenant traffic limit, as stated under [Limitations and constraints](#dtm-limitations-and-constraints). If a higher fan-out is required, Customer requests a higher fan-out limit by submitting a support ticket to Provider's [Support Portal](/additional-resources/contacting-support/).
* **Cost and quota implications**: Asset measurements created by the Service are regular platform measurements. They count towards Customer's data storage, [service quotas](/service-terms/quotas/), and license metrics in the same way as measurements sent by devices. Customer is responsible for monitoring the number of measurements created in Customer's tenant through the tenant usage statistics, and for adjusting the linking configuration as needed. Customer is also responsible for configuring appropriate data retention rules for asset measurements.

### Limitations and constraints {#dtm-limitations-and-constraints}

Customer acknowledges the following limitations and constraints in using the Service:

* **Per-tenant traffic limit**: The Service can currently sustain an upstream measurement rate of 500 measurements per second for a single tenant. Beyond this rate, propagation latency increases and asset measurements may be discarded.
* **Fan-out limit**: The default fan-out limit is 5 asset measurements per device measurement. Upon a support ticket from Customer, Provider can configure a different limit for Customer's tenant. Customer cannot change the limit. Asset measurements beyond the limit are discarded, as described under [Fan-out](#dtm-fan-out).
* **Delivery under overload**: If the upstream measurement rate exceeds the capacity available to the Service, propagation latency increases. If the overload persists, the Service may discard asset measurements. Device measurements are not affected and remain stored by the platform.
* **Recovery**: Provider can re-submit asset measurements discarded under overload, as long as the source device measurements are retained by the platform. The Service does not re-submit discarded asset measurements automatically.
* **No backfill**: A linked data point only propagates measurements that arrive after the link has been created and its source has been configured. Measurements received earlier are not propagated retroactively.
* **Link activation delay**: A new or changed link does not take effect instantly. It may take up to 60 seconds until the first asset measurement is created under the new configuration.
* **Incomplete or broken links do not propagate**: Only linked data points with the status ["Linked"](/dtm/asset-hierarchy/#understanding-states) in the Digital Twin Manager application create asset measurements. Links with the status "Incomplete" (for example, no source device selected) or "Source missing" (for example, the source device was deleted from the inventory) are not propagated until the problem is resolved. The Service does not report an error for such links during propagation. It does not create an asset measurement for them.
* **At-least-once delivery**: The underlying notification transport delivers messages at least once. The Service does not guarantee that a device measurement is propagated exactly once, so an asset measurement may occasionally be created more than once.
* **Individual message tracing**: The Service is engineered as a high-throughput streaming pipeline and does not maintain per-message transaction logs or audit trails. Provider does not perform ad-hoc tracing or investigations for individual missing or delayed measurements without evidence of a deterministic, reproducible defect.

### Service quality

#### Service-level objectives

The following objectives measure the quality of the Service:

| Service-level indicator  | 30-day target                                 |
| ------------------------ | --------------------------------------------- |
| Service availability     | As per [Platform service-level agreement](/service-terms/service-level/#service-availability) |
| Propagation latency      | 95th percentile ≤ 30 seconds under sustained load |
| Propagation durability   | ≥ 99.99% under sustained load                     |

#### Service-level indicator definitions

The service-level indicators are defined as follows:

* **Propagation latency**: The time between the arrival of a device measurement in the {{< product-c8y-iot >}} platform and the availability of the corresponding asset measurement, measured over the previous 30 days.
* **Propagation durability**: The share of asset measurements successfully created by the Service, relative to the asset measurements required by Customer's linking configuration within the fan-out limit, measured over the previous 30 days. Asset measurements discarded by the fan-out limit do not count against propagation durability.
* **95th percentile**: 95 percent of the asset measurements are propagated within the service-level objective.
* **Upstream measurement rate**: The number of asset measurements per second required by Customer's linking configuration within the fan-out limit, as defined under [Fan-out](#dtm-fan-out). Asset measurements discarded under overload count towards the upstream measurement rate.
* **Sustained load**: The regular and predictable steady-state upstream measurement rate within the per-tenant traffic limit. Sustained load is the 95th percentile of the upstream measurement rate over the previous 30 days.

### Support and maintenance

Support and maintenance are provided as outlined in the [Platform service-level agreement](/service-terms/service-level/#support-and-maintenance).
