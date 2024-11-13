---
weight: 30
title: First steps with Cumulocity IoT
layout: bundle
sector:
  - getting_started
---

The following section highlights the basic steps to take if you are new to the {{< product-c8y-iot >}} platform.

If you are technically interested in our IoT platform, you might want to learn about the architecture, technical concepts and domain models behind {{< product-c8y-iot >}} described in [Technical concepts](/concepts/concepts-introduction/).


### Step 1: Logging into {{< product-c8y-iot >}} for the first time

To log in to the {{< product-c8y-iot >}} platform and access your tenant, use the following URL:

```http
https://<tenant-domain>.{{< domain-c8y >}}/
```
This will direct you to the Login screen of your default application.

On the Login screen, enter your username and password.


Click **Login** to enter the {{< product-c8y-iot >}} platform. Initially, you will be taken to the [Cockpit](/cockpit/cockpit-introduction/) application, if not configured differently. For further information about the {{< product-c8y-iot >}} standard applications see [Available applications](/get-familiar-with-the-ui/available-applications/).

![{{< product-c8y-iot >}} application](/images/users-guide/getting-started/getting-started-screen-ui-elements.png)

Go to [Accessing and logging into the platform](/get-familiar-with-the-ui/platform-access/) for more details on supported URLs, password reset, and more.

### Step 2: Learn about {{< product-c8y-iot >}}'s basic UI functionalities and features

#### Main screen elements

All {{< product-c8y-iot >}} applications share a common structure and include the following screen elements:

![{{< product-c8y-iot >}} application](/images/users-guide/getting-started/getting-started-screen-ui-elements.png)

