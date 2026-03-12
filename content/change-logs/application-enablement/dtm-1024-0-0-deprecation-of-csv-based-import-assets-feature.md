---
date: 2025-12-06
title: Deprecation of CSV-based import assets feature in Digital Twin Manager
product_area: Application enablement & solutions
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: "component-Tl88RYb4A"
    label: "Digital Twin Manager"
build_artifact:
  - value: "tc-wYIY0MBDO"
    label: "dtm"
ticket: ""
version: ""
---
As part of the move to an API-first approach for asset management, the CSV-based **Import assets** feature will be deprecated and removed from the Digital Twin Manager (DTM).

In current versions, this feature is automatically disabled when the Asset APIs feature flag is enabled for Private Preview features on a tenant. In upcoming releases, it will be fully removed.

To ensure a smooth transition, begin preparing your migration to the Asset APIs, which enable more scalable and flexible asset creation through modern, API-driven workflows. Additional guidance will be shared soon in a dedicated Tech Community article.
Comprehensive API documentation is available directly in DTM through the OpenAPI plugin. You can install it by navigating to: **Administration application > Ecosystem > Extensions > Dtm-plugins > Extension package > Dtm-plugins > OpenAPI documentation**.
