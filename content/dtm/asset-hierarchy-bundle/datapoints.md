---
weight: 30
title: Data points
layout: redirect
---

Data points represent the numerical measurements collected from connected devices and sensors. These are the fundamental real-time data streams that offer insights into the operational status, performance, and environmental conditions of your physical assets. These data streams are key to monitoring asset health, identifying trends, and making informed decisions over time.

To effectively organize and interpret the vast amount of data collected from IoT devices, {{< product-c8y-iot >}} structures measurements using two key concepts: **fragments** and **series**. These concepts are crucial for understanding how measurement data is categorized and stored within the platform and how to use data points in the Digital Twin Manager (DTM) application.

A **fragment** serves as a logical container or category that groups related measurements or characteristics of an asset (or any managed object). It identifies a specific capability or a set of related data points. Within a fragment, a **series** represents a specific, individual measurement stream. It is the named property that holds the actual numerical value and its corresponding unit. A data point, and with this the measurement series it represents, is uniquely identified by the combination of its fragment and series.

{{< c8y-admon-info>}}
To reference data points and measurement series in {{< product-c8y-iot >}}, the format `fragment.series` is used, such as `c8y_Temperature.T_Ambient`.
{{< /c8y-admon-info>}}

**Example:**
Within the `c8y_Temperature` fragment, `T` (for Temperature) could be a series. Each series provides a distinct stream of data for a particular metric. If a device has two temperature sensors, one for ambient temperature and one for internal temperature, both might fall under the `c8y_Temperature` fragment but would have distinct series names, such as for example `T_Ambient` and `T_Internal`.

The DTM application allows managing data points for assets.

{{< c8y-admon-info>}}
The Data Points extension package must be installed for the Digital Twin Manager application to manage data points for assets. If the Data Points extension package is not installed, the **Data points** tab is not visible in the asset details view. Install the Data Points extension package in **Administration &gt; Ecosystem &gt; Dtm-plugins &gt; Data points**.
{{< /c8y-admon-info>}}

### Types of data points {#types-of-data-points}

In {{< product-c8y-iot >}}, data points are inherently associated with managed objects in the platform's inventory. As assets are a type of managed object, measurements can be associated with assets as any other managed object. However, there are two distinct ways in which data points can be associated with assets in the Digital Twin Manager.  

**Direct association:** Any managed object in {{< product-c8y-iot >}}, including an asset, can directly receive measurements and have measurements directly associated. This means that an asset itself can be the source of a measurement. For example, if a building asset has its own sensors directly integrated with {{< product-c8y-iot >}}, the measurements from these sensors will directly be associated with that building asset.

**Linked association:** The Digital Twin Manager allows linking of data points from one managed object (typically a device) to an asset. This means the asset itself does not generate the measurement and does not have the measurement directly associated, but it points to a measurement originating from another source, usually a connected device that is part of or related to the asset's hierarchy.
 
{{< c8y-admon-preview >}}
Data point linking enables the contextualization of raw, device-level measurements within the logical framework of an asset hierarchy. This linking allows for a unified view of an asset's performance and status by aggregating relevant data from multiple underlying devices into the asset, transforming disparate sensor readings into actionable information for the asset itself. 

The new **DTM Data Service** processes configured data point links and automatically propagates incoming device measurements to the corresponding assets in the digital twin hierarchy. As soon as a data point link is created in the DTM application, the DTM Data Service starts forwarding incoming measurements from the source device to the linked data point on the asset. 

This feature is in **Public Preview**, that is, it is not enabled by default and may be subject to change in the future. To enable the DTM Data Service for your tenant, please contact [{{< product-c8y-iot >}} support](/additional-resources/contacting-support).

Note that the number of measurements propagated to assets through data point linking depends on the number of linked assets per incoming measurement. For example, if a device measurement is linked to 3 different assets, the DTM Data Service will create 3 measurements on the asset level for each incoming device measurement. 
{{< /c8y-admon-preview >}}

{{< c8y-admon-req >}}
ROLES & PERMISSIONS

The DTM application provides a comprehensive set of permissions to manage linked data points effectively and securely. These permissions are essential for ensuring that users can create, update, view, and delete linked data points as needed while maintaining the integrity and security of the asset data.

