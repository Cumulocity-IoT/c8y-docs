---
date: '2026-02-19'
title:  New Flexible Asset Modeling Capabilities
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
The **Digital Twin Manager (DTM)** application now offers more flexible asset modeling, reducing dependence on rigid schemas and enabling you to represent physical assets with fewer upfront constraints. This change supports a more agile approach to defining and evolving your digital representations of physical assets.

- **Allow any subasset models**: A new option on asset models that removes strict restrictions on subasset types. When enabled, any asset model can be nested under the parent model, giving you greater flexibility in defining *asset hierarchies* as your environment evolves

- **Allow all properties** : Assets created from models with this option enabled can hold any *asset properties* even if they were not defined in the original asset model. This lets you enrich assets with new data over time without needing to update the schema first.

By opting into these flexible model settings, you can begin building out your digital twin structures earlier and refine the details later—supporting iterative modeling and real-world variability.

Along with this change we have introduced a new default asset model, “Generic Asset” (key: 'c8y_GenericDefinition'), which allows all subasset models and properties. It is protected and cannot be deleted, ensuring system consistency and preventing accidental removal of this required base model
