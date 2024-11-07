---
weight: 20
title: Managing software remotely
layout: redirect
---

You can remotely manage the **applications**, **microservices** and **extensions** installed on Edge using the {{< product-c8y-iot >}} [advanced software management](/device-integration/fragment-library/#advanced-software-management) feature. This process requires you to first upload an application, microservice or extension to the software repository before installing them. For more information on uploading items to the software repository, see [To add a new software or software version](/device-management-application/managing-device-data/#to-add-a-new-software-or-software-version). For more information about the software management feature in general, see [Managing device software](/device-management-application/managing-device-data/#managing-software).

{{< c8y-admon-important >}}
To use the {{< product-c8y-iot >}} [advanced software management](/device-integration/fragment-library/#advanced-software-management) feature, your {{< product-c8y-iot >}} cloud tenant's subscription plan must include the _advanced-software-mgmt_ microservice.
{{< /c8y-admon-important >}}

- Applications - You need a {{< product-c8y-iot >}} application, see [Web SDK](/web/introduction/) for details. Upload the application zip to the software repository with the software type _c8yedge_application_
- Microservices - You need a microservice, see [Microservice SDK](/microservice-sdk/microservice-sdk-introduction/) for details. Upload the microservice zip to the software repository with the software type _c8yedge_microservice_
- Extensions - You need either a widget or plugin, see [Micro frontends](/2024/web/microfrontends/) for details. Upload the extension zip to the software repository with the software type _c8yedge_extension_

{{< c8y-admon-info >}}
When using the remote software management feature, the manifest for applications, microservices and extensions must contain a _name_, _key_, _version_ and _contextPath_. These values are used when installing the software rather than using the name and version from the software repository. The name and version from the manifest are also listed on the devices **Software** tab when installed.
{{< /c8y-admon-info >}}

### Installing software {#installing-software}
1. Navigate to your Edge device's **Software** tab. The **Software** tab lists your installed applications, microservices and extensions. Click **Install software**. The **Install software** dialog lists the software from the software repository which matches Edge's supported types of _c8yedge_application_, _c8yedge_microservice_ and _c8yedge_extension_.
2. Select one or multiple software items.
3. Click **Install**.
4. Under **Software changes** on the right, review your planned changes and confirm the software update operation by clicking **Apply changes**.

The install operation will be created and executed on the device. The software installation is completed when the device has installed the software.

{{< c8y-admon-info >}}
Applications and microservices will be installed and subscribed to on your 'edge' tenant but extensions will only be installed.
{{< /c8y-admon-info >}}

### Updating software {#updating-software}
To update software on your Edge device, hover over the software item which you want to update and click **Update**. Select a version from the list and click **Update** again. The software will be updated with the selected version.

The update operation will be created and executed on the device. The software update is completed when the device has updated the software.

### Removing software {#removing-software}
To remove software on your Edge device, hover over the software item which you want to remove and click the remove icon.

The remove operation will be created and executed on the device. The software removal is completed when the device has removed the software.
