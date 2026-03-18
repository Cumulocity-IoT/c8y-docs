---
date:
title: MQTT Service will require an explicit role for basic authentication
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
issue: MTM-66199
---

{{< c8y-admon-caution >}}
This change only affects the new {{< product-c8y-iot >}} [MQTT Service](/device-integration/mqtt-service/) capability.

The existing {{< product-c8y-iot >}} [Core MQTT](/device-integration/mqtt/) capability is **not** affected.
{{< /c8y-admon-caution >}}

**Introduction**

To strengthen security and prevent client spoofing, the {{< product-c8y-iot >}} MQTT Service will soon require the **ADMIN** permission for the "Mqtt service" permission type for clients connecting via **basic authentication**.

Currently, basic authentication lacks a strict binding between the authenticated user and the MQTT `clientId`. This could allow a user with valid {{< product-c8y-iot >}} credentials to connect using any `clientId` and impersonate other devices. This change ensures that only explicitly authorized users and devices can use basic authentication to connect to the MQTT Service.

**What is changing?**

* **Required role:** A specific authorization role will be required for any user or device attempting to authenticate to the MQTT Service using basic authentication.
* **No default assignment:** To maintain a strict security posture, this role will **not** be added to any global roles by default.
* **Message broker properties:** The authentication type and username will now be passed as Pulsar message properties (`tx.clientUsername` and `tx.clientAuthType`). This allows downstream consumers to validate the `clientId` against the authenticated username.

Clients connecting via **certificate authentication** are not affected by this change.

**Impact on existing MQTT clients**

This is a **breaking change** for clients utilizing basic authentication.

Once this change is deployed, any existing clients relying on basic authentication without the required explicit role will fail to connect. Administrators will need to manually assign the ADMIN permission for the "Mqtt service" permission type to the specific users or devices that legitimately require basic authentication access.

**Roll-out plan**

This change will take effect when the MQTT Service reaches General Availability (GA). Please update your user or device roles accordingly to ensure uninterrupted service.

{{< c8y-admon-info >}}
Because the {{< product-c8y-iot >}} [MQTT Service](/device-integration/mqtt-service/) is currently in Public Preview, it is not subject to the standard 6-month compatibility notice period defined in the {{< company-c8y >}} [Compatibility policy](/service-terms/compatibility-policy/).
{{< /c8y-admon-info >}}
