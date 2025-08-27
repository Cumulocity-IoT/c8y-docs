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
helm login registry.c8y.io --username="<Edge registry username>" --password="<Edge registry password>"

helm upgrade --install c8yedge-operator oci://registry.c8y.io/edge/helm-charts/cumulocity-iot-edge-operator \
    --version={{< c8y-edge-current-version >}} \
    --namespace c8yedge \
    --create-namespace \
    --set imageCredentials.username="<Edge registry username>" \
    --set imageCredentials.password="<Edge registry password>" \
    --wait
```

{{< c8y-admon-info >}}
If you are installing Edge from a [local/private registry](/edge-kubernetes/installing-edge-on-k8/#installing-edge-operator-offline), you will need to provide extra details to override the default registry `registry.c8y.io`.

* Change `oci://registry.c8y.io/...` in the above command line to `oci://<registry-hostname>:<registry-port>/...`
* Use whatever user name and password you have configured for the private registry, not the Edge registry credentials.
* Provide an additional argument `--set imageCredentials.registry=<registry-hostname>:<registry-port>`
* Provide an additional argument `--set image.repository=<registry-hostname>:<registry-port>/edge/helm-charts/cumulocity-iot-edge-operator`
{{< /c8y-admon-info >}}

Run the following command to follow the logs for the Edge operator pod:
```shell
kubectl logs -f -n c8yedge deployment/c8yedge-operator-controller-manager manager
```