On the left you have the navigator, which shows a list of entries leading to various pages of the application. The entries are grouped into menus and menu items.
In the middle you find the content of the actual page which has been selected in the navigator.
On the top you find the page title at the left. At the right you find various action buttons. Click the **Search** button <i class="dlt-c8y-icon-search icon-20"></i> to enter text for a full-text search. The  **Application Switcher** button <i class="dlt-c8y-icon-app-switcher icon-20"></i> allows you to quickly switch between all available applications. Clicking the **User** button <img class="Default" src="/images/icons/user-icon.png" alt="User" style="display: inline-block; margin:0;"> at the right opens a context menu with details on your [account settings](#account-settings), as described below.

See [UI functionalities and features](/get-familiar-with-the-ui/gui-features/) for more information on all {{< product-c8y-iot >}}'s UI features.


#### Account settings {#account-settings}

The user menu provides access to the following actions or information:

<img src="/images/users-guide/getting-started/getting-started-user-account-menu.png" alt="User account menu"  style="max-width: 60%">

Click **User settings** to change account settings such as your password. Under **UI settings**, change the language of the UI. **Platform info** shows release information on the {{< product-c8y-iot >}} versions you are using. Moreover you find links to the product support and user documentation at the bottom.

See [User options and settings](/get-familiar-with-the-ui/user-settings/) for detailed information.

### Step 3: Register a device

To connect a device to {{< product-c8y-iot >}}, you must register it in the platform. This is done in the **Device Management application**. Under [Registering devices](/device-management-application/registering-devices/) you find a detailed description of the general registration process.

Moreover, we offer two step-by-step descriptions to easily register a first device to your {{< product-c8y-iot >}} account:

* Connect a smartphone to {{< product-c8y-iot >}} using the [{{< sensor-app >}}](/sensor-app/sensorapp-introduction/). The {{< sensor-app >}} is a free smartphone application available for iOS and Android smartphones.
* Connect a [Raspberry Pi as demo device using thin.edge.io](/device-integration/device-integration-thin-edge/#thin-edgeio-on-a-device). The Raspberry Pi is a relatively simple and cheap yet powerful device. This makes it ideal for testing and trying out as well as some production use cases.

For the purpose of this tutorial, we will register a device via the {{< sensor-app >}}.

#### Connecting a smartphone with the {{< sensor-app >}}

The {{< sensor-app >}} is designed to collect measurements from your smartphone, nearby Bluetooth device sensors, and vehicle On-board Debug (OBD) sensors, and send them to the {{< product-c8y-iot >}} platform. The {{< sensor-app >}} can also send commands to the smartphone directly from the phone dashboard.

Go to [Sensor App](/sensor-app/sensorapp-introduction/) to see which smartphone sensors and Bluetooth devices are currently supported as well as more information on [how to install the app](/sensor-app/installing-the-sensor-app/) available for iOS and Android.

Open the Apple App Store or Google Play Store from your smartphone and search for **{{< sensor-app >}}** to install it.

To connect your smartphone via QR code follow the instructions below:

1.  On a desktop or laptop computer, open a web browser and log in to your {{< product-c8y-iot >}} tenant. From the Cockpit application, click **Connect Smartphone** in the right drawer or in the Welcome widget.

    ![Cockpit application](/images/users-guide/csa/csa-connect-smartphone-right-drawer.png)

2.  Follow the instructions in the wizard to step 3, ensuring that the app is installed on the smartphone.

    ![QR code](/images/users-guide/csa/csa-connect-smartphone-wizard-step3.png)

3.  From your smartphone, launch the app and tap **Register** in the top right corner of the screen. 

    ![Register smartphone](/images/users-guide/getting-started/getting-started-register-smartphone.png)

4.  Grant access to your camera if the app asks you for permission.
5.  Scan the QR code shown on your PC's web browser. If you cannot scan the QR code, tap **Manual registration** on your smartphone and fill in the details at the right side of the wizard screen.
6.  Back on your smartphone, tap **Done**. Your smartphone is automatically registered by {{< product-c8y-iot >}} and assigned to the "Phones" group.

    ![Register smartphone done](/images/users-guide/getting-started/getting-started-register-smartphone-done.png)

7. On the platform, click the **Open dashboard** button to view the dashboard that has been automatically created with your device.

    ![Register smartphone done](/images/users-guide/getting-started/getting-started-open-dashboard-done.png)


You have connected your smartphone with the {{< sensor-app >}}. For details on how the app sends information to {{< product-c8y-iot >}} go to [Sending sensor data to the platform](/sensor-app/sending-sensor-data/). For information on how to view sensor data go to [Viewing sensor data](/sensor-app/viewing-sensor-data/).

Next, you will learn how to customize the dashboard for your smartphone.

### Step 4: Customize a dashboard

Switch to the Cockpit application via the application switcher <img class="Default" src="/images/icons/switcher-icon.png" alt="Search" style="display: inline-block; margin:0"> at the top right.

The Cockpit application in {{< product-c8y-iot >}} provides you with an unrestrained overview and the essential dashboards to monitor your IoT data according to your needs.

On registering a device in the last step, a dashboard has automatically been created which can now be edited and designed individually according to your needs. You can add, remove or change widgets being displayed here allowing you to visualize data emanating from your device or devices. For details on each widget type refer to [Widgets collection](/cockpit/widgets-collection/).

Follow the instructions below to customize the new dashboard of the device you registered in the previous step.

1. In the Cockpit application, select the device you created in the previous step (for example, your smartphone in the **Phones** group). Click the **SensorTag Dashboard** tab.
2. Click **Edit** in the top menu bar to open the editor.

![Customize dashboard](/images/users-guide/getting-started/getting-started-tutorial-dashboard-customize.png)

3. In the dashboard editor, provide the following information like in the image below:

    * In the **General** section, change the menu label to "Phone SensorTag Dashboard".
    * In the **Layout** section, change the theme to "Dark" and set the header style to "Border".
<br><br>


  ![Dashboard editor](/images/users-guide/getting-started/getting-started-customize-dashboard.png)

4. In the **Preview** section at the right, a preview of the selected layout settings is immediately displayed to visualize your selections.

5. Click **Save** to save your modifications.

You have successfully customized your first dashboard.

![Dashboard editor result](/images/users-guide/getting-started/getting-started-customize-dashboard-result.png)

See [Working with dashboards](/cockpit/working-with-dashboards/) for more details on how to create, share, edit, copy, and delete dashboards.

Next, we will show you how to create a report to track data.

### Step 5: Create a report

Reports enable you to track applications, alarms, assets, and other data in a dashboard layout. Reports are global dashboard pages, regardless of the [asset hierarchy](/cockpit/managing-assets/#asset-hierarchy). To work with reports, check if you meet the [requirements](/cockpit/reports/) first.

To create a report click **Reports** in the **Navigator** on the left side and following the steps below.

#### Creating a report

![Reports](/images/users-guide/getting-started/getting-started-add-a-new-report.png)

1. Click the **Add report** button to open the **Add report** dialog window.
2. In the **Menu label** field, enter a name for the report. For this tutorial name the report "Smartphone Measurements" and optionally provide a description below.
3. You can display the report in the navigator with the option **Show in navigator** but we will leave that unchecked in this tutorial.
4. In the **Layout** section, change the theme to "Branded" and set the header style to "Border". In the **Preview** section at the right, a preview of the selected layout settings is immediately displayed to visualize your selections.

![Add new report](/images/users-guide/getting-started/getting-started-add-new-report.png)

5. Click **Save** to create the report and add it to the report list.

![Report created](/images/users-guide/getting-started/getting-started-report-created.png)

You have successfully created a report. See [Working with reports](/cockpit/working-with-reports/) for more details on how to add, edit and delete reports.

Next, we will add a widget to the report.

### Step 6: Add a widget to a report

Widgets can display maps, images, graphs, tables and other graphic representations of data. Widgets are useful to track information, for example on alarms, assets or applications, or provide maps, quick links and more in dashboards or reports.  Go to [Widgets collection](/cockpit/widgets-collection/) to see a list of all preset widgets that {{< product-c8y-iot >}} provides.

{{< c8y-admon-info >}}
You can also develop your own widgets and add them to your {{< product-c8y-iot >}} account. Refer to the [{{< sag-dev-community >}}]({{< link-sag-tech-forum >}}) for more information.
{{< /c8y-admon-info >}}

#### To add a widget to a dashboard or a report

1. Click the **Add widget** button on the main page of the report you have created in the previous step, or click **Add widget** in the top menu bar.

![Add widget](/images/users-guide/getting-started/getting-started-add-widget-to-report.png)

2. In the **Add widget** dialog, select the Map widget type.

3. Next, configure the widget. In the **Asset selection** section, select the Phones group and next select the device that was registered in a previous step "Smartphone Tutorial". Give it the **Title** "Smartphone Location" and set the **Zoom level** to 8.

![Widget configuration](/images/users-guide/getting-started/getting-started-add-widget-to-report-config.png)

4. In the **Appearence** tab, set the **Theme** to "Light".

5.  Click **Save** to add the widget to the report.

![Widget added on report](/images/users-guide/getting-started/getting-started-add-widget-to-report-done.png)

You have added a map widget to your report. Similarly, you can add widgets to dashboards.

For more details on adding widgets on dashboards or reports see [Using widgets in dashboards and reports](/cockpit/using-widgets/).
