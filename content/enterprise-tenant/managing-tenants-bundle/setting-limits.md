---
weight: 30
title: Setting limits
layout: redirect
helpcontent:
  - label: setting-limits
    title: Limits
    content: "This tab allows you to view and edit resource limits for this tenant as well as to configure Gainsight tracking for your individual product experience."
---


The **Limits** tab allows you to view and edit resource limits for the tenant, as well as to assign an "External reference" and to enable/disable the Gainsight product experience tracking.

### To limit subtenant request rate {#to-limit-subtenant-request-rate}

Platform administrators can limit the request rate of each subtenant via the following properties:

* **Limit HTTP queue**: limit of the HTTP request queue for the tenant.
* **Limit HTTP requests**: limit of the HTTP requests for the tenant per second.
* **Limit stream queue**: limit of the MQTT request queue for the tenant.
* **Limit stream requests**: limit of the MQTT requests for the tenant per second.

The request throttling mechanism is only enabled when both HTTP properties (**Limit HTTP queue** and **Limit HTTP requests**) are configured. If one of the values is omitted, the other one is ignored and throttling remains disabled.

{{< c8y-admon-important >}}
Rate limiting can be an effective countermeasure against threats like brute force login attempts, API abuse and request flooding thus reducing the number of malicious/unwanted traffic. This helps in protecting against DoS (Denial of Service) attacks and saving the available bandwidth for legitimate requests.
{{< /c8y-admon-important >}}

You can also customize the buffer size for the CEP queue and the data broker queue for a particular tenant. This can be done from the {{< management-tenant >}}. Contact your Operations team on how to configure this setting according to your needs.

### To limit subtenant device number {#to-limit-subtenant-device-number}

Platform administrators can limit the count of concurrently registered root devices or simply all devices (including child devices) via the property "Limit number of devices".

You can view the peak number of concurrently registered devices, root devices and the peak value of used storage in the [Usage statistics](/enterprise-tenant/usage-and-billing/) page.

### Product experience tracking {#product-experience-tracking}

In the parent tenant, use the checkbox **Enable Gainsight product experience tracking** to enable/disable the product experience tracking through the [Gainsight PX](https://www.gainsight.com/product-experience/) product experience software for the given child tenant.

At the tenant level, you can disable the product experience tracking by Gainsight by turning off the cookie banner on the **Branding** page. For more information, see [Branding](/enterprise-tenant/customization/#branding).

If you activate tracking for the tenant, its users are automatically tracked. However, the nature of this tracking depends on their consent. By accepting tracking, they permit the use of Personally Identifiable Information (PII) for tracking purposes. If they decline, their data is anonymized to ensure privacy, though tracking will still capture usage data without personal identifiers. For more details, see [Accessing and logging into the platform](/get-familiar-with-the-ui/platform-access).
