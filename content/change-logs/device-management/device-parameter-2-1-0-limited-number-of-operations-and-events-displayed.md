---
date: ""
title: Limited number of operations and events displayed
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
---

An update has been made to the Device Parameter details view so that the automatic loading of historical operations and events is replaced by a manual **Load More** button. Previously, the seamless fetching of older entries often prevented the user from scrolling down to subsequent parameters in the list, as the page length was continuously extended. With this change, older data is only retrieved upon an explicit click, ensuring that page navigation remains consistent and that subsequent parameters can be reached without interruption.
