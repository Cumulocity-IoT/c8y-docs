---
weight: 10
title: Quickstart
layout: bundle
sector:
  - edge_server
---

Edge provides a Command Line Installation tool `c8yedge` that is a convenient way to install it on a [Lightweight Kubernetes (K3s)](https://docs.k3s.io/installation) cluster. This tool is available at https://download.cumulocity.com/Cumulocity-Edge/Installer. 

## Install Edge
Make sure your hardware meets the requirements specified in [Prerequisites](/edge-kubernetes/installing-edge-on-k8/#prerequisites) before proceeding.

{{< c8y-admon-info >}}
Edge registry credentials needed for installing it are supplied to you along with your license. [Contact product support](/additional-resources/contacting-support/) to request the registry credentials.
{{< /c8y-admon-info >}}

To install Edge using the `c8yedge` tool, just run:
```shell
curl -sfL https://download.cumulocity.com/Cumulocity-Edge/Installer/c8yedge -O && ./c8yedge install --username <Edge registry username> --password <Edge registry password>
```

You will be prompted to verify whether your system meets the installation requirements. After confirming that your system complies with the requirements, type `yes` and press Enter to proceed.

After running this tool:
   - K3s cluster will be installed and configured.
   - Edge operator will be deployed.
   - Edge will be installed with the below configuration
      - **Name**: `c8yedge`
      - **Company**: `Edge Bootstrap`
      - **Domain**: `edgebootstrap.example`
      - **Email**: `company@edgebootstrap.example`

Upon successful installation, you should see the below message in the console.
```shell
{{< product-c8y-iot >}} Edge installation is complete in 4m58s, and it's now running version {{< c8y-edge-version >}}-xxxx
```

See [**Verifying the Edge installation**](/edge-kubernetes/installing-edge-on-k8/#verifying-the-edge-installation) for details on how to ensure the installation is complete.

## What’s next?
Refer to [**Accessing Edge**](/edge-kubernetes/installing-edge-on-k8/#accessing-edge) to sign into Edge. Since the Edge is installed with a bootstrap domain (`edgebootstrap.example`), license and email (`company@edgebootstrap.example`), you should use them for accessing Edge initially.

You can modify the bootstrap domain and license to suit your environment by following the instructions at [**Modifying Edge**](/edge-kubernetes/manage-edge/#modify-edge).
