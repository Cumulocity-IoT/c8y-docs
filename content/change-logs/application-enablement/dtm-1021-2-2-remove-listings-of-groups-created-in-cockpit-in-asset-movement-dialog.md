---
date: '2025-04-10'
title: >-
  Removed groups created in the Cockpit application from asset movement dialog
  in the Digital Twin Manager
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
ticket: CTM-1972
version: 1021.2.2
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Previously, when selecting an asset and clicking **Move selected**, the dialog displayed groups without the `c8y_isAsset` fragment created in the Cockpit application. This fix ensures that only assets and groups with the `c8y_isAsset` fragment appear in the selection dialog. This change aligns with the [introduction of the default asset model for groups](/change-logs/#dtm-1021-0-0-default-asset-model-for-groups) in the Digital Twin Manager, where groups created through the DTM plugin's "Add asset" function now include the `c8y_isAsset` fragment. The official "Add Asset" plugin will soon be integrated into other default applications, benefiting from this fix and bringing consistency across the platform.
