---
date: ""
title: "assign identities when creating assets using the externalIds field"
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
ticket: "CTM-2938"
version: "1025.8.0"
---
Previously, you had to create an asset first and then make separate REST
requests to assign multiple identities to it. Now you can assign
identities in a single request by using the `externalIds` field when
creating an asset. This streamlines the asset creation workflow and
reduces the number of API calls required.

Existing asset creation workflows using the REST API continue to work as
before, but you can now take advantage of the more efficient
single-request approach.