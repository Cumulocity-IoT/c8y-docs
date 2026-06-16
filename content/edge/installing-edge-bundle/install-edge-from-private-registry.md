---
weight: 60
title: Installing on a self-managed Kubernetes cluster from a private OCI registry
layout: redirect
---

This document describes the procedure for installing Edge using helm charts and container images hosted in a private [Open Container Initiative](https://opencontainers.org/) (OCI) compliant registry, rather than the default {{< company-c8y >}} registry.

This approach is typically used in restricted or air-gapped environments, or where organizations require full control over container image distribution through their own registry infrastructure.

The following sections outline the prerequisites and step-by-step process required to prepare, configure, and deploy Edge from a private registry.

To enable this setup, you must have an OCI-compliant registry accessible from the Kubernetes cluster where Edge will be installed. You also need a workstation with full internet access to pull the required helm charts and container images from the {{< company-c8y >}} registry and push them to the private registry in your restricted network environment.

### Download and publish required software to the private registry
This section outlines the steps to download the required artifacts from the [{{< company-c8y >}} registry](https://registry.c8y.io/) and publish them to the private registry.

#### Run registry sync script
To download the required artifacts from the [{{< company-c8y >}} registry](https://registry.c8y.io/) and publish them to the private registry, execute the following command and follow the interactive prompts:
```bash
c8yedge registry-sync
```
You can discover more options with `c8yedge package --help`, such as the ability to sync a very specific version.

If you intend to run the above command in an environment that has no or limited internet access, you will have to use the c8yedge tool to create an offline package first. This has to be executed in an environment with internet access. Execute the following command and follow the interactive prompts:
```bash
c8yedge package
```
The tool generates a tarball suffixed with the specific version of Edge downloaded (for example, `c8yedge-{{< c8y-edge-current-version >}}_0_0.tar`). By default, this file is created in your current directory and contains the latest release of Edge {{< c8y-edge-current-version >}}. You can discover more options with `c8yedge package --help`, such as the ability to package a very specific version.

Transfer the c8yedge tool and the offline package file generated earlier into the target environment and execute the following command and follow the interactive prompts:
```bash
# Replace <OFFLINE-PACKAGE-FILENAME> with the path to the generated offline package file
sudo c8yedge registry-sync -s "<OFFLINE-PACKAGE-FILENAME>"
```
{{< c8y-admon-info >}}
Keep a note of the path you provided for **Root path in the target registry**, which is required while installing the operator in the following step.
{{< /c8y-admon-info >}}

#### Installing the Edge operator from a private registry {#installing-edge-operator-from-private-registry}
The Edge operator is available in your private registry and can be installed like any other chart. Assuming you are installing the {{< c8y-edge-current-version >}} release of Edge, and that you wish all Edge workloads to be running in the namespace `c8yedge`, run the following command:
```shell
helm registry login <PRIVATE-REGSITRY-HOST> --username="<PRIVATE-REGSITRY-USERNAME>" --password="<PRIVATE-REGSITRY-PASSWORD>"

helm upgrade --install c8yedge-operator oci://<PRIVATE-REGSITRY-HOST>/<REPOSITORY-ROOT-PATH>/edge/helm-charts/cumulocity-iot-edge-operator \
    --version={{< c8y-edge-current-version >}} \
    --namespace c8yedge \
    --create-namespace \
    --set imageCredentials.username="<PRIVATE-REGSITRY-USERNAME>" \
    --set imageCredentials.password="<PRIVATE-REGSITRY-PASSWORD>" \
    --wait
```
{{< c8y-admon-info >}}
Keep a note of the path you provided for **Root path in the target registry**, which is required while installing the operator in the following step.
{{< /c8y-admon-info >}}


### Installing Edge from a private registry {#installing-edge-from-private-registry}
Continue with installing the Edge by following the instructions in [Installing Edge](/edge/installing-edge/#installing-edge).
