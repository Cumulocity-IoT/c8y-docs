---
weight: 10
title: Introduction
layout: bundle
sector:
  - device_management
---

The device integrator library defines the data structures that are used in {{< product-c8y-iot >}} for device management activities like, for example, software management and configuration management. The data structures are expressed as fragments that can be used inside managed objects, operations and other resources. More information on the fragment concept can be found in [{{< product-c8y-iot >}} domain model](/concepts/domain-model/).

In the following section you will find descriptions of the most important functionalities of a device, its managed objects and all its corresponding fragments to them. We will explain the relationship between the {{< product-c8y-iot >}} UI, the device object managed in our databases and what is being communicated to and from the device itself.

If you are interested in details on exposing the {{< product-c8y-iot >}}´s functionalities through our REST API, see the [{{< openapi >}}](https://{{< domain-c8y >}}/api/core/) for further information.

Moreover, see [SmartREST](/smartrest/smartrest-two) for more information on SmartREST and a complete list of all SmartREST templates mentioned throughout the following sections.

To start with device management, open the **All devices** tab in the **Devices** menu of the Device Management application. Click on a device in the list to open the device details of this particular device. You will see various tabs and particular information on each of them.

{{< c8y-admon-info >}}
For a detailed explanation of each tab and its related configuration via the UI, see also [Device Management application > Viewing device details](/device-management-application/viewing-device-details).
{{< /c8y-admon-info >}}

![Device details](/images/reference-guide/device-details.png)

This list can be manipulated through the device fragments, that means, which tabs are shown depends on the capability the device supports. This is mainly operated by one fragment called ```c8y_SupportedOperations```. Based on what is put in the array of this fragment, functionality such as tabs, buttons, and so on are enabled. For example if the ```c8y_SupportedOperations``` fragment contains ```c8y_Firmware```, the firmware tab will be visible in the **Device details** page and the device can manage firmware objects.

#### c8y_SupportedOperations fragments {#c8ysupportedoperations-fragments}

The following fragments can be added to the ```c8y_SupportedOperations``` fragment:

<table>
<colgroup>
<col width="25%">
<col width="75%">
</colgroup>
<thead>
<tr>
<th>Fragment</th>
<th>Definition</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="#device-info">c8y_Availability</a></td>
<td>Holds information about the device's status and its availability</td>
</tr>
<tr>
<td><a href="#reference">c8y_Command</a></td>
<td>Allows the user to carry out interactive sessions with a device</td>
</tr>
<tr>
<td><a href="#configuration">c8y_Configuration</a></td>
<td>Contains the complete configuration state of the device including all control characters</td>
</tr>
<tr>
<td><a href="#legacy-file-based-configuration">c8y_ConfigurationDump</a></td>
<td>Permits managing binary configuration files of the device</td>
</tr>
<tr>
<td><a href="#device-profile">c8y_DeviceProfile</a></td>
<td>Enables device profile functionality for a device</td>
</tr>
<tr>
<td><a href="#install-legacy-configuration">c8y_DownloadConfigFile</a></td>
<td>Permits the download of configuration files as binaries</td>
</tr>
<tr>
<td><a href="#firmware">c8y_Firmware</a></td>
<td>Contains information about a device's firmware</td>
</tr>
<tr>
<td><a href="#hardware-information">c8y_Hardware</a></td>
<td>Contains basic hardware information for a device, such as make and serial number</td>
</tr>
<tr>
<td><a href="#logs">c8y_LogfileRequest</a></td>
<td>Requests a device to send a log file and view the log file in the log viewer</td>
</tr>
<tr>
<td><a href="#measurement-request">c8y_MeasurementRequestOperation</a></td>
<td>Displays a "Get measurements" action in the device action menu that sends an operation for triggering a manual status update of a device.</td>
</tr>
<tr>
<td><a href="#connectivity">c8y_Mobile</a></td>
<td>Holds basic connectivity-related information, such as the equipment identifier of the modem (IMEI) in the device or the SIM card (for example ICCID)</td>
</tr>
<tr>
<td><a href="#network">c8y_Network</a></td>
<td>Sends data to the <strong>Network</strong> tab in the Device Management application and displays the network information</td>
</tr>
<tr>
<td><a href="#tracking">c8y_Position</a></td>
<td>Reports the geographical location of an asset in terms of latitude, longitude and altitude</td>
</tr>
<tr>
<td><a href="#device-profile">c8y_Profile</a></td>
<td>Announces the target profile</td>
</tr>
<tr>
<td><a href="#device-restart">c8y_Restart</a></td>
<td>Restarts a device</td>
</tr>
<tr>
<td><a href="#relay">c8y_Relay</a></td>
<td>Enables switching device relay</td>
</tr>
<tr>
<td><a href="#multiple-relays">c8y_RelayArray</a></td>
<td>Enables switching device relays in the array</td>
</tr>
<tr>
<td><a href="#upload-current-text-configuration">c8y_SendConfiguration</a></td>
<td>Allows reloading a configuration through the user interface</td>
</tr>
<tr>
<td><a href="#installed-software">c8y_SoftwareList</a></td>
<td>Contains the entire list of software that is installed on the device</td>
</tr>
<tr>
<td><a href="#software-update">c8y_SoftwareUpdate</a></td>
<td>Contains a list of software to be installed or uninstalled</td>
</tr>
<tr>
<td><a href="#upload-current-legacy-configuration">c8y_UploadConfigFile</a></td>
<td>Permits the upload of configuration files as binaries</td>
</tr>
</tbody>
</table>
