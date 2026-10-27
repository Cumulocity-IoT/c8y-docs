---
date: ""
title: Data point selector now finds data points by their translated label
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
ticket: MTM-68095
version: 1024.22.2
---
In the data point selector, the **Available data points** search and the **Data point template** field matched only the original labels of data points and data point templates. If a label had a translation registered under **Administration** > [**Localization**](/standard-tenant/changing-settings/#localization), searching for the translated label returned no results. Both searches now also match translated labels. Original labels still match, and the **Available data points** search still matches fragment and series. The "No match found." hint below the **Data point template** field now appears only when no template matches.