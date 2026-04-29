---
date: ""
title: Asset properties selector now filters nested properties and translated labels correctly
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
The asset properties selector previously had issues when searching for nested properties. When you searched for a property that was a child of a complex property, no results were displayed, and filtering only worked with the original English label of properties, not translated labels. Now when you search for a nested property, the selector displays the matching property along with its parent property in the results. Additionally, filtering now works with both the original property labels and their translated versions, making it easier to find properties regardless of the language setting you use.