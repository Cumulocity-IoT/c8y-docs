---
date: 2025-09-26
title: Deprecation of MQTT Service Java client SDK
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
issue: MTM-64358
---

{{< c8y-admon-caution >}}
This change only affects the new {{< product-c8y-iot >}} [MQTT Service](/device-integration/mqtt-service/) capability.

The existing {{< product-c8y-iot >}} [Core MQTT](/device-integration/mqtt/) capability is **not** affected.
{{< /c8y-admon-caution >}}

**What changes?**

The {{< product-c8y-iot >}} **MQTT Service Java client SDK is deprecated**. It is being replaced by direct connections to the {{< product-c8y-iot >}} Messaging Service using the [Apache Pulsar](https://pulsar.apache.org/) client protocol.

**How does this change impact you?**

Developers of microservices and external applications currently using the MQTT Service Java client SDK should **prepare to** migrate their clients to use direct connections to the {{< product-c8y-iot >}} Messaging Service. The new connection method will be made available **very soon** as part of the MQTT Service Public Preview and will be announced separately.

**Backwards compatibility**

The MQTT Service Java client SDK is deprecated effective immediately but will continue to work and be supported until the MQTT Service reaches General Availability (GA). **Once the new method is available,** it can be used in parallel with direct connections to the {{< product-c8y-iot >}} Messaging Service during the transition period. The SDK will be completely removed and will no longer be supported once the MQTT Service reaches GA. We recommend migrating to the new approach as soon as it becomes available.