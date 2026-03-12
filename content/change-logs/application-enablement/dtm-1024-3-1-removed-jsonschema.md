---
date: ""
title: "Removed jsonschema."
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
ticket: ""
version: "1024.3.1"
---
Previously, each property in a asset definition or other definition
contained a `$schema` element which was not correct. This issue has been
fixed now.