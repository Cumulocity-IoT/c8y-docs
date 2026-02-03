---
date: 2023-12-06T15:44:54.332Z
title: Improved password validation for subtenants
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Platform services
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-41226
version: 10.18.495.0
---
When setting the password for the admin user on creating a subtenant, the password validation is based on the selected tenant policy. An exception to this case is if strong password usage is enforced on system level. When setting a password for the admin user on an existing subtenant, the password validation is based on the security settings for the current tenant.
