---
date: ""
title: Enhanced SCADA widgets now show correct data in copied dashboards
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66272
version: 1024.18.6
---
When a dashboard containing the enhanced ["SCADA" widget](/cockpit/widgets-collection/#scada) was copied and pasted onto another device or asset, the asset references in the widget's placeholder mappings still pointed to the original object, so the pasted widget kept displaying data from the source device. These references are now remapped to the target device, and the copied dashboard shows the correct data.

**For widget developers:** until now, only a fixed set of widget configuration properties, such as `device`, `deviceIds` and the various data point properties, was rebound on paste. Widget definitions can now implement an optional `paste(config, newContext, oldContext)` hook, following the same convention as the existing `export` and `import` hooks, to adapt their own configuration to the new context. A widget that implements the hook takes over the whole adaptation, so every reference, including `device`, must be rebound there; widgets without the hook keep the previous behavior. The hook is listed with the other widget definition options in the [widget guide](https://cumulocity.com/codex/common-tasks/widget-guide/overview).
