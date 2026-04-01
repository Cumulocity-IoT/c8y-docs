---
date: ""
title: "Multitenant sharing mode controls for asset and property definitions."
product_area: "Application enablement & solutions"
change_type:
    - value: "change-QHu1GdukP"
      label: "Feature"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-2810"
version: "1025.0.0"
---
In enterprise-subtenant setups, the Digital Twin Manager previously
lacked controls to reflect the active multitenant sharing configuration.
This meant subtenants could attempt to create or modify definitions
regardless of the sharing mode configured at the enterprise tenant
level.

The Add asset definition and Add property definition buttons are now
disabled when the definitions.multitenant.sharing.mode tenant option is
set to enabled. Hovering over either button displays a tooltip
explaining why the action is not allowed. When the mode is set to
invalid, the buttons are also disabled and a tooltip indicates that the
sharing mode setting is invalid. When the mode is disabled, both buttons
are enabled and standard permission checks apply. Users will see an info
message on the definition view page indicating that the definition is
shared from the enterprise/management tenant.

These changes affect users working in subtenants of an enterprise setup.