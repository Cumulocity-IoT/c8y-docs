---
weight: 20
title: Using Streaming Lake Ingestion
layout: redirect
---

Streaming Lake Ingestion is an optional service in {{< product-c8y-iot >}}. To use the service, subscribe to it. After subscription, the service automatically stores all newly incoming data in the lake.

{{< c8y-admon-info >}}
On subscription, master data is synchronized with the operational store. This synchronization may take a while to complete. For more information, see [Monitoring the data lake storage](#monitoring-the-data-lake-storage).

The service stores only new data incoming after subscription. It does not automatically move data stored in the {{< product-c8y-iot >}} operational store before subscription. For more information, see [Migrating to data lake storage](#migrating-to-data-lake-storage).

*This feature is not part of the current Private Preview release.*
{{< /c8y-admon-info >}}


### Analyzing lake data from Cockpit {#analyzing-lake-data-from-cockpit}

Use the {{< product-c8y-iot >}} Cockpit application to access data stored in the {{< product-c8y-iot >}} data lake. Log in to the application, then navigate to the data explorer and select **Data lake**. When you enable data lake, the application sources data from the data lake instead of the operational store. You can visualize data over longer time ranges than with the operational store.

{{< c8y-admon-info >}}
Data arrives in the lake with a small delay. If you need to see the latest data, switch to the operational store.

*This feature is not part of the current Private Preview release.*
{{< /c8y-admon-info >}}


### Analyzing lake data using SQL {#analyzing-lake-data-using-sql}

For more general analytics, use SQL queries. Run queries from several interfaces:

* Through the user interface of the [embedded query engine](/datahub/setting-up-datahub/#dremio-api-user).
* By connecting query tools such as BI tools and database browsers through [JDBC or ODBC](/datahub/setting-up-datahub/#dremio-api-user).
* By using the secure and high performance [querying APIs](https://cumulocity.com/api/datahub/) from applications.

### Understanding the data lake structure

The structure of the data lake provided by Streaming Lake Ingestion mirrors the familiar [{{< product-c8y-iot >}} domain model](/concepts/domain-model/) to be intuitive for users. As shown in the screenshot below, the top level consists of folders representing the {{< product-c8y-iot >}} domain model classes: `inventory`, `alarm`, `event`, `measurement` and `operation`.

Within these folders, tables store the incoming IoT data. For example, the `alarm` table contains a complete, historical log of all alarm changes, while the `inventory` table captures all modifications made to your device master data over time.

Device- or customer-specific data in the form of [fragments](/concepts/domain-model/#fragments) resides in separate, dedicated tables within the corresponding folders. For instance, if you send a measurement of type `c8y_EngineMetric`, it will be stored in a table named `c8y_EngineMetric` inside the measurements folder.

To simplify querying the current state of your assets, a consolidated representation of that state is available in "latest tables". The `inventory_latest` and `alarms_latest` tables show the most recent, up-to-date state of your inventory and alarms, respectively, without you needing to reconstruct it from the historical logs.

![alt text](/images/datahub-guide/querying.png)

{{< c8y-admon-info >}}
"Latest tables" are not part of the current private preview release.*
{{< /c8y-admon-info >}}

{{< c8y-admon-info >}}
Streaming Lake Ingestion also manages an `internal` folder containing tables used for internal service operations. These tables should not be modified, as doing so may compromise the service's reliability and correct functioning.
{{< /c8y-admon-info >}}

To understand how the service transfers data to the data lake, the following sections discuss the general table structure for each {{< product-c8y-iot >}} domain model class.

#### General table structure {#general-table-structure}

All tables contain the following key columns:
* `eventType`: The {{< product-c8y-iot >}} real-time data feed records changes to IoT data, so whether new data is created, existing data is updated or data is deleted. This field captures the type of the recorded change, for example, `MANAGED_OBJECT_UPDATE`.
* `id` resp. `source`: The [managed object ID](/concepts/domain-model/#object-identification), so the {{< product-c8y-iot >}} ID of the device or asset associated with the change.
* `time`: The timestamp of the change as sent by the device, if present, otherwise the [time when the change reaches {{< product-c8y-iot >}}](/device-management-application/monitoring-and-controlling-devices/#to-monitor-the-connection-of-a-particular-device).
* `type`: The type property of the device, measurement and so on.


#### Inventory {#inventory}

To understand how the service captures inventory data in the data lake, assume that you create a new tracking device "Tracking #1" with the following data:

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

**Table: inventory.inventory**
| eventType             | id    | time                     | type    | name       | fragments                      | someproperty |
| --------------------- | ----- | ------------------------ | ------- | ---------- | ------------------------------ | ------------ |
| MANAGED_OBJECT_CREATE | 47635 | 2025-08-20T13:41:39.678Z | sb_nano | Tracker #1 | \[c8y_IsDevice, c8y_Position\] | 10           |

The columns of the `inventory` table are:
* `eventType` contains "MANAGED_OBJECT_CREATE", the event type for creating a new managed object.
* `id` contains "47635", the managed object ID assigned to the new device by {{< product-c8y-iot >}}.
* `time` contains "2025-08-20T13:41:39.678Z", the timestamp when the device was created in {{< product-c8y-iot >}}.
* `type` contains "sb_nano", the type of the device as used in the request to create the device.
* `name` contains "Tracker #1", the name of the device as used in the request.
* `fragments` contains a list of all fragments used in the managed object.
* `someproperty` contains 10. {{< product-c8y-iot >}} creates additional columns in the `inventory` table when there are top-level properties of an atomic type in the managed object (character strings, numbers, booleans).

{{< c8y-admon-info >}}
Use top-level properties with care. For example, if you have custom properties that you want to store for all devices, such properties may be a good choice.
However, the total number of top-level properties is limited through the [table width limit of Iceberg](https://cumulocity.com/docs/service-terms/quotas/). If you exceed the table width limit,
additional properties will not be written to the inventory table but "binned" (see below).
Note also that very wide tables with many properties will lead to more inefficient storage and querying.
We advice you to prefer fragments for custom data when modeling your device data model.
{{< /c8y-admon-info >}}


**Table: inventory.c8y_position**
| eventType             | source | time                     | type    | alt | lng     | lat       |
| --------------------- | ------ | ------------------------ | ------- | --- | ------- | --------- |
| MANAGED_OBJECT_CREATE | 47635  | 2025-08-20T13:41:39.678Z | sb_nano | 67  | 6.15173 | 51.211977 |

The columns of the `c8y_position` table reflect the "`c8y_Position` fragment and are set as follows:
* Key columns are set as previously described.
* Properties are stored in the columns of the table.

In addition, the service stores the data in the `inventory_latest` folder:

**Table: inventory_latest.inventory**
| id    | time                     | type    | name       | fragments                      | someproperty |
| ----- | ------------------------ | ------- | ---------- | ------------------------------ | ------------ |
| 47635 | 2025-08-20T13:41:39.678Z | sb_nano | Tracker #1 | \[c8y_IsDevice, c8y_Position\] | 10           |

**Table: inventory_latest.c8y_position**
| source | time                     | type    | alt | lng     | lat       |
| ------ | ------------------------ | ------- | --- | ------- | --------- |
| 47635  | 2025-08-20T13:41:39.678Z | sb_nano | 67  | 6.15173 | 51.211977 |

{{< c8y-admon-info >}}
Fragments such as `c8y\_IsDevice` are only represented in the "fragments" property of the `inventory` tables.
{{< /c8y-admon-info >}}

Assume that the tracking device updates its location:
```
{
    "c8y_Position": {
        "alt": 69,
        "lng": 6.3213,
        "lat": 50.425
    },
}
```

This update appears in the `inventory` and `c8y_position` tables as follows:

**Table: inventory.inventory**
| eventType             | id    | time                     | type    | name       | fragments                      | someproperty |
| --------------------- | ----- | ------------------------ | ------- | ---------- | ------------------------------ | ------------ |
| MANAGED_OBJECT_CREATE | 47635 | 2025-08-20T13:41:39.678Z | sb_nano | Tracker #1 | \[c8y_IsDevice, c8y_Position\] | 10           |
| MANAGED_OBJECT_UPDATE | 47635 | 2025-08-20T13:45:20.002Z | sb_nano | Tracker #1 | \[c8y_IsDevice, c8y_Position\] | 10           |

**Table: inventory.c8y_position**
| eventType             | source | time                     | type    | alt | lng     | lat       |
| --------------------- | ------ | ------------------------ | ------- | --- | ------- | --------- |
| MANAGED_OBJECT_CREATE | 47635  | 2025-08-20T13:41:39.678Z | sb_nano | 67  | 6.15173 | 51.211977 |
| MANAGED_OBJECT_UPDATE | 47635  | 2025-08-20T13:45:20.002Z | sb_nano | 69  | 6.3213  | 50.425    |

The "latest" versions of the tables reflect this update:

**Table: inventory_latest.inventory**
| id    | time                     | type    | name       | fragments                      | someproperty |
| ----- | ------------------------ | ------- | ---------- | ------------------------------ | ------------ |
| 47635 | 2025-08-20T13:45:20.002Z | sb_nano | Tracker #1 | \[c8y_IsDevice, c8y_Position\] | 10           |

**Table: inventory_latest.c8y_position**
| source | time                     | type    | alt | lng    | lat    |
| ------ | ------------------------ | ------- | --- | ------ | ------ |
| 47635  | 2025-08-20T13:45:20.002Z | sb_nano | 69  | 6.3213 | 50.425 |

Finally, assume that you delete the device. This results in a record with `eventType` "MANAGED_OBJECT_DELETE" and the last properties stored on the device. Deleting the device removes it from the "latest" versions of the tables.

**Table: inventory.inventory**
| eventType             | id    | time                     | type    | name       | fragments                      | someproperty |
| --------------------- | ----- | ------------------------ | ------- | ---------- | ------------------------------ | ------------ |
| MANAGED_OBJECT_CREATE | 47635 | 2025-08-20T13:41:39.678Z | sb_nano | Tracker #1 | \[c8y_IsDevice, c8y_Position\] | 10           |
| MANAGED_OBJECT_UPDATE | 47635 | 2025-08-20T13:45:20.002Z | sb_nano | Tracker #1 | \[c8y_IsDevice, c8y_Position\] | 10           |
| MANAGED_OBJECT_DELETE | 47635 | 2025-08-20T13:50:20.002Z | sb_nano | Tracker #1 | \[c8y_IsDevice, c8y_Position\] | 10           |

**Table: inventory.c8y_position**
| eventType             | source | time                     | type    | alt | lng     | lat       |
| --------------------- | ------ | ------------------------ | ------- | --- | ------- | --------- |
| MANAGED_OBJECT_CREATE | 47635  | 2025-08-20T13:41:39.678Z | sb_nano | 67  | 6.15173 | 51.211977 |
| MANAGED_OBJECT_UPDATE | 47635  | 2025-08-20T13:45:20.002Z | sb_nano | 69  | 6.3213  | 50.425    |
| MANAGED_OBJECT_DELETE | 47635  | 2025-08-20T13:50:20.002Z | sb_nano | 69  | 6.3213  | 50.425    |

{{< c8y-admon-info >}}
Delete events are not recorded as part of the preview release.
{{< /c8y-admon-info >}}


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

**Table: alarm.alarm**
| eventType    | source | time                     | type             | count | severity | status | text                           |
| ------------ | ------ | ------------------------ | ---------------- | ----- | -------- | ------ | ------------------------------ |
| ALARM_CREATE | 47635  | 2025-08-19T12:03:27.845Z | c8y_BatteryAlarm | 1     | MAJOR    | ACTIVE | Battery level below 5 percent. |

Again, the columns of the table represent the [properties of a {{< product-c8y-iot >}} alarm](https://cumulocity.com/api/core/#tag/Alarms). The `eventType` property reflects the recorded change (in this case, a created alarm), and the `count` property is added by {{< product-c8y-iot >}}'s [alarm de-duplication](https://cumulocity.com/api/core/#alarm-de-duplication).

In the example, there are no custom properties or fragments in the alarm data. The service treats such properties or fragments in the same way as described for the inventory.

For alarms, there is also a representation of the latest state.

**Table: alarm_latest.alarm**
| source | time                     | type             | count | severity | status | text                           |
| ------ | ------------------------ | ---------------- | ----- | -------- | ------ | ------------------------------ |
| 47635  | 2025-08-19T12:03:27.845Z | c8y_BatteryAlarm | 1     | MAJOR    | ACTIVE | Battery level below 5 percent. |


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

**Table: event.event**
| eventType    | source | time                     | type               | text                    |
| ------------ | ------ | ------------------------ | ------------------ | ----------------------- |
| EVENT_CREATE | 47635  | 2025-08-20T13:41:39.678Z | c8y_LocationUpdate | Tracker location update |

**Table: event.c8y_position**
| eventType    | id    | time                     | type               | alt | lng     | lat       |
| ------------ | ----- | ------------------------ | ------------------ | --- | ------- | --------- |
| EVENT_CREATE | 47635 | 2025-08-20T13:41:39.678Z | c8y_LocationUpdate | 67  | 6.15173 | 51.211977 |

As events usually record specific occurrences or state changes for a device at a single point in time and are distinct, the service does not create a "latest" version.


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

**Table: measurement.c8y_Battery**
| eventType          | source | time                     | type                   | voltage       | stateOfCharge | temperature   |
| ------------------ | ------ | ------------------------ | ---------------------- | ------------- | ------------- | ------------- |
|                    |        |                          |                        | value \| unit | value \| unit | value \| unit |
| MEASUREMENT_CREATE | 47635  | 2025-08-20T13:42:39.678Z | c8y_BatteryMeasurement | 12.8 \| V     | 85.5 \| %     | 22.5 \| C     |

There is one important difference for measurements compared to other data types: There is no `measurement.measurement` table. All relevant data is present in the fragment tables.

This example demonstrates how the service handles nested properties: Like the {{< product-c8y-iot >}} APIs and its operational store, Apache Iceberg supports nested data. Just like with the above JSON example, the property `voltage` is a nested structure containing two properties `value` and `unit`. You can query the contained properties from SQL using path expressions such as `"voltage"."value"`. For more information on querying the data from SQL, see [Example queries](#example-queries).

#### Operations {#operations}

Finally, we would like to restart the tracker with a reset operation:

```
{
  "deviceId": "47635",
  "c8y_Restart": { }
}
```

This results in the following data in the data lake:

**Table: operation.operation**
| eventType        | deviceId | agentId | time                     | status  | description | fragments        |
| ---------------- | -------- | ------- | ------------------------ | ------- | ----------- | ---------------- |
| OPERATION_CREATE | 47635    | 47635   | 2025-08-21T13:42:39.678Z | PENDING | null        | \[c8y_Restart \] |

The columns represent the [properties of a {{< product-c8y-iot >}} operation](https://cumulocity.com/api/core/#operation/getOperationCollectionResource). If you do not provide an operational property, the service stores it as a SQL "null" value.

#### Data types

{{< product-c8y-iot >}} relies on JSON as data exchange format in its APIs. JSON data types map to Iceberg data types as follows:

* Strings parsed as timestamps become the Iceberg `timestamptz` data type. Otherwise, they become the Iceberg `string` data type.
* Numbers are stored as Iceberg `decimal` with a maximum precision of 38 and scale of 9.
* Booleans (true/false) map to the equivalent Iceberg `boolean` data type.
* JSON lists become the equivalent Iceberg `list` data type.
* JSON objects become the equivalent Iceberg `struct` data type.

"Null" values are stored as Iceberg "null" values.

{{< c8y-admon-info >}}
For more information related to Iceberg data types, please refer to the [Iceberg specification](https://iceberg.apache.org/spec/#semi-structured-types). Note that there are various [structural limits in Iceberg](/service-terms/quotas/).
{{< /c8y-admon-info >}}

#### Schema evolution {#schema-evolution}

The data lake storage service automatically discovers the structure of the incoming data and applies it to the data lake.
* When the service discovers a new fragment, it creates a table to store the data in the fragment.
* When the service discovers a new property, it creates a column to store the data in the associated table.

{{< c8y-admon-info >}}
Currently, the service does not delete tables and columns when they are not in use anymore. For more information, see [Managing schema evolution](#managing-schema-evolution).
{{< /c8y-admon-info >}}

#### Handling of schema conflicts {#handling-of-schema-conflicts}

Contrary to Apache Iceberg and SQL, {{< product-c8y-iot >}} does not mandate a consistent schema across all incoming data. The data lake storage service automatically resolves consistency issues. Revisiting our previous example, assume that "Tracker #1" sends data as follows:

```
{
    "name": "Tracker #1",
    …
    "someProperty": 10
}
```

**Table: inventory**
| eventType              | id    | time                     | name       | …   | someproperty |
| ---------------------- | ----- | ------------------------ | ---------- | --- | ------------ |
| MANAGED_OBJECT_UPDATED | 47635 | 2025-08-20T13:45:20.002Z | Tracker #1 | …   | 10           |

Now "Tracker #2" sends data with a slightly different structure:

```
{
    "name": "Tracker #2",
    …
    "someProperty": "Some Value"
}
```

Storing the string value "Some Value" of "someProperty" in the numeric column with the corresponding name is not possible. When such a mismatch in type occurs, a new overflow column is created. The new column uses the same name as the property, but appends a double underscore followed by a short type suffix:

**Table: inventory**
| eventType              | id    | time                     | name       | …   | someproperty | someproperty__s |
| ---------------------- | ----- | ------------------------ | ---------- | --- | ------------ | --------------- |
| MANAGED_OBJECT_UPDATED | 47635 | 2025-08-20T13:45:20.002Z | Tracker #1 | …   | 10           | null            |
| MANAGED_OBJECT_UPDATED | 47636 | 2025-08-20T13:55:20.002Z | Tracker #2 | …   | null         | Some Value      |

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

{{< c8y-admon-caution >}}
The service currently does not support certain combinations of type conflicts with lists. It moves conflicting lists to the `trash` table, see [Binning](#binning).
{{< /c8y-admon-caution >}}

{{< c8y-admon-info >}}
The result of schema conflict resolution depends on the order in which messages are processed. If you first send a message with a numeric `version` property and then a message with a string `version` property, the result is two properties `version` (decimal) and `version__s`. If you reverse the order of the messages, the result is two properties `version` (string) and `version__d`. 

Note that the order in which messages are sent to {{< product-c8y-iot >}} and the order in which they are processed do not necessarily coincide. For more details on ordering guarantees, visit the [Messaging Service documentation](/api/core/#tag/About-notifications-2.0).
{{< /c8y-admon-info >}}

#### Naming {#naming}

The Iceberg data lake supports only names consisting of characters, numbers (if not the first character), and underscores. Other characters are represented by the character string "\_x" followed by the hexadecimal Unicode value of the character. This applies to table and property names.

For example, if you use the property name "switch-status" in the data sent to {{< product-c8y-iot >}}, the corresponding Iceberg column name is "switch_x002Dstatus".

{{< c8y-admon-info >}}
In the character string "\_x", the "\_" is encoded to its binary representation "\_x005F" to prevent name clashes. For example, "axis_x" would be shown as "axis_0x005Fx".

The above naming restrictions and sanitization method originate from
the [Apache Avro specification](https://avro.apache.org/docs/1.8.1/spec.html#names) and Iceberg's Avro support.
{{< /c8y-admon-info >}}


Characters are case-sensitive, but identifiers of tables and columns must be unique in a case-insensitive way.
When the column or table name is not unique, a unique suffix is automatically appended to the name.

The suffix is generated based on the original name as a binary code where uppercase letters are represented as 1 and lowercase letters as 0. This binary code is then converted to a hexadecimal number and appended to the name in the format `{name}__{suffix}`. For example:

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

Streaming Lake Ingestion offers [Apache Iceberg views](https://iceberg.apache.org/view-spec/) on top of the data ingested into the data lake tables, especially for better integration with BI tools.

##### Integration with BI tools  {#integration-with-bi-tools}
As BI tools tend to work unwell with structured columns, the views offered by Streaming Lake Ingestion solve this problem by flattening structured fields into "flat" columns. This makes it possible to read nested columns (for example, `value` and `unit` of a measurement series) as top-level primitive fields.
Take the following example:
You ingest the following measurement into {{< product-c8y-iot >}}.

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

**Table: measurement.c8y_Battery**
| eventType          | source | time                     | type                   | voltage       | stateOfCharge | temperature   |
| ------------------ | ------ | ------------------------ | ---------------------- | ------------- | ------------- | ------------- |
|                    |        |                          |                        | value \| unit | value \| unit | value \| unit |
| MEASUREMENT_CREATE | 47635  | 2026-02-19T13:09:39.678Z | c8y_BatteryMeasurement | 12.8 \| V     | 85.5 \| %     | 22.5 \| C     |

Note that there are three columns which are of structured type: `voltage`, `stageOfCharge` and `temperature`. As many BI tools can't handle structured types, Streaming Lake Ingestion offers views for tables to "unnest" these structured fields.
An according view looks like the following:

**View: measurement.c8y_Battery**
| eventType          | source | time                     | type                   | voltage\\value  | voltage\\unit | ... | temperature\\value | temperature\\unit |
| ------------------ | ------ | ------------------------ | ---------------------- | --------------- | ------------- | --- | ------------------ | ----------------- |
| MEASUREMENT_CREATE | 47635  | 2026-02-19T13:09:39.678Z | c8y_BatteryMeasurement | 12.8            | V             | ... | 22.5               | C                 |

This makes it possible to operate directly on nested fields and, for example, do analytics for measurement values in BI tools.

##### View representations {#view-representations}
In Apache Iceberg, views can have multiple representations, meaning you need to check if Streaming Lake Ingestion offers a SQL dialect that can be read by your query engine. Currently, the following two SQL dialects are supported:
* **DremioSQL**
* **spark** (experimental)

##### Limitations of views {#view-limitations}
* The Iceberg views are currently offered only on top of change data capture tables.
* Arrays are currently kept as is and not flattened.

#### Binning {#binning}

Apache Iceberg tables adhere to a strict schema contract that governs structure, depth, field naming, and overall payload limits. Currently, incoming notifications may violate this schema contract. Such notifications cannot be stored in the Iceberg tables. To preserve as much data as possible, protect the data pipeline from failure, and give stakeholders visibility into problematic situations, a "binning" mechanism persists most of this data.

There are two categories of invalid data:
1. **Trash data**: Invalid data that can still be stored in Iceberg moves to a special `trash` table for inspection, tracing, or reprocessing. This table captures the path to the data, its value, and the reason it was rejected from the main table, allowing you to inspect and potentially correct it later.
2. **Rejected data** (future enhancement): Fragments with severe issues (for example, cannot be serialized) are stored separately in an S3 bucket for auditing.

{{< c8y-admon-info >}}
{{< company-c8y >}} plans to implement system-wide limits to reduce the need for binning in the future.
{{< /c8y-admon-info >}}

Common violation types handled by the `trash` table include:
- **Illegal field name** – field names that do not adhere to naming limitations.

    Sample payload:
    ```json
    {
        "event_fragment_2": {
            "nestedObject": {
                "invalidFieldName###ASD!ASD!@": "test"
            }
        }
    }
    ```
- **Maximum depth exceeded** – deeply nested structures exceeding the allowed depth

    Sample payload:
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

- **Maximum number of columns exceeded** – records containing more fields than permitted

    Sample payload:
    ```json
    {
        "fragment": {
            "property_001": "value_001",
            "property_001": "value_002",
            // ...
            "property_800": "value_800",
            // ...
        }
    }
    ```
- **Maximum number of fragments exceeded** – too many logical fragments or components

    Sample payload:
    ```json
    {
        "table_fragment_001": {
            "test": "test"
        },
        "table_fragment_002": {
            "test": "test"
        },
        // ...
        "table_fragment_N": {
            "test": "test"
        }
    }
    ```

- **Size exceeded** – data exceeding the maximum permissible size

    Sample payload:
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

- **Unresolvable type conflict** - field has inconsistent data types across payloads, within list

    Sample payload:

    ```json
    {
        "fragment": {
            "listField": ["Some string", 5.1, false, null] // type inconsistency across list
        }
    }
    ```

As mentioned, the system ensures that neither schema-violating nor rejected records are silently dropped.
Instead, it retains them in a **structured**, **queryable format**, allowing future inspection, auditing, and even potential replay.

Each retained record follows a fixed schema with the following fields:
- `source` (STRING) - source/managed object ID of the device or asset
- `eventType` (STRING) - type of the originating payload
- `dataType` (STRING) - platform-supported data type
- `time` (TIMESTAMP) - timestamp from the payload
- `path` (STRING) - payload path of the affected field as [json pointer](https://datatracker.ietf.org/doc/html/rfc6901)
- `tableName` (STRING) - fragment name where the violation occurred
- `cause` (STRING) - type of violation
- `reason` (STRING) - description of the violation, providing context for the rejection
- `data` (BINARY) - serialized value of the rejected field in binary (Base64) format, enabling easy querying while avoiding query engine limits (e.g., Dremio)

Sample `trash` table records:

| source | eventType             | dataType  | time                 | path                                                        | tableName            | cause              | reason                                    | data                               |
| ------ | --------------------- | --------- | -------------------- | ----------------------------------------------------------- | -------------------- | ------------------ | ----------------------------------------- | ---------------------------------- |
| 47635  | EVENT_CREATE          | EVENT     | 2025-07-29T13:15:43Z | /event_fragment_1/c8y_TooLargeProperty                      | event_fragment_1     | SIZE_EXCEEDED      | Property size exceeded the limit of 32768 | IuS4gOefs+S6jOmzpeS4gOefs+S....... |
| 47638  | MANAGED_OBJECT_CREATE | INVENTORY | 2025-07-29T14:15:43Z | /inventory_fragment_2/level_1/level_2....level_17/name      | inventory_fragment_2 | MAX_DEPTH_EXCEEDED | Property depth exceeded the limit of 16   | IlRoZSBhYnlzcyI=                   |
| 47640  | EVENT_CREATE          | EVENT     | 2025-07-29T15:15:43Z | /event_fragment_2/nestedObject/invalidFieldName###ASD!ASD!@ | event_fragment_2     | ILLEGAL_FIELD_NAME | Illegal field name                        | InRlc3Qi                           |

<!-- ### Example queries

TBD:
* Base query for measurements on a device.
* Determine the status of certain devices.
* Join with inventory.
* ...?
* Should give examples of interesting and tested query profiles -->

### Ensuring good query performance

While the data lake offers the flexibility of arbitrary SQL querying, performance can vary depending on the complexity of your query. Unlike the operational store, {{< product-c8y-iot >}} cannot provide a general response time guarantee for all possible SQL statements.

To ensure fast responses for common IoT use cases, performance is highly optimized for queries that select a specific set of devices, a particular time range, and, for measurements, a limited set of data points.

Conversely, other types of queries may exhibit slower responses. These include queries that process a very large base set of data with complex aggregations or execute multi-level joins with selections on non-indexed properties. In shared environments, the service may terminate very large or long-running queries to ensure fair resource usage.

To improve query performance for your specific applications, you have several options:

* Pre-process the data before it enters {{< product-c8y-iot >}} using Edge functionality or inbound data preparation rules.
* Process the data within {{< product-c8y-iot >}} using Streaming Analytics or a custom microservice to create refined data streams.
* Post-process the data in the data lake by creating your own aggregated "gold layer" tables using external data lake tools.
