---
date: ""
title: Fix computed property configuration in single select mode.
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
ticket: MTM-66278
version: 1023.63.1
---
In Asset property selector, if single select mode is applied and computed property with configuration is selected, modal with config was opened twice. It was fixed and now modal is opened just once as it should.