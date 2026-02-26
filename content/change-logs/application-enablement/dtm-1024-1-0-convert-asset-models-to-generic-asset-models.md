---
date: '2026-02-19'
title:  New flexible asset modeling capabilities
product_area: Application enablement & solutions
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-2449
version: 1024.1.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-19'
---
The Digital Twin Manager (DTM) application now offers more flexible asset modeling, reducing dependence on rigid schemas and enabling you to represent physical assets with fewer upfront constraints. This change supports a more agile approach to defining and evolving your digital representations of physical assets.

To support this flexibility, two new configuration options are now available in asset model definitions:

- **Allow any subasset models**: This option removes strict restrictions on subasset types. When enabled, any asset model can be nested under the parent model, giving you greater flexibility in defining *asset hierarchies* as your environment evolves.

- **Allow all properties**: Add data to assets even if the properties weren't defined in the original model. This allows you to enrich assets with new data over time without updating the asset model first.

By enabling these flexible model settings, you can build your digital twin structures earlier and refine them incrementally — supporting iterative modeling and real-world variability.

In addition, we have introduced a new default asset model, “Generic Asset” (key: `c8y_GenericDefinition`). It allows all subasset models and properties by default. The model is protected and **cannot be deleted**, ensuring system consistency and preventing accidental removal of this required base definition.
