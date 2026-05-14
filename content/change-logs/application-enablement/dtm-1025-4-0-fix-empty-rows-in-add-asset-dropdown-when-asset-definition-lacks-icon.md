---
date: '2026-05-13'
title: Fixed empty rows in Add asset dropdown when asset definition lacks icon
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-2934
version: 1025.4.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-05-13'
---
Asset definitions created without custom icons were previously displayed as
empty rows in the **Add asset** dropdown, making it difficult for users to
identify and select available assets. The **Add asset** dropdown now
displays asset definitions correctly regardless of whether a custom icon
is present, improving the user experience when adding assets to your
application.

This fix ensures that all asset definitions appear with proper
identification in the dropdown, eliminating blank entries that could
cause confusion during asset selection workflows.
