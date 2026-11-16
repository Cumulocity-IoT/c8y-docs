---
weight: 30
title: Selecting assets in widgets
layout: bundle
sector:
  - app_enablement
---

The following section describes how [to select one top-level asset](#to-add-an-asset-to-a-new-or-existing-widget), how [to select child devices as asset](#to-select-child-devices-as-asset) and how [to search or filter for assets](#to-search-and-filter-for-assets) in the widgets configuration.

### To add an asset to a new or existing widget {#to-add-an-asset-to-a-new-or-existing-widget}

On the **Configuration** tab of the widget editor, select the check boxes of the desired asset under **Asset selection**. Click **Save** to add the asset to the widget.
You can select a single device or a whole group of devices, indicated by a folder icon <i class="dlt-c8y-icon-folder icon-20"></i>. For details on selecting child devices, see [To select child devices within groups as asset](#to-select-child-devices-as-asset).

If you want to edit an asset of a widget, open the widget editor and click **Clear**. This clears the previous asset collection. Select the new desired asset and click **Save**.  

For general instructions on how to add or modify widgets, see [To add a widget to a dashboard or a report](#to-add-a-widget-to-a-dashboard-or-a-report) or [Modifying widgets](#modifying-widgets).

### To select child devices as asset {#to-select-child-devices-as-asset}

If the asset is a group or a device with children, you see a folder icon <i class="dlt-c8y-icon-folder icon-20"></i> next to their name as well as an arrow icon pointing right <i class="dlt-c8y-icon-forward"></i>. Click the desired group or device with children in the list to open a new level displaying all assigned assets to that group or device. Select the desired asset. To return to the previous level, click on the arrow icon pointing left <i class="dlt-c8y-icon-caret-back"></i>.

![Select assets](/images/users-guide/cockpit/cockpit-asset-selection.png)

If you want to select an unassigned device as an asset, you can find the unassigned devices in the **Unassigned Devices** folder, located on the first level of the selected group.

{{< c8y-admon-info >}}
You cannot select the **Unassigned devices** folder itself. However, each device inside this folder can be selected on the next level. Click **Unassigned devices** to open the next level with all unassigned devices. Click the desired device to select it.
{{< /c8y-admon-info >}}

### To search and filter for assets {#to-search-and-filter-for-assets}

There are two methods which can be used to quickly find assets:

1. Name search
2. Filtering

#### Name search {#name-search}

On the **Configuration** tab of the widget editor you can use the search field under **Asset selection**.

With the search, you can find assets anywhere within the hierarchy if the asset’s name contains the search term.

After selecting the asset, you see all children of this asset. To return to the level above, click the "X" in the search field.

{{< c8y-admon-info >}}
The name search is only available in the Home dashboard and the Report dashboards.
{{< /c8y-admon-info >}}

For details on the search functionality, see [Search and filter functionality](/get-familiar-with-the-ui/gui-features/#search-and-filter-functionality).

#### Filtering {#filtering}

Filtering is another way to find assets. However, it only filters assets on the current level under **Asset selection**.

![Filtering](/images/users-guide/cockpit/cockpit-asset-column-filter.png)

For details on the filter functionality, see [Search and filter functionality](/get-familiar-with-the-ui/gui-features/#search-and-filter-functionality).
