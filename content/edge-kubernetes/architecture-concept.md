---
weight: 45
title: Deployment architecture
layout: bundle
sector:
  - edge_server
---
The Edge operator operates within a namespace (default **c8yedge**, unless specified during the Edge operator installation). It creates and monitors multiple Kubernetes resources that collectively constitute the Edge.

You can deploy Edge on Kubernetes in two modes: one includes MongoDB, which is both deployed and managed by the Edge operator; the other involves connecting to an externally deployed MongoDB.

The deployment model is depicted below:

![Edge operator managed MongoDB](/images/edge-k8s/edge-k8-internal-db.png)
