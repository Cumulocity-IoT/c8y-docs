---
date: '2026-08-21'
title: Improved tooltip and popover accessibility guidance
product_area: Application enablement & solutions
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-67538
version: 1024.15.8
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-08-21'
  - label: apj.cumulocity.com
    date: '2026-08-24'
  - label: jp.cumulocity.com
    date: '2026-08-24'
  - label: us.cumulocity.com
    date: '2026-08-25'
  - label: cumulocity.com
    date: '2026-08-25'
---
The Web SDK documentation for [tooltips](https://cumulocity.com/codex/components/data-display-and-visualization/tooltip/overview) and [popovers](https://cumulocity.com/codex/components/data-display-and-visualization/popover/overview) now provides clear guidance on when to use `aria-label` and `aria-describedby`. This replaces the previous unclear guidance that led to inconsistent implementations and poor screen reader experiences, helping developers build accessible components consistently.
