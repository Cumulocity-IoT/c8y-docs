---
date: ""
title: Securing markdown pipe link parser
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
ticket: MTM-65215
version: 1023.5.1
---
In certain cases, the markdown pipe interpreted an external link as a platform link. This could potentially be exploited to direct users to a malicious website. Although this exploit was very unlikely to occur, the markdown pipe has been further secured by verifying the host to detect external links and prevent attacks.