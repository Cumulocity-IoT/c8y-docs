---
date: ""
title: Increased length limit of URLs in Quick Links widget to 2000 characters
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
ticket: MTM-66427
version: 1023.14.181
---
Replaced the hardcoded HTML maxlength="150" on the URL input (both the add-link and list/edit forms) with a reactive form validator that invalidates form if url exceeds 2000 characters. Once limit is exceeded, validation message is shown.