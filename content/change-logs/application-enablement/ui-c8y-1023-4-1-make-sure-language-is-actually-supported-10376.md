---
date: ""
title: "Ensure user is not ending up on a blank screen in case it's preferred language was stored in an unexpected format"
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
ticket: MTM-65299
version: 1023.4.1
---
In some cases, the user preferred language was stored in an unexpected format on the user object (as an object instead of a string). The UI implementation expected a string and was not able to handle an object instead. For an object, it then failed to initialize the application and the user ended up on a blank screen.

This behavior has been adjusted and the application will initialize in these cases as expected.