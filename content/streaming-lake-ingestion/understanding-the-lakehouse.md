---
title: Understanding the lakehouse
description: "Learn how Streaming Lake Ingestion stores your data in tables, how it handles schema changes, and which data it rejects."
weight: 30
layout: bundle
outputs:
  - html
  - json
  - markdown
sector:
  - data_analytics
---

Streaming Lake Ingestion provides two types of data:

* Change data capture (`cdc`): Includes the complete history of incoming IoT data. For example, the `cdc_alarm.alarm` table contains a complete, historical log of all alarm changes, while the `cdc_inventory.inventory` table captures all modifications made to your device master data over time.
* Latest data (`latest`): Provides the current representation of incoming inventory data. For example, the `latest_inventory.inventory` table contains a consolidated view on the latest state of your inventory without you needing to reconstruct the state from the historical logs.

For each type of data, folders ("namespaces") are created to mirror the familiar [{{< product-c8y-iot >}} domain model](/concepts/domain-model/). You will find folders with names ending in `inventory`, `alarm`, `event`, `measurement` and `operation`. Inside the folders, tables for standard data, device-specific data, and customer-specific data are created. Device- or customer-specific data in the form of [fragments](/concepts/domain-model/#fragments) resides in separate, dedicated tables within the corresponding folders. For instance, if you send a measurement with a fragment type `c8y_EngineMetric`, it will be stored in a table named `cdc_measurement.c8y_EngineMetric`.

### General table structure {#general-table-structure}

All tables contain the following column:
* `id`: The record ID of the device, asset, alarm, event, measurement or operation associated with the change.
  In the inventory tables, this is the [managed object ID](/concepts/domain-model/#object-identification).

The following columns are present in some tables, depending on the type of data:
* `source`: For alarms, events, or measurement, this column contains the [managed object ID](/concepts/domain-model/#object-identification) of the device or asset associated with the change.
* `deviceId`: For operations, this column contains the [managed object ID](/concepts/domain-model/#object-identification) of the device targeted for the operation.
* `time`: The timestamp of the change as sent by the device. This column is present for alarms, events, and measurements.
* `creationTime`: The timestamp when {{< product-c8y-iot >}} created the record. This column is present for inventory, measurements, and operations.
* `type`: The type property of the device, measurement and so on.

For change data capture tables, the following column is present:
* `eventType`: The type of change indicated by the record. For example, `MANAGED_OBJECT_UPDATE` indicates an update of a managed object.


### Inventory {#inventory}

#### Creating inventory data {#creating-inventory-data}

To understand how the service captures inventory data in the lakehouse, assume that the device user "device_123" creates a new tracking device "Tracking #1" with the following data:

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

This results in the following data in the lakehouse:

**Table: cdc_inventory.inventory**

| <span style="display: inline-block; width: 50px;">id</span> | <span style="display: inline-block; width: 210px;">lastUpdated<span> | <span style="display: inline-block; width: 80px;">name</span> | <span style="display: inline-block; width: 90px;">owner</span> | <span style="display: inline-block; width: 70px;">type</span> | <span style="display: inline-block; width: 220px;">eventType<span> | <span style="display: inline-block; width: 220px;">fragments</span> | childAdditions | childAssets | childDevices | <span style="display: inline-block; width: 210px;">creationTime</span> | someProperty |
| ----------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------- | -------------- | ----------- | ------------ | ---------------------------------------------------------------------- | ------------ |
| 47635                                                       | 2025-08-20T13:41:39.678Z                                             | Tracker #1                                                    | device_123                                                     | sb_nano                                                       | MANAGED_OBJECT_CREATE                                              | \[c8y_IsDevice, c8y_Position\]                                      | \[\]           | \[\]        | \[\]         | 2025-08-20T13:41:39.678Z                                               | 10           |

The columns of the `inventory` table are:
* `id` contains "47635", the managed object ID assigned to the new device by {{< product-c8y-iot >}}.
* `lastUpdated` contains "2025-08-20T13:41:39.678Z", the timestamp of the most recent update to the managed object in {{< product-c8y-iot >}}.
* `name` contains "Tracker #1", the name of the managed object as used in the request.
* `owner` contains the user who created the managed object.
* `type` contains "sb_nano", the type of the managed object as used in the request to create the managed object.
* `eventType` contains "MANAGED_OBJECT_CREATE", the event type for creating a new managed object.
* `fragments` contains a list of all fragments used in the managed object.
* `childAdditions` contains a list of IDs of services linked to a device.
* `childAssets` contains a list of IDs of child assets of an asset.
* `childDevices` contains a list of IDs of child devices of an asset or device.
* `someproperty` contains 10. {{< product-c8y-iot >}} creates additional columns in the `inventory` table when there are top-level properties of an atomic type in the managed object (character strings, numbers, booleans).

Additional columns may be visible depending on your use of {{< product-c8y-iot >}}. For example, once the device has emitted measurements, you will see a column `supportedMeasurements` with a list of the measurement fragments sent by the device.

{{< c8y-admon-info >}}
Use top-level properties with care. For example, if you have custom properties that you want to store for all devices, such properties may be a good choice.
However, the total number of top-level properties is limited through a [table width limit](/service-terms/quotas/#limits-of-streaming-lake-ingestion). If you exceed the table width limit,
additional properties will not be written to the inventory table but [rejected](#rejected-data).
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

#### Updating inventory data {#updating-inventory-data}

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

#### Deleting inventory data {#deleting-inventory-data}

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

### Alarms {#alarms}

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

This results in the following data in the lakehouse:

**Table: cdc_alarm.alarm**

| <span style="display: inline-block; width: 130px;">eventType</span> | <span style="display: inline-block; width: 210px;">time</span> | <span style="display: inline-block; width: 40px;">count</span> | <span style="display: inline-block; width: 60px;">severity</span> | <span style="display: inline-block; width: 50px;">source</span> | <span style="display: inline-block; width: 60px;">status</span> | <span style="display: inline-block; width: 230px;">text</span> | <span style="display: inline-block; width: 160px;">type</span> | <span style="display: inline-block; width: 210px;">firstOccurrenceTime</span> | <span style="display: inline-block; width: 50px;">id</span> |
| ------------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------- |
| ALARM_CREATE                                                        | 2025-08-19T12:03:27.845Z                                       | 1                                                              | MAJOR                                                             | 47635                                                           | ACTIVE                                                          | Battery level below 5 percent.                                 | c8y_BatteryAlarm                                               | 2025-08-19T12:03:27.845Z                                                      | 12345                                                       |

Again, the columns of the table represent the [properties of a {{< product-c8y-iot >}} alarm](https://cumulocity.com/api/core/#tag/Alarms). The `eventType` property reflects the recorded change (in this case, a created alarm), and the `count` property is added by {{< product-c8y-iot >}}'s [alarm de-duplication](https://cumulocity.com/api/core/#alarm-de-duplication).
The `firstOccurrenceTime` column is added to reflect the time of the first occurrence of the alarm, which stays the same for de-duplicated alarms.

In the example, there are no custom properties or fragments in the alarm data. The service treats such properties or fragments in the same way as described for the inventory.


### Events {#events}

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

This results in the following data in the lakehouse, consistent with the method described previously.

**Table: cdc_event.event**

| eventType    | time                     | source | text                    | type               | id    |
| ------------ | ------------------------ | ------ | ----------------------- | ------------------ | ----- |
| EVENT_CREATE | 2025-08-20T13:41:39.678Z | 47635  | Tracker location update | c8y_LocationUpdate | 12345 |

**Table: cdc_event.c8y_position**

| id    | source | eventType    | time                     | type               | alt | lng     | lat       |
| ----- | ------ | ------------ | ------------------------ | ------------------ | --- | ------- | --------- |
| 12345 | 47635  | EVENT_CREATE | 2025-08-20T13:41:39.678Z | c8y_LocationUpdate | 67  | 6.15173 | 51.211977 |


### Measurements {#measurements}

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

This results in the following data in the lakehouse:

**Table: cdc_measurement.c8y_Battery**

| <span style="display: inline-block; width: 50px;">id</span> | <span style="display: inline-block; width: 50px;">source</span> | <span style="display: inline-block; width: 200px;">eventType</span> | <span style="display: inline-block; width: 210px;">time</span> | <span style="display: inline-block; width: 200px;">type</span> | <span style="display: inline-block; width: 210px;">creationTime</span> | <span style="display: inline-block; width: 90px;">voltage</span> | <span style="display: inline-block; width: 110px;">stateOfCharge</span> | <span style="display: inline-block; width: 100px;">temperature</span> |
| ----------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------- |
|                                                             |                                                                 |                                                                     |                                                                |                                                                |                                                                        | value \| unit                                                    | value \| unit                                                           | value \| unit                                                         |
| 12345                                                       | 47635                                                           | MEASUREMENT_CREATE                                                  | 2025-08-20T13:42:39.678Z                                       | c8y_BatteryMeasurement                                         | 2025-08-20T13:42:40.012Z                                               | 12.8 \| V                                                        | 85.5 \| %                                                               | 22.5 \| C                                                             |

There is one important difference for measurements compared to other data types: There is no `cdc_measurement.measurement` table. All relevant data is present in the fragment tables.

Every measurement table contains the column `creationTime` in addition to `time`. The device sets `time`, which records when the value was measured. {{< product-c8y-iot >}} sets `creationTime` when it stores the measurement.

This example also demonstrates how the service handles nested properties: Like the {{< product-c8y-iot >}} APIs and its operational store, Apache Iceberg supports nested data. Just like with the above JSON example, the property `voltage` is a nested structure containing two properties `value` and `unit`. You can query the contained properties from SQL using path expressions such as `"voltage"."value"`. For more information on querying the data from SQL, see [Querying the lakehouse](/streaming-lake-ingestion/querying-the-lakehouse/).

### Operations {#operations}

Finally, we would like to restart the tracker with a reset operation:

```
{
  "deviceId": "47635",
  "c8y_Restart": { }
}
```

This results in the following data in the lakehouse:

**Table: cdc_operation.operation**

| <span style="display: inline-block; width: 160px;">eventType</span> | <span style="display: inline-block; width: 210px;">creationTime</span> | <span style="display: inline-block; width: 80px;">deviceId</span> | <span style="display: inline-block; width: 80px;">agentId</span> | <span style="display: inline-block; width: 80px;">status</span> | <span style="display: inline-block; width: 100px;">description</span> | <span style="display: inline-block; width: 60px;">id</span> | <span style="display: inline-block; width: 210px;">lastUpdated</span> | <span style="display: inline-block; width: 130px;">fragments</span> |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------- |
| OPERATION_CREATE                                                    | 2025-08-21T13:42:39.678Z                                               | 47635                                                             | 47635                                                            | PENDING                                                         | null                                                                  | 12345                                                       | 2025-08-21T13:42:39.678Z                                              | \[c8y_Restart\]                                                     |

The columns represent the [properties of a {{< product-c8y-iot >}} operation](https://cumulocity.com/api/core/#operation/getOperationCollectionResource). If you do not provide an optional property, the service stores it as a SQL "null" value.

### Data types {#data-types}

{{< product-c8y-iot >}} relies on JSON as data exchange format in its APIs. JSON data types map to Iceberg data types as follows:

* Strings parsed as timestamps become the Iceberg `timestamptz` data type. Otherwise, they become the Iceberg `string` data type.
* Numbers are stored as Iceberg `decimal` with a maximum precision of 38 and scale of 9.
* Booleans (true/false) map to the equivalent Iceberg `boolean` data type.
* JSON lists become the equivalent Iceberg `list` data type.
* JSON objects become the equivalent Iceberg `struct` data type.

"Null" values are stored as Iceberg "null" values.

Empty JSON objects (`{}`) and empty arrays (`[]`) carry no data to store. They are omitted from the input and treated the same as an absent or "null" property, rather than being converted to a value of the column's data type.

{{< c8y-admon-info >}}
For more information related to Iceberg data types, refer to the [Iceberg specification](https://iceberg.apache.org/spec/#semi-structured-types). Note that there are various [structural limits](/service-terms/quotas/#limits-of-streaming-lake-ingestion) that the service implements to ensure that common upstream query engines can interact with the data produced by the service.
{{< /c8y-admon-info >}}

### Schema evolution {#schema-evolution}

The service automatically discovers the structure of the incoming data and applies it to the lakehouse.
* When the service discovers a new fragment, it creates a table to store the data in the fragment.
* When the service discovers a new property, it creates a column to store the data in the associated table.

### Handling of schema conflicts {#handling-of-schema-conflicts}

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

### Naming {#naming}

The Iceberg lakehouse supports names consisting of characters, numbers, underscores, and dashes — except as the first character, which must always be a letter (a-z, A-Z). Digits, underscores, dashes, and any other character are not permitted in the first position, even though they are permitted elsewhere in the name. Other characters are represented by the character string "\_x" followed by the hexadecimal Unicode value of the character. This applies to table and property names, at any nesting level.

For example, if you use the property name "switch:status" in the data sent to {{< product-c8y-iot >}}, the corresponding Iceberg column name is "switch_x003Astatus".

{{< c8y-admon-info >}}
The first-character restriction is checked before escaping is applied. If the first character of a name is not already a letter, the whole field or fragment is rejected as an [illegal field name](/service-terms/quotas/#limits-of-streaming-lake-ingestion) rather than being escaped. For example, replacing a leading special character with an underscore (a common client-side sanitization approach) does not make the name valid, since an underscore is not a letter.
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

The service also appends this suffix when a top-level property has the same name as the `eventType` column, which records the type of change. For example, the service stores a string property `eventType` in the column `eventType__8`, in both change data capture and latest tables. A value of another type goes to the matching overflow column, for example `eventType__d` for a number.

### Rejected data {#rejected-data}

In addition to the platform-wide limits of {{< product-c8y-iot >}}, the service enforces more specific limits so that it can store the data reliably and query engines can read it. The service rejects data that exceeds these limits: it stores the data in a separate Iceberg table in a different schema, where you can inspect problematic cases and reprocess the data if needed. The following table shows examples of rejected data:

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

#### Examples {#rejected-data-examples}

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

### Current limitations {#current-limitations}

Streaming Lake Ingestion has the following functional limitations:

* `latest` data is only recorded for the inventory.
* Delete events are only processed for the inventory.
* The service drops custom top-level properties in measurements.
* There is no automated cleanup of tables and columns that are not in use anymore.
* You may see an `internal` folder with tables for internal service information. Do not modify these tables.
* The service does not offload any {{< product-c8y-iot >}}-internal inventory entries, events, measurements, and alarms.
