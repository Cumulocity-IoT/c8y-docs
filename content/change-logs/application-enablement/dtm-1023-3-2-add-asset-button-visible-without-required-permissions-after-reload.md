---
date: ""
title: "Add Asset button visible without required permissions after reload"
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
version: "1023.3.2"
---
Previously, the “Add Asset” button was incorrectly displayed on the home page after a page reload even when the user lacked the required permissions. This has now been fixed so that the button is shown only when the user has the appropriate permissions, both on initial load and after reload.