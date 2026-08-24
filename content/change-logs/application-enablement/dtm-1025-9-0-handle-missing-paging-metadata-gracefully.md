---
date: '2026-08-18'
title: Handling missing paging metadata gracefully
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-3116
version: 1025.9.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-08-18'
  - label: apj.cumulocity.com
    date: '2026-08-19'
  - label: jp.cumulocity.com
    date: '2026-08-19'
  - label: us.cumulocity.com
    date: '2026-08-20'
  - label: cumulocity.com
    date: '2026-08-20'
---
The Asset API now gracefully handles responses where paging metadata
omits the `totalPages` field, instead of throwing an exception that
returns an error 500. Previously, incomplete paging information caused
requests to fail. The API now logs a warning when paging metadata is
incomplete, making the issue observable while allowing the request to
continue processing.

This change improves reliability when working with the Asset API and
data sources that do not provide complete paging information, such as
older {{< product-c8y-iot >}} platforms. Existing installations benefit
from more resilient request handling without requiring any configuration
changes.
