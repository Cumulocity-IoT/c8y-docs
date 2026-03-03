---
date: ""
title: "Marked the REST API endpoint to get opposite assets as deprecated"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-2c7RdTdXo4"
      label: "Improvement"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-2681"
version: "1024.3.0"
---
A newer, higher-performance variant of the endpoint to query opposite assets was introduced in version 1024.1.0. To align with this improvement and maintain a consistent API, the original endpoint variant is now deprecated.

The REST API endpoint `/service/dtm/assets/linkedSeries/opposites/{deviceId}` used with the default `Accept` header `application/json` is deprecated and will be removed in a future version. Use the `Accept` header `application/vnd.com.nsn.cumulocity.linkedassetscollection+json` instead, which provides better performance and additional filter parameters.

Update any integrations or custom applications that call this endpoint with the `application/json` header to use the new `Accept` header `application/vnd.com.nsn.cumulocity.linkedassetscollection+json` to avoid disruption when the deprecated variant is removed.