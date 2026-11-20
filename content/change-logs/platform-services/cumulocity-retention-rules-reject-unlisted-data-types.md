---
date: '2026-11-19'
title: Retention rules reject data types that the API specification does not list
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Platform services
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-68579
version: 2026.432.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-11-19'
  - label: apj.cumulocity.com
    date: '2026-11-20'
  - label: jp.cumulocity.com
    date: '2026-11-20'
---

Previously, the retention rule API accepted the data types `PROCESS`, `STATISTICS_FILES`, and `TIMESERIES_MEASUREMENT`, which the API specification does not list. A rule with `PROCESS` or `STATISTICS_FILES` never removed any data, and a rule with `TIMESERIES_MEASUREMENT` removed no measurements.
Now, creating or updating a rule with one of these types fails with the status code 422. The error message lists all valid values: `ALARM`, `AUDIT`, `BULK_OPERATION`, `EVENT`, `MEASUREMENT`, `OPERATION`, and `*`. Before, the message omitted `BULK_OPERATION`.

Existing rules with these types stay unchanged. Clients that create such rules must use a type from the list.

For details, see [Retention rules](/standard-tenant/managing-data/#retention-rules).
