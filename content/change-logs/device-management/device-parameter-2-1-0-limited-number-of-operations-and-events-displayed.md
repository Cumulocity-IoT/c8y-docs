---
date: '2026-05-01'
title: Improved page navigation of device parameter details
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component--LJtTuzaN
    label: Device Parameter
build_artifact:
  - value: tc-wfTX6sxsr
    label: device-parameter
ticket: DM-5963
version: 2.1.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-05-01'
  - label: apj.cumulocity.com
    date: '2026-05-06'
  - label: jp.cumulocity.com
    date: '2026-05-06'
  - label: us.cumulocity.com
    date: '2026-05-11'
  - label: cumulocity.com
    date: '2026-06-08'
---

In the device parameter details, the automatic loading of historical operations and events has been replaced by a **Load More** button. Previously, the seamless fetching of older entries often prevented the user from scrolling to subsequent parameters in the list, as the page length kept increasing. With this change, older data is only retrieved upon an explicit click, ensuring that page navigation remains consistent and that subsequent parameters can be reached without interruption.
