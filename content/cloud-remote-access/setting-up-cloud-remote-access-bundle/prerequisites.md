---
title: Prerequisites
weight: 10
layout: bundle
---

{{< c8y-admon-req >}}
To use Cloud Remote Access, you need

* a Cloud Remote Access compatible gateway connected to your {{< product-c8y-iot >}} account.
* "Remote access" permission granted to the tenant user.
* the Cloud Remote Access microservice included into your subscription plan.
{{< /c8y-admon-req >}}

### Set up your device
To configure your device for compatibility with the Cloud Remote Access functionality, your device must be running a local device gateway that connects to the corresponding CRA backend services of {{< product-c8y-iot >}}. We strongly recommend to use [thin-edge.io](https://thin-edge.io). It is fully integrated with Cloud Remote Access and can be easily deployed on any Linux-based device, eliminating the need for any custom integration.
Furthermore, devices can report their supported protocols using [SmartREST template 150](/smartrest/mqtt-static-templates/#150) which offers two significant advantages:

1. It prevents the display of unsupported protocols in the selection modal, streamlining the user experience and reducing potential confusion.
2. It enables administrators to restrict the use of potentially vulnerable protocols, such as Telnet, thereby enhancing the overall security of your deployment.

### User Authorization


The Cloud Remote Access feature is a powerful tool that requires careful management. Due to its potential for significant system impact, access should be restricted to experienced administrators 
who fully understand its capabilities and risks.

To grant access to qualified users:

1. Navigate to **Accounts** > **Roles** in the Administration application.
2. Click **Add global role** at the top right.
3. Create a new role with the following details:
    * **Name:** "Cloud Remote Access Role"
    * **Permissions:** Enable "Admin" permission for "Remote Access"




