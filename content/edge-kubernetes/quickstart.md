---
weight: 10
title: Quickstart
layout: bundle
sector:
  - edge_server
---

This section helps you to quickly install {{< product-c8y-iot >}} Edge on a [Lightweight Kubernetes (K3s)](https://docs.k3s.io/installation) cluster using the `c8yedge` installer CLI. This tool automates the setup of K3s, Helm, Edge Operator, and the Edge instance itself.

### 1. Download and install Edge with `c8yedge` CLI

Download the installer from the official source:

```shell
curl -sfLO https://download.{{< product-c8y-iot >}}.com/Cumulocity-Edge/Installer/c8yedge && chmod +x c8yedge && ./c8yedge install --registry-host registry.c8y.io --username <YourUsername> --password <YourPassword> --version 2025 --confirm-system-requirements yes

```

Once complete, you will see the operator and Edge deployment running:

```shell
kubectl get pods -A
```

Expected pods:

```shell
NAMESPACE     NAME                                                   READY   STATUS    RESTARTS   AGE
c8yedge       c8yedge-operator-controller-manager-xxxx               1/1     Running   0          47s
kube-system   coredns-xxxxx                                          1/1     Running   0          49s
...
```

### 2. What’s next?
{{< c8y-admon-info >}}
To know your c8yedge cli version, execute **`c8yedge version`**
{{< /c8y-admon-info >}}

Visit:

- [Verifying the Edge installation](/edge-kubernetes/installing-edge-on-k8/#verifying-the-edge-installation)
- [Accessing Edge](/edge-kubernetes/installing-edge-on-k8/#accessing-edge)
- [Configure Edge](/edge-kubernetes/manage-edge/#modify-edge)

to log in and start using your Edge instance.

## 3. Uninstalling Edge
{{< {?c8y-admon-important >}}
Uninstalling Edge using the CLI is **non-recoverable**. It will remove both the Edge instance and the K3s cluster from the node. Backup any important data beforehand.
{{< /c8y-admon-important >}}

```shell
c8yedge remove
Do You really want to remove {{< product-c8y-iot >}} Edge? This includes all platform data and will be non recoverable. [yes/no]: yes

To confirm {{< product-c8y-iot >}} Edge uninstallation use this random value: <random-text> , to cancel type any other string.
Confirm by typing the random value from the above sentence: <random-text>
```
