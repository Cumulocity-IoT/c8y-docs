---
weight: 50
title: Installing on a self-managed Kubernetes cluster
layout: redirect
---

This method is suitable for users who already have a Kubernetes cluster and want to install Edge using existing Kubernetes tools. Before you start the installation, ensure that you have met the [prerequisites](/edge/installing-edge/#prerequisites).

You will need Helm version 3.x available on your system. Refer to [Installing Helm](https://helm.sh/docs/intro/install/) for the installation instructions.

{{< c8y-admon-info >}}
Edge has been tested and officially supported on Kubernetes version 1.34.x, the latest GA version at the time of release. Support is limited to this version. We aim to support deployments on CNCF-certified Kubernetes distributions provided they use upstream Kubernetes version 1.34.x and meet the documented resource and environment prerequisites. We are committed to maintaining alignment with the Kubernetes support lifecycle and will validate and support newer versions in future maintenance releases, ensuring continuity when version 1.34.x reaches end-of-life.

**Important:**
* Edge requires that your Kubernetes cluster has support for **LoadBalancer services**.
* Edge requires that your Kubernetes cluster does not have an **Ingress provider** (for example, Traefik) enabled on common ports that would block those used by Edge, such as ports 80 and 443.
* Edge requires that your Kubernetes cluster has **dynamic volume provisioning** enabled with a default storage class.
* Edge is tested and supported on **single-node Kubernetes clusters** only.
{{< /c8y-admon-info >}}

Because resource consumption can be very use-case specific, many containers have memory limits significantly higher than the memory request. Workloads that consume a lot of memory can result in inevitable out-of-memory kills of processes on the host. In order to protect the underlying operating system and Kubernetes infrastructure from this, we recommend setting reserved resources. See [Reserve Compute Resources for System Daemons](https://kubernetes.io/docs/tasks/administer-cluster/reserve-compute-resources/) for more details.

### Installing the Edge operator {#installing-edge-operator}
The Edge operator is available as a Helm chart in the Edge registry, and can be installed like any other chart. You will need your registry credentials, which can be acquired from [product support](/additional-resources/contacting-support/). Assuming you are installing the {{< c8y-edge-current-version >}} release of Edge, and that you wish all Edge workloads to be running in the namespace `c8yedge`, run the following command:
```shell
helm registry login registry.c8y.io --username="<Edge registry username>" --password="<Edge registry password>"

helm upgrade --install c8yedge-operator oci://registry.c8y.io/edge/helm-charts/cumulocity-iot-edge-operator \
    --version={{< c8y-edge-current-version >}} \
    --namespace c8yedge \
    --create-namespace \
    --set imageCredentials.username="<Edge registry username>" \
    --set imageCredentials.password="<Edge registry password>" \
    --wait
```

{{< c8y-admon-info >}}
If you are installing Edge on an environment that has no or limited internet access, we strongly recommend using the **c8yedge** tool for installing and upgrading Edge.
{{< /c8y-admon-info >}}

Run the following command to follow the logs for the Edge operator pod:
```shell
kubectl logs -f -n c8yedge deployment/c8yedge-operator-controller-manager manager
```

### Installing Edge
Download and edit the Edge CR ([c8yedge.yaml](/files/edge/c8yedge.yaml)), before applying it to your Kubernetes cluster by running the command below:

```bash
kubectl apply -f c8yedge.yaml
```
This command will complete immediately, and the installation will proceed in the background. See [Monitoring changes](/edge/manage-edge/#monitoring-changes) to track the progress of the installation.

For more information about the structure and configuration options available in the Edge CR, see [Edge custom resource](/edge/edge-custom-resource-definition/).

### Configuring the Edge operator with a proxy and trusted TLS/SSL certificates

You can configure {{< product-c8y-iot >}} Edge operator to:
  - route outbound internet traffic through the proxy server, when it is deployed behind a proxy server
  - trust the TLS/SSL certificates presented by external endpoints

To configure proxy settings and trusted certificates, create or update a ConfigMap in the `c8yedge` namespace (or the namespace where Edge is deployed) with the required configuration keys described below:
  - `http_proxy` - URL of the HTTP proxy server
  - `https_proxy` - URL of the HTTPS proxy server
  - `socks_proxy` - URL of the SOCKS proxy server
  - `no_proxy` - Comma-separated list of domain suffixes, IP addresses, or CIDR ranges that should bypass the proxy. This list must include:
      - {{< management-tenant >}} and the Edge tenant domain names
      - Kubernetes Pod CIDR (Cluster pod IP address range)
      - Kubernetes Service CIDR (Cluster service IP address range)
      - Any additional domains, hosts or IP addresses that should bypass the proxy
      Example: `127.0.0.1,::1,localhost,.svc,.cluster.local,cumulocity,<edge domain names, e.g. management-myown.iot.com,myown.iot.com>,<kubernetes cluster IP range, e.g. 10.43.0.0/16>`
  - `ca.crt` - One or more certificates in PEM format that the Edge should trust in addition to the certificates already included in the system trust store. Multiple certificates can be provided by concatenating them into a single PEM bundle.

The following example shows a ConfigMap with proxy settings and trusted certificates:

```yaml
##
## Optional ConfigMap used to configure:
##   - Proxy settings for accessing external endpoints
##   - Additional trusted TLS/SSL certificates
##

apiVersion: v1
kind: ConfigMap
metadata:
  # Name of the ConfigMap
  name: c8yedge-operator-config
  
  # Namespace where the Edge operator is installed
  namespace: c8yedge
data:
  http_proxy: <HTTP Proxy URL>
  https_proxy: <HTTPS Proxy URL>
  socks_proxy: <SOCKS Proxy URL>

  # Comma-separated list of domain suffixes, IP addresses, or CIDR ranges that should bypass the proxy
  no_proxy: 127.0.0.1,::1,localhost,.svc,.cluster.local,cumulocity,<edge domain names, e.g. management-myown.iot.com,myown.iot.com>,<kubernetes cluster IP range, e.g. 10.43.0.0/16>

  # Trusted TLS/SSL certificates in PEM format
  ca.crt: |
    <CA_CERTIFICATES_TO_TRUST>
```

After creating or updating the ConfigMap, configure the Edge operator to use it by setting the `operatorConfigCMName` Helm value during installation or upgrade:
```shell
helm registry login registry.c8y.io --username="<Edge registry username>" --password="<Edge registry password>"

helm upgrade --install c8yedge-operator oci://registry.c8y.io/edge/helm-charts/cumulocity-iot-edge-operator \
    --version={{< c8y-edge-current-version >}} \
    --namespace c8yedge \
    --create-namespace \
    --set imageCredentials.username="<Edge registry username>" \
    --set imageCredentials.password="<Edge registry password>" \
    --set operatorConfigCMName="c8yedge-operator-config" \
    --wait
```
