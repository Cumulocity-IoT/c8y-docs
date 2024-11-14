---
weight: 25
title: Configuring the microservice hosting feature
layout: bundle
sector:
  - edge_server
---

Microservices are server-side applications which may be used to extend the Edge platform with customer-specific functionality. For more information, see [Microservice SDK](/microservice-sdk/microservice-sdk-introduction/). When you enable or disable the microservice feature, the Device simulator microservice also gets enabled or disabled. To use the Device simulator, add the **Simulator** permission. For more information, see [Global roles](/standard-tenant/managing-permissions/#global-roles).

For more information about Device simulator, see [Working with simulators](/device-management-application/working-with-simulators/).

{{< c8y-admon-info >}}
Ensure that you have fulfilled the minimum system requirements: 4 logical CPU cores and 8 GB RAM.
{{< /c8y-admon-info >}}

If you want to use the microservice hosting feature, ensure that you do not use these IP ranges in your local network where the Edge virtual machines are configured. When you enable the microservice hosting feature, the Kubernetes system reserves these IP ranges on the Edge instances.
- 10.96.0.0/12

Enabling the microservice hosting feature takes about 10 to 15 minutes to complete.

{{< c8y-admon-important >}}
To enable or disable the microservice hosting feature, you must have the "Tenant Manager" role.
{{< /c8y-admon-important >}}

{{< c8y-admon-info >}}
For information regarding any microservices related issues, see [Troubleshooting Microservices](/edge/operating-edge/#troubleshooting-microservices).
{{< /c8y-admon-info >}}

### Enabling or disabling the microservice hosting feature using the UI {#enabling-or-disabling-the-microservice-hosting-feature-using-the-ui}

1. Log in to the {{< management-tenant >}} using the Edge administrator credentials created during the installation.

	- Username: management/<*Edge admin username*>
	- Password: password provided during the installation
2. Switch to the Administration application using the application switcher at the right of the top bar **<img class="Default" src="/images/icons/switcher-icon.png" alt="Application switcher" style="display: inline; float: none">**.
3. Click **Edge** > **Microservices** in the navigator.
4. Use the toggle button to enable the microservice hosting feature.

{{< c8y-admon-important >}}
If you have enabled the remote-connectivity and also the microservice hosting feature, disabling the microservice hosting feature, reconfiguring the network or updating the Edge appliance might result in an alarm in the remote tenant for the Kubernetes network interfaces that are removed or altered.
{{< /c8y-admon-important >}}

To deploy a microservice, in the Administration application, navigate to **Ecosystem** > **Microservices**, and click **Add microservice**.

{{< c8y-admon-info >}}
The **Add microservice** button will not be available if you have not enabled the microservice hosting feature.
{{< /c8y-admon-info >}}

Upload the ZIP file for your microservice application. For more information about deploying a microservice, see [Deploying the "Hello world" microservice](/microservice-sdk/java/#deploying-the-hello-world-microservice).

After you have enabled the microservice hosting feature, ensure that the microservices are active and healthy before using them. For more information, see [Microservice runtime](/microservice-sdk/general-aspects/#microservice-runtime).

Before disabling the microservice hosting feature, you should unsubscribe from all the microservices that have been uploaded.
You can also delete the microservice if you are not planning to enable again and subscribe to the same microservice.
For more information about developing and hosting a microservice, see [Microservices SDK](/microservice-sdk/microservice-sdk-introduction/).

{{< c8y-admon-info >}}
Edge appliance will be temporarily non-operational during the operation.
{{< /c8y-admon-info >}}

### Enabling or disabling the microservice hosting feature using the REST APIs {#enabling-or-disabling-the-microservice-hosting-feature-using-the-rest-apis}

To enable or disable the microservice hosting feature using the REST APIs, see the `/edge/configuration/microservices` API in the [{{< product-c8y-iot >}} Edge OpenAPI Specification](https://{{< domain-c8y >}}/api/edge/{{< c8y-edge-current-version-alt >}}.0/#operation/enableMicroserviceHosting).

### Deploying microservices with a lower manifest version {#deploying-microservices-with-a-lower-manifest-version}

A microservice specifies an API version in the microservice manifest. Depending on this API version, the microservice runs with all or only a restricted set of Linux kernel capabilities. More precisely, all capabilities are granted to microservices with API version 1 whereas only the capability `CAP_NET_BIND_SERVICE` is granted to microservices with API version 2. For more information, see [Microservice migration to API Version 2](/microservice-sdk/general-aspects/#migration).

By default, only the {{< management-tenant >}} can upload and subscribe to the microservices with API version 1. To improve the security of the Edge appliance, the minimum API version has been configured to API version 2. Due to the minimum API version configuration, you cannot upload and subscribe to a microservice with API version 1 in the "edge" tenant.

{{< c8y-admon-important >}}The MLW and the Messaging Service microservices use API version 1. To install the MLW and the Messaging Service on Edge version 10.15 and later, you must subscribe the "edge" tenant to the **Feature-privileged-microservice-hosting** application before uploading the MLW and the Messaging Service microservices with API version 1.{{< /c8y-admon-important >}}

To upload and subscribe to a microservice with API version 1 in the "edge" tenant:

1. Log in to the {{< management-tenant >}}.
2. Enable the microservice hosting feature, if not already enabled.
3. Go to **Tenants** > **Subtenants** and click the "edge" tenant.
4. Go to **Applications** and subscribe to the **Feature-privileged-microservice-hosting** application from the **Available applications**.
   {{< c8y-admon-info >}} It might take up to ten minutes until the "edge" tenant is able to upload and subscribe to privileged microservices. {{< /c8y-admon-info >}}
5. Log in to the "edge" tenant and upload a microservice with API version 1.
