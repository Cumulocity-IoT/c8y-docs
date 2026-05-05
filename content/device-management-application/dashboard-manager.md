---
weight: 35
title: Dashboard manager
layout: bundle
sector:
  - device_management
---

{{< c8y-admon-preview >}}
This feature is in Public Preview and is subject to change in the future.
{{< /c8y-admon-preview >}}


The dashboard manager in the Device Management application brings more flexibility, consistency, and control over device dashboards.

You can create template dashboards that automatically apply to devices of the same type, ensuring consistent views across your environment. The dashboard manager makes it simple to organize dashboards in one place, while support for multiple dashboards per device gives you the freedom to tailor different perspectives for different use cases. You can also name dashboards in ways that match your workflows, so finding the right view is effortless.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

- To view dashboards: READ permission for permission type "Inventory" or READ permission for "Inventory" in inventory roles
- To edit widgets within a dashboard: ADMIN permission for permission type "Inventory" or CHANGE permission for "Inventory" in inventory roles
- To create a dashboard: CREATE or ADMIN permission for permission type "Inventory" or CHANGE permission for "Inventory" in inventory roles
- To delete a dashboard: ADMIN permission for permission type "Inventory" or CHANGE permission for "Inventory" in inventory roles
- To share/copy a dashboard: CREATE permission for permission type "Inventory" or CHANGE permission for "Inventory" in inventory roles
{{< /c8y-admon-req >}}

Here are a few advantages:

* Type-based dashboard templates

  Build once, apply everywhere. Create dashboards that automatically apply to devices of the same type, saving time and ensuring consistency.
---
* Multiple dashboards per device

  Add as many dashboards as you need to a single device — tailor views for different use cases.
---
* Custom dashboard names

  Label dashboards with meaningful names so your teams can quickly find the views they need.

{{< c8y-admon-info >}}
Dashboards are application-specific. A dashboard created within Device Management is unique to that specific instance. It does not appear in other applications like Cockpit or in renamed, duplicated versions of the Device Management application.
{{< /c8y-admon-info >}}

### To add device or type-based dashboards {#device-management-device-or-type-dashboards}

{{< c8y-admon-info >}}
With the rollout of the dashboard manager, the default Info dashboard is deprecated and can no longer be edited. Your new custom dashboard will replace the Info dashboard and become the primary view for your device.
{{< /c8y-admon-info >}}

To add a new dashboard for a device, click **Add dashboard** in the device's navigator.

To share a dashboard with devices of the same type, enable the template option for the dashboard. Template dashboards become available to all devices with the same type. These shared dashboards are marked with a "T" icon, making them easy to distinguish from device-specific views.

Refer to [To create a dashboard](/cockpit/working-with-dashboards/#to-create-a-dashboard) and [Dashboard template](/cockpit/working-with-dashboards/#dashboard-template) for more information.

### Dashboard manager {#device-management-dashboard-manager}

To view, edit or delete dashboard templates created across the Device Management application, click **Dashboard manager** in the **Management** menu of the navigator.

### To delete type-based dashboard {#device-management-to-delete-type-dashboard}

To delete a device type-based dashboard, navigate to a device that has that type or to the **Dashboard manager** in the **Management** menu. In the row of the selected dashboard, click the delete icon <i class="dlt-c8y-icon-editing-trash text-danger icon-20"></i> on the right.

{{< c8y-admon-info >}}
If you delete a device type-based dashboard, it gets deleted from all devices that have access to it.
{{< /c8y-admon-info >}}

### To edit type-based dashboard {#device-management-to-edit-type-dashboard}

Click the edit icon <i class="dlt-c8y-icon-edit1 text-primary icon-20"></i> on the corresponding row to open a list of all devices that have access to the dashboard.
In the "Select dashboard instance to edit" dialog, select the desired device and click the open icon <i class="dlt-c8y-icon-file-create text-primary icon-20"></i> on the right to navigate to the dashboard assigned to this device. Now you can edit the dashboard settings or widgets. See [To edit a dashboard](/cockpit/working-with-dashboards/#to-edit-a-dashboard) for more detailed information.
