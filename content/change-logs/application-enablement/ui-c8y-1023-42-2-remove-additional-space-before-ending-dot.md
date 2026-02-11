---
date: ""
title: Remove additional space before ending dot.
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
ticket: MTM-65698
version: 1023.42.2
---
There was an extra empty space between link and ending dot- for example in Linear gauge widget config view preview (empty state). It was caused by invalid formatting of html templates. It is fixed for this and similiar cases. It also fixes future formatting.