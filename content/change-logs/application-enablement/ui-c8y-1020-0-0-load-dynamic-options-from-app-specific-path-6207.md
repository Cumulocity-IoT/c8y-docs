---
date: '2024-06-06'
title: Support for loading dynamic options from app-specific paths
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-59023
version: 1020.0.0
---
To provide more flexibility for configuring applications, {{< product-c8y-iot >}} now supports loading dynamic options from application-specific paths. With this change, each hosted application will load its dynamic options from a path that includes the application context path. This allows application-specific configurations to be loaded dynamically.
The Cockpit application would now load it's dynamic options from: `/apps/public/public-options@app-cockpit/options.json` while it previously did so from: `/apps/public/public-options/options.json`.
This change was done as a preparation for upcoming changes to the branding manager.
