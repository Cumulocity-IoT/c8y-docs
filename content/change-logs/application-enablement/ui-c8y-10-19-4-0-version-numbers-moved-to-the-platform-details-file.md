---
date: 2024-03-14T14:35:11.175Z
title: Version numbers moved to the platform details file
product_area: Application enablement & solutions
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-56932
version: 10.19.4.0
---
The version numbers for the frontend and backend are no longer displayed in the platform UI. Instead, details on all components can be downloaded via the **Download platform details** button. This change was motivated by a component split resulting in many different components following different version number schemes. However, custom apps developed with the Web SDK may show a default version number if desired. Support requests should now always include the platform details information.
