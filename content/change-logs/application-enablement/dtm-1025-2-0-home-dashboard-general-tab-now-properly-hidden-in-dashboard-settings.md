---
date: ""
title: "Home dashboard general tab now properly hidden in dashboard settings"
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
version: "1025.2.0"
---
The Home dashboard was displaying the General tab in Dashboard settings,
which caused issues. The system now adds the c8y_Dashboard!name!dtm-home
fragment to the default dashboard managed object, aligning with how
Cockpit and Device Management handle their home dashboards. This
fragment properly hides the General tab in Dashboard settings,
preventing users from accessing settings that should not be modified for
the Home dashboard.