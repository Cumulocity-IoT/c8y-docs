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
---
We are introducing stricter validation for user email addresses.
The domain part after the '@' symbol may now only include
alphanumeric characters, hyphens, and dots.

This change ensures that system notifications - such as password resets or smart rule alerts - are delivered reliably.

Existing users will not be impacted by this change, however when setting up
new users the updated checks will be applied.