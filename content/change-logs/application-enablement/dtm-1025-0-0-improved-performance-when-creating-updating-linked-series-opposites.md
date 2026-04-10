---
date: ""
title: "Improved performance when creating or updating linked data points"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-2c7RdTdXo4"
      label: "Improvement"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-2676"
version: "1025.0.0"
---
When creating or updating linked data points via the API, the endpoint previously made separate inventory API calls to look up the source device and resolve the corresponding opposite-series entries. This increased latency, particularly in environments with large asset hierarchies containing many linked data points.

The Digital Twin Manager now consolidates the device and opposite series lookups into a single inventory call. The reduced number of backend requests results in faster response times when you create or update linked data points. No action is required on existing installations.