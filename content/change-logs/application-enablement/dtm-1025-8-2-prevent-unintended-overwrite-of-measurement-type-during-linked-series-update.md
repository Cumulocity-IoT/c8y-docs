---
date: ""
title: "Unintended overwrite of measurement type during linked series update now prevented"
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
ticket: "CTM-3081"
version: "1025.8.2"
---
When updating linked series measurements, the Asset API previously
overwrote the measurement type in the source when the request body
omitted `source.id`. The Asset API now retrieves the measurement type from
the updated linked series state, ensuring that the latest source
information is applied during partial updates.

This fix prevents accidental data loss in linked series configurations
and ensures that partial updates respect existing source information.