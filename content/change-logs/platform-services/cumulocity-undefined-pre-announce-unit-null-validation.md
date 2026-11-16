---
date: '2025-08-27'
title: Strict validation of unit values in the measurement fragments 
change_type:
  - value: change-inv-3bw8e
    label: Announcement
product_area: Platform services
component:
  - value: component-OG_650_b2
    label: Core platform
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-64519
---
In future releases, the {{< product-c8y-iot >}} platform will strictly validate unit values in measurement fragments.
If a measurement fragment contains a unit value that is null or an empty string, the platform will ignore such unit values and won't persist them. The measurement itself will still be stored, but without the invalid unit.
This change improves data quality and consistency. Review your integrations and make sure that all measurement fragments use valid, non-empty unit values or omit the unit field entirely.