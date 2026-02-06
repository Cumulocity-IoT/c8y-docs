---
date: ""
title: "Changed the structure of storing ordering information of complex Property Definitions; existing Property Definitions are migrated to the new structure"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-2c7RdTdXo4"
      label: "Improvement"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-1918"
version: "1024.1.0"
---
Previously the field ordering information of complex Property Definition
was stored in the `c8y_Order` array. This changed now and the order is
stored in the `order` property within each field of the JSON schema.
Existing Property Definitions are migrated to the new structure when the
microservice is subscribed.