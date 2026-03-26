---
date: ""
title: Data Point List widget improvements
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
---
The Data Point List widget has been enhanced with the following improvements:

- Decimal place configuration: Specify decimal places for numerical values, with a default of 2 to align with other Cumulocity IoT widgets.
- Global time context integration: The widget now responds to dashboard time context changes, automatically updating to show the last measurement value for the selected time range.
- Asset icon display: Asset icons are now shown alongside asset names for easier visual identification.
- Export capabilities: Export displayed data in CSV and XLSX formats for external use.
- Field arrangement: Customize the display order of fields within the widget.
- Performance optimization: Improved rendering performance through virtual scrolling — only visible rows are rendered, ensuring smooth operation even with large datasets.