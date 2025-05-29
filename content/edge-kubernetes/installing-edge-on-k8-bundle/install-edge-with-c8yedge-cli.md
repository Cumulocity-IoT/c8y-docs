---
weight: 40
title: Installing with c8yedge tool
layout: redirect
---

The `c8yedge` command-line tool automates the entire process of preparing the environment and installing Edge. You can download the tool from the [{{< company-c8y >}} Download Center](https://download.cumulocity.com/Cumulocity-Edge/Installer).

{{< c8y-admon-info >}}
The tool must be executed as root and referenced using its file path.
{{< /c8y-admon-info >}}

### General usage
```shell
sudo ./c8yedge [command] [flags]
```

To view all available commands and options, run:
```shell
./c8yedge --help
```

### Install Edge
Before proceeding, ensure all [prerequisites](/edge-kubernetes/installing-edge-on-k8/#prerequisites) are met.

To install Edge, execute the following command and follow the interactive prompts:
```shell
sudo ./c8yedge install
```
{{< c8y-admon-info >}}
[Contact product support](/additional-resources/contacting-support/) to request the Edge registry credentials.
{{< /c8y-admon-info >}}

Upon successful installation, the tool will exit automatically.

To sign in to Edge, refer to the [**Accessing Edge**](/edge-kubernetes/installing-edge-on-k8/#accessing-edge) section. The initial installation uses a bootstrap domain (`edgebootstrap.example`) along with a default license and email (`company@edgebootstrap.example`). Use this domain, email and the default credentials username “admin” and password “admin-pass” to access Edge for the first time. You can later update the bootstrap domain and license to match your environment by following the steps outlined in [**Modifying Edge**](/edge-kubernetes/manage-edge/#modify-edge).
