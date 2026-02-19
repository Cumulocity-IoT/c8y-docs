---
weight: 30
title: Using views in BI applications
layout: redirect
---

Streaming Lake Ingestion offers [Apache Iceberg views](https://iceberg.apache.org/view-spec/) on top of the data ingested into the data lake tables, especially for better integration with BI tools.

### Integration with BI tools {#integration-with-bi-tools}
As BI tools tend to work unwell with structured columns, the views offered by Streaming Lake Ingestion solve this problem by flattening structured fields into "flat" columns. This makes it possible to read nested columns (e.g. `value` and `unit` of a measurement series) as top level primitive fields.
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

This will result in a table like following:
**Table: measurement.c8y_Battery**
| eventType          | source | time                     | type                   | voltage       | stateOfCharge | temperature   |
| ------------------ | ------ | ------------------------ | ---------------------- | ------------- | ------------- | ------------- |
|                    |        |                          |                        | value \| unit | value \| unit | value \| unit |
| MEASUREMENT_CREATE | 47635  | 2026-02-19T13:09:39.678Z | c8y_BatteryMeasurement | 12.8 \| V     | 85.5 \| %     | 22.5 \| C     |

Note that there are three columns which are of structured type: `voltage`, `stageOfCharge` and `temperature`. As many BI tools can't handle structured types, Streaming Lake Ingestion offers views for tables to "unnest" these structured fields.
An according view looks like following:

**View: measurement.c8y_Battery**
| eventType          | source | time                     | type                   | voltage\\value  | voltage\\unit | stateOfCharge\\value | stateOfCharge\\unit | temperature\\value | temperature\\unit |
| ------------------ | ------ | ------------------------ | ---------------------- | --------------- | ------------- | -------------------- | ------------------- | ------------------ | ----------------- |
| MEASUREMENT_CREATE | 47635  | 2026-02-19T13:09:39.678Z | c8y_BatteryMeasurement | 12.8            | V             | 85.5                 | %                   | 22.5               | C                 |

This makes it possible to operate directly on nested fields and e.g. do an analytics for measurement values in BI tools.

### View representations
In Apache Iceberg, views can have multiple representations, meaning you need to check if Streaming Lake Ingestion offers a SQL dialect that can be read by your query engine. Currently, the following two SQL dialects are supported:
* DremioSQL
* spark (**experimental**)

