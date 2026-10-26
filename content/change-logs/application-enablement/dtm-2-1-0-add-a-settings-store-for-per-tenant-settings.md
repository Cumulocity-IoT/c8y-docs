---
date: ""
title: "Add a settings store for per-tenant settings"
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
ticket: "CTM-3297"
version: "2.1.0"
---
Adds a shared store for settings that operators set per tenant, so the
fan-out limit per incoming measurement (CTM-3295) can keep its setting
in one place, with no managed object or poll of its own. No feature uses
it yet.