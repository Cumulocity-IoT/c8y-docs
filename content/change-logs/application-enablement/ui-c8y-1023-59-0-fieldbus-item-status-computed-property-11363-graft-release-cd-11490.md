---
date: '2026-03-12'
title: Added new computed property - Fieldbus item status
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66171
version: 1023.59.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-03-12'
  - label: apj.cumulocity.com
    date: '2026-03-13'
  - label: jp.cumulocity.com
    date: '2026-03-13'
  - label: emea.cumulocity.com
    date: '2026-03-16'
  - label: us.cumulocity.com
    date: '2026-03-16'
  - label: cumulocity.com
    date: '2026-03-16'
---
This change introduces a new "Fieldbus item status" computed property with the following configuration options:

- **Fieldbus item**: Select a coil or register from the device protocol associated with a device.
- **Result type**: Select whether to display the raw value or a transformed value using enum values defined in the item's settings.

The new computed property makes it possible to display the status of Fieldbus items (including their enum values) in widgets such as the "Asset table". This functionality will be progressively made available in other widgets, too.
