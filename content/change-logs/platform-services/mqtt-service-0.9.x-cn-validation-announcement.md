---
date: 2025-12-02
title: MQTT Service will enforce Common Name validation for certificate-authenticated clients
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
issue: MTM-65167
---

{{< c8y-admon-caution >}}
This change only affects the new {{< product-c8y-iot >}} [MQTT Service](/device-integration/mqtt-service/) capability.

The existing {{< product-c8y-iot >}} [Core MQTT](/device-integration/mqtt/) capability is **not** affected.
{{< /c8y-admon-caution >}}

### Introduction

To strengthen identity assurance for certificate-authenticated MQTT clients, the {{< product-c8y-iot >}} [MQTT Service](/device-integration/mqtt-service/) will begin enforcing **Common Name (CN) validation** during client certificate authentication.

Currently, the MQTT Service accepts certificates where the CN does not match the MQTT client ID.  
After this change, the CN must match the client ID used during connection.
This tight binding of certificates to devices will significantly reduce the risk of certificate misuse.

### What is changing?

When an MQTT client connects using certificate-based authentication, **the Common Name (CN) in the certificate must match the MQTT device ID**.

MQTT clients may identify themselves using either of the following client ID formats:
1. `<deviceId>` – standard format
2. `d:<deviceId>` – supported only for legacy SmartREST devices migrating to the MQTT Service. This format must **not** be used for new devices.

However, in **both** cases, the certificate’s CN must be:

* `CN == <deviceId>`

Any certificate whose CN does not equal the device ID will fail authentication.

Only certificate-authenticated clients are affected; all other authentication methods remain unchanged.

### Impact on existing MQTT clients

This is a **breaking change**.  
Devices using certificates whose CN does not match the device ID will fail authentication once enforcement begins.

Customers should verify and update their certificate issuance processes during the grace period.

Please contact [Cumulocity Support](/additional-resources/contacting-support/) if you have any questions or concerns about these changes.

### Roll-out plan

{{< c8y-admon-info >}}
Because the {{< product-c8y-iot >}} [MQTT Service](/device-integration/mqtt-service/) is currently in Public Preview, it is not subject to the standard 6-month compatibility notice period defined in the Cumulocity IoT [Compatibility policy](/service-terms/compatibility-policy/).
{{< /c8y-admon-info >}}

To allow a smooth transition, CN validation will be introduced no sooner than **four weeks after this announcement**.