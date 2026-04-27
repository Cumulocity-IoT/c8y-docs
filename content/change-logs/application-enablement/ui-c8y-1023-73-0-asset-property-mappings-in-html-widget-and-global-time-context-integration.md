---
date: '2026-04-24'
title: Asset property mappings and time context integration in HTML widget
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66200
version: 1023.73.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-04-24'
  - label: apj.cumulocity.com
    date: '2026-04-27'
  - label: jp.cumulocity.com
    date: '2026-04-27'
---
The "HTML" widget has been enhanced with the following features:

- **Asset properties configuration**: Instead of a read-only list of properties from the currently selected asset, you can now browse and assign properties (asset, custom, and computed ones) to named keys - sourced not only from the main selected asset but also from its descendants. These keys can then be inserted into the HTML code editor as expressions.
- **Time context integration**: The widget can now be controlled by the dashboard's global time context settings or by widget's local settings; both the `c8yContext` object and the new `c8yProperties` object update automatically when the auto-refresh mode is enabled.

For details, refer to the [HTML widget documentation](/cockpit/widgets-collection/#html).
