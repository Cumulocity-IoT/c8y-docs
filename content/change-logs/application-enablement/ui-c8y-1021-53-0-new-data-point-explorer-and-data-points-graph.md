---
date: '2025-03-27'
title: Enhanced data point explorer and data point graph widgets
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-61539
version: 1021.53.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
To enhance data analysis and visualization within the {{< product-c8y-iot >}} platform, the data point explorer and data point graph have been upgraded with new capabilities and a modernized architecture. Both features have been migrated from AngularJS to Angular, bringing improved performance, a refreshed interface, and expanded configuration options. Initially, these features will not be included by default and can only be installed as additional plugins. To install them, navigate to your custom application, click **Install plugins**, and search for "Data point explorer" and "Data point graph".

### Data point explorer

The data point explorer now includes a workspace implementation, allowing users to create and manage multiple workspaces for organizing their data analysis. These workspaces are stored locally and can also be shared, enabling seamless collaboration across teams. Additionally, an improved browsing and search experience makes it easier to locate specific data points across connected devices.

### Data point graph

The data point graph now provides a more interactive and dynamic visualization of data points over time, helping users identify trends, patterns, and anomalies with greater ease. Key improvements include:

- A dashboard-linked time slider that adjusts the time range across the entire dashboard when the widget is connected to the global time context, enabling synchronized data views across multiple widgets.
- Simple click-to-toggle visibility controls for data points, alarms, and events.
+- New configuration options to control alarm icon visibility, overlay multiple measurements on a single graph axis, and customize graph styling options.

These enhancements offer a more intuitive and powerful way to explore IoT data, improving efficiency and collaboration for users managing their deployments within {{< product-c8y-iot >}}.
