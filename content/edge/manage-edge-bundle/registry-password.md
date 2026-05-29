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
kubectl create secret docker-registry c8yedge-operator-regcred --namespace=c8yedge \
  --docker-server=registry1.stage.c8y.io \
  --docker-username=a \
  --docker-password=b \
  --dry-run=client -o yaml | kubectl apply -f -
```

After updating the secret, restart the Edge operator as described in [Restarting the Edge operator](/edge/manage-edge/#restart-operator)
