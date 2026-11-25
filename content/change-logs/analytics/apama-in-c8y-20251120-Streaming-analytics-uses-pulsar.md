---
date: 2026-03-31
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
ticket: PAB-4901
version: 26.258.0
---
Streaming Analytics now uses the {{< product-c8y-iot >}} Notifications 2.0 reliable data forwarding capability to receive notifications for measurements, events, alarms, managed objects and operations that are processed by the {{< product-c8y-iot >}} platform. The benefits of using Notifications 2.0 are improved performance and reliability for messaging with Streaming Analytics applications such as smart rules, Analytics Builder and EPL apps.

With this change, the platform no longer pushes these notifications to the Apama-ctrl microservice. Instead, the Apama-ctrl microservice subscribes to Notifications 2.0 when it starts. This applies to every variant of the Apama-ctrl microservice that provides Streaming Analytics to a tenant. If you or your platform operator manage the Apama-ctrl microservice separately from the platform, upgrade it to this release together with the platform. An Apama-ctrl microservice from an earlier release that keeps running after the platform upgrade receives no measurements, events, alarms, managed objects, or operations. Smart rules, Analytics Builder models, and EPL apps then get no input, and the microservice does not log an error. After the upgrade, existing smart rules, Analytics Builder models, and EPL apps work without any migration.

This change does not affect custom Apama microservices that you build from your own Apama project, or Apama applications that connect to {{< product-c8y-iot >}} from outside the platform. They receive notifications through the connectivity bundle of their project. To use Notifications 2.0 in such a project, add the **Cumulocity Notifications 2.0** bundle. For a custom Apama microservice, also add the `ROLE_NOTIFICATION_2_ADMIN` permission to the microservice manifest. For details, see [Connectivity bundles for communicating with Cumulocity](/streaming-analytics/epl-apps/#connectivity-bundles).