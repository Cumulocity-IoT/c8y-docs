---
date: 2026-03-31
title: Authentication tab hidden if corresponding login option is not configurable for the tenant
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
To simplify the user experience, changes have been made to the tabs available to users in the Administration → Settings → Authentication page. If the tenant does not have permission to manage Basic or OAI-Secure login options, the corresponding tab will not be shown. This avoids confusion about what authentication methods are configurable for the tenant.

Further information on how to configure access settings for login options can be found in the [{{< openapi >}}](https://cumulocity.com/api/core/#operation/putAccessLoginOptionResource).
