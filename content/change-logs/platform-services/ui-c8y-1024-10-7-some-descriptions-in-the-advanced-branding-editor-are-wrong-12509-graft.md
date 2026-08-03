---
date: ""
title: Some descriptions in the advanced branding editor are wrong (#12509) [GRAFT][release/cd] (#12739)
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
version: 1024.10.7
---
The advanced branding JSON editor showed Angular's internal FormControl class documentation as the "description" for several branding properties (e.g. darkThemeAvailable, all ~120 brandingCssVars keys), instead of anything meaningful — only in CI-built apps, never locally. Fixed darkThemeAvailable and brandingCssVars's own description with real doc comments; fixed all brandingCssVars leaf keys with a small runtime sanitizer, since they're generated dynamically and can't carry individual JSDoc comments.