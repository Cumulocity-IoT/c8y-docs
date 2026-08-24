---
date: ""
title: "Properties added directly to an asset via API no longer appear in Subassets"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-VSkj2iV9m"
      label: "Fix"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-3148"
version: "1025.10.0"
---
Previously, properties added directly to an asset via API that were not
part of the asset definition or the DTM property definitions were
displayed in the **Subassets** page along with the properties configured for
the asset definition, regardless of whether **Allow any property** was
enabled. This behaviour has now been corrected to ensure that properties
added directly to the asset are no longer displayed in the Subassets
page. When **Allow any property** is enabled, users can still add
additional properties from the DTM Properties Library using the **Add
Property** option, and the selected properties will be displayed
alongside the properties defined for the asset model within sub-assets
page.