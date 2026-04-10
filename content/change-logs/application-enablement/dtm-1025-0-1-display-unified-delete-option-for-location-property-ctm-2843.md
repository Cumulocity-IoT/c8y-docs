---
date: ""
title: "Display unified delete option for Location property [CTM-2843]"
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
ticket: "CTM-2843"
version: "1025.0.1"
---
Previously, the “Remove” button appeared twice: one for the fields and
one for the map when the Location property was selected for the models
that allowed to add additional properties in new Add asset screen. This
update ensures that only a single remove button appears for the
property.