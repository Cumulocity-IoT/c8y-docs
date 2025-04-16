---
date: 2025-04-16
title: Deprecating loadConfigComponent for widget configurations
product_area: Application enablement & solutions
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-57553
version: 1019.22.3
---
As we are introducing a hookable multi-section concept for widget configuration we have deprecated the `loadConfigComponent` of the `widgetHook`. As a widget developer you should use the `hookWidgetSection` hook to add configuration to your or even existing widgets, it supports multiple configurations to be displayed. The `loadConfigComponent` will continue working and add a section named "Settings" but will be removed in one of the upcoming major releases.
