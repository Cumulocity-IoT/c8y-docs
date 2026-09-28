---
date: '2025-07-17'
title: Python plug-ins can be run without sub-interpreters or with dedicated GILs
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
version: 26.148.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---

EPL plug-ins written in Python now have configurable isolation modes. This allows a plug-in to be loaded to use the main interpreter rather than a sub-interpreter, which is required for certain common third-party libraries that don't support sub-interpreters, such as numpy. You can also run plug-ins with even more isolation, and use a separate Global Interpreter Lock (GIL) to the parent interpreter. This means that two different plug-ins can be executed in parallel. 

Additional information can be seen in the corresponding [Apama change log](https://cumulocity.com/apama/docs/latest/change-logs/#26.x/python-interpreters).

