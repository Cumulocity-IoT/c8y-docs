---
weight: 15
title: Upgrading Edge
layout: redirect
---
The Edge operator follows the recreate update strategy to upgrade the Edge deployment.

Recreating update strategy is an all-or-nothing process that updates all aspects of the system at once with a brief downtime period. The Edge operator selects all the outdated pods and deactivates them at once. Once all old pods are deactivated, the Edge operator creates updated pods for the entire system. Edge is not operational while the old pods are deactivating and until the final updated pod is created.

{{< c8y-admon-info >}}
To upgrade your Kubernetes version, follow the official upgrade instructions for your platform.
<br>See [Prerequisites](/edge-kubernetes/installing-edge-on-k8/#prerequisites) for the supported Kubernetes versions and platforms.
{{< /c8y-admon-info >}}

### Starting the upgrade {#starting-the-upgrade}

Upgrading Edge works similarly to applying a configuration change, with the target version specified as a configuration value.
To upgrade to the latest available version from the current release, set the version to `"{{< c8y-edge-current-version >}}"`. To upgrade to a specific patch version, use a fully qualified version string such as `"{{< c8y-edge-current-version >}}.0.1"`.

```bash
kubectl --namespace=c8yedge patch edge/c8yedge --type=merge -p '{"spec":{"version":"{{< c8y-edge-current-version >}}"}}'
```
The operator will also upgrade itself as part of this process. See [Monitoring changes](/edge-kubernetes/manage-edge/#monitoring-changes) to follow the progress of the upgrade.

### Upgrading Edge in an airgapped environment {#upgrade-edge-airgapped}

If you have installed Edge using the `c8yedge` tool, and Edge is now running in an environment with no or limited internet access, you can upgrade by creating an offline package and transferring it to your airgapped environment. See [Install Edge in an airgapped environment](/edge-kubernetes/installing-edge-on-k8/#install-edge-airgapped).

Once in the airgapped environment:
```shell
c8yedge upgrade -s c8yedge.tar
```
Unlike the initial installation, no use of `sudo` is required.

### Upgrading Edge remotely {#upgrading-edge-remotely}

For information about upgrading Edge remotely, see [Upgrading Edge remotely](/edge-kubernetes/k8-edge-connecting-edge-to-cloud/#k8-edge-upgrading-edge-remotely).

### Upgrading from Edge version 10.18

Before upgrading Edge to `{{< c8y-edge-current-version >}}`, run the following command to patch the [`c8yedge-operator-manager-role`]({{< link-c8y-doc-baseurl >}}files/edge-k8s/c8yedge-operator-cluster-role-patch-1018.yaml) ClusterRole with the necessary permissions:

```bash
kubectl patch clusterrole c8yedge-operator-manager-role --type='json' --patch "$(curl -s {{< link-c8y-doc-baseurl >}}files/edge-k8s/c8yedge-operator-cluster-role-patch-1018.yaml)"
```
This step is required to ensure the Edge operator can properly enforce validation and mutation rules when updating the Edge CR.

#### Why this change is needed?

The Edge operator version `{{< c8y-edge-current-version >}}` leverages the **admission webhooks** feature of Kubernetes to enhance validation and enforce default configurations for the Edge CR.
- The [validating admission webhook](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#validatingadmissionwebhook) ensures that any changes to the Edge CR comply with required constraints.
- The [mutating admission webhook](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#mutatingadmissionwebhook) automatically applies custom default values where needed.

The Edge operator to leverage the **admission webhooks** requires additional permissions, which the above command applies.
