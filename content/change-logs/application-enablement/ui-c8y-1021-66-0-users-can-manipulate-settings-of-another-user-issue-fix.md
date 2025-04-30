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
Previously, user could overwrite another user preferences because preferences were stored in managed object marked with this user name. Due to database limitation, user name with "." (dot) has dot transformed to "__" (double underscore) for saving and accessing preferences, therefore it could lead to conflict with similar user with "__" in its name.

With new approach, user preferences are saved in current user object customProperties ("/user/currentUser") which ensures that only user that is currently logged in has access to read and write preferences of its own user.

For backwards compatibility, preferences from managed object are still read from when needed, but currentUser preferences are updated as soon as these properties are read from managed object. If user has no role to edit its own user, preferences are saved in local storage.