---
date: '2026-03-31'
title: New datapoint export component
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
ticket: MTM-60214
version: 1021.14.0
---
To enable users to easily export datapoints from {{< product-c8y-iot >}}, a new generic datapoint export selector has been implemented. This new component allows users to select the time range, export type, aggregation (based on the export type) and file format for the datapoint export. Depending on the size of the datapoint records to be exported, the exported file is then generated and downloaded directly or emailed when ready. The datapoint export component makes it much simpler for users to get the device data they need out of {{< product-c8y-iot >}} in their desired format.
