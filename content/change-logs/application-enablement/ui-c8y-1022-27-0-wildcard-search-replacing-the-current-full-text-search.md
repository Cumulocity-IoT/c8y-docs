---
date: ""
title: Replace full-text search with wildcard search for improved results
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
ticket: MTM-64410
version: 1022.27.0
---
To enhance the search experience for assets and devices, we have replaced the legacy full-text search with a more accurate wildcard-based search. This update provides more predictable and relevant results by matching names that contain your search term. As part of this change, searching by external IDs, descriptions, and types is no longer supported. If you require full-text search functionality, please contact support or disable the 'ui.search.wildcard' feature flag.