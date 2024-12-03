---
weight: 30
title: Offloading Cumulocity base collections
layout: redirect
---

### Offloading the base collections {#offloading-the-base-collections}

The following tables summarize the resulting schemas for each of the {{< product-c8y-iot >}} base collections. These schemas additionally include the virtual columns `dir0`, ..., `dir3`, which are used for internal purposes. The columns are generated during the extraction process, but neither do they have corresponding data in the Operational Store of {{< product-c8y-iot >}}, nor are they persisted in the data lake. Do not use `dir0`, ..., `dir3` as additional columns or rename them accordingly in your offloading configuration.

{{< c8y-admon-info >}}
For each offloading run, the current data in the collection is considered. If data has been modified multiple times or deleted between two successful offloading runs, these changes will not be captured in the offloading process and will not be reflected in the data lake. Relevant for the offloading is the current snapshot of the collection when starting an offloading run. For example, after the first offloading execution, the status of an alarm is ACTIVE. Then it changes its status from ACTIVE to INACTIVE and afterwards back to ACTIVE. When the next offloading is executed, it will persist the latest status ACTIVE, but not the intermediate status INACTIVE, because it happened between two offloading runs.
{{< /c8y-admon-info >}}

#### Offloading the alarms collection {#offloading-the-alarms-collection}

The alarm collection keeps track of alarms which have been raised. During offloading, the data of the alarm collection is flattened, with the resulting schema being defined as follows:

| Column name | Column type
| ---         |  ---
| id | VARCHAR |
| count | INTEGER |
| creationTime | TIMESTAMP |
| creationTimeOffset | INTEGER |
| creationTimeWithOffset | TIMESTAMP |
| lastUpdated | TIMESTAMP |
| lastUpdatedOffset | INTEGER |
| lastUpdatedWithOffset | TIMESTAMP |
| YEAR | VARCHAR |
| MONTH | VARCHAR |
| DAY | VARCHAR |
| time | TIMESTAMP |
| timeOffset | INTEGER |
| timeWithOffset | TIMESTAMP |
| severity | VARCHAR |
| source | VARCHAR |
| status | VARCHAR |
| text | VARCHAR |
| type | VARCHAR |

{{< c8y-admon-info >}}
The column `firstOccurrenceTime` is not included in the default schema. If you want to include it in the offloading,
it must be added manually.
{{< /c8y-admon-info >}}

The alarms collection keeps track of alarms. An alarm may change its status over time. The alarms collection also
supports updates to incorporate these changes. Therefore an offloading pipeline for the alarms collection encompasses
additional steps:

1. Offload those entries of the alarms collection that were added or updated since the last offload. They are offloaded
with the above mentioned standard schema into the target table of the data lake.
2. Additional views on the target table are defined in the tenant's space in Dremio. Their names are composed as target table name plus *_all* or *_latest*. The following examples use "alarms" as target table name:
    * **alarms_all** - A view with the updates between two offloading executions, not including the intermediate updates.
    * **alarms_latest** - A view with the latest status of all alarms, with all previous transitions being discarded. For offloading configurations with view materialization enabled, the materialized state in the data lake is used.

