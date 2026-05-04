---
weight: 35
title: Dashboard manager
layout: bundle
sector:
  - device_management
---

{{< c8y-admon-preview >}}
This feature is in Public Preview and may be subject to change in the future.
{{< /c8y-admon-preview >}}


The Dashboard manager in Device management brings more flexibility, consistency, and control over device dashboards.

You can create template dashboards that automatically apply to devices of the same type, ensuring consistent views across your environment. The Dashboard Manager makes it simple to organize dashboards in one place, while support for multiple dashboards per device gives you the freedom to tailor different perspectives for different use cases. You can also name dashboards in ways that match your workflows, so finding the right view is effortless.

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

* Multiple dashboards per device

  Add as many dashboards as you need to a single device — tailor views for different use cases.

* Custom dashboard names

  Label dashboards with meaningful names so your teams can quickly find the views they need.

{{< c8y-admon-info >}}
Dashboards are application-specific. A dashboard created within Device Management is unique to that specific instance. It does not appear in other applications like Cockpit or in renamed, duplicated versions of the Device Management application.
{{< /c8y-admon-info >}}

### To add, edit or delete a device or type based dashboards {#device-management-device-or-type-dashboards}

{{< c8y-admon-info >}}
With the rollout of the Dashboard Manager, the default Info dashboard is deprecated and can no longer be edited. Your new custom dashboard will replace the Info dashboard and become the primary view for your device.
{{< /c8y-admon-info >}}

To add a new dashboard for a device, click **Add dashboard** in the device's navigator.

When you enable the template option for the dashboard, the dashboard becomes available to all devices with the same type. These shared dashboards are marked with a "T" icon, making them easy to distinguish from device-specific views.

Start customizing your view by adding widgets as soon as the dashboard is created. You have full control in this view to refine your widgets, update settings, or remove the dashboard entirely.

### Dashboard Manager

To view, edit or delete dashboard templates created across the Device management application, click **Dashboard manager** in the **Management** menu of the navigator.