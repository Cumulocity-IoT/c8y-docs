---
weight: 20
title: Edge not showing up as a device in the cloud tenant
layout: redirect
---

Edge is unable to register itself as a device in your cloud tenant.

Describe the Edge CR `kubectl describe edge c8yedge -n c8yedge`

In the events section, you will find an event with a reason. For example:

```yaml
Name: c8yedge
Namespace: c8yedge
API Version: edge.cumulocity.com/v1
Kind: CumulocityIoTEdge

Status:
  Deployed Generation:  x
  State: Ready

Events:
 Type      Reason                       Age    From               Message
 ----      ------                       ----   ----               -------
 Normal    Installing                   8m34s  cumulocityiotedge  installing {{< product-c8y-iot >}} Edge version tagged as {{< c8y-edge-version >}}
……
……
 Normal    Ready                        1m00s  cumulocityiotedge  {{< product-c8y-iot >}} Edge installation is complete, and it's now running version {{< c8y-edge-version >}}
 Warning   FailedToRegisterCloudDevice  0m30s  cumulocityiotedge  Device failed to connect to <cloud tenant domain>, you might not have uploaded the device certificate to Cumulocity
```
Possible reasons:
* You didn’t add the Certificate Authority (CA) certificate to the trusted certificate list of your tenant.
For completing the registration process, sign into your cloud tenant and follow the steps described in [Managing trusted certificates](/device-management-application/managing-device-data/#managing-trusted-certificates) to add the Certificate Authority (CA) certificate to the trusted certificate list of your tenant. For more details, see [Device certificates](/device-integration/mqtt/#device-certificates).
For more information see [Connecting Edge to the cloud](/edge-kubernetes/k8-edge-connecting-edge-to-cloud/).

* The specified cloud tenant domain is not reachable or incorrect.

If you must contact [product support](/additional-resources/contacting-support/), include the output of the diagnostics dump. For more information about accessing diagnostic logs, see [Accessing logs](/edge-kubernetes/installing-edge-on-k8/#accessing-logs).
