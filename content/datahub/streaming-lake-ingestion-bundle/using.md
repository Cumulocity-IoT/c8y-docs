---
weight: 20
title: Using Streaming Lake Ingestion
layout: redirect
---

Streaming Lake Ingestion is an optional service in {{< product-c8y-iot >}}. To subscribe to the service, contact the [{{< company-c8y >}} support](/additional-resources/contacting-support/). After subscription,

* Your current device and asset inventory is downloaded from the operational store into the lake.
* All new incoming data is stored in the lake.

{{< c8y-admon-info >}}
The download may take a while to complete. For more information, see [Monitoring the data lake storage](#monitoring-the-data-lake-storage).

The `latest_inventory` tables are pre-populated with your full current inventory at subscription time. Alarms, events, measurements and operations are only recorded for changes that occur after subscription.

For users of DataHub Query (Dremio), the option `CDH_ASSET_WHITELIST` is automatically set on your tenant. This allows granting the tenant's default Dremio user access to the Iceberg source, which is required to read data via the DataHub REST API. Do not change this option.
{{< /c8y-admon-info >}}

### Analyzing lake data {#analyzing-lake-data-using-sql}

You can now analyze your data from any Apache Iceberg compliant tool. For example:

* Through the user interface of the [embedded query engine](/datahub/setting-up-datahub/#dremio-api-user).
* By using the secure and high performance [querying APIs](https://cumulocity.com/api/datahub/) from applications and by using JDBC or ODBC with query engines and database tools.
* By connecting applications directly to the Cumulocity Iceberg catalog.

#### Using DataHub Query to analyze lake data

If your tenant includes a subscription to DataHub Query (Dremio), the system automatically sets up a data source with your tenant ID for querying the lake.

* Click the data source in the user interface to view the Iceberg folders ("namespaces") that contain the tables of your data lake.
* Click a table to open the query editor and run SQL queries on the table. You see an example of a query as shown in the screenshot below.
* To refer to a table, use the pattern `<tenant>.<namespace>.<table>`. For example, if your tenant is "mytenant", the inventory would be referred to as `mytenant.cdc_inventory.inventory`.
* To simplify your SQL statement, click the "Context:" link just above the query editor. You can select a data source and namespace that will be used as context for queries in the editor. For example, if you use "mytenant" as context, you can refer to the inventory using only `cdc_inventory.inventory`. If you use "mytenant.cdc_inventory" as context, you can refer to the inventory using only `inventory`.

![Example of querying the lake](/images/datahub-guide/querying.png)

#### Using DataHub Query APIs and drivers to analyze lake data programmatically

If your tenant includes a subscription to DataHub Query, use the [DataHub APIs](https://cumulocity.com/api/datahub) as well as the [JDBC](/datahub/working-with-datahub/#connecting-via-jdbc) and [ODBC](/datahub/working-with-datahub/#connecting-via-odbc) drivers.

For example, use the REST API to submit a query job to DataHub Query.

```shell
$ curl -H "Content-Type: application/json" -u "<USER>:<PASS>" \
  https://<TENANT_DOMAIN>/service/datahub/dremio/api/v3/sql -d @- <<EOF \
{
  "sql": "SELECT * FROM inventory",
  "context": [ "<TENANT>", "cdc_inventory" ]
}
EOF

{"id":"12345678-1234-5678-1234-5678901234567"}
```

Then fetch the results of the query job once the job has finished.

```shell
$ curl -u "admin:$PASS" \
  https://<TENANT_DOMAIN>/service/datahub/dremio/api/v3/job/12345678-1234-5678-1234-5678901234567/results

{
  "rowCount": 7,
  "schema": [
    { "name": "id", "type": { "name": "VARCHAR" } },
    …
  ],
  "rows": [
    {
      "id": "99266201",
      "lastUpdated": "2026-03-30 15:27:35.781",
      "name": "Temperature #1",
      "owner": "service_device-simulator",
      "type": "c8y_MQTTDevice",
      "eventType": "MANAGED_OBJECT_UPDATE",
    …
  ]
}
```

#### Obtaining Iceberg catalog credentials {#obtaining-iceberg-catalog-credentials}

To connect to the Cumulocity Iceberg catalog directly — for example, from Apache Spark, Databricks, or a custom application — you need OAuth2 client credentials. As a tenant administrator, you can create and manage named catalog principals using the Manager API.

**Prerequisites**

* Your Cumulocity user must have the `ROLE_TENANT_ADMIN` role.
* Your tenant must be subscribed to Streaming Lake Ingestion.
* Principal names must be strictly alphanumeric — letters and digits only, no dashes or underscores (for example, `spark1` or `dremioqa`).

**Creating a principal**

Send a `POST` request to create a named principal. The response contains the `clientId` and `clientSecret` required to authenticate against the Iceberg catalog.

```shell
curl -s -X POST \
  "https://<TENANT_DOMAIN>/service/offloading/api/v1/principals/<NAME>" \
  -u "<USER>:<PASS>"
```

```json
{
  "name":         "<NAME>",
  "clientId":     "<TENANTID>-<NAME>",
  "clientSecret": "<SECRET>"
}
```

{{< c8y-admon-important >}}
The `clientSecret` is returned only once and is never stored by the service. Store it securely immediately after creation. If the secret is lost, rotate the principal to issue new credentials using a `PUT` request — rotating immediately invalidates the previous secret.
{{< /c8y-admon-important >}}

**Listing principals**

To list the names of all principals for your tenant:

```shell
curl -s \
  "https://<TENANT_DOMAIN>/service/offloading/api/v1/principals" \
  -u "<USER>:<PASS>"
```

**Rotating credentials**

To replace a lost or compromised secret. The previous secret is immediately invalidated.

```shell
curl -s -X PUT \
  "https://<TENANT_DOMAIN>/service/offloading/api/v1/principals/<NAME>" \
  -u "<USER>:<PASS>"
```

**Deleting a principal**

To revoke a principal's catalog access immediately:

```shell
curl -s -X DELETE \
  "https://<TENANT_DOMAIN>/service/offloading/api/v1/principals/<NAME>" \
  -u "<USER>:<PASS>"
```

{{< c8y-admon-info >}}
A maximum of 100 principals can be created per tenant by default.
{{< /c8y-admon-info >}}

#### Using the Iceberg catalog from Apache Spark

[Apache Spark](https://spark.apache.org/) is a distributed computing framework that seamlessly integrates with the Cumulocity Iceberg catalogs to provide full SQL-based data processing through a standard [Iceberg REST catalog interface](https://iceberg.apache.org/rest-catalog-spec/).

Use [OpenID Connect](https://openid.net/developers/how-connect-works/) with a client credentials grant type to authenticate against the Cumulocity Iceberg REST catalog.

{{< c8y-admon-info >}}
To obtain client credentials for the Iceberg catalog, see [Obtaining Iceberg catalog credentials](#obtaining-iceberg-catalog-credentials).
{{< /c8y-admon-info >}}

The URL of the OpenID Connect server is

`https://iceberg.<INSTANCE>:19120/api/catalog/v1/oauth/tokens`

For example, if your tenant is `mytenant.cumulocity.com`, the URL is

`https://iceberg.cumulocity.com:19120/api/catalog/v1/oauth/tokens`.

Run Spark SQL queries with the Cumulocity Iceberg catalog on an AWS S3 object store using the example below. In the example, replace

* The version number of the Iceberg Spark Runtime to match the Spark version that you use (here Spark 4.0.x).
* The `<CLIENTID>` and `<CLIENT_SECRET>` with the credentials obtained from support.
* `<INSTANCE>` and `<TENANT_ID>` with your instance URL and tenant ID.
* `<REGION>`, `<AWS_ACCESS_KEY>` and `<AWS_SECRET_ACCESS_KEY>` with credentials to access your AWS S3 store.

```shell
bin/spark-sql \
  --packages org.apache.iceberg:iceberg-spark-runtime-4.0_2.13:1.10.1,org.apache.iceberg:iceberg-aws-bundle:1.10.1 \
  --conf spark.sql.extensions=org.apache.iceberg.spark.extensions.IcebergSparkSessionExtensions \
  --conf spark.sql.catalog.polaris.credential="<CLIENT_ID>:<CLIENT_SECRET>" \
  --conf spark.sql.catalog.polaris.oauth2-server-uri="https://iceberg.<INSTANCE>:19120/api/catalog/v1/oauth/tokens" \
  --conf spark.sql.catalog.polaris.scope="PRINCIPAL_ROLE:ALL" \
  --conf spark.sql.catalog.c8y.rest-metrics-reporting-enabled=false \
  --conf spark.sql.catalog.c8y=org.apache.iceberg.spark.SparkCatalog \
  --conf spark.sql.catalog.c8y.type=rest \
  --conf spark.sql.catalog.c8y.uri=https://iceberg.<INSTANCE>:19120/api/catalog \
  --conf spark.sql.catalog.c8y.warehouse=<TENANT_ID> \
  --conf spark.sql.catalog.c8y.io-impl=org.apache.iceberg.aws.s3.S3FileIO \
  --conf spark.sql.catalog.c8y.s3.endpoint=https://s3.amazonaws.com \
  --conf spark.sql.catalog.c8y.s3.region=<REGION> \
  --conf spark.sql.catalog.c8y.s3.access-key-id=<AWS_ACCESS_KEY_ID> \
  --conf "spark.sql.catalog.c8y.s3.secret-access-key=<AWS_SECRET_ACCESS_KEY>"

spark-sql (default)> show namespaces in c8y;
cdc_alarm
cdc_event
cdc_inventory
cdc_measurement
…
spark-sql (default)> select * from c8y.cdc_inventory.inventory;
99266201	2026-03-30 17:27:35.781	Temperature #1	service_device-simulator	c8y_MQTTDevice	MANAGED_OBJECT_UPDATE	["supportedMeasurements","com_cumulocity_model_Agent","c8y_IsDevice","c8y_SupportedOperations"]	NULL	NULL	NULL	["c8y_Temperature.T"]	2026-03-30 17:07:13.37
99266201	2026-03-30 17:27:44.838	Temperature #1	service_device-simulator	c8y_MQTTDevice	MANAGED_OBJECT_UPDATE	["supportedMeasurements","com_cumulocity_model_Agent","c8y_IsDevice","c8y_SupportedOperations"]	NULL	NULL	NULL	["c8y_Temperature.T"]	2026-03-30 17:07:13.37
```

#### Using the Iceberg catalog from other applications

Access the catalog from other applications using the `curl` example below. To obtain the `<CLIENT_ID>` and `<CLIENT_SECRET>` referenced in this section, see [Obtaining Iceberg catalog credentials](#obtaining-iceberg-catalog-credentials). First, get an access token to the catalog.

```shell
$  curl -X POST https://iceberg.<INSTANCE>:19120/api/catalog/v1/oauth/tokens \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=<CLIENT_ID>" \
  -d "client_secret=<CLIENT_SECRET>" \
  -d "scope=PRINCIPAL_ROLE:ALL"

{"access_token":"ey…","token_type":"bearer","issued_token_type":"urn:ietf:params:oauth:token-type:access_token","expires_in":900}
```

Then use the token to access the catalog configuration and metadata:

```shell
$ curl "https://iceberg.<INSTANCE>:19120/api/catalog/v1/config?warehouse=<TENANT>" \
  -H "Authorization: Bearer <ACCESS_TOKEN>"

{
  "defaults": { "default-base-location": "s3://…>" },
  "overrides": { "prefix": "…" },
  "endpoints": [
    "GET /v1/{prefix}/namespaces",
    "GET /v1/{prefix}/namespaces/{namespace}",
    "HEAD /v1/{prefix}/namespaces/{namespace}",
    "POST /v1/{prefix}/namespaces",
    "POST /v1/{prefix}/namespaces/{namespace}/properties",
    "DELETE /v1/{prefix}/namespaces/{namespace}",
    "GET /v1/{prefix}/namespaces/{namespace}/tables",
    "GET /v1/{prefix}/namespaces/{namespace}/tables/{table}",
    …
}

$ curl https://iceberg.<INSTANCE>:19120/api/catalog/v1/<TENANT>/namespaces/cdc_inventory/tables/inventory' \
  -H "Authorization: Bearer <ACCESS_TOKEN>"

{
  "metadata": {
    "format-version": 2,
    …
    "schemas": [
      {
        "type": "struct",
        "schema-id": 0,
        "fields": [
          { "id": 1, "name": "id", "required": true, "type": "string" },
          { "id": 2, "name": "lastUpdated", "required": true, "type": "timestamptz" },
          { "id": 3, "name": "name", "required": false, "type": "string" },
    …
```

{{< c8y-admon-info >}}
While Iceberg is widely supported, the degree of support currently still varies and we cannot guarantee the catalog to be interoperable with all setups and applications.
{{< /c8y-admon-info >}}

### Understanding the data lake structure

Streaming Lake Ingestion provides three types of data:

* Change data capture (`cdc`): Includes the complete history of incoming IoT data. For example, the `cdc_alarm.alarm` table contains a complete, historical log of all alarm changes, while the `cdc_inventory.inventory` table captures all modifications made to your device master data over time.
* Latest data (`latest`): Provides the current representation of incoming inventory data. For example, the `latest_inventory.inventory` table contains a consolidated view on the latest state of your inventory without you needing to reconstruct the state from the historical logs.
* Views (`view`): Provides views for the change data capture tables. For example, the `view_alarm.alarm` view shows the same content as `cdc_alarm.alarm` with nested properties converted to top-level columns. This makes the data more easily browsable in tools like PowerBI.

For each type of data, folders ("namespaces") are created to mirror the familiar [{{< product-c8y-iot >}} domain model](/concepts/domain-model/) of Cumulocity as shown in the screenshot. You will find folders with names ending in `inventory`, `alarm`, `event`, `measurement` and `operation`. Inside the folders, tables for standard data, device-specific data and customer-specific data are created. Device- or customer-specific data in the form of [fragments](/concepts/domain-model/#fragments) resides in separate, dedicated tables within the corresponding folders. For instance, if you send a measurement with a fragment type `c8y_EngineMetric`, it will be stored in a table named `cdc_measurement.c8y_EngineMetric`.

The following sections discuss the general table structure for each {{< product-c8y-iot >}} domain model class.

#### General table structure {#general-table-structure}

All tables contain the following column:
* `id`: The record ID of the device, asset, alarm, event, measurement or operation associated with the change.
  In the inventory tables, this is the [managed object ID](https://cumulocity.com/docs/concepts/domain-model/#object-identification).

The following columns are present in some tables, depending on the type of data:
* `source`: For alarms, events or measurement, this columns contains the [managed object ID](https://cumulocity.com/docs/concepts/domain-model/#object-identification) of the device or asset associated with the change.
* `deviceId`: For operations, this columns contains the [managed object ID](https://cumulocity.com/docs/concepts/domain-model/#object-identification) of the device targeted for the operation.
* `time`: The timestamp of the change as sent by the device. This column is present for alarms, events and measurements.
* `type`: The type property of the device, measurement and so on.

For change data capture tables and views, the following column is present:
* `eventType`: The type of change indicated by the record. For example, `MANAGED_OBJECT_UPDATE` indicates an update of a managed object.


#### Inventory {#inventory}

##### Creating inventory data

To understand how the service captures inventory data in the data lake, assume that the device user "device_123" creates a new tracking device "Tracking #1" with the following data:

```
{
    "name": "Tracker #1",
    "type": "sb_nano",
    "c8y_Position": {
        "alt": 67,
        "lng": 6.15173,
        "lat": 51.211977
    },
    "c8y_IsDevice": { },
    "someProperty": 10
}
```

This results in the following data in the data lake:

**Table: cdc_inventory.inventory**

| <span style="display: inline-block; width: 50px;">id</span> | <span style="display: inline-block; width: 210px;">lastUpdated<span> | <span style="display: inline-block; width: 80px;">name</span> | <span style="display: inline-block; width: 90px;">owner</span> | <span style="display: inline-block; width: 70px;">type</span> | <span style="display: inline-block; width: 220px;">eventType<span> | <span style="display: inline-block; width: 220px;">fragments</span> | childAdditions | childAssets | childDevices | <span style="display: inline-block; width: 210px;">creationTime</span> | someProperty |
| ----------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------- | -------------- | ----------- | ------------ | ---------------------------------------------------------------------- | ------------ |
| 47635                                                       | 2025-08-20T13:41:39.678Z                                             | Tracker #1                                                    | device_123                                                     | sb_nano                                                       | MANAGED_OBJECT_CREATE                                              | \[c8y_IsDevice, c8y_Position\]                                      | \[\]           | \[\]        | \[\]         | 2025-08-20T13:41:39.678Z                                               | 10           |

The columns of the `inventory` table are:
* `id` contains "47635", the managed object ID assigned to the new device by {{< product-c8y-iot >}}.
* `lastUpdated` contains "2025-08-20T13:41:39.678Z", the timestamp of the most recent update to the managed object in {{< product-c8y-iot >}}.
* `name` contains "Tracker #1", the name of the managed object as used in the request.
* `owner` contains the user who created the managed object
* `type` contains "sb_nano", the type of the managed object as used in the request to create the managed object.
* `eventType` contains "MANAGED_OBJECT_CREATE", the event type for creating a new managed object.
* `fragments` contains a list of all fragments used in the managed object.
* `childAdditions` contains a list of IDs of services linked to a device.
* `childAssets` contains a list of IDs of child assets of an asset.
* `childDevices` contains a list of IDs of child devices of an asset or device.
* `someproperty` contains 10. {{< product-c8y-iot >}} creates additional columns in the `inventory` table when there are top-level properties of an atomic type in the managed object (character strings, numbers, booleans).

Additional columns may be visible depending on your use of Cumulocity. For example, once the device has emitted measurements, you will see a column `supportedMeasurements` with a list of the measurement fragments sent by the device.

{{< c8y-admon-info >}}
Use top-level properties with care. For example, if you have custom properties that you want to store for all devices, such properties may be a good choice.
However, the total number of top-level properties is limited through a [table width limit](#limits-of-streaming-lake-ingestion). If you exceed the table width limit,
additional properties will not be written to the inventory table but "[binned](#binning)".
Note also that very wide tables with many properties will lead to more inefficient storage and querying.
We advise you to prefer fragments for custom data when modeling your device data model.
{{< /c8y-admon-info >}}

**Table: cdc_inventory.c8y_Position**

For the `c8y_Position` fragment, a table `c8y_Position` is created with the following columns:

| id    | eventType             | lastUpdated              | alt | lng     | lat       |
| ----- | --------------------- | ------------------------ | --- | ------- | --------- |
| 47635 | MANAGED_OBJECT_CREATE | 2025-08-20T13:41:39.678Z | 67  | 6.15173 | 51.211977 |

Generally, columns are set as follows:
* Key columns are stored as previously described.
* Properties of the fragment are stored in additional columns of the table.

{{< c8y-admon-info >}}
Marker fragments such as `c8y_IsDevice` are only represented in the `fragments` property of the `inventory` tables. No additional tables are created.
{{< /c8y-admon-info >}}


**Table: latest_inventory.inventory**

In addition, the service stores the latest data in corresponding tables in the `latest_inventory` folder. You will find a table "inventory" with the following structure:

| id    | lastUpdated              | name       | owner      | type    | …   | someProperty |
| ----- | ------------------------ | ---------- | ---------- | ------- | --- | ------------ |
| 47635 | 2025-08-20T13:41:39.678Z | Tracker #1 | device_123 | sb_nano | …   | 10           |

Since the table reflects the only latest state of the inventory and not the entire change history, no `eventType` column is provided.

{{< c8y-admon-info >}}
The `latest_inventory` tables are pre-populated at subscription time with all managed objects that exist in your inventory. Unlike the change data capture tables, which only record changes that occur after subscription, `latest_inventory` reflects the complete current state from the start. The initial population may take a while for large tenants.
{{< /c8y-admon-info >}}

**Table: latest_inventory.c8y_Position**

Accordingly, the latest custom data is visible in the `c8y_Position` table in `latest_inventory`:

| id    | lastUpdated              | alt | lng     | lat       |
| ----- | ------------------------ | --- | ------- | --------- |
| 47635 | 2025-08-20T13:41:39.678Z | 67  | 6.15173 | 51.211977 |

##### Updating inventory data

Assume that the tracking device updates its location:
```
{
    "c8y_Position": {
        "alt": 69,
        "lng": 6.3213,
        "lat": 50.425
    }
}
```

This update appears in the `inventory` and `c8y_Position` tables as follows:

**Table: cdc_inventory.inventory**

| id    | lastUpdated              | name       | owner      | type    | eventType             | …   | creationTime             | someProperty |
| ----- | ------------------------ | ---------- | ---------- | ------- | --------------------- | --- | ------------------------ | ------------ |
| 47635 | 2025-08-20T13:41:39.678Z | Tracker #1 | device_123 | sb_nano | MANAGED_OBJECT_CREATE | …   | 2025-08-20T13:41:39.678Z | 10           |
| 47635 | 2025-08-20T13:45:20.002Z | Tracker #1 | device_123 | sb_nano | MANAGED_OBJECT_UPDATE | …   | 2025-08-20T13:41:39.678Z | 10           |

**Table: cdc_inventory.c8y_Position**

| id    | eventType             | lastUpdated              | alt | lng     | lat       |
| ----- | --------------------- | ------------------------ | --- | ------- | --------- |
| 47635 | MANAGED_OBJECT_CREATE | 2025-08-20T13:41:39.678Z | 67  | 6.15173 | 51.211977 |
| 47635 | MANAGED_OBJECT_UPDATE | 2025-08-20T13:45:20.002Z | 69  | 6.3213  | 50.425    |

**Table: latest_inventory.inventory**

The "latest data" versions of the tables reflect this update:

| id    | lastUpdated              | name       | owner      | type    | …   | creationTime             | someProperty |
| ----- | ------------------------ | ---------- | ---------- | ------- | --- | ------------------------ | ------------ |
| 47635 | 2025-08-20T13:45:20.002Z | Tracker #1 | device_123 | sb_nano | …   | 2025-08-20T13:41:39.678Z | 10           |

**Table: latest_inventory.c8y_Position**

| id    | lastUpdated              | type    | alt | lng    | lat    |
| ----- | ------------------------ | ------- | --- | ------ | ------ |
| 47635 | 2025-08-20T13:45:20.002Z | sb_nano | 69  | 6.3213 | 50.425 |

##### Deleting inventory data

Currently, delete operations of inventory entries are only written for CDC tables. When a managed object is deleted, an
update is written to `cdc_inventory.inventory` like the following:

| id    | lastUpdated              | eventType             | name | fragments | …   | creationTime | someProperty |
| ----- | ------------------------ | --------------------- | ---- | --------- | --- | ------------ | ------------ |
| 47635 | 2026-04-14T12:10:00.009Z | MANAGED_OBJECT_DELETE | null | null      | …   | null         | null         |

Only the key columns are updated.

<!--
Finally, assume that you delete the device. This results in a record with `eventType` "MANAGED_OBJECT_DELETE" and the last properties stored on the device. Records of deleted devices currently remain visible in the `latest_inventory` tables.

**Table: cdc_inventory.inventory**

| id    | lastUpdated              | name       | owner      | type    | eventType             | fragments                      | childAdditions | childAssets | childDevices | creationTime             | someProperty |
| ----- | ------------------------ | ---------- | ---------- | ------- | --------------------- | ------------------------------ | -------------- | ----------- | ------------ | ------------------------ | ------------ |
| 47635 | 2025-08-20T13:41:39.678Z | Tracker #1 | device_123 | sb_nano | MANAGED_OBJECT_CREATE | \[c8y_IsDevice, c8y_Position\] | \[\]           | \[\]        | \[\]         | 2025-08-20T13:41:39.678Z | 10           |
| 47635 | 2025-08-20T13:45:20.002Z | Tracker #1 | device_123 | sb_nano | MANAGED_OBJECT_UPDATE | \[c8y_IsDevice, c8y_Position\] | \[\]           | \[\]        | \[\]         | 2025-08-20T13:41:39.678Z | 10           |
| 47635 | 2025-08-20T13:50:20.002Z | Tracker #1 | device_123 | sb_nano | MANAGED_OBJECT_DELETE | \[c8y_IsDevice, c8y_Position\] | \[\]           | \[\]        | \[\]         | 2025-08-20T13:41:39.678Z | 10           |

**Table: cdc_inventory.c8y_Position**

| id    | eventType             | lastUpdated              | alt | lng     | lat       |
| ----- | --------------------- | ------------------------ | --- | ------- | --------- |
| 47635 | MANAGED_OBJECT_CREATE | 2025-08-20T13:41:39.678Z | 67  | 6.15173 | 51.211977 |
| 47635 | MANAGED_OBJECT_UPDATE | 2025-08-20T13:45:20.002Z | 69  | 6.3213  | 50.425    |
| 47635 | MANAGED_OBJECT_DELETE | 2025-08-20T13:50:20.002Z | 69  | 6.3213  | 50.425    |
-->

#### Alarms {#alarms}

Assume that our sample tracking device has low battery and sends an alarm:

```
{
  "source": { "id": "47635" },
  "type": "c8y_BatteryAlarm",
  "text": "Battery level below 5 percent.",
  "severity": "MAJOR",
  "status": "ACTIVE",
  "time": "2025-08-19T12:03:27.845Z"
}
```

This results in the following data in the data lake:

**Table: cdc_alarm.alarm**

| <span style="display: inline-block; width: 130px;">eventType</span> | <span style="display: inline-block; width: 210px;">time</span> | <span style="display: inline-block; width: 40px;">count</span> | <span style="display: inline-block; width: 60px;">severity</span> | <span style="display: inline-block; width: 50px;">source</span> | <span style="display: inline-block; width: 60px;">status</span> | <span style="display: inline-block; width: 230px;">text</span> | <span style="display: inline-block; width: 160px;">type</span> | <span style="display: inline-block; width: 210px;">firstOccurrenceTime</span> | <span style="display: inline-block; width: 50px;">id</span> |
| ------------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------- |
| ALARM_CREATE                                                        | 2025-08-19T12:03:27.845Z                                       | 1                                                              | MAJOR                                                             | 47635                                                           | ACTIVE                                                          | Battery level below 5 percent.                                 | c8y_BatteryAlarm                                               | 2025-08-19T12:03:27.845Z                                                      | 12345                                                       |

Again, the columns of the table represent the [properties of a {{< product-c8y-iot >}} alarm](https://cumulocity.com/api/core/#tag/Alarms). The `eventType` property reflects the recorded change (in this case, a created alarm), and the `count` property is added by {{< product-c8y-iot >}}'s [alarm de-duplication](https://cumulocity.com/api/core/#alarm-de-duplication).
The `firstOccurrenceTime` column is added to reflect the time of the first occurrence of the alarm, which stays the same for de-duplicated alarms.

In the example, there are no custom properties or fragments in the alarm data. The service treats such properties or fragments in the same way as described for the inventory.


#### Events {#events}

Now assume that the tracker moves and sends a location update event.

```
{
    "c8y_Position": { "alt": 67, "lng": 6.95173, "lat": 51.151977 },
    "time": "2025-08-20T13:41:39.678Z",
    "source": { "id": "47635" },
    "type": "c8y_LocationUpdate",
    "text": "Tracker location update"
}
```

This results in the following data in the data lake, consistent with the method described previously.

**Table: cdc_event.event**

| eventType    | time                     | source | text                    | type               | id    |
| ------------ | ------------------------ | ------ | ----------------------- | ------------------ | ----- |
| EVENT_CREATE | 2025-08-20T13:41:39.678Z | 47635  | Tracker location update | c8y_LocationUpdate | 12345 |

**Table: cdc_event.c8y_position**

| id    | source | eventType    | time                     | type               | alt | lng     | lat       |
| ----- | ------ | ------------ | ------------------------ | ------------------ | --- | ------- | --------- |
| 12345 | 47635  | EVENT_CREATE | 2025-08-20T13:41:39.678Z | c8y_LocationUpdate | 67  | 6.15173 | 51.211977 |


#### Measurements {#measurements}

To illustrate the storage of measurements, assume that the tracking device sends a battery measurement in the following form:

```
{
  "time": "2025-08-20T13:42:39.678Z",
  "source": { "id": "47635" },
  "type": "c8y_BatteryMeasurement",
  "c8y_Battery": {
    "voltage": { "value": 12.8, "unit": "V" },
    "stateOfCharge": { "value": 85.5, "unit": "%" },
    "temperature": { "value": 22.5, "unit": "C" }
  }
}
```

This results in the following data in the data lake:

**Table: cdc_measurement.c8y_Battery**

| <span style="display: inline-block; width: 50px;">id</span> | <span style="display: inline-block; width: 50px;">source</span> | <span style="display: inline-block; width: 200px;">eventType</span> | <span style="display: inline-block; width: 210px;">time</span> | <span style="display: inline-block; width: 200px;">type</span> | <span style="display: inline-block; width: 90px;">voltage</span> | <span style="display: inline-block; width: 110px;">stateOfCharge</span> | <span style="display: inline-block; width: 100px;">temperature</span> |
| ----------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------- |
|                                                             |                                                                 |                                                                     |                                                                |                                                                | value \| unit                                                    | value \| unit                                                           | value \| unit                                                         |
| 12345                                                       | 47635                                                           | MEASUREMENT_CREATE                                                  | 2025-08-20T13:42:39.678Z                                       | c8y_BatteryMeasurement                                         | 12.8 \| V                                                        | 85.5 \| %                                                               | 22.5 \| C                                                             |

There is one important difference for measurements compared to other data types: There is no `cdc_measurement.measurement` table. All relevant data is present in the fragment tables.

This example also demonstrates how the service handles nested properties: Like the {{< product-c8y-iot >}} APIs and its operational store, Apache Iceberg supports nested data. Just like with the above JSON example, the property `voltage` is a nested structure containing two properties `value` and `unit`. You can query the contained properties from SQL using path expressions such as `"voltage"."value"`. For more information on querying the data from SQL, see [Example queries](#example-queries).

#### Operations {#operations}

Finally, we would like to restart the tracker with a reset operation:

```
{
  "deviceId": "47635",
  "c8y_Restart": { }
}
```

This results in the following data in the data lake:

**Table: cdc_operation.operation**

| <span style="display: inline-block; width: 160px;">eventType</span> | <span style="display: inline-block; width: 210px;">creationTime</span> | <span style="display: inline-block; width: 80px;">deviceId</span> | <span style="display: inline-block; width: 80px;">agentId</span> | <span style="display: inline-block; width: 80px;">status</span> | <span style="display: inline-block; width: 100px;">description</span> | <span style="display: inline-block; width: 60px;">id</span> | <span style="display: inline-block; width: 210px;">lastUpdated</span> | <span style="display: inline-block; width: 130px;">fragments</span> |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------- |
| OPERATION_CREATE                                                    | 2025-08-21T13:42:39.678Z                                               | 47635                                                             | 47635                                                            | PENDING                                                         | null                                                                  | 12345                                                       | 2025-08-21T13:42:39.678Z                                              | \[c8y_Restart\]                                                     |

The columns represent the [properties of a {{< product-c8y-iot >}} operation](https://cumulocity.com/api/core/#operation/getOperationCollectionResource). If you do not provide an optional property, the service stores it as a SQL "null" value.

#### Data types

{{< product-c8y-iot >}} relies on JSON as data exchange format in its APIs. JSON data types map to Iceberg data types as follows:

* Strings parsed as timestamps become the Iceberg `timestamptz` data type. Otherwise, they become the Iceberg `string` data type.
* Numbers are stored as Iceberg `decimal` with a maximum precision of 38 and scale of 9.
* Booleans (true/false) map to the equivalent Iceberg `boolean` data type.
* JSON lists become the equivalent Iceberg `list` data type.
* JSON objects become the equivalent Iceberg `struct` data type.

"Null" values are stored as Iceberg "null" values.

Empty JSON objects (`{}`) and empty arrays (`[]`) carry no data to store. They are omitted from the input and treated the same as an absent or "null" property, rather than being converted to a value of the column's data type.

{{< c8y-admon-info >}}
For more information related to Iceberg data types, please refer to the [Iceberg specification](https://iceberg.apache.org/spec/#semi-structured-types). Note that there are various [structural limits](#limits-of-streaming-lake-ingestion) that the service implements to ensure that common upstream query engines can interact with the data produced by the service.
{{< /c8y-admon-info >}}

#### Schema evolution {#schema-evolution}

The data lake storage service automatically discovers the structure of the incoming data and applies it to the data lake.
* When the service discovers a new fragment, it creates a table to store the data in the fragment.
* When the service discovers a new property, it creates a column to store the data in the associated table.

#### Handling of schema conflicts {#handling-of-schema-conflicts}

Contrary to Apache Iceberg and SQL, {{< product-c8y-iot >}} does not mandate a consistent schema across all incoming data. Consistency issues are automatically discovered and resolved by the service. Revisiting our previous example, assume that "Tracker #1" sends data as follows:

```
{
    "name": "Tracker #1",
    …
    "someProperty": 10
}
```

**Table: cdc_inventory.inventory**

| id    | lastUpdated              | name       | …   | someProperty |
| ----- | ------------------------ | ---------- | --- | ------------ |
| 47635 | 2025-08-20T13:41:39.678Z | Tracker #1 | …   | 10           |


Now, "Tracker #2" sends data with a slightly different structure:

```
{
    "name": "Tracker #2",
    …
    "someProperty": "Some Value"
}
```

Storing the string value "Some Value" of `someProperty` in the numeric column with the corresponding name is not possible. When such a mismatch in type occurs, a new overflow column is created. The new column uses the same name as the property, but appends a double underscore followed by a short type suffix:

**Table: cdc_inventory.inventory**

| id    | lastUpdated              | name       | …   | someProperty | someproperty__s |
| ----- | ------------------------ | ---------- | --- | ------------ | --------------- |
| 47635 | 2025-08-20T13:41:39.678Z | Tracker #1 | …   | 10           | null            |
| 47636 | 2025-08-20T13:55:20.002Z | Tracker #2 | …   | null         | Some Value      |


Overflow columns use the following type suffixes:

| Data Type             | Suffix |
| --------------------- | ------ |
| string                | __s    |
| decimal               | __d    |
| timestamp             | __t    |
| boolean               | __b    |
| struct                | __o    |
| list&lt;string&gt;    | __ls   |
| list&lt;decimal&gt;   | __ld   |
| list&lt;timestamp&gt; | __lt   |
| list&lt;boolean&gt;   | __lb   |
| list&lt;struct&gt;    | __lo   |

If you send additional type variations for the same property, additional overflow columns are created accordingly. For example, if "Tracker #3" later sends `"someProperty": [true]`, a new column `someproperty__lb` would be created for the list of booleans.

{{< c8y-admon-info >}}
The type of the existing column never changes automatically to ensure that your existing queries and reports do not break. Also, to prevent naming conflicts, incoming data with property names ending in these overflow suffixes is rejected and not stored in the main tables.

If there is a conflict between a top-level property with a fragment of the same name, the service creates a new table for the fragment. For example, if you have a top-level `"version": "1.0"` and send a `"version": { "major": 1, "minor": 0 }`, a table `version` is created.
{{< /c8y-admon-info >}}

{{< c8y-admon-info >}}
The result of schema conflict resolution depends on the order in which messages are processed. If you first send a message with a numeric `version` property and then a message with a string `version` property, the result is two properties `version` (decimal) and `version__s`. If you reverse the order of the messages, the result is two properties `version` (string) and `version__d`.

Note that the order in which messages are sent to {{< product-c8y-iot >}} and the order in which they are processed do not necessarily coincide. For more details on ordering guarantees, visit the [Messaging Service documentation](https://{{< domain-c8y >}}/api/core/#tag/About-notifications-2.0).
{{< /c8y-admon-info >}}

#### Naming {#naming}

The Iceberg data lake supports names consisting of characters, numbers, underscores, and dashes — except as the first character, which must always be a letter (a-z, A-Z). Digits, underscores, dashes, and any other character are not permitted in the first position, even though they are permitted elsewhere in the name. Other characters are represented by the character string "\_x" followed by the hexadecimal Unicode value of the character. This applies to table and property names, at any nesting level.

For example, if you use the property name "switch:status" in the data sent to {{< product-c8y-iot >}}, the corresponding Iceberg column name is "switch_x003Astatus".

{{< c8y-admon-info >}}
The first-character restriction is checked before escaping is applied. If the first character of a name is not already a letter, the whole field or fragment is rejected as an [illegal field name](#limits-of-streaming-lake-ingestion) rather than being escaped. For example, replacing a leading special character with an underscore (a common client-side sanitization approach) does not make the name valid, since an underscore is not a letter.
{{< /c8y-admon-info >}}

{{< c8y-admon-info >}}
In the character string "\_x", the "\_" is encoded to its binary representation "\_x005F" to prevent name clashes. For example, "axis_x" would be shown as "axis_x005Fx".

The sanitization method originates from
the [Apache Avro specification](https://avro.apache.org/docs/1.8.1/spec.html#names) and Iceberg's Avro support.
{{< /c8y-admon-info >}}

Characters are case-sensitive, but identifiers of tables and columns must be unique in a case-insensitive way. When the column or table name is not unique, a unique suffix is automatically appended to the name. The suffix is generated based on the original name as a binary code where uppercase letters are represented as 1 and lowercase letters as 0. This binary code is then converted to a hexadecimal number and appended to the name in the format `{name}__{suffix}`. For example:

| Input  | Binary | Hex | Output     |
| ------ | ------ | --- | ---------- |
| userId | 000010 | 2   | userId__2  |
| UserId | 100010 | 22  | UserId__22 |
| USERID | 111111 | 3F  | UserId__3F |
| userid | 000000 | 0   | userId__0  |
| uSeRiD | 010101 | 15  | userId__15 |

{{< c8y-admon-info >}}
This is a reliability measure. The Iceberg specification considers tables and column names as case sensitive. However, upstream query engines do not generally support case sensitivity and may not be able to query such tables.
{{< /c8y-admon-info >}}

#### Flat views {#flat-views}

Streaming Lake Ingestion offers [Apache Iceberg views](https://iceberg.apache.org/view-spec/) on top of the data ingested into the data lake tables.

##### Integration with BI tools  {#integration-with-bi-tools}

As upstream reporting tools and query engines develop, there are still tools that do not support browsing structured data in database tables. The service solves this problem by flattening  structured fields into "flat", top-level columns. This makes it possible to browse, for example, the `value` and `unit` fields of measurements in such tools.

Take the following example of a measurement:

```json
{
  "time": "2026-02-19T13:09:39.678Z",
  "source": { "id": "47635" },
  "type": "c8y_BatteryMeasurement",
  "c8y_Battery": {
    "voltage": { "value": 12.8, "unit": "V" },
    "stateOfCharge": { "value": 85.5, "unit": "%" },
    "temperature": { "value": 22.5, "unit": "C" }
  }
}
```

This results in a table like the following:

**Table: cdc_measurement.c8y_Battery**

| <span style="display: inline-block; width: 50px;">id</span> | <span style="display: inline-block; width: 50px;">source</span> | <span style="display: inline-block; width: 200px;">eventType</span> | <span style="display: inline-block; width: 210px;">time</span> | <span style="display: inline-block; width: 200px;">type</span> | <span style="display: inline-block; width: 90px;">voltage</span> | <span style="display: inline-block; width: 110px;">stateOfCharge</span> | <span style="display: inline-block; width: 100px;">temperature</span> |
| ----------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------- |
|                                                             |                                                                 |                                                                     |                                                                |                                                                | value \| unit                                                    | value \| unit                                                           | value \| unit                                                         |
| 12345                                                       | 47635                                                           | MEASUREMENT_CREATE                                                  | 2026-02-19T13:09:39.678Z                                       | c8y_BatteryMeasurement                                         | 12.8 \| V                                                        | 85.5 \| %                                                               | 22.5 \| C                                                             |


Note that there are three columns which are of structured type: `voltage`, `stateOfCharge` and `temperature`.

Corresponding to the table, a view is created automatically as shown below. Note that the `value` property of `voltage` was converted to `voltage\value`, that is, all property names on the path up to the bottom-most property are concatenated with backslash as separator character.

**View: view_measurement.c8y_Battery**

| <span style="display: inline-block; width: 50px;">id</span> | <span style="display: inline-block; width: 60px;">source</span> | <span style="display: inline-block; width: 200px;">eventType</span> | <span style="display: inline-block; width: 210px;">time</span> | <span style="display: inline-block; width: 200px;">type</span> | <span style="display: inline-block; width: 130px;">voltage\\value</span> | <span style="display: inline-block; width: 110px;">voltage\\unit</span> | <span style="display: inline-block; width: 30px;">...</span> | <span style="display: inline-block; width: 160px;">temperature\\value</span> | <span style="display: inline-block; width: 160px;">temperature\\unit</span> |
| ----------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 12345                                                       | 47635                                                           | MEASUREMENT_CREATE                                                  | 2026-02-19T13:09:39.678Z                                       | c8y_BatteryMeasurement                                         | 12.8                                                                     | V                                                                       | ...                                                          | 22.5                                                                         | C                                                                           |

This makes it possible to operate directly on nested fields and, for example, do analytics for measurement values in BI tools.

##### View representations {#view-representations}

In Apache Iceberg, views can have multiple representations for different SQL dialects. Currently supported dialects are:

* **DremioSQL**
* **spark** (experimental)

#### Binning {#binning}

To ensure robustness data storage and queryability of the data, the service enforces a number of limits beyond {{< product-c8y-iot >}}'s platform-wide limits. Data that exceeding these more specific limits is "binned", that is, stored into a separate Iceberg table in a different schema for inspecting problematic cases and potentially reprocessing data. An example of "binned" data is shown below:

**Table: cdc_rejected.trash**

| <span style="display: inline-block; width: 50px;">source</span> | <span style="display: inline-block; width: 220px;">eventType</span> | <span style="display: inline-block; width: 100px;">dataType</span> | <span style="display: inline-block; width: 180px;">time</span> | <span style="display: inline-block; width: 300px;">path</span> | <span style="display: inline-block; width: 200px;">data</span> | <span style="display: inline-block; width: 180px;">cause</span> | <span style="display: inline-block; width: 300px;">reason</span> | <span style="display: inline-block; width: 180px;">tableName</span> | <span style="display: inline-block; width: 50px;">id</span> |
| --------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------- |
| 47635                                                           | EVENT_CREATE                                                        | EVENT                                                              | 2025-07-29T13:15:43Z                                           | /event_fragment_1/c8y_TooLargeProperty                         | IuS4gOefs+S6jOmzpeS4gOefs+S.......                             | SIZE_EXCEEDED                                                   | Property size exceeded the limit of 32768                        | event_fragment_1                                                    | 12345                                                       |
| 47638                                                           | MANAGED_OBJECT_CREATE                                               | INVENTORY                                                          | 2025-07-29T14:15:43Z                                           | /inventory_fragment_2/level_1/level_2....level_17/name         | IlRoZSBhYnlzcyI=                                               | MAX_DEPTH_EXCEEDED                                              | Property depth exceeded the limit of 16                          | inventory_fragment_2                                                | 12346                                                       |
| 47640                                                           | EVENT_CREATE                                                        | EVENT                                                              | 2025-07-29T15:15:43Z                                           | /event_fragment_2/nestedObject/invalidFieldName###ASD!ASD!@    | InRlc3Qi                                                       | ILLEGAL_FIELD_NAME                                              | Illegal field name                                               | event_fragment_2                                                    | 12347                                                       |

The following schema is used:

- `source`: Source/managed object ID of the device or asset
- `eventType`: Type of the originating payload
- `dataType`: Domain model type
- `time`: Timestamp from the payload
- `path`: Payload path of the affected field as [json pointer](https://datatracker.ietf.org/doc/html/rfc6901)
- `data`: Serialized value of the rejected field in binary (Base64) format
- `cause`: Type of violation
- `reason`: Description of the violation, providing context for the rejection
- `tableName`: Fragment name where the violation occurred
- `id`: Unique identifier for the record

##### Limits of Streaming Lake Ingestion {#limits-of-streaming-lake-ingestion}

The following data is moved to the `trash` table.

**Type limits**

* Multidimensional arrays. (Note that arrays holding nested `struct` types are permitted.)
* Arrays with inconsistent types in the array fields.
* Numbers requiring larger precision than the maximum Iceberg `decimal` precision of (38, 9).

**Structure limits**

* Strings larger than 32,768 characters.
* Arrays larger than 128 entries
* Objects nested deeper than 16 levels.
* More than 1,000 total leaf properties per fragment.
* More than 1,000 fragments.
* Fragment or property names with more than 255 characters.

##### Examples

**Illegal field name**: The first character of a property or fragment name must be a letter (a-z, A-Z). Digits, underscores, dashes, or any other character in the first position cause the field to be rejected rather than escaped. See [Naming](#naming) for details.

```json
{
    "event_fragment_2": {
        "nestedObject": {
            "_invalidFieldName": "test"
        }
    }
}
```

The same rule applies to fragment (table) names and to a number in the first position, for example:

```json
{
    "3invalidFragmentName": {
        "test": "test"
    }
}
```

**Maximum depth exceeded**: Deeply nested structures exceeding the allowed depth of 16 levels.

```json
{
    "inventory_fragment_2": {
        "level_1": {
            "level_2": {
                // ...
                    // ...
                        "level_17": {
                            "name": "The abyss",
                            "description": "You hit rock bottom, and then dug deeper."
                        }
                    // ...
                // ...
            }
        }
    }
}
```

**Maximum number of columns exceeded**: Adding columns to tables resulting in more than 1,000 columns.

```json
{
    "fragment": {
        "property_0001": "value_0001",
        "property_0002": "value_0002",
        // ...
        "property_1000": "value_1000",
        // ...
    }
}
```

**Maximum number of fragments exceeded**: Creating more than 1,000 tables.

```json
{
    "table_fragment_0001": {
        "test": "test"
    },
    "table_fragment_0002": {
        "test": "test"
    },
    // ...
    "table_fragment_1000": {
        "test": "test"
    },
    // ...
}
```

**Size exceeded**: Data exceeding the maximum permissible size of 32,768 characters for a string field or the maximum size of a list field (128 elements).

```json
{
    "event_fragment_1": {
        "tooLargeProperty": "一石二鳥一石二鳥一石二鳥一石二鳥 ......",
        "tooLargeList": [
            "2025-01-1T01:00:11Z",
            "2025-01-1T01:05:02Z",
            "2025-01-1T02:00:11Z",
            // ...
            "2025-01-13T02:00:11Z"
        ]
    }
}
```

**Unresolvable type conflict**: Field has inconsistent data types across array elements.

```json
{
    "fragment": {
        "listField": ["Some string", 5.1, false, null]
    }
}
```

### Example queries {#example-queries}

The following example queries demonstrate how to extract common metrics and insights from the data lake using the Dremio SQL dialect. To keep the queries concise, they assume that you set the query context to your tenant as described in [Analyzing lake data](#analyzing-lake-data-using-sql). This allows you to omit the tenant prefix in the `FROM` clauses.

#### Basic inventory queries

To list all devices registered in your tenant, use the `latest_inventory` tables to get the most recent state and filter for the marker fragment `c8y_IsDevice` in the `fragments` array.

```sql
SELECT id, name
FROM latest_inventory.inventory
WHERE ARRAY_CONTAINS(fragments, 'c8y_IsDevice')
```

To find the current location of all devices within a specific geographic boundary, query the `c8y_Position` fragment in the `latest_inventory` folder.

```sql
SELECT id, lat, lng
FROM latest_inventory.c8y_Position
WHERE lat BETWEEN 50.0 AND 52.0
  AND lng BETWEEN 6.0 AND 8.0
```

#### Basic time series queries

To retrieve all events recorded for a specific device within a given timespan, query the `cdc_event.event` table. Note that `time` is a reserved word in Dremio SQL, so it needs to be quoted.

```sql
SELECT "time", type, text
FROM cdc_event.event
WHERE source = '52277201'
  AND "time" BETWEEN '2026-04-16 00:00:00' AND '2026-04-16 23:59:59'
ORDER BY "time" DESC
```

#### Parent and child queries

To find a parent device or asset linked to a specific device, you can search for the child's ID within the `childDevices` array.

```sql
SELECT id, name
FROM latest_inventory.inventory
WHERE ARRAY_CONTAINS(childDevices, '102938')
```

Conversely, to retrieve all child devices belonging to a specific asset, use Dremio's `FLATTEN` function to unroll the asset's `childDevices` array and select the matching devices.

```sql
SELECT id, name
FROM latest_inventory.inventory
WHERE id IN (
  SELECT FLATTEN(childDevices)
  FROM latest_inventory.inventory
  WHERE id = '102938'
)
```

#### Measurement queries

To view a specific measurement series for a device over time, query the corresponding measurement fragment table. The following example fetches voltage measurements.

```sql
SELECT "time", b.voltage."value" AS voltage, b.temperature."value" AS temperature
FROM cdc_measurement.c8y_Battery b
WHERE source = '47635' AND
 "time" BETWEEN '2026-04-02 00:00:00' AND '2026-04-02 23:59:59'
ORDER BY "time" DESC
```

Note that Dremio SQL requires you to add a table name or table reference when accessing structured properties. In the example, it is not enough to only refer to `voltage."value"`, `b.voltage."value"` has to be used. You can build on the previous query by adding a condition to filter for values that cross a certain threshold limit.

```sql
SELECT "time", b.voltage."value" AS voltage, b.temperature."value" AS temperature
FROM cdc_measurement.c8y_Battery b
WHERE source = '47635' AND
 "time" BETWEEN '2026-04-02 00:00:00' AND '2026-04-02 23:59:59' AND
 b.voltage."value" < 11.5
ORDER BY "time" DESC
```

{{< c8y-admon-info >}}
Complex analytics with conditions other than timestamps and devices as well as large joins of multiple tables can be slow. For reporting use cases that require high performance on complex models, process the data into a dedicated "gold layer", where you store the pre-aggregated and materialized results.
{{< /c8y-admon-info >}}

To create reports that are easier to read, you can join the historical measurement data together with the latest inventory data. This allows you to display the current device name alongside the recorded measurement values.

```sql
SELECT b."time", i.name, b.voltage."value" AS voltage
FROM cdc_measurement.c8y_Battery b JOIN latest_inventory.inventory i ON b.source = i.id
WHERE source = '47635' AND
 "time" BETWEEN '2026-04-02 00:00:00' AND '2026-04-02 23:59:59' AND
 b.voltage."value" < 11.5
ORDER BY "time" DESC
```


### Ensuring good query performance

While the data lake offers the flexibility of arbitrary SQL querying, performance can vary depending on the complexity of your query. Unlike the operational store, {{< product-c8y-iot >}} cannot provide a general response time guarantee for all possible SQL statements.

To ensure fast responses for common IoT use cases, performance is highly optimized for queries that select a specific set of devices, a particular time range, and, for measurements, a limited set of data points.

Conversely, other types of queries may exhibit slower responses. These include queries that process a very large base set of data with complex aggregations or execute multi-level joins with selections on non-indexed properties. In shared environments, the service may terminate very large or long-running queries to ensure fair resource usage.

To improve query performance for your specific applications, you have several options:

* Pre-process the data before it enters {{< product-c8y-iot >}} using Edge functionality or Data Preparation functions.
* Process the data within {{< product-c8y-iot >}} using Streaming Analytics or a custom microservice to create refined data streams.
* Post-process the data in the data lake by creating your own aggregated "gold layer" tables using external data lake tools.
