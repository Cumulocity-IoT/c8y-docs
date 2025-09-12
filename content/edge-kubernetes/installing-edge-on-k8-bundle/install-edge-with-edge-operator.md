---
weight: 50
title: Installing with the Kubernetes-native approach
layout: redirect
---

This method is suitable for users who already have a Kubernetes cluster and want to install Edge using the Kubernetes-native approach. Before you start the installation, ensure that you have met the [prerequisites](/edge-kubernetes/installing-edge-on-k8/#prerequisites) and configured the storage as described in [Configuring storage](#configuring-storage).

You will need Helm version 3.x available on your system. Refer to [Installing Helm](https://helm.sh/docs/intro/install/) for the installation instructions.

{{< c8y-admon-info >}}
Edge has been tested and officially supported on Kubernetes version 1.32.x, the latest GA version at the time of release. Support is limited to this version. We aim to support deployments on CNCF-certified Kubernetes distributions provided they use upstream Kubernetes version 1.32.x and meet the documented resource and environment prerequisites. We are committed to maintaining alignment with the Kubernetes support lifecycle and will validate and support newer versions in future maintenance releases, ensuring continuity when version 1.32.x reaches end-of-life.

**Important:**
* Edge requires that your Kubernetes cluster has support for **LoadBalancer services**.
* Edge is tested and supported on **single-node Kubernetes clusters** only.
{{< /c8y-admon-info >}}

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
If you are installing Edge on an environment that has no or limited internet access, we strongly recommend using the `c8yedge` tool for installing and upgrading Edge.

If you have to use existing Kubernetes infrastructure, then using `c8yedge` will not be possible and you will have to provide a private registry and configure Edge to use it. See [Configuring Edge to use a private registry](/edge-kubernetes/configuring-private-registry/). After following those steps, you will need to modify the above command to use this new private registry.

* Change `oci://registry.c8y.io/...` in the above command line to `oci://<registry-hostname>:<registry-port>/...`
* Use whatever user name and password you have configured for the private registry, not the Edge registry credentials.
* Provide an additional argument `--set imageCredentials.registry=<registry-hostname>:<registry-port>`
* Provide an additional argument `--set image.repository=<registry-hostname>:<registry-port>/edge/helm-charts/cumulocity-iot-edge-operator`
{{< /c8y-admon-info >}}

Run the following command to follow the logs for the Edge operator pod:
```shell
kubectl logs -f -n c8yedge deployment/c8yedge-operator-controller-manager manager
```

### Installing Edge
Download and edit the Edge CR ([c8yedge.yaml](/files/edge-k8s/c8yedge.yaml)), before applying it to your Kubernetes cluster by running the command below:

```bash
kubectl apply -f c8yedge.yaml
```
This command will complete immediately, and the installation will proceed in the background. See [Monitoring changes](/edge-kubernetes/manage-edge/#monitoring-changes) to track the progress of the installation.

For more information about the structure and configuration options available in the Edge CR, see [Edge custom resource](/edge-kubernetes/edge-custom-resource-definition/).


### Configuring storage {#configuring-storage}

{{< c8y-admon-info >}}
You can ignore this section if your Kubernetes cluster is already configured for dynamic provisioning of Persistent Volumes (PVs) with a default storage class that you are happy with.

For example, a cluster created with [K3s](https://docs.k3s.io/installation) will dynamically provision all of the volumes required by Edge onto the local disk, with no configuration required.
{{< /c8y-admon-info >}}

Kubernetes makes physical storage devices available to your cluster in the form of two API resources, PersistentVolume and PersistentVolumeClaim.

A Persistent Volume (PV) is a storage resource in Kubernetes that is provisioned and managed independently from the Pods that use it. It provides a way to store data in a durable and persistent manner, even if the Pod that uses it is deleted or restarted.

PVs are typically used to store data that must be preserved across Pod restarts or rescheduling, such as databases or file systems. They can be backed by various storage technologies, such as local disks, network-attached storage (NAS), or cloud-based storage services.

To use a PV in Kubernetes, you must define a PersistentVolume object that describes the characteristics of the storage, such as capacity, access modes, and the storage-provider-specific details. Once the PV is created, you can create a PersistentVolumeClaim object that requests a specific amount of storage with specific access requirements. The Persistent Volume Claim (PVC) binds to a matching PV, and the Pod can then use the PVC to mount the storage and access the data.

By using PVs and PVCs, you can decouple the storage management from the application deployment, making it easier to manage and scale your applications in Kubernetes.

PVs represent cluster resources, while PVCs serve as requests for these resources and also serve as validation checks for the resource they request. Provisioning PVs can be done in two ways: statically or dynamically.

- **Static provisioning**: In this method, a cluster administrator manually creates PVs, specifying details about the actual storage available for cluster users. These PVs are registered in the Kubernetes API and are ready for consumption.

- **Dynamic provisioning**: When none of the statically created PVs match a PVC's requirements, the cluster can automatically provision storage on-demand, specifically tailored for the PVC. This dynamic provisioning relies on [StorageClasses](https://kubernetes.io/docs/concepts/storage/storage-classes/). To trigger dynamic provisioning, the PVC must request a StorageClass, and the administrator must have set up and configured that class accordingly. Claims that request an empty string (“”) for the class effectively disable dynamic provisioning for themselves. If no StorageClass is specified in a claim, it falls back to using a default StorageClass if one is configured in the cluster. To enable a default StorageClass, the cluster administrator must activate the `DefaultStorageClass` [admission controller](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#defaultstorageclass) on the API server. This can be achieved, for instance, by ensuring that DefaultStorageClass is included in the comma-delimited, ordered list of values for the --enable-admission-plugins flag of the API server component. For more details on API server command-line flags, refer to the [kube-apiserver](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/) documentation.


#### Persistent Volume Claims made by the Edge operator {#persistent-volume-claims-made-by-the-edge-operator}

The Edge operator requests three PVCs, as outlined in the table below. Each of these PVCs utilizes the StorageClass if specified within the **`spec.storageClassName`** field of the Edge CR.

- In case you omit the **`spec.storageClassName`**, the Edge operator requests PVCs without a StorageClass, thereby instructing Kubernetes to utilize the default StorageClass configured in the cluster.

- If you explicitly specify an empty StorageClass as **`""`**, the Edge operator requests PVCs with an empty StorageClass, thereby instructing Kubernetes to carry out static provisioning.

- Finally, if you specify the name of an existing StorageClass for which dynamic provisioning is enabled, the Operator requests PVCs with that class name, thereby instructing Kubernetes to utilize dynamic provisioning according to the specified class.

|<div style="width:150px">Persistent Volume</div>|<div style="width:400px">Persistent Volume Claim</div>|<div style="width:500px">Description</div>|
|:---|:---|:---|
|75 GB|`mongod-data-edge-db-rs0-0`|Claimed by the MongoDB server to retain application data. The default size is 75 GB, but this value can be adjusted using the `spec.mongodb.resources.requests.storage` field in the Edge CR file. For more details, see [Edge custom resource - MongoDB](/edge-kubernetes/edge-custom-resource-definition/#k8-edge-mongodb).|
|10 GB|`microservices-registry-data`|Claimed by the private docker registry to store microservice images.|
|5 GB|`edge-logs`|Claimed by the Edge logging component to store the application and system logs.|
|10 GB|`pulsar-bookie-ledgers-pulsar-bookie-0`|Claimed by the Pulsar Bookkeeper Ledgers pod, which is deployed only when the Messaging Service is enabled.|
|2 GB|`pulsar-bookie-journal-pulsar-bookie-0`|Claimed by the Pulsar Bookkeeper Journal pod, which is deployed only when the Messaging Service is enabled.|
|2 GB|`pulsar-zookeeper-data-pulsar-zookeeper-0`|Claimed by the Pulsar Zookeeper pod, which is deployed only when the Messaging Service is enabled.|
|30 GB|`dremio-master-volume-dremio-master-0`|Claimed by the Dremio master pod, which is deployed only when the DataHub is enabled.|
|30 GB|`dremio-executor-volume-dremio-executor-0`|Claimed by the Dremio executor pod, which is deployed only when the DataHub is enabled.|
|30 GB|`dremio-executor-cloud-cache-dremio-executor-0`|Claimed by the Dremio executor pod, which is deployed only when the DataHub is enabled.|
|2 GB|`datadir-zk-0`|Claimed by the Dremio Zookeeper pod, which is deployed only when the DataHub is enabled.|
|5 GB|`mysql-volume-datahub-mysql-0`|Claimed by the DataHub MySQL pod, which is deployed only when the DataHub is enabled.|

To guarantee the retention of physical storage even after the PVC is deleted (for example, when Edge is deleted) and to enable future storage expansion if needed, it's crucial to configure the StorageClass and/or the PVs with the following settings:

1. **Reclaim Policy:** Ensure that the reclaim policy is set to **`Retain`**. This setting preserves the storage even after the PVC deletion.
2. **Volume Expansion:** Set the volume expansion option to **`true`**. This setting enables the storage to be expanded when necessary.

Kubernetes provides a variety of persistent volume types, but two specific types enable Pod containers to access either a Network File System (NFS) or the cluster node's local filesystem (often set up as a NFS drive mapped to a local folder). This configuration is especially prevalent in on-premises deployments.

#### Static provisioning of PVs {#static-provisioning-of-pvs}

This section outlines the steps for configuring the Kubernetes cluster to enable Edge to utilize NFS as a source for the PVs. For additional storage options, refer to the [Kubernetes documentation](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).

- Storage provisioning by connecting directly to the NFS server via PV configuration

  - Download the [c8yedge-pv-nfs.yaml](/files/edge-k8s/c8yedge-pv-nfs.yaml) file.

  - Create and export the folders required for the 3 PVs defined in the *c8yedge-pv-nfs.yaml* file. Ensure that the user running Kubernetes server has read/write access to these folders.

  - Run the command below:
    ```shell
    kubectl apply -f c8yedge-pv-nfs.yaml
    ```

- Storage provisioning by mapping NFS drive to a local folder into the cluster node

  - Download the [c8yedge-pv-local-path.yaml](/files/edge-k8s/c8yedge-pv-local-path.yaml) file.

  - Create the folders in the local file system or mount NFS folders required for the 3 PVs defined in the *c8yedge-pv-local-path.yaml* file. Ensure that the user running Kubernetes server has read/write access to these folders.

  -  Run the command below:

     ```shell
     kubectl apply -f c8yedge-pv-local-path.yaml
     ```

{{< c8y-admon-info >}}
Since you manually created the PVs, you must specify an empty StorageClass as **`""`** in the **`spec.storageClassName`** field of the Edge CR for Kubernetes to carry out static provisioning, thereby binding PVC claims made by the Edge operator.
{{< /c8y-admon-info >}}
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
