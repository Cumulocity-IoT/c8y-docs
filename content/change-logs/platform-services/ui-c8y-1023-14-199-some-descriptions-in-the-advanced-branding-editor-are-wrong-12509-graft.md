---
date: 2026-09-01
title: Advanced branding editor shows correct descriptions for branding properties
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
ticket: MTM-66035
version: 1023.14.199
---
The advanced branding JSON editor previously displayed Angular's internal FormControl class documentation as descriptions for several branding properties, such as darkThemeAvailable and brandingCssVars keys. You now see meaningful descriptions for these properties. The darkThemeAvailable and brandingCssVars properties display updated documentation comments, and all brandingCssVar keys are processed through a runtime sanitizer to ensure accurate descriptions, since these keys are generated dynamically and cannot include individual documentation comments.