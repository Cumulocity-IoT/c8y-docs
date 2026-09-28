---
date: '2026-06-23'
title: Added compact mode for dynamic chart legend
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
ticket: MTM-66511
version: 1023.88.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-06-23'
  - label: apj.cumulocity.com
    date: '2026-06-24'
  - label: jp.cumulocity.com
    date: '2026-06-24'
  - label: us.cumulocity.com
    date: '2026-06-24'
  - label: cumulocity.com
    date: '2026-06-24'
---
When viewing dynamic charts with numerous data series, the hover tooltip can become large and consume significant screen space, occasionally obstructing the chart data itself. To address this, a new compact mode has been introduced for tooltips in both the "Data graph" widget and the data explorer.

This compact mode is automatically activated whenever a tooltip contains more than 5 data points. By reducing the visual footprint of the tooltip in high-density charts, this update ensures you can view more of your actual chart content while still maintaining full access to all relevant data point details.
