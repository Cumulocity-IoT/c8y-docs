---
weight: 50
title: Configuration
layout: bundle
sector:
  - device_management
---

The **Configuration** tab allows three different formats for device configuration:

* Text-based configuration
* Legacy file-based configuration
* Typed file-based configuration

They all follow a similar concept where the device may upload its current configuration to the platform and users may install a new configuration on the device.
This tab appears for devices when they announce support for any of the available formats.

### Text-based configuration {#text-based-configuration}

The most basic form of configuration is a simple text-based configuration. Here the configuration is stored and transferred directly as string. We recommend you to use this form for small human readable configuration files only, for example, for microcontroller-based devices.

The current configuration state of the device is communicated with the ```c8y_Configuration``` fragment in the device’s own managed object. It contains the complete configuration including all control characters as a string. Special care must be taken that encoding is performed properly. {{< product-c8y-iot >}} supports UTF-8 characters, additionally escaping according to the [JSON specification](https://www.json.org/json-en.html) for JSON payloads, or the [SmartREST specification](/smartrest/smartrest-one/#data-format) for SmartREST payloads may be required.

We recommend you to upload the current configuration only on demand to save transfer data volume and device resources. There are specific operations designed to trigger a device to upload its current configuration to the platform documented below.

```http
PUT /inventory/managedObjects/<deviceId>
```
```json
{
   "c8y_Configuration": {
       "config": "c8y.url.http=https://management.cumulocity.com\nc8y.url.mqtt=mqtt.cumulocity.com\n"
   }
}
```

|Name|Type|Mandatory|Description|
|----|----|----|----|
|config|string|No|Complete configuration text to be applied by the device|

#### Upload current text configuration {#upload-current-text-configuration}

For devices that include ```c8y_SendConfiguration``` in their ```c8y_SupportedOperations``` the **Configuration** tab offers a button to trigger a configuration upload from the device to {{< product-c8y-iot >}}. When the button is clicked a ```c8y_SendConfiguration``` is created.

```json
{
   "c8y_SendConfiguration": {}
}
```

<table>
<colgroup>
<col width="20%">
<col width="10%">
<col width="10%">
<col width="60%">
</colgroup>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Mandatory</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>c8y_SendConfiguration</td>
<td>object</td>
<td>Yes</td>
<td>Send configuration marker object designating the operation as a command to trigger the device to upload its configuration</td>
</tr>
</tbody>
</table>

The device is expected to perform the following actions:
1. Set operation status to EXECUTING
2. Upload the current configuration to its own managed object using the ```c8y_Configuration``` fragment
3. Set operation status to SUCCESSFUL

**SmartREST example**

There is no built-in static response template available for the ```c8y_SendConfiguration``` operation. Devices must create a custom template to implement this capability. Here is an example how such a template and its use could work.

Template creation:<br>
`11,100,,c8y_SendConfiguration,deviceId`

Receiving the operation:

1. Receive the ```c8y_SendConfiguration``` operation using the custom template created above <br>
  `100,DeviceSerial,4801`
2. Set operation status to EXECUTING
  `501,c8y_SendConfiguration`
3. Upload the current configuration state using the 113 static template
  `113,"c8y.url.http=https://management.cumulocity.com\nc8y.url.mqtt=mqtt.cumulocity.com\n"`
4. Set operation status to SUCCESSFUL
  `503,c8y_SendConfiguration`

#### Install text configuration {#install-text-configuration}

Devices that support installing configuration can communicate this by adding ```c8y_Configuration``` to their ```c8y_SupportedOperations```. Then the **Configuration** tab will offer a button to send a user configured configuration to the device. This action consequently creates a ```c8y_Configuration``` operation with the same fragment signature as found in the device’s managed object.

The device is expected to perform the following actions:

1. Set operation status to EXECUTING
2. Install and apply configuration as included in the nested config property with the ```c8y_Configuration``` fragment
3. Update the ```c8y_Configuration``` fragment in the device’s managed object
4. Set operation status to SUCCESSFUL

**SmartREST example**

The 513 static response template is available to receive ```c8y_Configuration``` operations:

1. Receive ```c8y_Configuration``` operation <br>
  `513,DeviceSerial,"c8y.url.http=https://management.cumulocity.com\nc8y.url.mqtt=mqtt.cumulocity.com\n"`
2. Set operation status to EXECUTING <br>
  `501,c8y_Configuration`
3. Install and apply configuration as included
4. Update the ```c8y_Configuration``` fragment<br>
  `113,"c8y.url.http=https://management.cumulocity.com\nc8y.url.mqtt=mqtt.cumulocity.com\n"`
5. Set operation status to SUCCESSFUL<br>
  `503,c8y_Configuration`

### Legacy file-based configuration {#legacy-file-based-configuration}

Devices that want to manage configuration as files can achieve a basic form using legacy file-based configuration. For new device integrations we recommend you to implement typed file-based configuration instead because it is more versatile.

This approach stores and transfers configuration as binary files.

{{< c8y-admon-info >}}
This mechanism only works with the internal {{< product-c8y-iot >}} repository. Be aware that configurations with external URLs will not be supported if a device only supports legacy configuration. The ID which is stored in the device managed object (an example can be seen below) always refers to an internal binary saved in the inventory.
{{< /c8y-admon-info >}}

#### Upload current legacy configuration {#upload-current-legacy-configuration}

Devices may signal their support for uploading their current configuration to {{< product-c8y-iot >}} by adding ```c8y_UploadConfigFile``` to their ```c8y_SupportedOperations```. This enables a **Get snapshot from device** button in the **Configuration** tab. Clicking it generates a ```c8y_UploadConfigFile``` operation for the device.

```json
{
   "c8y_UploadConfigFile": {}
}
```

<table>
<colgroup>
<col width="20%">
<col width="10%">
<col width="10%">
<col width="60%">
</colgroup>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Mandatory</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>c8y_ UploadConfigFile</td>
<td>object</td>
<td>Yes</td>
<td>Upload configuration file marker object designating the operation as a command to trigger the device to upload its configuration file</td>
</tr>
</tbody>
</table>

When uploading its configuration, the device must first upload the configuration file into {{< product-c8y-iot >}} inventory binaries, and then create a configuration repository entry as a managed object of type ```c8y_ConfigurationDump``` in the inventory. This object must then contain a link to the just uploaded file. We recommend you to create this entry with an easily recognizable name and description that allows users to find the desired configuration in the repository.

```http
POST /inventory/managedObjects
```
```json
{
   "name": "myDevice configuration",
   "description": "Uploaded by myDevice on 2021-09-15T12:00:00+0200",
   "url": "https://demos.cumulocity.com/inventory/binaries/154702",
   "type": "c8y_ConfigurationDump"
}
```

|Name|Type|Mandatory|Description|
|----|----|----|----|
|name|string|Yes|Name of the configuration|
|description|string|No|Description of the configuration|
|url|string|Yes|URL where the configuration file was uploaded to|
|type|string|Yes|Type of the configuration repository entry object; must always be "c8y_ConfigurationDump"|

The device is expected to perform the following actions:

1. Set operation status to EXECUTING
2. Upload the configuration file into {{< product-c8y-iot >}} inventory binaries
3. Create a configuration repository entry
4. Set the operation status to SUCCESSFUL

**SmartREST example**

The 520 static response template is available for this functionality:

1. Receive ```c8y_UploadConfigFile``` operation <br>
  `520,DeviceSerial`
2. Set operation status to EXECUTING <br>
  `501,c8y_UploadConfigFile`
3. Upload configuration to inventory binaries API using REST
4. Create configuration repository entry in inventory using REST
5. Set operation status to SUCCESSFUL <br>
  `503,c8y_UploadConfigFile`

#### Install legacy configuration {#install-legacy-configuration}

Devices that are capable of installing configuration remotely can announce this by adding ```c8y_DownloadConfigFile``` to their ```c8y_SupportedOperations```. Then the **Configuration** tab offers a **Send configuration to device** button. When clicked, a ```c8y_DownloadConfigFile``` operation is created for the device.

```json
{
   "c8y_DownloadConfigFile": {
       "url": "https://demos.cumulocity.com/inventory/binaries/9100",
       "c8y_ConfigurationDump": {
           "id": "9200"
       }
   }
}
```

<table>
<colgroup>
<col width="20%">
<col width="10%">
<col width="10%">
<col width="60%">
</colgroup>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Mandatory</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>url</td>
<td>string</td>
<td>Yes</td>
<td>URL where the configuration file should be obtained from</td>
</tr>
<tr>
<td>c8y_ConfigurationDump</td>
<td>object</td>
<td>Yes</td>
<td>Configuration dump reference object containing the ID of the configuration repository entry object</td>
</tr>
</tbody>
</table>

After downloading the configuration from the specified URL and installing it, the device must reference its currently installed configuration in its own managed object. This is done by transferring the nested ```c8y_ConfigurationDump``` fragment entirely into the device’s own managed object.

```http
PUT /inventory/managedObjects/<deviceId>
```
```json
{
   "c8y_ConfigurationDump": {
       "id": "9200"
   }
}
```

|Name|Type|Mandatory|Description|
|----|----|----|----|
|id|string|Yes|ID of the referenced configuration object|

The device is expected to perform the following actions:

1. Set operation status to EXECUTING
2. Download the configuration file from the specified URL
3. Install the configuration file
4. Update the currently installed configuration dump in the device’s managed object
5. Set the operation status to SUCCESSFUL

**SmartREST example**

The 521 static response template is available for this functionality:

1. Receive ```c8y_DownloadConfigFile``` operation <br>
  `521,DeviceSerial,https://demos.cumulocity.com/inventory/binaries/9100`
2. Set operation status to EXECUTING <br>
  `501,c8y_DownloadConfigFile`
3. Download configuration from the URL specified
4. Install the configuration file
5. Set operation status to SUCCESSFUL and set the currently installed ```c8y_ConfigurationDump``` fragment implicitly <br>
  `503,c8y_DownloadConfigFile`

### Typed file-based configuration {#typed-file-based-configuration}

The most versatile way of managing device configuration is typed file-based configuration. Here a device can manage multiple configuration files at the same time. Typed file configuration is activated for a device by adding the ```c8y_SupportedConfiguration``` fragment to the device's own managed object.

```http
PUT /inventory/managedObjects/<deviceId>
```
```json
{
   "c8y_SupportedConfigurations": [
       "agent_conf",
       "ssh_conf"
   ]
}
```

|Name|Type|Mandatory|Description|
|----|----|----|----|
|c8y_SupportedConfigurations|array|Yes|Array of strings of the supported configuration for this device|


{{< product-c8y-iot >}} does not validate or further process configuration types. From a platform perspective they are simple strings. Associating these type strings to configuration files is responsibility of the device agent.

**SmartREST example**

The ```c8y_SupportedConfiguration``` fragment can be uploaded using the static template 119:
<br>
`119,agent_conf,ssh_conf`

#### Upload current configuration file {#upload-current-configuration-file}

Similarly to legacy configuration, uploading typed configuration is announced by adding the ```c8y_UploadConfigFile``` to the ```c8y_SupportedOperations```. In this case clickinging the button creates a very similar ```c8y_UploadConfigFile``` operation with the targeted configuration type as additional parameter.

```json
{
   "c8y_UploadConfigFile": {
       "type": "agent_conf"
   }
}
```

|Name|Type|Mandatory|Description|
|----|----|----|----|
|type|string|Yes|Type of the configuration to upload|

Then the device must create an event with the type equal to the configuration type. {{< product-c8y-iot >}} uses events here instead of the inventory like in legacy file-based config because events are automatically associated to the device and old events (and their binary attachments) included can be automatically cleaned up using retention rules.

```http
POST /event/events
```
```json
{
   "source": {
       "id": "4801"
   },
   "type": "agent_conf",
   "time": "2021-09-15T15:57:41.311Z",
   "text": "agent_conf upload requested"
}
```


|Name|Type|Mandatory|Description|
|----|----|----|----|
|source|object|Yes|ID of the device object|
|type|string|Yes|Type of the configuration uploaded|
|time|string|Yes|ISO datetime when the configuration was uploaded|
|text|string|Yes|Label text for the configuration|

In order to attach the configuration file to the just uploaded event, the [Event binaries API](https://{{< domain-c8y >}}/api/core/#operation/postEventBinaryResource) should be used. The file is attached using a *multipart/form-data* request.

```http
POST /event/events/<eventId>/binaries

Host: https://<TENANT_DOMAIN>
Authorization: <AUTHORIZATION>
Accept: application/json
Content-Type: multipart/form-data;boundary="boundary"

--boundary
Content-Disposition: form-data; name="object"

{ "name": "agent.conf", "type": "text/plain" }
--boundary
Content-Disposition: form-data; name="file"; filename="agent.conf"
Content-Type: text/plain

c8y.url.http=https://management.cumulocity.com
c8y.url.mqtt=mqtt.cumulocity.com
--boundary--
```

The device is expected to perform the following actions:

1. Set operation status to EXECUTING
2. Create a configuration type event
3. Attach the configuration file to the event
4. Set the operation status to SUCCESSFUL

**SmartREST example**

{{< product-c8y-iot >}} provides the 526 static SmartREST template for typed ```c8y_UploadConfigFile``` operations:

1. Receive typed ```c8y_UploadConfigFile``` operation <br>
  `526,DeviceSerial,agent_conf`
2. Set operation status to EXECUTING <br>
  `501,c8y_UploadConfigFile`
3. Create a config type event using REST API
4. Attach the targeted config file to the event using REST API
5. Set operation status to SUCCESSFUL <br>
  `503,c8y_UploadConfigFile`

#### Install configuration file {#install-configuration-file}

Installing typed configuration also works very similarly to the legacy configuration. Adding the ```c8y_DownloadConfigFile``` to the device's ```c8y_SupportedOperations``` controls the availability of the **Send configuration to device** button. When it is clicked a ```c8y_DownloadConfigFile``` operation with the configuration type included is created.

```json
{
   "c8y_DownloadConfigFile": {
       "type": "agent_conf",
       "url": "https://demos.cumulocity.com/inventory/binaries/156719"
   }
}
```

|Name|Type|Mandatory|Description|
|----|----|----|----|
|type|string|Yes|Type of the configuration to apply|
|url|string|Yes|URL where the configuration file should be obtained from|


When the device has downloaded and installed the configuration it must update the currently installed configuration of this specific type in its own managed object. This is done by adding the ```c8y_Configuration_<config type>``` fragment to the device’s own managed object.

```http
PUT /inventory/managedObjects/<deviceId>
```
```json
{
   "c8y_Configuration_agent_conf": {
       "name": "agent_conf",
       "time": "2021-09-15T15:47:13.721Z",
       "type": "agent_conf",
       "url": "https://demos.cumulocity.com/inventory/binaries/156719"
   }
}
```

<table>
<colgroup>
<col width="25%">
<col width="10%">
<col width="10%">
<col width="55%">
</colgroup>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Mandatory</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>c8y_Configuration_agent_conf</td>
<td>object</td>
<td>Yes</td>
<td>Fragment name with prefix "c8y_Configuration_" followed by the configuration type containing details of the currently installed configuration of that particular type</td>
</tr>
<tr>
<td>name</td>
<td>string</td>
<td>Yes</td>
<td>Optional name of the installed configuration file</td>
</tr>
<tr>
<td>time</td>
<td>string</td>
<td>Yes</td>
<td>ISO datetime indicating when the configuration was applied</td>
</tr>
<tr>
<td>type</td>
<td>string</td>
<td>Yes</td>
<td>Type of the configuration</td>
</tr>
<tr>
<td>url</td>
<td>string</td>
<td>Yes</td>
<td>URL where the configuration was obtained from</td>
</tr>
</tbody>
</table>


The device is expected to perform the following actions:

1. Set operation status to EXECUTING
2. Download configuration file from the included URL
3. Install the configuration file
4. Update the device's currently installed configuration with the typed configuration fragment in the device's own managed object
5. Set the operation status to SUCCESSFUL

**SmartREST example**

The 524 static SmartREST response template is available for typed ```c8y_DownloadConfigFile``` operations, and the 120 static template is prepared for uploading the current configuration:

1. Receive typed ```c8y_UploadConfigFile operation```<br>
  `524,DeviceSerial,https://demos.cumulocity.com/inventory/binaries/156719,agent_conf`
2. Set operation status to EXECUTING<br>
  `501,c8y_DownloadConfigFile`
3. Download configuration from the included URL
4. Install the configuration as the targeted configuration type
5. Set the currently installed configuration<br>
  `120,agent_conf,https://demos.cumulocity.com/inventory/binaries/156719,agent_conf.txt,2021-09-15T15:47:13.721Z`
6. Set operation status to SUCCESSFUL<br>
  `503,c8y_DownloadConfigFile`
