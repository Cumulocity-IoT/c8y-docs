---
date: ""
title: "Change JsonSchema#additionalProperties depending on the composition of a *Definition."
product_area: "Application enablement & solutions"
change_type:
    - value: "change-QHu1GdukP"
      label: "Feature"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-2319"
version: "1025.0.0"
---
Updated the JSON Schema generation to dynamically control the
additionalProperties flag depending on how an AssetDefinition is
composed.

- When an AssetDefinition allows all Property Definitions within its
composition, additionalProperties is now set to true to allow flexible
extensions.
- When the composition is strict and fully defined, additionalProperties
is set to false to enforce a closed schema.