The views are provided in your Dremio space. For details on views and spaces in Dremio, see
[Refining offloaded {{< product-c8y-iot >}} data](/datahub/working-with-datahub/#refining-offloaded). In the main panel of the **Offloading** page you find in the details section of an offloading configuration links which navigate you to the corresponding table and views in the Dremio UI.

#### Offloading the events collection {#offloading-the-events-collection}

The events collection manages the events. During offloading, the data of the events collection is flattened, with the resulting schema being defined as follows:

| Column name | Column type
| ---         |  ---
| id | VARCHAR |
| creationTime | TIMESTAMP |
| creationTimeOffset | INTEGER |
| creationTimeWithOffset | TIMESTAMP |
| lastUpdated | TIMESTAMP |
| lastUpdatedOffset | INTEGER |
| lastUpdatedWithOffset | TIMESTAMP |
| YEAR | VARCHAR |
| MONTH | VARCHAR |
| DAY | VARCHAR |
| time | TIMESTAMP |
| timeOffset | INTEGER |
| timeWithOffset | TIMESTAMP |
| source | VARCHAR |
| text | VARCHAR |
| type | VARCHAR |

Events, just like alarms, are mutable, that is, they can be changed after their creation. Thus, the same logic as for alarms applies.

Additional views over the target table are defined in the tenant's space in Dremio. Their names are defined as target table name plus *_all* or *_latest*. The following examples use *events* as target table name:
* **events_all** - A view with all captured states of all events.
* **events_latest** - A view containing only the latest state of all events without prior states. For offloading configurations with view materialization enabled, the materialized state in the data lake is used.

The views are provided in your Dremio space. For details on views and spaces in Dremio, see [Refining offloaded {{< product-c8y-iot >}} data](/datahub/working-with-datahub/#refining-offloaded). In the main panel of the **Offloading** page you find in the details section of an offloading configuration links which navigate you to the corresponding table and views in the Dremio UI.

#### Offloading the inventory collection {#offloading-the-inventory-collection}

The inventory collection keeps track of managed objects. During offloading, the data of the inventory collection is flattened, with the resulting schema being defined as follows:

| Column name | Column type
| ---         |  ---
| id | VARCHAR |
| creationTime | TIMESTAMP |
| creationTimeOffset | INTEGER |
| creationTimeWithOffset | TIMESTAMP |
| lastUpdated | TIMESTAMP |
| lastUpdatedOffset | INTEGER |
| lastUpdatedWithOffset | TIMESTAMP |
| YEAR | VARCHAR |
| MONTH | VARCHAR |
| DAY | VARCHAR |
| name | VARCHAR |
| owner | VARCHAR |
| type | VARCHAR |
| c8y_IsDevice | BOOLEAN |
| c8y_IsDeviceGroup | BOOLEAN |

The inventory collection keeps track of managed objects. Note that {{< product-c8y-iot >}} DataHub automatically filters out internal objects of the {{< product-c8y-iot >}} platform. These internal objects are also not returned when using the {{< product-c8y-iot >}} REST API. A managed object may change its state over time. The inventory collection also supports updates to incorporate these changes. Therefore an offloading pipeline for the inventory encompasses additional steps:

1. Offload those entries of the inventory collection that were added or updated since the last offload. They are offloaded with the above mentioned standard schema into the target table of the data lake.
2. Additional views over the target table are defined in the tenant's space in Dremio. Their names are defined as target table name plus *_all* and *_latest* respectively. The following examples use *inventory* as target table name:
    * **inventory_all** - A view with the updates between two offloading executions, not including the intermediate updates.
    * **inventory_latest** - A view with the latest status of all managed objects, with all previous transitions being discarded. For offloading configurations with view materialization enabled, the materialized state in the data lake is used.

The views are provided in your Dremio space. For details on views and spaces in Dremio, see [Refining offloaded {{< product-c8y-iot >}} data](/datahub/working-with-datahub/#refining-offloaded). In the main panel of the **Offloading** page you find in the details section of an offloading configuration links which navigate you to the corresponding table and views in the Dremio UI.

{{< c8y-admon-info >}}
The fields **childDevices** and **childAssets** are not part of the default offloading columns. They were included in previous versions, but lead to problems for a high number of list items in those fields. In such a case, the columns were no more readable by Dremio. If they must be included in the offloaded data, they can be defined as additional result columns. However, you must ensure that the number of list items in those fields does not exceed the Dremio limit configured in your environment.
{{< /c8y-admon-info >}}

#### Offloading the measurements collection {#offloading-the-measurements-collection}

The measurements collection stores device measurements. Offloading the measurements collection differs from the other collections as you must explicitly select a target table layout, which is either having one table for one type or, for the TrendMiner case, one table with measurements of all types. In the main panel of the **Offloading** page you find in the details section of an offloading configuration a link which navigates you to the corresponding table in the Dremio UI.

##### Offloading measurements with the default target table layout {#offloading-measurements-with-the-default-target-table-layout}

When using the default layout, you must select a measurement type, so that all offloaded data is of the same type. During offloading, the data of the measurements collection is flattened, with the resulting schema being defined as follows:

| Column name | Column type |
| -----       | -----       |
| id | VARCHAR |
| creationTime | TIMESTAMP |
| creationTimeOffset | INTEGER |
| creationTimeWithOffset | TIMESTAMP |
| YEAR | VARCHAR |
| MONTH | VARCHAR |
| DAY | VARCHAR |
| time | TIMESTAMP |
| timeOffset | INTEGER |
| timeWithOffset | TIMESTAMP |
| source | VARCHAR |
| type | VARCHAR |
| fragment.attribute1.name.value | Depends on data type, often FLOAT |
| fragment.attribute1.name.unit | String |
| ... |  |
| fragment.attributeN.name.value | Depends on data type, often FLOAT |
| fragment.attributeN.name.unit | String |
| myCustomAttribute1 | Depends on data type |
| ... |  |
| myCustomAttributeN | Depends on data type |

The entries in the measurements collection can have a different structure, depending on the types of data the corresponding device emits. While one sensor might emit temperature and humidity values, another sensor might emit pressure values. The flattened structure of these attributes is defined as `fragment.` followed by attribute name and associated type being defined as in the measurements collection. The concrete number of attributes depends on the measurement type, illustrated in the above table with `fragment.attribute1.name.value` to `fragment.attributeN.name.value`.

**Example**

The following excerpt of a measurement document in the base collection is processed as follows:

````json
{
    "id": "4711",
    ...
    "time": "2020-03-19T00:00:00.000Z",
    "type": "c8y_Temperature",
    "c8y_Temperature": {
        "T": {
            "unit": "C",
            "value": 2.079
        }
    }
}
````

The system uses the type attribute to determine `c8y_Temperature` as measurement type. Next it determines the measurement fragment `c8y_Temperature`, which comprises measurement type `T`, measurement value 2.079, and measurement unit `C` as properties. This fragment is flattened and represented in the target table in the data lake as

| ... | c8y_Temperature.T.unit | c8y_Temperature.T.value |... |
| ---- | ---- | ---- | ---- |
| ... | C | 2.0791169082 | ... |

{{< c8y-admon-important >}}
Try to ensure that the data you feed into the measurements base collection is consistent. If measurements of the same type vary in the fragment structures, the resulting target table might not have the expected schema. A common problem, for example, are varying data types of the values like one value being 2.079 and another one NaN.
{{< /c8y-admon-important >}}

##### Offloading measurements with the TrendMiner target table layout {#offloading-measurements-with-the-trendminer-target-table-layout}

When using the TrendMiner layout, all measurements are offloaded into one table **c8y_cdh_tm_measurements**. Their corresponding type is stored in column **type**. The column **unit** defines the unit, while the column **value** defines the value of the measurement. The column **tagname** is used by TrendMiner to search for specific series. It is composed of the source, the fragment, and the series as stored in the measurements collection.

The resulting schema is defined as follows:

| Column name | Column type |
| -----       | -----       |
| id | VARCHAR |
| creationTime | TIMESTAMP |
| creationTimeOffset | INTEGER |
| creationTimeWithOffset | TIMESTAMP |
| time | TIMESTAMP |
| timeOffset | INTEGER |
| timeWithOffset | TIMESTAMP |
| YEAR | VARCHAR |
| MONTH | VARCHAR |
| DAY | VARCHAR |
| source | VARCHAR |
| type | VARCHAR |
| tagname | VARCHAR |
| value | VARCHAR |
| unit | VARCHAR |

**Example mapping**

The following excerpt of a measurement document in the base collection

````json
{
    ...
    "source": "857",
    "type": "Temperature",
    ...
     "c8y_Temperature": {
         "T": {
             "unit": "C",
             "value": 2.0791169082
         }
     }
}
...
{
    ...
    "source": "311",
    "type": "Pressure",
    ...
     "c8y_Pressure": {
         "P": {
             "unit": "kPa",
             "value": 98.0665
         }
     }
}
````

is represented in the target table in the data lake as

| ... | type | tagname | unit | value | ... |
| ---- | ---- | ----- | ----- | ----- | ----- |
| ... | Temperature | 857.c8y_TemperatureMeasurement.T | C | 2.0791169082 |... |
| ... | Pressure | 311.c8y_PressureMeasurement.P | kPa | 98.0665 |... |

In addition to the table **c8y_cdh_tm_measurements**, the table **c8y_cdh_tm_tags** is created. This table stores the tag names and the source IDs, which connect the tagname used in TrendMiner with a device and its ID as managed in the {{< product-c8y-iot >}} platform. The schema of the **c8y_cdh_tm_tags** table is defined as:

| Column name | Column type |
| -----       | -----       |
| source | VARCHAR |
| tagname | VARCHAR |
| unit | VARCHAR |
| datatype | VARCHAR |
| latestCreationTime | TIMESTAMP |
