---
weight: 40
title: Endpoints for monitoring
layout: redirect
---

### ETL pipeline health {#etl-pipeline-health}

The {{< product-c8y-iot >}} DataHub microservice exposes an endpoint to automatically monitor the health of active offloading jobs as well as compaction and data collection jobs. The health status can be monitored with the endpoint <kbd>GET /service/datahub/scheduler/health</kbd>. The endpoint accepts two optional parameters, **format** and **check**. 

The parameter **format** determines the format of the response body. It supports the following values:

| Value | Definition |
| ----- | -----   |
| text | Send the response body as plain text. |
| json | Send the response body as JSON. |

If **format** is not set, the text option is used by default.

The parameter **check** defines which jobs are reported. The parameter supports the following values:

| Value | Definition |
| ----- | -----   |
| ALL | All jobs are reported. |
| OFFLOADING | Only offloading jobs are reported. In corresponding messages such a job is also denoted as CTAS job. |
| COMPACTION | Only compaction jobs are reported. |
| DremioJobDetailPersistence_OFFLOADING | Only the job for collecting and persisting offloading usage data is reported. |
| DremioJobDetailPersistence_QUERY | Only the job for collecting and persisting usage data for ad-hoc queries is reported. |
| C8Y_BILLING_METRICS | Only the job for submitting usage data is reported. |

If **check** is not set, all jobs except C8Y_BILLING_METRICS are reported.

The endpoint examines the latest job executions of qualified jobs and classifies them:

* If the job has failed, it is reported as CRITICAL.
* If the job is still running, it is categorized as follows:
    * If it is running for up to one hour, its health is classified as STEADY.
    * If it is running for up to six hours, its health is classified as WARNING.
    * If it is running for more than six hours, its health is classified as CRITICAL.
* If the job has succeeded, it is checked whether it was the last job that should have been run for this configuration. If there should have been a new run of this job and the system is already 10 minutes behind the scheduled execution time, the job is classified as CRITICAL. Otherwise, the job is classified as STEADY.

If all jobs are classified as STEADY, the endpoint returns the HTTP status code 200 with the following message:

	“HTTP 200 CDHCBEI0029 - Scheduler healthcheck succeeded.”


Otherwise, the endpoint returns the HTTP status code 500 with the following message:

	“HTTP 500 CDHCBEE0031 - Scheduler healthcheck failed: There were failed or suspended jobExecutions.”

The response body indicates the jobs to be checked by an administrator:

    “There were failed or suspended jobExecutions:
    CRITICAL: Job should already have been executed at 14:08:03.705: uuid=34391b71-abaa-477e-b870-2c32aa6ea790, jobType=CTAS, jobRunId=CDHScheduler_9cd4309c-99d7-43ae-92f7-4f1d267faff71713875003234”

The endpoint can be accessed by any logged in {{< product-c8y-iot >}} user who is authorized to access the {{< product-c8y-iot >}} DataHub microservice.
