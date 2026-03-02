---
date: ""
title: SSO users confirm with code when suspend or delete tenant
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
ticket: MTM-66119
version: 1023.14.105
---
In a tenant that has SSO logon, if they try to suspend or delete a tenant, they are prompted for a password. SSO users authenticate withe external service so they are not able to provide Cumulocity account password. Now, instead of password, SSO users have to type randomly generated code to confirm suspend/delete action.