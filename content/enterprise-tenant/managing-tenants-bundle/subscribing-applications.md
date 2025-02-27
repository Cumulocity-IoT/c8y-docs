---
weight: 20
title: Subscribing applications
layout: redirect
---


### Overview

{{< product-c8y-iot >}} features an application marketplace that allows tenants to access and manage various applications.

{{< management-tenant >}}s and {{< enterprise-tenant >}}s can control application access for their subtenants. Through the Administration application, you can:

- View and manage existing application subscriptions 
- [Subscribe subtenants to applications](#to-subscribe-an-application)
{{< c8y-admon-info >}}
Tenants can also create and deploy their own [Custom applications](/standard-tenant/ecosystem/#custom-applications), which can be made available to their subtenants. 
{{< /c8y-admon-info >}}

In the **Applications** tab of a tenant you can view all subscribed applications, subscribe tenants to applications or remove the applications from the tenant. By default, tenants will be subscribed to the standard {{< product-c8y-iot >}} applications.

A tenant can have multiple available applications as displayed under **Available applications** but to use an application's functionality a subscription to the application must be established for the tenant. The list of subscribed applications is shown under **Subscribed applications**.

<img src="/images/users-guide/enterprise-tenant/et-subtenant-applications.png" alt="Subscribe tenant" style="max-width: 100%">

{{< c8y-admon-info >}}
Alternatively, you can retrieve the list of subscribed applications for a tenant by using the {{< product-c8y-iot >}} REST API to get [specific tenant information](https://{{< domain-c8y >}}/api/core/#tag/Tenant-API). The subscribed applications will be listed under the <code>applications</code> fragment.
{{< /c8y-admon-info >}}

### To subscribe an application {#to-subscribe-an-application}

Hover over the application under **Available applications** at the right and click **Subscribe** on the desired application.

### To unsubscribe an application {#to-unsubscribe-an-application}

Hover over the application under **Subscribed applications** at the left and click **Unsubscribe**.

### To monitor microservices {#to-monitor-microservices}

For all applications hosted as microservices by {{< product-c8y-iot >}} the status of the microservice is indicated next to its name by symbols and may be in one of the following states:

* <i class="dlt-c8y-icon-ok text-success icon-20"></i> Microservice is up and running.
* <i class="dlt-c8y-icon-exclamation-circle text-warning icon-20"></i> Microservice is unhealthy.
* <i class="dlt-c8y-icon-warning text-danger icon-20"></i> Microservice is down.

You may view details on their status by expanding the respective entry.

<img src="/images/users-guide/enterprise-tenant/et-application-details.png" alt="Application details">

The following information is provided:

* Active - the number of active microservice instances.
* Unhealthy - the number of inactive microservice instances.
* Desired - the number of desired microservice instances.
* Name - microservice instance name.
* Restarts - the number of microservice instance restarts.

{{< c8y-admon-info >}}
Information on the microservice instance name and the number of restarts is displayed in case of at least one restart.
{{< /c8y-admon-info >}}

Further details are provided on the **Status** tab of the respective application, see [Managing applications](/standard-tenant/ecosystem/#managing-applications).
