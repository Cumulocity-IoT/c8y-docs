---
weight: 70
title: Dashboard manager
layout: bundle
outputs:
  - html
  - json
sector:
  - app_enablement
helpcontent:
  - label: dashboard-manager
    title: Dashboard manager
    content: "This dashboard manager shows a list of device type dashboards by aggregating all dashboards that have a device type assigned. 


Dashboards can be deleted via the list. Moreover, you can view all devices that have access to a particular dashboard. Dashboards can be edited by navigating to the device view."
---

The dashboard manager shows a list of device type dashboards by aggregating all dashboards that have a device type assigned.
It also provides information about the number of devices that have access to a particular dashboard, date of creation and last modification date.

To open the dashboard manager, click **Dashboard manager** in the **Configuration** menu of the navigator.

<img src="/images/users-guide/cockpit/dashboard-manager.png" name="Dashboard manager"/>


### To add a type dashboard {#to-add-type-dashboard}

To add a new dashboard for a device type select the device from the device list in the **Groups** menu. Refer to [To create a dashboard](/cockpit/working-with-dashboards/#to-create-a-dashboard) and [Dashboard template](/cockpit/working-with-dashboards/#dashboard-template) for more information.

### To delete type dashboard {#to-delete-type-dashboard}

To delete a device type dashboard, navigate to the device list in the **Groups** menu or to the **Dashboard manager** in the **Configuration menu**. In the row of the selected dashboard, click the delete icon <i class="dlt-c8y-icon-editing-trash text-danger icon-20"></i> on the right.

{{< c8y-admon-info >}}
If you delete a device type dashboard, it gets deleted from all devices that have access to it. It is not possible to delete a device type dashboard from a single device.
{{< /c8y-admon-info >}}

### To edit type dashboard {#to-edit-type-dashboard}

Click the edit icon <i class="dlt-c8y-icon-edit1 text-primary icon-20"></i> on the corresponding row to open list with all devices that has access to the dashboard.
In the **Select dashboard instance to edit** dialog window, select the desired device and click the open instance icon <i class="dlt-c8y-icon-file-create text-primary icon-20"></i> on the right to navigate to dashboard assigned to this device. Now you can edit the dashboard settings or widgets. See [To edit a dashboard](/cockpit/working-with-dashboards/#to-edit-a-dashboard) for more detailed information.
