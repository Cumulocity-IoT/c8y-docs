---
weight: 26
title: Cloud tenant
layout: redirect
---

Edge can be managed, configured, and monitored remotely through a {{< product-c8y-iot >}} cloud tenant. You can control and troubleshoot your Edge deployments remotely.

To enable this, you must first register the Edge as a device within the cloud tenant. This registration process requires providing the {{< product-c8y-iot >}} cloud tenant URI, along with an optional TLS/SSL key and certificate chain. These credentials authenticate Edge when connecting to the cloud via the MQTT protocol using X.509 certificate-based authentication.

If you do not provide a TLS/SSL key and certificate chain, the Edge operator automatically generates an internal TLS/SSL key and certificate for authentication. In this case, Edge will identify itself using the domain name of the instance.

To complete the registration process, you must sign in to your cloud tenant and follow the steps outlined in [Managing trusted certificates](/device-management-application/managing-device-data/#managing-trusted-certificates) to add the appropriate Certificate Authority (CA) certificate to your tenant’s trusted certificate list.

If Edge uses an internally generated TLS/SSL key and certificate, you can download the corresponding CA certificate by running the following command:

```shell
kubectl get edge c8yedge -n c8yedge --output jsonpath='{.status.helpCommands.fetchGeneratedCACrt}' | sh
```
{{< c8y-admon-info >}}
Substitute the Edge name and namespace name *c8yedge* in the command above with the specific Edge name and namespace name you have specified in your Edge CR.
{{< /c8y-admon-info >}}

Once registered, the Edge appears as a device in the cloud tenant. The device name is determined by the Common Name (CN) specified in the TLS/SSL certificate used for authentication. If you provided a custom TLS/SSL key and certificate, the device name matches the CN. However, if the Edge operator generated the TLS/SSL certificate internally, the device name defaults to the domain name of your Edge.
For example, if your Edge is configured with the domain **myown.iot.com**, it will appear as a device named **myown.iot.com** in the cloud tenant. Once registered, you can remotely access your Edge instance, monitor its metrics, perform version upgrades, and collect diagnostic data for troubleshooting and analysis.

|<div style="width:150px">Field</div>|Required|<div style="width:115px">Type</div>|Default|Description|
|:---|:---|:---|:---|:---|
|domain|Yes|String||{{< product-c8y-iot >}} cloud tenant domain. For example, `<tenantid>.cumulocity.com`|
|tlsSecretName|No|string|The Edge operator generates and assigns self-signed TLS/SSL private key and certificates.|Name of the Kubernetes secret containing the TLS/SSL private key and certificates with which Edge connects to the cloud through MQTT protocol using a X.509 certificate for authentication. This secret must contain two keys:<p style="margin: 0; padding-left: 2em;">- **tls.key:** TLS/SSL private key in the PEM format.</p><p style="margin: 0; padding-left: 2em;">- **tls.crt:** The TLS/SSL certificate chain associated with the private key in PEM format. It's essential to ensure the certificates are arranged in the correct sequence for TLS/SSL validation to succeed. The proper order of the certificate chain is:</p><p style="margin: 0; padding-left: 4em;">- **End-entity certificate:** This is the TLS/SSL certificate issued to your domain or server, sometimes referred to as the "leaf" or "server" certificate.</p><p style="margin: 0; padding-left: 4em;">- **Intermediate certificate(s):** These certificates link your end-entity certificate to the trusted root certificate. If there are multiple intermediate certificates, they must be ordered correctly as well.</p><p style="margin: 0; padding-left: 4em;">- **Root CA certificate:** This is the certificate for the Certificate Authority (CA) that is trusted by browsers and other clients. It's generally included last in the chain.</p> <p><p>**Info:** You can also reuse the secret name provided in the `spec.tlsSecretName` provided that the TLS/SSL certificate it references is issued by an intermediate Certificate Authority (CA) within your organization and can be added to the trusted certificate list of your {{< product-c8y-iot >}} cloud tenant. <p><p>For more information, see [TLS/SSL Secret](#tls-secret).<p><p>**Info:** The Edge operator retrieves this secret from the **`EDGE-CR-NAMESPACE`**. Ensure that this secret is created before initiating the Edge deployment or update process.
