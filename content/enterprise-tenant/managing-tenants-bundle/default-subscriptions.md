---
weight: 50
title: Default subscriptions
layout: redirect
---

In the {{< product-c8y-iot >}} platform, you can configure which applications and microservices are subscribed to a tenant on tenant creation. When you create a new tenant, the specified applications and microservices automatically get subscribed to it.

In addition, you can specify which applications and microservices are subscribed to a tenant when the system is upgraded. This list might differ from the default subscriptions on tenant creation. For example, certain default applications might have been unsubscribed from a tenant after creation and you may not want these applications to be subscribed to it again or you may want to subscribe different ones to it.

### To view default subscriptions {#to-view-default-subscriptions}

In the **Default subscriptions** page, you can configure two separate lists of applications. These will be subscribed by default to:

- Every new tenant on its creation.
- Every existing tenant on platform upgrade.

{{< c8y-admon-info >}}
These default lists can be overridden for particular subtenants by setting additional tenant options, for example via tenant policy. For details, see [Overriding default subscriptions](#to-override-default-subscriptions) or the [Tenant API](https://{{< domain-c8y >}}/api/core/#tag/Tenant-API) in the {{< openapi >}}.
{{< /c8y-admon-info >}}

{{< c8y-admon-info >}}
Listing an application or microservice here only takes effect for a tenant if it is owned or shared as a MARKET application by that tenant's parent, or by the {{< management-tenant >}} if the tenant has no parent. The tenant's own ownership of, or a subscription it once had to, an application is not taken into account for this - only its parent's is.
{{< /c8y-admon-info >}}

On the left, the list of subscribable applications (both web applications and microservices) is displayed, which consists of:

- All own applications.
- All subscribed applications which have different names than the own applications.

{{< c8y-admon-info >}}
In order to help you to distinguish which application is owned and which is subscribed, the tenant ID of the owner is displayed.
{{< /c8y-admon-info >}}

On the right, you see the **Subscribed on tenant creation** and the **Subscribed on platform upgrade** columns.

Initially, the lists show the default subscriptions inherited from the tenant hierarchy.

<img src="/images/users-guide/Administration/admin-default-subscriptions-inherited.png" alt="Default subscriptions - inherited from tenant hierarchy">

### To configure default subscriptions {#to-configure-default-subscriptions}

You can override both lists by switching the corresponding toggle. This will reveal all subscribable applications (initially, unselected ones are hidden) but the selection will remain the same.

Next, adjust the lists to your needs by selecting additional applications to be subscribed by default or deselect applications you do not want to be subscribed.

You may also deselect all of them if you don't want any subscriptions to be executed on tenant creation and/or platform upgrade.

<img src="/images/users-guide/Administration/admin-default-subscriptions-overridden.png" alt="Default subscriptions - overriding settings from tenant hierarchy">
<br>

If you want to return to the settings inherited from the tenant hierarchy, just switch the corresponding toggle again.

Save the settings by clicking **Save** at the bottom of the page.

{{< c8y-admon-info >}}
Obsolete entries not matching any existing applications are removed on save. If an application selected in one of the lists has been removed, it will be silently ignored during tenant creation and/or platform upgrade. If another application with the same name is created afterwards (but before the settings on this page are saved again, which will remove the obsolete entry), the new application will be subscribed instead of the previous one.
{{< /c8y-admon-info >}}


### To override default subscriptions {#to-override-default-subscriptions}

The default subscriptions can be overridden for subtenants by setting up a tenant policy with the following options:

* To define default web applications subscribed to new tenants on creation:
  * category: configuration
  * key: default.tenant.applications
  * value: comma-separated list of application names, for example, administration,devicemanagement,cockpit,feature-microservice-hosting,feature-cep-custom-rules
* To define default microservices subscribed to new tenants on creation:
  * category: configuration
  * key: default.tenant.microservices
  * value: comma-separated list of microservice names, for example, device-simulator,report-agent,sms-gateway
* To use a different list of web applications to be subscribed to existing tenants on platform upgrade:
  * category: configuration
  * key: on-update.tenant.applications.enabled
  * value: true/false (when false or not set, the same list from default.tenant.applications will be used)
* To define default web applications subscribed to existing tenants on platform upgrade:
  * category: configuration
  * key: on-update.tenant.applications
  * value: comma-separated list of application names, for example, administration,devicemanagement,cockpit,feature-microservice-hosting,feature-cep-custom-rules
* To use a different list of microservices to be subscribed to existing tenants on platform upgrade:
  * category: configuration
  * key: on-update.tenant.microservices.enabled
  * value: true/false (when false or not set, the same list from default.tenant.microservices will be used)
* To define default microservices subscribed to existing tenants on platform upgrade:
  * category: configuration
  * key: on-update.tenant.microservices
  * value: comma-separated list of microservice names, for example, device-simulator,report-agent,sms-gateway
