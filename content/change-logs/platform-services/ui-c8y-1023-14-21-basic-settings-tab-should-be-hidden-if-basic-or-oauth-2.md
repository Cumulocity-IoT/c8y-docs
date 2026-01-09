---
date: ""
title: "Hide authentication's \"Basic settings\" tab if Basic or OAI-Secure login options are not available due to onlyManagementTenantAccess option"
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-64347
version: 1023.14.21
---
Since onlyManagementTenantAccess flag can be set for the Basic and OAI-Secure authentication methods, the Administration → Settings → Authentication → Basic settings tab will be shown or hidden depending on this flag:
- if onlyManagementTenantAccess is set to true for an authentication method (Basic or OAI-Secure), the Basic settings tab will be hidden for tenants other than the management tenant
- if onlyManagementTenantAccess is set to false for both (Basic or OAI-Secure) methods, the Basic settings tab will be visible to all relevant tenants.