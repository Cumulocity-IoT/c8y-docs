---
date: '2025-10-16'
title: Computed properties available in new properties selector
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-63490
version: 1022.43.0
---
To enable developers to define custom properties with dynamic values, a new `hookComputedProperty` hook has been introduced. This hook allows defining computed properties that calculate their values on-the-fly based on other properties or external data, rather than storing the values directly on assets. Computed properties support context-aware applicability, allowing them to be selectively available based on the current context. They can also include optional configuration components for easy customization. Computed property values can be returned synchronously or asynchronously using promises or observables, providing flexibility in how the values are calculated and returned.
