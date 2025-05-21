---
weight: 10
title: Quickstart
layout: bundle
sector:
  - edge_server
---

This section helps you to quickly install {{< product-c8y-iot >}} Edge on a [Lightweight Kubernetes (K3s)](https://docs.k3s.io/installation) cluster using the `c8yedge` installer CLI. This tool automates the setup of K3s, Helm, Edge Operator, and the Edge instance itself.

### 1. Download and install Edge with `c8yedge` CLI

Download the `c8yedge` installer and initiate installation:

{{< c8y-admon-info >}}
Use the registry credentials supplied to you along with your {{< product-c8y-iot >}} Edge license.
{{< c8y-admon-info >}}

```shell
curl -sfLO https://download.{{< product-c8y-iot >}}.com/Cumulocity-Edge/Installer/c8yedge && chmod +x c8yedge && ./c8yedge install --registry-host registry.c8y.io --username <YourUsername> --password <YourPassword> --version 2025 --confirm-system-requirements yes
```

The installer automatically:

- Sets up a K3s cluster
- Deploys the Edge Operator
- Installs the Edge instance with default configuration:
  - **Name**: `c8yedge`
  - **Domain**: `edgebootstrap.example.com`

Upon successful installation, you should see output similar to the following:

```shell
Cumulocity Edge installation is complete in 4m58s, and it's now running version 2025.0.2-xxxx
```

Check for running components:

```shell
kubectl get pods -A
```

Expected output:

```shell
NAMESPACE     NAME                                                   READY   STATUS    RESTARTS   AGE
c8yedge       c8yedge-operator-controller-manager-xxxx               1/1     Running   0          47s
kube-system   coredns-xxxxx                                          1/1     Running   0          49s
...
```

{{< c8y-admon-info >}}
You can verify your `c8yedge` CLI version at any time by running:

```shell
c8yedge version
```
{{< /c8y-admon-info >}}

---

## 2. What’s next?

After installation:

- Refer to [**Verifying the Edge installation**](/edge-kubernetes/installing-edge-on-k8/#verifying-the-edge-installation) to ensure the setup is complete.
- Modify the default configuration (such as domain and license) to suit your environment. See [**Modifying Edge**](/edge-kubernetes/manage-edge/#modify-edge).
- Refer to [**Accessing Edge**](/edge-kubernetes/installing-edge-on-k8/#accessing-edge) to sign into Edge.

---

## 3. Uninstalling Edge

{{< c8y-admon-important >}}
Uninstalling Edge using the CLI is **non-recoverable**. It will remove both the Edge instance and the K3s cluster from the node. Backup any important data beforehand.
{{< /c8y-admon-important >}}

```shell
c8yedge remove
```

You’ll be prompted for confirmation:

```
Do you really want to remove {{< product-c8y-iot >}} Edge? This includes all platform data and will be non-recoverable. [yes/no]: yes
To confirm {{< product-c8y-iot >}} Edge uninstallation use this random value: <random-text>, to cancel type any other string.
Confirm by typing the random value from the above sentence: <random-text>
```