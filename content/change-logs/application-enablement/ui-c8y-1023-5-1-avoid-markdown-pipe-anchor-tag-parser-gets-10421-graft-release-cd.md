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
The markdown pipe could be tricked into parsing a link as a platform link while it is in fact an external link. This could potentially be used to do trick the user to follow a link to a malicious website, which then could execute commands on the user behalf on the Cumulocity platform. While this exploit was very unlikely to happen, we further secured the markdown pipe by doing a correct host check to detect external links better and therefore closing the attack vector.