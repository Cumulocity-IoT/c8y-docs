---
weight: 5
title: Registering Edge in the cloud tenant
layout: redirect
---

To remotely manage, configure, and monitor Edge through a {{< product-c8y-iot >}} cloud tenant, you must first register it as a device within the cloud tenant. This registration process requires providing the {{< product-c8y-iot >}} cloud tenant URI, along with an optional TLS/SSL key and certificate chain. These credentials authenticate Edge when connecting to the cloud via the MQTT protocol using X.509 certificate-based authentication. 

If you installed Edge using the c8yedge tool, you can configure the cloud tenant URI, TLS/SSL key, and certificate chain using the command below.
```shell
c8yedge config \
    --set cloudTenant.domain=<CLOUD-TENANT-URI> \
    --set-file cloudTenant.tlsSecret.tls.key=<path/to/tls.key> \
    --set-file cloudTenant.tlsSecret.tls.crt=<path/to/tls.crt>
```
Alternatively, you can configure the same by updating the `spec.cloudTenant` field in the Edge CR. For more details, refer to [Edge custom resource > Cloud tenant](/edge-kubernetes/edge-custom-resource-definition/#cloudTenant).

For general guidance on configuring Edge, see [Modifying Edge](/edge-kubernetes/manage-edge/#modify-edge).

If you do not provide a TLS/SSL key and certificate chain, the Edge operator automatically generates an internal TLS/SSL key and certificate for authentication. In this case, Edge will identify itself using the domain name of the instance.

To complete the registration process, you must sign in to your cloud tenant and follow the steps outlined in [certificates](/device-certificate-authentication/device-certificates/) to add the appropriate Certificate Authority (CA) certificate to your tenant’s trusted certificate list.

If Edge uses an internally generated TLS/SSL key and certificate, you can download the corresponding CA certificate by running the following command:

```shell
kubectl get edge c8yedge -n c8yedge --output jsonpath='{.status.helpCommands.fetchGeneratedCACrt}' | sh
```
{{< c8y-admon-info >}}
Substitute the Edge name and namespace name *c8yedge* in the command above with the specific Edge name and namespace name you have specified in your Edge CR.
{{< /c8y-admon-info >}}

Once registered, the Edge instance appears as a device in the cloud tenant. The device name is determined by the Common Name (CN) specified in the TLS/SSL certificate used for authentication. If you provided a custom TLS/SSL key and certificate, the device name matches the CN. However, if the Edge operator generated the TLS/SSL certificate internally, the device name defaults to the domain name of the Edge.
For example, if your Edge instance is configured with the domain **myown.iot.com**, it will appear as a device named **myown.iot.com** in the cloud tenant. Once registered, you can remotely access your Edge instance, monitor its metrics, perform version upgrades, and collect diagnostic data for troubleshooting and analysis.
