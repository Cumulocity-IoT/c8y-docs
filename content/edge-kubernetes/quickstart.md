---
weight: 10
title: Quickstart
layout: bundle
sector:
  - edge_server
---

This section helps you to quickly install Cumulocity IoT Edge on a [Lightweight Kubernetes (K3s)](https://docs.k3s.io/installation) cluster using the `c8yedge` installer CLI. This tool automates the setup of K3s, Helm, Edge Operator, and the Edge instance itself.

## 1. Download and install the `c8yedge` CLI

Download the installer from the official source:

```shell
curl -LO https://download.cumulocity.com/edge/<c8yedge>
chmod +x c8yedge
sudo mv c8yedge /usr/bin/
```

## 2. View available commands

To list all available commands and options, run:

```shell
c8yedge help
```

Expected output:

```
This is a CLI tool for installation and maintaining of
Cumulocity Edge on Kubernetes.

Usage:
  c8yedge [command]

Available Commands:
  completion  Generate the autocompletion script for the specified shell
  help        Help about any command
  install     Install Cumulocity Edge on Kubernetes
  remove      Uninstall Cumulocity Edge and Kubernetes
  version     Default version of Cumulocity Edge on Kubernetes to install, modify it with --version flag when calling install command

Flags:
  -h, --help   help for c8yedge

Use "c8yedge [command] --help" for more information about a command.
```

## 3. check the version before we start (optional)

To show the version of cli, run:

```shell
c8yedge version
```

Expected output:

```
Cumulocity Edge installer version: 2025.0.2
```


## 4. Install Edge

Run the install command and follow the prompts. You can either pass flags explicitly or enter them interactively.

### Option 1: Interactive

```shell
c8yedge install
```

You'll be asked to confirm system readiness. Enter `yes` to proceed.

Example output:

```shell
Set to 'yes' to confirm that system requirements are met [yes/no]: yes
Registry Host: registry.c8y.io
Registry User: <YourUsername>
Registry Password: <YourPassword>
```

### Option 2: With Flags

```shell
c8yedge install   --registry-host registry.c8y.io   --username <YourUsername>   --password  <YourPassword>   --version 2025   --confirm-system-requirements yes
```


Once complete, you will see the operator and edge deployment running:

```shell
kubectl get pods -A
```

Expected pods:

```
NAMESPACE     NAME                                                   READY   STATUS    RESTARTS   AGE
c8yedge       c8yedge-operator-controller-manager-xxxx               1/1     Running   0          47s
kube-system   coredns-xxxxx                                          1/1     Running   0          49s
...
```

## 5. What’s next?

Visit:

- [Verifying the Edge installation](/edge-kubernetes/installing-edge-on-k8/#verifying-the-edge-installation)
- [Accessing Edge](/edge-kubernetes/installing-edge-on-k8/#accessing-edge)

to log in and start using your Edge instance.

## 6. Uninstalling Edge

> ⚠️ Warning: Uninstalling Edge using the CLI is **non-recoverable**. It will remove both the Edge instance and the K3s cluster from the node. Backup any important data beforehand.

```shell
c8yedge remove
Do You really want to remove Cumulocity Edge? This includes all platform data and will be non recoverable. [yes/no]: yes

To confirm Cumulocity Edge uninstallation use this random value: <random-text> , to cancel type any other string.
Confirm by typing the random value from above sentence: <random-text>
```
