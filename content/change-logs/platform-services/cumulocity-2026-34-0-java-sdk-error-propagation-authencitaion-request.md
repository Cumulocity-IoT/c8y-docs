---
date: '2026-04-30'
title: Java SDK improved error propagation for authenticated requests
product_area: Application enablement & solutions
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: QWPx3rFfn
    label: Java SDK
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-61220
version: 2026.34.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-04-30'
  - label: apj.cumulocity.com
    date: '2026-05-06'
  - label: jp.cumulocity.com
    date: '2026-05-06'
  - label: emea.cumulocity.com
    date: '2026-04-27'
  - label: us.cumulocity.com
    date: '2026-05-04'
  - label: cumulocity.com
    date: '2026-05-05'
---
Previously, unexpected exceptions during token-authenticated service calls were incorrectly mapped to "401 Unauthorized". This issue has been fixed. The Java SDK now correctly propagates the original error status and metadata, ensuring accurate debugging and preventing misleading authentication alerts.

