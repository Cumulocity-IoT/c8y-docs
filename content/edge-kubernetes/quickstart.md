---
weight: 10
title: Quickstart
layout: bundle
sector:
  - edge_server
---

This section helps you quickly install {{< product-c8y-iot >}} Edge with default configuration. The [installation](/edge-kubernetes/installing-edge-on-k8/) section covers in greater detail how to install and configure Edge for production deployments.

## Install Edge
Edge provides a command-line tool (**c8yedge**), a convenient way to install Edge on a [Lightweight Kubernetes (K3s)](https://docs.k3s.io/installation) cluster using a guided CLI-based workflow. You can download the tool from the [{{< company-c8y >}} Download Center](https://download.cumulocity.com/Cumulocity-Edge) or by running the following commands:

```shell
curl -sfL https://download.cumulocity.com/Cumulocity-Edge/{{< c8y-edge-current-version >}}/c8yedge -o c8yedge
chmod +x c8yedge
sudo mv c8yedge /usr/local/bin/
```

Before proceeding, ensure that you have met the [prerequisites](/edge-kubernetes/installing-edge-on-k8/#prerequisites) and applied the necessary [operating system configurations required by K3s](https://docs.k3s.io/installation/requirements#operating-systems).

To install Edge, execute the following command and follow the interactive prompts:
```shell
sudo c8yedge install
```
{{< c8y-admon-info >}}
[Contact product support](/additional-resources/contacting-support/) to request the Edge registry credentials.
{{< /c8y-admon-info >}}

Upon successful installation, the tool will exit automatically.


To sign in to Edge, refer to the instructions at the start of the [**Accessing Edge**](/edge-kubernetes/installing-edge-on-k8/#accessing-edge) section. You can later update the domain and license to match your environment by following the steps outlined in [**Modifying Edge**](/edge-kubernetes/manage-edge/#modify-edge).
