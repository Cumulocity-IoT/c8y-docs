---
weight: 15
title: Upgrading Edge
layout: redirect
---

The Edge operator follows the recreate update strategy to upgrade the Edge deployment.

Recreating update strategy is an all-or-nothing process that updates all aspects of the system at once with a brief downtime period. The Edge operator selects all the outdated pods and deactivates them at once. Once all old pods are deactivated, the Edge operator creates updated pods for the entire system. Edge is not operational while the old pods are deactivating and until the final updated pod is created.

For this example, assume that Edge is deployed using the [c8yedge-sample.yaml](/files/edge-k8s/c8yedge-sample.yaml).

### Upgrading Edge version 1018
The Edge operator version `{{< c8y-edge-current-version >}}` leverages the **admission webhooks** feature of Kubernetes to enhance validation and enforce default configurations for the Edge CR.
- The [validating admission webhook](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#validatingadmissionwebhook) ensures that any changes to the Edge CR comply with required constraints.
- The [mutating admission webhook](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#mutatingadmissionwebhook) automatically applies custom default values where needed.

To support these admission webhooks, the Edge operator requires additional permissions. Before upgrading, apply the necessary permissions by running the following command to patch the `c8yedge-operator-manager-role` ClusterRole:

```bash
kubectl patch clusterrole c8yedge-operator-manager-role --type='json' --patch-file {{< link-c8y-doc-baseurl >}}files/edge-k8s/c8yedge-operator-cluster-role-patch-1018.yaml
```
This ensures that the Edge operator can properly enforce validation and mutation rules when Edge CR is created or updated.

### Starting the upgrade {#starting-the-upgrade}

To upgrade the Edge deployment, change the `spec.version` field in the Edge CR file to the appropriate version. For example to `{{< c8y-edge-current-version >}}.0.0`.

Save the file and use the command below to apply the changes:

```bash
kubectl apply -f c8yedge-sample.yaml
```

To verify the Edge deployment, see [Verifying the Edge installation](/edge-kubernetes/installing-edge-on-k8/#verifying-the-edge-installation).

### Upgrading Edge remotely {#upgrading-edge-remotely}

For information about upgrading Edge remotely, see [Upgrading Edge remotely](/edge-kubernetes/k8-edge-connecting-edge-to-cloud/#k8-edge-upgrading-edge-remotely).
