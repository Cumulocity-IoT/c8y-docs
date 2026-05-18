---
date: '2026-05-14'
title: Strict validation of unit values in measurement fragments is now enforced
change_type:
  - value: change-3BQrQ6adS
    label: API change
product_area: Platform services
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-64519
version: 2026.150.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-05-14'
---
As [announced earlier](/change-logs/?component=.component-OG_650_b2#cumulocity-undefined-pre-announce-unit-null-validation), {{< product-c8y-iot >}} now strictly validates unit values in measurement fragments.

If a measurement fragment contains a unit value that is `null` or an empty string, the platform removes the unit value before persisting the measurement. The measurement itself is still stored, but without the unit.

For example, if you send a measurement with an empty `unit` value:

```json
{
  "c8y_Temperature": {
    "T": {
      "value": 22.5,
      "unit": ""
    }
  }
}
```

The platform stores the measurement, but the `unit` field is not persisted and is missing in the API response. To retain the unit in the stored measurement, send a valid, non-empty value:

```json
{
  "c8y_Temperature": {
    "T": {
      "value": 22.5,
      "unit": "°C"
    }
  }
}
```

This change improves data quality and consistency across the platform.

