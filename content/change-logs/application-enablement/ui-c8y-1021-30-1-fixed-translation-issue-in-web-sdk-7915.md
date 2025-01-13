---
date: ""
title: Fixed issues with custom translations in the Web SDK.
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
ticket: MTM-62124
version: 1021.30.1
---
Applications using custom ngx translations were not being properly translated. The issue has been resolved by correctly merging translations together. With this fix, users of applications built using the web SDK and using custom ngx translations will now see the appropriate translated text for their selected language.