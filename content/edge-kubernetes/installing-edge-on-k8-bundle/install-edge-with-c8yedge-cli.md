---
weight: 20
title: Installing with the c8yedge tool
layout: redirect
---

This method is ideal if you do not already have a Kubernetes cluster and want a simplified, self-contained setup. The **c8yedge** command-line tool automates the entire process of preparing the environment and installing Edge on a Linux environment.

### Configuring the environment

Edge can be installed on any modern x86-64 Linux environment, virtualised or otherwise.

First, choose your environment. It can be a physical machine, or it can be a virtual machine (VM), using the technology of your choice. For example, VMware Workstation Player, VMware ESXi or HyperV. Create a VM, referring to the documentation from your VM technology vendor as necessary.

Whether a VM or physical machine, ensure that all hardware and storage requirements for Edge are met, based on [prerequisites](/edge-kubernetes/installing-edge-on-k8/#prerequisites).

Install the Linux distribution of your choice. Because the c8yedge-based install provisions Edge on [Lightweight Kubernetes (K3s)](https://docs.k3s.io/), you should consult the [operating system configurations required by K3s](https://docs.k3s.io/installation/requirements#operating-systems) to help you choose and configure your operating system.

{{< c8y-admon-info >}}
Although the virtual or physical nature of the platform is unimportant to Edge, the advantage of most VM technologies is that a running image can be exported to be run in another environment without further configuration.

For example, you could install and customize Edge on a VM in your development environment. You can then hand off a self-contained VM image to be installed at a remote site in a reliable and reproducible way.
{{< /c8y-admon-info >}}

### Downloading c8yedge
You can download the tool from the [{{< company-c8y >}} Download Center](https://download.cumulocity.com/Cumulocity-Edge) or by running the following commands:

```shell
curl -sfL https://download.cumulocity.com/Cumulocity-Edge/{{< c8y-edge-current-version >}}/c8yedge -o c8yedge
chmod +x c8yedge
sudo mv c8yedge /usr/local/bin/
```

The `mv` step places `c8yedge` in a directory on your `PATH`, so you can run it from any working directory. `sudo` is required because `/usr/local/bin/` is owned by root.

The tool takes commands of the form
```shell
sudo c8yedge [command] [flags]
```
For more information about the tool, run `c8yedge --help` or `c8yedge [command] --help`.

### Install Edge

#### Before you start {#before-you-start}

The installer will prompt you interactively. Gather the following items before you start so that you can answer the prompts without interrupting the install:

* The **Edge license file** for your environment ([request it from product support](/additional-resources/contacting-support/) if you have not received it yet).
* The **Edge registry credentials** that product support issued together with the license.
* The **domain name** under which Edge will be reachable. This must match the domain you supplied when you requested the license. See [Domain name validation for Edge license key generation](/edge-kubernetes/installing-edge-on-k8/#domain-name-validation-for-edge-license-key-generation).
* The **admin password** you want to set for the `management` and `edge` tenants.
* Optional: a **TLS/SSL private key** and **domain certificate** in PEM format, if you want HTTPS access from the start. See the TLS/SSL row in [Prerequisites](/edge-kubernetes/installing-edge-on-k8/#prerequisites).

For non-interactive or scripted installs, the installer also accepts flags such as `--cumulocity-password` to pre-set the admin password. Run `c8yedge install --help` for the full list.

#### Run the installer {#run-the-installer}

To install Edge, execute the following command and follow the interactive prompts:
```shell
sudo c8yedge install
```
{{< c8y-admon-info >}}
[Contact product support](/additional-resources/contacting-support/) to request the Edge registry credentials.
{{< /c8y-admon-info >}}

Upon successful installation, the tool will exit automatically.

To sign in to Edge, refer to the instructions at the start of the [**Accessing Edge**](/edge-kubernetes/installing-edge-on-k8/#accessing-edge) section. You can later update the domain and license to match your environment by following the steps outlined in [**Modifying Edge**](/edge-kubernetes/manage-edge/#modify-edge).

### Install Edge in an airgapped environment {#install-edge-airgapped}

{{< c8y-admon-info >}}
Skip this section if your target machine has normal internet access. The steps below describe an alternate flow for installing Edge on a host that cannot reach the {{< company-c8y >}} registry directly.
{{< /c8y-admon-info >}}

If you are installing Edge on an environment that has no or limited internet access, you will have to use the c8yedge tool to create an offline package first. This has to be executed in an environment with internet access. Execute the following command and follow the interactive prompts:
```shell
c8yedge package
```
The `package` command does not need `sudo` because it only writes a tarball to your current directory. The tool generates a tarball suffixed with the specific version of Edge downloaded (for example, `c8yedge-{{< c8y-edge-current-version >}}_0_0.tar`). By default, this file is created in your current directory and contains the latest release of Edge {{< c8y-edge-current-version >}}. You can discover more options with `c8yedge package --help`, such as the ability to package a very specific version.

The offline package can be used for either an initial installation, or an upgrade of an existing installation. You need to transfer this file, as well as the c8yedge tool, into your airgapped environment.

The c8yedge tool installs [Lightweight Kubernetes (K3s)](https://docs.k3s.io/), which has prerequisites for running in an airgapped environment. If your environment has no network interface with a default route, or SELinux is enabled, pay attention to and follow the two relevant sections under [Prerequisites](https://docs.k3s.io/installation/airgap#prerequisites).

Once in the airgapped environment, run the installation command referencing the offline package file the tool generated earlier:
```shell
# Replace <OFFLINE-PACKAGE-FILENAME> with the path to the generated offline package file
sudo c8yedge install -s "<OFFLINE-PACKAGE-FILENAME>"
```
