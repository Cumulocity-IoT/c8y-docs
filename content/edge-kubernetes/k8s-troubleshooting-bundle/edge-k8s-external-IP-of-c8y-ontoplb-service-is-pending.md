---
weight: 15
title: Pending external cumulocity-ontoplb service IP
layout: redirect
---

The external IP is not assigned to the `cumulocity-ontoplb` service.

Output of `kubectl get service cumulocity-ontoplb -n c8yedge`:

```text
NAME                TYPE           CLUSTER-IP          EXTERNAL-IP   PORT(S)                                                        AGE
cumulocity-ontoplb  LoadBalancer   X.X.X.X **REDACTED  <pending>     443:32443/TCP,8443:32442/TCP,1883:32083/TCP,8883:32084/TCP ... 12m           
```
For more information, see [Assigning an external IP](/edge-kubernetes/installing-edge-on-k8/#assigning-an-external-ip).
