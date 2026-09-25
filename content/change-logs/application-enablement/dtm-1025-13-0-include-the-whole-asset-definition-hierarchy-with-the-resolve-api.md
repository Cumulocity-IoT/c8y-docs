---
date: ""
title: "Include the whole AssetDefinition hierarchy with the resolve API"
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
ticket: "CTM-3243"
version: "1025.13.0"
---
The Asset API endpoint `/definitions/assets/resolve` previously returned
only the definition information for the provided assets, which required
the client to recursively call this endpoint to get the whole hierarchy
of asset definitions.

The Asset API now returns the complete hierarchy of asset definitions.
This enables users to get all asset definitions with a single API call,
eliminating the need for multiple requests and providing better
visibility into available asset definition structures.