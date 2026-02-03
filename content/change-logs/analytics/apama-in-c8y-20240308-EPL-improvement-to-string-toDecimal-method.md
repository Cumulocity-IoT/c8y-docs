---
date: 2024-03-21
title: EPL improvement to string.toDecimal() method
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAM-34661
version: 25.76.0
---
Previously, performing `string.toDecimal()` for a string with an invalid conversion resulted in a `ParseException` error. This now returns "0.0". This was done to make the experience of using `toDecimal()` similar to using `toFloat()`. If you want the previous strict behavior, use `decimal.parse()` instead.
