---
weight: 40
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

The inventory collection keeps track of managed objects. Note that {{< product-c8y-iot >}} DataHub automatically filters out internal objects of the {{< product-c8y-iot >}} platform. These internal objects are also not returned when using the {{< product-c8y-iot >}} REST API. As described in [Configure inventory collection](#configuring-inventory-collection), pre-defined views over the inventory collection allow you to confine your offloading to the relevant data. Those views all share the above schema.

A managed object may change its state over time. The inventory collection also supports updates to incorporate these changes. Therefore an offloading pipeline for the inventory encompasses additional steps:

1. Offload those entries of the inventory collection that were added or updated since the last offload. They are offloaded with the above mentioned standard schema into the target table of the data lake.
2. Additional views over the target table are defined in the tenant's space in Dremio. Their names are defined as target table name plus *_all* and *_latest* respectively. The following examples use *inventory* as target table name:
    * **inventory_all** - A view with the updates between two offloading executions, not including the intermediate updates.
    * **inventory_latest** - A view with the latest status of all managed objects, with all previous transitions being discarded. For offloading configurations with view materialization enabled, the materialized state in the data lake is used.

The views are provided in your Dremio space. For details on views and spaces in Dremio, see [Refining offloaded {{< product-c8y-iot >}} data](/datahub/working-with-datahub/#refining-offloaded). In the main panel of the **Offloading** page you find in the details section of an offloading configuration links which navigate you to the corresponding table and views in the Dremio UI.

{{< c8y-admon-info >}}
The fields **childDevices** and **childAssets** are not part of the default offloading columns. They were included in previous versions, but lead to problems for a high number of list items in those fields. In such a case, the columns were no more readable by Dremio. If they must be included in the offloaded data, they can be defined as additional result columns. However, you must ensure that the number of list items in those fields does not exceed the Dremio limit configured in your environment.
{{< /c8y-admon-info >}}

#### Offloading the measurements collection {#offloading-the-measurements-collection}

The measurements collection stores device measurements. The corresponding table contains all measurements for a pre-selected measurement type. In the main panel of the **Offloading** page, you find a link in the details section of an offloading configuration that navigates you to the corresponding table in the Dremio UI.

You must select a measurement type, so that all offloaded data is of the same type. During offloading, the data of the measurements collection is flattened, with the resulting schema being defined as follows:

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
| fragment_name1.property_name1.value | Depends on data type, often FLOAT |
| fragment_name1.property_name1.unit | String |
| ... |  |
| fragment_nameM.property_nameN.value | Depends on data type, often FLOAT |
| fragment_nameM.property_nameN.unit | String |
| my_custom_property_name1 | Depends on data type |
| ... |  |
| my_custom_property_nameN | Depends on data type |

The entries in the measurements collection can have a different structure, depending on the types of data the corresponding device emits. While one sensor might emit temperature and humidity values, another sensor might emit pressure values. For details on measurement creation via API see the corresponding [{{< product-c8y-iot >}} REST API](https://cumulocity.com/api/core/#operation/postMeasurementCollectionResource) documentation. See also [Mapping measurement fragments to relational data](/datahub/working-with-datahub#mapping-measurement-fragments-to-relational-data) for details on how a measurement fragment is mapped into a relational structure.

Each measurement document must have the ID of the associated source, a measurement type, and the measurement time. Within the document, there are one or more fragments. Each fragment comprises related measurements, with each measurement being modelled as a property. For example, the fragment `c8y_Steam` contains the properties `Temperature` and `Humidity`. Such a measurement property must itself contain a mandatory property `value` and should contain an optional property `unit`. A measurement document with one fragment having one measurement property is flattened in the data lake into a column `fragment_name.property_name.value` and, if set, a column `fragment_name.property_name.unit`. Documents with multiple fragments, each containing multiple measurements, are flattened in an analogous way, indicated in the above table with `fragment_name1.property_name1.value` to `fragment_nameM.property_nameN.value`.

**Example**

The following excerpt of a measurement document in the base collection is processed as follows:

````json
{
    "id": "4711",
    ...
    "time": "2020-03-19T00:00:00.000Z",
    "type": "temperatureMeasurement",
    "c8y_Steam": {
        "Temperature": {
            "unit": "C",
            "value": 2.079
        },
        "Humidity": {
            "unit": "%RH", 
            "value": 13.37
        }
    }
}
````
The fragment `c8y_Steam` is flattened into two measurements and represented in the target table in the data lake as

| ... | c8y_Steam.Temperature.unit | c8y_Steam.Temperature.value | c8y_Steam.Humidity.unit | c8y_Steam.Humidity.value | ... |
| --- | ---- | ---- | ---- |
| ... | C | 2.079 | %RH | 13.37 | ... |

{{< c8y-admon-important >}}
Try to ensure that the data you feed into the measurements base collection is consistent. If measurements of the same type vary in the fragment structures, the resulting target table might not have the expected schema. A common problem, for example, are varying data types of the values like one value being 2.079 and another one NaN.
{{< /c8y-admon-important >}}