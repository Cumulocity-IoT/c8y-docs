---
weight: 120
title: Logs
layout: bundle
sector: 
  - device_management
---

The **Logs** tab is used to extract logs from the device. The **Logs** tab is available if the fragment ```c8y_LogfileRequest``` is present in the ```c8y_SupportedOperations``` of the device.
The device should contain a fragment called ```c8y_SupportedLogs```, which holds an array of the types of logs that it supports. The types of logs will later be referenced when logs are requested.

### Setting supported logs {#setting-supported-logs}

Supported log types are announced by devices using the ```c8y_SupportedLogs``` fragment in the device’s own managed object.

```http
PUT /inventory/managedObjects/<deviceId>
```
```json
{
   "c8y_SupportedLogs": [
      "syslog",
      "dmesg"
   ]
}
```

|Field|DataType|Mandatory|Details|
|----|----|----|----|
|c8y_SupportedLogs|array|Yes|Array of strings of the supported log types|

**SmartREST example**

The 118 static template is available to announce the supported logs of a device:

`118,syslog,dmesg`

### Uploading log files {#uploading-log-files}

When users request log files from devices via the **Logs** tab a ```c8y_LogfileRequest``` operation is created.

```json
{
   "c8y_LogfileRequest": {
       "searchText": "kernel",
       "logFile": "syslog",
       "dateTo": "2021-09-22T11:40:27+0200",
       "dateFrom": "2021-09-21T11:40:27+0200",
       "maximumLines": 1000
   }
}
```

|Field|DataType|Mandatory|Details|
|----|----|----|----|
|dateFrom|string|Yes|Start date for log lines|
|dateTo|string|Yes|End date for log lines|
|logFile|string|Yes|Type of log for the specific device (c8y_SupportedLogs)|
|searchText|string|Yes|A text filter to apply to individual log lines|
|maximumLines|string|Yes|Maximum amount of lines to transfer|

When the device has gathered the logs it uploads them to {{< product-c8y-iot >}} as a file.
We recommend you to create an event and upload the log file as a binary attachment of the event.
To avoid conflicts with other events bearing binary attachments (for example, for [typed file-based configuration](#upload-current-configuration-file))
we recommend you to use `c8y_Logfile` as event type.
The following is an example of such an event:

```http
POST /event/events
```

```json
{
   "source": {
       "id": "4801"
   },
   "type": "c8y_Logfile",
   "time": "2021-09-15T15:57:41.311Z",
   "text": "syslog log file"
}
```

|Field|DataType|Mandatory|Details|
|----|----|----|----|
|source|string|Yes|ID of the device|
|type|string|Yes|Type of the event holding the log file should always be `c8y_Logfile`|
|time|string|Yes|Time when the event occurred|
|text|string|Yes|Event text|

If desired the device may also include the ```c8y_LogfileRequest``` fragment from the operation or the operation ID into the event. The file is then attached to the event using it’s event ID and event binaries API.

```http
POST /event/events/<eventId>/binaries

Host: https://<TENANT_DOMAIN>
Authorization: <AUTHORIZATION>
Accept: application/json
Content-Type: multipart/form-data;boundary="boundary"

--boundary
Content-Disposition: form-data; name="object"

{ "name": "syslog.txt", "type": "text/plain" }
--boundary
Content-Disposition: form-data; name="file"; filename="syslog.txt"
Content-Type: text/plain

Oct 25 13:28:53 wtp kernel: [  719.554855] sd 6:0:0:0: [sdb] Write Protect is off
Oct 25 13:28:53 wtp kernel: [  719.554864] sd 6:0:0:0: [sdb] Mode Sense: 03 00 00 00
Oct 25 13:28:53 wtp kernel: [  719.555033] sd 6:0:0:0: [sdb] No Caching mode page found
--boundary--
```

After successful completion of the upload, the device must include a URL to the uploaded file into the ```c8y_LogfileRequest``` fragment of the operation. The link must be presented as property "file". This action can be combined with setting the operation status to SUCCESSFUL.

```http
PUT /devicecontrol/operations/<operationId>
```
```json
{
   "status": "SUCCESSFUL",
   "c8y_LogfileRequest": {
       "searchText": "kernel",
       "logFile": "syslog",
       "dateTo": "2021-09-22T11:40:27+0200",
       "dateFrom": "2021-09-21T11:40:27+0200",
       "maximumLines": 1000,
       "file": "https://demos.cumulocity.com/event/events/157700/binaries"
   }
}
```

|Field|DataType|Mandatory|Details|
|----|----|----|----|
|status|string|Yes|Operation status|
|dateFrom|string|Yes|Start date for log lines|
|dateTo|string|Yes|End date for log lines|
|logFile|string|Yes|Type of log for the specific device (c8y_SupportedLogs)|
|searchText|string|Yes|A text filter to apply to individual log lines|
|maximumLines|integer|Yes|Maximum amount of lines to transfer|
|file|string|Yes|URL where the log file was uploaded to|


The device is expected to perform the following actions:

1. Set operation status to EXECUTING
2. Load, filter, and crop the log file as specified in the operation
3. Create a log file event
4. Upload the log file as binary attachment to said event
5. Set the operation status to SUCCESSFUL and include a URL to the uploaded log file

**SmartREST example**

{{< product-c8y-iot >}} provides the 522 static response template for receiving ```c8y_LogfileRequest``` operations. When the log file is uploaded the device may use the implicit parameter functionality of the 503 static template to set the operation status and provide the file link at the same time:

1. Receive ```c8y_LogfileRequest``` operation<br>
  `522,DeviceSerial,syslog,2021-09-21T11:40:27+0200,2021-09-22T11:40:27+0200,ERROR,1000`
2. Set operation status to EXECUTING <br>
  `501,c8y_LogfileRequest`
3. Create log file event using REST API
4. Upload log file as event binary to newly created event using REST API
5. Set operation status to SUCCESSFUL and supply uploaded file URL <br>
  `503,c8y_LogfileRequest,"https://demos.cumulocity.com/event/events/157700/binaries"`
