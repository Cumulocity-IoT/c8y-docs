---
weight: 30
title: Data points
layout: redirect
helpContent:
- label: datapoints
  title: Working with data points
  content: "Data points represent the measurement series of an asset, such as temperature, humidity, or pressure, and define how they are displayed. Each data point is identified by its fragment and series.


  Measurements can come directly from the asset or be linked from a device. Linking lets you bring device measurements into the asset, giving you a single view of the asset's data for dashboards, analytics, and other applications.


  Use **Link data points** to link measurements from a device. The DTM Data Service propagates new measurements of the source device to the asset. Use **Manage DTM Data Service** to see whether the service is enabled for your tenant, and to enable or disable it.


  The **Status** column shows whether a linked data point is **Linked**, **Incomplete**, or **Source missing**. It is empty for data points that receive measurements directly on the asset. The **Latest value** column shows the latest measurement of the asset, or of the source device if the asset has no measurement yet. Use **Link source** or the **Source** dropdown to assign or change the source device and resolve source issues."
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

**Linked association:** The Digital Twin Manager allows linking of data points from one managed object (typically a device) to an asset. This means the asset itself does not generate the measurement and does not have the measurement directly associated, but it points to a measurement originating from another source, usually a connected device that is part of or related to the asset's hierarchy. Measurements of the source device are automatically propagated to the linked data points on the asset.
 
{{< c8y-admon-info >}}
Data point linking enables the contextualization of raw, device-level measurements within the logical framework of an asset hierarchy. This linking allows for a unified view of an asset's performance and status by aggregating relevant data from multiple underlying devices into the asset, transforming disparate sensor readings into actionable information for the asset itself. 

