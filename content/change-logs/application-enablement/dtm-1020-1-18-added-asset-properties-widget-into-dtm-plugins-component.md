---
date: '2024-11-21'
title: Added Asset properties widget into DTM plugins component
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-1625
version: 1020.1.18
---
The DTM plugins component now includes a new asset properties widget module, which enhances the functionality of the existing "Asset properties" widget. This includes:
 - Simplified selection of the modelled properties for assets.
 - Support for listing properties of type: file
 - Ability to preview images attached to properties of type: file 
 - The widget has been migrated to Angular.
The module is designed for easy integration into any {{< product-c8y-iot >}} application. In future releases, this widget will replace the current "Asset properties" widget across all {{< product-c8y-iot >}} applications.
