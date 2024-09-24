---
weight: 20
title: Edge operator
layout: redirect
---

The Edge operator automates the deployment and management of Edge on Kubernetes. The Edge operator manages a Custom Resource Definition (CRD) to extend the Kubernetes API for Edge. You can deploy and manage Edge on a Kubernetes cluster through Edge Custom Resource (CR). Modify the Edge CR file and use `kubectl apply -f` to apply the changes. The Edge operator receives these changes and installs or updates Edge accordingly.

The Edge operator enables you to install, configure, upgrade or downgrade, scale up or down Edge on Kubenetes. The Edge operator supports:
- Deploy Edge
- Version upgrade and downgrade
- Scale up and down resources
- Configure persistent storage
- Validate configurations
