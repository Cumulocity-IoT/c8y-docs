---
weight: 25
title: Uninstalling Edge
layout: redirect
---

If you have installed Edge using the `c8yedge` tool, uninstallation is as simple as invoking:
```shell
sudo c8yedge uninstall
```

For a kubernetes-native install, remove both the Edge Custom Resource and the Edge operator. Assuming the Custom Resource is called `c8yedge` in the `c8yedge` namespace:
```shell
kubectl delete edge c8yedge -n c8yedge
helm uninstall c8yedge-operator -n c8yedge
```
