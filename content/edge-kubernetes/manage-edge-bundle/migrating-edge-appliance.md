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

Perform the following steps as a `root` user on your Edge appliance VM to accomplish the time series migration.

1. Set `MANAGEMENT_ADMIN_USER` and `MANAGEMENT_ADMIN_PASSWORD` environment variables used in the subsequent commands:
   ```shell
   MANAGEMENT_ADMIN_USER="<MANAGEMENT-ADMIN-USER>"          # Replace with {{< management-tenant >}} admin user
   MANAGEMENT_ADMIN_PASSWORD="<MANAGEMENT-ADMIN-PASSWORD>"  # Replace with {{< management-tenant >}} admin user's password

   EDGE_REGISTRY_USER="<EDGE-REGISTRY-USER>"                # Replace with Edge registry username 
   EDGE_REGISTRY_PASSWORD="<EDGE-REGISTRY-PASSWORD>"        # Replace with Edge registry password 
   ```

   {{< c8y-admon-info >}}
   To request the Edge registry credentials, [contact product support](/additional-resources/contacting-support/).
   {{< /c8y-admon-info >}}   

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

3. To allow MongoDB to accept both TLS and non-TLS connections, edit */etc/mongod.conf* file and change `requireTLS` to `preferTLS` in the `net.tls.mode` setting, then restart MongoDB with `systemctl restart mongod`.

4. Run the following commands to install and run the `timeseries-migration` microservice:

   ```shell
   docker login registry.c8y.io --username "${EDGE_REGISTRY_USER}" --password "${EDGE_REGISTRY_PASSWORD}"
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

7. After the data is processed, verified and migrated to the new collection the status of the migration changes to `VERIFIED`. Use the command below to check status:

   ```shell
   curl -k -X GET \
      https://localhost/service/timeseries-migration/migrations/edge \
      -u "management/${MANAGEMENT_ADMIN_USER}:${MANAGEMENT_ADMIN_PASSWORD}" \
      -H "Accept: application/json"
   ```

   The response returned should contain the migration status as `VERIFIED` against the Edge tenant.

   {{< c8y-admon-info >}}
   The time to complete time series conversion and reach `VERIFIED` status depends on your database size — larger databases require more time to process.
   {{< /c8y-admon-info >}}

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
   The response returned should contain the migration status as `APPROVED` against the Edge tenant.

10. Stop the `timeseries-migration` microservice:

      ```shell
      docker stop timeseries-migration
      ```

11. Execute the command below to remove legacy collection:
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

2. If you have installed {{< product-c8y-iot >}} DataHub in the Edge appliance, run the following commands to initate CDH backup:

   As a pre requisite lets download sqltool, please execute.
   {{< c8y-admon-important >}}
   If your Edge appliance does not have internet access, please download the file externally and manually copy it to the following location on the Edge appliance: `/home/admin/sqltool-2.7.3.jar`
   {{< /c8y-admon-important >}}

   ```shell
   docker exec -it cdh-admin /opt/dremio/bin/dremio-admin backup -a -d /datalake/edge/bkp -u admin -p <DREMIO_ADMIN-PASSWORD> -j -i
   ```

   ```shell
   curl -L -o /home/admin/sqltool-2.7.3.jar https://repo1.maven.org/maven2/org/hsqldb/sqltool/2.7.3/sqltool-2.7.3.jar
   ```

   ```shell
   curl -sfL {{< link-c8y-doc-baseurl >}}files/edge-k8s/c8y-edge-cdh-db-dump.sh -O && bash ./c8y-edge-cdh-db-dump.sh
   ```

   Once the DB bump is done you will see the following line on the screen. `Export complete! All CSVs saved to: /tmp/hsqldb-csv-dump`

   Stop CDH processes.
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
   tar -zcf /opt/edge-appliance-backup.tar /opt/appliance-edgedb-backup /opt/softwareag /tmp/hsqldb-csv-dump /opt/mongodb/cdh-*
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
   tar -xf /opt/edge-appliance-backup.tar -C /
   ```
   
3. Run the following command to restore the MongoDB data. This command deploys a pod named `edge-appliance-migration`:

   ```shell
   curl -sfL {{< link-c8y-doc-baseurl >}}files/edge-k8s/c8yedge-appliance-migration-db-restore.sh -O && bash ./c8yedge-appliance-migration-db-restore.sh
   ```

   Then, monitor the logs using the command below. Wait until the message `>> Edge DB restore finished.` appears before proceeding to the next step:
   ```shell
   kubectl logs -f pod/edge-appliance-migration -n c8yedge
   ```

