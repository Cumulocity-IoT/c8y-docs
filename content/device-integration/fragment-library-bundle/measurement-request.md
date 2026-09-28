---
weight: 130
title: Manual status update
layout: bundle
sector: 
  - device_management
---

For cases where devices need a manual trigger for uploading a status update to the platform, the **Get measurements** button in the action bar of a device is available. It is shown when the device's `c8y_SupportedOperations` contains `c8y_MeasurementRequestOperation`.

This action creates a `c8y_MeasurementRequestOperation` operation.

```json
{
    "c8y_MeasurementRequestOperation": {}
}
```

There is no additional configuration to specify the set of requested data points available. We recommend triggering an upload of the complete device state.

On receiving the operation the device is expected to perform the following actions:

1. Set the operation status to EXECUTING.
2. Upload the current status of all data points to the platform.
3. Set the operation status to SUCCESSFUL.

