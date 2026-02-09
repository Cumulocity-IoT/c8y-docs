---
date: '2024-04-04'
title: >-
  Correct HTTP response code sent on missing fields in CRL (Certificate
  Revocation List) entries
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-55154
version: 10.20.294.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
A wrong HTTP response code was sent when fields were missing in the CRL (Certificate Revocation List) entry. This behavior has been fixed now.