4. Run the command below to restart Edge:

   ```shell
   kubectl rollout restart deployment -n c8yedge c8yedge-operator-controller-manager
   ```
   Ensure you are able to [access Edge](/edge-kubernetes/installing-edge-on-k8/#accessing-edge) before continuing with the subsequent steps.

5. Remove the */opt/edge-appliance-backup.tar* and */opt/appliance-edgedb-backup* folders. 
   ```shell
   rm -rf /opt/appliance-edgedb-backup /opt/edge-appliance-backup.tar
   ```

### 5. Restoring CDH
{{< c8y-admon-important >}}
This step is applicable only for customers with CDH deployed.
{{< /c8y-admon-important >}}

1. Copy the Dathub DB dump to respective pod i.e., `datahub-mysql-0` under namespace `edge`. Since the backup taris already untarred earlier.
   ```shell
   kubectl cp /tmp/hsqldb-csv-dump c8yedge/datahub-mysql-0:/tmp/hsqldb-csv-dump
   ```

2. THIS NEEDS MORE SIMPLIFICATION. Under /tmp/hsqldb-csv-dump we will find multiple CSV files each related a specific table. Based on the file name, example 
   `CDH_JOB_HISTORY.csv` execute the follwoing command to import these CSV into appropriate teables.
   Note: Root password can be found in the env `MYSQL_ROOT_PASSWORD`
   ```shell
   kubectl exec -it  -n c8yedge       datahub-mysql-0 -- sh
   mysql --local-infile=1 -u root -p"${MYSQL_ROOT_PASSWORD}"
   USE CDH_edge;
   LOAD DATA LOCAL INFILE '/tmp/hsqldb-csv-dump/CDH_AUDIT_LOG.csv'
   INTO TABLE CDH_AUDIT_LOG
   FIELDS TERMINATED BY ',' 
   OPTIONALLY ENCLOSED BY '"' 
   ESCAPED BY '\\'
   LINES TERMINATED BY '\n'
   IGNORE 1 LINES
   (UUID, TIME, USERNAME, EVENT_TYPE, STATUS, DETAILS, OLD_DATA, NEW_DATA);
   ```

3. Now its time to migrate dremio. As part of previous backup we have taken a backup of the datalake contents stored under `/opt/mongodb/cdh-master/datalake/edge/` of appliance, lets restore them to `/datahub/datalake/edge/`

   ```shell
   cp -r /opt/mongodb/cdh-master/datalake/edge/ /datahub/datalake/edge/
   ```
   
   Since data lake contents are already in place now, lets transfr the dremio metadata i.e., RocksDB. This involves switching dremio deployment to maintainance mode -> importing metadata from appliance -> switching out of maintanace and initialising dremio.

   ```shell
   # Download dremio helmchart from registry.c8y.io, it is mandatory to move forward in this journey.
   # Note: Need to steps on how to download (or) register the helm repo which ever we finalise post review..
   # Ref: https://www.dremio.com/wp-content/uploads/2023/12/Migrate-a-Dremio-Standalone-Cluster-to-Kubernetes-1.pdf
   helm get values dremio -n c8yedge --output yaml > dremio-values-backup-$(date +%Y%m%d-%H%M%S).yaml
   ```
   Previous step ensures that helm values for the given release is saved on local. Lets download `c8y-edge-dremio-admin-values.yaml` file to apply and switch the dremio to maintanance mode. 

   ```shell
   curl -sfL https://example.com/files/edge-k8s/c8y-edge-dremio-admin-values.yaml -o c8y-edge-dremio-admin-values.yaml && \
   helm upgrade dremio ./dremio-11.0.602.tgz -n c8yedge -f ./c8y-edge-dremio-admin-values.yaml
   ```

   Now, dremio deployment will be switched to maintance mode. To confirm execute `kubectl get pods -n c8yedge | grep dremio`, this should return something like this.

   ```shell
   dremio-admin                                                  1/1     Running            0                 3d
   ```

   After this step is confirmed, lets copy the metadata from backup to dremio-admin pod.

   ```shell
   # 1. Find the latest backup directory
   LATEST_BKP=$(ls -dt /opt/mongodb/cdh-master/datalake/edge/bkp/dremio_backup_* | head -n1)
   BACKUP_BASENAME=$(basename "$LATEST_BKP")

   # 2. Copy latest backup directory into the pod
   kubectl cp "$LATEST_BKP" c8yedge/dremio-admin:/opt/dremio/data/

   # 3. Cleanup old data inside the pod
   kubectl exec -n c8yedge dremio-admin -- rm -rf /opt/dremio/data/db/*
   kubectl exec -n c8yedge dremio-admin -- rm -rf /opt/dremio/data/db/.indexing
   kubectl exec -n c8yedge dremio-admin -- rm -rf /opt/dremio/data/catalog/*
   kubectl exec -n c8yedge dremio-admin -- rm -rf /opt/dremio/data/accelerator/*

   # 4. Restore Dremio using the new backup
   kubectl exec -n c8yedge dremio-admin -- /opt/dremio/bin/dremio-admin restore -d /opt/dremio/data/"$BACKUP_BASENAME"/
   ```

   Lets switchout from dremio maintanance mode. 

   ```shell
   helm upgrade dremio ./dremio-11.0.602.tgz -n c8yedge -f ./dremio-values-backup-<TIMESTAMP>.yaml
   ```

   After this, you will see the following pods up and running. Wait for them to completely initlaize without errors.

   ```shell
   dremio-executor-0                                                1/1     Running            0                 9s
   dremio-master-0                                                  1/1     Running            0                 20s
   ```

   Q: What happens now?
   >  Dremio deployment on k8s is fully initialized with applaince meta data. As well as datalake mounted.

   Q: Whats next?
   >  Since dremio is intialized with applaince meta data, some stale configs will carry as well. Now login to your dremio on k8s using applaince credentials and we localise it for our k8s deployment. Also we need to refresh the metadata for datalake as well.

   - Navigate to Datahub and then access dremio from CDH, login to the dremio dashboard using dremio credentials from Appliance.
   - First few steps to be done mandatorily to make this functional are as follows.
      - Click on settings icon on the bottom left, and then navigate to users section on the setting view.
      - Delete the follwoing users `edge/apiuser`, `edge/~c8y`. Now we can create api user from Dremio as per official document.
      - Go to dremio lading page, under the datasets section > Databases > Right click on c8y_source > select Settings.
      - Here we need to configure teh mongoDB source since we are on k8s. Cahnge Host field to `edge-db-rs0.c8yedge.svc.cluster.local` adn retain port as `27017`
      - Tick the check box for `Encrypt connection`, Note: The TLS cert is already added to the trust store as part of initialization.
      - Change Authentication config, Click on Radio button `Master Credentials`. Update credentials Username `databaseAdmin` Password `FROM MONGO SECRET/NEED TO ADD STEPS TO FETCH THE SECRET` and click on save. After this you sould see the c8y_souce as connected or in green colour.
      - On side bar, There is a console/termial icon click it. It will display SQL pane.
      - execute the following command `ALTER SOURCE edgeDataLake REFRESH METADATA;`, this will refresh metadata.
   
   - Now navigate to CDH page on {{< product-c8y-iot >}}.
   - Complete the CDH configuration as per the official docs.





### 5. Configuring Edge 2025 post migration
After successfully migrating your data to Edge 2025, you'll need to configure it to match your previous Edge Appliance VM setup. Here's what you need to do:

#### What's already available?
The following components from your **Edge tenant** are automatically retained in Edge 2025:
   * Web SDK-based applications and plugins
   * Dashboards and Widgets
   * Smart rules
   * Analytics Builder models and Apama Event Processing Language (EPL) apps
   * Branding

#### What needs to be re-uploaded?
* From your **Edge tenant**
   * Custom microservices
* From your **{{< management-tenant >}}**
   * Custom microservices
   * Web SDK-based applications and plugins
   * Dashboards and Widgets
   * Smart rules
   * Analytics Builder models and Apama Event Processing Language (EPL) apps
   * Branding

#### Connecting Edge to the cloud
If your previous Edge Appliance VM was connected to the cloud, you'll need to set up this connection again in Edge 2025. Follow the guide: [Connecting Edge to the cloud](/{{< c8y-edge-version-major >}}/edge-kubernetes/k8-edge-connecting-edge-to-cloud/)
