---
date: '2024-08-29'
title: >-
  Public option translations now have higher priority than translations from
  plugin PO files
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
ticket: MTM-60268
version: 1020.18.3
---
Previously, translations from plugin PO files (file format used for UI translations) took precedence over translations added via public options, which could lead to inconsistencies. With this change, translations added via public options will now have a higher priority than translations from plugin PO files. Existing translations in plugin PO files that conflict with public option translations will be overridden. This ensures a consistent and predictable translation behavior. 
