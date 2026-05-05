---
date: '2026-04-20'
title: Stricter validation of user email addresses
product_area: Platform services
change_type:
  - value: change-3BQrQ6adS
    label: API change
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-63637
version: 2026.128.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-04-30'
  - label: apj.cumulocity.com
    date: '2026-04-29'
  - label: jp.cumulocity.com
    date: '2026-04-29'
---
We are introducing stricter validation for user email addresses.
The part of the domain name following the ‘@’ symbol may now only contain
alphanumeric characters, hyphens, and dots.

This change ensures that system notifications - such as password resets or smart rule alerts - are delivered reliably.

Existing users will not be impacted by this change, however when setting up
new users the updated checks will be applied.
