---
date: 2025-05-12
title: Separate login application
product_area: Application enablement & solutions
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-63361
version: 1022.0.0
---
As part of the major version 1022.0.0 the Web SDK will no longer provide the login functionality as part of every application.
Instead there will be a separate login application dedicated to the login functionality.

Web applications built on top of the Web SDK version 1022.0.0 or higher will redirect to this login application if required.

Customers writing their own UI applications can benefit from this change since they no longer have to reimplement the login functionality on their own. They can now just redirect to this dedicated application.

As part of these changes, the login page also received a redesign.

Customers which have been embedding the UI in an iframe and need to login within that iframe might need to perfrom some adjustments to the login page.