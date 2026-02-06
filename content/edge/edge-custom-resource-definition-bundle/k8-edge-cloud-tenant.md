---
weight: 27
title: Cloud tenant
layout: redirect
---

Edge can be managed, configured, and monitored remotely through a {{< product-c8y-iot >}} cloud tenant. You can control and troubleshoot your Edge deployments remotely.

To enable this, you must first register Edge as a device within the cloud tenant. This registration process requires providing the {{< product-c8y-iot >}} cloud tenant URI, along with an optional TLS/SSL key and certificate chain. These credentials authenticate Edge when connecting to the cloud via the MQTT protocol using X.509 certificate-based authentication.

See [Registering Edge in the cloud tenant](/edge/k8-edge-connecting-edge-to-cloud/#k8-edge-register-edge-on-cloud) for more details.

|<div style="width:150px">Field</div>|Required|<div style="width:115px">Type</div>|Default|Description|
|:---|:---|:---|:---|:---|
|domain|Yes|String||{{< product-c8y-iot >}} cloud tenant domain. For example, `<tenantid>.cumulocity.com`|
|tlsSecretName|No|string|The Edge operator generates and assigns self-signed TLS/SSL private key and certificates.|Name of the Kubernetes secret containing the TLS/SSL private key and certificates with which Edge connects to the cloud through MQTT protocol using a X.509 certificate for authentication. This secret must contain two keys:<p style="margin: 0; padding-left: 2em;">- **tls.key:** TLS/SSL private key in the PEM format.</p><p style="margin: 0; padding-left: 2em;">- **tls.crt:** The TLS/SSL certificate chain associated with the private key in PEM format. It's essential to ensure the certificates are arranged in the correct sequence for TLS/SSL validation to succeed. The proper order of the certificate chain is:</p><p style="margin: 0; padding-left: 4em;">- **End-entity certificate:** This is the TLS/SSL certificate issued to your domain or server, sometimes referred to as the "leaf" or "server" certificate.</p><p style="margin: 0; padding-left: 4em;">- **Intermediate certificate(s):** These certificates link your end-entity certificate to the trusted root certificate. If there are multiple intermediate certificates, they must be ordered correctly as well.</p><p style="margin: 0; padding-left: 4em;">- **Root CA certificate:** This is the certificate for the Certificate Authority (CA) that is trusted by browsers and other clients. It's generally included last in the chain.</p> <p><p>**Info:** You can also reuse the secret name provided in the `spec.tlsSecretName` provided that the TLS/SSL certificate it references is issued by an intermediate Certificate Authority (CA) within your organization and can be added to the trusted certificate list of your {{< product-c8y-iot >}} cloud tenant. <p><p>For more information, see [TLS/SSL Secret](#tls-secret).<p><p>**Info:** The Edge operator retrieves this secret from the **EDGE-CR-NAMESPACE**. Ensure that this secret is created before initiating the Edge deployment or update process.
