---
date: '2026-03-31'
title: Fixed display of multiple branding navigator items on non-enterprise tenants
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
version: 1021.76.1
---
In the past, non-enterprise tenants could see multiple **Branding** navigator items in certain situations, which was confusing and not the intended behavior. With this change, non-enterprise tenants will now always only see a single **Branding** item as expected. 
