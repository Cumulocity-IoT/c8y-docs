---
title: DataHub service-level agreement
layout: bundle
weight: 21
aliases:
  - /datahub-sla/
---

This agreement is made between {{< company-c8y >}} ("Provider") and the Customer ("Customer") who utilizes {{< product-c8y-iot >}} DataHub ("Service") for offloading and analyzing Internet of Things ("IoT") data using Provider's cloud instances ("software-as-a-service", "SaaS").

### Service description

{{< product-c8y-iot >}} DataHub is a component of the {{< product-c8y-iot >}} platform that enables efficient long-term storage and analysis of IoT data. It offloads data from the operational store to a data lake, allowing for scalable SQL-based querying via standard interfaces like ODBC and JDBC.

This agreement defines the service level of {{< product-c8y-iot >}} Software-as-a-Service operated by {{< company-c8y >}}. {{< product-c8y-iot >}} Software-Operated-as-a-Service and {{< product-c8y-iot >}} Edge are outside the scope of this agreement.

### Service features

{{< product-c8y-iot >}} DataHub provides the following features.

* **Scalable and economic long-term data storage:** {{< product-c8y-iot >}} DataHub offloads data into economic data lake storage outside of the operational store for long-term data retention, permitting you to shorten the retention times of the more costly operational store.
* **Advanced data querying:** Long-term data is made available for in-depth analysis to SQL-based analytics tools such as business intelligence, notebook and dashboarding applications.
* **Configurable offloading:** So-called "offloading pipelines" permit you to select what data is offloaded and how it is mapped into the data lake for user-friendly, SQL-based querying.

### Customer responsibilities

Customer acknowledges the following Customer responsibilities. Customers are encouraged to review the [{{< product-c8y-iot >}} DataHub documentation](/datahub), particularly ... TBD, any limitations/responsbilities related existing docs ...


* **Offloading configuration:** Customer maintains compatibility of offloading configurations with the actual data structures present in the operational store. TBD: Mechanisms that help with schema changes. https://cumulocity.com/docs/datahub/working-with-datahub/#mixed-types
* **Data lake schema:** Customer maintains compatibility of the data lake schema with tools using the data lake.
* **Storage cost:** Customers are responsible for managing data retention policies within their configured S3 bucket or Azure Data Lake Storage and ensuring that offloading jobs are configured appropriately to align with their organizational requirements, data management strategies and budgets. TBD: There are instructions to remove data in the docs: http://localhost:1313/docs/datahub/working-with-datahub/#modifying-data-in-the-data-lake
* Moving files may break the offloading process (e.g., kills watermark). Check docs
* Data lake provisioning: Customer has to provide the data lake and the user has to provide correct credentials to the data lake storage. Permissions have to be correclty set. https://cumulocity.com/docs/datahub/setting-up-datahub/#permissions-for-data-lake-and-space Use same hyperscaler, same region; otherwise performance is suboptimal.
* Offloading monitoring: Customer need to respond to offloading alarms. Advice to monitor. If you don't react, you might have data loss.
* Retention management: Offloading jobs may fail; we advice to have slack space so that data is not lost. Add reaction time.
* Do not use all users.


* TBD Anything related to tenancy, security/(Dremio) users and administration here or in the next section? I.e. customers to manage security of Dremio users and of connections to Dremio? --> Maintain high security, password rules from cumulocity
  * Basic auth???
* TBD Anything related to JDBC/ODBC drivers? --> Use drivers linked in the documentation.


### Limitations and constraints

Customer acknowledges the following limitations and constraints in using Service.

* **Offloading performance;** Offloading jobs may halt if data structures that are incompatible with the offloading configuration are detected. Customers are advised to monitor offloading jobs for alarms (for example, by forwarding alarms to email).
* **Query performance:** No response time guarantee can be given for queries, as they can be of arbitrarily complex and are scheduled for execution on shared resources.
* TBD: How long are query jobs kept? When is a long-running query cancelled?
* **Schema limitations:** TBD: List any schema limitations in the default CDH product configuration here. (Array sizes, nesting depths, ...) --> Refer also to platform soft quota

* Dremio is a cloud/OEM version, some features of Dremio are not available.
  * Reflections, due to confidentiality limits.
  * No other data sources can be added. --> Some contradiction to Bernd's migration strategy.
  *

Query runtime
"Semi soft"? -> Auf Anfrage hochgeschraubt -> Sollte "configurable limit" sein
Dremio

Standard dremio limits https://docs.dremio.com/current/get-started/cluster-deployments/architecture/limits/ with explanation ,with exceptions
Field size in record 32 KB -> Soft limit
Array size in Parquet 1000
Dremio: Vereinigung aller blätter 6400 Blätter, also "leaf columns that can be queried" -> Michael sends

Use our API
Jobs are kept for one day, maximum 1000000 rows
High performance API has a limit with rows 1073741824
Nicht häufiger als einmal pro Stunde im Standard plan (soft limit)

Configurable limit for offloading configurations: 100 (on particular customer, problem was coordinator capacity)


### Service availability

* Can we see historic service availability on one of the existing instances?
* Otherwise use 99% (max. 7 hours and a bit per month).

* Correct offloading configuration and correct data lake configuration: Jobs refresh all the missing data, Jobs have retries, failed offloading. May catch up over time (E.g. first offloading)
* Instances are partially with only one coordinator and one executor

### Support and maintenance

* **Technical support:** The Provider will offer [technical support](/additional-resources/contacting-support/) for issues related to the ...
* **Maintenance windows:** Scheduled maintenance will be communicated in advance through Provider’s status notification system (for example,[ https://status.cumulocity.com/](https://status.cumulocity.com/) for EU, US, EMEA), and efforts will be made to minimize disruption during these periods.
* Anything to mention here specifically? E.g., regarding troubleshooting of customer schemata?
