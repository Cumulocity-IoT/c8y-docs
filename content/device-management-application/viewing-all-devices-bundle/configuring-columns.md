---
weight: 20
title: Configuring columns
layout: redirect
---

The columns shown in the device list may be configured to your needs.

### To show/hide standard columns {#to-showhide-standard-columns}

1. In the table header, click **Configure columns**.
2. In the resulting dropdown, select/clear the checkboxes for all columns as required.

The device list will reflect your changes and only show the selected columns.

### To add custom columns {#to-add-custom-columns}

The device grid offers the option to add custom columns to display selected additional device properties. There are two alternative ways for adding custom columns.

#### With Digital Twin Manager {#with-digital-twin-manager}

If the **Digital Twin Manager** application is available on your tenant, you can use pre-configured asset properties to add them as custom columns. Read how to create asset properties in the [Asset models > Asset properties](/dtm/asset-types/#asset-properties) section.

1. In the **Configure columns** dropdown, click **Add custom column**. An **Asset properties** modal will open that lets you browse through all declared asset properties.<br>
   ![Configure columns](/images/users-guide/DeviceManagement/devmgmt-grid-custom-columns.png)<br>
2. Browse through the list to find the property you want to display. You can filter the list by **Title**, **Key** and **Tags**. An arrow
   in the first column indicates that the property is a complex property. Click on the arrow to expand the list of its nested properties.
3. Check the radio button and the new column will be added and displayed in the device list.

#### By defining a custom property path {#by-defining-a-custom-path-property}

If the **Digital Twin Manager** application is not available on your tenant, you can still create custom columns by manually providing the path to the property you want to display.

1. In the **Configure columns** dropdown, click **Add custom column**.<br>
   ![Configure columns](/images/users-guide/DeviceManagement/devmgmt-device-list-custom-column.png)<br>
2. In the **Header** field, enter a header for the new custom column.
3. In the **Fragment path** field, enter the property of the device to be shown. Nested properties will be accepted. However, for nested properties its only possible to select {{< product-c8y-iot >}} standard fragments like `c8y_Mobile.mcc`.
4. Switch the **Add another column after saving this one** toggle to active to create another custom column right after saving the current one without leaving the dialog.
5. Click **Save**.

The new column will be added and displayed in the device list.

{{< c8y-admon-info >}}
While standard columns can only be shown/hidden as required, custom columns may be deleted permanently.
{{< /c8y-admon-info >}}
