---
date: '2026-02-11'
title: 'Fixed HTML widget export, import, and schema definition'
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-65612
version: 1023.32.1
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-11'
  - label: apj.cumulocity.com
    date: '2026-02-12'
  - label: jp.cumulocity.com
    date: '2026-02-12'
  - label: emea.cumulocity.com
    date: '2026-02-13'
  - label: us.cumulocity.com
    date: '2026-02-13'
  - label: cumulocity.com
    date: '2026-02-13'
---
The export, import, and schema properties for the HTML widget were defined in the wrong location, causing validation errors in the **Import/Export** tab of the dashboard settings. These properties have been moved to the correct location under the data key, consistent with other widgets. Moreover, the `HtmlWidgetConfig` interface was updated to make device and settings optional, as HTML widgets can be created without a device.
