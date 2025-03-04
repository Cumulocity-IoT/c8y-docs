---
weight: 95
title: Bad StatusCode handling
layout: redirect
---

The gateway creates an alarm with status WARNING for the corresponding OPC UA server managed object when the received DataValue of a node has an abnormal status code (such as BAD or UNCERTAIN).
The alarm text in the {{< product-c8y-iot >}} platform will provide the necessary information such as the node ID, and the StatusCode information (code, value, and description).

The type of the alarm is constructed as `c8y_ua_DataValueAbnormal_<nodeId>_<StatusCode>_<value>`. This alarm due to the abnormal status code for a node is created once,
and the counter is not incremented in the next read operations. The alarm will be cleared by the OPC UA device gateway when the status code is back to normal in the following read operations.
The full list of abnormal alarms are stored in the server managed object under the `c8y_ua_DataValueAbnormalAlarms` fragment.
