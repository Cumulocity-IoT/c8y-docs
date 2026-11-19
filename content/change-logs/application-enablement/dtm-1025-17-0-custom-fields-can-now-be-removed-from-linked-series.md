---
date: ""
title: "Custom fields can now be removed from linked series"
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
ticket: "CTM-2801"
version: "1025.17.0"
---
Previously, custom fields added to linked series could not be removed once created, limiting flexibility when managing data structures. The Asset API now allows you to delete custom fields from linked series by using the value `null`, giving you full control over your data model. This change enables you to clean up unused fields and adapt your linked series configuration as your requirements evolve, without needing to recreate the entire series structure.

Additionally, the fields `fragment`, `series`, `type` & `name` in sources of linked series can now also be removed without having to delete and recreate the whole sources.
