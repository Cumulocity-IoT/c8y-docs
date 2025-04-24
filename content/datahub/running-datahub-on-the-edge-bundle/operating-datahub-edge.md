---
weight: 40
title: Operating Cumulocity DataHub Edge
layout: redirect
---

Similar to the cloud variant, {{< product-c8y-iot >}} DataHub Edge UI allows you to check system information and view audit logs. See [Operating {{< product-c8y-iot >}} DataHub](/datahub/operating-datahub) for details.

When managing {{< product-c8y-iot >}} DataHub Edge, the following standard tasks are additionally relevant.

### Troubleshooting the system {#troubleshooting-the-system}

If problems occur, you should follow these steps:

- Perform a health check, see [Health check](#health-check)
- Check the log files, see [Log files](#log-files)

If you need to contact [product support](/additional-resources/contacting-support/), include the diagnostic log archive. See [Accessing logs](/{{< c8y-edge-version-major >}}/edge-kubernetes/installing-edge-on-k8/#accessing-logs).

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
curl http://datahub-edge_domain_name/apiv2/server_status
"OK"
```
Dremio is running if *OK* is returned. No response will be returned if it is not running or inaccessible.

#### Log files {#log-files}

Logs are available in the Administration application of {{< product-c8y-iot >}}. Navigate to **Ecosystem** > **Applications**, select the DataHub microservice from the application list and switch to the **Logs** tab.

Dremio logs are available for each pod via kubectl, for example:
```
kubectl -n c8yedge logs dremio-executor-0
kubectl -n c8yedge logs dremio-master-0
```

#### Cleanup of Dremio job history {#cleanup-of-dremio-job-history}

Dremio maintains a history of job details and profiles, which can be inspected in Dremio's job log, that is, the **Jobs** page of the Dremio UI. This job history must be cleaned up regularly to free the resources necessary for storing it.

Dremio is configured to perform the cleanup of job results automatically without downtime. The default value for the maximum age of stored job results is seven days. To change that value, a Dremio administrator must modify the support key *jobs.max.age_in_days*. The changes become effective within 24 hours or after restarting Dremio. See the corresponding [Dremio documentation](https://docs.dremio.com/current/admin/support-settings/) for more details on support keys.
