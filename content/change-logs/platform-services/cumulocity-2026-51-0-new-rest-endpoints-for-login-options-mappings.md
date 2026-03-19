---
date: '2026-03-05'
title: New REST endpoints for login option mappings
product_area: Platform services
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-62754
version: 2026.51.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-03-05'
  - label: apj.cumulocity.com
    date: '2026-03-11'
  - label: jp.cumulocity.com
    date: '2026-03-11'
  - label: emea.cumulocity.com
    date: '2026-03-16'
  - label: us.cumulocity.com
    date: '2026-03-16'
  - label: cumulocity.com
    date: '2026-03-17'
---
The single sign-on APIs have been enhanced to allow the configuration and administration of thousands of users. Using the user interface in such instances was not scalable and required intense effort to administer such large numbers of users properly. 

These new REST endpoints allow users to manage global and inventory access mappings for tenant login options:
* POST/GET/PUT/DELETE /tenant/loginOptions/{configIdOrType}/accessMappings
* POST/GET/PUT/DELETE /tenant/loginOptions/{configIdOrType}/inventoryAccessMappings

The endpoints enable CRUD operations on individual mappings without updating the entire login options configuration, with optional session termination via `terminateUserSessions`.
