---
date: ""
title: "Icon selector now supports custom SVG icons and per-asset selection"
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
ticket: "CTM-2989"
version: "1025.10.0"
---
The icon selector previously limited users to built-in icon collections,
which restricted customization options for asset representation. Now you
can upload custom SVG icons directly in the icon selector and update the
icon at the asset level in the subassets view. The custom icon you
select replaces the existing icon everywhere the asset appears across
the system. The icon display follows this priority: if the Asset
instance has a custom icon, it displays that icon; otherwise, it
retrieves the icon information from the Asset definition to which the
asset is associated; if neither exists, it falls back to the default
icon.
This change improves asset management by giving you greater control over
how assets are visually represented in your applications and dashboards.