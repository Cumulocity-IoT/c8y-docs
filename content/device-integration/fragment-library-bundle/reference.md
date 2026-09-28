---
weight: 160
title: Shell
layout: bundle
sector: 
  - device_management
---

The **Shell** tab allows to send arbitrary device-specific commands to the device. It is shown if the ```c8y_Command``` operation is present in the device's ```c8y_SupportedOperations```.

### Send a command to a device {#send-a-command-to-a-device}

You may enter an arbitrary string into the command text. The format and its interpretation is up to the device integration. Click the **Execute** button to create a ```c8y_Command``` operation.


```json
{
   "c8y_Command": {
       "text": "get sw.version; get hw.version"
   }
}
```

|Field|DataType|Mandatory|Details|
|----|----|----|----|
|c8y_Command.text|string|Yes|The command text to be executed by the device|

After completing the execution, the device must provide a return string for the command in addition to setting the operation status to SUCCESSFUL. The result is provided as string property nested within the ```c8y_Command``` fragment in the operation.

```http
PUT /devicecontrol/operations/<operationId>
```
```json
{
   "status": "SUCCESSFUL",
   "c8y_Command": {
       "text": "get sw.version; get hw.version",
       "result": "1.2.3; 9.8.7"
   }
}
```

|Field|DataType|Mandatory|Details|
|----|----|----|----|
|status|string|Yes|Operation status indicating if the operation was completed as intended|
|c8y_Command|object|Yes|c8y_Command object received via the pending operation at the beginning|
|c8y_Command.text|string|Yes|The command that was executed by the device|
|c8y_Command.result|string|Yes|Execution result after running the command|


The device is expected to perform the following actions:

1. Set operation status to EXECUTING
2. Execute the command and obtain the return value
3. Set the operation status to SUCCESSFUL and include the return value in it

**SmartREST example**

For SmartREST connected devices the 511 static response template is available for receiving ```c8y_Command``` operations. Additionally, the implicit parameter functionality of the 503 static template can be used to supply the return value:

1. Receive ```c8y_Command``` operation <br>
  `511,DeviceSerial,"get sw.version; get hw.version"`
2. Set operation status to EXECUTING <br>
  `501,c8y_Command`
3. Set operation status to SUCCESSFUL and supply return value <br>
  `503,c8y_Command,"1.2.3; 9.8.7"`
