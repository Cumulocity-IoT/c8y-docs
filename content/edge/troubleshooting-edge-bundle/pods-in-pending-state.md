---
weight: 20
title: Application Not Accessible and Pods in Pending State: Troubleshooting Node Disk Pressure in {{< product-c8y-iot >}} Edge Deployments (c8yedge Tool)
layout: redirect
---
If you installed Edge by using the `c8yedge` tool, the instance is not reachable, and `kubectl get pods -A` shows output similar to the following, the node might be under disk pressure.

```shell
NAME                                                              READY   STATUS                   RESTARTS       AGE     IP           NODE      NOMINATED NODE   READINESS GATES
apama-ctrl-scope-edge-deployment-7f4796c6c5-shnrr                 0/1     Pending                  0              2d21h   <none>       <none>    <none>           <none>
c8ycore-sts-0                                                     0/2     Pending                  0              2d21h   <none>       <none>    <none>           <none>
```

When you describe a pending pod, you see a scheduling error similar to the following:

```shell
kubectl describe pod <pod-name> -n <namespace>

# ...
Warning  FailedScheduling  12m (x832 over 2d21h)  default-scheduler  0/1 nodes are available: 1 node(s) had untolerated taint {node.kubernetes.io/disk-pressure: }. preemption: 0/1 nodes are available: 1 Preemption is not helpful for scheduling.
```

When installed with the c8yedge tool, the {{< product-c8y-iot >}} Edge runtime uses **K3s** with an embedded kubelet. The kubelet maintains disk availability through Kubernetes **Node-pressure eviction**, using `/var/lib/rancher` as the primary node filesystem path. When free disk space drops below the configured eviction thresholds, the node reports **DiskPressure**.

In this state, the kubelet proactively evicts running pods and blocks scheduling of new pods to preserve node stability. As a result, workloads can appear in `Pending`, `Evicted`, or `ContainerStatusUnknown` states.

To resolve this issue, reclaim sufficient disk space on the affected node. After **DiskPressure** clears, normal scheduling resumes and workloads recover automatically.

To inspect node conditions and capacity, run the following command:

```shell
kubectl describe node <node-name>
```