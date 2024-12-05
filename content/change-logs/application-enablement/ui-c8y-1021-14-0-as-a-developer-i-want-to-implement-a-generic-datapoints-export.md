---
date: ""
title: As a developer, I want to implement a generic datapoints export component (#7129) [GRAFT][release/cd]  (#7721)
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
To allow users to easily export datapoints from Cumulocity IoT, a new generic datapoint export component has been implemented. This component allows users to select the time range, export type, aggregation (based on the export type) and file format for the datapoints export. Depending on the size of the datapoints records to be exported, the exported file is then generated and downloaded directly or emailed when ready.  This new component makes it much simpler for users to get the device data they need out of Cumulocity IoT in their desired format.