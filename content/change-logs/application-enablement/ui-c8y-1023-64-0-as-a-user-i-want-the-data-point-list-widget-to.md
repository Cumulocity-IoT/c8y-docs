---
date: '2026-03-30'
title: Enhanced Data point list widget
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
ticket: MTM-65026
version: 1023.64.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-03-30'
  - label: apj.cumulocity.com
    date: '2026-04-01'
  - label: jp.cumulocity.com
    date: '2026-04-01'
  - label: emea.cumulocity.com
    date: '2026-04-02'
  - label: us.cumulocity.com
    date: '2026-04-02'
  - label: cumulocity.com
    date: '2026-04-02'
---
The "Data point list" widget has been migrated to Angular and enhanced to improve usability and performance, providing a modern, consistent foundation with the current UI framework. Updates include:

- **Decimal place configuration**: Specify decimal places for numerical values, with a default of 2 to align with other {{< product-c8y-iot >}} IoT widgets.
- **Global time context integration**: The widget now responds to dashboard time context changes, automatically updating to show the last measurement value for the selected time range.
- **Asset icon display**: Asset icons are now shown alongside asset names for easier visual identification.
- **Export capabilities**: Export displayed data in CSV and XLSX formats for external use.
- **Field arrangement**: Customize the display order of fields within the widget.
- **Performance optimization**: Improved rendering performance through virtual scrolling — only visible rows are rendered, ensuring smooth operation even with large datasets.
