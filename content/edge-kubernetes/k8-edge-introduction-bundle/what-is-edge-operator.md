---
weight: 60
title: Edge operator
layout: redirect
---

The Edge operator automates the deployment and management of Edge. The Edge operator manages a custom resource Definition (CRD) to extend the Kubernetes API for Edge. You can deploy and manage Edge on a Kubernetes cluster through Edge custom resource (CR). Modify the Edge CR file and use `kubectl apply -f` to apply the changes. The Edge operator receives these changes and installs or updates Edge accordingly.

The Edge operator enables you to install, configure, upgrade or downgrade, scale up or down Edge. The Edge operator supports:
- Deploy Edge
- Version upgrade and downgrade
- Scale up and down resources
- Configure persistent storage
- Validate configurations
