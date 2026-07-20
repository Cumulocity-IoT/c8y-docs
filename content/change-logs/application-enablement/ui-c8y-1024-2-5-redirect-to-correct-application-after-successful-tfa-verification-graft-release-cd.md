---
date: ""
title: Redirect to accessible applications after successful two-factor authentication
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
When users logged in with two-factor authentication (TOTP), they could get stuck on the TOTP verification screen if they did not have access to the application they were trying to reach. For example, if a user tried to open the Administration application but did not have permission to access it, they would remain on the TOTP screen even after successful authentication. Now, after successful two-factor authentication verification, users who do not have access to the requested application see an "Access not available" message and a list of applications they have permission to access, allowing them to select which application to open instead of being stuck on the authentication screen.