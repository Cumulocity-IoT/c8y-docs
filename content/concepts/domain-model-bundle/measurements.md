---
weight: 40
title: Measurements
layout: redirect
---


Measurements represent regularly acquired readings and statistics from sensors.

Measurements consist of a time when the measurement was taken, the unique identifiers of the source of the measurement, and a list of fragments. Here is an example of a measurement:

```json
{
  "source": {
    "id": "251982"
  },
  "time": "2020-03-19T12:03:27.845Z",
  "type": "c8y_ElectricityMeasurement",
    "c8y_ThreePhaseElectricityMeasurement": {
        "A+": { "value": 435, "unit": "kWh" },
        "A-": { "value": 23, "unit": "kWh" },
        "P+": { "value": 657, "unit": "W" },
        "P-": { "value": 0, "unit": "W" },
        "A+:1": { "value": 123, "unit": "kWh" },
        "A-:1": { "value": 2, "unit": "kWh" }
    }
}
```

Similar to the inventory model, fragments are used to identify characteristics of particular devices. Each measurement fragment is an object that holds the actual measurements as properties, also known as series. The property name corresponds to the name of the measurement and includes two properties:

-   value: A numeric value representing the individual measurement that is required for every series.
-   unit: The unit associated with the measurement.

The example above represents a three-phase electricity meter that sends readings for the different electrical phases. A measurement fragment maps the names of the individual readings (for example, "A+" or "A-") to the actual numeric value and unit of the measurement.

In addition to value and unit, readings can hold various additional information that applications may require. However, detailed custom attributes are to be avoided in measurements. Instead, we recommend using the [events](/concepts/domain-model/#events) domain model.

More detailed information can be found in [Measurements](https://{{< domain-c8y >}}/api/core/#tag/Measurements) in the {{< openapi >}}.
