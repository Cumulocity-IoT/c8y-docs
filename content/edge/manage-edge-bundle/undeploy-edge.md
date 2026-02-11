---
weight: 100
title: Uninstalling Edge
layout: redirect
---

{{< c8y-admon-caution >}}
Uninstallation will remove all data managed by this instance of {{< product-c8y-iot >}} Edge, not just the running software.

This includes but is not limited to all tenant data, and everything stored by DataHub and Dremio.
{{< /c8y-admon-caution >}}


If you have installed Edge using the **c8yedge** tool, uninstallation is as simple as invoking:
```shell
sudo c8yedge uninstall
```

Otherwise, remove both the Edge Custom Resource and the Edge operator. Assuming the Custom Resource is called `c8yedge` in the `c8yedge` namespace:
```shell
kubectl delete edge c8yedge --namespace=c8yedge
helm uninstall c8yedge-operator --namespace=c8yedge
```
