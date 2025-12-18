---
weight: 10
title: Backup and recovery
layout: redirect
---

# Backup and Restore Guide for c8yedge Installations

This runbook describes how to capture and restore a **{{< product-c8y-iot >}} Edge** deployment running on **K3s** installed via the `c8yedge` tool. Follow the numbered steps to create a consistent backup, reinstall the same Edge version, and validate the restored environment.

---

### Step 1 - Create a backup 
Back up the required directories using your preferred backup strategy.

* `/var/lib/rancher/k3s` - always required
* `/datahub` - only if {{< product-c8y-iot >}} DataHub is deployed (contains DataHub datalake content)

Ensure the backup is stored securely. Where applicable, retain checksum or integrity metadata to allow validation prior to recovery.

---

### Step 2 - Prepare the restore target
1. Install the same operating system (or a compatible one) that originally hosted Edge.
2. Make sure no prior K3s installation or Edge data exists on the target disk.
3. Make the backup available to the target system:
    a. For file-based backups, transfer the backup artifacts to the node.
    b. For snapshot-based or storage-level backups, ensure the snapshot is accessible and ready for restore.

{{< c8y-admon-caution >}}
Installing a different Edge version on top of a restored data set is unsupported and may fail the upgrade guard rails.
{{< /c8y-admon-caution >}}

---

### Step 3 - Restore the data directories
Restore the backup so that the directories land in their original locations, preserving paths, ownership, and permissions. Omitting directories or restoring to incorrect locations can corrupt the cluster.

Confirm the directories exist and contain the expected ownership:

```shell
ls -ld /var/lib/rancher/k3s
# If Cumulocity DataHub was deployed, also verify:
[ -d /datahub ] && ls -ld /datahub
```

---

### Step 4 - Reinstall the matching Edge release
Re-run the installer with the **exact version** captured in the backup:

```shell
sudo c8yedge install --version <previous_version>
```

Or use the offline alternative if you are in an airgapped environment:

```shell
sudo c8yedge install -s c8yedge.tar
```

For more details on installation options, see [Installing with the c8yedge tool](/edge-kubernetes/installing-edge-on-k8/#install-edge-with-c8yedge-cli) and [Install Edge in an airgapped environment](/edge-kubernetes/installing-edge-on-k8/#install-edge-airgapped).

The installer identifies the {{< product-c8y-iot >}} Edge CR if it is being restored and waits for the operator to reconcile successfully before exiting.

Watch for the following success messages:

```shell
...
2025-12-17T11:59:47Z	{{< product-c8y-iot >}} Edge update is complete in 3m14s (running version 2025.0.X)
2025-12-17T11:59:47Z	Edge recovered successfully.
```

---

