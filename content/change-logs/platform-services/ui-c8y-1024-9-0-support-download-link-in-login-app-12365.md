---
date: '2026-08-05'
title: Support download links in login app
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
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-08-05'
  - label: apj.cumulocity.com
    date: '2026-08-05'
  - label: jp.cumulocity.com
    date: '2026-08-05'
  - label: us.cumulocity.com
    date: '2026-08-06'
  - label: cumulocity.com
    date: '2026-08-06'
---
The login app now supports direct file downloads through shareable links, allowing you to share download links (for example, *https://jsmith.preprod.c8y.io/apps/public/login/index.html#/?download=78180895*) without requiring a custom application. Previously, the login app could only redirect you to your default application after authentication. Now, when you open a download link, the login app authenticates you as usual (including single sign-on), then displays an inline download view showing the file name, a download button, and the app switcher instead of redirecting to your default app. After you download the file, a success message appears, and you can navigate to any app using the switcher or log out. This simplifies sharing files with users by eliminating the need to create custom applications for download functionality.
