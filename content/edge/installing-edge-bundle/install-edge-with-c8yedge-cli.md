---
weight: 20
title: Installing with the c8yedge tool
layout: redirect
---

This method is ideal if you do not already have a Kubernetes cluster and want a simplified, self-contained setup. The **c8yedge** command-line tool automates the entire process of preparing the environment and installing Edge on a Linux environment.

### Configuring the environment

Edge can be installed on any modern x86-64 Linux environment, virtualised or otherwise.

First, choose your environment. It can be a physical machine, or it can be a virtual machine (VM), using the technology of your choice. For example, VMWare Workstation Player, VMWare ESXi or HyperV. Create a VM, referring to the documentation from your VM technology vendor as necessary.

Whether a VM or physical machine, ensure that all hardware and storage requirements for Edge are met, based on [prerequisites](/edge/installing-edge/#prerequisites).

Install the Linux distribution of your choice. Because the c8yedge-based install provisions Edge on [Lightweight Kubernetes (K3s)](https://docs.k3s.io/), you should consult the [operating system configurations required by K3s](https://docs.k3s.io/installation/requirements#operating-systems) to help you choose and configure your operating system.

{{< c8y-admon-info >}}
Although the virtual or physical nature of the platform is unimportant to Edge, the advantage of most VM technologies is that a running image can be exported to be run in another environment without further configuration.

For example, you could install and customize Edge on a VM in your development environment. You can then then hand-off a self-contained VM image to be installed at a remote site in a reliable and reproducable way.
{{< /c8y-admon-info >}}

{{< c8y-admon-caution >}}
**Host security hardening**

Installing {{< product-c8y-iot >}} Edge with c8yedge also supports hosts with standard SELinux to the extent supported by [K3s](https://docs.k3s.io/advanced#selinux-support).

Additional host hardening, such as custom SELinux policies, AppArmor, Smack, fapolicyd, or similar controls, is the customer's responsibility. These host-specific security mechanisms can interfere with Kubernetes, the container runtime, or networking required by c8yedge. 
{{< /c8y-admon-caution >}}

### Downloading c8yedge
You can download the tool from the [{{< company-c8y >}} Download Center](https://download.cumulocity.com/Cumulocity-Edge) or by running the following commands:

```shell
curl -sfL https://download.cumulocity.com/Cumulocity-Edge/{{< c8y-edge-current-version >}}/c8yedge -o c8yedge
sudo chmod +x c8yedge
sudo mv c8yedge /usr/local/bin/
```

The tool takes commands of the form
```shell
sudo c8yedge [command] [flags]
```
For more information about the tool, run `c8yedge --help` or `c8yedge [command] --help`.

### Install Edge

To install Edge, execute the following command and follow the interactive prompts:
```shell
sudo c8yedge install
```
{{< c8y-admon-info >}}
[Contact product support](/additional-resources/contacting-support/) to request the Edge registry credentials.
{{< /c8y-admon-info >}}

Upon successful installation, the tool will exit automatically.

To sign in to Edge, refer to the instructions at the start of the [**Accessing Edge**](/edge/installing-edge/#accessing-edge) section. You can later update the domain and license to match your environment by following the steps outlined in [**Modifying Edge**](/edge/manage-edge/#modify-edge).

### Install Edge in an airgapped environment {#install-edge-airgapped}

If you are installing Edge on an environment that has no or limited internet access, you will have to use the c8yedge tool to create an offline package first. This has to be executed in an environment with internet access. Execute the following command and follow the interactive prompts:
```shell
c8yedge package
```
The tool generates a tarball suffixed with the specific version of Edge downloaded (for example, `c8yedge-{{< c8y-edge-current-version >}}_0_0.tar`). By default, this file is created in your current directory and contains the latest release of Edge {{< c8y-edge-current-version >}}. You can discover more options with `c8yedge package --help`, such as the ability to package a very specific version.

The offline package can be used for either an initial installation, or an upgrade of an existing installation. You need to transfer this file, as well as the c8yedge tool, into your airgapped environment.

The c8yedge tool installs [Lightweight Kubernetes (K3s)](https://docs.k3s.io/), which has prerequisites for running in an airgapped environment. If your environment has no network interface with a default route, or SELinux is enabled, pay attention to and follow the two relevant sections under [Prerequisites](https://docs.k3s.io/installation/airgap#prerequisites).

Once in the airgapped environment, run the installation command referencing the offline package file the tool generated earlier:
```shell
sudo c8yedge install -s "<OFFLINE-PACKAGE-FILE>"
```
