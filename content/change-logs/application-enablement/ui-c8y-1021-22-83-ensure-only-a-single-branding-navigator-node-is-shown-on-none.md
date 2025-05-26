---
date: ""
title: Ensure only a single branding navigator node is shown on non-enterprise tenants
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
ticket: MTM-63722
version: 1021.22.83
---
In the past, non-enterprise tenants could see multiple branding navigator nodes in certain situations, which was confusing and not the intended behavior. With this change, non-enterprise tenants will now always only see a single branding navigator node as expected. This improves the user experience and navigation for non-enterprise tenants by providing a cleaner and more consistent interface.