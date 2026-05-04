---
date: ''
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
---
Fixed an issue where unexpected exceptions during token-authenticated service calls were incorrectly mapped to 401 Unauthorized. The SDK now correctly propagates the original error status and metadata, ensuring accurate debugging and preventing misleading authentication alerts.

