---
date:
title: isinhierarchyof() query language function
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-61960
version: 2025.47.0
---
`isinhierarchyof()` function has been added to the [query language](https://cumulocity.com/api/core/#tag/Query-language). 

- Matches objects in the hierarchy of the object whose ID is passed as an argument.
- Accepts one or multiple arguments.

Example usage:
- `isinhierarchyof(x)` - matches object with ID = `x` and all of its children
- `isinhierarchyof(x,y)` - matches objects with ID = `x` or `y` and all of their children
