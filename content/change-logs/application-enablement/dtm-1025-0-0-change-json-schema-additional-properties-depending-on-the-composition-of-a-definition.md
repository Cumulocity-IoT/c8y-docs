---
date: ""
title: "The JSON schema generation has been enhanced to dynamically control the
additionalProperties flag based on the composition of an AssetDefinition."
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
The JSON schema generation has been updated to dynamically control the
`additionalProperties` flag depending on how an `AssetDefinition` is
composed.

- When an `AssetDefinition` allows all property definitions within its
composition, the `additionalProperties` flag is now set to true to allow flexible
extensions.
- When the composition is strict and fully defined, the `additionalProperties` flag
is set to false to enforce a closed schema.