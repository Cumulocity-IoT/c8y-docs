---
date: '2026-02-11'
title: Added fallback route for routing in hybrid applications
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
ticket: MTM-64415
version: 1023.36.1
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-11'
  - label: apj.cumulocity.com
    date: '2026-02-12'
  - label: jp.cumulocity.com
    date: '2026-02-12'
---
Routing in hybrid applications (applications that share AngularJS and Angular code) could become inaccessible if certain routes are not found, potentially leaving users unable to access functionality. A fallback route has been added to the applications to ensure that users can always access this feature, even if the primary routing path is unavailable. This prevents users from encountering broken navigation paths when accessing features.