These permissions are categorized under two main permissions: "Digital twin assets" and "Digital twin linking". The following permissions are required to view or manage linked data points:

- To view linked data points: READ permission for permission type "Inventory"
- To create linked data points: CREATE permission for permission type "Digital twin assets" or "Digital twin linking"
- To update linked data points: UPDATE permission for permission type "Digital twin assets" or "Digital twin linking"
- To create, update and delete linked data points: ADMIN permission for permission type "Digital twin assets" or "Digital twin linking"
{{< /c8y-admon-req >}}

### To view data points {#view-datapoints}

To view the data points for a specific asset, select an asset from the hierarchy on the **Assets** page. In the asset details view, select the **Data points** tab.

![Asset Data point list](/images/dtm/data-points/asset-data-points-list.png)

#### Understanding the columns in the data points list {#understanding-the-columns-in-the-datapoints-list}

The **Data points** tab presents all relevant information about the data points associated with the selected asset in a table format. Each row in the table represents a unique data point with the following columns:

| Column | Description
| ---------- | -----------
| <span style="white-space: nowrap;">Measurement&nbsp;series</span> | The fragment and series (for example, `c8y_Temperature` → `Ts`), clearly identifying the specific type of measurement being tracked. The measurement series represents the unique identifier for the data point and its particular data stream.
| <span style="white-space: nowrap;">Data&nbsp;point&nbsp;template</span> | Indicates if a predefined template from the {{< product-c8y-iot >}} data point library is applied to this measurement. If a template matches the fragment and series, it provides default visualization settings (like color and label) and pre-configured threshold rules for alarms.  
| Source | Identifies the unique ID, or if available the name, of the device that is generating this measurement. For linked data points, this shows the source device the linked data point originates from.  
| Status | The current state of the data point, possibly indicating whether it is actively receiving data, requires further configuration, or if its source is unavailable. This is crucial for troubleshooting and understanding the data flow and is particularly useful for linked data points.
| <span style="white-space: nowrap;">Latest value</span> | Displays the most recently reported numerical value for this data point including its unit. If the data point is not yet configured or linked, it may show *Not configured*.

For linked data points, the **Source** column shows the name (or ID) of the source device and the fragment and series on the source device. Fragment and series are only shown for the source if they are different to fragment and series of the data point itself. Via the source context menu of linked data points, you  get access to actions such as changing the source device or unlinking the data point.

#### Understanding states {#understanding-states}

The **Status** column provides immediate feedback on the state of a data point. Understanding these states is key to ensuring assets are receiving the expected data. States currently supported in the DTM application are:

| Status | Description
| ---------- | -----------
| Linked | The data point is a linked data point and is successfully connected to its designated source (managed object/device). This indicates a fully operational link, however, it does not indicate if the link source is actively receiving measurements.
| <span style="white-space: nowrap;">Source missing</span> | The managed object (device) configured as the source for this linked data point cannot be found in the {{< product-c8y-iot >}} inventory. This could be the case because the device has been deleted. The link itself is defined, but its source is not found.
| Incomplete | The data point link has been initiated, but it requires further action to become fully operational. Typically, this means a specific source device needs to be selected and assigned to the data point for the link to become operational.

![Asset Data point states](/images/dtm/data-points/asset-data-points-status.png)

In case of an error or warning status for a data point the, **Source** shows the warning <i class="c8y-icon dlt-c8y-icon-warning icon-16" style="color: rgb(255, 136, 0);"></i>  or error <i class="dlt-c8y-icon-error text-danger icon-16"></i> indicators and provides options to troubleshoot and resolve the issue via the context menu. For example, in the case of a *Missing source* status, you can select a new source device to link the data point to.

### To create linked data points {#to-create-linked-datapoints}

All data points associated with an asset can be created in the **Data points** tab of the **Assets** page.

![Create asset data points](/images/dtm/data-points/asset-data-points-create.png)

