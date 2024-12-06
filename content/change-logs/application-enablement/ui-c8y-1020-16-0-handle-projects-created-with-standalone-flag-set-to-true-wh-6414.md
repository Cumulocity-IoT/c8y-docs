---
date: '2024-08-22'
title: >-
  Cumulocity schematics now handle Angular standalone projects by disabling
  standalone mode
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
ticket: MTM-56831
version: 1020.16.0
---
Previously, adding {{< product-c8y-iot >}} schematics to Angular projects initialized with the standalone flag set to true failed. This issue has been addressed. Now, when integrating {{< product-c8y-iot >}} schematics into standalone Angular projects, the standalone flag is automatically set to false. Full support for standalone projects will be implemented in future updates. This interim solution allows developers to use {{< product-c8y-iot >}} schematics with projects initially set up as standalone, though with standalone features disabled.
