---
date: ""
title: SSO Login Issues after upgrade - automatic cookie cleanup implemented
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
ticket: MTM-63747
version: 1021.22.86
---
For tenants using Single Sign On-redirect as a default login method, after an upgrade from y2024 release (or earlier) to y2025 release (or newer) user logins might fail.
The reason is that older versions were using authorization token for subdomains (e.g. ".test.eu-latest.cumulocity.com") and newer one are using domain specific token ("test.eu-latest.cumulocity.com", without dot at the beginning) and presence of them both was causing conflict. Currently, if old cookie is detected, cookies are cleared with logout and users can log in again successfuly.