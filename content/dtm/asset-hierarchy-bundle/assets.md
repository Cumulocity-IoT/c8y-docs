---
weight: 20
title: Assets
layout: redirect
---

Once the [asset hierarchy](/dtm/asset-hierarchy/#asset-hierarchy) is created by adding assets, they can be viewed in the **Assets** page.

### To view an asset {#to-view-an-asset}

Select an asset in the **Assets** page to view the asset details in **Subassets** tab.
It shows all the subassets, child devices and asset properties.
{{< c8y-admon-info>}}
The key-value pairs for complex properties in the **Subassets** page will be displayed in the order specified in the **Order** field of the property definition in the **Asset properties** page.
{{< /c8y-admon-info>}}

1. Select an asset from the hierarchy on the **Assets** page.

2. The **Subassets** page contains the asset details, created and last updated time displayed at the top right.

3. Optionally [add subassets](/dtm/asset-hierarchy/#to-add-subassets), or [assign devices](/dtm/asset-hierarchy/#to-assign-devices-to-an-asset) from the top bar.

4. The asset name and description along with the icon are displayed at the top.
All subassets and devices for this asset will be listed in the **Subassets** section.

5. All the asset properties for this asset will be displayed on the right.

6. The asset hierarchy will be shown in the **Asset tree** tab.

7. Optionally [add subassets](/dtm/asset-hierarchy/#to-add-subassets) using the options on the top right.

If the asset has a location, you can see it on the map under the properties section below its values. Click the full screen icon <i class="dlt-c8y-icon-resize-expand text-muted icon-20"></i> at the top right corner of the map to view it in full screen. To see the map, provide a value for latitude and longitude. You cannot modify the marker when viewing the asset. Edit the property in order to change the position of the marker.

{{< c8y-admon-info>}}
The [Add asset](/dtm/asset-hierarchy/#to-add-subassets) button is not visible for the last hierarchical level.<br>
A warning message will be shown if one or more properties associated with the asset are not present.
For complex properties, the keys will be ordered as specified in the property definition.
{{< /c8y-admon-info>}}

### To view the asset hierarchy {#to-view-the-asset-hierarchy}

Select an asset in the **Assets** page to view the asset details in **Subassets** tab.
It shows all the subassets, child devices and asset properties.
{{< c8y-admon-info>}}
The key-value pairs for complex properties in the **Subassets** page will be displayed in the order specified in the **Order** field of the property definition in the **Asset properties** page.
{{< /c8y-admon-info>}}

In the top right corner of the **Subassets** tab, you can [assign devices](#to-assign-devices-to-an-asset).

![Subassets](/images/dtm/assets/dtm-assets-subassets-page.png)

You can view the hierarchy of the asset in the **Asset tree** tab. Initially the asset hierarchy is collapsed. Click the expand icon <i class="dlt-c8y-icon-forward text-primary icon-20"></i> to view the next level of subassets.

Click **Add asset** to add more subassets.

![Asset tree](/images/dtm/assets/dtm-assets-asset-tree-page.png)

### To create an asset {#to-create-an-asset}

There are two options for creating assets in the DTM application.
The following section describes how to create an asset via the UI.

Alternatively, see [DTM Asset and Definition API documentation](https://cumulocity.com/api/dtm/) for using the DTM REST API.

To add an asset via the UI:

1. Click **Add asset** in the top right corner of the **Assets** page.

2. In the **New asset** page, select the desired asset model from the **Choose asset model** dropdown menu on the top left.

    {{< c8y-admon-info>}}
The asset models here are root asset models.
They are labeled "START NODE" in the hierarchy.
Root asset models are asset models which are at the top of hierarchy and don't have any parent asset model above them.
    {{< /c8y-admon-info>}}

3. The asset hierarchy is shown in the left section and the respective dialog window is shown on the right. Fill out the fields labeled "required".

4. Optionally, add a description or [assign devices](#to-assign-devices-to-an-asset) to your root asset.

5. To add more than one root asset, click **Add**.

6. Under **Asset properties**, fill in the required information. Here you find all [asset properties](/dtm/asset-types/#asset-properties) assigned to the asset model that you create.

For an asset with a **Location** property, click **Choose on Map** in the section to set the values for the latitude and longitude using map view. Click the full screen icon <i class="dlt-c8y-icon-resize-expand text-muted icon-20"></i> at the top right corner of the map to view it in full screen.

The marker is positioned at the default value set in the **Location** property. Click or drag the marker to the preferred position to set the value for both latitude and longitude. If you do not enter a latitude or longitude value, you will not see a marker on the map.

{{< c8y-admon-info>}}
The values of latitude and longitude are automatically updated whenever a new location is selected on the map and vice-versa. The altitude value is not represented on the map.<br>
The asset properties are defined when [creating the asset model](/dtm/asset-types/#to-create-an-asset-model).
When creating an asset you must provide the values for all asset properties.<br>
For complex properties, the keys are ordered as specified in the property definition.
{{< /c8y-admon-info>}}

7. Click **Next** to reach the next hierarchy level of your **asset hierarchy** and fill out the fields as necessary for your asset. Repeat for all asset hierarchy levels.

8. The **Confirmation** step displays an overview of your asset and asset hierarchy levels. Click **Create** to create your asset. The asset is now listed in the **Assets** page.

As you define each hierarchy level of your new asset, you see a green check mark on each asset hierarchy level in the section on the left.

{{< c8y-admon-info>}}
If there are validation errors on the page, they will be indicated by red highlights.
Correct the required information to continue.
If you are leaving the page abruptly, a confirmation dialogue box will be shown.
{{< /c8y-admon-info>}}

![Adding a new asset](/images/dtm/assets/dtm-assets-new-asset.png)

**Example:**

If you are creating an asset hierarchy for the asset model "Wind turbine AZ-43Y", select the root asset model "Wind turbine AZ-43Y" in the **Choose asset model** dropdown menu. Starting with the root asset level, you see the dialog window "Wind turbine AZ-43Y" on the right.
Enter the name of the wind turbine in the field **Name**, for example, "SE-TURBINE-101".
In the field **Description** you can enter a brief description of this asset, for example, "Wind turbine with rated power of 3.6MW".
However, this field is optional and can be left empty.
To add more assets to this level, click **Add new** at the bottom.
Repeat until all desired assets on this level have been filled out.

Click **Next** to see the next asset level, for example, "Rotor".
Fill out all required fields.
You have the option to add more assets on this level.
Click **Next** to continue until all assets are created.

### To add subassets {#to-add-subassets}

To add subassets to an asset open the **Subassets** or **Asset tree** tab.

1. Click **Add asset** to load the **Asset hierarchy** for the selected asset.

2. The root asset is displayed with the label "parent node". The asset hierarchy displayed below it is a subset of the root asset hierarchy.

    ![Subasset](/images/dtm/assets/dtm-assets-add-child-asset.png)

**Example:**

If "Wind turbine" is a root level asset, then "Rotor" is a subasset of "Wind turbine" and "Blade" is a subasset of "Rotor".
If you navigate to the **Subassets** or **Asset tree** page of "Wind turbine" and click **Add asset**, the asset hierarchy loads for "Rotor" and "Blade".

If you navigate to the existing "Rotor" asset and want to add a subasset, you can only add subassets for "Blade".

For details on how to add assets in the asset hierarchy, see [To create an asset](#to-create-an-asset).

{{< c8y-admon-info>}}
If you are at the end of the hierarchy, you will see no further option to create subassets.
{{< /c8y-admon-info>}}

### To create multiple instances of an asset {#to-add-multiple-instances-of-an-asset}

At each hierarchy level, you can create multiple assets from a single asset model.

**Example:**

For a wind turbine rotor with three blades, you first create the asset hierarchy level for "Rotor". Then use the asset model "Blade" to add the blades.

1. Click **Add** at the bottom to add more blade assets.

    ![Adding multiple assets](/images/dtm/assets/dtm-assets-add-multiple-instance.png)

2. To delete an added asset template, click the delete icon at the top right.

3. Modify the assets by navigating the asset pages using the **Previous** and **Next** buttons. You can track your progress via the green check marks in the asset hierarchy on the left.

4. When done, the **Confirmation** page shows the asset hierarchy. Click **Create** to create the asset hierarchy.

![Confirmation page asset creation](/images/dtm/assets/dtm-assets-confirmation-page.png)

On successful asset hierarchy creation, you see a pop-up notification in the top right corner.
You can view the newly created asset hierarchy in the **Assets** page.
Also see [viewing assets](/dtm/asset-hierarchy/#viewing-assets).

In case of a bulk operation failure, the entire operation is rolled back. The user will be navigated to the main assets page in order to cleanup the entities created and to try the operation again.

### To assign devices to an asset

When you create a new asset you have the option of assigning one or more devices to this asset.

1. Click **Assign devices** in the **New asset** page.
2. The resulting dialog window lists all devices registered for the tenant. Select one or multiple devices and click **Assign**.
3. The dialog closes and you can continue creating the asset.

![Assigning devices to an asset](/images/dtm/assets/dtm-assets-assign-devices.png)

To add a new device, add it through the Device Management application.
Refer to [Registering devices](/device-management-application/registering-devices/) for further information.

{{< c8y-admon-info>}}
Only select devices which are part of the current asset.
If a device belongs to a subasset, then select it when you create the subasset.
{{< /c8y-admon-info>}}

#### To filter and select devices {#to-filter-and-select-devices}

You can view, search or filter devices easily with the following options:

1. Columns shown in the grid specify the device details for each device. Click **Configure columns** at the top right to show or hide columns.

2. Click **Reload** to reload the page and display the latest list of devices present in the {{< product-c8y-iot >}} tenant.

3. Click **Sort** on the applicable columns to view the device data in either ascending or descending order.

4. To filter devices based on text, use the **Filter** option in the applicable columns. When a filter is applied, a notification will be shown at the top.

5. To clear the filters, click **Clear all filters**. To see the sort icon <i class="dlt-c8y-icon-sort-arrow icon-20"></i> and the filter icon <i class="dlt-c8y-icon-filter icon-20"></i> hover over each column.

### To modify an asset {#to-modify-an-asset}

Fields are marked editable by an edit icon <i class="dlt-c8y-icon-edit1 text-primary icon-20"></i>.
To modify any of the asset details, click the edit icon <i class="dlt-c8y-icon-edit1 text-primary icon-20"></i>, enter new details and save.<br>
For an asset with a location, click or drag the marker to the preferred position to select the value for latitude and longitude on the map. Click the full screen icon <i class="dlt-c8y-icon-resize-expand text-muted icon-20"></i> at the top right corner of the map to enter full screen mode. To see the map, provide a value for latitude and longitude.

### To delete an asset {#to-delete-an-asset}

To delete a subasset or device in the hierarchy:

1. Click the delete icon <i class="dlt-c8y-icon-editing-trash text-danger icon-20"></i> next to it.

    {{< c8y-admon-info>}}

The delete icon only appears on hover of each row under the subassets section.
    {{< /c8y-admon-info>}}

In the following dialog box, click **Confirm** to continue.
Optionally select the checkbox in the dialog box to delete all subassets and devices for the selected asset.

### To search for an asset {#to-search-for-an-asset}

You can search for assets through the **Search** button at the right of the top bar.
Enter a search term into the textbox at the top of the **Search** window to see all assets matching the search criteria in the **Search results** section.

To see more details click **Go to the asset data table** at the bottom. This will show the entire search results in a table format.

The **Search** page only shows a limited number of matches. In case of more matches, switch to the asset data table to see the complete results.

![assets-search](/images/dtm/assets/dtm-assets-search-assets.png)

{{< c8y-admon-important >}}
The search results include all assets containing the search term in any property (name, model or any fragment), that is, the search results do not only include assets matching the search criteria with their names.
{{< /c8y-admon-important >}}

The DTM application extends the full text search capability of {{< product-c8y-iot >}} for searching assets. See [Search and filter functionality](/get-familiar-with-the-ui/gui-features/#search-and-filter-functionality) to know more about available search options.

### To move assets {#to-move-assets}

Use the assets move feature to relocate assets within hierarchies. To move one or more assets, follow the steps below:

1. Select one or more assets of same type in the **Assets** page to move.
2. Click **Move selected** in the top banner.
3. In the resulting dialog, a list of assets are shown which can allow the selected assets as its children. Click the radio button to the left of each asset to select it.
4. Click **Move** to complete the relocation.

{{< c8y-admon-info >}}
Only a maximum of 10 assets can be moved at a time.

The **Move selected** option in the banner is disabled in the following scenarios:

* One or more root assets are selected.
* Assets of different asset models are selected. Only assets of same asset model can be moved.
* The selected asset's asset model is no longer a child of its parent asset model.
* One or more assets with the same name are selected.

{{< /c8y-admon-info >}}

![Asset movement](/images/dtm/assets/dtm-assets-move-assets.png)
