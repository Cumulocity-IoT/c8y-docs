---
weight: 15
title: Upgrading Edge
layout: redirect
---
The Edge operator follows the recreate update strategy to upgrade the Edge deployment.

Recreating update strategy is an all-or-nothing process that updates all aspects of the system at once with a brief downtime period. The Edge operator selects all the outdated pods and deactivates them at once. Once all old pods are deactivated, the Edge operator creates updated pods for the entire system. Edge is not operational while the old pods are deactivating and until the final updated pod is created.

### Upgrading with the c8yedge tool {#upgrade-with-c8yedge}

{{< c8y-admon-info >}}
Upgrading with the c8yedge tool is only supported if the initial installation was created using the c8yedge tool.
{{< /c8y-admon-info >}}

You can upgrade to the latest patch of Edge by running the following command:
```shell
c8yedge upgrade
```
This will only apply the latest patches for the current release train. For example, this command will perform an upgrade from `{{< c8y-edge-current-version >}}.0.3` to `{{< c8y-edge-current-version >}}.0.5`, but not `{{< c8y-edge-current-version >}}.0.3` to a new major version after `{{< c8y-edge-current-version >}}`. To specify an explicit version to upgrade to:
```shell
c8yedge upgrade --version <version number>
```
Unlike the initial installation, no use of `sudo` is required for any kind of upgrade using c8yedge.

#### Upgrading in an airgapped environment {#upgrade-edge-airgapped}

If Edge is now running in an environment with no or limited internet access, you can upgrade by creating an offline package and transferring it to your airgapped environment. See [Install Edge in an airgapped environment](/edge-kubernetes/installing-edge-on-k8/#install-edge-airgapped). There is no difference between a package created for an initial installation, and a package created for an upgrade.

Once in the airgapped environment, run the upgrade command referencing the offline package file the tool generated:
```shell
# Replace <OFFLINE-PACKAGE-FILENAME> with the path to the generated offline package file
c8yedge upgrade -s "<OFFLINE-PACKAGE-FILENAME>"
```

### Upgrading Edge in a self-managed Kubernetes cluster {#upgrade-with-kubernetes-native}

{{< c8y-admon-info >}}
Upgrading the version of your self-managed Kubernetes is outside the scope of the Edge product and documentation. Follow the official upgrade instructions for your platform.
<br>See [Prerequisites](/edge-kubernetes/installing-edge-on-k8/#prerequisites) for the supported Kubernetes versions and platforms.
{{< /c8y-admon-info >}}

Upgrading Edge works similarly to applying a configuration change, with the target version specified as a configuration value.
To upgrade to the latest available version from the current release, set the version to `"{{< c8y-edge-current-version >}}"`. To upgrade to a specific patch version, use a fully qualified version string such as `"{{< c8y-edge-current-version >}}.0.1"`.

```bash
kubectl --namespace=c8yedge patch edge/c8yedge --type=merge -p '{"spec":{"version":"{{< c8y-edge-current-version >}}"}}'
```
The operator will also upgrade itself as part of this process. See [Monitoring changes](/edge-kubernetes/manage-edge/#monitoring-changes) to follow the progress of the upgrade.


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