1. Select an asset from the hierarchy on the **Assets** page and switch to the **Data points** tab in the asset details.
2. The **Data points** tab contains a comprehensive list of all data points associated with the selected asset.
3. Click the **Link data points** button at the top right of the **Data points** tab. This opens the data point selector dialog.
4. Select the source device from which you want to link data points. This is done by navigating through the asset hierarchy in the left panel of the dialog.
5. In the center panel, you can either select from existing data points associated with the source device or define custom data points by specifying the fragment and series.
6. The right panel displays the data points you have selected for linking. Review your selections here.
7. Once you have made your selections, click the **Add data points** button at the bottom of the dialog to finalize the linking process.

For each selected data point, a new data point will be created for the asset, pointing to the source device and its specific measurement series.

![Create asset data points](/images/dtm/data-points/asset-data-point-selector.png)

When choosing from available data points, you have two primary options:

**Associated data points**: Select from the list of measurement series already known or received by the platform from the currently selected source device in the **Data point selector**. These are measurements that the platform has already processed and recognized. You can click the plus button next to any of these listed data points to add them to your selection.

**Custom data points**: If the desired measurement has not yet been received by the platform from the source device, you can define it as a custom data point. To do this, you must manually provide the *fragment* (for example, `c8y_Temperature`) and *series* (for example, `T`) in the respective input fields. You might also need to provide a measurement type.

![Create custom asset data points](/images/dtm/data-points/asset-data-point-selector-custom.png)

{{< c8y-admon-info>}}
When creating a new linked data point, the data point on the asset is created with the fragment and series of the selected data point in the data point selector. Using the **Change source** context menu option, it is possible to change the source device itself and/or the fragment and series on the source device for the linked data point. This means that you can adapt the linked data point to different source devices or measurement series as needed.

If fragment and series on the asset and the source device are different, the source will have the name of the source device and the fragment and series will be displayed as "DeviceName - c8y_Temperature → T". This helps to clearly identify the source of the linked data point.
{{< /c8y-admon-info>}}


### To modify linked data points {#to-modify-linked-datapoints}

1. Navigate to the **Assets** page and select the asset for which you want to manage linked data points.
2. In the **Data points** tab of the asset details, find the linked data point you wish to update.
3. Click the **Change source** option in the context menu of the linked data point.
4. In the **Change source** dialog, you can select a new source device or modify the fragment and series of the linked data point.
5. After making your changes, click **Save** to apply the changes.

### To delete linked data points {#to-delete-linked-datapoints}

1. Navigate to the **Assets** page and select the asset for which you want to delete linked data points.
2. In the **Data points** tab of the asset details, find the linked data point you wish to delete.
3. Hover over the linked data point and click the delete icon <i class="dlt-c8y-icon-editing-trash text-danger icon-16"></i> that appears at the right.
4. In the confirmation dialog, select **Delete** to delete the linked data point.

### To unlink linked data points {#to-unlink-linked-datapoints}

1. Navigate to the **Assets** page and select the asset for which you want to unlink data points.
2. In the **Data points** tab of the asset details, find the linked data point you wish to unlink.
3. Click the **Unlink source** option in the context menu of the linked data point.
4. In the confirmation dialog, select **Unlink** to remove the link between the asset and the source device for that data point.

{{< c8y-admon-info>}}
Unlinking a data point does not delete the data point itself; it simply removes the association between the asset and the source device. The data point will still exist as a measurement of the source device but will no longer be linked to the asset. The state of the data point will change to *Incomplete* after unlinking, indicating that it is no longer associated with a source device.
{{< /c8y-admon-info>}}

### Source warnings and errors {#source-warnings-and-errors}

Sources of linked data points can have warnings or errors that indicate issues with the data point. Warnings are highlighted using the warning icon<i class="c8y-icon dlt-c8y-icon-warning icon-16" style="color: rgb(255, 136, 0);"></i>, while errors are highlighted using the error icon <i class="dlt-c8y-icon-error text-danger icon-16"></i>.

Possible issues include:
- **Error**: The source device cannot be found.
- **Warning**: The measurement type is required but is not configured for the data point.
- **Warning**: The measurement type, if configured for the data point, is not matching the measurement type of the latest measurement received from the source device.

By hovering over the warning or error icon, you can see more details about the issue. This helps in troubleshooting and resolving any problems with the linked data points. To resolve the issues, use the context menu actions available for the source.
