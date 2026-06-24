---
date: '2026-06-17'
title: DTM Data Service now available in Public Previw
product_area: Application enablement & solutions
change_type:
  - value: change-feature-rollout
    label: Feature
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc--dtm-data-service
    label: dtm
ticket: CTM-2600
version: 1.0.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-06-17'
  - label: apj.cumulocity.com
    date: '2026-06-18'
  - label: jp.cumulocity.com
    date: '2026-06-18'
  - label: emea.cumulocity.com
    date: '2026-04-23'
  - label: us.cumulocity.com
    date: '2026-06-19'
  - label: cumulocity.com
    date: '2026-06-19'
---
{{< c8y-admon-preview >}}
This feature is in Public Preview. It is not enabled by default and may be subject to change in future releases.
{{< /c8y-admon-preview >}}

The DTM Data Service microservice processes data point links configured through the DTM [Data Points plugin](/dtm/asset-hierarchy/#datapoints) and automatically propagates incoming device measurements to the corresponding assets in the digital twin hierarchy via `c8y_LinkedSeries`.

By transforming raw device measurements into structured asset-context data, the service enables operational data to be accessed and visualized directly from assets, powering asset-centric dashboards, analytics, smart rules, and business applications without requiring direct queries to individual devices.

**Note:** To enable the DTM Data Service, tenant administrators must enable the `notification2.tenant.all.apis` tenant option.
