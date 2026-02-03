---
date: 2025-04-16
title: Deprecation of loadConfigComponent in favor of new multi-section configuration
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
ticket: MTM-63358
version: 1022.0.0
---
**What changes?**

{{< product-c8y-iot >}} introduces a new hookable multi-section concept for the widget configuration, and as a result, the `loadConfigComponent` method of the widgetHook is deprecated.

**How does this change impact you?**

Widget developers should start using the `hookWidgetSection` hook to add configuration to their own or existing widgets. This new approach supports multiple configuration sections to be displayed, offering greater flexibility and organization of widget settings.

**Backward compatibility**

The `loadConfigComponent` method continues to work in short term and will add a section named "Settings", but it will be removed in an upcoming major release. We recommend migrating to the new approach as soon as possible.