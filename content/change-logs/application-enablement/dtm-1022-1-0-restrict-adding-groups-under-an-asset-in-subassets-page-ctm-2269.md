---
date: '2025-08-28'
title: Groups can no longer be added under assets in the Subassets page
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-2269
version: 1022.1.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
On the **Subassets** page in the Cockpit application, the **Add Group** button was visible in the details of an asset, allowing groups to be added under assets incorrectly. This issue has been resolved. Groups can no longer be added as a child of an asset.
