---  
weight: 10
title: ClusterRole Patch Documentation for Operator Upgrade from 1018.0.1 to 2025.0.0
layout: redirect
---
Here's the updated documentation based on all the reviews and the adjustments you've mentioned:

---

### ClusterRole patch documentation for operator upgrade from 1018.0.1 to 2025.0.0

---

### Overview  
This document describes the steps to patch the `ClusterRole` named `c8yedge-operator-manager-role` during the upgrade from **version 1018.0.1 to 2025.0.0** of the operator.

### Important note  
⚠️ **This patch must be applied *before* upgrading the operator to version 2025.0.0.**  
Failure to apply the patch beforehand may result in insufficient permissions for the operator, potentially causing webhook-related failures.

### Reason for the patch  
In version **2025.0.0**, the operator introduced **webhook functionality**, which requires additional permissions for managing webhook-related Kubernetes resources, including:

- `mutatingwebhookconfigurations`
- `validatingwebhookconfigurations`
- `jobs` (additional watching permissions)
- `poddisruptionbudgets`

This patch ensures that the operator has the necessary permissions upon upgrade.

### Patch method  

Use the following `kubectl` command to apply the patch using the provided YAML file:

```bash
kubectl patch clusterrole c8yedge-operator-manager-role --type='json' --patch-file https://github.com/Cumulocity-IoT/c8y-docs/blob/develop/static/files/edge-k8s/c8yedge-operator-claster-role-patch.yaml
```

### Conclusion  
The upgrade from **1018.0.1 to 2025.0.0** requires additional webhook-related permissions for the `ClusterRole`.  
**This patch must be applied before the operator upgrade** to prevent permission-related failures.

---
