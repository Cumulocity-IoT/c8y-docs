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
in the 2024 Cumulocity Edge documentation.

Before proceeding, back up your Edge appliance VM and make sure there is enough disk space to store the MongoDB and DataHub (data lake) backups. For instructions on expanding disk size, refer to [Expanding the disk size](/2024/edge/operating-edge/#expanding-the-disk-size).
{{< /c8y-admon-important >}}

### 1. Time series conversion of Edge appliance data
The {{< product-c8y-iot >}} Operational Store provides an enhanced time series support (so-called time series collections) for measurements data. This configuration is enabled in the Edge 2025, hence you have to first migrate the non time series collections in the Edge appliance VM to time series collections. For more details on time series, refer to [enhanced time series support](/standard-tenant/enhanced-time-series-support/).

Perform the following steps to accomplish the time series migration.
1. Set `MANAGEMENT_ADMIN_USER` and `MANAGEMENT_ADMIN_PASSWORD` environment variables used in the subsequent commands:
   ```shell
   export MANAGEMENT_ADMIN_USER="<MANAGEMENT-ADMIN-USER>"          # Replace with {{< management-tenant >}} admin user
   export MANAGEMENT_ADMIN_PASSWORD="<MANAGEMENT-ADMIN-PASSWORD>"  # Replace with {{< management-tenant >}} admin user's password
   ```

2. Ensure that the {{< management-tenant >}} admin user you use in this process has the following roles assigned:
   * ROLE_INVENTORY_READ
   * ROLE_OPTION_MANAGEMENT_READ
   * ROLE_OPTION_MANAGEMENT_ADMIN
   * ROLE_TENANT_MANAGEMENT_ADMIN
   * ROLE_APPLICATION_MANAGEMENT_SUBSCRIPTIONS_READ

   ```shell
   ROLES=(
      "ROLE_INVENTORY_READ"
      "ROLE_OPTION_MANAGEMENT_READ"
      "ROLE_OPTION_MANAGEMENT_ADMIN"
      "ROLE_TENANT_MANAGEMENT_ADMIN"
      "ROLE_APPLICATION_MANAGEMENT_SUBSCRIPTIONS_READ"
   )
   for ROLE_ID in "${ROLES[@]}"; do
      echo "Assigning role ${ROLE_ID} to Admin User group"
      curl -k -X POST \
         https://localhost/user/management/groups/2/roles \
         -u "management/${MANAGEMENT_ADMIN_USER}:${MANAGEMENT_ADMIN_PASSWORD}" \
         -H "Accept: application/json" \
         -H "Content-Type: application/vnd.com.nsn.cumulocity.rolereference+json" \
         -d "{\"role\": {\"self\": \"/user/roles/${ROLE_ID}\"}}"
      echo -e "\n"
   done    
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
   DOCKER_GATEWAY_IP=$(docker network inspect bridge --format='{{(index .IPAM.Config 0).Gateway}}')
   docker run -d \
      --name timeseries-migration \
      --network bridge \
      -p 8888:8080 \
      -p 8001:8001 \
      -v /opt/edge-pki/ca.crt:/certs/ca.crt:ro \
      -e C8Y_BASEURL=http://${DOCKER_GATEWAY_IP}:8111 \
      -e SPRING_DATA_MONGODB_URI="mongodb://${DOCKER_GATEWAY_IP}:27017/admin?tls=true&tlsAllowInvalidCertificates=true&tlsCAFile=/certs/ca.crt" \
      -e C8Y_BOOTSTRAP_TENANT=management \
      -e C8Y_BOOTSTRAP_USER=${MANAGEMENT_ADMIN_USER} \
      -e C8Y_BOOTSTRAP_PASSWORD=${MANAGEMENT_ADMIN_PASSWORD} \
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
      -u "management/${MANAGEMENT_ADMIN_USER}:${MANAGEMENT_ADMIN_PASSWORD}" \
      -H "Accept: application/json" \
      -H "Content-Type: application/json" \
      -d '{ "state": "SCHEDULED", "tenants": [ "edge" ] }'
   ```

   After the data is processed, verified and migrated to the new collection the status of the migration changes to `VERIFIED`.

7. Run the command below to check the migration status and wait until it reaches `VERIFIED` status:

   ```shell
   curl -k -X GET \
      https://localhost/service/timeseries-migration/migrations/edge \
      -u "management/${MANAGEMENT_ADMIN_USER}:${MANAGEMENT_ADMIN_PASSWORD}" \
      -H "Accept: application/json"
   ```

   The response returned should contain the migration status as `VERIFIED` against the Edge tenant.


8. Approve the migration to confirm the process by running the command below:

   ```shell
   curl -k -X PUT \
      https://localhost/service/timeseries-migration/migrations \
      -u "management/${MANAGEMENT_ADMIN_USER}:${MANAGEMENT_ADMIN_PASSWORD}" \
      -H "Accept: application/json" \
      -H "Content-Type: application/json" \
      -d '{ "state": "APPROVED", "tenants": [ "edge" ] }'
    ```

    This will change the status of the migration to `APPROVED`.


9. Run the command below to check the migration status and wait until it is changed to `APPROVED`:

   ```shell
   curl -k -X GET \
      https://localhost/service/timeseries-migration/migrations/edge \
      -u "management/${MANAGEMENT_ADMIN_USER}:${MANAGEMENT_ADMIN_PASSWORD}" \
      -H "Accept: application/json"
   ```
   The response returned should contain the state as `APPROVED` against the Edge tenant.


10. Execute the command below to remove legacy collection:
      ```shell
      mongo \
         --host localhost:27017 \
         edge \
         --eval 'db.pmdata.drop()'
      ```


### 2. Backing up data and configuration of Edge appliance

In your Edge appliance VM, back up the MongoDB data, data lake contents from DataHub if present.

Perform the following steps as a root user on your Edge appliance.

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
      --db edge \
      --out=/opt/appliance-edgedb-backup
   ```

4. Tar the MongoDB data and data lake contents from DataHub if present using the following command to create the */opt/edge-appliance-backup.tar* file:

   ```shell
   tar -zcf /opt/edge-appliance-backup.tar /opt/appliance-edgedb-backup /opt/softwareag
   ```

5. After creating the */opt/edge-appliance-backup.tar* file, copy it to a network drive or storage location that is accessible from the machine on which you will install Edge 2025 in the next step. Once the backup file is safely stored, shut down the Edge appliance to prevent any further changes to the system during the migration process. This step is optional, and if not performed, you must copy the backup file into the target machine once it is created.


### 3. Install Edge 2025
Follow the steps documented at [Installing Edge](/{{< c8y-edge-version-major >}}/edge-kubernetes/installing-edge-on-k8/) to install and configure Edge 2025.

{{< c8y-admon-important >}}
Ensure that there is sufficient disk space available on the machine in which you intend to install Edge 2025.
For more details, see [Configuring storage](/{{< c8y-edge-version-major >}}/edge-kubernetes/installing-edge-on-k8/#configuring-storage).
{{< /c8y-admon-important >}}

After installing Edge 2025, configure the Edge domain and license to match those of the Edge Appliance VM you are migrating. For details, refer to [Modifying Edge](/{{< c8y-edge-version-major >}}/edge-kubernetes/manage-edge/#modify-edge)

### 4. Restore MongoDB data from the backup
After installing and configuring Edge 2025, proceed to migrate the data backed up from the Edge Appliance VM.

1. Transfer the backup file */opt/edge-appliance-backup.tar* from the Edge Appliance VM to your Edge 2025.

2. Untar the backup file using the following command:

   ```shell
   tar -xf /opt/edge-1017-backup.tar -C /
   ```

3. Import the MongoDB data:
   * Run the command below to commense mongo migration.

   ```shell
   curl -sfL {{< link-c8y-doc-baseurl >}}files/edge-k8s/c8yedge-migration.sh -O && bash ./c8yedge-migration.sh <KUBECONFIG_PATH>
   ```
   Output:
   ```shell
   [2025-06-10 05:31:18] Detecting namespace from PSMDB resource...
   [2025-06-10 05:31:18] Using detected namespace: c8yedge
   [2025-06-10 05:31:18] Extracting MongoDB service info from PerconaServerMongoDB...
   [2025-06-10 05:31:18] Mongo image: docker.io/percona/percona-server-mongodb:7.0.15-9
   [2025-06-10 05:31:18] Mongo service: edge-db-rs0.c8yedge.svc.cluster.local
   [2025-06-10 05:31:18] Secret name: internal-mongo-credentials-and-tls-70258d9060648fd89e6d08cdc9c5ae46949d3d02a235057fb02f65ed2d924f3e
   [2025-06-10 05:31:18] Fetching credentials from secret...
   [2025-06-10 05:31:19] Cleaning up existing pod if any...
   pod "migration" deleted
   [2025-06-10 05:31:49] Constructing Mongo shell command...
   [2025-06-10 05:31:49] Launching pod for MongoDB backup/restore...
   pod/migration created
   [2025-06-10 05:31:49] Pod 'migration' created. Run 'kubectl logs -f pod/migration -n c8yedge' to watch output.
   ```

4. Run the command below to restart Edge:

   ```shell
   kubectl rollout restart deployment -n ${NAMESPACE} c8yedge-operator-controller-manager
   ```
   Ensure you are able to access Edge before continuing with the subsequent steps.


### 5. Configuring Edge 2025 post migration
After migrating data to Edge 2025, proceed to configure it to the same level as Edge Appliance VM.

  * If you have connected your Edge appliance VM to the cloud, follow the instructions [Connecting Edge to the cloud](/{{< c8y-edge-version-major >}}/edge-kubernetes/k8-edge-connecting-edge-to-cloud/) to do the same in Edge 2025. 
