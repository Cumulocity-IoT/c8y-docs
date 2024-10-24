---
date:
title: Streaming Analytics and Notifications 2.0
change_type:
  - value: change-QHu1GdukP
    label: Feature
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-4250
version:
---
Streaming Analytics can now use the {{< product-c8y-iot >}} Notifications 2.0 reliable data forwarding capability to receive notifications for measurements, events, alarms, managed objects and operations that are processed by the {{< product-c8y-iot >}} platform. The benefits of using Notifications 2.0 are improved performance and reliability for messaging with Streaming Analytics applications such as smart rules, Analytics Builder and EPL apps.

Streaming Analytics intends to migrate all tenants to use Notifications 2.0, and some customers may choose to start migrating now. This change is intended to provide improved performance, reliability and resilience in planned future enhancements to Streaming Analytics.

This feature is currently in private preview. To take advantage of it, you must contact [product support](/additional-resources/contacting-support/) to set the `notification2.streaming-analytics` feature flag. In addition, users of any of the variants of the Apama-ctrl microservice must also toggle the `streaming-analytics.messaging` feature flag. Users of custom Apama microservices must also add the `ROLE_NOTIFICATION_2_ADMIN` permission to the microservice manifest. Users of custom Apama EPL projects must also add the new **Cumulocity Notifications 2.0** bundle. Apama EPL projects that remotely connect to Cumulocity IoT via the long-polling interface will benefit from improved robustness after migrating to Notifications 2.0. For more information, including how to toggle the feature flags, see [Configuration requirements for Notifications 2.0](/streaming-analytics/analytics-customization/#notifications).
