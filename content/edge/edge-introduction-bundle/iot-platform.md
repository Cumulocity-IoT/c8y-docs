---
weight: 40
title: Edge functionalities
layout: bundle
sector:
  - edge_server
---

Since Edge is based on the same software as the cloud-based {{< product-c8y-iot >}} platform version, the included applications are the same in both versions, with minor restrictions.

For general information about functionalities and features of {{< product-c8y-iot >}} platform, see [Get familiar with the UI](/get-familiar-with-the-ui/ui-introduction/).

Below you can find the links to the most common functionalities of {{< product-c8y-iot >}}.

### Device Management {#device-management}

The [Device Management application](/device-management-application/home-dashboard/) provides functionalities for managing and monitoring devices and enables you to control and troubleshoot devices remotely.

The following functionalities are available in Edge and described in detail in these sections:

|SECTION|CONTENT|
|:---|:---|
|[Registering devices](/device-management-application/registering-devices/)|How to [register one or more devices manually](/device-management-application/registering-devices/#single-device-registration) and how to [bulk-register devices](/device-management-application/registering-devices/#bulk-device-registration) in order to connect devices to your account.
|[Viewing all devices](/device-management-application/viewing-all-devices/)|What is displayed in the device list and how to sort devices by [filtering devices](/device-management-application/viewing-all-devices/#to-filter-devices).
|[Grouping devices](/device-management-application/grouping-devices/)|Why and how to group devices into top-level groups, subgroups and [smart groups](/device-management-application/grouping-devices/#using-smart-groups).
|[Viewing device details](/device-management-application/viewing-device-details/)|Detailed description of the various kind of  information available for various types of  devices.
|[Monitoring and controlling devices](/device-management-application/monitoring-and-controlling-devices/)|How to monitor the [connection quality](/device-management-application/monitoring-and-controlling-devices/#connection-monitoring) and [availability status](/device-management-application/monitoring-and-controlling-devices/#availability) of devices, how to handle [alarms](/device-management-application/monitoring-and-controlling-devices/#working-with-alarms) from devices, how to [remote control](/device-management-application/monitoring-and-controlling-devices/#working-with-operations) and how to [troubleshoot](/device-management-application/monitoring-and-controlling-devices/#troubleshooting-devices) devices.
|[Managing device services](/device-management-application/monitoring-device-services/)|How to monitor the data that your devices send about the services they are running. See detailed information about [measurements](/device-management-application/monitoring-device-services/#measurements), [events](/device-management-application/monitoring-device-services/#events) and [alarms](/device-management-application/monitoring-device-services/#alarms) sent for every service.
|[Managing device types](/device-management-application/managing-device-types/)|How to process data from various device types by using device protocols.
|[Managing device data](/device-management-application/managing-device-data/)|How to retrieve and manage [firmware](/device-management-application/managing-device-data/#managing-firmware) and [software](/device-management-application/managing-device-data/#managing-software) for devices; how to retrieve configuration data and store and manage it in a [configuration repository](/device-management-application/managing-device-data/#managing-configurations) as configuration snapshots.
|[SmartREST templates](/device-management-application/smartrest-templates/)|How to work with [SmartREST  templates](/device-management-application/smartrest-templates/), a collection of request and response templates used to convert CSV data and {{< product-c8y-iot >}} REST API calls.
|[Working with simulators](/device-management-application/working-with-simulators/)|[Create](/device-management-application/working-with-simulators/#to-create-a-simulator) a [simulator](/device-management-application/working-with-simulators/#about-simulators) with the same level of functionality as connected hardware devices and simulate messages (measurements, alarms, events and inventory) that the device sends to the {{< product-c8y-iot >}} platform with series of [instructions](/device-management-application/working-with-simulators/#instructions) that the simulator executes one after the other.
|[Connectivity](/device-management-application/connectivity/)|How to [set up your Jasper Control Center account](/device-management-application/connectivity/#setting-up-your-jasper-control-center-account), configure the [connectivity for the SIM provider](/device-management-application/connectivity/#configuring-the-connectivity-for-the-sim-provider) in your {{< product-c8y-iot >}} tenant, [link SIMs and mobile devices](/device-management-application/connectivity/#linking-sims-and-mobile-devices), and [checking connectivity](/device-management-application/connectivity/#checking-connectivity).

### Cockpit {#cockpit}

The [Cockpit application](/cockpit/cockpit-introduction/) provides you with options to manage and monitor  Internet of Things (IoT) assets and data from a business perspective.

The following functionalities are available in Edge and described in detail in these sections:

|Section|Content|
|:---|:---|
|[Managing assets](/cockpit/managing-assets/)|Organize assets in [hierarchies](/cockpit/managing-assets/#asset-hierarchy) by [creating groups](/cockpit/managing-assets/#to-add-a-group) and [assigning devices](/cockpit/managing-assets/#to-assign-devices-to-a-group).
|[Data Explorer](/cockpit/data-explorer/)|Interactively explore, compare and visualize IoT data. <br> Describes how to access and use the [data explorer](/cockpit/data-explorer/), [add data points](/cockpit/data-explorer/#to-add-a-data-point) to the data explorer, [customize data point properties](/cockpit/data-explorer/#to-customize-data-point-properties), [modify the visualization](/cockpit/data-explorer/#changing-visualization), store the [data explorer as widget](/cockpit/data-explorer/#creating-widgets), and [export](/cockpit/data-explorer/#to-export-measurement-data) the data.
|[Working with dashboards](/cockpit/working-with-dashboards/)|[Create your own analytics and monitor pages](/cockpit/working-with-dashboards/#to-create-a-dashboard) by adding and arranging [widgets](/cockpit/using-widgets/). [Share dashboards](/cockpit/working-with-dashboards/#dashboard-template) among all devices of the same type.
|[Working with reports](/cockpit/working-with-reports/)|Handle [reports](/cockpit/working-with-reports/) based on dashboard layouts, create [reports for exporting data](/cockpit/working-with-reports/#to-create-a-report) in CSV or excel format and [schedule the export](/cockpit/managing-exports/#to-schedule-an-export).
|[Using widgets in dashboards and reports](/cockpit/using-widgets/)|Widgets can display maps, images, graphs, tables and other graphic representations of data. [Add a widget to a dashboard or a report](/cockpit/using-widgets/#to-add-a-widget-to-a-dashboard-or-a-report), [modify](/cockpit/using-widgets/#modifying-widgets) widgets, and [add assets to a new or existing widget](/cockpit/using-widgets/#to-add-an-asset-to-a-new-or-existing-widget).
|[Widgets collection](/cockpit/widgets-collection/)|Use various types of [widgets](/cockpit/using-widgets/) from the Widgets collection that comes with Edge and configure them according your needs.
|[Managing exports](/cockpit/managing-exports/)|[Export data](/cockpit/managing-exports/#to-export-data) to either CSV or Excel files. [Add](/cockpit/managing-exports/#to-add-an-export) and [schedule](/cockpit/managing-exports/#to-schedule-an-export) an export to a CSV or XLSX file to any point in time.
|[Data point library](/cockpit/data-point-library/)|Manage default settings ("profiles") of your devices and apply them automatically using the [Data point library](/cockpit/data-point-library/).
|[Smart Rules](/cockpit/smart-rules/)|[Create and manage business rules](/cockpit/smart-rules/#to-create-a-smart-rule) to work on incoming data in realtime and to perform actions based on this data.
|[Smart Rules collection](/cockpit/smart-rules-collection/)|Use pre-defined [global Smart Rules](/cockpit/smart-rules-collection/) to configure rules for geofencing, thresholds or alarm escalation and notifications (SMS/email). Describes each smart rule and its configurable parameters in detail.
|[Configuring Cockpit applications](/cockpit/cockpit-configuration/)|[Configure custom Cockpit applications](/cockpit/cockpit-configuration/#to-configure-a-custom-cockpit-application) according to your individual needs.

### Administration {#administration}

The [Administration application](/standard-tenant/standard-tenant-introduction/) enables account administrators to manage their users, roles, tenants and applications and lets them configure a number of settings for their account.

The following functionalities are available in Edge and described in detail in these sections:

|SECTION|CONTENT|
|:---|:---|
|[Configuring Edge](/edge/edge-configuration/)|Providing information on Edge specific configuration options.
|[Home screen](/standard-tenant/home-screen/)|Providing information on your capacity usage and subscribed applications.
|[Managing users](/standard-tenant/managing-users/)|How to [add users](/standard-tenant/managing-users/#to-add-a-user), edit, disable or delete them.
|[Managing permissions](/standard-tenant/managing-permissions/)|How to create and edit [global roles](/standard-tenant/managing-permissions/#global-roles) and [inventory roles](/standard-tenant/managing-permissions/#inventory-roles), how to assign them to users, and how to [grant application access](/standard-tenant/managing-permissions/#application-access).
|[Managing applications](/standard-tenant/ecosystem/)|How to manage and [configure own applications](/standard-tenant/ecosystem/#managing-applications) in your Edge account.
|[Audit logs](/standard-tenant/audit-logs/)|How to [view](/standard-tenant/audit-logs/#to-view-audit-logs) and [filter](/standard-tenant/audit-logs/#to-filter-logs) audit logs that show security-relevant operations that have been processed by a user. See the different [audit log types](/standard-tenant/audit-logs/#audit-log-types) for more information.
|[Alarm mapping](/standard-tenant/alarm-mapping/)|Change the severity and text of alarms to adapt them to your business priorities.
|[Managing data](/standard-tenant/managing-data/)|How to manage and configure [retention rules](/standard-tenant/managing-data/#retention-rules) for your data and how to [manage stored files](/standard-tenant/managing-data/#file-repository) in the file repository.
|[Changing settings](/standard-tenant/changing-settings/)|How to change account settings like [application settings](/standard-tenant/changing-settings/#application), manage the [properties library](/standard-tenant/changing-settings/#properties-library), enable [SMS provider](/standard-tenant/changing-settings/#sms-provider) features like user notifications and two-factor authentication, and [manage credentials for different providers](/standard-tenant/changing-settings/#connectivity).
