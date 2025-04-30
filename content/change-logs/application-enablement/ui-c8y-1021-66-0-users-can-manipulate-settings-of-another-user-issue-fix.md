---
date: ""
title: Issue resolved where users might access and/or change another user's settings
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
ticket: MTM-55712
version: 1021.66.0
---
Previously, user could access or change another user's settings. This issue has been fixed. Now only the user that is currently logged in can read/write its user preferences.


For backwards compatibility, preferences from managed object are still read from when needed, but currentUser preferences are updated as soon as these properties are read from managed object. If user has no role to edit its own user, preferences are saved in local storage.