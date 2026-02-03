---
date: '2024-07-25'
title: Cockpit application split into plugins
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
ticket: MTM-60006
version: 1020.7.0
---
The Cockpit application has been split into further plugins. This allows admins to tailor the Cockpit application to their needs without any coding effort. They can now easily remove certain plugins and thus certain features which they do not want to include in their Cockpit application. The following plugins are now available:

- Cockpit widgets: Angular widgets used in the Cockpit application.
- Cockpit alarms: Alarms functionality in the Cockpit application.
- Sensor phone: Wizard for connecting a smartphone to the platform.
- Child devices: List view of children of devices.
- Assets navigator: "Groups" navigation entry, allowing to navigate through an asset hierarchy.
- Data point library: To define certain features of data points.
- Bookmarks: To bookmark views.
- Location: To view location of devices and assets.
- Search: To search for assets.
- Reports: Reports list and report items in the navigator.
