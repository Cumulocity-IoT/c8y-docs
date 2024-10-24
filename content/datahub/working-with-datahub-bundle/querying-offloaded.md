---
weight: 80
title: Querying offloaded Cumulocity IoT data
layout: redirect
---

{{< product-c8y-iot >}} DataHub offers an SQL interface so that you can efficiently query offloaded device data and leverage the results in your own applications. A prerequisite for running SQL queries over device data is that you have configured and executed offloading pipelines that replicate and transform data from the Operational Store of {{< product-c8y-iot >}} to the data lake.

### Overview {#overview}

As described in [{{< product-c8y-iot >}} DataHub at a glance](/datahub/datahub-overview/#datahub-at-a-glance), {{< product-c8y-iot >}} DataHub manages offloading pipelines which periodically extract data from the Operational Store of {{< product-c8y-iot >}}, transform the data into a relational format, and finally store it in a data lake. Instead of querying the Operational Store, you run your queries against the data lake. The distributed SQL engine Dremio provides the query interfaces to access the data lake.

Different standard interfaces exist for that purpose, namely JDBC, ODBC, and REST. You can also use the Dremio UI. In order to work with one of those interfaces, select **Home** in the navigation bar. Under **Quick links** you will find starting points for the different interfaces.

### Access to data lake contents {#access-to-data-lake-contents}

You need a separate Dremio account to run SQL queries. The Dremio account is required to authenticate your requests when running queries against the data lake using Dremio. In the initial configuration step, a corresponding Dremio user has been created. Contact the administrator for the Dremio account settings.

When you have established a connection, you can run SQL queries against your tables in the data lake (to which new data is appended whenever the offloading pipeline has successfully run). The source you refer to in the query is defined by your tenant ID and the target table you have specified in the offloading configuration. The identifier to be used as the source in a SQL query is defined as follows for the different data lake providers:

* **Azure Storage:** YourTenantIdDataLake.`FileSystem`.YourAccountName.TargetTableName with `FileSystem` denoting the file system within your Azure Storage account
* **Amazon S3:** YourTenantIdDataLake.`Bucket`.YourAccountName.TargetTableName with `Bucket` denoting the bucket within your Amazon S3 account
* **Others:** YourTenantIdDataLake.YourAccountName.TargetTableName

For example, if your tenant ID is `t47110815` and you have defined an offloading configuration to write the alarms collection to the target table `JohnsAlarms` in an Azure Storage account containing a file system named `Dremio`, then an example query would be:

```
SELECT * FROM t47110815DataLake.Dremio.t47110815.JohnsAlarms;
```
You can easily look up the paths to the tables in Dremio's UI. Click on your data lake under "Sources" at the left, then navigate to the table in the right canvas. When you hover over the table name, a small "copy" icon with the tool tip "Copy Path" will appear right of the table name. Clicking on it will copy the table name into your clipboard.

{{< c8y-admon-info >}}
The offloading pipeline must be executed at least once with corresponding data being offloaded before you can run a query.
{{< /c8y-admon-info >}}

### Getting schema information

Each table in the data lake is associated with an offloading pipeline. The schema of the table depends on the configuration of the offloading pipeline. It comprises the schema of the base collection for which the pipeline is configured as well as optionally configured additional result columns. In [Offloading {{< product-c8y-iot >}} base collections](/datahub/working-with-datahub/#offloading-base-collections) you will find the default schema per base collection. In order to get the overall schema of the table you have different options:

* Navigate to the offloading page providing an overview of all offloadings. In the context menu of the corresponding offloading pipeline, select **Edit** or **Show**. Navigate to the final step of the wizard, which provides the overall schema plus sample data. Prerequisite for that procedure is that you have the administrator or manager role as specified in section [Defining {{< product-c8y-iot >}} DataHub permissions and roles](/datahub/setting-up-datahub/#defining-permissions). Also the offloading pipeline feeding data into the according table in the data lake must still exist.
* Log into the Dremio UI with the aforementioned Dremio account. Click on your data lake under "Sources" at the left, then navigate to the table in the right canvas. Hover over the target table to get the schema information.
* Run the following SQL query, with the table path adapted accordingly, to get the schema as well as sample data, using below listed connectivity options:
```
SELECT * FROM t47110815DataLake.Dremio.t47110815.JohnsAlarms LIMIT 5;
```

### Using the Dremio UI {#using-the-dremio-ui}

You can use the Dremio UI to interactively run queries against the data lake. See [Refining offloaded {{< product-c8y-iot >}} data](/datahub/working-with-datahub/#refining-offloaded) for more details.

### Connecting via JDBC {#connecting-via-jdbc}

If you have a Java client, you can use JDBC to run SQL queries against the data lake.  You must download the [Dremio JDBC driver](https://www.dremio.com/drivers/). You can obtain the JDBC connection string and the required driver version from {{< product-c8y-iot >}} DataHub by clicking the **JDBC** icon in the **Quick links** section of the **Home** page. When setting up your JDBC client, use as username and password the credentials from your Dremio account.

### Connecting via ODBC {#connecting-via-odbc}

If you want to use an ODBC client to run SQL queries against the data lake, you must configure the platform-specific driver, following the associated [Dremio installation instructions](https://www.dremio.com/drivers/). To obtain the ODBC connection string, click the **ODBC** icon in the **Quick links** section of the **Home** page. When setting up your ODBC client use as username and password the credentials from your Dremio account.

### Connecting via Dremio REST API {#connecting-via-dremio-rest-api}

Dremio offers an [SQL REST API](https://docs.dremio.com/current/reference/api/sql/) which you can use to run SQL queries against tables in the data lake. You must authenticate with your Dremio account against Dremio in order to use the API.

Note that the API might change any time and {{< company-sag >}} does not provide any guarantees. Dremio does not send any CORS headers, so direct access from a browser-based application is not possible. It is highly recommended to use {{< product-c8y-iot >}} DataHub's REST API, see below.

### Connecting via {{< product-c8y-iot >}} DataHub REST API {#connecting-via-datahub-rest-api}

The {{< product-c8y-iot >}} DataHub server also can handle REST requests for Dremio query processing, serving as a proxy to Dremio. {{< product-c8y-iot >}} DataHub offers two REST APIs for running queries against Dremio. The standard REST API for small to moderate query result sizes and a high-performance REST API for large query result sizes. See the [{{< product-c8y-iot >}} DataHub REST API documentation](https://{{< domain-c8y >}}/api/datahub/) in the {{< openapi >}} for details on the endpoints. When using this API, you authenticate with your {{< product-c8y-iot >}} account, not with your Dremio account.

### Connecting other clients {#connecting-other-clients}

Dremio offers support for connecting a variety of clients, including reporting tools like PowerBI and common analytics languages like Python. The [Dremio documentation](https://docs.dremio.com/current/sonar/client-applications/clients/) discusses how to connect these clients to Dremio and leverage its query capabilities.

See also [Integrating {{< product-c8y-iot >}} DataHub with other products](/datahub/integrating-datahub-with-other-products) to learn how other products can connect to {{< product-c8y-iot >}} DataHub and leverage its query capabilities.
