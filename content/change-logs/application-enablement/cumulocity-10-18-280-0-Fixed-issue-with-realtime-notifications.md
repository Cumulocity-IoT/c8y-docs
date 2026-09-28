---
date: '2023-12-06'
title: Fixed issue with realtime notifications
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-QWPx3rFfn
    label: Java SDK
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-54196
version: 10.18.280.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Fixed an issue in the Java realtime notification SDK where a client would stop trying to re-establish a subscription after receiving a "402::Unknown client" error from the {{< product-c8y-iot >}} platform. The impact of this issue was that future notifications would not be delivered to the client. Typically, the problem was observed after the subscription was moved from one {{< product-c8y-iot >}} core node to another, for example after a core restart or a network outage. This issue has now been resolved, and the notification subscription is transparently restored with no impact to the client.
