---
date:
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
---
Cumulocity are proud to announce enhanced Single Sign-On APIs that allow the configuration and administration of thousands of users. We listened to our customers who told us the use of a user interface in such instances was not scaleable and required intense effort to properly administer such large numbers of users. These new REST endpoints allow users to manage global and inventory access mappings for tenant login options:
* POST/GET/PUT/DELETE /tenant/loginOptions/{configIdOrType}/accessMappings
* POST/GET/PUT/DELETE /tenant/loginOptions/{configIdOrType}/inventoryAccessMappings

The endpoints enable CRUD operations on individual mappings without updating the entire login options configuration, with optional session termination via `terminateUserSessions`.