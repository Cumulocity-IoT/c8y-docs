---
date: ""
title: SCADA widget enhanced
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
---
The "SCADA" widget has been significantly enhanced. The new version is built on modern web component technology with Lit syntax,
replacing the previous AngularJS-based approach. Key improvements include:

- **AI-assisted SVG generation** — analyzes the selected asset's properties, measurements, alarms, and events to propose visualizations or generate one based on user's instructions, and maps corresponding data to placeholders.
- **Interactive placeholder mapping** — click directly on `text` or `tspan` elements in the widget preview to convert them into dynamic placeholders.
- **Flexible display settings** — control how the SVG fits within the widget, with alignment options.
- **Advanced editor** — for complex visualizations using Lit syntax and direct web component editing.
- **Legacy compatibility** — existing "SCADA" widgets using AngularJS syntax continue to work without any changes.
- **SVG migration guide** — the documentation includes a migration guide for adapting existing SVGs to Lit syntax if you want to reuse them in the new widget.

This enhancement is available as a preview feature. To enable it, open the **Preview features** page from the right drawer and turn on
the corresponding option. For details on new configuration options and SVG with Lit syntax, see [SCADA 
widget](https://cumulocity.com/docs/cockpit/widgets-collection/#scada) in the user documentation.