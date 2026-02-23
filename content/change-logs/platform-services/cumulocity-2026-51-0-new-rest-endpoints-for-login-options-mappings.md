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
This change introduces new REST APIs to create, read, update, and delete global and inventory roles access mapping entities associated with tenant login options:

* POST/GET/PUT/DELETE /tenant/loginOptions/{configIdOrType}/accessMappings
* POST/GET/PUT/DELETE /tenant/loginOptions/{configIdOrType}/inventoryAccessMappings

These endpoints allow managing access rules independently of updating the entire login options configuration, enabling targeted edits of individual mappings (including optional session termination via terminateUserSessions).