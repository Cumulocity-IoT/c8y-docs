---
date: "2026-04-21"
title: "Home dashboard icon and menu label customization now reflected in left navigation"
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
In Digital Twin Manager (DTM), the icon and menu label settings in the
dashboard configuration were being overridden by the DTM application
configuration, preventing user customizations from appearing in the left
navigation. Previously, when users changed the icon or menu label in the
dashboard configuration, these updates did not display in the left
navigation. Now, changes to these fields are correctly reflected in the
left navigation immediately.