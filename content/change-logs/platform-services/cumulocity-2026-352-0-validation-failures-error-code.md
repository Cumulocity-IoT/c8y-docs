---
date: '2026-10-08'
title: Failed validation of request parameters now reports undefined/validationError
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Platform services
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-67975
version: 2026.352.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-10-08'
  - label: apj.cumulocity.com
    date: '2026-10-14'
  - label: jp.cumulocity.com
    date: '2026-10-14'
  - label: us.cumulocity.com
    date: '2026-10-19'
  - label: cumulocity.com
    date: '2026-10-21'
---

Previously, a request that failed the validation of its parameters was rejected with the status code 422, but the error response contained the error `general/internalError`, which suggested a server fault.
Now, the error response contains the error `undefined/validationError`, like other validation failures. The status code and the `message`, which names the invalid property, are unchanged.

If your client matches on `general/internalError` to detect a validation failure, match on `undefined/validationError` instead.
