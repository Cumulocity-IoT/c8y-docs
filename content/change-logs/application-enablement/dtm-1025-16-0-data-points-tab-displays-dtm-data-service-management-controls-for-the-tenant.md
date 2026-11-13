---
date: '2026-11-11'
title: Manage DTM Data Service status from the Data points tab
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
ticket: CTM-3306
version: 1025.16.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-11-11'
---
The **Data points** tab now includes a **Manage DTM Data Service** button that provides direct access to view and control the DTM Data Service status for your tenant. The DTM Data Service controls the propagation of measurements from source devices to their linked assets.

Users with ADMIN permission for "Digital twin" (ROLE_DIGITAL_TWIN_ADMIN) can enable or disable the service for all assets in the tenant. Users without this permission can view the current service status and receive a prompt to contact their tenant administrator if the service is disabled. The button appears when the service is enabled or when it is disabled with active data point links to source devices. When you link your first data point to a source device, the service automatically enables and displays the management dialog. If the service becomes disabled while linked data points exist, a warning appears once per session to alert you of the status change. You can disable the service for all tenants from the management tenant by setting the tenant option `n2Subscription.measurements.allTenants` in the category `dtmdata`.

For details, see [To enable or disable measurement propagation](/dtm/asset-hierarchy/#enable-measurement-propagation).
