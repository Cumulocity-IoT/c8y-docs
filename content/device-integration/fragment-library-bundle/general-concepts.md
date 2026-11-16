---
weight: 20
title: General concepts
layout: bundle
sector:
  - device_management
---

### Announcing capabilities {#announcing-capabilities}

Devices may announce their supported capabilities using the ```c8y_SupportedOperations``` fragment in their own managed object. The fragment itself is an array of strings. It may contain built-in operations with their meaning or custom operations for specific use cases, which are described in the following sections.

```http
PUT /inventory/managedObjects/<deviceId>
```
```json
{
    "c8y_SupportedOperations": [
        "c8y_Restart",
        "c8y_Network"
    ]
}
```

|Field|Data type|Mandatory|Details|
|----|----|----|----|
|c8y_SupportedOperations|array|Yes|Array of strings of the supported operations|

Some capabilities also introduce their own ```c8y_Supported<...>``` fragments with a similar concept. These fragments allow devices to announce the ability to handle certain types of log files or configuration.

**SmartREST example**

The 114 static template is available for devices to announce their supported operations:

`114,c8y_Restart,c8y_Configuration,c8y_SoftwareList`


### Communicating current status {#communicating-current-status}

Devices are responsible for communicating their current status to {{< product-c8y-iot >}}. The status is usually communicated in the device's own managed object. {{< product-c8y-iot >}} provide specific fragments for each capability. The device must update this data whenever it detects a change to its local state.

In practice this usually means that a device should publish its local state concerning all of its supported capabilities during startup, when requested to change its local state, and whenever any external change has been detected.

### Operation handling {#operation-handling}

Operations are always created with status PENDING. Devices are responsible for moving operations along into different statuses in their lifecycle. Before beginning to process an operation the device agent must update its status to EXECUTING. After processing is completed the device must set the operation status to SUCCESSFUL or FAILED depending on the outcome.

**SmartREST 2.0**

{{< product-c8y-iot >}} provides the static templates 501, 502, and 503 to manipulate the operation status. These templates take the operation type as input parameter and always update the oldest operation in the preceding status. We recommend you to let all operations be handled sequentially in the order they arrive at the device.

Devices can find their operation IDs by querying the Device Control API, by subscribing to the operation JSON topic, or by using a custom response template which includes the IDs, that is, template 504, 505, or 506, which enable setting the status of operations with a known ID.

### Error handling during operation processing {#error-handling-during-operation-processing}

If any error occurs during the processing of an operation the device must set the operation status to FAILED and provide a failure reason as descriptive as possible. This includes any unexpected or expected error conditions that prevent the operation to be fully completed and as expected. Even if only one step in an operation with multiple distinct steps fails, the entire operation must be considered as FAILED.

It is up to the device and its use case whether it should roll back any local state changes that happened before the error occurred. If any change of state remains after an operation failed the device must communicate this changed state with {{< product-c8y-iot >}}.

#### Handling of unknown operations {#handling-of-unknown-operations}

Future versions of {{< product-c8y-iot >}} may include new operation types. To ensure compatibility, devices should safely ignore any operations they do not recognize.
When a device receives an unknown operation code, it should not respond or take any action. The operation will remain in a pending state, which is normal and does not indicate a problem.   

### Recovering after agent crash {#recovering-after-agent-crash}

After an unexpected restart a device must cleanly recover its status. This includes all status parameters communicated with the platform and all ongoing operations. Recovering the status can be done by updating all values in the cloud with the current values on the device. Recovering ongoing operations is more difficult. Devices are expected to keep track of all operations they moved to status EXECUTING. Typically devices keep information of longer-running operations in a persistent storage so that they can be resumed. In unexpected shutdown or crash scenarios this may not always be possible. In this case the device may cancel all ongoing operations to reset its own status.

```http
GET /devicecontrol/operations?deviceId=<deviceId>&status=EXECUTING
```

```json
{
  "operations": [
    {
      "creationTime": "2023-06-25T14:53:52.395Z",
      "deviceId": "123",
      "id": "101",
      "status": "EXECUTING",
      "c8y_Restart": {}
    },
    {
      "creationTime": "2023-06-25T14:57:29.089Z",
      "deviceId": "123",
      "id": "102",
      "status": "EXECUTING",
      "c8y_SendConfiguration": {}
    }
  ]
}
```

Then it must change the statuses one by one:

```http
PUT /devicecontrol/operations/<operationId>
```

```json
{
  "status": "FAILED"
}
```

**SmartREST 2.0**

Alternatively the static template 507 may be used. The template changes the status from EXECUTING to FAILED for all operations of the given type or for all types.

### Idempotent cases {#idempotent-cases}

In cases where a device receives an operation that requests a state that is already present, it is up to the device how the operation should be handled. This may for example be the case when a device is requested to install a software package that is already present in the requested version. Typically there are three different ways of handling such cases in device agents: skip, execute, or fail. In case of the mentioned software package that is already installed the following options could be selected:

1. Consider the package as already installed and skip its installation because the requested state is already present
2. Execute the operation as normal including re-installing the package
3. Fail the operation because the requested state may indicate that the command was created under false preconditions

The ideal option depends on the use case and the concrete operation. Regardless of which option is selected the device must ensure that its local state and the one communicated to {{< product-c8y-iot >}} remains consistent.
