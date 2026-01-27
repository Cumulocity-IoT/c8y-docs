---
date: ""
title: "Fix device property type and date handling."
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
ticket: "CTM-2671"
version: "1024.0.0"
---
Previously, device properties in the Asset Properties widget were stored
with an incorrect type, and date fields in complex properties displayed
an Invalid Date value during editing; now, property data is stored using
the correct data type, and date fields are correctly parsed and
displayed during editing.
