---
weight: 36
title: Manage linked data points
layout: redirect
---

Linked data points, other than associated data points, can be edited or deleted in the **Data points** list of the asset. This includes updating the source device as well as deleting linked data points from the asset.

### To Update Linked Data Points

1. Navigate to the **Assets** page and select the asset for which you want to manage linked data points.
2. In the **Data points** section, find the linked data point you wish to update.
3. Click the **Change source** option in the context menu of the linked data point.
4. In the **Change source** dialog, you can select a new source device or modify the fragment and series of the linked data point.
5. After making your changes, click **Save** to apply the changes.

### To Delete Linked Data Points

1. Navigate to the **Assets** page and select the asset for which you want to delete linked data points.
2. In the **Data points** section, find the linked data point you wish to delete
3. Hover over the linked data point and click the delete icon <i class="dlt-c8y-icon-editing-trash text-danger icon-16"></i> that appears at the right.
4. In the confirmation dialog, select **Delete** to delete the linked data point.

### To Unlink Data Points

1. Navigate to the **Assets** page and select the asset for which you want to unlink data points.
2. In the **Data points** section, find the linked data point you wish to unlink.
3. Click the **Unlink source** option in the context menu of the linked data point.
4. In the confirmation dialog, select **Unassign** to remove the link between the asset and the source device for that data point.

{{< c8y-admon-info>}}
Unlinking a data point does not delete the data point itself; it simply removes the association between the asset and the source device. The data point will still exist as a measurement of the source device but will no longer be linked to the asset. The state of the data point will change to *Incomplete* after unlinking, indicating that it is no longer associated with a source device.

{{< /c8y-admon-info>}}

### Source Warnings and Errors

Sources of linked data points can have warnings or errors that indicate issues with the data point. Warnings are highlighted using the <i class="c8y-icon dlt-c8y-icon-warning icon-16" style="color: rgb(255, 136, 0);"></i> indicator, while errors are highlighted using <i class="dlt-c8y-icon-error text-danger icon-16"></i>. 

Possible issues include:
- *Error*: the source device cannot be found
- *Warning*: the measurement type is required but is not configured for the data point
- *Warning*: the measurement type, if configured for the data point, is not matching the measurement type of the latest measurement received from the source device

By hovering over the warning or error icon, you can see more details about the issue. This helps in troubleshooting and resolving any problems with the linked data points. To resolve the issues, use the conext menu actions available for the source.

