---
title: Incorrect assignment operator usage now triggers error
change_type:
  - value: change-3BQrQ6adS
    label: API change
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
version: 26.105.0
date: 
product_area: Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAM-34572

---

In earlier versions of EPL Apps, using `=` instead of `:=` would result in a warning. This has now been promoted to an error.