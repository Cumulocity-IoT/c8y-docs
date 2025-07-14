---
weight: 90
title: Monitoring changes
layout: redirect
---

Any change that involves an update to the custom resource via `kubectl` will run and complete in the background. Whether it's a configuration change or an upgrade, you can use `kubectl` to wait for the custom resource to advertise itself as `Ready` after a change.
```bash
kubectl wait --timeout=1800s --namespace=c8yedge --for='jsonpath={.status.state}=Ready' edge/c8yedge
```
This command will exit when the change completes.

Or you can monitor the progress of the changes in more detail:
```bash
kubectl get events --namespace=c8yedge --field-selector involvedObject.name=c8yedge --sort-by=.metadata.creationTimestamp
```
