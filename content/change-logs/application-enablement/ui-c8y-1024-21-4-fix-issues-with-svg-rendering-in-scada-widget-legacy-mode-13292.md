---
date: '2026-10-23'
title: >-
  Fixed rendering issues in SCADA widgets created with the previous widget
  version
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-67868
version: 1024.21.4
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-10-23'
  - label: apj.cumulocity.com
    date: '2026-10-26'
  - label: jp.cumulocity.com
    date: '2026-10-26'
---
With the **SCADA widget v2** preview feature enabled, some SCADA widgets created with the previous version of the widget did not display correctly. This affected widgets whose SVG shows or hides parts of the drawing depending on a placeholder value, for example with `ng-if="value==0"`. Such parts could appear when they should have been hidden, or the other way round, because:

* A placeholder without a value no longer worked in such conditions as before.
* A placeholder mapped to *Last measurement* returned the value as rounded text, for example `"0.00"`, instead of a number.

These widgets now display as they did in the previous version.

The following issues are also fixed:

* Placeholders mapped to a nested property, for example `c8y_Position.lat`, now show the value.
* Placeholders mapped to *Last measurement* now update as soon as the first measurement of a series arrives. Previously, you had to reload the page.

Additionally, *Last measurement* properties now have a **Format as numeric string** option:

* If selected, the value is rounded to the configured number of decimal places.
* If cleared, the measurement value is shown unchanged. In SCADA widgets, you can use this value directly in conditions and calculations in the SVG.

The option is cleared by default for new *Last measurement* properties, wherever they are used, for example in the asset table. Existing properties keep their formatted value.
