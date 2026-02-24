---
date: '2026-03-31'
title: Improved performance of local smart rules creation and update
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
Previously, the request time for creating or updating a smart rule increased with the number of enabled or disabled sources. 
Therefore it was recommended to not select the **Activate also for &lt;number&gt; child assets** checkbox when a local smart rule was created on a group containing many devices.

With this change the performance of requests has been improved and now updating a smart rule by adding or removing a single device ID from the list of enabled or disabled sources (`enabledSources` or `disabledSources`) is very fast. 

Additionally, creating a local smart rule has become much faster in case of a large number of **direct** children of a top-level group. 
In case of deeper inventory hierarchies only the first level of the hierarchy is validated faster, so creating a local smart rule can still take a long time
if the group has hundreds of descendants deeper in the hierarchy and all of them are selected as `enabledSources`.
