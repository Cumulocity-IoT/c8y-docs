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

This agreement defines the service level of {{< product-c8y-iot >}} Software-as-a-Service operated by {{< company-c8y >}}. {{< product-c8y-iot >}} Edge is outside the scope of this agreement.

### Service features

{{< product-c8y-iot >}} DataHub provides the following features.

* **Scalable and economic long-term data storage:** {{< product-c8y-iot >}} DataHub offloads data into economic data lake storage outside of the operational store for long-term data retention, permitting you to shorten the retention times of the more costly operational store.
* **Advanced data querying:** Long-term data is made available for in-depth analysis to SQL-based analytics tools such as business intelligence, notebook, and dashboarding applications.
* **Configurable offloading:** So-called "offloading pipelines" permit you to select what data is offloaded and how it is mapped into the data lake for user-friendly, SQL-based querying.

### Customer responsibilities

Customers are encouraged to review the [{{< product-c8y-iot >}} DataHub documentation](/datahub). In particular, Customer acknowledges the following Customer responsibilities:

* **Data lake provisioning:** Customer provides data lake storage. Customer is responsible for setting correct storage permissions and configuring correct credentials for data lake access in {{< product-c8y-iot >}} DataHub. Refer to [Permissions for data lake and space](/datahub/setting-up-datahub/#permissions-for-data-lake-and-space) for more information. We recommend provisioning the data lake in the same hyperscaler and hyperscaler region as Customer's {{< product-c8y-iot >}} tenants for the best performance.
* **Storage cost:** Customer is responsible for managing data retention policies within Customer's configured S3 bucket or Azure Data Lake Storage and ensuring that offloading jobs are configured appropriately to align with Customer's organizational requirements, data management strategies and budgets.
* **Offloading configuration:** Customer maintains compatibility of offloading configurations with the actual data structures present in the operational store. For more information, please see Section ["Aligning data modeling and offloading"](/datahub/working-with-datahub/#aligning-data-modeling-and-offloading) and Section ["Dealing with mixed types"](/datahub/working-with-datahub/#mixed-types).
* **Offloading monitoring:** To avoid data loss, Customer is recommended to monitor and respond to offloading alarms as data loss may occur. For example, if the data structures in the operational store change, offloaders configured to ["stop pipeline"](/datahub/working-with-datahub/#mixed-types) will halt. If the offloaders are not reconfigured before the configured retention intervals in the operational store apply, data may be deleted before it is offloaded. For this reason, Customer is advised to configure suitable retention intervals in the operational store to allow for reaction times. Alarms can be, for example, forwarded to email for better visibility.
* **Data lake modifications:** Customer is responsible for Customer's modifications to the data lake, such as moving or deleting files, as outlined in Section ["Modifying data in the data lake"](/datahub/working-with-datahub/#modifying-data-in-the-data-lake). In particular, moving files may break DataHub offloading jobs.
* **Data lake schema:** Customer maintains compatibility of the data lake schema with tools querying the data lake.
* **Security:** Customer is responsible for selecting strong passwords for Dremio access and maintaining the passwords safely. Customer is advised to create Dremio users solely through the {{< product-c8y-iot >}} DataHub to prevent data leaks between tenants.
* **Driver usage:** For JDBC and ODBC usage, Customer is advised to download drivers using the [links in the documentation](/datahub/working-with-datahub/#connecting-via-jdbc).

### Limitations and constraints

Customer acknowledges the following limitations and constraints in using Service.

* **Service quotas:** Customer acknowledges the existence of additional quotas as detailed in [service quotas](/service-terms/quotas/#datahub) and in the [Dremio documentation](https://docs.dremio.com/current/get-started/cluster-deployments/architecture/limits/)
* **Dremio usage:** Customer acknowledges that inside {{< product-c8y-iot >}} DataHub, not all features of Dremio are available for use. In particular, public cloud instances do not currently support the use of Dremio reflections and additional data sources beyond the {{< product-c8y-iot >}} operational store.
* **Query performance:** No response time guarantee can be given for queries, as they can be of arbitrary complexity and are scheduled for execution on shared resources. Overly long-running or resource-consuming queries may be canceled by {{< product-c8y-iot >}}'s capacity management.


### Service availability

{{< company-c8y >}} is committed to providing reliable service. The specific service availability targets for {{< product-c8y-iot >}} DataHub are as follows:

* **Production environments:** 99.00% availability
* **Non-production environments:** 95.00% availability

Service availability for [{{< product-c8y-iot >}} DataHub APIs](https://cumulocity.com/api/datahub/#tag/Standard-API) is calculated as outlined in the [platform's service availability section](/service-terms/service-level/#service-availability).

Offloading jobs may not run at a scheduled time if a previous offloading job is still in progress (for example, due to an initial larger volume upload or after a longer period of inactivity) or during scheduled maintenance. Subsequent offloading jobs will eventually catch up with remaining data.

### Support and maintenance

Support and maintenance are provided as outlined in the [platform service-level agreement](/service-terms/service-level/#support-and-maintenance).

Support can answer questions about schema evolution and schema compatibility mechanisms in DataHub. However, support can generally not assist with troubleshooting Customer's specific data schemas.
