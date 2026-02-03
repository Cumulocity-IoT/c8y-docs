---
date: 2024-05-13
title: New switch for disabling/enabling case-sensitivity in usernames
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
ticket: MTM-56865
version: 1019.23.0
---
To enhance the user experience, a switch has been added to the authentication settings, which allows to disable/enable case-sensitivity in usernames. When the switch is turned on, username validation will now treat uppercase and lowercase letters as distinct, requiring users to enter their username exactly as it was set. This affects all users.
