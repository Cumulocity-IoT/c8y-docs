---
weight: 45
title: Deployment architecture
layout: bundle
sector:
  - edge_server
---
The Edge operator operates within a namespace (default **c8yedge**, unless specified during the Edge operator installation). It creates and monitors multiple Kubernetes resources that collectively constitute the Edge.

The deployment model is depicted below:

![Edge operator](/images/edge-k8s/edge-k8-internal-db.png)
