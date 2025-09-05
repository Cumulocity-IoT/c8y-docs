---
date: ""
title: wildcard search replacing the current full-text search
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
With this change, we remove the possibility of doing a full-text search, as it was mostly not giving the right results. Instead, we are always searching if the name contains the search term.

Note: This will discontinue the possibility of searching for external IDs, Description and Types. If you need this possibility, please contact support or toggle the 'ui.search.wildcard' feature flag off.