---
weight: 10
title: Prerequisites
layout: redirect
---

Before setting up {{< product-c8y-iot >}} DataHub, the following prerequisites must be checked:

The {{< product-c8y-iot >}} DataHub microservice and web application must be available as applications on your tenant. The web application provides the user interface to configure {{< product-c8y-iot >}} DataHub and to manage offloading pipelines, while the microservice provides the corresponding backend functionality. The web application is named **DataHub**, whereas the microservice is named **Datahub**. Both applications are deployed either as:

* Subscribed application: the applications were subscribed to the tenant by the management or super tenant
* Custom application: the applications were added to the tenant

If you have an {{< enterprise-tenant >}}, you can also subscribe your subtenants to both applications so that the subtenants can use {{< product-c8y-iot >}} DataHub as well.

See [Managing applications](/standard-tenant/ecosystem/#managing-applications) for details on managing {{< product-c8y-iot >}} applications in general, including instructions for adding applications to a tenant.

See [Managing microservices](/standard-tenant/ecosystem/#managing-microservices) and [Monitoring microservices](/standard-tenant/ecosystem/#monitoring-microservices) for details on {{< product-c8y-iot >}} microservices, including instructions for:

* Adding microservices to a tenant
* Checking the status, permissions, and log files of a microservice

See [Managing tenants](/enterprise-tenant/managing-tenants/) for details on subscribing applications or microservices to a tenant or subtenant.

For the offloading of {{< product-c8y-iot >}} data, you need the connection settings and credentials for a cloud data lake service. During offloading, the data will be written into a data lake folder named after the tenant name.

{{< c8y-admon-info >}}
This section provides instructions on how to configure the data lake so that it is accessible via Dremio. More details can be found in the [Dremio data source documentation](https://docs.dremio.com/current/data-sources/). Note that you must not create the target table, which connects to the data lake, in Dremio; this is done by {{< product-c8y-iot >}} DataHub.
{{< /c8y-admon-info >}}
