---
date: '2023-12-06'
title: Fixed issues with Proof of Possession process
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-52956
version: 10.18.140.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
In the <b>Trusted certificates</b> page, refreshing and downloading the verification code for the Proof of Possession process now works properly if a new certificate was uploaded or the verification code was refreshed by the user.
