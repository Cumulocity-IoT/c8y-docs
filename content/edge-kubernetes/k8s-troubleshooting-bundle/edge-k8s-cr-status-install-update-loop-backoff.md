---
weight: 10
title: Edge CR status InstallLoopBackOff or UpdateLoopBackOff
layout: redirect
---
After deploying or updating Edge, if the Edge CR status is `InstallationLoopBackOff` or `UpdateLoopBackOff`, as part of the output of `kubectl get edge c8yedge -n c8yedge`:

```shell
NAME         DOMAIN NAME     VERSION     STATUS     
c8yedge      myown.iot.com   {{< c8y-edge-current-version >}}.0.0    InstallLoopBackOff
```

Describe the Edge CR (cumulocity-iot-edge) with the command `kubectl describe edge c8yedge -n c8yedge`.

In the events section, you will find the reasons for the install or update failure. For example:

```yaml
Name: c8yedge
Namespace: c8yedge
API Version: edge.cumulocity.com/v1
Kind: CumulocityIoTEdge

Status:
  Deploying Generation: x
  State: InstallLoopBackOff

Events:
 Type    Reason               Age    From               Message
 ------  ------               ----   ----               -------
 Normal  Validating           8m37s  cumulocityiotedge  validating
 Normal  ValidationPassed     8m37s  cumulocityiotedge  validation passed
 Normal  Installing           8m34s  cumulocityiotedge  installing
……
……
 Normal  InstallLoopBackOff   1m00s  cumulocityiotedge  waiting for mongo server to be ready
```

Check the logs of the Edge operator, MongoDB and core pods to get more insights.

The Edge operator logs:

```shell
kubectl logs -n c8yedge deployment.apps/c8yedge-operator-controller-manager -c manager
```

MongoDB logs:

```shell
kubectl logs -n c8yedge --all-containers --prefix statefulset.apps/edge-db-rs0
```

Core logs:

```shell
kubectl logs -n c8yedge --all-containers --prefix statefulset.apps/c8ycore-sts
```
