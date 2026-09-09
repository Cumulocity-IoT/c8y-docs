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
    helm install cumulocity-iot-edge-operator oci://registry.c8y.io/edge/helm-charts/cumulocity-iot-edge-operator \
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

After the Edge operator is installed successfully, continue with the standard Edge installation procedure. See [Install Edge](/edge/installing-edge/#install-edge-using-kubectl-command) to install Edge by applying the Edge CR.

### Install Edge operator from private OCI registry {#install-edge-operator-from-private-registry}
You can install the Edge operator using Helm charts and container images hosted in a private [Open Container Initiative](https://opencontainers.org/) (OCI) compliant registry. This is useful for organizations that require strict control over container image distribution.

Before you begin, ensure that you have the following:
* **Tooling:** The c8yedge tool to sync Edge artifacts. See [Downloading c8yedge](/edge/installing-edge/#downloading-c8yedge).
* **Private registry** A running OCI-compliant registry that is accessible from the environment where you will install the Edge operator.

#### Step 1: Sync Edge artifacts to your private registry {#sync-edge-artifacts-to-private-registry}
Choose one of the following synchronization methods based on the network connectivity of your environment.

* **Direct Sync (Online)**
  <br>Run the `c8yedge registry-sync` command on a machine that has access to both the internet and your private registry.

* **Offline Package (Air-gapped)**
  <br>If no single machine has access to both the internet and your private registry, use an offline package to transfer the required artifacts:
  
  1. **Create the offline package** by running `c8yedge package` on a machine with internet access.
  2. **Transfer the generated tarball and c8yedge binary** to a machine that has access to the private registry. For example, the generated tarball might be named `c8yedge-{{< c8y-edge-current-version >}}_0_0.tar`.
  3. **Sync the artifacts to the private registry** by running the `c8yedge registry-sync -s "<OFFLINE-PACKAGE-FILE>"` command on the machine with access to the private registry.

{{< c8y-admon-info >}}
* You can discover more options with `c8yedge package --help` and `c8yedge registry-sync --help`, such as the ability to sync a specific Edge version.
* Record the **root path in the target registry** that you choose during the sync process. You will need this when installing the operator.
{{< /c8y-admon-info >}}

#### Step 2: Install Edge operator
Once the Edge artifacts are available in your private registry, install the Edge operator using Helm.

1. **Authenticate with your registry:**
    ```shell
    helm registry login <PRIVATE-REGISTRY-HOST> \
      --username="<PRIVATE-REGISTRY-USERNAME>" \
      --password="<PRIVATE-REGISTRY-PASSWORD>"
    ```
1. **Install the operator:**
    ```shell
    helm install cumulocity-iot-edge-operator oci://<PRIVATE-REGISTRY-HOST>/<REPOSITORY-ROOT-PATH>/edge/helm-charts/cumulocity-iot-edge-operator \
      --version="{{< c8y-edge-current-version >}}.0.x" \
      --namespace c8yedge \
      --create-namespace \
      --set image.repository="<PRIVATE-REGISTRY-HOST>/<REPOSITORY-ROOT-PATH>/edge/cumulocity-iot-edge-operator" \
      --set imageCredentials.username="<PRIVATE-REGISTRY-USERNAME>" \
      --set imageCredentials.password="<PRIVATE-REGISTRY-PASSWORD>" \
      --wait
    ```
1. **Verify the installation:**
    <br>Follow the operator logs to verify that the operator starts successfully:
    ```shell
    kubectl logs -f --namespace c8yedge deployment/c8yedge-operator-controller-manager manager
    ```

After the Edge operator is installed successfully, continue with the standard Edge installation procedure. See [Install Edge](/edge/installing-edge/#install-edge-using-kubectl-command) to install Edge by applying the Edge CR.

### Install Edge {#install-edge-using-kubectl-command}
Download and edit the Edge CR ([c8yedge.yaml](/files/edge/c8yedge.yaml)), before applying it to your Kubernetes cluster by running the command below:

```bash
kubectl apply -f c8yedge.yaml
```
This command will complete immediately, and the installation will proceed in the background. See [Monitoring changes](/edge/manage-edge/#monitoring-changes) to track the progress of the installation.

For more information about the structure and configuration options available in the Edge CR, see [Edge custom resource](/edge/edge-custom-resource-definition/).
