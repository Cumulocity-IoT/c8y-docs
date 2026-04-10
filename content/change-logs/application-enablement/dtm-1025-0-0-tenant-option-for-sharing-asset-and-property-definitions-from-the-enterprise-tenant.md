---
date: ""
title: "New tenant option for sharing asset and property definitions from the Enterprise tenant"
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
ticket: "CTM-2703"
version: "1025.0.0"
---
Managing asset definitions across multiple subtenants previously
required each tenant to maintain its own independent set of definitions.
The new tenant option `definitions.multitenant.sharing.mode` lets you
configure from where asset definitions and MEA definitions are stored and
retrieved across your {{< enterprise-tenant >}} hierarchy.

More details can be found in the [documentation]([url](https://c8y-ops-docs.c8y.io/release/develop/dtm/dtm-configuration/#option-definitions.multitenant.sharing.mode)).
