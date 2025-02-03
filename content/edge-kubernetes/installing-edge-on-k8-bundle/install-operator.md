---
weight: 15
title: Installing the Edge operator
layout: redirect
---

To begin, create a new single-node Kubernetes cluster with the Kubernetes distribution of your choice, and configure `kubectl` to use that cluster. See [Prerequisites](/edge-kubernetes/installing-edge-on-k8/#prerequisites) for the supported Kubernetes distributions and versions.

A script to install the Edge operator is available at [c8yedge-operator-install.sh](/files/edge-k8s/c8yedge-operator-install.sh).

To install the Edge operator, download and run the script, refer to a sample command below. Enter the version (`-v` option, for example, {{< c8y-edge-current-version >}}.0.0) you want to install, registry hostname (`-r` option) and the registry credentials you received along with the license when prompted. *Use `-h` option to display the usage details.*

{{< c8y-admon-info >}}
If you are installing Edge from a local/private registry, provide the hostname (`-r` option) as <registry-hostname>:<registry-port> and the respective credentials when prompted.
{{< /c8y-admon-info >}}

```shell
curl -sfL {{< link-c8y-doc-baseurl >}}files/edge-k8s/c8yedge-operator-install.sh -O && bash ./c8yedge-operator-install.sh -v "{{< c8y-edge-current-version >}}.0.0" -r registry.c8y.io
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
