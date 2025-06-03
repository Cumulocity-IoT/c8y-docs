---
weight: 100
title: Migrating Edge Appliance VM to Edge on Kubernetes
layout: redirect
---

This section outlines the procedure for migrating from Edge appliance VM 10.17 or 10.18 to Edge 2025. Since the Edge 2025 release is installed on Kubernetes, the migration process entails a side-by-side installation accompanied by data migration.

{{< c8y-admon-important >}}
If you are using an Edge appliance VM version earlier than 10.17, you must first update to 10.17. If you are using a version prior to 10.13, you must first update to 10.13 before updating to 10.17.

For information about upgrading from an earlier version to Edge 10.17, see:
  - [Updating Edge using the GUI](/2024/edge/edge-update/#updating-edge-gui)
  - [Updating Edge using the REST APIs](/2024/edge/edge-update/#updating-edge-rest)
in the 10.17.0 Cumulocity Edge guide.
{{< /c8y-admon-important >}}

{{< c8y-admon-important >}}
Before continuing with the rest of the steps,
  - create a backup of your Edge appliance VM
  - ensure that there is sufficient disk space to store the backup in your Edge appliance
{{< /c8y-admon-important >}}

## Time series conversion
The {{< product-c8y-iot >}} Operational Store provides an enhanced time series support (so-called time series collections) for measurements data. This configuration is enabled in the Edge 2025, hence you have to first migrate the non time series collections in the Edge appliance VM to time series collections. For more details on time series, refer to [enhanced time series support](/standard-tenant/enhanced-time-series-support/).

Perform the following steps to accomplish the migration.
1. Run the following command to authenticate to the {{< product-c8y-iot >}} registry with a username and password:

   ```shell
   docker login registry.c8y.io
   ```

2. Run the following commands to install and run the `timeseries-migration-server` microservice:

  {{< c8y-admon-info >}}
  ????
  ????
  `172.17.0.1` is Docker gateway and assigned as host IP for appliance.
  {{< /c8y-admon-info >}}

   ```shell
   docker run -d \
      --name timeseries-migration \
      --network bridge \
      -p 8888:8080 \
      -p 8001:8001 \
      -e C8Y_BASEURL=http://172.17.0.1:8111 \
      -e SPRING_DATA_MONGODB_URI=mongodb://172.17.0.1:27017/admin \
      -e C8Y_BOOTSTRAP_USER=edgevm \
      -e C8Y_BOOTSTRAP_PASSWORD=Edgevmadmin@123 \
      -e C8Y_BOOTSTRAP_TENANT=management \
      -e MICROSERVICE_URL=http://172.17.0.1:8888 \
      registry.c8y.io/platform/timeseries-migration-server:1.0.326
   ```

3. Follow the container logs using the following command and wait until the message `c.s.m.t.TimeseriesMigrationApplicationKt : Started TimeseriesMigrationApplicationKt ...` appears.

   ```shell
   docker timeseries-migration registry.c8y.io
   ```

4. Run the below commands to trigger the time series migration:

   ```shell
   curl -X PUT https://172.17.0.1/service/timeseries-migration/migrations -H "authorization: Basic {auth}" -H "content-type: application/json" -d '{ "state": "SCHEDULED", "tenants": [ "edge" ] }'
   ```

5. Chaeck the migration status:

   ```shell
   curl -X GET https://172.17.0.1/service/timeseries-migration/migrations/edge -H "authorization: Basic {auth}" -H "accept: application/json"
   ```
????

6. Approve migration once completed:

   ```shell
    curl -X PUT https://172.17.0.1/service/timeseries-migration/migrations -H "authorization: Basic {auth}" -H "content-type: application/json" -d '{ "state": "APPROVED", "tenants": [ "edge" ] }'
    ```

## Backing Up Data and Configuration of Edge appliance
In your Edge appliance VM, back up the MongoDB data, data lake contents from the DataHub if present, and OPC UA configurations.

Perform the following steps as a `root` user on your Edge appliance.

1. Run the following commands to unmonitor all services and stop the `opcua-mgmt-service`, `opcua-device-gateway`, `smartrule`, `apama`, `cumulocity-core-karaf` and `mongod` services:

   ```shell
   monit unmonitor all && \
   systemctl stop installation-service opcua-mgmt-service opcua-device-gateway smartrule apama cumulocity-core-karaf mongod
   ```

2. If you have installed {{< product-c8y-iot >}} DataHub in the Edge appliance, run the following commands to stop the `cdh-console`, `cdh-master` and `cdh-executor` services:

   ```shell
   service cdh-console stop && \
   service cdh-master stop && \
   service cdh-executor stop
   ```

3. Run the below command to export the MongoDB data using `mongodump` utility:
   
   ```shell
   mongodump --uri="mongodb://localhost:27017/edge?authSource=admin" --out=/opt/mongodb-dump
   ```

4. Back up the MongoDB data, data lake contents from the DataHub if present, and OPC UA configurations using the following command to create the `/opt/edge-appliance-backup.tar` file:

   ```shell
   tar -zcf /opt/edge-appliance-backup.tar /opt/softwareag /opt/mongodb-dump /opt/opcua
   ```

5. After creating the `/opt/edge-appliance-backup.tar` file, copy it to a network drive or storage location that is accessible from the machine on which you will install Edge on Kubernetes in the next step. Once the backup file is safely stored, shut down the Edge appliance to prevent any further changes to the system during the migration process. This step is optional and if not performed, you need to copy the backup file into the target machine once it is created.


## Install Edge 2025
Follow the steps document at [Installing Edge](/2025/edge-kubernetes/installing-edge-on-k8/) to install and configure Edge 2025.

## Restore MongoDB data from the backup
