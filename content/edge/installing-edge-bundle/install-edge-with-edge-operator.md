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

### Installing the Edge operator from the Edge registry {#installing-edge-operator-from-edge-registry}
The Edge operator is available as a Helm chart and a container image in the [Edge registry](https://registry.c8y.io/), and can be installed like any other chart. You will need your registry credentials, which can be acquired from [product support](/additional-resources/contacting-support/). Assuming you are installing the {{< c8y-edge-current-version >}} release of Edge, and that you wish all Edge workloads to be running in the namespace `c8yedge`, run the following commands:

1. **Authenticate with Edge registry:**
    ```shell
    helm registry login registry.c8y.io \
      --username="<Edge registry username>" \
      --password="<Edge registry password>"
    ```
1. **Install the operator:**
    ```shell
    helm upgrade --install cumulocity-iot-edge-operator oci://registry.c8y.io/edge/helm-charts/cumulocity-iot-edge-operator \
      --version="{{< c8y-edge-current-version >}}" \
      --namespace c8yedge \
      --create-namespace \
      --set imageCredentials.username="<Edge registry username>" \
      --set imageCredentials.password="<Edge registry password>" \
      --wait
    ```
1. **Verify the installation:**
    <br>Follow the operator logs to ensure successful startup:
    ```shell
    kubectl logs -f --namespace c8yedge deployment/c8yedge-operator-controller-manager manager
    ```

{{< c8y-admon-info >}}
If you are installing Edge on an environment that has no or limited internet access, we strongly recommend using the **c8yedge** tool for installing and upgrading Edge.
{{< /c8y-admon-info >}}

### Installing the Edge operator from a private OCI registry {#installing-edge-operator-from-private-registry}
You can install the Edge operator using Helm charts and container images hosted in a private [Open Container Initiative](https://opencontainers.org/) (OCI) compliant registry. This is the recommended approach for organizations requiring strict control over container image distribution.

To complete this installation, you will need:
* **Workstation:** A machine with full internet access to download artifacts.
* **Target Environment:** A Kubernetes cluster with access to your private, OCI-compliant registry.
* **Tooling:** The c8yedge tool (see [Downloading c8yedge](/edge/installing-edge/#downloading-c8yedge)).

#### Step 1: Sync Edge artifacts to your private registry {#sync-edge-artifacts-to-private-registry}
Depending on your environment's network connectivity, choose the appropriate synchronization method below.

* **Direct Sync (Online)**
  <br>If your environment has direct internet access, use the c8yedge tool to sync artifacts directly:
  ```bash
  c8yedge registry-sync
  ```

* **Offline Package (Air-gapped)**
  <br>If you are working in an air-gapped environment, execute these steps to sync your artifacts:
  
  1. **Create the offline package** on an internet-connected machine:
      ```bash
      c8yedge package
      ```
  2. **Transfer the generated tarball** (for example, `c8yedge-{{< c8y-edge-current-version >}}_0_0.tar`) and the c8yedge binary to your air-gapped environment. 
  3. **Sync to the private registry** from within the air-gapped environment:
      ```bash
      c8yedge registry-sync -s "<OFFLINE-PACKAGE-FILE>"
      ```

{{< c8y-admon-info >}}
* You can discover more options with `c8yedge package --help` and `c8yedge registry-sync --help`, such as the ability to sync a very specific Edge version.
* Record the **Root path in the target registry** provided during the sync process. You will need this for installing the operator.
{{< /c8y-admon-info >}}

#### Step 2: Install the Edge operator
Once the artifacts are available in your private registry, install the operator using Helm.

1. **Authenticate with your registry:**
    ```shell
    helm registry login <PRIVATE-REGISTRY-HOST> \
      --username="<PRIVATE-REGISTRY-USERNAME>" \
      --password="<PRIVATE-REGISTRY-PASSWORD>"
    ```
1. **Install the operator:**
    ```shell
    helm upgrade --install cumulocity-iot-edge-operator oci://<PRIVATE-REGISTRY-HOST>/<REPOSITORY-ROOT-PATH>/edge/helm-charts/cumulocity-iot-edge-operator \
      --version="{{< c8y-edge-current-version >}}.0.x" \
      --namespace c8yedge \
      --create-namespace \
      --set image.repository="<PRIVATE-REGISTRY-HOST>/<REPOSITORY-ROOT-PATH>/edge/cumulocity-iot-edge-operator" \
      --set imageCredentials.username="<PRIVATE-REGISTRY-USERNAME>" \
      --set imageCredentials.password="<PRIVATE-REGISTRY-PASSWORD>" \
      --wait
    ```
1. **Verify the installation:**
    <br>Follow the operator logs to ensure successful startup:
    ```shell
    kubectl logs -f --namespace c8yedge deployment/c8yedge-operator-controller-manager manager
    ```

### Installing Edge
Download and edit the Edge CR ([c8yedge.yaml](/files/edge/c8yedge.yaml)), before applying it to your Kubernetes cluster by running the command below:

```bash
kubectl apply -f c8yedge.yaml
```
This command will complete immediately, and the installation will proceed in the background. See [Monitoring changes](/edge/manage-edge/#monitoring-changes) to track the progress of the installation.

For more information about the structure and configuration options available in the Edge CR, see [Edge custom resource](/edge/edge-custom-resource-definition/).

### Configuring proxy

When {{< product-c8y-iot >}} Edge is deployed behind a proxy, it must be configured to communicate with external endpoints over the internet through the proxy server.
To configure Edge to use a proxy, you must create or update a ConfigMap named `custom-environment-variables` in the c8yedge namespace (or the one you deployed Edge into) with the required proxy settings. The keys `http_proxy`, `https_proxy` and `socks_proxy` must be set to the URLs of the HTTP, HTTPS and Socks proxies, respectively. The key `no_proxy` must be set to specify a comma-separated list of domain suffixes, IP addresses, or CIDR ranges that Edge should bypass the proxy server for.

Here is an example of a ConfigMap with proxy settings:

```yaml
##
## An optional ConfigMap to configure the Edge operator with
##    - Proxy details when accessing external endpoints through a Proxy
##    - TLS/SSL certificates to trust
##
## http_proxy, https_proxy and optionally socks_proxy must be configured with the relevant URLs.
## no_proxy must be configured with a comma-separated list of addresses or domains for which the proxy should be bypassed.
##

apiVersion: v1
kind: ConfigMap
metadata:
  ## The name is fixed and cannot be changed.
  name: custom-environment-variables
  ## Namespace name into which you installed the Edge operator.
  namespace: c8yedge
data:
  http_proxy: <HTTP Proxy URL>
  https_proxy: <HTTPS Proxy URL>
  socks_proxy: <SOCKS Proxy URL>

  ## A comma-separated list of addresses or domains for which the proxy will be bypassed.
  ## This must be configured with the specified entries, Edge domain name, Kubernetes Pod CIDR (Cluster Pod IP Address Range), 
  ## Kubernetes Service CIDR (Cluster Service IP Address Range) and any other domains, hosts or IPs 
  ## you want to bypass the proxy when accessed.
  no_proxy: 127.0.0.1,::1,localhost,.svc,.cluster.local,cumulocity,<edge domain name, for example, myown.iot.com>,<kubernetes cluster IP range, for example, 10.43.0.0/16>

  ## TLS/SSL certificates in PEM format that the Edge operator can trust, in addition to those included in the default system trust store.
  ## You can provide multiple TLS/SSL certificates for trust by combining them into a single string.
  ca.crt: <CA-CERTIFICATES TO TRUST>
```

By configuring Edge with the appropriate proxy settings, you ensure that it can seamlessly communicate with external endpoints through the proxy server, allowing it to function effectively in environments where proxy usage is mandated.

The table below provides more information:

|<div style="width:150px">Field</div>|Required|<div style="width:115px">Type</div>|Default|Description|
|:---|:---|:---|:---|:---|
|http_proxy|No|String||Specifies the URL of the HTTP proxy to be used for network connections.|
|https_proxy|No|String||Specifies the URL of the HTTPS proxy to be used for secure network connections.|
|socks_proxy|No|String||Specifies the URL of a SOCKS proxy.|
|no_proxy|No|String||Specifies a comma-separated list of addresses or domains for which the proxy will be bypassed. This is configured with the specified entries, Edge domain name, Kubernetes Pod CIDR (Cluster Pod IP Address Range), Kubernetes Service CIDR (Cluster Service IP Address Range) and any other domains, hosts or IPs you want to bypass the proxy when accessed.|
|ca.crt|No|String||TLS/SSL certificates in PEM format that the Edge operator can trust, in addition to those included in the default system trust store.<br>You can provide multiple TLS/SSL certificates for trust by combining them into a single string.|
