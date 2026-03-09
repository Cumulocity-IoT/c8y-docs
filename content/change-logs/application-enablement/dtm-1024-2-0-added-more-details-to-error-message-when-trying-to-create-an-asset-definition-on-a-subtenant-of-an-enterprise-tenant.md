---
date: '2026-02-26'
title: >-
  Improved error message returned from the REST API on creating or updating
  asset definitions from a subtenant
product_area: Application enablement & solutions
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-2740
version: 1024.2.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-26'
  - label: apj.cumulocity.com
    date: '2026-03-04'
  - label: jp.cumulocity.com
    date: '2026-03-04'
  - label: emea.cumulocity.com
    date: '2026-03-09'
  - label: us.cumulocity.com
    date: '2026-03-09'
---
Previously, the error message returned from the REST API when trying to create or update asset definitions on a subtenant of an {{< enterprise-tenant >}} was generic and did not include tenant IDs. The error message now includes the relevant tenant IDs.
