---
weight: 50
title: Installing with the Edge Operator
layout: redirect
---

Before you start the installation, ensure that you have fulfilled the [prerequisites](/edge-kubernetes/installing-edge-on-k8/#prerequisites) and configured the storage as described in [Configuring storage](/edge-kubernetes/installing-edge-on-k8/#configuring-storage).

To begin, create a new single-node Kubernetes cluster with the Kubernetes version and the platform of your choice, and configure `kubectl` to use that cluster. See [Prerequisites](/edge-kubernetes/installing-edge-on-k8/#prerequisites) for the supported Kubernetes versions and platforms.

### Installing the Edge operator {#installing-edge-operator}
A script to install the Edge operator is available at [c8yedge-operator-install.sh](/files/edge-k8s/c8yedge-operator-install.sh).

To install the Edge operator, download and run the script, refer to a sample command below. Enter the version (`-v` option, for example, {{< c8y-edge-version >}}) you want to install, registry hostname (`-r` option) and the registry credentials you received along with the license when prompted. *Use `-h` option to display the usage details.*

{{< c8y-admon-info >}}
If you are installing Edge from a local/private registry, provide the hostname (`-r` option) as <registry-hostname>:<registry-port> and the respective credentials when prompted.
{{< /c8y-admon-info >}}

```shell
curl -sfL {{< link-c8y-doc-baseurl >}}files/edge-k8s/c8yedge-operator-install.sh -O && bash ./c8yedge-operator-install.sh -v "{{< c8y-edge-version >}}" -r registry.c8y.io
```
Provide the Edge operator registry credentials in the prompt:

```text
Enter username to access Edge operator registry:  
Enter password to access Edge operator registry:
```

{{< c8y-admon-info >}}
To request the Edge registry credentials, [contact product support](/additional-resources/contacting-support/).
{{< /c8y-admon-info >}}

By default, the Edge operator is deployed within the **c8yedge** namespace. If you wish to install the Edge operator and Edge in a different namespace, you can specify it using the `-n` option in the installation script.

Run the following command to follow the logs for the Edge operator pod:
```shell
kubectl logs -f -n c8yedge deployment/c8yedge-operator-controller-manager manager
```
{{< c8y-admon-info >}}
Substitute the namespace name *c8yedge* in the command above with the namespace name where you have installed the Edge operator.
{{< /c8y-admon-info >}}

### Installing the Edge operator (offline)
Frequently, portions of a data center might not have access to the Internet, even via proxy servers. You can still install Edge in such an environment, but you must make the required software, Helm Charts and Docker images, available to the disconnected environment through an [Open Container Initiative](https://opencontainers.org/) (OCI) compliant private registry.

To enable this, you need to have an OCI compliant registry available in the network which is accessible to the Kubernetes cluster in which you intend to install Edge. You would also need a workstation that has full internet access, to pull the required software from the [{{< company-c8y >}} registry](https://registry.c8y.io/) and push them into the private registry installed or available in the restricted network.

#### Installing a private registry
Any OCI compliant registry can be used as a private registry, however, the Edge installation is tested with [Harbor](https://goharbor.io/) and [Nexus Repository OSS](https://www.sonatype.com/products/sonatype-nexus-oss).

Refer to [Harbor Installation and Configuration](https://goharbor.io/docs/2.11.0/install-config/) for installing Harbor and [Nexus Installation and Upgrades](https://help.sonatype.com/en/install-nexus-repository.html) for installing Nexus.

After installing and configuring a private registry, ensure that all the machines (the workstation and the Kubernetes cluster nodes) which need access to the private registry can resolve its domain or host and trust the private regsitry's certificate (if it is configured with a self-signed certificate).

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
pip install --force-reinstall {{< link-c8y-doc-baseurl >}}files/edge-k8s/c8yedge_registry_sync-{{< c8y-edge-version >}}-py3-none-any.whl
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

c8yedge_registry_sync sync -v {{< c8y-edge-version >}} -sr registry.c8y.io -sru "${EDGE_REGISTRY_USER}" -srp "${EDGE_REGISTRY_PASSWORD}" -tr "${PRIVATE_REGISTRY_HOST}" -tru "${PRIVATE_REGISTRY_USERNAME}" -trp "${PRIVATE_REGISTRY_PASSWORD}" --dryrun False
```

{{< c8y-admon-info >}}
To request the Edge registry credentials, [contact product support](/additional-resources/contacting-support/).
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
For more information about the structure and configuration options available in the Edge CR, see [Edge Custom Resource](/edge-kubernetes/edge-custom-resource-definition/).


### Verifying the Edge installation {#verifying-the-edge-installation}

To monitor the installation progress, run the command below:

```shell
kubectl describe edge c8yedge -n c8yedge
```
This command allows you to view the details about the installation of *c8yedge* in the *c8yedge* namespace.

{{< c8y-admon-info >}}
Substitute the Edge name and namespace name, which is currently *c8yedge* in the command, with the specific Edge name and namespace name you have specified in your Edge CR.
{{< /c8y-admon-info >}}

You can also follow the events raised for the Edge CR by running the command below:

```shell
kubectl get events -n c8yedge --field-selector involvedObject.name=c8yedge --watch
```

The **Events** section in the output of the `describe edge` command specifies the installation progress and the **Status** section displays the generation of the Edge CR which is being installed and its current state. Once the installation succeeds, the **Status** section also displays the generation of the CR which is deployed, Edge version, last deployed time/age, validation warnings, if any and some help commands for downloading the diagnostic logs, extracting the Root CA of the Edge operator generated TLS/SSL certificates.

A sample status output:
```yaml
Name:         c8yedge
Namespace:    c8yedge
Kind:         CumulocityIoTEdge

Metadata:
  Creation Timestamp:  2025-02-04T00:00:01Z
  Generation:          1

Spec:
  Version:             {{< c8y-edge-version >}}
  License Key:         ***************
  Company:             IoT Company
  Domain:              myown.iot.com
  Email:               myown@iot.com
  ....
  ....

Status:
  Deployed Generation:  1
  Last Deployed Time:  2025-02-04T00:00:01Z
  State:               Ready
  Version:             {{< c8y-edge-version >}}

  Help Commands:
    Download Logs:   
FILE_NAME="edge-diagnostic-archive-$(date +%Y%m%d%H%M%S).tar.gz" && \
kubectl exec -n edge-sample-logging logging-fluentd-0 -c fluentd -- tar -czvf /var/log/$FILE_NAME /var/log/edge && \
kubectl cp edge-sample-logging/logging-fluentd-0:/var/log/$FILE_NAME -c fluentd ./$FILE_NAME && \
kubectl exec -n edge-sample-logging logging-fluentd-0 -c fluentd -- rm /var/log/$FILE_NAME
```
A sample set of installation events:
```text
Events:
  Type     Reason            Age    From               Message
  ----     ------            ----   ----               -------
  Normal   Installing        15m    cumulocityiotedge  installing {{< product-c8y-iot >}} Edge version tagged as {{< c8y-edge-version >}}
…………
…………
  Normal   Installing        12m    cumulocityiotedge  finished installing mongo server
…………
…………
  Normal   Installing        8m     cumulocityiotedge  finished installing core
…………
…………
  Normal   Installing        5m     cumulocityiotedge  finished installing and updating microservices
…………
…………
  Normal   Installing        2m     cumulocityiotedge  finished installing thin-edge
…………
  Normal   Ready             1m     cumulocityiotedge  {{< product-c8y-iot >}} Edge installation is complete, and it's now running version {{< c8y-edge-version >}}
```
Before you continue, wait for the Edge CR status to reach the **Ready** state.
