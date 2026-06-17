---
date: "2026-06-15"
title: "DTM Data Service now available in Public Previw"
product_area: "Application enablement & solutions"
change_type:
  - value: "change-feature-rollout"
    label: "Feature"
component:
  - value: "component-Tl88RYb4A"
    label: "Digital Twin Manager"
build_artifact:
  - value: "tc--dtm-data-service"
    label: "dtm"
ticket: "CTM-2600"
version: "1.0.0"
---
{{< c8y-admon-preview >}}
This feature is in Public Preview. It is not enabled by default and may be subject to change in future releases.
{{< /c8y-admon-preview >}}

The DTM Data Service processes data point links configured through the DTM Data Points plugin and automatically associates incoming device measurements with the corresponding assets in the Digital Twin hierarchy. This allows operational data to be accessed and visualized from assets instead of directly from device measurements.

By making data available in asset context, the service enables asset-centric dashboards, analytics, smart rules, and business applications.

**Important:** For enabling DTM Data Service, tenant administrators must enable the `notification2.tenant.all.apis` tenant option.
