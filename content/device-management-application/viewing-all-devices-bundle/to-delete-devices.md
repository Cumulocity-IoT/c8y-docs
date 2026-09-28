---
weight: 30
title: To delete a device from the list
layout: redirect
---

1. Hover over the row of the device you want to delete.
2. Click the delete icon <i class="dlt-c8y-icon-editing-trash text-danger icon-20"></i> at the right of the row.
3. Confirm the device removal. Optionally, select whether to delete child devices of the device or to delete the associated device owner. Note that it is not possible to select both options.

The device will be permanently deleted from the platform.

{{< c8y-admon-important >}}
Deleting a device means to remove the device from the {{< product-c8y-iot >}} database including all its generated data. Alternatively, you can arrange all retired devices in one group, see [Grouping devices](/device-management-application/grouping-devices)). This ensures that all reports remain correct. To prevent alarms from being raised for the retired devices, disable [connection monitoring](/device-management-application/monitoring-and-controlling-devices/#connection-monitoring). Deleting a device does not delete the data of its child devices.
{{< /c8y-admon-important >}}
