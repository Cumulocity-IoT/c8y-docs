---
date: '2024-09-26'
title: Renamed microservice from 'dtm-ms' to 'dtm'
product_area: Application enablement & solutions
change_type:
  - value: change-3BQrQ6adS
    label: API change
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-1535
version: 1020.1.16
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The  DTM microservice has been renamed from "dtm-ms" to "dtm". REST endpoint paths have been updated accordingly, replacing the "dtm-ms" segment with "dtm". Users will not perceive any change. However, they may need to manually unsubscribe and uninstall the older version.
