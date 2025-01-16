---
weight: 40
title: Viewing assets
layout: redirect
helpcontent:
  - label: viewing-assets
    title: Managing assets
    content: "Under **Subassets** all assets assigned to a particular asset are listed. Subassets can either be other assets or devices.


    Click **Assign devices** at the top right to assign devices to the asset."
---

Once the [asset hierarchy](/dtm/asset-hierarchy/#asset-hierarchy) is created by adding assets, they can be viewed in the **Assets** page.

### To view an asset {#to-view-an-asset}

1. Select an asset from the hierarchy on the **Assets** page.

2. The **Subassets** page contains the asset details, created and last updated time displayed at the top right.

3. Optionally [add subassets](/dtm/asset-hierarchy/#to-add-subassets), or [assign devices](/dtm/asset-hierarchy/#to-assign-devices-to-an-asset) from the top bar.

4. The asset name and description along with the icon are displayed at the top.
All subassets and devices for this asset will get listed in the **Subassets** section.

5. All the asset properties for this asset will be displayed on the right.

6. In the **Asset tree** tab you see the asset hierarchy.

7. Optionally [add subassets](/dtm/asset-hierarchy/#to-add-subassets), or [import assets](/dtm/asset-hierarchy/#creating-assets-bulk-import) using the options on the top right.

If the asset has a location, you can see it on the map under the properties section below its values. Click the full screen icon <i class="dlt-c8y-icon-resize-expand text-muted icon-20"></i> at the top right corner of the map to view it in full screen. To see the map, provide a value for latitude and longitude. You cannot modify the marker when viewing the asset. Edit the property in order to change the position of the marker.

{{< c8y-admon-info>}}
The buttons [Import assets](/dtm/asset-hierarchy/#creating-assets-bulk-import), and [Add asset](/dtm/asset-hierarchy/#to-add-subassets) are not visible for the last hierarchical level.<br>
You see a warning message if one or more properties associated with the asset are not present.
For complex properties, the keys are ordered as specified in the property definition.
{{< /c8y-admon-info>}}

### To modify an asset {#to-modify-an-asset}

Fields are marked editable by an edit icon <i class="dlt-c8y-icon-edit1 text-primary icon-20"></i>.
To modify any of the asset details, click the edit icon <i class="dlt-c8y-icon-edit1 text-primary icon-20"></i>, enter new details and save.<br>
For an asset with a location, click or drag the marker to the preferred position to select the value for latitude and longitude on the map. Click the full screen icon <i class="dlt-c8y-icon-resize-expand text-muted icon-20"></i> at the top right corner of the map to enter full screen mode. To see the map, provide a value for latitude and longitude.

### To delete an asset {#to-delete-an-asset}

To delete a subasset or device in the hierarchy:

1. Click the delete icon <i class="dlt-c8y-icon-editing-trash text-danger icon-20"></i> next to it.

    {{< c8y-admon-info>}}

The delete icon appears on hover of each row under the subassets section.
    {{< /c8y-admon-info>}}

In the following dialog box, click **Confirm** to continue.
Optionally select the checkbox in the dialog box to delete all subassets and devices for the selected asset.

### To search for an asset {#to-search-for-an-asset}

You can search for assets through the **Search** button at the right of the top bar.
Enter a search term into the textbox at the top of the **Search** window to see all assets matching the search criteria in the section **Search results**.

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
3. In the resulting dialog, you see a list of assets which allow selected assets as its children. Click the radio button to the left of each asset to select it.
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
