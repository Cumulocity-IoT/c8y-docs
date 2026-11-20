---
weight: 30
title: B
layout: bundle
sector:
  - getting_started
build:
  render: false

---

### Block (Analytics Builder) {#block}

Blocks are the basic processing units of an Analytics Builder [model](#model). Each block implements some predefined functionality, such as receiving data from a sensor, performing a calculation, detecting a condition, or generating an output signal, and processes data accordingly. Each block has a number of inputs, outputs and configurable parameters. [Analytics Builder](#analytics-builder) comes with a set of prebuilt blocks.

{{< c8y-details title="Developer details" >}}
You can use the [Analytics Builder Block SDK](https://github.com/Cumulocity-IoT/apama-analytics-builder-block-sdk) to write, test, and package custom blocks and to upload these blocks into Analytics Builder.
{{< /c8y-details >}}



### Branding {#branding}

Branding is a feature, typically available in [Enterprise tenants](#enterprise-tenant) or the relevant add-ons, that enables organizations to customize the platform's user interface to align with their corporate identity. This includes modifying logos, colors, fonts, and the application's domain name to provide a consistent, customized user experience.

{{< c8y-details title="Developer details" >}}
Branding settings are managed in a file called *options.json* in the branding application. This file contains a JSON object with keys for colors, logos, fonts, and other UI elements which can be configured by administrators.
{{< /c8y-details >}}  


### Bulk device registration {#bulk-device-registration}

Bulk device registration is a method for registering larger quantities of [devices](#device) into the {{< product-c8y-iot >}} platform by uploading a CSV file containing device details, rather than registering each device individually.  

### Bulk state change {#bulk-state-change}

A bulk state change activates or deactivates all [rule instances](#rule-instance) of a [rule template](#rule-template) in one operation, instead of one rule instance at a time. If some rule instances cannot be changed, the result identifies these rule instances so that you can retry them.

See also [Activating or deactivating all rules of a rule template](/streaming-analytics/smart-rules-plugin/#activating-or-deactivating-all-rules-of-a-rule-template) in the documentation.
