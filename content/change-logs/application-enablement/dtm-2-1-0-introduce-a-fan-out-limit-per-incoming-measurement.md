---
date: ""
title: "Introduce a fan-out limit per incoming measurement"
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
ticket: "CTM-3295"
version: "2.1.0"
---
The DTM Data Service now limits how many objects one incoming measurement can create through data point links. By default, one incoming measurement creates at most 5 measurements, events, or alarms, and the rest are not created. When a tenant reaches the limit, the service raises a MINOR alarm of type `c8y_DtmMeasurementFanOutLimitExceeded` on the source device, at most once a minute. A different limit can be requested.
