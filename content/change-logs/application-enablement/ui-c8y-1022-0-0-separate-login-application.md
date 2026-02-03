---
date: 2025-05-12
title: Separate login application now manages all authentication flows
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
Starting with version 1022.0.0, the Web SDK no longer includes built-in login functionality in each application. Instead, a separate login application now manages all authentication flows.
Web applications developed using Web SDK version 1022.0.0 or later will automatically redirect users to this standalone login application whenever authentication is needed.

This change benefits customers creating their own UI applications, as they no longer need to implement custom login flows. They can simply redirect users to the new login application.
The login page has also been redesigned as part of this update, improving its usability and visual appeal.

Note: Customers who embed the UI within an iframe and require in-iframe login may need to modify their implementation to support this new login flow.
