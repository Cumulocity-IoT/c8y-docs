---
date: 2025-12-03
title: Improved module federation plugin documentation and fixed loading of webpack styles from node_modules
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
ticket: MTM-64865
version: 1021.22.126
---
The module federation plugin allows loading micro frontends from separate deployments into a shell application. Previously, the documentation for using external assets and stylesheets in micro frontends was incomplete and confusing. Additionally, there was an issue with referencing images from external stylesheets loaded through webpack from node_modules. The documentation has now been refactored to provide clearer guidance on using external assets and stylesheets in micro frontends. The issue with loading styles from node_modules through webpack has also been fixed. Micro frontends can now correctly reference images used in external stylesheets coming from node_modules. These changes improve the developer experience when using the module federation plugin to build micro frontend architectures.
