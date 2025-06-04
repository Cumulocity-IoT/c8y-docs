---
weight: 10
title: Modifying Edge
layout: redirect
---

You can configure Edge through the Custom Resource (CR). For details on the CR structure and configuration options available, refer to [Edge Custom Resource](/edge-kubernetes/edge-custom-resource-definition/)

For this example, assume that the Edge is deployed using the [c8yedge-sample.yaml](/files/edge-k8s/c8yedge-sample.yaml).

### Example configuration change {#example-configuration-change}

Change the `spec.domain`and the `spec.licenseKey` to suit your environment and use the command below to apply the changes:

```bash
kubectl apply -f c8yedge-sample.yaml
```

To verify the Edge deployment, see [Verifying the Edge installation](/edge-kubernetes/installing-edge-on-k8/#verifying-the-edge-installation).
