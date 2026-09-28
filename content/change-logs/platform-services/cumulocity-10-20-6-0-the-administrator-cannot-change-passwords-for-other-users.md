---
date: '2023-12-06'
title: Administrators cannot change passwords for other users
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-55259
version: 10.20.6.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
For security reasons, administrators can no longer change passwords of other users. The users are only allowed to change their own passwords. However, administrators can still enforce the users to change their passwords on their next login in case of any anticipated breaches.
