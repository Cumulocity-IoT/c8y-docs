---
weight: 15
title: Upgrading Edge
layout: redirect
---

{{< c8y-admon-caution >}}
Edge supports upgrades only between consecutive major releases. If your deployment is several major releases behind, you must upgrade to and validate each intermediate major release before proceeding to the target release. This includes deployments running Edge Appliance VM 10.17 or 10.18, which must first be [migrated to Edge 2025](/2025/edge-kubernetes/manage-edge/#migrating-edge-appliance) before upgrading to the target release.

Significant changes to prerequisites are generally introduced in major releases. Nevertheless, prerequisites should be verified before each upgrade.
<br>See [Prerequisites](/edge/installing-edge/#prerequisites) for the supported Kubernetes versions and requirements.
{{< /c8y-admon-caution >}}

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

If Edge is now running in an environment with no or limited internet access, you can upgrade by creating an offline package and transferring it to your airgapped environment. See [Install Edge in an airgapped environment](/edge/installing-edge/#install-edge-airgapped). There is no difference between a package created for an initial installation, and a package created for an upgrade.

Once in the airgapped environment, run the upgrade command referencing the offline package file the tool generated:
```shell
c8yedge upgrade -s "<OFFLINE-PACKAGE-FILE>"
```

### Upgrading Edge in a self-managed Kubernetes cluster {#upgrade-with-kubernetes-native}

{{< c8y-admon-info >}}
Upgrading the version of your self-managed Kubernetes is outside the scope of the Edge product and documentation. Follow the official upgrade instructions for your platform.
<br>See [Prerequisites](/edge/installing-edge/#prerequisites) for the supported Kubernetes versions and platforms.
{{< /c8y-admon-info >}}

Upgrading Edge works similarly to applying a configuration change, with the target version specified as a configuration value.
To upgrade to the latest available version from the current release, set the version to `{{< c8y-edge-current-version >}}`. To upgrade to a specific patch version, use a fully qualified version string such as `{{< c8y-edge-current-version >}}.0.1`.

{{< c8y-admon-info >}}
If your Edge instance was installed using a private OCI-compliant registry, you must sync the artifacts for the new version `{{< c8y-edge-current-version >}}` to your private registry before beginning the upgrade. Refer to [Sync Edge artifacts to your private registry](/edge/installing-edge/#sync-edge-artifacts-to-private-registry) for the required steps.
{{< /c8y-admon-info >}}

```bash
kubectl patch edge c8yedge --namespace c8yedge \
  --type merge \
  --patch '{"spec":{"version":"{{< c8y-edge-current-version >}}"}}'	
```
The operator will also upgrade itself as part of this process. See [Monitoring changes](/edge/manage-edge/#monitoring-changes) to follow the progress of the upgrade.

### Upgrading Edge remotely {#upgrading-edge-remotely}

For information about upgrading Edge remotely, see [Upgrading Edge remotely](/edge/connecting-edge-to-cloud/#upgrading-edge-remotely).

