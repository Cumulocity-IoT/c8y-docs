---
date: '2026-04-09'
title: >-
  New tenant option for sharing asset and property definitions from the
  Enterprise tenant
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-2703
version: 1025.0.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-04-14'
  - label: apj.cumulocity.com
    date: '2026-04-22'
  - label: jp.cumulocity.com
    date: '2026-04-22'
---
Managing asset definitions across multiple subtenants previously
required each tenant to maintain its own independent set of definitions.
The new tenant option `definitions.multitenant.sharing.mode` lets you
configure from where asset definitions and MEA definitions are stored and
retrieved across your {{< enterprise-tenant >}} hierarchy.

For more details, refer to the [DTM documentation](https://cumulocity.com/docs/dtm/).
