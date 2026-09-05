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

### Install Edge operator from Edge registry {#install-edge-operator-from-edge-registry}
The Edge operator is available as a Helm chart and a container image in the [Edge registry](https://registry.c8y.io/), and can be installed like any other chart. You need your registry credentials, which can be acquired from [product support](/additional-resources/contacting-support/). Assuming you are installing the {{< c8y-edge-current-version >}} release of Edge, and that you wish all Edge workloads to be running in the namespace `c8yedge`, run the following commands:

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

### Install Edge operator from private OCI registry {#install-edge-operator-from-private-registry}
You can install the Edge operator using Helm charts and container images hosted in a private [Open Container Initiative](https://opencontainers.org/) (OCI) compliant registry. This is the recommended approach for organizations requiring strict control over container image distribution.

To complete this installation, you will need the following:
* **Workstation:** A machine with full internet access to download artifacts.
* **Target environment:** A Kubernetes cluster with access to your private, OCI-compliant registry.
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
* Record the **Root path in the target registry** provided during the sync process. You need this to install the operator.
{{< /c8y-admon-info >}}

#### Step 2: Install Edge operator
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

### Install Edge {#install-edge-using-kubectl-command}
Download and edit the Edge CR ([c8yedge.yaml](/files/edge/c8yedge.yaml)), before applying it to your Kubernetes cluster by running the command below:

```bash
kubectl apply -f c8yedge.yaml
```
This command will complete immediately, and the installation will proceed in the background. See [Monitoring changes](/edge/manage-edge/#monitoring-changes) to track the progress of the installation.

For more information about the structure and configuration options available in the Edge CR, see [Edge custom resource](/edge/edge-custom-resource-definition/).
