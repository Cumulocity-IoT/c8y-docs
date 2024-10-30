---
date:
title: Improved performance of local smartrules creation and update
product_area: Platform services
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-60574
version: 10.20.604.0
---
Previously, the request time for creation of a Smartrule or updating a Smartrule was increasing with a number of `enabledSources` or `disabledSources`. 
Because of this, it was recommended to not choose _"Activate also for <number> child assets"_ checkbox when local Smartrule was created on a group containing many devices.

With the new version the performance of requests was improved in validation area and now updating a Smartrule with single device ID added or removed from `enabledSources` or `disabledSources` is very fast. 

Additionally, creation of a local Smartrule is very fast in case of a big number of **direct** children of a top level group. 
In case of deeper inventory hierarchies only the first level of hierarchy is validated faster, so requests for local Smartrule creation can still take a long time 
if the group has hundreds of descendants deeper in hierarchy and all of them are chosen as `enabledSources`.
