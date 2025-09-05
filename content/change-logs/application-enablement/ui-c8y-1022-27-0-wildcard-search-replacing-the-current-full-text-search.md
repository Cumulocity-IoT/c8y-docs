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
The previous full-text search often provided inaccurate results. We have replaced the full-text search with a wildcard search that checks if the name contains the search term. Searching for external IDs, descriptions, and types is no longer possible. If you require this functionality, please contact support or disable the 'ui.search.wildcard' feature flag.