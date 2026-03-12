---
weight: 110
title: Modifying the registry credentials used by Edge
layout: bundle
sector:
  - edge
---

At some point the credentials you use for the registry might change. In that case, Edge needs to be updated so that it can access the artifacts for any future upgrade.

These credentials are stored as a secret within the Kubernetes cluster, and can be modified with `kubectl` commands on the environment in which Edge is installed:

```shell
kubectl delete secret docker-registry c8yedge-operator-regcred --namespace=c8yedge
kubectl create secret docker-registry c8yedge-operator-regcred --docker-server=registry.c8y.io --docker-username=<registry username> --docker-password=<registry password> --namespace=c8yedge
```
