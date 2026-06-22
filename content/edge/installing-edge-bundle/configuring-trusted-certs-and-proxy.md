---
weight: 60
title: Configuring trusted TLS certificates and proxy settings
layout: redirect
---

You can configure {{< product-c8y-iot >}} Edge to:
* **Trust additional TLS certificates** for external endpoints.
* **Route outbound traffic** through a proxy server when deployed behind a proxy.

To apply these settings, create or update a ConfigMap named `c8yedge-operator-config` in the `c8yedge` namespace (or the specific namespace where Edge is deployed) using the keys described below.

### Configuration keys {#configuration-keys}
* `ca.crt` - One or more trusted TLS certificates in PEM format that the Edge operator and the Edge should trust in addition to public certificate authorities. Multiple certificates can be provided by concatenating them into a single PEM bundle.
* `http_proxy` - The URL for your HTTP proxy server.
* `https_proxy` -  The URL for your HTTPS proxy server.
* `socks_proxy` -  The URL for your SOCKS proxy server.
* `no_proxy` - A comma-separated list of domain suffixes, IP addresses, or CIDR ranges that must bypass the proxy. This **must** include:
  * The {{< management-tenant >}} and Edge tenant **domain names**.
  * The Kubernetes **Pod CIDR** (Cluster pod IP address range).
  * The Kubernetes **Service CIDR** (Cluster service IP address range).
  * Any additional domains, hosts, or IP addresses that should bypass the proxy.        

### Apply changes {#apply-changes}
After creating or updating the ConfigMap, restart the Edge operator to apply the configurations. For detailed steps, see [Restarting the Edge operator](/edge/manage-edge/#restart-operator).

### Sample ConfigMap {#sample-config-map}
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: c8yedge-operator-config
  namespace: c8yedge
data:
  # Trusted TLS certificates in PEM format
  ca.crt: |
    <CERTIFICATES_TO_TRUST>

  http_proxy: <HTTP Proxy URL>
  https_proxy: <HTTPS Proxy URL>
  socks_proxy: <SOCKS Proxy URL>

  # Comma-separated list of domains, IPs, or CIDR ranges to bypass the proxy
  no_proxy: 127.0.0.1,::1,localhost,.svc,.cluster.local,cumulocity,<edge domain names, e.g. management-myown.iot.com,myown.iot.com>,<kubernetes cluster IP range, e.g. 10.43.0.0/16>
```
