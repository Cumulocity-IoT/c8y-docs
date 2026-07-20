---
date: ""
title: Redirect to correct application after successful two-factor authentication
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
ticket: MTM-67315
version: 1024.2.5
---
Fixes an issue where users logging in with two-factor authentication (TOTP) would get stuck on TOTP screen if they didn't have access to the application they were trying to reach. E.g. if user tried to open url /apps/administration but logged in as user that does not have access to this app, after successful TOTP authentication, he was stuck on that screen. Now, users will see see an "Access not available" message and list of application they do have permission for and can choose which one to open.