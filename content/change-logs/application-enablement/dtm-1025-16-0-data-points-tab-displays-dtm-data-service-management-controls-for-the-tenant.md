---
date: ""
title: "Data points tab displays DTM data service management controls for the tenant"
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
ticket: "CTM-3306"
version: "1025.16.0"
---
The data points tab now includes a **Manage DTM Data Service** button that displays the replication status of linked data points to assets for your tenant. Users with the ROLE_DIGITAL_TWIN_ADMIN role can enable or disable the service directly from the dialog, while other users see instructions for enabling it. The button appears only when the service status is available, the operator has not set a global policy for all tenants, or the tenant has existing data point links.

When you create your first data point link, the system automatically checks the DTM Data Service status and reloads it to reflect any changes. The dialog retrieves the service status from the `GET /service/dtmdata/enabled` endpoint, and users with appropriate permissions can modify the replication mode using the `PUT /service/dtmdata/enabled/measurements` endpoint. If the service is unavailable or you lack the required permission, the system handles these cases silently without displaying error alerts.

This change improves visibility into data point replication and gives tenant administrators direct control over the DTM Data Service without requiring operator intervention. Existing tenants with data point links can now enable or disable automatic replication based on their needs.
