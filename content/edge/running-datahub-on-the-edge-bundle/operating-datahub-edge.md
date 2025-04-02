---
weight: 40
title: Operating Cumulocity IoT DataHub Edge
layout: redirect
---

Similar to the cloud variant, {{< product-c8y-iot >}} DataHub Edge UI allows you to check system information and view audit logs. See [Operating {{< product-c8y-iot >}} DataHub](/datahub/operating-datahub) for details.

When managing {{< product-c8y-iot >}} DataHub Edge, the following standard tasks are additionally relevant.

### Troubleshooting the system {#troubleshooting-the-system}

If problems occur, you should follow these steps:

- Perform a health check, see [Health check](#health-check)
- Check the log files, see [Log files](#log-files)
- Monitor the system processes, see [Monitoring](#monitoring)

If you need to contact [product support](/additional-resources/contacting-support/), include the output of the diagnostics script. See [Diagnostic utility](/edge/operating-edge/#diagnostics) for details of how to run it.

#### Health check {#health-check}

##### Check {{< product-c8y-iot >}} DataHub Edge backend status {#check-datahub-edge-backend-status}

You can check the status of the backend in the **Administration** page of the {{< product-c8y-iot >}} DataHub UI. Alternatively you can query the `isalive` endpoint, which should produce an output similar to:

```shell
curl --user admin:your_password https://edge_domain_name/service/datahub/isalive

{
  "timestamp" : 1582204706844,
  "version" : {
    "versionId" : "10.6.0.0.337",
    "build" : "202002200050",
    "scmRevision" : "4ddbb70bf96eb82a2f6c5e3f32c20ff206907f43"
  }
}
```

If the backend cannot be reached, you will get an error response.

##### Check Dremio backend status {#check-dremio-backend-status}

You can check the status of Dremio using the `server_status` endpoint:

```shell
curl http://datahub.edge_domain_name/apiv2/server_status
"OK"
```
Dremio is running if *OK* is returned. No response will be returned if it is not running or inaccessible.

#### Log files {#log-files}

The installation log file is stored at */var/log/cdh*.

In order to access the logs of the {{< product-c8y-iot >}} DataHub and Dremio containers, you must use the Docker `logs` command. To follow the logs of cdh-master you must run:

```shell
docker logs -f cdh-master
```

 To follow the logs of cdh-executor you must run:

```shell
docker logs -f cdh-executor
```

The containers are configured to rotate log files with rotation settings of two days and a maximum file size of 10 MB.

#### Monitoring {#monitoring}
{{< product-c8y-iot >}} Edge uses **Monit** for management and monitoring of relevant processes. See [Monitoring](/edge-support/monitoring/) for details. The {{< product-c8y-iot >}} DataHub Edge processes, namely the {{< product-c8y-iot >}} DataHub backend and the Dremio nodes, are also monitored by Monit.

### Data disk management and monitoring {#data-disk-management-and-monitoring}

The data disk is used for storing the state of {{< product-c8y-iot >}} DataHub and Dremio and serves as data lake. In order to ensure that the system can work properly, the disk must not run out of space. The main factors for the disk space allocation of {{< product-c8y-iot >}} DataHub Edge are the Dremio job profiles and the data lake contents.

#### Cleanup of Dremio job history {#cleanup-of-dremio-job-history}

Dremio maintains a history of job details and profiles, which can be inspected in Dremio's job log, that is, the **Jobs** page of the Dremio UI. This job history must be cleaned up regularly to free the resources necessary for storing it.

Dremio is configured to perform the cleanup of job results automatically without downtime. The default value for the maximum age of stored job results is seven days. To change that value, a Dremio administrator must modify the support key *jobs.max.age_in_days*. The changes become effective within 24 hours or after restarting Dremio. See the corresponding [Dremio documentation](https://docs.dremio.com/current/admin/support-settings/) for more details on support keys.

#### Cleanup of data lake contents {#cleanup-of-data-lake-contents}

The data lake contents are not automatically purged, as the main purpose of {{< product-c8y-iot >}} DataHub is to maintain a history of data. However, if disk space is critical and cannot be freed otherwise, parts of the data lake contents must be deleted. Instead of deleting you might also move the data. 

Browse to the data lake folder **/opt/mongodb/cdh-master/datalake** and select the folder whose name equals the target table of the offloading pipeline. The data within the data lake is organized hierarchically, as described in section [Folder structure](/datahub/operating-datahub/#folder-structure-data-lake). To free up disk space, delete the chunk folders and all monthly/daily folders up to a point in time fitting to your needs. For example, delete all folders whose filename indicates that the data is older than 1st of January 2024. In general, you must delete complete folders, not single files within a folder. After you delete the folders, you must make Dremio aware of the changed data lake contents. Given the path to your target table, run the following query in Dremio as an administrator:

```
ALTER PDS <target_table_path> REFRESH METADATA FORCE UPDATE
```

{{< c8y-admon-caution >}}
Data being deleted from the data lake cannot be recovered anymore.
{{< /c8y-admon-caution >}}

#### Backup and Restore {#backup-and-restore}

{{< product-c8y-iot >}} DataHub's runtime state as well as the data lake containing offloaded data reside in the {{< product-c8y-iot >}} Edge server VM. In order to back up and restore {{< product-c8y-iot >}} DataHub, its runtime state, and its data we recommend you to back up and recover the {{< product-c8y-iot >}} Edge server VM as described [Backup and restore](/edge/backup-and-restore/).
