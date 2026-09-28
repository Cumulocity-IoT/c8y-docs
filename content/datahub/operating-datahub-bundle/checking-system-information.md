---
weight: 10
title: Checking system information
layout: redirect
helpcontent:
  - label: checking-system-information
    title: Checking system information
    content: "Under **Microservice** you find the status of the microservice, indicating via green or red icon whether the web application can access the microservice.

    Under **Web application** you find the version of the web application.

    Under **Dremio** you find the status of Dremio, indicating via green or red whether the microservice can access Dremio.

    Under **Management** you find the setup of the system. Click the arrow to the right to expand the box. Here all relevant system properties and their values are listed."
---

{{< c8y-admon-req >}}
You need administration permissions to access system information. See [Defining {{< product-c8y-iot >}} DataHub permissions and roles](/datahub/setting-up-datahub#defining-permissions) for details.
{{< /c8y-admon-req >}}

In the navigator, select **Administration** and then **System status** to get information about the system configuration and its status.

Under **Microservice** you will find the status of the microservice, which is either marked as green or red. This status reflects whether the microservice can be accessed from the web application. If the microservice is accessible, its current version is shown. If not, check the status of the microservice and its logs as described in [Managing applications](/standard-tenant/ecosystem/#managing-applications).

Under **Web application** you will find the version of the web application.

Under **Dremio** you will find the status of Dremio, which is either marked as green or red. This status reflects whether Dremio can be accessed from the microservice. If Dremio is accessible, its current version is shown. If not, check the status of the microservice and its logs as described in [Managing applications](/standard-tenant/ecosystem/#managing-applications).

Under **Management** you will find the setup of the system. If you expand that box by clicking on the arrow to the right, all relevant system properties and their values are listed. Note that these values cannot be modified for a running microservice. The tenant administrator must redeploy the microservice with corresponding new values.
