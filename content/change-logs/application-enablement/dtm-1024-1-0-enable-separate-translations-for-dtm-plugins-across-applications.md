---
date: '2026-02-19'
title: Enabled separate translations for DTM plugins across applications
product_area: Application enablement & solutions
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-2697
version: 1024.1.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-19'
  - label: apj.cumulocity.com
    date: '2026-02-25'
  - label: jp.cumulocity.com
    date: '2026-02-25'
  - label: emea.cumulocity.com
    date: '2026-03-02'
  - label: us.cumulocity.com
    date: '2026-03-02'
  - label: cumulocity.com
    date: '2026-03-03'
---
Previously, when Digital Twin Manager (DTM) plugins were integrated with other applications,
the same translations were shared, with no way to differentiate between
DTM specific-text and other application text. Now, users can define and
use separate translations for DTM plugins, allowing DTM and other
applications to have their own distinct translations.
