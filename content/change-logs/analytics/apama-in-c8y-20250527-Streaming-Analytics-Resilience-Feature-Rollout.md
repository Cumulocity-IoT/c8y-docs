---
date: '2025-05-29'
title: >-
  Reliable notifications and smart rule resiliency features now available as Public Preview
change_type:
  - value: change-pXAlHAWka
    label: Preview
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
version: 26.113.0
---
The **Streaming Analytics** microservices now supports reliable delivery of notifications and resilience of **smart rule** state against scheduled restarts. These features are in Public Preview and can be enabled with the feature flags `streaming-analytics.messaging` and `streaming-analytics.resilience.smartrules`. These features are enabled for all tenants on the eu-latest cluster now, and will be automatically rolled out to production zones over the next few weeks. Tenant administrators can override the default on a given environment by setting the feature flags appropriately. The messaging feature must be enabled in order to enable the resilience feature.
