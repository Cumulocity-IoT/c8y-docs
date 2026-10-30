---
date: ""
title: "Enable navigation to the assets page via the assets breadcrumb link in Digital Twin Manager"
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
ticket: "CTM-3142"
version: "1025.15.1"
---
The assets breadcrumb link in Digital Twin Manager previously navigated
to the Groups page instead of the Assets page, creating confusion in the
navigation flow. Now clicking the Assets breadcrumb link correctly
navigates you to the Assets page, ensuring breadcrumb navigation behaves
as expected.

This change improves navigation consistency in Digital Twin Manager,
allowing you to quickly return to the main Assets page from any nested
view.