---
weight: 20
title: To filter devices
layout: redirect
---

The device list offers a filtering functionality to filter devices in the list for specific criteria.

Filtering is available on every column. Click the filter icon <i class="dlt-c8y-icon-filter icon-20"></i> next to the name of the column you want to set a filter for.

Specify your filter options in the dropdown list.

Most columns represent text fields. You can filter these columns by simply entering an arbitrary text into the textbox as in the search field. Click **+ Add next** to add another textbox if you want to filter for more than one term.

Apart from filtering for text there are several other options:

- In case of date fields (for example **Registration date**), you specify a date range to filter for.
- In the **Status** column you can filter for various criteria representing the send, push or maintenance status of the device.
- In the **Alarm** column the filtering options you may select correspond to the alarm types (critical, major, minor, warning, no alarms).
- For custom columns, select **Only rows where value is defined** to filter based on whether the fragment exists, or specify one or more filter terms the entry must match.

Finally, click **Apply** to carry out the filtering.

The devices list will now only display devices matching the filtering options.

Sorting is available on every column. Click the sort icon <i class="dlt-c8y-icon-sort-arrow icon-20"></i> in the respective column header once to sort the entries in ascending order and twice to sort the entries in descending order. Click the sort icon <i class="dlt-c8y-icon-sort-arrow icon-20"></i> once more to remove sorting for this column.

Click **Clear filters** in the table header if you want to clear all filters and view all devices.

{{< c8y-admon-info >}}
If you select to sort a text field, for example, device name, in ascending or descending order, keep in mind that the resulting alphabetical sorting is based on ASCII/UTF: A < B < ... < Z < ... < a < b ... < z. Names starting with lower case letters will be sorted below all names with uppercase letters or vice versa.
{{< /c8y-admon-info >}}
