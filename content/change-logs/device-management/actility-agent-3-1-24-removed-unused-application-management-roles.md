---
date: ""
title: Actility agent no longer requests application management roles
product_area: Device management & connectivity
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component-TCiiCOknp5
    label: LPWAN
build_artifact:
  - value: tc--fVxjY7du
    label: actility-agent
ticket: DM-7795
version: 3.1.24
---
The Actility agent no longer requests the `ROLE_APPLICATION_MANAGEMENT_ADMIN` and `ROLE_APPLICATION_MANAGEMENT_READ` roles. The agent never used them, so its service user now has only the permissions it needs. Actility connections and device registration work as before. You do not need to take any action.
