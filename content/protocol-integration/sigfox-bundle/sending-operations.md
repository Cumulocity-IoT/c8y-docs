---
weight: 60
title: Sending operations
layout: redirect
---


If the device supports sending hexadecimal commands, you can send commands from the Shell. In the Device Management application, navigate to the device you want to send an operation to in the **All devices** page. Switch to the **Shell** tab.

{{< c8y-admon-info >}}
Operations do not go to a status of EXECUTING immediately. They go to EXECUTING when the device is expecting the downlink message. Afterwards, the pending operation which is created first goes to a status of EXECUTING.
{{< /c8y-admon-info >}}
