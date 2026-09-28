---
weight: 10
title: Widgets in dashboards and reports
layout: bundle
sector:
  - app_enablement
---

Widgets can display maps, images, graphs, tables and other graphic representations of data. Widgets are useful to track information, for example on alarms, assets or applications, or provide maps, quick links and more in dashboards or reports.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

- To view widgets within dashboards: READ permission for permission type "Inventory" or READ permission for "Inventory" in the inventory roles
- To edit a widget: ADMIN permission for permission type "Inventory" or CHANGE permission for "Inventory" in the inventory roles
- To create a widget: ADMIN permission for permission type "Inventory" or CHANGE permission for "Inventory" in the inventory roles
- To delete a widget: ADMIN permission for permission type "Inventory" or CHANGE permission for "Inventory" in the inventory roles

Some of the widget require additional permissions in order to visualize the data which they display. For example, the alarms widget requires READ permission for permission type "Alarms" in order to view all alarms.
{{< /c8y-admon-req >}}

{{< product-c8y-iot >}} provides preset widget types, for details see the [Widgets collection](/cockpit/widgets-collection/).

### To add a widget to a dashboard or a report {#to-add-a-widget-to-a-dashboard-or-a-report}

1. Widgets can only be added if the dashboard/report is in edit mode. Click **Edit widgets** in the top menu bar to enter edit mode.

2. Click **Add widget** in the top menu bar or click the **Add widget** button on the main page (only available in case of an empty dashboard/report).

3. In the **Add widget** dialog, select a widget type.

4. Next, configure the widget. According to the selected widget type, different parameters may be specified under **Configuration**. For details on each widget type refer to [Widgets collection](/cockpit/widgets-collection/).

5. In the **Appearence** tab, you can customize the content and header style for the widget individually, in the same way as specifying the layout of a [dashboard](/cockpit/working-with-dashboards/#to-create-a-dashboard).

{{< c8y-admon-info >}}

The header styles "Regular" and "Border" can be used for all widgets while the header styles "Overlay" and "Hidden" remove the header and should only be used for widgets which benefit from a full-screen experience, for example "Image" or "Map". For other widgets, like "Alarms list" or "Data point table", these header styles should not be used.

{{< /c8y-admon-info >}}

6.  Click **Save** to add the widget to the dashboard or report.
