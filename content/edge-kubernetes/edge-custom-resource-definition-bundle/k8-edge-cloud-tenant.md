---
weight: 26
title: Cloud tenant
layout: redirect
---

Edge can be managed, configured, and monitored remotely through a {{< product-c8y-iot >}} cloud tenant. You can control and troubleshoot your Edge deployments remotely.

To enable this, first register Edge as a device in the {{< product-c8y-iot >}} cloud tenant. You can register Edge by providing the {{< product-c8y-iot >}} cloud tenant URI, and optionally, TLS/SSL key and certificate chain with which Edge connects to cloud through MQTT protocol using a X.509 certificate for authentication. If you do not provide the TLS/SSL key and the certificate chain, the Edge operator uses an internally generated TLS/SSL key and certificate for identifying Edge as a device in the cloud tenant. For completing the registration process, sign into your cloud tenant and follow the steps described in [Managing trusted certificates](/device-management-application/managing-device-data/#managing-trusted-certificates) to add the Certificate Authority (CA) certificate to the trusted certificate list of your tenant. For more information, see [Device certificates](/device-integration/mqtt/#device-certificates).

In case you let the Edge use the internally generated TLS/SSL key and certificates, you can download the CA certificate by using the command below:

```shell
kubectl get edge c8yedge -n c8yedge --output jsonpath='{.status.helpCommands.fetchGeneratedCACrt}' | sh
```
{{< c8y-admon-info >}}
Substitute the Edge name and namespace name *c8yedge* in the command above with the specific Edge name and namespace name you have specified in your Edge CR.
{{< /c8y-admon-info >}}

Once registered, you can access your Edge remotely as a device, monitor its metrics, upgrade its version and collect diagnostic data remotely.

|<div style="width:150px">Field</div>|Required|<div style="width:115px">Type</div>|Default|Description|
|:---|:---|:---|:---|:---|
|domain|Yes|String||{{< product-c8y-iot >}} cloud tenant domain. For example, `<tenantid>.cumulocity.com`|
|tlsSecretName|No|string|The Edge operator generates and assigns self-signed TLS/SSL private key and certificates.|Name of the Kubernetes secret containing the TLS/SSL private key and certificates with which Edge connects to the cloud through MQTT protocol using a X.509 certificate for authentication. This secret must contain two keys:<p style="margin: 0; padding-left: 2em;">- **tls.key:** TLS/SSL private key in the PEM format.</p><p style="margin: 0; padding-left: 2em;">- **tls.crt:** The TLS/SSL certificate chain associated with the private key in PEM format. It's essential to ensure the certificates are arranged in the correct sequence for TLS/SSL validation to succeed. The proper order of the certificate chain is:</p><p style="margin: 0; padding-left: 4em;">- **End-entity certificate:** This is the TLS/SSL certificate issued to your domain or server, sometimes referred to as the "leaf" or "server" certificate.</p><p style="margin: 0; padding-left: 4em;">- **Intermediate certificate(s):** These certificates link your end-entity certificate to the trusted root certificate. If there are multiple intermediate certificates, they must be ordered correctly as well.</p><p style="margin: 0; padding-left: 4em;">- **Root CA certificate:** This is the certificate for the Certificate Authority (CA) that is trusted by browsers and other clients. It's generally included last in the chain.</p> <p><p>**Info:** You can also reuse the secret name provided in the `spec.tlsSecretName` provided that the TLS/SSL certificate it references is issued by an intermediate Certificate Authority (CA) within your organization and can be added to the trusted certificate list of your {{< product-c8y-iot >}} cloud tenant. <p><p>For more information, see [TLS/SSL Secret](#tls-secret).<p><p>**Info:** The Edge operator retrieves this secret from the **`EDGE-CR-NAMESPACE`**. Ensure that this secret is created before initiating the Edge deployment or update process.
