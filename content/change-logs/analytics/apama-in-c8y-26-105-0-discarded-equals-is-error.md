---
title: Incorrect assignment operator usage now triggers an error
change_type:
  - value: change-3BQrQ6adS
    label: API change
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
version: 26.105.0
date: 2026-03-31
product_area: Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAM-34572
---

In earlier versions of EPL Apps, using `=` instead of `:=` resulted in a warning. This has now been promoted to an error. Loading will be rejected until the line is fixed or removed.
