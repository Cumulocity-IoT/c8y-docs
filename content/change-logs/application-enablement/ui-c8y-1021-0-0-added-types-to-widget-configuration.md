---
date: '2024-11-11'
title: Added type information to widget configuration
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
ticket: MTM-38876
version: 1021.0.0
---
To provide more clarity and improve validation when configuring widgets, type information has been added to the widget configuration. Previously, the widget configuration did not include any type information, which could lead to confusion and misconfiguration. With this change, each configuration property now specifies its expected type, such as string, number, or boolean. 
