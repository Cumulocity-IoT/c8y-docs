---
date: '2026-11-09'
title: >-
  Allowing forward scrolling in the data graph and data explorer time range
  slider
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
ticket: MTM-67464
version: 1024.23.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-11-09'
  - label: apj.cumulocity.com
    date: '2026-11-06'
  - label: jp.cumulocity.com
    date: '2026-11-06'
  - label: us.cumulocity.com
    date: '2026-11-09'
  - label: cumulocity.com
    date: '2026-11-09'
---
The time range slider in the data explorer and the "Data graph" widget now scrolls forward past the selected end date, up to the current time. "Load more" works at both ends of the slider. This change requires no configuration. Existing dashboards and applications keep their current settings and continue to work without changes.
