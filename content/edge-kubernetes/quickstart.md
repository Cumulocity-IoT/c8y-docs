---
weight: 10
title: Quickstart
layout: bundle
sector:
  - edge_server
---
This section helps you quickly install {{< product-c8y-iot >}} Edge with default configuration. The [installation](/edge-kubernetes/installing-edge-on-k8/) section covers in greater detail how to install and configure Edge for production deployments.

## Install Edge
Edge provides a command-line tool (`c8yedge`), a convenient way to install Edge on a [Lightweight Kubernetes (K3s)](https://docs.k3s.io/installation) cluster using a guided CLI-based workflow. This tool is available at https://download.cumulocity.com/Cumulocity-Edge/Installer. 

Make sure your hardware meets the requirements specified in [Prerequisites](/edge-kubernetes/installing-edge-on-k8/#prerequisites) before proceeding.

{{< c8y-admon-info >}}
Edge registry credentials needed for installing Edge are supplied to you along with your license. [Contact product support](/additional-resources/contacting-support/) to request the registry credentials.
{{< /c8y-admon-info >}}

To install Edge using the `c8yedge` tool, just run the below command and follow the prompts. The tool exits upon successful installation.
```shell
curl -sfL https://download.cumulocity.com/Cumulocity-Edge/Installer/c8yedge -O && ./c8yedge install --registry registry.c8y.io>
```

See [**Verifying the Edge installation**](/edge-kubernetes/installing-edge-on-k8/#verifying-the-edge-installation) for details on how to ensure the installation is successful.

## What’s next?
To sign in to Edge, refer to the [**Accessing Edge**](/edge-kubernetes/installing-edge-on-k8/#accessing-edge) section. The initial installation uses a bootstrap domain (`edgebootstrap.example`) along with a default license and email (`company@edgebootstrap.example`). Use this domain, email and the default credentials username “admin” and password “admin-pass” to access Edge for the first time. You can later update the bootstrap domain and license to match your environment by following the steps outlined in [**Modifying Edge**](/edge-kubernetes/manage-edge/#modify-edge).
