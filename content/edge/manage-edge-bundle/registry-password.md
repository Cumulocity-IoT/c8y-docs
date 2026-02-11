---
weight: 110
title: Modifying the registry credentials used by Edge
layout: bundle
sector:
  - edge
---

Whether you are using the Edge registry or your own private registry, at some point your credentials on that registry might change. In that case, Edge needs to be updated so that it can access the artifacts for any future upgrade.

These credentials are stored as a secret within the Kubernetes cluster, and can be modified with `kubectl` commands on the environment in which Edge is installed:

```shell
kubectl delete secret docker-registry c8yedge-operator-regcred --namespace=c8yedge
kubectl create secret docker-registry c8yedge-operator-regcred --docker-server=registry.c8y.io --docker-username=<registry username> --docker-password=<registry password> --namespace=c8yedge
```
If you are using a private registry rather than the Edge registry, simply replace `registry.c8y.io` with the hostname of your private registry.
