---
date: ""
title: "Asset definition keys now follow platform default camel case"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-VSkj2iV9m"
      label: "Fix"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-2988"
version: "1025.7.0"
---
Asset definition keys are now generated using camel case formatting to
align with platform standards across all applications. Previously, the
key generation converted uppercase characters to lowercase, which
created inconsistencies with how property definitions handled naming
conventions. This change ensures that asset definition keys maintain
consistent formatting throughout.