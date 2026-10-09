---
date: ""
title: SCADA and HTML widgets on template dashboards now show data of the viewed device
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
ticket: MTM-67837
version: 1024.20.3
---
With the **SCADA widget v2** preview feature enabled, SCADA and HTML widgets on template dashboards showed the values of the device that last saved the template, instead of the device being viewed. This affected SCADA widgets created with either version of the widget, including placeholders mapped to properties such as *Last measurement*. These widgets now display the data of the device for which the dashboard is opened.

**For Web SDK developers**

Widget definitions can now implement a new optional `applyContext(config, context)` hook. It is called when a template dashboard is displayed for a device or asset, and lets the widget rebind every asset reference stored in its configuration to the viewed context. Implementing `applyContext` turns off the default replacement of `device` and `__target` for that widget, so the hook must rebind all references, including `device`. Use `bindAssetReferenceToContext` from `@c8y/ngx-components/context-dashboard` for that. If the hook throws an error, the default replacement is applied instead. Widgets that store asset references in other properties should implement both `applyContext` and the existing `paste` hook, as they cover different scenarios. Both hooks are listed with the other widget definition options in the [widget development documentation](https://cumulocity.com/codex/common-tasks/widget-guide/overview).
