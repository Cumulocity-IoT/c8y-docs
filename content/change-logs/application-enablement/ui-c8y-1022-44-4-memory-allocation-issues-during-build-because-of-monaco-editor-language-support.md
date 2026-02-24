---
date: '2026-03-31'
title: Fixed memory allocation issues during build process
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
ticket: MTM-64566
version: 1022.44.4
---
The monaco-editor language support feature includes large worker files (around 1-10MB) which caused memory allocation problems for webpack during the build process. To address this, the build process has been updated to first build the monaco-related service workers separately before the main application. The built monaco worker files are then copied to the final build folder. This change resolves the memory allocation issues and ensures a successful build process.
