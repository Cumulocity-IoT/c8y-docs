---
weight: 35
title: Create linked data points
layout: redirect
---

All data points associated with an asset can be viewed and created in the **Data points** section of the **Assets** page. 

### To create linked data points

![Create Asset Data points](/images/dtm/data-points/asset-data-points-create.png)

1. Select an asset from the hierarchy on the **Assets** page.
2. The **Data points** section contains a comprehensive list of all data points associated with the selected asset.
3. Click the **Link data points** button at the top right corner of the **Data points** section. This opens the Data point selector dialog.
4. Select the source device from which you want to link data points. This is done by navigating through the asset hierarchy in the left panel of the dialog.
5. In the center panel, you can either select from existing data points associated with the source device or define custom data points by specifying the fragment and series.
6. The right panel displays the data points you have selected for linking. Review your selections here.
7. Once you have made your selections, click the **Add data points** button at the bottom of the dialog to finalize the linking process.

For each selected data point, a new data point will be created for the asset, pointing to the source device and its specific measurement series.

![Create Asset Data points](/images/dtm/data-points/asset-data-point-selector.png)

When choosing from available data points, you have two primary options:

**Associated data points**: Select from the list of measurement series already known or received by the platform from the currently selected source device in the **Data point selector**. These are measurements that the platform has already processed and recognized. You can click the plus button next to any of these listed data points to add them to your selection.

**Custom data points**: If the desired measurement has not yet been received by the platform from the source device, you can define it as a custom data point. To do this, you must manually provide the *fragment* (e.g., c8y_Temperature) and *series* (e.g., T) in the respective input fields. You might also need to provide a measurement type.

![Create custom Asset Data points](/images/dtm/data-points/asset-data-point-selector-custom.png)

{{< c8y-admon-info>}}

When creating a new linked data point, the data point on the asset is created with the fragment and series of the selected data point in the *Data point selector*. Using *Change source* context menu option, it is possible to change the source device itself and / or the fragment and series on the source device for the linked data point. This means that you can adapt the linked data point to different source devices or measurement series as needed. 

If fragment and series on the asset and the source device are different, the source will have the name of the source device and the fragment and series will be displayed as "DeviceName - c8y_Temperature → T". This helps to clearly identify the source of the linked data point.

{{< /c8y-admon-info>}}