### Installing the Edge operator (offline) {#installing-edge-operator-offline}
Frequently, portions of a data center might not have access to the Internet, even via proxy servers. You can still install Edge in such an environment, but you must make the required software, Helm Charts and Docker images, available to the disconnected environment through an [Open Container Initiative](https://opencontainers.org/) (OCI) compliant private registry.

To enable this, you need to have an OCI compliant registry available in the network which is accessible to the Kubernetes cluster in which you intend to install Edge. You would also need a workstation that has full internet access, to pull the required software from the [{{< company-c8y >}} registry](https://registry.c8y.io/) and push them into the private registry installed or available in the restricted network.

#### Installing a private registry
Any OCI compliant registry can be used as a private registry, however, the Edge installation is tested with [Harbor](https://goharbor.io/) and [Nexus Repository OSS](https://www.sonatype.com/products/sonatype-nexus-oss).

Refer to [Harbor Installation and Configuration](https://goharbor.io/docs/2.11.0/install-config/) for installing Harbor and [Nexus Installation and Upgrades](https://help.sonatype.com/en/install-nexus-repository.html) for installing Nexus.

After installing and configuring a private registry, ensure that all the machines (the workstation and the Kubernetes cluster nodes) which need access to the private registry can resolve its domain or host and trust the private registry's certificate (if it is configured with a self-signed certificate).

#### Update /etc/hosts to resolve the domain
Run the below commands to update the `/etc/hosts` file on every machine (the workstation and the Kubernetes cluster nodes) which needs access to the private registry can resolve its domain or host:

```bash
PRIVATE_REGISTRY_HOSTNAME="<PRIVATE-REGISTRY-HOSTNAME>"  	# Change it with your private registry's domain or hostname
PRIVATE_REGISTRY_IP_ADDRESS="<PRIVATE-REGISTRY-IP-ADDRESS>" # Change it with your private registry's IP Address

# Update /etc/hosts to resolve the Harbor domain
echo "${PRIVATE_REGISTRY_IP_ADDRESS} ${PRIVATE_REGISTRY_HOSTNAME}" | sudo tee -a /etc/hosts
```

#### Update CoreDNS configuration
Run the commands below to extend the CoreDNS configuration of the Kubernetes cluster to enable resolution of the private registry's domain or host:
```bash
PRIVATE_REGISTRY_HOSTNAME="<PRIVATE-REGISTRY-HOSTNAME>"  	# Change it with your private registry's domain or hostname
PRIVATE_REGISTRY_IP_ADDRESS="<PRIVATE-REGISTRY-IP-ADDRESS>" # Change it with your private registry's IP Address

# Uses the hosts plugin to resolve the private registry's domain or hostname to its IP address
# The [fallthrough] directive allows the query to continue to the next server block if the name doesn’t match
COREDNS_CUSTOM_CONFIGMAP_NAME="coredns-custom"
KUBE_SYSTEM_NAMESPACE="kube-system"
KEY_NAME="private-registry.server"
KEY_VALUE=$(cat <<EOF
${PRIVATE_REGISTRY_HOSTNAME}:53 {
  hosts {
    ${PRIVATE_REGISTRY_IP_ADDRESS} ${PRIVATE_REGISTRY_HOSTNAME}
    fallthrough
  }
}
EOF
)

# Create or Patch the 'coredns-custom' ConfigMap
if ! kubectl get configmap "$COREDNS_CUSTOM_CONFIGMAP_NAME" -n "$KUBE_SYSTEM_NAMESPACE" >/dev/null 2>&1; then
  # Create the configmap
  kubectl create configmap "$COREDNS_CUSTOM_CONFIGMAP_NAME" -n "$KUBE_SYSTEM_NAMESPACE" \
    --from-literal="$KEY_NAME=$KEY_VALUE"
else
  # Patch the configmap
  kubectl patch configmap "$COREDNS_CUSTOM_CONFIGMAP_NAME" \
    -n "$KUBE_SYSTEM_NAMESPACE" --type merge \
    -p "{\"data\": {\"$KEY_NAME\": \"$(echo "$KEY_VALUE" | sed ':a;N;$!ba;s/\n/\\n/g')\"}}"
fi

# Restart CoreDNS Deployment to apply changes
kubectl rollout restart deployment coredns -n kube-system

# Wait until CoreDNS pods are ready
kubectl rollout status deployment coredns -n kube-system
```

#### Trust the private registry's certificate
Run the below commands to trust the private regsitry's certificate (if it is configured with a self-signed certificate), on every machine (the workstation and the Kubernetes cluster nodes) which needs access to the private registry including the Kubernetes cluster nodes:

```bash
sudo sh -c '
PRIVATE_REGISTRY_HOST="<PRIVATE-REGISTRY-HOSTNAME>:<PRIVATE-REGISTRY-PORT>"  # Change it with your private registry domain or hostname:port or ip-address:port

PRIVATE_REGISTRY_CA_CERT=$(echo quit | openssl s_client -showcerts -servername ${PRIVATE_REGISTRY_HOST} -connect ${PRIVATE_REGISTRY_HOST}) && \
if command -v "update-ca-certificates" > /dev/null 2>&1; then
	mkdir -p /usr/local/share/ca-certificates
	echo "${PRIVATE_REGISTRY_CA_CERT}" > /usr/local/share/ca-certificates/private-registry-ca.crt
	update-ca-certificates
elif command -v "update-ca-trust" > /dev/null 2>&1; then
	mkdir -p /etc/pki/tls/certs
	echo "${PRIVATE_REGISTRY_CA_CERT}" > /etc/pki/tls/certs/private-registry-ca.crt
	update-ca-trust extract
fi
'
```
{{< c8y-admon-important >}}
You should restart the container runtime and Kubernetes cluster after running the above commands for the changes to take effect. For example, you can restart k3s using `sudo systemctl restart k3s` or `sudo service k3s restart` commands and docker using `sudo systemctl restart docker` or `sudo service docker restart` commands.
{{< /c8y-admon-important >}}

#### Download and publish required software to the private registry
This section outlines the steps to download the required software from the [{{< company-c8y >}} registry](https://registry.c8y.io/) and publish them to the private registry.

For this you need a workstation with full internet access to download the required software from the remote registry and push them into the private registry. Make sure this workstation meets the following prerequisites.

|<div style="width:140px">Item</div>|Details|
|:---|:---|
|Workstation|A workstation that has full internet access to pull the required software from the remote registry and push them into the private registry.|
|Python 3|Install Python 3. Refer to [Python Setup and Usage](https://docs.python.org/3/using/index.html) for installing Python 3 required to run the registry sync script.|
|Docker CLI|Install `docker-ce` and `docker-ce-cli` packages. Refer to [Installing Docker](https://docs.docker.com/engine/install/) for installation instructions.|
|Helm version 3.x|Refer to [Installing Helm](https://helm.sh/docs/intro/install/) for the installation instructions.|
|ORAS CLI version 1.0.0|OCI Registry As Storage (ORAS) CLI is used to publish non-container artifacts to the Harbor registry. Refer to [Installing ORAS CLI](https://oras.land/docs/installation) for installation instructions.|  

##### Install registry sync script
To install registry synchronization script, run the commands below:

```bash
pip install --force-reinstall https://download.cumulocity.com/Cumulocity-Edge/Installer/{{< c8y-edge-current-version >}}/c8yedge_registry_sync-{{< c8y-edge-current-version >}}-py3-none-any.whl
```

##### Run registry sync script
To download the required software from the [{{< company-c8y >}} registry](https://registry.c8y.io/) and publish them to the private registry, run the command below:

{{< c8y-admon-info >}}
If your private registry is a Harbor registry, you need to pass an extra option `--target-registry-type=HARBOR` to the instruct the script to create the required projects before publishing the required software to it.

*Use `-h or --help` option to display the usage details.*
{{< /c8y-admon-info >}}

```bash
EDGE_REGISTRY_USER="<EDGE-REGISTRY-USER>"     	# Edge registry credentials can be obtained from the {{< company-c8y >}} logistics team for your region
EDGE_REGISTRY_PASSWORD="<EDGE-REGISTRY-PASS>" 	# Edge registry credentials can be obtained from the {{< company-c8y >}} logistics team for your region

PRIVATE_REGISTRY_HOST="<PRIVATE-REGISTRY-HOSTNAME>:<PRIVATE-REGISTRY-PORT>"  # Change it with your private registry domain or hostname:port or ip-address:port
PRIVATE_REGISTRY_USERNAME="<PRIVATE-REGISTRY-USER>"                          # Change it with the credentials to access your private registry
PRIVATE_REGISTRY_PASSWORD="<PRIVATE-REGISTRY-PASSWORD>"                      # Change it with the credentials to access your private registry

c8yedge_registry_sync sync -v {{< c8y-edge-current-version >}} -sr registry.c8y.io -sru "${EDGE_REGISTRY_USER}" -srp "${EDGE_REGISTRY_PASSWORD}" -tr "${PRIVATE_REGISTRY_HOST}" -tru "${PRIVATE_REGISTRY_USERNAME}" -trp "${PRIVATE_REGISTRY_PASSWORD}" --dryrun False
```

{{< c8y-admon-info >}}
[Contact product support](/additional-resources/contacting-support/) to request the Edge registry credentials.
{{< /c8y-admon-info >}}

#### Update custom-environment-variables ConfigMap
Run the below commands to create or update the custom-environment-variables ConfigMap with key "ca.crt" for the Edge operator to trust the private registry's certificate (if it is configured with a self-signed certificate):

```bash
EDGE_NAMESPACE=c8yedge                    									 # Change namespace name if you want to deploy Edge operator and Edge in a different namespace

PRIVATE_REGISTRY_HOST="<PRIVATE-REGISTRY-HOSTNAME>:<PRIVATE-REGISTRY-PORT>"  # Change it with your private registry domain or hostname:port or ip-address:port

PRIVATE_REGISTRY_CA_CERT=$(echo quit | openssl s_client -showcerts -servername ${PRIVATE_REGISTRY_HOST} -connect ${PRIVATE_REGISTRY_HOST})
mkdir -p /tmp
echo "${PRIVATE_REGISTRY_CA_CERT}" > /tmp/private-registry-ca.crt

# Create/Update custom-environment-variables ConfigMap with key "ca.crt" for the edge operator to trust
kubectl create namespace "${EDGE_NAMESPACE}" --dry-run=client -o yaml | kubectl apply -f -
kubectl create configmap custom-environment-variables -n "${EDGE_NAMESPACE}" --from-file=ca.crt="/tmp/private-registry-ca.crt" --dry-run=client -o yaml | kubectl apply -f -
```

#### Installing the Edge operator
Continue with installing the Edge operator by following the instructions in [Installing the Edge operator](/edge-kubernetes/installing-edge-on-k8/#installing-edge-operator)  passing the private registry's host (`-r` option) as &lt;private-registry-hostname&gt;:&lt;private-registry-port&gt; and the respective registry credentials when prompted.


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
