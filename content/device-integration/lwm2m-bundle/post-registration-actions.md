---
weight: 80
title: Handling LWM2M post registration actions
layout: redirect
---

The LWM2M shell commands can be performed in the **Shell** tab of each device. It is also possible to execute some common operations when a device sends a full registration request.
This can be done in the **LWM2M post-operations** page accessible from the **Device types** menu in the navigator. A set of shell commands can be saved in the Commands section, which will be performed on each device on registration.

![Post operations example](/images/device-protocols/lwm2m/lwm2m-post-operations.png)

The above image shows the **LWM2M post-operations** page with a set of sample shell commands.
More information on shell commands can be found in [Handling LWM2M shell commands](/device-integration/lwm2m/#handling-shell-commands).

### Device operations handling {#device-operations-handling}

If the operations are created while the device is offline, all the operations will be executed when the device comes online as those operations will be delivered through the real-time channel.
A configurable property can limit the number of operations to be executed as part of the post-registration process, for example, the operations which were already delivered to the device once via the real-time channel, but they still have a status of PENDING.

{{< c8y-admon-info >}}
The default maximum limit of the pending operations is 10, which is a configurable value for the agent. In case this limit is not sufficient for your use case please contact [product support](/additional-resources/contacting-support/).
{{< /c8y-admon-info >}}
