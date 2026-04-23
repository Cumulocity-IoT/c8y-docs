---
date: ""
title: "Digital Twin Manager client API replaces inventory calls for groups"
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
ticket: "CTM-2829"
version: "1025.2.1"
---
The system now uses Digital Twin Manager client API methods instead of
inventory calls to retrieve group details. Previously, group information
was fetched through inventory endpoints, which required additional
processing and API calls. The new implementation uses dedicated Asset
API calls that provide a more direct and efficient way to access group
data.

This change improves performance and simplifies the code path for
retrieving group information across your applications. Existing
installations automatically benefit from the improved efficiency without
requiring any configuration changes or migration steps.