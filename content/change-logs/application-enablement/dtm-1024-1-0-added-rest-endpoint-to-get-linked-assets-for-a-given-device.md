---
date: ""
title: "Added REST endpoint to get linked assets for a given device"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-QHu1GdukP"
      label: "Feature"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-2670"
version: "1024.1.0"
---
A new variant of the REST endpoint `/service/dtm/assets/linkedSeries/opposites/{deviceId}` that returns a linked asset collection for a given device has been added. To use it, the `Accept` header `application/vnd.com.nsn.cumulocity.linkedassetscollection+json` must be used.
