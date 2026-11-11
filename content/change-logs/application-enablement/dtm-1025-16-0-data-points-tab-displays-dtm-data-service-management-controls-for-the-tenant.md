---
date: ""
title: "DTM Data Service status and controls in the Data points tab"
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
The **Data points** tab of an asset now has a **Manage DTM Data Service** button. It opens a dialog that shows whether the DTM Data Service is enabled for your tenant, that is, whether it propagates measurements from source devices to their linked assets. Users with the `ROLE_DIGITAL_TWIN_ADMIN` role can enable or disable the service in the dialog, for all assets of the tenant. Other users see the status, and while the service is disabled, the dialog asks them to contact their tenant administrator.

The button appears when the service is enabled, or when it is disabled and the tenant has data points linked to a source device. It does not appear when a tenant administrator of the management tenant has enabled or disabled the service for all tenants, with the tenant option `n2Subscription.measurements.allTenants` in the category `dtmdata`. When you link the first data point in your tenant, the dialog opens automatically. While the service is disabled and the tenant has links, a warning is shown once per session.

The dialog reads the status with `GET /service/dtmdata/enabled` and changes it with `PUT /service/dtmdata/enabled/measurements`.

For details, see [To enable or disable measurement propagation](/dtm/asset-hierarchy/#enable-measurement-propagation).
