---
weight: 100
title: Migrating Edge Appliance VM to Edge 2025
layout: redirect
---

This section outlines the procedure for migrating from Edge appliance VM 10.17 or 10.18 to Edge 2025. Since the Edge 2025 release is installed on Kubernetes, the migration process entails a side-by-side installation accompanied by data migration.

{{< c8y-admon-important >}}
If you are using an Edge appliance VM version earlier than 10.17, you must first update to 10.17. If you are using a version prior to 10.13, you must first update to 10.13 before updating to 10.17.

For information about upgrading from an earlier version to Edge 10.17, see:
  * [Updating Edge using the GUI](/2024/edge/edge-update/#updating-edge-gui)
  * [Updating Edge using the REST APIs](/2024/edge/edge-update/#updating-edge-rest)
in the 10.17.0 Cumulocity Edge guide.
{{< /c8y-admon-important >}}

{{< c8y-admon-important >}}
Before continuing with the rest of the steps,
  * create a backup of your Edge appliance VM
  * ensure that there is sufficient disk space to store the backup in your Edge appliance
{{< /c8y-admon-important >}}

### Time series conversion
The {{< product-c8y-iot >}} Operational Store provides an enhanced time series support (so-called time series collections) for measurements data. This configuration is enabled in the Edge 2025, hence you have to first migrate the non time series collections in the Edge appliance VM to time series collections. For more details on time series, refer to [enhanced time series support](/standard-tenant/enhanced-time-series-support/).

Perform the following steps to accomplish the time series migration.
1. Ensure that the {{< management-tenant >}} admin user you use in this process has the following roles assigned:
   * ROLE_INVENTORY_READ
   * ROLE_OPTION_MANAGEMENT_READ
   * ROLE_OPTION_MANAGEMENT_ADMIN
   * ROLE_TENANT_MANAGEMENT_ADMIN
   * ROLE_APPLICATION_MANAGEMENT_SUBSCRIPTIONS_READ


2. Set `ADMIN_USER` and `ADMIN_PASSWORD` environment variables used in the subsequent commands:
   ```shell
   export ADMIN_USER="<ADMIN-USER>"          # Replace with {{< management-tenant >}} admin user
   export ADMIN_PASSWORD="<ADMIN-PASSWORD>"  # Replace with {{< management-tenant >}} admin user's password
   ```


3. Run the following command to authenticate to the {{< product-c8y-iot >}} registry. Provide the Edge registry credentials when prompted:

   ```shell
   docker login registry.c8y.io
   ```

   {{< c8y-admon-info >}}
   To request the Edge registry credentials, [contact product support](/additional-resources/contacting-support/).
   {{< /c8y-admon-info >}}   


4. Run the following commands to install and run the `timeseries-migration` microservice:

   ```shell
   DOCKER_GATEWAY_IP=docker network inspect bridge --format='{{(index .IPAM.Config 0).Gateway}}'
   docker run -d \
      --name timeseries-migration \
      --network bridge \
      -p 8888:8080 \
      -p 8001:8001 \
      -e C8Y_BASEURL=http://${DOCKER_GATEWAY_IP}:8111 \
      -e SPRING_DATA_MONGODB_URI=mongodb://${DOCKER_GATEWAY_IP}:27017/admin \
      -e C8Y_BOOTSTRAP_TENANT=management \
      -e C8Y_BOOTSTRAP_USER=${ADMIN_USER} \
      -e C8Y_BOOTSTRAP_PASSWORD=${ADMIN_PASSWORD} \
      -e MICROSERVICE_URL=http://${DOCKER_GATEWAY_IP}:8888 \
      registry.c8y.io/platform/timeseries-migration-server:1.0.326
   ```


5. Follow the container logs using the following command and wait until the message `c.s.m.t.TimeseriesMigrationApplicationKt : Started TimeseriesMigrationApplicationKt ...` appears.

   ```shell
   docker logs -f timeseries-migration
   ```


6. Run the below command to trigger the time series migration:

   ```shell
   curl -k -X PUT \
      https://localhost/service/timeseries-migration/migrations \
      -u "management/${ADMIN_USER}:${ADMIN_PASSWORD}" \
      -H "Accept: application/json" \
      -H "Content-Type: application/json" \
      -d '{ "state": "SCHEDULED", "tenants": [ "edge" ] }'
   ```

   After the data is processed, verified and migrated to the new collection the status of the migration changes to `VERIFIED`.

7. Run the command below to check the migration status and wait until it reaches `VERIFIED` status:

   ```shell
   curl -k -X GET \
      https://localhost/service/timeseries-migration/migrations/edge \
      -u "management/${ADMIN_USER}:${ADMIN_PASSWORD}" \
      -H "Accept: application/json"
   ```

   The response returned should contain the migration status as `VERIFIED` against the Edge tenant.


8. Approve the migration to confirm the process by running the command below:

   ```shell
   curl -k -X PUT \
      https://localhost/service/timeseries-migration/migrations \
      -u "management/${ADMIN_USER}:${ADMIN_PASSWORD}" \
      -H "Accept: application/json" \
      -H "Content-Type: application/json" \
      -d '{ "state": "APPROVED", "tenants": [ "edge" ] }'
    ```

    This will change the status of the migration to `APPROVED`.


9. Run the command below to check the migration status and wait until it is changed to `APPROVED`:

   ```shell
   curl -k -X GET \
      https://localhost/service/timeseries-migration/migrations/edge \
      -u "management/${ADMIN_USER}:${ADMIN_PASSWORD}" \
      -H "Accept: application/json"
   ```
   The response returned should contain the state as `APPROVED` against the Edge tenant.


10. Execute the command below to remove legacy legacy collection:
      ```shell
      mongo \
         --host localhost:27017 \
         edge \
         --eval 'db.pmdata.drop()'
      ```


### Backing Up Data and Configuration of Edge appliance
In your Edge appliance VM, back up the MongoDB data, data lake contents from the DataHub if present.

Perform the following steps as a `root` user on your Edge appliance.

1. Run the following commands to unmonitor and stop all services except the `mongod` service:

   ```shell
   monit unmonitor all && \
   systemctl stop installation-service opcua-mgmt-service opcua-device-gateway smartrule apama cumulocity-core-karaf
   ```

2. If you have installed {{< product-c8y-iot >}} DataHub in the Edge appliance, run the following commands to stop the `cdh-console`, `cdh-master` and `cdh-executor` services:

   ```shell
   service cdh-console stop && \
   service cdh-master stop && \
   service cdh-executor stop
   ```

3. Run the below commands to export the MongoDB data using `mongodump` utility:
   ```shell
   mongodump \
      --host localhost:27017 \
      --db edge --collection users \
      --out=/opt/appliance-edgedb-backup
   ```

4. Tar the MongoDB data and data lake contents from the DataHub if present using the following command to create the `/opt/edge-appliance-backup.tar` file:

   ```shell
   tar -zcf /opt/edge-appliance-backup.tar /opt/appliance-edgedb-backup /opt/softwareag
   ```

5. After creating the `/opt/edge-appliance-backup.tar` file, copy it to a network drive or storage location that is accessible from the machine on which you will install Edge 2025 in the next step. Once the backup file is safely stored, shut down the Edge appliance to prevent any further changes to the system during the migration process. This step is optional and if not performed, you need to copy the backup file into the target machine once it is created.


### Install Edge 2025
Follow the steps document at [Installing Edge](/{{< c8y-edge-version-major >}}/edge-kubernetes/installing-edge-on-k8/) to install and configure Edge 2025.

{{< c8y-admon-important >}}
Ensure that there is sufficient disk space available on the machine in which you intend to install Edge 2025.
For more details, see [Configuring storage](/{{< c8y-edge-version-major >}}/edge-kubernetes/installing-edge-on-k8/#configuring-storage).
{{< /c8y-admon-important >}}

After installing Edge 2025, configure the Edge domain and License to match that of the Edge Appliance VM you are migrating. For details, refer to [Modifying Edge](/{{< c8y-edge-version-major >}}/edge-kubernetes/manage-edge/#modify-edge)

### Restore MongoDB data from the backup
After installing and configuring Edge 2025, proceed to migrate the data backed up from the Edge Appliance VM.

1. Transfer the backup file `/opt/edge-appliance-backup.tar` from the Edge Appliance VM to your Edge 2025.

2. Untar the backup file using the following command:

   ```shell
   tar -xf /opt/edge-1017-backup.tar -C /
   ```

3. Import the MongoDB data:
   * Set `NAMESPACE`, `DB_USER`  and `DB_PASSWORD` environment variables used in the subsequent commands:
      ```shell
      export NAMESPACE=c8yedge     # Replace with the namespace name where you have installed the Edge. Default is c8yedge.
      export DB_USER="databaseAdmin"
      export DB_PASSWORD=$(kubectl get secret internal-generated-tls-certificates -n ${NAMESPACE} -o jsonpath="{.data.password}" | base64 --decode)
      ```

   * Export the users collection from the `edge` DB:

      ```shell
      kubectl exec -it edge-db-rs0-0 -n ${NAMESPACE} -c mongod -- \
         mongoexport \
            --host localhost:27017 \
            --authenticationDatabase=admin \
            --username ${DB_USER} \
            --password ${DB_PASSWORD} \
            --ssl --tlsInsecure \
            --db edge --collection users \
            --out edge-users-export.json

      kubectl cp ${NAMESPACE}/edge-db-rs0-0:edge-users-export.json ./edge-users-export.json -c mongod
      ```

   * Restore the `edge` DB with the data from the Edge Appliance VM:

      ```shell
      kubectl cp /opt/appliance-edgedb-backup ${NAMESPACE}/edge-db-rs0-0:appliance-edgedb-backup -c mongod

      kubectl exec -it edge-db-rs0-0 -n ${NAMESPACE} -c mongod -- \
         mongorestore \
            --host localhost:27017 \
            --authenticationDatabase=admin \
            --username ${DB_USER} \
            --password ${DB_PASSWORD} \
            --ssl --tlsInsecure \
            --db edge \
            --drop \
            appliance-edgedb-backup
      ```

   * Reimport the users from the `edge-users-export.json` file created earlier:

      ```shell
      kubectl cp ./edge-users-export.json ${NAMESPACE}/edge-db-rs0-0:edge-users-export.json  -c mongod

      kubectl exec -it edge-db-rs0-0 -n ${NAMESPACE} -c mongod -- \
         mongorestore \
            --host localhost:27017 \
            --authenticationDatabase=admin \
            --username ${DB_USER} \
            --password ${DB_PASSWORD} \
            --ssl --tlsInsecure \
            --db edge --collection users \
            --file edge-users-export.json
       ```

4. Run the command below to restart Edge:

   ```shell
   kubectl rollout restart deployment -n ${NAMESPACE} c8yedge-operator-controller-manager
   ```
   Ensure you are able to access Edge before continuing with the subsequent steps.


### Configuring Edge 2025 post migration
After migrating data to Edge 2025, proceed to configure it to the same level as Edge Appliance VM.

1. If you have connected your Edge appliance VM to cloud, follow the instructions [Connecting Edge to the cloud](/{{< c8y-edge-version-major >}}/edge-kubernetes/k8-edge-connecting-edge-to-cloud/) to do the same in Edge 2025. 



