---
date: 2026-04-07
title: >-
  MQTT Service is now generally available
change_type:
  - value: change-inv-3bw8e
    label: Announcement
product_area: Platform services
component:
  - value: component-LcWEQW5gs
    label: MQTT
build_artifact:
  - value: tc-hc5Tfixeqqei
    label: mqtt-service
ticket: MTM-64362
version: 1.1.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---

{{< company-c8y >}} is pleased to announce that the {{< product-c8y-iot >}} MQTT Service is now generally available.

The MQTT Service provides a single, unified endpoint for integrating MQTT devices with the {{< product-c8y-iot >}} platform that is _simple, secure and scalable._

##### Simple

* Connect any MQTT device with any payload and topic structure, using the MQTT v3.1.1 or v5.0 protocols.
* Devices using the {{< product-c8y-iot >}} core MQTT protocols, SmartREST and JSON-over-MQTT, are supported alongside generic devices with their own application-layer protocols.

##### Secure

* Full device isolation and bi-directional TLS support by default.
* Works with the {{< product-c8y-iot >}} Certificate Authority, or with your existing external CA.

##### Scalable

* Optimised for high message throughput with large numbers of connected devices.
* Validated with 100 million connected devices publishing 1 million unique messages per second.

See the [user documentation](/device-integration/mqtt-service) for more details of the MQTT Service architecture and how to integrate your devices and applications with it.

##### Availability

The MQTT Service is available to all tenants in {{< product-c8y-iot >}} environments following the Continuous Delivery (CD) release line, and in the 2026 annual release.

Usage of the service is billable, as described in the [license metrics](/service-terms/license-metrics) documentation.

Per-tenant usage quotas are enforced to ensure reliable operation of {{< product-c8y-iot >}}'s shared environments.
These quotas can be adjusted to support larger use cases in shared and dedicated environments.
See [service quotas](/service-terms/quotas/#mqtt-service) for details of the applicable quotas.

##### Migrating from the public preview

Some features were deprecated and replaced during the public preview of the MQTT Service.
These features are no longer available after the transition to general availability.
Users migrating from the public preview must ensure that all their applications and devices have been updated to use only generally available features.
For details, see the previous [announcement](/change-logs/#mqtt-service-1.1.0-breaking-changes-announcement) that lists the features to be removed.

##### Limitations

The first generally available release of the MQTT Service has some limitations that will be addressed in future updates.
* Support for Core MQTT devices using SmartREST or JSON-over-MQTT is still in **public preview** status and subject to breaking changes before it becomes generally available.
  <br>See [Core MQTT device support](/device-integration/mqtt-service/#core-mqtt-support) for details of these limitations:
  * Structured [client identifiers](/device-integration/mqtt/#mqtt-client-id) allowed by the {{< product-c8y-iot >}} core MQTT endpoint are not supported.
  * Pending operations must be explicitly requested by a device when it connects.
  * Messages may be acknowledged by the MQTT Service before they have been processed by the {{< product-c8y-iot >}} core.
  * Devices are not automatically disconnected after sending invalid Core MQTT messages.
  * Availability monitoring is not supported for "push connection" traffic to devices.
  * The "delivery" fragment on an operation is not updated after the operation is delivered to the device.
* Last Will messages are not sent when devices disconnect.
* Messages using the Correlation Data field are not forwarded to the Messaging Service.
