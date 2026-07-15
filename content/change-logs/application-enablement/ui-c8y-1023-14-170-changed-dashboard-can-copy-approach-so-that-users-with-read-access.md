---
date: 2026-06-30
title: Users with read access can now copy dashboards
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
ticket: MTM-66313
version: 1023.14.170
---
Previously, the ability to copy a dashboard was restricted based on user permissions, which prevented users with read-only access from creating copies of dashboards they could view, but not edit. The dashboard copy functionality now allows any user with read access to a dashboard to copy it, regardless of their other permissions. This change makes it easier for users to work with dashboards by enabling them to create their own copies for customization or reference purposes without requiring additional permissions. The copied dashboards can only be pasted to assets of the same kind to which the user has admin access.