---
date: ""
title: "Enabled asset properties widget 2.0 with backward compatibility"
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
ticket: "CTM-3072"
version: "1025.11.0"
---
Previously, DTM could not fully support replacing the legacy Asset
Properties 1.0 widget with Asset Properties 2.0 while preserving
existing configurations. This change adds the required
backward-compatibility support in DTM, allowing existing Asset
Properties 1.0 configurations to continue working with the newer 2.0 UI
and functionality.