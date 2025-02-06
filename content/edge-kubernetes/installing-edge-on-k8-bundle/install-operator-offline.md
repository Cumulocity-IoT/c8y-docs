---
weight: 17
title: Installing the Edge operator (offline)
layout: redirect
---

Frequently, portions of a data center might not have access to the Internet, even via proxy servers. You can still install Edge in such an environment, but you must make the required software, Helm Charts and Docker images, available to the disconnected environment through an [Open Container Initiative](https://opencontainers.org/) (OCI) compliant private registry.

To enable this, you need to have an OCI compliant registry available in the network which is accessible to the Kubernetes cluster in which you intend to install Edge. You would also need a workstation that has full internet access, to pull the required software from the [{{< company-c8y >}} registry](https://registry.c8y.io/) and push them into the private registry installed or available in the restricted network.

### Installing a private registry
Any OCI compliant registry can be used as a private registry, however, the Edge installation is tested with [Harbor](https://goharbor.io/) and [Nexus Repository OSS](https://www.sonatype.com/products/sonatype-nexus-oss).

Refer to [Harbor Installation and Configuration](https://goharbor.io/docs/2.11.0/install-config/) for installing Harbor and [Nexus Installation and Upgrades](https://help.sonatype.com/en/installation-and-upgrades.html#installation-and-upgrades) for installing Nexus.

After installing and configuring a private registry, ensure that all the machines (the workstation and the Kubernetes cluster nodes) which need access to the private registry can resolve its domain or host and trust the private regsitry's certificate (if it is configured with a self-signed certificate).

### Update /etc/hosts to resolve the domain
Run the below commands to update the `/etc/hosts` file on every machine (the workstation and the Kubernetes cluster nodes) which needs access to the private registry can resolve its domain or host:

```bash
PRIVATE_REGISTRY_HOSTNAME="<PRIVATE-REGISTRY-HOSTNAME>"  	# Change it with your private registry's domain or hostname
PRIVATE_REGISTRY_IP_ADDRESS="<PRIVATE-REGISTRY-IP-ADDRESS>" # Change it with your private registry's IP Address

# Update /etc/hosts to resolve the Harbor domain
echo "${PRIVATE_REGISTRY_IP_ADDRESS} ${PRIVATE_REGISTRY_HOSTNAME}" | sudo tee -a /etc/hosts
```

### Update CoreDNS configuration
Run the commands below to modify the CoreDNS configuration of the Kubernetes cluster to enable resolution of the private registry's domain or host:
```bash
PRIVATE_REGISTRY_HOSTNAME="<PRIVATE-REGISTRY-HOSTNAME>"  	# Change it with your private registry's domain or hostname
PRIVATE_REGISTRY_IP_ADDRESS="<PRIVATE-REGISTRY-IP-ADDRESS>" # Change it with your private registry's IP Address

# Retrieve the existing NodeHosts value
EXISTING_NODEHOSTS=$(kubectl get configmap coredns -n kube-system -o jsonpath='{.data.NodeHosts}')
EXISTING_NODEHOSTS=$(echo -n "${EXISTING_NODEHOSTS}" | sed ':a;N;$!ba;s/\n/\\n/g')

# Append the new domain and IP address to the existing NodeHosts value
UPDATED_NODEHOSTS=$(echo "${EXISTING_NODEHOSTS}\\n${PRIVATE_REGISTRY_IP_ADDRESS} ${PRIVATE_REGISTRY_HOSTNAME}")

# Patch the CoreDNS ConfigMap with the updated NodeHosts value
kubectl patch configmap coredns -n kube-system --type merge -p "{\"data\":{\"NodeHosts\":\"${UPDATED_NODEHOSTS}\"}}"
```

### Trust the private registry's certificate
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

### Download and publish required software to the private registry
This section outlines the steps to download the required software from the [{{< company-c8y >}} registry](https://registry.c8y.io/) and publish them to the private registry.

For this you need a workstation with full internet access to download the required software from the remote registry and push them into the private registry. Make sure this workstation meets the following prerequisites.

|<div style="width:140px">Item</div>|Details|
|:---|:---|
|Workstation|A workstation that has full internet access to pull the required software from the remote registry and push them into the private registry.|
|Python 3|Install Python 3. Refer to [Python Setup and Usage](https://docs.python.org/3/using/index.html) for installing Python 3 required to run the registry sync script.|
|Docker CLI|Install `docker-ce` and `docker-ce-cli` packages. Refer to [Installing Docker](https://docs.docker.com/engine/install/) for installation instructions.|
|Helm version 3.x|Refer to [Installing Helm](https://helm.sh/docs/intro/install/) for the installation instructions.|
|ORAS CLI version 1.0.0|OCI Registry As Storage (ORAS) CLI is used to publish non-container artifacts to the Harbor registry. Refer to [Installing ORAS CLI](https://oras.land/docs/installation) for installation instructions.|  

#### Install registry sync script
To install registry synchronization script, run the commands below:

```bash
pip install --force-reinstall {{< link-c8y-doc-baseurl >}}files/edge-k8s/c8yedge_registry_sync-2025.0.0-py3-none-any.whl
```

#### Run registry sync script
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

### Update custom-environment-variables ConfigMap
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

### Installing the Edge operator
Continue with installing the Edge operator by following the instructions in [Installing the Edge operator](/edge-kubernetes/installing-edge-on-k8/#install-operator)  passing the private registry's host (`-r` option) as &lt;private-registry-hostname&gt;:&lt;private-registry-port&gt; and the respective registry credentials when prompted.
