---
date: ""
title: "Disabled bulk assets import when feature flags are enabled"
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
version: "1022.9.0"
---
Previously, bulk import via CSV was accessible even when DTM feature flags were enabled, leading to unsupported behavior. This update disables the import button in such cases and adds a tooltip to explain the restriction, improving clarity for users.