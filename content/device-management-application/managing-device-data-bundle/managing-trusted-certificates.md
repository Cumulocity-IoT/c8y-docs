---
weight: 40
title: Managing trusted certificates
layout: redirect
helpcontent:
- label: managing-trusted-certificates
  title: Trusted certificates
  content: "Cumulocity allows devices to connect via MQTT and LWM2M protocol using a X.509 certificate for authentication. To do so, the public certificate (root or intermediate) of the certificate authority must be 'trusted' by Cumulocity. This public certificate should be added to the trusted certificates."
---

{{< product-c8y-iot >}} allows devices to connect via MQTT protocol using a X.509 certificate for authentication. To do so, a certificate must be trusted by {{< product-c8y-iot >}}. A certificate is trusted when it is added to the trusted certificates and is in activated state.

{{< c8y-admon-info >}}
This section describes how to manage trusted certificates. For information on connecting devices using certificates refer to [Device certificates](/device-integration/device-certificates/).
{{< /c8y-admon-info >}}

Click **Trusted certificates** in the **Management** menu in the navigator.

All certificates owned by the tenant will be displayed.

![Trusted certificates List](/images/users-guide/DeviceManagement/devmgmt-trusted-certificates-list.png)

The **Status** column indicates if the certificate is enabled or disabled. At any given time a tenant can have any number of enabled or disabled certificates.
Expand a certificate by clicking the arrow icon <i class="dlt-c8y-icon-expand-arrow text-muted icon-20"></i> at the right to view more details.

The information in the table at the right side is extracted from the provided certificate. The content is read-only and cannot be changed.

![Trusted certificate details](/images/users-guide/DeviceManagement/devmgmt-trusted-certificates-details.png)


### To add a certificate {#to-add-a-certificate}

Before adding a new trusted certificate, make sure that:

* It is a X.509 certificate in PEM format.
* It is in version 3.
* It contains `BasicConstraints:[CA:true]`.
* It has not already been uploaded to {{< product-c8y-iot >}}.
* It is still valid (not expired).

To add a certificate perform these steps:

1. Click **Add trusted certificate** at the right of the top menu bar.
2. In the resulting dialog box, provide the following information:

| Field             | Description                                                                                                                                |
|:------------------|:-------------------------------------------------------------------------------------------------------------------------------------------|
| Certificate name  | User-provided name for the certificate. This name is not used by {{< product-c8y-iot >}} and can serve as a description of the certificate.         |
| Certificate       | File containing the certificate in PEM format. Add the file by dropping it into this field or browsing for it in your file system.            |
| Auto registration | If selected, new devices which use a certificate signed by the authority owning this trusted certificate will automatically be registered. The option does not support devices using the LWM2M protocol. |
| Enabled/ Disabled | When disabled, devices which use a certificate signed by the authority owning this certificate, will not be able to connect.               |

3. Click **Add Certificate** to validate and save the certificate.

{{< c8y-admon-info >}}
For performance reasons, you shouldn't add the certificates of each device you want to connect, but only add the root certificate or one of the intermediate certificates from the chain which has been used to sign certificates used by devices.
{{< /c8y-admon-info >}}

### To edit a trusted certificate {#to-edit-a-trusted-certificate}

In the detail view of a certificate you may change the parameters on the left, that is, the certificate name, and the settings for the auto registration and enabled/disabled option.

For details on the fields, see the description on adding certificates above.

### To delete a trusted certificate {#to-delete-a-trusted-certificate}

To permanently delete a certificate from the trusted certificates list, click the delete icon <i class="dlt-c8y-icon-editing-trash text-danger icon-20"></i> at the right of the respective entry and in the context menu click **Delete**.
The certificate will be permanently deleted.
