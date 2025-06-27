---
date: ""
title: Fixed a regex pattern for leading and trailing whitespaces (#9442) [GRAFT][release/cd] (#9469)
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-63970
version: 1022.4.6
---
Fixed an issue with company name validation on tenant creation form. Previously, if user entered 2 letters for the name, the validation would display a confusing error message about invalid leading or trailing whitespaces. Now, it will accept 2-letter company name.