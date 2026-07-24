---
date: ""
title: Support download link in Login app (#12365)
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-67167
version: 1024.9.0
---
Adds binary file download support to the public/login app so customers can share links like #/?download= (e.g.
https://jsmith.preprod.c8y.io/apps/public/login/index.html#/?download=78180895) without requiring a custom. When a user opens such a link, the login app authenticates them normally (including SSO), then instead
of redirecting to their default app it shows an inline download view with the file name, a Download button, and the app switcher. After downloading, a success alert is shown and the user can navigate to any
app via the switcher or log out.