The DTM Data Service propagates measurements of linked data points from the source device to the asset, see [Measurement propagation](#measurement-propagation). In the default mode, the first data point linked to a source device enables the DTM Data Service for your tenant. You can disable or enable it at any time, see [To manage the DTM Data Service](#enable-measurement-propagation).
{{< /c8y-admon-info >}}

{{< c8y-admon-req >}}
ROLES & PERMISSIONS

The DTM application provides a comprehensive set of permissions to manage linked data points effectively and securely. These permissions are essential for ensuring that users can create, update, view, and delete linked data points as needed while maintaining the integrity and security of the asset data.

These permissions are categorized under two main permissions: "Digital twin assets" and "Digital twin linking". The following permissions are required to view or manage linked data points:

- To view linked data points: READ permission for permission type "Inventory"
- To create linked data points: CREATE permission for permission type "Digital twin assets" or "Digital twin linking"
- To update linked data points: UPDATE permission for permission type "Digital twin assets" or "Digital twin linking"
- To create, update and delete linked data points: ADMIN permission for permission type "Digital twin assets" or "Digital twin linking"
{{< /c8y-admon-req >}}

### Measurement propagation {#measurement-propagation}

*Measurement propagation* means that each new measurement of a source device is copied to every asset with a data point linked to it. The copy is a new measurement with the asset as source. The device measurement itself is not changed.

The *DTM Data Service* is the {{< product-c8y-iot >}} service that propagates the measurements. It propagates measurements only while it is enabled for your tenant, see [To manage the DTM Data Service](#enable-measurement-propagation). After a data point link is created, new measurements of the source device are propagated to the linked data point on the asset.

For each incoming device measurement, one measurement is created for each linked asset:

- The source of the measurement is the asset.
- Time and type of the measurement are taken from the device measurement.
- The measurement contains the fragment `c8y_dtm_data_service`. The fragment identifies the measurement as propagated by the DTM Data Service.
- Each linked series is created with the fragment and series of the linked data point on the asset, and with the value and unit of the device measurement. If several data points of the same asset are linked to the same device measurement, they are combined into one asset measurement.
- Fragments and series of the device measurement which are not linked are not copied to the asset.

Device measurements are matched to linked data points by fragment and series only. The measurement type configured for a linked data point does not affect propagation.

Only measurements with a device as source are propagated. Measurements with an asset as source, including propagated asset measurements, are not propagated further.

Propagated asset measurements are regular measurements in {{< product-c8y-iot >}}. For details on load, limits, delivery and cost implications, see the [service-level agreement for measurement propagation](/service-terms/service-level/#dtm-data-service-sla).

#### To manage the DTM Data Service {#enable-measurement-propagation}

In the default mode `auto`, the first data point linked to a source device enables the DTM Data Service for your tenant. It stays enabled while your tenant has data points linked to a source device. You can disable or enable it at any time. The setting applies to all assets of your tenant.

To view or change the state of the DTM Data Service:

1. Select an asset from the hierarchy on the **Assets** page and switch to the **Data points** tab.
2. Click **Manage DTM Data Service** at the top right. The dialog shows whether the DTM Data Service is enabled for your tenant.
3. Select one of the following:
   - If the DTM Data Service is enabled, click **Disable for all assets** to stop measurement propagation, or click **Close** to keep it enabled.
   - If the DTM Data Service is disabled, click **Enable for all assets** to start measurement propagation, or click **Skip for now** to keep it disabled.

![Manage DTM Data Service](/images/dtm/data-points/asset-data-points-manage-data-service.png)

When you disable the DTM Data Service, it stops propagating new device measurements to the assets. Disabling does not delete your data point links or the measurements already propagated to the assets. When you enable the DTM Data Service again, it does not propagate the device measurements received while it was disabled.

The **Data points** tab shows the **Manage DTM Data Service** button if the DTM Data Service is enabled for your tenant, or if it is disabled and your tenant has at least one linked data point. The tab hides the button in the following cases:

- Your tenant is not subscribed to the DTM Data Service.
- You do not have the permission to get the state of the DTM Data Service, see the permissions below.
- The platform operator has set the DTM Data Service for all tenants. In this case, you cannot change the setting for your tenant.

When you link the first data point of your tenant to a source device and the DTM Data Service is not enabled yet, the dialog opens automatically after you save the link:

- In the default mode `auto`, the first link enables the DTM Data Service. The dialog confirms that the DTM Data Service is enabled.
- If the DTM Data Service was disabled for your tenant before, the dialog asks you to enable it. You can create data point links while the DTM Data Service is disabled, but no measurements are propagated until you enable it.

{{< c8y-admon-info >}}
Only users with the ROLE_DIGITAL_TWIN_ADMIN permission can enable or disable the DTM Data Service. For other users, the dialog only shows the state of the DTM Data Service and a **Close** button. If the DTM Data Service is disabled, contact your tenant administrator to enable it or to get the ROLE_DIGITAL_TWIN_ADMIN permission.
{{< /c8y-admon-info >}}

##### To manage the DTM Data Service using the REST API

You can also disable or enable the DTM Data Service using the following API:

```
PUT /service/dtmdata/enabled/measurements
Content-Type: application/json

{ "mode": "off" }
```

The following modes are available:

| <span style="display: inline-block; width: 100px;">Mode</span> | Description
| ---------- | -----------
| `auto` | Default. Measurements are propagated while the tenant has data points linked to a source device.
| `on` | Measurements are always propagated.
| `off` | Measurements are not propagated. Linked data points are kept, but no asset measurements are created.

In the **Manage DTM Data Service** dialog, **Disable for all assets** sets the mode `off`. **Enable for all assets** sets the mode `auto`, or the mode `on` if the mode is already `auto`.

To get the current state of the DTM Data Service, use `GET /service/dtmdata/enabled`.

Changing the mode requires the ROLE_DIGITAL_TWIN_ADMIN permission. Getting the current state requires the ROLE_DIGITAL_TWIN_ADMIN permission or the CREATE, UPDATE or ADMIN permission for permission type "Digital twin assets" or "Digital twin linking".

#### Fan-out limit {#fan-out-limit}

The number of assets a single device measurement is propagated to is limited. If the limit is exceeded, measurements for further linked assets are not created and an alarm of type `c8y_DtmMeasurementFanOutLimitExceeded` is raised on the source device. For the default limit and how to request a different limit, see [Fan-out](/service-terms/service-level/#dtm-fan-out) in the service-level agreement for measurement propagation.

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
| Status | The state of a linked data point, indicating whether it is linked to its source, requires further configuration, or if its source is unavailable. The status is empty if the DTM Data Service did not create the latest measurement of the asset, for example, because the asset receives the measurements directly. See [Understanding states](#understanding-states).
| <span style="white-space: nowrap;">Latest value</span> | Displays the latest value of the data point, including its unit. The value is taken from the latest measurement of the asset. If the asset has no measurement for the data point yet, the value is taken from the latest measurement of the source device. Hover over the value to see the time of the measurement. If the data point is not yet configured or linked, it may show *Not configured*.

For linked data points, the **Source** column shows the name (or ID) of the source device and the fragment and series on the source device. Fragment and series are only shown for the source if they are different to fragment and series of the data point itself. Via the source context menu of linked data points, you get access to actions such as changing the source device or unlinking the data point.

#### Understanding states {#understanding-states}

The **Status** column provides immediate feedback on the state of a data point. Understanding these states is key to ensuring assets are receiving the expected data. States currently supported in the DTM application are:

| Status | Description
| ---------- | -----------
| Linked | The data point is a linked data point and is successfully connected to its designated source (managed object/device). This indicates a fully operational link, however, it does not indicate if the link source is actively receiving measurements. If the [DTM Data Service](#enable-measurement-propagation) is enabled, measurements of the source are propagated to the asset.
| <span style="white-space: nowrap;">Source missing</span> | The managed object (device) configured as the source for this linked data point cannot be found in the {{< product-c8y-iot >}} inventory. This could be the case because the device has been deleted. The link itself is defined, but its source is not found.
| Incomplete | The data point link has been initiated, but it requires further action to become fully operational. Typically, this means a specific source device needs to be selected and assigned to the data point for the link to become operational.
| (empty) | The DTM Data Service did not create the latest measurement of the asset for this data point. This is the case for data points with direct association, where the asset itself is the source of the measurements.

The **Status** column depends on the latest measurement of the asset for the data point:

- If the DTM Data Service created the latest measurement of the asset, the column shows the status of the link, for example, **Linked**.
- If another source created the latest measurement of the asset, the status is empty. This also applies to linked data points, for example, if a device integration writes measurements with the same fragment and series directly to the asset.
- If the asset has no measurement for the data point, the column shows the status of the link. If the status is **Linked** but the asset has no measurements, see [Troubleshooting measurement propagation](#troubleshooting-measurement-propagation).

![Asset Data point states](/images/dtm/data-points/asset-data-points-status.png)

In case of an error or warning status for a data point, the **Source** column shows the warning <i class="c8y-icon dlt-c8y-icon-warning icon-16" style="color: rgb(255, 136, 0);"></i>  or error <i class="dlt-c8y-icon-error text-danger icon-16"></i> indicators and provides options to troubleshoot and resolve the issue via the context menu. For example, in the case of a *Source missing* status, you can select a new source device to link the data point to.

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

For each selected data point, a new data point will be created for the asset, pointing to the source device and its specific measurement series. If this is the first data point of your tenant linked to a source device and the DTM Data Service is not enabled yet, the **Manage DTM Data Service** dialog opens, see [To manage the DTM Data Service](#enable-measurement-propagation).

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
Unlinking a data point does not delete the data point itself; it simply removes the association between the asset and the source device. The state of the data point changes to *Incomplete*, indicating that it is no longer associated with a source device. No further measurements are propagated to the asset until a new source is selected.
{{< /c8y-admon-info>}}

### Source warnings and errors {#source-warnings-and-errors}

Sources of linked data points can have warnings or errors that indicate issues with the data point. Warnings are highlighted using the warning icon<i class="c8y-icon dlt-c8y-icon-warning icon-16" style="color: rgb(255, 136, 0);"></i>, while errors are highlighted using the error icon <i class="dlt-c8y-icon-error text-danger icon-16"></i>.

Possible issues include:
- **Error**: The source device cannot be found.
- **Warning**: The measurement type is required but is not configured for the data point.
- **Warning**: The measurement type, if configured for the data point, is not matching the measurement type of the latest measurement received from the source device.

By hovering over the warning or error icon, you can see more details about the issue. This helps in troubleshooting and resolving any problems with the linked data points. To resolve the issues, use the context menu actions available for the source.

### Troubleshooting measurement propagation {#troubleshooting-measurement-propagation}

1. **No measurements are propagated to the asset**
   - Check the status of the linked data point. Only linked data points with the status **Linked** propagate measurements, see [Understanding states](#understanding-states) and [Source warnings and errors](#source-warnings-and-errors).
   - Check that the DTM Data Service is enabled for your tenant. Click **Manage DTM Data Service** in the **Data points** tab, or use `GET /service/dtmdata/enabled`. The response contains `measurements.enabled` and `measurements.mode`. If the DTM Data Service is disabled, enable it, see [To manage the DTM Data Service](#enable-measurement-propagation).
   - A value in the **Latest value** column does not mean that measurements are propagated. If the asset has no measurement for the data point, the column shows the latest measurement of the source device.
   - Check that the source of the linked data point is a device. Measurements with an asset as source are not propagated.
   - Check that the source device sends measurements with exactly the fragment and series configured as source of the linked data point, including upper and lower case. This applies in particular to custom data points.
   - Check that the measurements were received after the data point was linked or its source was changed. A new or changed link takes effect with a short delay of up to about a minute. Measurements received earlier are not propagated, see [Limitations and constraints](/service-terms/service-level/#dtm-limitations-and-constraints) in the service-level agreement for measurement propagation.
2. **Measurements are propagated to some of the linked assets only**
   - Check the source device for an alarm of type `c8y_DtmMeasurementFanOutLimitExceeded`. If the alarm exists, the device measurement is linked to more assets than allowed, see [Fan-out limit](#fan-out-limit).
3. **The status of a linked data point is empty**
   - The DTM Data Service did not create the latest measurement of the asset for this data point. Check whether another source, for example, a device integration, writes measurements with the same fragment and series directly on the asset. Propagated measurements contain the fragment `c8y_dtm_data_service`.
4. **Propagated measurements are not shown for the expected time range**
   - Propagated asset measurements have the time of the device measurement. If a device sends measurements with a time in the past, for example after reconnecting or because of a wrong device clock, the asset measurements are shown at that time as well. Check the time of the measurements of the source device.
