---
date: 2026-01-16
title: Removal of deprecated features from the MQTT Service
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
issue: MTM-65627
---

{{< c8y-admon-caution >}}
This change only affects the new {{< product-c8y-iot >}} [MQTT Service](/device-integration/mqtt-service/) capability.

The existing {{< product-c8y-iot >}} [Core MQTT](/device-integration/mqtt/) capability is **not** affected.
{{< /c8y-admon-caution >}}

The {{< product-c8y-iot >}} MQTT Service is expected to transition to Generally Available (GA) status by the end of March 2026.
When the service reaches GA status, features that have been deprecated during the Private Preview period will be removed.
These changes were all previously announced; this notice is a reminder to help ensure that devices and applications are ready for the transition to GA status.

{{< c8y-admon-important >}}
**It is essential that all devices and applications using the MQTT Service have been updated to use only Generally Available features before the GA date.**
{{< /c8y-admon-important >}}

##### Which features will be removed?

The following features will not be available after the GA date:

1. **Tenant-level isolation**<br>
   Isolation between MQTT devices will be strictly enforced and direct communication between devices by publishing and subscribing to the same topic will not be possible.
   All communication between MQTT devices must be mediated by a microservice or external application client.
   The `mqtt-service.tenant.isolation` feature toggle will have no effect in the behaviour of the MQTT Service.
   See the [device isolation announcement](/change-logs/#mqtt-service-0.9.6-device-isolation-api-change) for more details.
   <br><br>
2. **Java client SDK**<br>
   The MQTT Service Java Client SDK will not be able to connect to the MQTT Service once it reaches GA status.
   Microservice and external application clients must use the Pulsar client protocol to interact with MQTT Service topics.
   See the [deprecation notice](/change-logs/#mqtt-service-0.9.x-sdk-java-announcement) for more details.
   <br><br>
3. **Non-TLS endpoint**<br>
   Unencrypted device connections to the MQTT Service on TCP port 2883 will not be enabled on any Cumulocity shared public environments.
   Devices must connect to these environments using TLS on TCP port 9883.
   Both one-way (server certificates only) and two-way (client and server certificates) TLS are supported.
   The unencrypted port may be enabled on dedicated environments if required by legacy devices that do not support TLS.
   This restriction is [documented](/device-integration/mqtt-service/#connecting-via-mqtt), although some public environments do currently have the non-TLS port enabled to ease device onboarding during the Private Preview.

In addition, as previously announced, the MQTT Service is already enforcing [Common Name validation](/change-logs/#mqtt-service-0.9.x-cn-validation-announcement) on device certificates.
Devices connecting using an X.509 client certificate where the Common Name does not match the MQTT client identifier will be rejected.

##### What user action is required?

Developers and integrators of MQTT devices, microservices and external application clients must ensure that their devices and clients are using only Generally Available features of the MQTT Service:

* Replace all uses of the Java Client SDK with the Pulsar client protocol.
* Replace all uses of the MQTT protcol in microservices or external application clients with the Pulsar client protocol.
  The MQTT protocol should only be used by devices.
* Migrate all MQTT device connection to use the secure TLS endpoint on TCP port 9883.
* Ensure that the MQTT client identifier matches the certificate Common Name for any devices authenticating using X.509 client certificates.

If you have any questions or concerns, please [contact Cumulocity Support](/additional-resources/contacting-support) as soon as possible.
