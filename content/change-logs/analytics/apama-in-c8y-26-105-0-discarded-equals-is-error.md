---
title: Incorrect assignment operator usage now triggers error
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-M5-cepIIS
    label: Streaming AnalyticPAM-34572s
version: 26.105.0
date: 2025-05-12
product_area: Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: Apama
ticket: PAM-34572

---

In earlier versions of EPL Apps, using `=` instead of `:=` would result in a warning. This has now been promoted to an error.