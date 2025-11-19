---
weight: 10
title: Backup and Recovery
layout: redirect
---

# Cumulocity Edge on K3s — Backup and Restore Guide

This runbook describes how to capture and restore a **Cumulocity Edge** deployment that runs on **K3s** (installed via the `c8yedge` tool). Follow the numbered steps to collect a consistent snapshot, reinstall the same Edge version, and validate the restored environment.

{{< c8y-admon-important >}}
Always back up `/var/lib/rancher/k3s` and `/datahub` together and restore them to their original paths, ownership, and permissions. Mixing versions or omitting directories can corrupt the cluster.
{{< /c8y-admon-important >}}

---

### Step 1 - Understand what must be protected
* `/var/lib/rancher/k3s`: cluster state, objects, certificates, and etcd/sqlite internals
* `/datahub`: {{< product-c8y-iot >}} DataHub (datalake) content, if provisioned on the node


---

### Step 2 - Prepare the Edge node
Stopping workloads is optional but prevents partial state during the archive.

```shell
systemctl stop k3s
```

Ensure only one backup job runs at a time and confirm the filesystem has enough free space to hold the archive.

---

### Step 3 - Create a consolidated backup 
Run the following command as `root` to collect both directories into a single tarball (or) as per users choice of backup strategy:

```shell
tar -czvf edge-backup.tar.gz /var/lib/rancher/k3s /datahub
```

Move `edge-backup.tar.gz` to offline storage or to your backup repository. Retain checksum information if you wish to valdiate prior to recovery.

---

### Step 4 - Prepare the restore target
1. Install the same operating system (or compatible base image) that originally hosted Edge.
2. Make sure no prior K3s installation or Edge data exists on the target disk.
3. Transfer `edge-backup.tar.gz` to the target node.

{{< c8y-admon-caution >}}
Installing a different Edge or K3s version on top of a restored data set is unsupported and may fail the upgrade guard rails.
{{< /c8y-admon-caution >}}

---

### Step 5 - Restore the data directories
Extract the archive to the root of the filesystem so that both directories land in their original locations:

```shell
tar -xzvf edge-backup.tar.gz -C /
```

Confirm the directories exist and contain the expected ownership:

```
/var/lib/rancher/k3s
/datahub
```

---

### Step 6 - Reinstall the matching Edge release
Re-run the installer with the **exact version** captured in the backup:

```shell
c8yedge install --version <previous_version>
```

The installer reattaches the restored cluster state and Edge-specific configuration.

---

### Step 7 - Verify health
After the services start, validate the cluster and workloads:

```shell
kubectl get nodes
kubectl get pods -A
```

Ensure the {{< product-c8y-iot >}} Edge UI loads and that critical applications are functional before handing the system back to operations.

---

