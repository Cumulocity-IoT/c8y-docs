---
weight: 15
title: Migrating Edge 10.17 to 10.18
layout: redirect
---

The following section outlines the procedure for migrating from Edge 10.17 to 10.18. Since Edge 10.18 is based on the Rocky Linux operating system, the upgrade process entails a side-by-side installation accompanied by data migration.

{{< c8y-admon-important >}}
If you are using a version earlier than Edge 10.17 and plan to migrate to Edge 10.18, you must first update your Edge to version 10.17.
If you are using a version prior to Edge 10.13, you must first update your Edge to version 10.13 before upgrading to 10.17.
{{< /c8y-admon-important >}}

For information about upgrading from an earlier version to Edge 10.17, see:

- [Updating Edge using the GUI](https://{{< domain-c8y >}}/guides/10.17.0/edge/update/#updating-edge-gui)
- [Updating Edge using the REST APIs](https://{{< domain-c8y >}}/guides/10.17.0/edge/update/#updating-edge-rest)

in the *10.17.0 {{< product-c8y-iot >}} Edge guide*.

## Backing Up Data and Configuration on Edge 10.17 {#backing-up-data-on-edge-1017}
In your Edge 10.17 appliance, back up the MongoDB data, Edge, {{< company-c8y >}} Agent, and OPC UA configurations.

{{< c8y-admon-important >}}
Before attempting the backup, ensure that there is sufficient disk space to save the backup in your Edge 10.17 appliance.  
{{< /c8y-admon-important >}}

Perform the following steps as a `root` user on your Edge 10.17 appliance.

1. Run the following commands to unmonitor all services and stop the `opcua-mgmt-service`, `opcua-device-gateway`, `smartrule`, `apama`, `cumulocity-core-karaf` and `mongod` services:

   ```shell
   monit unmonitor all && \
   systemctl stop installation-service opcua-mgmt-service opcua-device-gateway smartrule apama cumulocity-core-karaf mongod
   ```

2. If you have installed {{< product-c8y-iot >}} DataHub in the Edge 10.17 appliance, run the following commands to stop the `cdh-console`, `cdh-master` and `cdh-executor` services:

   ```shell
   service cdh-console stop && \
   service cdh-master stop && \
   service cdh-executor stop
   ```

3. Back up the MongoDB data, data lake contents from the DataHub if present, Edge, Cumulocity Agent, and OPC UA configurations using the following command to create the `/opt/edge-1017-backup.tar` file:

   ```shell
   tar -zcf /opt/edge-1017-backup.tar /opt/softwareag /opt/mongodb /var/lib/cumulocity-agent /usr/edge /opt/opcua
   ```

4. After creating the `/opt/edge-1017-backup.tar` file, copy it to a network drive or storage location that is accessible from the Edge 10.18 appliance you will create in the next step. Once the backup file is safely stored, shut down the Edge 10.17 appliance to prevent any further changes to the system during the migration process. This step is optional and if not performed, you need to copy it directly into the Edge 10.18 appliance once it is created.


## Installing Edge 10.18 {#installing-edge-1018}
Install the Edge appliance 10.18 following the instructions below.

{{< c8y-admon-important >}}
If you have both the Edge 10.17 and Edge 10.18 appliances on the same host machine, ensure that the IP addresses of both appliances are different.
{{< /c8y-admon-important >}}

1. Refer to [Configuring the Edge infrastructure](/edge/edge-infrastructure/) for detailed instructions on importing the Edge 10.18 appliance.
2. Follow the installation procedure on your Edge 10.18 appliance, ensuring to configure the network settings appropriately. For detailed steps, refer to [Installing Edge](/edge/edge-installation/).


## Migrating Backup Data to Edge 10.18 {#migrating-backup-data-to-edge-1018}
After installing and configuring the Edge 10.18 appliance, proceed to migrate the data and configurations backed up from Edge 10.17 to the new appliance.

Perform the following steps as a `root` user on your Edge 10.18 appliance:

1. Transfer the backup file `/opt/edge-1017-backup.tar` from the Edge 10.17 appliance to your Edge 10.18 appliance.
{{< c8y-admon-important >}}
Before copying the backup, ensure that there is sufficient disk space available on your Edge 10.18 appliance. For example, if the size of the data disk in the Edge 10.18 appliance is 75 GB and the size of the backup file is 100 GB, you must expand the size of the data disk by an additional 125 GB (total 200 GB, of which 100 GB used by the backup tar file) before copying the backup. For instructions on expanding disk size, refer to [Expanding the disk size](/edge/operating-edge/#expanding-the-disk-size).
{{< /c8y-admon-important >}}

2. Run the following commands to unmonitor and stop the relevant services:

   ```shell
   monit unmonitor all && \
   systemctl stop installation-service opcua-mgmt-service opcua-device-gateway smartrule apama cumulocity-core-karaf mongod
   ```

3. Cleanup the MongoDB data before replacing the backup data with the following command:

   ```shell
   rm -rf /opt/mongodb/*
   ```

4. Untar the backup file using the following command:

   ```shell
   tar -xf /opt/edge-1017-backup.tar -C /
   ```

5. Reboot the Edge appliance with the following command:

   ```shell
   reboot
   ```

6. Once the Edge appliance restarts, verify its health by following the instructions in the [Health check](/edge/operating-edge/#health-check) section. Ensure that the `monit summary` command returns status *OK* for all services and processes as described in [Using Monit](/edge/operating-edge/#using-monit) section.

7. Follow the steps outlined in [Updating Edge](/edge/edge-update) to finalize the data migration process.

## Configuring Edge 10.18 after data migration {#configuring-edge-1018-after-data-migration}
After migrating data to Edge 10.18, proceed to configure the appliance to the same level as Edge 10.17.

1. Follow the instructions in [Configuring the time synchronization](/edge/edge-configuration/#configuring-time-sync) to synchronize the time settings.

2. Refer to [Configuring the Network](/edge/edge-configuration/#configuring-the-network) for instructions on configuring the network settings.

3. If you have enabled the microservice hosting feature in the Edge 10.17 appliance, follow the instructions in [Enabling the microservice hosting feature](/edge/edge-configuration/#configuring-microservices) to enable the same in Edge 10.18.

4. If you have installed {{< product-c8y-iot >}} DataHub in the Edge 10.17 appliance, follow the instructions in [Setting up {{< product-c8y-iot >}} DataHub Edge](/datahub/running-datahub-on-the-edge/#setting-up-datahub-edge) to install the same in Edge 10.18. Before you proceed with installing {{< product-c8y-iot >}} DataHub, change the ownership of the data lake folders using the following command:
   ```shell
   chown -R systemd-coredump:systemd-coredump /opt/mongodb/cdh-*
   ```

5. For information about security configuration, refer to [Configuring security](/edge/edge-configuration/#configuring-security).

For detailed guidance on configuring the Edge 10.18 appliance, consult [Configuring Edge](/edge/edge-configuration/).


## Sample script to automate the data migration {#sample-script-to-automate-data-migration}
{{< company-sag >}} provides the `edge-1017-to-1018-data-migration.sh` script as a reference for automating the data migration process. You can customize this script according to your requirements. Click [here](/files/edge/edge-1017-to-1018-data-migration.sh) to download the script.

{{< c8y-admon-important >}}
{{< company-sag >}} does not officially support this migration script. It is provided for reference purposes only.
{{< /c8y-admon-important >}}

### Using the script {#using-the-script}

1. Install the Edge 10.18 appliance by following the instructions in [Installing Edge 10.18](/edge/edge-update/#installing-edge-1018)

2. Download the [edge-1017-to-1018-data-migration.sh](/files/edge/edge-1017-to-1018-data-migration.sh) script and copy it to your Edge 10.18 appliance. This script migrates the necessary data including data lake contents from the DataHub.

3. Execute the `edge-1017-to-1018-data-migration.sh` script as a `root` user. Provide the IP address and `root` user password for the Edge 10.17 appliance when prompted. Note that you need to enable root login over SSH on the Edge 10.17 appliance for the script to work properly.

4. After executing the script, reboot the Edge appliance using the following command:

   ```shell
   reboot
   ```

5. Once the Edge appliance restarts, verify its health by following the instructions in the [Health check](/edge/operating-edge/#health-check) section. Ensure that the `monit summary` command returns status *OK* for all services and processes as described in [Using Monit](/edge/operating-edge/#using-monit) section.

6. Follow the steps outlined in [Updating Edge](/edge/edge-update) to finalize the data migration process.

7. Refer to [Configuring Edge 10.18 after data migration](/edge/edge-update/#configuring-edge-1018-after-data-migration) for instructions on configuring the new Edge appliance.
