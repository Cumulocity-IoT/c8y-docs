---
date: ""
title: Fixed navigation links in HTML widgets not updating page content
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-64849
version: 1021.22.124
---
In HTML widgets, navigation links to pages with the same entity type (e.g., from one group page to another or from one group tab to the same group but other tab) would change the URL but not update the displayed content, making the application appear frozen. This has been fixed to ensure that clicking navigation links within HTML widgets now always updates the page content correctly in all scenarios, providing a consistent user experience.