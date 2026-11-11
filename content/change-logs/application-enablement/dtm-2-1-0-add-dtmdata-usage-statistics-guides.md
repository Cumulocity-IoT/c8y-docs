---
date: ""
title: "DTM Data Service usage per tenant"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-2c7RdTdXo4"
      label: "Improvement"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-3272"
version: "2.1.0"
---
Users of the management tenant can now see how many measurements the DTM Data Service received, created, and reprocessed for each tenant, and whether the created measurements were stored or only forwarded. Run `c8y dtm statistics dtmdata` from the [c8y-dtm extension](https://github.com/Cumulocity-IoT/c8y-dtm) for go-c8y-cli. The user needs the roles `ROLE_MEASUREMENT_READ` and `ROLE_INVENTORY_READ`.
