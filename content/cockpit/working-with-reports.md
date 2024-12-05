---
weight: 45
title: Working with reports
layout: bundle
outputs:
  - html
  - json
sector:
  - app_enablement
helpcontent:
  - label: working-with-reports
    title: Working with reports
    content: "Reports enable you to track applications, alarms, assets, and other data by using a set of widgets in a dashboard layout. Widgets can display maps, images, graphs, tables and other graphic representations of data. In contrast to dashboards, reports show global data, regardless of the asset hierarchy.


    On a report dashboard, you can rearrange widgets by drag & drop or resize them using the arrow icon. Click **Add widget** in the top menu bar to add a new widget to the report or use the cogwheel icon to edit or remove widgets.


    Cumulocity includes preset widget types, for example alarm or data point lists, linear or radial gauges. Since each widget type displays different data, different parameters are required to configure it. See *Widgets collection* in the user documentation for details on each widget type and its configuration."
---

Reports enable you to track applications, alarms, assets, and other data in a dashboard layout. Reports are global dashboard pages, regardless of the asset hierarchy.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

- To view reports: READ permission for permission type "Inventory"
- To edit a report: ADMIN permission for permission type "Inventory"
- To add a new report: CREATE permission for permission type "Inventory"
- To delete a report: ADMIN permission for permission type "Inventory"
{{< /c8y-admon-req >}}

### To show all reports {#to-show-all-reports}

To show all reports, click **Reports** in the navigator.

In the **Reports** page you will find a list displaying all reports with their names, an optional description and a navigator toggle.

![Reports](/images/users-guide/cockpit/cockpit-reports-list.png)

To open a report, click on its name in the report list. The report details will be displayed.

Use the toggle in the **Show in navigator** column, if you want to show the report more prominently on the first level in the navigator. If the toggle is turned on, the report will immediately appear in the navigator.

![Report in navigator](/images/users-guide/cockpit/cockpit-reports-navigator.png)

See [To create a report](#to-create-a-report) below for details on how to configure the position in the navigator.

### To create a report {#to-create-a-report}

1. Click **Add report** in the top menu bar to open the **Add report** dialog.
  <br>![Add report](/images/users-guide/cockpit/cockpit-report-add.png)<br>
2. In the **Menu label** field, enter a name for the report and optionally provide a description below.
3. Select **Show in navigator** if you want the report to be displayed in the navigator. Select the position of the report in the navigator. Depending on the value it will be positioned relative to the existing items. If for example "Home" has the value "10000" it will be positioned above "Home", if the value is "10001" or higher.
4. In the **Layout** section you can select a theme for the report (one of "Light", "Dark", "Transparent" or "Branded") and a default header style for the widgets (one of "Regular", "Border", "Overlay", or "Hidden"). Moreover, you can change the default widget margin (default value is 12 px).
If you enable the option **Translate widget titles if possible**, the widget title will be translated every time the language is changed. Note that the widget titles will be translated only if a valid translation is available.
Click **Save** to create the report and add it to the report list.

{{< c8y-admon-info >}}
In the **Preview** section at the right, a preview of the selected layout settings is immediately displayed to visualize your selections.
{{< /c8y-admon-info >}}

Next, widgets can be added to the report.

Refer to [Using widgets in dashboards and reports](/cockpit/using-widgets/) for details on how to add, modify or remove widgets.

### To edit a report {#to-edit-a-report}

Click on a report name in the report list to open its details.

To edit the report, click **Edit** in the top menu bar.

The report editor will open up. For details on the fields, refer to [To create a report](#to-create-a-report).


### To delete a report {#to-delete-a-report}

1. In the **Reports** page, hover over the report item you want to delete and click the remove icon <i class="dlt-c8y-icon-minus-circle text-danger icon-20"></i> showing up at the right.
2. Confirm to delete the report.
