---
title: Working with dashboards
layout: bundle
outputs:
  - html
  - json
section:
  - app_enablement
weight: 40
helpcontent:
  - label: working-with-dashboards
    title: Working with Dashboards
    content: "Dashboards let you visualize your data by using a set of widgets. Widgets can display maps, images, graphs, tables, and other graphic representations of data.


    Click the plus icon next to the dashboard tabs to add a dashboard. You may copy a dashboard from one device to another or you may share a dashboard with all devices of a specific device type.


    The dashboard is locked until eidt mode is enabled. To do so click on **Edit widgets** on the top menu bar. On a dashboard, you can rearrange widgets by drag & drop or resize them using the arrow icon. Click **Add widget** in the top menu bar to add a new widget to the dashboard or use the cogwheel icon to edit or remove widgets.


    Cumulocity IoT includes preset widget types, for example alarm or data point lists, linear or radial gauges. Since each widget type displays different data, different parameters are required to configure it. See *Widgets collection* in the user documentation for details on each widget type and its configuration."
---

{{< product-c8y-iot >}} allows you to create individualized dashboards for all your groups and devices.
Dashboards provide you with a customized visualization of your data, for example, alarms and events, and allow you to trigger remote actions, by using a set of widgets. Widgets can display maps, images, graphs, tables, and other graphic representations of data.

{{< product-c8y-iot >}} comes with a number of preset widgets, see [Widgets collection](/cockpit/widgets-collection/) for details.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

- To view dashboards: READ permission for permission type "Inventory" or READ permission for "Inventory" in inventory roles
- To edit widgets within a dashboard: ADMIN permission for permission type "Inventory" or CHANGE permission for "Inventory" in inventory roles
- To create a dashboard: CREATE or ADMIN permission for permission type "Inventory" or CHANGE permission for "Inventory" in inventory roles
- To delete a dashboard: ADMIN permission for permission type "Inventory" or CHANGE permission for "Inventory" in inventory roles
- To share/copy a dashboard: CREATE permission for permission type "Inventory" or CHANGE permission for "Inventory" in inventory roles
{{< /c8y-admon-req >}}

