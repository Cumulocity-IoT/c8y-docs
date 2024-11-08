---
weight: 60
title: Managing device data
layout: bundle
outputs:
  - html
  - json
sector:
  - device_management
---

{{< c8y-admon-related >}}
* [Device management & connectivity > Device integration > Fragment library > Firmware](/device-integration/fragment-library/#firmware) for details on the `c8y_Firmware` fragment used in managed objects.
* [Device management & connectivity > Device integration > Fragment library > Software](/device-integration/fragment-library/#software) for details on legacy software management via the `c8y_SoftwareList` fragment, software updates via the `c8y_SoftwareUpdate` fragment and advanced software management via the `c8y_SupportedOperations` and `c8y_SupportedSoftwareTypes` fragments used in managed objects.
* [Device management & connectivity > Device integration > Fragment library > Configuration](/device-integration/fragment-library/#configuration) for details on text-based configuration, file-based configuration and typed file-based configuration.
* The [device credentials API](https://{{< domain-c8y >}}/api/core/#tag/Device-credentials) for REST API methods concerning device credentials.
* [Device management & connectivity > Device integration > Fragment library > Device profile](/device-integration/fragment-library/#device-profile) for details on the `c8y_DeviceProfile` fragment used in managed objects.
* [Device management & connectivity > Device integration > Device integration using MQTT > Device certificates](/device-integration/mqtt/#device-certificates) for information on device certificates in the context of MQTT.
{{< /c8y-admon-related >}}

The Device Management application provides features that support you in efficiently managing your devices.
They are accessible through the **Management** menu in the navigator:

![Management menu](/images/users-guide/DeviceManagement/devmgmt-management-menu.png)
