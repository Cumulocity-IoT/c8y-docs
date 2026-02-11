---
date: '2025-09-11'
title: Returning information on all managed object ancestors when withParents=true
change_type:
  - value: change-3BQrQ6adS
    label: API change
product_area: Platform services
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-63253
version: 2025.295.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Using the Inventory API parameter `withParents=true` now results in returning basic information (ID, type, name) on all ancestors of managed objects instead of being limited to only 3 levels of hierarchy. Notice that inventory roles are not taken into consideration when collecting information on ancestors, so basic information on all of them will be returned.

In addition to improving the API usability the performance of requests using the `withParents=true`
parameter has also been improved.
