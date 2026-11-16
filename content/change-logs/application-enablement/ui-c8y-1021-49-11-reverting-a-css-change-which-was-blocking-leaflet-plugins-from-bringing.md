---
date: '2025-03-20'
title: Leaflet plugins can again display their custom images
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-60439
version: 1021.49.11
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
A recent CSS change inadvertently prevented Leaflet plugins from including their own images. This has been reverted to restore the previous behavior. Leaflet plugins can now properly display their custom images again. Installations using Leaflet plugins that include custom images will no longer encounter missing images.
