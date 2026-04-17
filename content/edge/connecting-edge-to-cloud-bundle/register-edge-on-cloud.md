---
weight: 5
title: Registering Edge in the cloud tenant
layout: redirect
---

To remotely manage, configure, and monitor Edge through a {{< product-c8y-iot >}} cloud tenant, you must first establish a secure connection. Edge authenticates to the cloud using an X.509 certificate, which your tenant must trust before a connection can be established.
You have three options for managing these certificates:
1. **{{< product-c8y-iot >}} Certificate Authority (recommended)**: Use the {{< product-c8y-iot >}} Certificate Authority (CA) service to issue a trusted certificate automatically.
1. **Third-party Certificate Authority**: Provide your own certificate issued by a trusted third-party Certificate Authority (CA).
1. **Self-signed certificate**: Allow Edge to generate a self-signed certificate.

Once registered, the Edge instance appears in your cloud tenant as a device of type `c8y_EdgeAgent` and named with the domain name of the Edge. For example, if your Edge instance is configured with the domain **edgebootstrap.example**, it will appear as a device named **edgebootstrap.example** in the cloud tenant. You can [download diagnostics](/edge/connecting-edge-to-cloud/#downloading-diagnostics-remotely), [manage software](/edge/connecting-edge-to-cloud/#software-management-docs), [upgrade](/edge/connecting-edge-to-cloud/#upgrading-edge-remotely) and [monitor](/edge/edge-operations/#monitoring-the-edge-metrics-from-your-cloud-tenant) Edge from your cloud tenant via this device.

### Using {{< product-c8y-iot >}} Certificate Authority (recommended) {#cloud-tenant-ca}
The {{< product-c8y-iot >}}'s [Certificate Authority service](/device-certificate-authentication/certificate-authority) requires you to first create a CA certificate for the cloud tenant before devices can use it. For more information on creating a CA certificate for your cloud tenant refer to [Creating a CA certificate via the UI](/device-certificate-authentication/certificate-authority/#creating-a-ca-certificate-via-the-ui) or [Creating a CA certificate via REST](/device-certificate-authentication/certificate-authority/#creating-a-ca-certificate-via-the-rest). Subsequently you need to register a device in your cloud tenant using the {{< product-c8y-iot >}} Device Management application, following the steps below:
1. Sign in to your cloud tenant and open the {{< product-c8y-iot >}} Device Management application.
1. Navigate to **Devices** > **Registration**.
1. Click **Register device** and select **General**.
1. In the **Register general devices** dialog box, fill in the following fields and click **Next**.
    - Select the **Create device certificates during device registration** option.
    - Enter the Edge domain name, for example, *edgebootstrap.example*, in the **Device ID** field.
    - Enter a random password in the **One-time password** field *(make sure you copy the one-time password as this will be required while configuring Edge in subsequent steps)*.
1. Close the form.

If you installed Edge using the **c8yedge** tool, you can configure the Edge with your cloud tenant's domain (for example, <sub-domain>.cumulocity.com) and one-time password using the command below.
```shell
c8yedge config \
    --set cloudTenant.domain=<cloud tenant's domain> \
    --set cloudTenant.otp=<one-time password>
```

### Using third-party Certificate Authority {#third-party-ca}
If you installed Edge using the **c8yedge** tool, you can configure the Edge with your cloud tenant's domain (for example, <sub-domain>.cumulocity.com), TLS/SSL key, and certificate chain using the command below.
```shell
c8yedge config \
    --set cloudTenant.domain=<cloud tenant's domain> \
    --set-file cloudTenant.tlsSecret.tls.key=<path/to/tls.key> \
    --set-file cloudTenant.tlsSecret.tls.crt=<path/to/tls.crt>
```

To complete the registration process, you must sign in to your cloud tenant and follow the steps outlined in [Managing trusted certificates](/device-certificate-authentication/managing-trusted-certificates) to upload the third-party CA certificate into your tenant’s trusted certificates.

### Using self-signed certificate {#self-signed-ca}
If you do not provide a TLS/SSL key and certificate chain or a one-time password, the Edge operator automatically generates an internal TLS/SSL key and certificate for authentication. If you installed Edge using the **c8yedge** tool, you can configure the Edge with your cloud tenant URI and Edge generated self-signed certificate using the command below.
```shell
c8yedge config \
    --set cloudTenant.domain=<CLOUD-TENANT-URI>
```

To complete the registration process, you must sign in to your cloud tenant and follow the steps outlined in [Managing trusted certificates](/device-certificate-authentication/managing-trusted-certificates) to upload the Edge generated CA certificate into your tenant’s trusted certificates. You can download the Edge generated CA certificate using the command below:
```shell
kubectl get edge c8yedge -n c8yedge --output jsonpath='{.status.helpCommands.fetchGeneratedCACrt}' | sh
```

{{< c8y-admon-info >}}
If you installed Edge on a self-managed Kubernetes cluster, you can configure the Edge with your cloud tenant details by updating the `spec.cloudTenant` field in the Edge CR. For more details, refer to [Edge custom resource > Cloud tenant](/edge/edge-custom-resource-definition/#cloudTenant). For general guidance on configuring Edge, see [Modifying Edge](/edge/manage-edge/#modify-edge).
{{< /c8y-admon-info >}}