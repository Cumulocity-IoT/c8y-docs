---
date:
title: Added new query language function
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
A new function `isinhierarchyof()` has been added to the [query language](https://cumulocity.com/api/core/#tag/Query-language). 

- Matches objects in the hierarchy of the object whose ID is passed as an argument.
- Accepts one or multiple arguments.

For given hierarchy:

* Group g1
  * Subgroup s1
    * Object o1
    * Object o2
  * Subgroup s2
    * Object o3
    * Object o4

- `isinhierarchyof(g1)` - matches group `g1` and all of its descendants: `g1`, `s1`, `s2`, `o1`, `o2`, `o3`, `o4`
- `isinhierarchyof(s1)` - matches subgroup `s1` and all of its descendants: `s1`, `o1`, `o2`
- `isinhierarchyof(s2)` - matches subgroup `s2` and all of its descendants: `s2`, `o3`, `o4`
- `isinhierarchyof(o1)` - matches only object `o1`
- `isinhierarchyof(o3)` - matches only object `o3`
- `isinhierarchyof(s1,s2)` - matches both subgroups and their descendants: `s1`, `s2`, `o1`, `o2`, `o3`, `o4`
- `isinhierarchyof(o2,o4)` - matches objects `o2`, `o4`
