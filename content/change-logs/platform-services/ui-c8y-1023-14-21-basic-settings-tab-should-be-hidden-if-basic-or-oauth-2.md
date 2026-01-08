---
date: ""
title: "Basic settings" tab should be hidden if `BASIC` or `OAUTH2_INTERNAL` login options throw 403 error (#10454) [GRAFT][release/y2026] (#10673)
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
More context info:
Depending on the value of the onlyManagementTenantAccess flag for the BASIC and OAI-Secure authentication methods, the Administration → Settings → Authentication → Basic settings tab should be dynamically shown or hidden, following the same behavior as already implemented for the Sign-on tab.

Criteria:
If onlyManagementTenantAccess is set to true for a given authentication method (BASIC or OAI-Secure), the Basic settings tab should be hidden for tenants other than the management tenant.
If onlyManagementTenantAccess is set to false for both (BASIC or OAI-Secure) methods, the Basic settings tab should be visible to all relevant tenants.

onlyManagementTenantAccess directly affects if login option throws 403 error, therefore we check for this error when deciding whether to show the tab or not.