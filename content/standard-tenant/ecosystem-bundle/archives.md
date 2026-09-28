---
title: Uploading archives
layout: bundle
weight: 60
sector:
  - platform_administration
---

For custom applications, multiple file versions can be stored in {{< product-c8y-iot >}} when they were created by uploading either a ZIP file or a MON file. Each version is called an archive. You can upload different versions at the same time and switch between these versions.

### To upload an archive {#to-upload-an-archive}

1. Open the application properties for the respective application by clicking on it.
2. Click the plus button at the bottom of the **Activity log** section and browse for the archive in your file system or simply drop the archive file.
3. Click **Upload** to upload the archive to your {{< product-c8y-iot >}} account.

<img src="/images/users-guide/Administration/admin-application-archive.png" alt="Application archive">

Once uploaded, the recently uploaded version is automatically the active version, that is the version of the application that is currently being served to the users of your account. This version cannot be deleted.

{{< c8y-admon-info >}}
The archive functionality is not available for subscribed applications, as only the owner of the application can perform these actions.
{{< /c8y-admon-info >}}

### To restore an older application version {#to-restore-an-older-application-version}

Users can restore previous versions of an application from an archive.

1. Open the application properties for the respective application by clicking on it.
2. In the **Activity log** section, open the context menu for the desired version by clicking the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> and select **Set as active** to make it the active version.

### To reactivate a single application {#to-reactivate-a-single-application}

If a hosted application is not deployed correctly, users may reactivate it.

1. Open the application properties for the respective application by clicking on it.
3. In the **Activity log** section, open the context menu for the desired version by clicking the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> and select **Reactivate archive**.

The selected application will be reactivated by removing the respective files from the application directory and unpacking the web application package again.
