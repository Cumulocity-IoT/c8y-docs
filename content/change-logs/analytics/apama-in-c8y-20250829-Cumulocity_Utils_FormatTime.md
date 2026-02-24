---
date: 2026-03-31
title: EPL Apps utility Util.formatTime produces date-time string in ISO8601 format
change_type:
  - value: change-3BQrQ6adS
    label: API change
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAM-35326
version: 26.199.0
---

The behavior of the `Util.formatTime` has changed in the {{< product-c8y-iot >}} utilities bundle for EPL Apps. This utility now produces a date-time string in **ISO8601 format** (`yyyy-MM-dd'T'HH:mm:ss.SSS`). This is a **breaking change** for any code relying on the previous `yyyy/MM/dd HH:mm:ss` format. We recommend updating your code to handle the new standard format.

Example:
 - Previous: `2025/09/01 12:38:30Z`
 - Current : `2026-03-31T12:38:30.123Z`

