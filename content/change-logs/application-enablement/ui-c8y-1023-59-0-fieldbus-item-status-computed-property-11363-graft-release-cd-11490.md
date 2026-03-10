---
date: ""
title: New computed property - Fieldbus item status
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
---
This change introduces a new "Fieldbus item status" computed property that enables the following capabilities:

- **Select a coil or register**: Choose from the device protocol associated with a device
- **Choose value display format**: Decide whether to display the raw value or a transformed value using enum values defined in the coil or register's settings

The new computed property makes it possible to display the status of Fieldbus items (including their enum values) in widgets such as the "Asset table". This functionality will be progressively made available in other widgets too.