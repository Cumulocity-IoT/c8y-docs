---
weight: 20
title: Working with assets
layout: redirect
helpContent:
  - label: viewing-assets
    title: Managing assets
    content: "Under **Subassets** all assets assigned to a particular asset are listed. Subassets can either be other assets or devices.


    Click **Assign devices** at the top right to assign devices to the asset."
---

To work with assets in the DTM application, navigate to the **Assets** page using the navigator.   

By default, the **Assets** page is empty. Once an [asset hierarchy](/dtm/asset-hierarchy/#asset-hierarchy) has been created by adding assets, the assets are shown in the **Assets** page.

{{< c8y-admon-info >}}
The count of assets shown at the bottom of the **Assets** page represents the number of root assets in the assets hierarchy, not the total number of assets.
{{< /c8y-admon-info >}}

![assets-view](/images/dtm/assets/dtm-assets-view-assets.png)

{{< c8y-admon-req >}}
ROLES & PERMISSIONS

- To view all assets: READ permission for permission type "Inventory"
- To add/update/delete assets: CREATE/ADMIN permission for permission type "Inventory"
- To view specific assets: READ permissions for "Inventory" in the inventory roles
- To manage or delete specific assets: READ and CHANGE permissions for "Inventory" in the inventory roles

Note that global inventory permissions override inventory role permissions. By default, the user has full access to assets created by them regardless of permissions granted to them. See [Managing permissions and roles](/standard-tenant/managing-permissions/) for further information.
{{< /c8y-admon-req >}}

### To view an asset {#to-view-an-asset}

In the **Assets** page, select an asset to view its details, such as subassets, child devices, and asset properties.

#### Subassets {#subassets}

The **Subassets** tab shows all asset details:

- At the top left of the asset header, the icon, the asset definition as well as asset name and description are presented.
- Next to it, the **Created** and **Last updated** time as well as, if configured, the **External ID** of the asset are shown.
- In the **Subassets** section at the left, all subassets and devices are listed.
- At the right, the asset properties are displayed.

Optionally, [add subassets](/dtm/asset-hierarchy/#to-add-subassets) or [assign devices](/dtm/asset-hierarchy/#to-assign-devices-to-an-asset) from the top bar.

For assets with the **Allow any property** option enabled, you can add additional properties beyond those defined in the asset definition. Click **Add property** to select from the available property definitions.

![Subassets](/images/dtm/assets/dtm-assets-subassets-page.png)

If the asset has a **Location** property or the asset definition of the asset specifies Location as a selected [Property definition](/dtm/asset-types/#property-definitions), a map is shown at the bottom right corner of the page. In DTM, the Location property definition represents the formal model of a `c8y_Position` fragment used in {{< product-c8y-iot >}} to [track the geographical location of assets and devices](https://cumulocity.com/docs/device-integration/fragment-library/#tracking). Click the full screen icon <i class="dlt-c8y-icon-resize-expand text-muted icon-20"></i> at the top right corner of the map to view it in full screen. You cannot modify the marker when viewing the asset. Edit the property to change the position of the marker.

{{< c8y-admon-info>}}
- The **Add asset** button is not displayed for the last hierarchical level, except for generic assets with the **Allow any asset** option enabled in their asset definition.
- For complex properties, the keys will be ordered as specified in the property definition.
- The external source label of the asset from `c8y_ExternalSource` is only shown for for read-only assets to indicate synchronization from an external system.
{{< /c8y-admon-info>}}

#### Asset tree {#asset-tree}

You can view the hierarchy of the asset in the **Asset tree** tab. Initially the asset hierarchy is collapsed. Click the expand icon <i class="dlt-c8y-icon-forward text-primary icon-20"></i> to view the next level of subassets.

Click **Add asset** to add more subassets.

![Asset tree](/images/dtm/assets/dtm-assets-asset-tree-page.png)

### To create an asset {#to-create-an-asset}

There are two options for creating assets in the DTM application, that is, via the UI and via REST API.

The following section describes how to create an asset via the UI. See the [DTM API documentation](https://cumulocity.com/api/dtm/) for using the DTM REST API.

To add an asset via the UI:

1. Click **Add asset** in the top bar of the **Assets** page.

2. In the **New asset** page, select the desired asset definition from the **Choose asset definition** dropdown menu.

    {{< c8y-admon-info>}}
The asset definitions provided here are root asset definitions. Root asset definitions are asset definitions which are at the top of a hierarchy and don't have any parent. They are labeled "START NODE" in the hierarchy.
    {{< /c8y-admon-info>}}

3. At the left, the asset hierarchy is shown. At the right, provide a name for the new asset and optionally add a description.

    ![Adding a new asset](/images/dtm/assets/dtm-assets-new-asset.png)

4. If the selected asset definition has **Allow any asset** enabled, a **Subassets** section is displayed. Click **Add/Create asset** to add a row and select an asset definition to add as a subasset. Click the remove icon next to a row to remove it.

5. Under the **Property definitions**,  provide the values for all asset properties. The corresponding property definitions are defined when [creating the asset definition](/dtm/asset-types/#to-create-an-asset-definition).

If the selected asset definition has **Allow any property** enabled, **Add property** button is displayed in the **Property definitions** section. Click **Add property**, select the desired properties in the resulting dialog, and click **Select**. The selected properties appear in the **Property definitions** section. Click the remove icon next to a property to remove it.


    {{< c8y-admon-info>}}
For complex properties, the keys are ordered as specified in the property definition.
    {{< /c8y-admon-info>}}

    For an asset with a **Location** property, click **Choose on map** to set the values for latitude and longitude. Click the full screen icon <i class="dlt-c8y-icon-resize-expand text-muted icon-20"></i> at the top right corner of the map to view it in full screen. The marker is positioned at the default value set in the **Location** property. Click or drag the marker to the preferred position to set the value for both latitude and longitude. If you do not enter a latitude or longitude value, you will not see a marker on the map.

    {{< c8y-admon-info>}}
The values of latitude and longitude are automatically updated whenever a new location is selected on the map and vice-versa. The altitude value is not represented on the map.
    {{< /c8y-admon-info>}}


6. Optionally, [assign devices](#to-assign-devices-to-an-asset) to your root asset.

5. To add more than one asset on this level, click **Add**.

7. After defining a hierarchy level, you see a green check mark on the asset hierarchy at the left.

8. Click **Next** to navigate to the next hierarchy level and fill in the required fields. For generic assets, the asset hierarchy on the left updates automatically as you add subassets.

9. Repeat this steps for all asset hierarchy levels. You can track your progress via the green check marks in the asset hierarchy on the left.

Modify the assets by navigating to the respective asset pages using the **Previous** and **Next** buttons.

When all assets in the asset hierarchy show green check marks, the **Confirmation** step shows a preview of the asset hierarchy. Click **Create** to create the asset hierarchy.

![Confirmation page asset creation](/images/dtm/assets/dtm-assets-confirmation-page.png)

If the asset hierarchy has been successfully created, you see a popup notification at the top right.

The new asset hierarchy in displayed the **Assets** page.

{{< c8y-admon-info>}}
- In case of validation errors, they are indicated in red. Correct the required information to continue.
- If you leave the page abruptly, a confirmation dialog is shown.
- In case of a bulk operation failure, the entire operation is rolled back. The user is navigated to the main assets page in order to clean up the entities created and to repeat the operation.
{{< /c8y-admon-info>}}

#### Example

If you want to create an asset hierarchy for the asset definition "Wind turbine AZ-43Y":

1. Select "Wind turbine AZ-43Y" from the **Choose asset definition** dropdown. Starting with the root asset level, you see the dialog window "Wind turbine AZ-43Y" on the right.
2. Enter the **Name** of the wind turbine, for example, "SE-TURBINE-101".
Optionally, enter a brief description, for example, "Wind turbine with rated power of 3.6MW".
3. To add more assets to this hierarchy level, click **Add** at the bottom.
4. Click **Next** to see the next asset level, for example, "Rotor".
5. Fill out all required fields. Again, you have the option to add more assets on this level.
6. Click **Next** to continue until all assets are created.

### To add subassets {#to-add-subassets}

You can add subassets to an asset from the **Subassets** or **Asset tree** tab.

1. Click **Add asset** to load the **Asset hierarchy** for the selected asset.

2. The current root asset definition is displayed with the label "START NODE". The asset hierarchy displayed below it is a subset of the root asset hierarchy.

    ![Subasset](/images/dtm/assets/dtm-assets-add-child-asset.png)

#### Example

If "Wind turbine" is a root level asset, then "Rotor" is a subasset of "Wind turbine" and "Blade" is a subasset of "Rotor".

If you navigate to the **Subassets** or **Asset tree** page of "Wind turbine" and click **Add asset**, the asset hierarchy loads for "Rotor" and "Blade".

If you navigate to the "Rotor" asset and and click **Add asset**, you can only add subassets for "Blade".

For details on how to add assets in the asset hierarchy, see [To create an asset](#to-create-an-asset).

{{< c8y-admon-info>}}
If you are at the end of the hierarchy, there is no option available to create subassets.
{{< /c8y-admon-info>}}

### To create multiple instances of an asset {#to-create-multiple-instances-of-an-asset}

At each hierarchy level, you can create multiple assets from a single asset definition.

For a wind turbine rotor with three blades, for example, you first create the asset hierarchy level for "Rotor". Then use the asset definition "Blade" to add the blades.

Click **Add** at the bottom to add more blade assets.

![Adding multiple assets](/images/dtm/assets/dtm-assets-add-multiple-instance.png)


### To assign devices to an asset

On creating a new asset you can assign one or more devices to it.

1. Click **Assign devices** in the **New asset** page.
2. The resulting dialog window lists all devices registered for the tenant. Select one or multiple devices and click **Assign**.

![Assigning devices to an asset](/images/dtm/assets/dtm-assets-assign-devices.png)

To add new devices, switch to the Device Management application.
For details, refer to [Registering devices](/device-management-application/registering-devices/).

{{< c8y-admon-info>}}
Only select devices which are part of the current asset.
If a device belongs to a subasset, then select it when you create the subasset.
{{< /c8y-admon-info>}}

#### To filter and select devices {#to-filter-and-select-devices}

You can view, search, or filter devices easily with the following options.

- The columns shown in the grid specify the device details for each device. Click **Configure columns** at the top right to show or hide columns.

- Click **Reload** to reload the page and display the latest list of devices present in the {{< product-c8y-iot >}} tenant.

- Click **Sort** on the applicable columns to view the device data in either ascending or descending order. The sort icon <i class="dlt-c8y-icon-sort-arrow icon-20"></i> shows up when hovering over the column.

- To filter devices based on text, use the **Filter** option in the applicable columns. The filter icon <i class="dlt-c8y-icon-filter icon-20"></i> shows up when hovering over the column. When a filter is applied, a notification will be shown at the top.

- To clear the filters, click **Clear all filters**.

### To modify an asset {#to-modify-an-asset}

To modify any of the asset details, click the edit icon <i class="dlt-c8y-icon-edit1 text-primary icon-20"></i> next to it, enter the new information, and save it.

For details on the fields, see [To create an asset](#to-create-an-asset).


### To delete an asset {#to-delete-an-asset}

To delete a subasset or device in the hierarchy, click the delete icon <i class="dlt-c8y-icon-editing-trash text-danger icon-20"></i> next to it and confirm. The delete icon shows up when hovering over a row.

In the confirmation dialog, you can select if you only want to delete the asset with all associated subassets or if you additionally want to delete all associated devices.


### To search for an asset {#to-search-for-an-asset}

You can search for assets using the **Search** button at the right of the top bar.
Enter a search term into the textbox at the top of the **Search** window to see all assets matching the search criteria in the **Search results** section.

The **Search** page only shows a limited number of matches. To see more details, click **Go to the asset data table** at the bottom. This will show the entire search results in a table format.

![assets-search](/images/dtm/assets/dtm-assets-search-assets.png)

{{< c8y-admon-important >}}
The search results include all assets containing the search term in any property (name, model or any fragment), that is, the search results do not only include assets matching the search criteria with their names.
{{< /c8y-admon-important >}}

### To move assets {#to-move-assets}

To move one or more assets, follow the steps below:

1. Select one or more assets of the same type in the **Assets** page.
2. Click **Move selected** at the top.
3. In the resulting dialog, a list of assets is shown which allow the selected assets as its children. Click the radio button to the left of an asset to select it.
4. Click **Move** to complete the relocation.

{{< c8y-admon-info >}}
Only a maximum of 10 assets can be moved at a time.

The **Move selected** option is disabled in the following scenarios:

* One or more root assets are selected.
* Assets of different asset definitions are selected. Only assets of the same asset definition can be moved.
* The selected asset's asset definition is no longer a child of its parent asset definition.
* One or more assets with the same name are selected.

{{< /c8y-admon-info >}}

![Asset movement](/images/dtm/assets/dtm-assets-move-assets.png)
