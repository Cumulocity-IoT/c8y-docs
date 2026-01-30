---
weight: 100
title: Firmware
layout: bundle
sector:
  - device_management
---

The **Firmware** tab displays currently installed firmware of a device and allows users to install a different version. A device can have only one firmware installed at a time. It depends on the device, what a firmware can be in {{< product-c8y-iot >}}. Typical use cases are: operating system, microcontroller firmware or BIOS.

Firmware can be installed with a full installation or with a patch. Which variant is sent to the device depends on how the firmware was created in the firmware repository.

#### Installed firmware {#installed-firmware}

A device must announce its current state to the platform first. Then the installed firmware should be entered into the ```c8y_Firmware``` fragment into the device's own managed object. A device must upload its current state to {{< product-c8y-iot >}} during startup and any time a local change is detected. This includes cases where an update was triggered remotely.

```http
PUT /inventory/managedObjects/<deviceId>
```
```json
{
   "c8y_Firmware": {
       "name": "ubuntu core",
       "version": "20.04.2",
       "url": "http://test.com"
   }
}
```

| Field | DataType | Mandatory | Details |
|----|----|----|----|
|name|string|Yes|Name of the firmware package|
|version|string|Yes|A version identifier of the firmware|
|url|string|No|A URL pointing to the location where the firmware file was obtained from|

Similar to software the URL field is optional and may be omitted by devices.

**SmartREST example**

The 115 static template is available for devices to communicate their currently installed firmware state:

`115,ubuntu core,20.04.3,http://test.com`

### Installing a firmware image {#installing-a-firmware-image}

When a user selects a complete firmware image for installation, an operation with a similar ```c8y_Firmware``` fragment as found in the device managed object is created. This operation should be considered as the desired state that should be achieved by the device.

```json
{
   "c8y_Firmware": {
       "name": "ubuntu core",
       "version": "20.04.3",
       "url": "http://test.com"
   }
}
```

|Field|DataType|Mandatory|Details|
|----|----|----|----|
|name|string|Yes|Name of the firmware package|
|version|string|Yes|A version identifier of the firmware|
|url|string|Yes|A URL pointing to the location where the firmware file should be downloaded from|

The device is expected to perform the following actions:

1. Set operation status to EXECUTING
2. Install firmware image
3. Update the installed firmware state in the device’s own managed object
4. Set operation status to SUCCESSFUL

Updating a devices often changes fundamental system components. This operation should always be considered as a critical operation. The device must ensure that all of its connection parameters to {{< product-c8y-iot >}} are preserved through the upgrade and that connectivity can be resumed afterwards. We recommend you to make sure that the device uses an A/B firmware switching mechanism with a possibility to roll back if necessary.

**SmartREST example**

{{< product-c8y-iot >}} provides the 515 static response template to deal with installing firmware images:

1. Receive ```c8y_Firmware``` (image) operation <br>
  `515,DeviceSerial,ubuntu core,20.04.3,http://test.com`
2. Set operation status to EXECUTING <br>
  `501,c8y_Firmware`
3. Install firmware image
4. Update device’s installed firmware state in inventory <br>
  `115,ubuntu core,20.04.3,http://test.com`
5. Set operation status to SUCCESSFUL <br>
  `503,c8y_Firmware`

### Installing a firmware patch {#installing-a-firmware-patch}

In case a user selects a firmware patch to be installed on a device, a ```c8y_Firmware``` operation is created. In this case two additional parameters are included to help with installation of a firmware patch. The device agent is responsible for a firmware patch process instead of a regular installation.

```json
{
   "c8y_Firmware": {
       "name": "ubuntu core",
       "version": "20.04.4",
       "url": "http://test.com",
       "dependency": "20.04.3",
       "isPatch": true
   }
}
```

|Field|DataType|Mandatory|Details|
|----|----|----|----|
|name|string|Yes|Name of the firmware|
|version|string|Yes|A version identifier of the firmware|
|url|string|Yes|A URL pointing to the location of the firmware file|
|dependency|string|Yes|Version of the firmware the patch depends on|
|isPatch|boolean|Yes|Indicator showing that this firmware package is a patch|


The device is expected to perform the following actions:

1. Set operation status to EXECUTING
2. Verify if the currently installed firmware version is equal to the dependency version
3. Install firmware patch
4. Update the installed firmware state in the device’s own managed object
5. Set operation status to SUCCESSFUL

**SmartREST example**

{{< product-c8y-iot >}} provides the 525 static response template to deal with installing firmware patches. It works very similarly to the 515 template, it just adds the dependency parameter as fifth parameter. The fact that a patch instead of a complete image should be installed is implicit because this template is only triggered for patches.

1. Receive ```c8y_Firmware``` (patch) operation <br>
  `525,DeviceSerial,ubuntu core,20.04.3,http://test.com,20.04.3`
2. Set operation status to EXECUTING <br>
  `501,c8y_Firmware`
3. Verify if currently installed firmware version and dependency version match
4. Install firmware image
5. Update device’s installed firmware state in inventory<br>
  `115,ubuntu core,20.04.3,http://test.com`
6. Set operation status to SUCCESSFUL<br>
  `503,c8y_Firmware`

{{< c8y-admon-info >}}
If the URL is set to an empty string, no firmware file is uploaded or linked from the platform. In this case, the device is fully responsible for resolving the correct binary. If the device cannot resolve the binary, it must mark the operation as **FAILED**.

This option is useful if the device can retrieve the correct firmware file dynamically based on its environment, architecture, or internal logic.
{{< /c8y-admon-info >}}
