---
weight: 10
title: Checking system information
layout: redirect
---

{{< c8y-admon-info >}}
You need administration permissions to access system information. See the section [Defining {{< product-c8y-iot >}} DataHub permissions and roles](/datahub/setting-up-datahub#defining-permissions) for details.
{{< /c8y-admon-info >}}

In the navigator, select **Administration** and then **System status** to get information about the system configuration and its status.

Under **Microservice** you will find the status of the microservice, which is either marked as green or red. This status reflects whether the microservice can be accessed from the web app. If the microservice is accessible, its current version is shown. If not, check the status of the microservice and its logs as described in section [Managing web apps](/users-guide/administration#managing-applications).

Under **Web web app** you will find the version of the web app.

Under **Dremio** you will find the status of the web app, which is either marked as green or red. This status reflects whether Dremio can be accessed from the microservice. If Dremio is accessible, its current version is shown. If not, check the status of the microservice and its logs as described in section [Managing web apps](/users-guide/administration#managing-applications).

Under **Management** you will find the setup of the system. If you expand that box by clicking on the arrow to the right, all relevant system properties and their values are listed. Note that these values cannot be modified for a running microservice. The tenant administrator needs to redeploy the microservice with corresponding new values.
