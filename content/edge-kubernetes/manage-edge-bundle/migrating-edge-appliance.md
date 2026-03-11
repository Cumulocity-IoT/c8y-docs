---
weight: 100
title: Migrating Edge Appliance VM to Edge 2025
layout: redirect
---

This section outlines the procedure for migrating from Edge appliance VM 10.17 or 10.18 to Edge 2025. Since the Edge 2025 release is installed on Kubernetes, the migration process entails a side-by-side installation accompanied by data migration.

{{< c8y-admon-important >}}
If you are using an Edge appliance VM version earlier than 10.17, you must first update to 10.17. If you are using a version prior to 10.13, you must first update to 10.13 before updating to 10.17.

For information about upgrading from an earlier version to Edge 10.17, see:
  * [Updating Edge using the GUI](https://cumulocity.com/docs/2024/edge/edge-update/#updating-edge-gui)
  * [Updating Edge using the REST APIs](https://cumulocity.com/docs/2024/edge/edge-update/#updating-edge-rest)
in the 2024 {{< product-c8y-iot >}} Edge documentation.

Before proceeding, back up your Edge appliance VM and make sure there is enough disk space to store the MongoDB and DataHub (data lake) backups. For instructions on expanding disk size, refer to [Expanding the disk size](https://cumulocity.com/docs/2024/edge/operating-edge/#expanding-the-disk-size).
{{< /c8y-admon-important >}}

### Step 1 - Time series conversion of Edge appliance data
The {{< product-c8y-iot >}} Operational Store provides an enhanced time series support (so-called time series collections) for measurements data. This configuration is enabled in the Edge 2025, hence you have to first migrate the non time series collections in the Edge appliance VM to time series collections. For more details on time series, refer to [enhanced time series support](/standard-tenant/enhanced-time-series-support/).

Perform the following steps as a `root` user on your Edge appliance VM to accomplish the time series migration.

1. Download the time-series migration microservice image onto the Edge appliance VM using one of the following methods:
   * **Direct pull (Standard):** Use this method if the Edge appliance VM **can access the registry**.
      ```shell
      # 1. Log in to the registry
      EDGE_REGISTRY_USER="<EDGE-REGISTRY-USER>"                # Replace with your Edge registry username
      EDGE_REGISTRY_PASSWORD="<EDGE-REGISTRY-PASSWORD>"        # Replace with your Edge registry password
      docker login registry.c8y.io --username "${EDGE_REGISTRY_USER}" --password "${EDGE_REGISTRY_PASSWORD}"

      # 2. Pull the image
      docker pull registry.c8y.io/platform/timeseries-migration-server:1.0.326
      ```

   * **Transfer via tarball (air-gapped):** Use this method if the Edge appliance VM **cannot access the registry**.
      
      On a system with internet access:
      ```shell
      # 1. Log in to the registry
      EDGE_REGISTRY_USER="<EDGE-REGISTRY-USER>"                # Replace with your Edge registry username
      EDGE_REGISTRY_PASSWORD="<EDGE-REGISTRY-PASSWORD>"        # Replace with your Edge registry password
      docker login registry.c8y.io --username "${EDGE_REGISTRY_USER}" --password "${EDGE_REGISTRY_PASSWORD}"

      # 2. Pull the image
      docker pull registry.c8y.io/platform/timeseries-migration-server:1.0.326

      # 3. Export the image to a tarball
      docker save -o ./timeseries-migration-server.tar registry.c8y.io/platform/timeseries-migration-server:1.0.326
      ```

      On the Edge appliance VM:
      1. Copy the *timeseries-migration-server.tar* file created in the previous step into the */tmp* folder of the Edge appliance VM.
      1. Load the image from the tarball:
         ```shell
         docker load -i /tmp/timeseries-migration-server.tar
         ```

1. Set the following environment variables for use in subsequent commands. Replace the placeholders with the {{< management-tenant >}} admin credentials:
   ```shell
   MANAGEMENT_ADMIN_USER="<MANAGEMENT-ADMIN-USER>"          # {{< management-tenant >}} admin username
   MANAGEMENT_ADMIN_PASSWORD="<MANAGEMENT-ADMIN-PASSWORD>"  # {{< management-tenant >}} admin password
   ```

   {{< c8y-admon-info >}}
   To request the Edge registry credentials, [contact product support](/additional-resources/contacting-support/).
   {{< /c8y-admon-info >}}   

1. Ensure that the {{< management-tenant >}} admin user you use in this process has the following roles assigned:
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

1. To allow MongoDB to accept both TLS and non-TLS connections, edit the */etc/mongod.conf* file and change `requireTLS` to `preferTLS` in the `net.tls.mode` setting, then restart MongoDB with `systemctl restart mongod`.

1. Install and run the `timeseries-migration` microservice:

   ```shell
   DOCKER_GATEWAY_IP=$(docker network inspect bridge --format='{{(index .IPAM.Config 0).Gateway}}')
   docker run -d \
      --name timeseries-migration \
      --network bridge \
      -p 8888:8080 \
      -p 8001:8001 \
      -e C8Y_BASEURL=http://${DOCKER_GATEWAY_IP}:8111 \
      -e SPRING_DATA_MONGODB_URI="mongodb://${DOCKER_GATEWAY_IP}:27017/admin" \
      -e C8Y_BOOTSTRAP_TENANT=management \
      -e C8Y_BOOTSTRAP_USER=${MANAGEMENT_ADMIN_USER} \
      -e C8Y_BOOTSTRAP_PASSWORD=${MANAGEMENT_ADMIN_PASSWORD} \
      -e MICROSERVICE_URL=http://${DOCKER_GATEWAY_IP}:8888 \
      registry.c8y.io/platform/timeseries-migration-server:1.0.326
   ```

1. Follow the container logs using the following command and wait until the message `c.s.m.t.TimeseriesMigrationApplicationKt : Started TimeseriesMigrationApplicationKt ...` appears.

   ```shell
   docker logs -f timeseries-migration
   ```

1. Trigger the time series migration:

   ```shell
   curl -k -X PUT \
      https://localhost/service/timeseries-migration/migrations \
      -u "management/${MANAGEMENT_ADMIN_USER}:${MANAGEMENT_ADMIN_PASSWORD}" \
      -H "Accept: application/json" \
      -H "Content-Type: application/json" \
      -d '{ "state": "SCHEDULED", "tenants": [ "edge" ] }'
   ```

1. After the data is processed, verified, and migrated to the new collection, the status of the migration changes to `VERIFIED`:

   ```shell
   curl -k -X GET \
      https://localhost/service/timeseries-migration/migrations/edge \
      -u "management/${MANAGEMENT_ADMIN_USER}:${MANAGEMENT_ADMIN_PASSWORD}" \
      -H "Accept: application/json"
   ```

   The response returned should contain the migration status as `VERIFIED` against the Edge tenant.

   {{< c8y-admon-info >}}
   The time to complete the time series conversion and reach `VERIFIED` status depends on your database size — larger databases require more time to process.
   {{< /c8y-admon-info >}}

1. Approve the migration to confirm the process:

   ```shell
   curl -k -X PUT \
      https://localhost/service/timeseries-migration/migrations \
      -u "management/${MANAGEMENT_ADMIN_USER}:${MANAGEMENT_ADMIN_PASSWORD}" \
      -H "Accept: application/json" \
      -H "Content-Type: application/json" \
      -d '{ "state": "APPROVED", "tenants": [ "edge" ] }'
    ```

    This will change the status of the migration to `APPROVED`.

1. Check the migration status and wait until it has changed to `APPROVED`:

   ```shell
   curl -k -X GET \
      https://localhost/service/timeseries-migration/migrations/edge \
      -u "management/${MANAGEMENT_ADMIN_USER}:${MANAGEMENT_ADMIN_PASSWORD}" \
      -H "Accept: application/json"
   ```
   The response returned should contain the migration status as `APPROVED` against the Edge tenant.

1. Stop the `timeseries-migration` microservice:

   ```shell
   docker stop timeseries-migration
   ```

1. Remove legacy collection:

   ```shell
   mongo \
      --host localhost:27017 \
      edge \
      --eval 'db.pmdata.drop()'
   ```

### Step 2 - Backing up data and configuration of Edge appliance

In your Edge appliance VM, back up the MongoDB data and data lake contents from {{< product-c8y-iot >}} DataHub if present.

Perform the following steps as a root user on your Edge appliance.

1. Copy the jar from cdh-console:
   ```shell
   docker cp cdh-console:/opt/softwareag/cdh-console/backend/lib/hsqldb-2.7.1.jar /tmp/.
   ```

2. Unmonitor and stop all services except the `mongod` service:

   ```shell
   monit unmonitor all && \
   systemctl stop installation-service opcua-mgmt-service opcua-device-gateway smartrule apama cumulocity-core-karaf
   ```

3. If you have installed {{< product-c8y-iot >}} DataHub in the Edge appliance, stop the `cdh-console`, `cdh-master` and `cdh-executor` services:

   ```shell
   service cdh-console stop && \
   service cdh-master stop && \
   service cdh-executor stop
   ```

4. Export the MongoDB data using `mongodump` utility:

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

5. Export the DataHub backend:

   ```shell
   pip install https://download.cumulocity.com/Cumulocity-Edge/Installer/2025/cdh_migration-2025-py3-none-any.whl && \
   cdh-migration
   ```
   Wait until you see an output `INFO - Data export complete: cdh_backend_db_export.sql`.


6. Tar the MongoDB data and DataHub contents, into */opt/edge-appliance-backup.tar* :

   ```shell
   tar -zcf /opt/edge-appliance-backup.tar /opt/appliance-edgedb-backup /opt/softwareag /opt/mongodb/cdh-dremio/distributed-storage /opt/mongodb/cdh-master/datalake /home/admin/cdh_backend_db_export.sql
   ```

7. After creating the */opt/edge-appliance-backup.tar* file, copy it to a network drive or storage location that is accessible from the machine on which you will install Edge 2025 in the next step. Once the backup file is safely stored, shut down the Edge appliance to prevent any further changes to the system during the migration process. This step is optional, and if not performed, you must copy the backup file into the target machine once it is created.


### Step 3 - Install Edge 2025
Follow the steps documented at [Installing Edge](/2025/edge-kubernetes/installing-edge-on-k8/) to install and configure Edge 2025. If your appliance includes DataHub, then additionally follow the steps in [Working with DataHub](/2025/edge-kubernetes/k8-edge-working-with-datahub/)

{{< c8y-admon-important >}}
Ensure that there is sufficient disk space available on the machine in which you intend to install Edge 2025.

After installing Edge 2025, configure the Edge **domain** and **license** to match those of the Edge Appliance VM you are migrating. For details, refer to [Modifying Edge](https://cumulocity.com/docs/2025/edge-kubernetes/manage-edge/#modify-edge).
{{< /c8y-admon-important >}}

### Step 4 - Restore MongoDB data from the backup
After installing and configuring Edge 2025, proceed to migrate the data backed up from the Edge Appliance VM.

1. Transfer the backup file */opt/edge-appliance-backup.tar* from the Edge Appliance VM to your Edge 2025.

2. Untar the backup file:
   {{< c8y-admon-important >}}
   Ensure that the target EXTRACT_DIR has sufficient free disk space for the backup contents. If there is not enough space, specify an alternate path that has adequate capacity. To verify `df -h "$EXTRACT_DIR"`
   {{< /c8y-admon-important >}}
   ```shell
   export EXTRACT_DIR="$HOME/edge-backup-extracted"
   mkdir $EXTRACT_DIR
   tar -xf /opt/edge-appliance-backup.tar -C $EXTRACT_DIR
   ```

### Step 5 - Restore MongoDB   
1. Restore the MongoDB data. This step deploys a pod named `edge-appliance-migration`:

   ```shell
   curl -sfL {{< link-c8y-doc-baseurl >}}files/edge-k8s/c8yedge-appliance-migration-db-restore.sh -O && bash ./c8yedge-appliance-migration-db-restore.sh
   ```

   Then, monitor the logs using the command below. Wait until the message `>> Edge DB restore finished.` appears before proceeding to the next step:
   ```shell
   kubectl logs -n c8yedge -f pod/edge-appliance-migration
   ```

2. Restart Edge:

   ```shell
   kubectl rollout restart deployment -n c8yedge c8yedge-operator-controller-manager
   ```
   Ensure you are able to [access Edge](/2025/edge-kubernetes/installing-edge-on-k8/#accessing-edge) before continuing with the subsequent steps.

### Step 6 - Restore DataHub
1. Set environment variables for use in subsequent steps:
   ```shell
   EDGE_ADMIN_USER="<EDGE-ADMIN-USER>"          # Replace with <edge-tenant > admin user
   EDGE_ADMIN_PASSWORD="<EDGE-ADMIN-PASSWORD>"  # Replace with < edge-tenant > admin user's password

   EDGE_REGISTRY_USER="<EDGE-REGISTRY-USER>"                # Replace with Edge registry username 
   EDGE_REGISTRY_PASSWORD="<EDGE-REGISTRY-PASSWORD>"        # Replace with Edge registry password

   export CDH_PASSWORD_SECRET=$(grep CDH_PASSWORD_SECRET $EXTRACT_DIR/opt/softwareag/cdh-console/conf/cdh-console-env | cut -d'=' -f2)
   ```

2. Stop the Edge operator:
   ```shell
   kubectl scale deployment -n c8yedge c8yedge-operator-controller-manager --replicas=0
   ```

3. Set the tenant option `CDH_PASSWORD_SECRET` on edge tenant:
      ```shell
      curl --location 'https://<EDGE_HOST_IP>/tenant/options/' \
      -H 'Content-Type: application/vnd.com.nsn.cumulocity.option+json' \
      -H 'Accept: application/vnd.com.nsn.cumulocity.option+json' \
      -u "edge/${EDGE_ADMIN_USER}:${EDGE_ADMIN_PASSWORD}" \
      --data "{
         \"category\": \"datahub\",
         \"key\": \"credentials.CDH_PASSWORD_SECRET\",
         \"value\": \"${CDH_PASSWORD_SECRET}\"
      }"
      ```

4. Migrate Dremio:
   {{< c8y-admon-important >}}
   Ensure the KUBECONFIG environment variable is set. For example, for K3s, you can set it as `export KUBECONFIG=/etc/rancher/k3s/k3s.yaml`.
   {{< /c8y-admon-important >}}
   1. Redeploy Dremio in maintenance mode for migration and fetch the Dremio Helm chart from the installation artifacts:
      ```shell
      helm repo add cdh https://registry.c8y.io/chartrepo/cdh --username "${EDGE_REGISTRY_USER}" --password "${EDGE_REGISTRY_PASSWORD}"
      helm pull cdh/dremio --version $(helm list -n c8yedge --filter dremio -o json | jq -r '.[0].chart | split("-")[1]')
      ```
   2. Set Dremio to maintenance mode:
      ```shell
      helm upgrade dremio ./dremio-$(helm list -n c8yedge --filter dremio -o json | jq -r '.[0].chart | split("-")[-1]').tgz -n c8yedge \
      --set DremioAdmin=true \
      --wait
      ```
   3. Restore RocksDB from the backup:
      a. Remove any stale data under `/opt/dremio/data/db`.
         ```shell
         kubectl exec -n c8yedge dremio-admin -- rm -rf /opt/dremio/data/db
         ```
      b. Copy the backed-up data into the RocksDB directory.
         ```shell
         kubectl cp -n c8yedge $EXTRACT_DIR/opt/mongodb/cdh-master/data/db dremio-admin:/opt/dremio/data/
         ```
   4. Restore the datalake contents:
      a. Remove any stale data under `/datahub/distributedStorage/* /datahub/datalake/*`.
         ```shell
         rm -rf /datahub/distributedStorage/* /datahub/datalake/*
         ```
      b. Copy the backed-up data into the DataLake directories.
         ```shell
         cp -a "$EXTRACT_DIR/opt/mongodb/cdh-dremio/distributed-storage/." /datahub/distributedStorage/ \
         && cp -a "$EXTRACT_DIR/opt/mongodb/cdh-master/datalake/." /datahub/datalake/
         ```

   5. Exit from maintenance mode:
      ```shell
      helm upgrade dremio ./dremio-$(helm list -n c8yedge --filter dremio -o json | jq -r '.[0].chart | split("-")[-1]').tgz -n c8yedge \
      --set DremioAdmin=false \
      --wait
      ```

5. Restore DataHub backend database:
   a. Copy the backed-up SQL script to the `/tmp/` directory.
      ```shell
      kubectl cp -n c8yedge $EXTRACT_DIR/home/admin/cdh_backend_db_export.sql datahub-mysql-0:/tmp/cdh_backend_db_export.sql
      ```
   b. Import the database dump into the DataHub MySQL instance.
      ```shell
      kubectl exec -i -n c8yedge datahub-mysql-0 -- sh -c 'mysql -u root -p"$MYSQL_ROOT_PASSWORD" CDH_edge < /tmp/cdh_backend_db_export.sql'
      ```

6. Configure Dremio:
   After the migration, Dremio will have a legacy configuration of `c8y_source` from the appliance. This needs to be updated for Dremio to communicate with MongoDB. In this step, we will update the `c8y_source` configuration:
   ```shell
   curl -sfL {{< link-c8y-doc-baseurl >}}files/edge-k8s/dremio_source_configuration.sh -O && bash ./dremio_source_configuration.sh
   ```

7. Start the Edge operator:
   ```shell
   kubectl scale deployment -n c8yedge c8yedge-operator-controller-manager --replicas=1
   ```

### Step 7 - Cleanup:
Clean up the `EXTRACT_DIR`:
```shell
rm -rf $EXTRACT_DIR  
```

### Step 8 - Configuring Edge 2025 post migration
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
