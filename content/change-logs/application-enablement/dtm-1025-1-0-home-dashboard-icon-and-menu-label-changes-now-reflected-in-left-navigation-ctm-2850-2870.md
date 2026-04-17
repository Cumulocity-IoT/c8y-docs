---
date: ""
title: "Home dashboard icon and menu label changes now reflected in left navigation. [CTM-2850] (#2870)"
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
ticket: "CTM-2850"
version: "1025.1.0"
---
In Digital Twin Manager, the Icon and Menu label settings in the
dashboard configuration were being overridden by the DTM app
configuration, preventing user customizations from appearing in the left
navigation. Previously, when user changed the Icon or Menu label in the
dashboard configuration, these updates did not display in the left
navigation. Now, changes to these fields are correctly reflected in the
left navigation immediately.