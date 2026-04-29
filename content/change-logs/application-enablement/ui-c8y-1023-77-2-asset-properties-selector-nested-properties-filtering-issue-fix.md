---
date: ""
title: Asset properties selector nested properties filtering issue fix.
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
ticket: MTM-66468
version: 1023.77.2
---
In Asset properties selector there was an issue related to nested properties. User trying to search for property that was child of complex property was getting no results. Currently, if user tries to search for nested property, it will be displayed as a result (and also parent of this property). 
Other thing that was fixed was filtering also by translated label of the property- previously, only original label (in english) was taken into account for filtering.