---
date: ""
title: Tenant identification as enterprise no longer depends on feature broker availability
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
ticket: MTM-68878
version: 1025.15.2
---
Cumulocity previously indentified a tenant as an enterprise tenant by checking the availability of the feature-broker application. This has now been changed and Cumulocity no longer checks the availability of the feature-broker application when it tries to identify a tenant as an enterprise tenant.

This change has no impact on existing enterprise tenants and you do not need to take any action.