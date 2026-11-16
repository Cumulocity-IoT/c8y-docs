---
date: '2026-07-13'
title: Enhanced SCADA widget
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
ticket: MTM-61471
version: 1023.94.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-07-13'
  - label: apj.cumulocity.com
    date: '2026-07-13'
  - label: jp.cumulocity.com
    date: '2026-07-13'
  - label: us.cumulocity.com
    date: '2026-07-10'
  - label: cumulocity.com
    date: '2026-07-10'
---
The "SCADA" widget has been significantly enhanced. The new version is built on modern web component technology with Lit syntax,
replacing the previous AngularJS-based approach. Key improvements include:

- **AI-assisted SVG generation** — analyzes the selected asset's properties, measurements, alarms, and events to propose visualizations or generate one based on user's instructions, and maps corresponding data to placeholders.
- **Interactive placeholder mapping** — click directly on `text` or `tspan` elements in the widget preview to convert them into dynamic placeholders.
- **Flexible display settings** — control how the SVG fits within the widget, with alignment options.
- **Advanced editor** — for complex visualizations using Lit syntax and direct web component editing without a need to switch to an external editor.

This enhancement is available as a preview feature. To enable it, open the **Preview features** page from the right drawer and turn on
the corresponding option. For details on new configuration options and SVG with Lit syntax, see [SCADA 
widget](/cockpit/widgets-collection/#scada) in the user documentation.

Existing "SCADA" widgets using AngularJS syntax continue to work without any changes in the legacy mode. If you want to reuse existing SVGs in the new
  widgets, the documentation includes migration instructions for adapting them to Lit syntax.
