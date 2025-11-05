---
date: ""
title: Navigation links not updating page content in HTML widgets
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
Users clicking navigation links within HTML widgets will now see the page content update correctly in all scenarios. Previously, navigating between pages with the same entity type (e.g., from https://example.cumulocity.com/group/123/dashboard to https://example.cumulocity.com/group/123/subassets) would change the URL but leave the old content displayed, making the app appear frozen. This fix ensures all navigation links in HTML widgets work consistently by forcing proper route change detection in the AngularJS router, which then synchronizes with the Angular router in our hybrid application.