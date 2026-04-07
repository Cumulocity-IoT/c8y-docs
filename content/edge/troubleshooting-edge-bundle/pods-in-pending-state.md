---
weight: 20
title: Node Disk Pressure and Pod Evictions in K3s
layout: redirect
---

In K3s, the embedded kubelet enforces disk availability by using Kubernetes **Node-pressure eviction** mechanisms, with `/var/lib/rancher` serving as the primary node filesystem. When available disk space falls below the configured eviction thresholds, the node enters a **DiskPressure** state.

In this state, the kubelet proactively evicts running pods and blocks scheduling of new pods to preserve node stability. As a result, workloads might appear in `Pending`, `Evicted`, or `ContainerStatusUnknown` states.

To resolve this issue, reclaim sufficient disk space on the affected node. After disk pressure is alleviated, normal scheduling behavior resumes and workloads recover automatically.

To check the node status, run the following command:

```shell
kubectl describe node <node-name>
```