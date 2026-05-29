---
weight: 110
title: Modifying the registry credentials used by Edge
layout: bundle
sector:
  - edge
---

At some point the credentials you use for the registry might change. In that case, Edge needs to be updated so that it can access the artifacts for any future upgrade.

These credentials are stored as a Kubernetes Secret, and can be updated using `kubectl` command:
{{< c8y-admon-caution >}}
Replace the value of the --docker-server flag in the command below with your private registry hostname if you installed Edge using a custom registry.
{{< /c8y-admon-caution >}}

```shell
kubectl create secret docker-registry c8yedge-operator-regcred 
  --namespace=c8yedge \
  --docker-server=registry.c8y.io \
  --docker-username=<registry username> \
  --docker-password=<registry password> \
  --dry-run=client -o yaml | kubectl apply -f -
```

After updating the secret, restart the Edge operator as described in [Restarting the Edge operator](/edge/manage-edge/#restart-operator)
