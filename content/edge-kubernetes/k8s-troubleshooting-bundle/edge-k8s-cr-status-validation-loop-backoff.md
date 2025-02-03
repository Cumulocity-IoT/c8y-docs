---
weight: 5
title: Edge CR status ValidationLoopBackOff
layout: redirect
---

After deploying or updating Edge, if the Edge CR status shows as “ValidationLoopBackOff” as shown below:

Output of `kubectl get edge c8yedge -n c8yedge`:

```shell
NAME        DOMAIN NAME     VERSION     STATUS
c8yedge     myown.iot.com   {{< c8y-edge-current-version >}}.0.0    ValidationLoopBackOff
```
Describe the Edge CR (c8yedge): `kubectl describe edge c8yedge -n c8yedge`.

In the events section, you will find the reasons for the validation failure. For example:

```yaml
Name: c8yedge
Namespace: c8yedge
API Version: edge.cumulocity.com/v1
Kind: CumulocityIoTEdge

Status:
  Deploying Generation:  x
  State: ValidationLoopBackOff

Events:
 Type      Reason                   Age     From               Message
 ----      ------                   ----    ----               -------
 Normal    Validating               8m37s   cumulocityiotedge  validating
 Normal    ValidationLoopBackoff    8m37s   cumulocityiotedge  invalid [spec.licenseKey] value [empty]
```
