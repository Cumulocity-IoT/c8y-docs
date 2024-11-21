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

* **Scalable and economic long-term data storage:** {{< product-c8y-iot >}} DataHub offloads data into economic data lake storage for long-term data retention, permitting you to adapt the retention times of your operational store.
* **Advanced data querying:** Data is made available for in-depth analysis to SQL-based analytics tools such as business intelligence, notebook and dashboarding applications.
* **Configurable offloading:** So-called "offloaders" permit you to select what data is offloaded and how it is mapped into the data lake for user-friendly querying.
* TBD: What else to mention here as main points?

### Customer responsibilities

Customer acknowledges the following Customer responsibilities. Customers are encouraged to review the [{{< product-c8y-iot >}} DataHub documentation](/datahub), particularly ... TBD ...

* **Offloading configuration:** Customer maintains compatibility of offloading configurations with the actual data structures present in the operational store.
* **Data lake schema:** Customer maintains compatibility of the data lake schema with tools using the data lake.
* **Storage cost:** Customers are responsible for managing data retention policies within their configured S3 bucket or Azure Data Lake Storage and ensuring that offloading jobs are configured appropriately to align with their organizational requirements, data management strategies and budgets.
* TBD Anything related to tenancy, security/(Dremio) users and administration here or in the next section? I.e. customers to manage security of Dremio users and of connections to Dremio?
* TBD Anything related to JDBC/ODBC drivers?


### Limitations and constraints

Customer acknowledges the following limitations and constraints in using Service.

* **Offloading performance;** Offloading jobs may halt if data structures that are incompatible with the offloading configuration are detected. Customers are advised to monitor offloading jobs for alarms (for example, by forwarding alarms to email).
* **Query performance:** No response time guarantee can be given for queries, as they can be of arbitrarily complex and are scheduled for execution on shared resources.
* TBD: How long are query jobs kept? When is a long-running query cancelled?
* **Schema limitations:** TBD: List any schema limitations in the default CDH product configuration here. (Array sizes, nesting depths, ...)


### Service availability

* Can we see historic service availability on one of the existing instances?
* Otherwise use 99% (max. 7 hours and a bit per month).

### Support and maintenance

* **Technical support:** The Provider will offer [technical support](/additional-resources/contacting-support/) for issues related to the ...
* **Maintenance windows:** Scheduled maintenance will be communicated in advance through Provider’s status notification system (for example,[ https://status.cumulocity.com/](https://status.cumulocity.com/) for EU, US, EMEA), and efforts will be made to minimize disruption during these periods.
* Anything to mention here specifically? E.g., regarding troubleshooting of customer schemata?
