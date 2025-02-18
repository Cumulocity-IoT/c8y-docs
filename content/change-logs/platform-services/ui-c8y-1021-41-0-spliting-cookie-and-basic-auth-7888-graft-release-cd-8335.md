---
date: ""
title: Basic authentication has been eliminated during the login process using OAI-SECURE.
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-61832
version: 1021.41.0
---
During the login process using OAI-SECURE, the UI relied on basic authentication due to logic based on the /currentTenant endpoint. As part of this task, basic authentication has been eliminated from the OAI-SECURE login process.
The new login process is available for OAI-SECURE where the tfaSupported flag is enabled. This flag was introduced to ensure backward compatibility.