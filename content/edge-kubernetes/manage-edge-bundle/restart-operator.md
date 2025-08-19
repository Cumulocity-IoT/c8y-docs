---
weight: 17
title: Restarting the Edge operator
layout: redirect
---

Run this command to restart the Edge operator.

```shell
kubectl rollout restart deployment --namespace=c8yedge c8yedge-operator-controller-manager
```
{{< c8y-admon-info >}}
Substitute the namespace name *c8yedge* in the command above with the namespace name where you have installed the Edge operator.
{{< /c8y-admon-info >}}
