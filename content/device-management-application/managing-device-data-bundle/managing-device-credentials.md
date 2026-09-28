---
weight: 50
title: Managing device credentials
layout: redirect
helpcontent:
- label: managing-device-credentials
  title: Device credentials
  content: "Manage the device credentials that have been generated for your connected devices. Edit, disable, or delete device credentials as required or modify its permissions in the **Global roles** field."
---

The **Device credentials** page lists all credentials that have been generated for your connected devices. Each device that has been [registered](/device-management-application/registering-devices) shows up here with the naming convention "device_&lt;id&gt;".

![Device credentials](/images/users-guide/DeviceManagement/devmgmt-device-credentials.png)

### To manage permissions for a device {#to-manage-permissions-for-a-device}

1. Click the arrow in the **Global roles** column of a device to open a list with available global roles.
2. Assign or remove permissions for an individual device by selecting/deselecting roles.
3. Click **Apply**.

The roles for the device will be updated accordingly.

### To edit device details {#to-edit-device-details}

1. Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of a device credentials entry and then click **Edit** to open the device details.

2. In the details page, you may disable/enable a device by clicking the **Active** toggle, or assign or remove permissions by selecting/deselecting roles in the **Global roles** list.

	![Device credentials details](/images/users-guide/DeviceManagement/devmgmt-device-credentials-details.png)

3. Click **Save**.

The device details will be updated accordingly.

### To disable device credentials {#to-disable-device-credentials}

Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of a device credentials entry and then click **Disable**.

The device credentials will be temporarily disabled.

### To delete device credentials {#to-delete-device-credentials}

Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of a device credentials entry and then click **Delete**.

The device credentials will be permanently deleted.

Deleting device credentials might be required if you have carried out a factory reset on a device. In this case, the device will often loose its assigned credentials. Delete the device credentials and continue with the normal [registration process](/device-management-application/registering-devices) to re-register the device.