{{< c8y-admon-related >}}
- [Web SDK > Tutorials > Add a custom widget to a dashboard](/web/tutorials/#add-a-custom-widget) to learn how to develop your own widgets and add them to your {{< product-c8y-iot >}} account.
- [Web SDK > Application configuration](/web/application-configuration/) for further information on how to customize the {{< product-c8y-iot >}} environment.
{{< /c8y-admon-related >}}

### To create a dashboard {#to-create-a-dashboard}

To create your individualized dashboard, execute the following steps:

1. In the **Groups** menu select the group or the device in the navigator for which to create a dashboard.
2. Click "Add dashboard" button right from the tabs to open the dashboard editor.

3. In the **General** tab of the dashboard editor, provide the following information:

    * An icon which is shown next to the dashboard name in the navigator.
    * A menu label to be used as the name of the dashboard.
    * Description of the dashboard.
    * The location of the dashboard in the navigator, with "5000" being ordered first and "-5000" last.
<br><br>

4. In the **Availability** section, specify which users have access to the dashboard based on global roles. By default, all available global roles are selected, which means that a user with at least one such role has access to the dashboard.

   {{< c8y-admon-info >}}
- Dashboard are always visible to its owner and to users with ADMIN permission for the permission type "Inventory".
- This functionality is entirely based on client-side solutions. If users have an accurate link to the dashboard, they will still be able to access it.
    {{< /c8y-admon-info >}}

5. Enable the option **Dashboard template** to share the dashboard with all devices of this type. Option available for devices dashboards only.

6. In the **Appearance** tab you can select a theme for the dashboard (one of "Match UI", "Light", "Dark" or "Branded") and a default header style for the widgets (one of "Regular", "Border", "Overlay", or "Hidden"). Moreover, you can change the default widget margin (default value is 12 px).
7. Enable the option **Translate widget titles if possible**, to have the widget title translated every time the language is changed.

    {{< c8y-admon-info >}}
The widget titles will be translated only if a valid translation is available.
    {{< /c8y-admon-info >}}
8. User provided changes will be immediately displayed to visualize your selections in the dashboard below Dashboard settings.

9. Click **Save** to create and open the dashboard.

<br>Next, widgets can be added to the dashboard. They allow you to display more detailed data in your dashboard.

Refer to [Using widgets in dashboards and reports](/cockpit/using-widgets/) for details on how to add, modify or remove widgets.

### Dashboard template {#to-share-a-dashboard}

You can create a dashboard for a specific device and share it with all devices of the same type. This is only possible though, if the type property is set for the device.

To do so, enable **Dashboard template** option. A corresponding message will be displayed in the editor.
After enabling it, you can see how many devices will share this dashboard. There is also a possibility to duplicate type dashboard as regular one (assigned to current device only).

<img src="/images/users-guide/cockpit/cockpit-dashboard-share.png" name="Shared dashboard"/>

Dashboard with Dashboard template option enabled can be accessed and modified from all devices of this type. 
Therefore, changes made to this dashboard are automatically applied to all dashboard instances, no matter which device view user is currently on.

{{< c8y-admon-info >}}
You can only add widgets and data to the dashboard for the device itself. It is not possible to add data from child devices because the structure of these devices might be different from device to device.
{{< /c8y-admon-info >}}

### Dashboard time range {#global-time-context}

In the widget configuration, you can specify a dashboard time range for your dashboards. When using a dashboard time range, all data in a dashboard will be aligned to this range. After setting the dashboard time range in a first widget, this shared context can then be used by other widgets that are configured to use the dashboard date context.

The dashboard time range can be set to any time span, depending on the monitoring needs, by using a custom date picker. The time range is displayed at the top of the dashboard, so you can immediately see the context for which the data is presented. Additionally, you can share dashboards with a specific time context by including the time context parameters in a URL. URL parameters will be set automatically when users set the dashboard time context with the picker.

{{< c8y-admon-info >}}
This feature is currently available for the following widgets: Event list, Data points graph, Data points table, Map.
{{< /c8y-admon-info >}}

<img src="/images/users-guide/cockpit/cockpit-dashboard-global-time.png" name="Global time context"/>

Widgets synchronized with the dashboard time range are indicated by a respective icon at the top right of the widget.

### To edit a dashboard {#to-edit-a-dashboard}

There are two primary ways to edit a dashboard:

- **Dashboard settings**: This modifies the overall properties of the dashboard, such as its name, description, position, availability, or appearance.
- **Edit widgets**: This manages the content of the dashboard, including adding, removing, or changing the position of widgets.

Once in edit mode, the redo and undo functionality is automatically enabled. This allows you to easily revert any unwanted changes you make to the dashboard. Any changes made to the dashboard in "Edit widgets" mode will not be reflected until you save them.

{{< c8y-admon-info >}}
The widgets and content on the dashboard are locked in order to prevent accidental modifications. Clicking the "Edit widgets" button unlocks this functionality and allows you to manipulate the dashboard's content.
{{< /c8y-admon-info >}}

### To restore a dashboard state {#to-restore-a-dashboard}

It is possible to restore your dashboard to a previous state using the version history. Navigate to the dashboard settings and open the "Version history" tab. This section will display a list of previous versions of your dashboard, including timestamps for each version. Hovering over a desired version from the list will reveal the "Restore" button.

When a new version is created in the version history, it includes a brief description of the changes made. New version is added each time after saving the dashboard when in edit mode or when editing the general settings of the dashboard.

<img src="/images/users-guide/cockpit/cockpit-dashboard-restore.png" name="Restore dashboard state"/>

### To copy a dashboard from one object to another {#to-copy-a-dashboard-from-one-object-to-another}

1. Click **More...** in the top menu bar and from the context menu select **Copy dashboard**.

2. Next, navigate to the object you want to copy the dashboard to and from the context menu select **Paste dashboard [NAME]** to insert the dashboard.

An alternative way to copy a dashboard is to use the
"dashboard per type" approach.  With the "dashboard per type" approach you share the dashboard from one object with **all** objects of the same type, see [To share a dashboard](#to-share-a-dashboard).

### To delete a dashboard {#to-delete-a-dashboard}

To delete a dashboard from an object, click **More...** in the top menu bar and from the context menu select **Delete dashboard**.