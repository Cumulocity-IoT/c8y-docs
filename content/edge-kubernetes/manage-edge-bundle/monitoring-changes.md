---
weight: 90
title: Monitoring changes
layout: redirect
---

Any change that involves an update to the custom resource via `kubectl` will run and complete in the background. Whether it's a configuration change or an upgrade, you can use `kubectl` to monitor the progress of the changes in detail:
```bash
kubectl get events --namespace=c8yedge --sort-by=.metadata.creationTimestamp --watch
```
When it completes successfully, you will see a message of the form `{{< product-c8y-iot >}} Edge installation is complete...`.

If you are making an update through automated scripting, you can also just wait for the custom resource to advertise itself as `Ready` after the change:
```bash
kubectl wait --timeout=1800s --namespace=c8yedge --for='jsonpath={.status.state}=Ready' edge/c8yedge
```
This command will return with exit code 0 when the change completes successfully, or a non-zero exit code if it does not complete after the timeout.

