---
date: ""
title: Data point labels, descriptions and units are now translated consistently
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-67109
version: 1024.20.0
---
Translations registered under **Administration** > [**Localization**](/standard-tenant/changing-settings/#localization) for a data point's label, description or unit were applied only in some places, so many views still showed the original text regardless of the user's language. They are now applied wherever a data point's label, description or unit is displayed, in the Data explorer, the data point selector, the Data point library, smart rules, the data point export (preview and exported files) and widgets such as "Data points graph", "Data points list", "Data points table", "KPI", "Pie chart", "Radial gauge", "Linear gauge" and "Silo". Additionally, the "Linear gauge" and "Silo" widgets now show the data point's unit instead of the measurement's unit when the two differ.

To translate a data point's text, register a translation with the `data point label`, `data point description` or `data point unit` context, for example `` Temperature`data point label` ``.