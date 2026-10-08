---
weight: 100
title: Migrating Edge Appliance VM to Edge 2025
layout: redirect
---

This section outlines the procedure for migrating from Edge appliance VM 10.17 or 10.18 to Edge 2025. Since the Edge 2025 release is installed on Kubernetes, the migration process entails a side-by-side installation accompanied by data migration.

{{< c8y-admon-important >}}
If you are using an Edge appliance VM version earlier than 10.17, you must first update to 10.17. If you are using a version prior to 10.13, you must first update to 10.13 before updating to 10.17.

For information about upgrading from an earlier version to Edge 10.17, see **Updating Edge** section in the [2024 {{< product-c8y-iot >}} Edge Appliance VM documentation](/files/edge-k8s/y2024/c8y-edge-appliance-vm-guides-y2024.pdf).

Before proceeding, back up your Edge appliance VM and make sure there is enough disk space to store the MongoDB and DataHub (data lake) backups. For instructions on expanding disk size, refer to **Expanding the disk size** section in the [2024 {{< product-c8y-iot >}} Edge Appliance VM documentation](/files/edge-k8s/y2024/c8y-edge-appliance-vm-guides-y2024.pdf).

**Note:** This document does not cover {{< product-c8y-iot >}} DataHub migration.
{{< /c8y-admon-important >}}

### Step 1 - Backing up data and configuration of Edge appliance

{{< c8y-admon-caution >}}
This step only creates a backup of {{< product-c8y-iot >}} DataHub (datalake) contents. Migration of {{< product-c8y-iot >}} DataHub is outside the scope of this document and must be handled separately (no scripts are currently provided).
{{< /c8y-admon-caution >}}

In your Edge appliance VM, back up the MongoDB data and data lake contents from {{< product-c8y-iot >}} DataHub if present.

Perform the following steps as a root user on your Edge appliance.

1. Unmonitor and stop all services except the `mongod` service:

   ```shell
   monit unmonitor all && \
   systemctl stop installation-service opcua-mgmt-service opcua-device-gateway smartrule apama cumulocity-core-karaf
   ```

2. If you have installed {{< product-c8y-iot >}} DataHub in the Edge appliance, stop the `cdh-console`, `cdh-master` and `cdh-executor` services:

   ```shell
   service cdh-console stop && \
   service cdh-master stop && \
   service cdh-executor stop
   ```

3. Export the MongoDB data using `mongodump` utility:

   ```shell
   mongodump \
      --host localhost:27017 \
      --db management \
      --out=/opt/appliance-edgedb-backup
   ```

   ```shell
   mongodump \
      --host localhost:27017 \
      --db edge \
      --out=/opt/appliance-edgedb-backup
   ```

4. Tar the MongoDB data and data lake contents from {{< product-c8y-iot >}} DataHub if present, into */opt/edge-appliance-backup.tar* :

   ```shell
   tar -zcf /opt/edge-appliance-backup.tar /opt/appliance-edgedb-backup /opt/softwareag
   ```

5. After creating the */opt/edge-appliance-backup.tar* file, copy it to a network drive or storage location that is accessible from the machine on which you will install Edge 2025 in the next step. Once the backup file is safely stored, shut down the Edge appliance to prevent any further changes to the system during the migration process. This step is optional, and if not performed, you must copy the backup file into the target machine once it is created.


### Step 2 - Install Edge 2025
Follow the steps documented at [Installing Edge](https://cumulocity.com/docs/2025/edge-kubernetes/installing-edge-on-k8/) to install and configure Edge 2025.

{{< c8y-admon-important >}}
Ensure that there is sufficient disk space available on the machine in which you intend to install Edge 2025.

After installing Edge 2025, configure the Edge **domain** and **license** to match those of the Edge Appliance VM you are migrating. For details, refer to [Modifying Edge](https://cumulocity.com/docs/2025/edge-kubernetes/manage-edge/#modify-edge).
{{< /c8y-admon-important >}}

### Step 3 - Restore MongoDB data from the backup
After installing and configuring Edge 2025, proceed to migrate the data backed up from the Edge Appliance VM.

1. Transfer the backup file */opt/edge-appliance-backup.tar* from the Edge Appliance VM to your Edge 2025.

2. Untar the backup file:

   ```shell
   tar -xf /opt/edge-appliance-backup.tar -C /
   ```
   
3. Restore the MongoDB data. This step deploys a pod named `edge-appliance-migration`:

   ```shell
   curl -sfL {{< link-c8y-doc-baseurl >}}files/edge-k8s/c8yedge-appliance-migration-db-restore.sh -O && bash ./c8yedge-appliance-migration-db-restore.sh
   ```

   Then, monitor the logs using the command below. Wait until the message `>> Edge DB restore finished.` appears before proceeding to the next step:
   ```shell
   kubectl logs -f pod/edge-appliance-migration -n c8yedge
   ```

4. Unsubscribe and delete all the microservices from edge/management tenants.

5. Remove the Edge Administration plugin:

   1. In the Administration application, navigate to **Ecosystem** > **Applications**.
   2. Open the **Administration** application and switch to the **Plugins** tab.
   3. Select the **{{< product-c8y-iot >}} Edge Administration** plugin and click **Delete**.


6. Restart Edge:

   ```shell
   kubectl rollout restart deployment -n c8yedge c8yedge-operator-controller-manager
   ```
   Ensure you are able to [access Edge](https://cumulocity.com/docs/2025/edge-kubernetes/installing-edge-on-k8/#accessing-edge) before continuing with the subsequent steps.

7. Remove the */opt/edge-appliance-backup.tar* and */opt/appliance-edgedb-backup* folders: 
   ```shell
   rm -rf /opt/appliance-edgedb-backup /opt/edge-appliance-backup.tar
   ```

### Step 4 - Configuring Edge 2025 post migration
After successfully migrating your data to Edge 2025, you'll need to configure it to match your previous Edge Appliance VM setup. Here's what you need to do:

#### What's already available?
The following components from your **Edge tenant** are automatically retained in Edge 2025:
   * Web SDK-based applications and plugins
   * Dashboards and widgets
   * Smart rules
   * Analytics Builder models and Apama Event Processing Language (EPL) apps
   * Branding

#### What needs to be re-uploaded?
* From your **Edge tenant**
   * Custom microservices
* From your **{{< management-tenant >}}**
   * Custom microservices
   * Web SDK-based applications and plugins
   * Dashboards and widgets
   * Smart rules
   * Analytics Builder models and Apama Event Processing Language (EPL) apps
   * Branding

#### Connecting Edge to the cloud
If your previous Edge Appliance VM was connected to the cloud, you'll need to set up this connection again in Edge 2025. Follow the instructions in [Connecting Edge to the cloud](https://cumulocity.com/docs/2025/edge-kubernetes/k8-edge-connecting-edge-to-cloud/)
