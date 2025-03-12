---
weight: 20
title: Subscribing applications
layout: redirect
---


### Overview

{{< product-c8y-iot >}} features an application marketplace that allows tenants to access and manage various applications.

{{< management-tenant >}}s and {{< enterprise-tenant >}}s can control application access for their subtenants. In the **Applications** tab of a tenant, they can:

- [View and manage existing application subscriptions](#to-view-subscribed-applications)
- [Subscribe applications to tenants](#to-subscribe-an-application)
- [Monitor the microservice status](#to-monitor-the-microservice-status)

For general information on applications as part of the {{< product-c8y-iot >}} ecosystem, refer to [Managing the ecosystem](standard-tenant/ecosystem/#managing-applications).

{{< c8y-admon-info >}}
Tenants can also create and deploy their own [custom applications](/standard-tenant/ecosystem/#custom-applications), which can be made available to their subtenants.
{{< /c8y-admon-info >}}

### To view subscribed applications {#to-view-subscribed-applications}

In the **Applications** tab of a tenant you can view all subscribed applications, subscribe applications to tenants, or remove the applications from the tenant. By default, the [standard {{< product-c8y-iot >}} applications](/standard-tenant/ecosystem/#applications-subscribed-by-default) are subscribed to the tenant.

A tenant can have multiple available applications as displayed under **Available applications** but to use an application's functionality a subscription to the application must be established for the tenant. The list of subscribed applications is shown under **Subscribed applications**.

<img src="/images/users-guide/enterprise-tenant/et-subtenant-applications.png" alt="Subscribe tenant" style="max-width: 100%">

{{< c8y-admon-info >}}
Alternatively, you can retrieve the list of subscribed applications for a tenant by using the {{< product-c8y-iot >}} REST API to get [specific tenant information](https://{{< domain-c8y >}}/api/core/#tag/Tenant-API). The subscribed applications will be listed under the <code>applications</code> fragment.
{{< /c8y-admon-info >}}

#### To view the application details {#to-view-the-application-details}

Expanding an application entry in the **Available applications** list shows the following details:

- Availability - One of MARKET, SHARED or PRIVATE
- Type - One of HOSTED, MICROSERVICE or EXTERNAL
- Owner - Tenant that owns the application


### To subscribe an application {#to-subscribe-an-application}

Hover over the application under **Available applications** at the right and click **Subscribe** on the desired application.

### To unsubscribe an application {#to-unsubscribe-an-application}

Hover over the application under **Subscribed applications** at the left and click **Unsubscribe**.

### To monitor the microservice status {#to-monitor-the-microservice-status}

For all applications hosted as microservices by {{< product-c8y-iot >}} the status of the application is indicated next to its name by symbols. It may be in one of the following states:

* <i class="dlt-c8y-icon-ok text-success icon-20"></i> Microservice is up and running.
* <i class="dlt-c8y-icon-exclamation-circle text-warning icon-20"></i> Microservice is unhealthy.
* <i class="dlt-c8y-icon-warning text-danger icon-20"></i> Microservice is down.

You can view details on the status by expanding the respective entry.

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

Further details are provided on the **Status** tab of the respective microservice, see [Monitoring microservices](/standard-tenant/ecosystem/#monitoring-microservices).
