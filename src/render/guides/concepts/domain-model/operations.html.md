---
order: 50
title: Remote control of devices
layout: redirect
---

### Operations

Devices can be remote controlled and managed.

Examples:

-   Device control: Setting a switch which controls temperature
-   Device configuration: Setting up a charge table in a smart meter.
-   Device maintenance: Requesting a gateway to download and install a new firmware.

In Cumulocity, these cases of usage are implemented by sending *operations* to a device. The following snippet shows an operation for setting the state of the relay with the ID "42" to "OPEN":

<pre><code class="json">{
	"deviceId": "42",
	"c8y_Relay": {
		"relayState": "OPEN"
	}
}</code></pre>

Just like other types of data, operations are also standardised through the sensor library to simplify application development (see below). For example, setting a switch should be the same for all switches regardless of their make.

Operations are modelled just like fragments in the inventory model (see above). The same extensibility concept applies. Random vendor-proprietary extensions to the standard operations are possible. These are not denied or modified by Cumulocity.

### Sending operations to devices

Cumulocity delivers operations to devices over any network using a reliable queueing routine. This queueing routine respects the limitations and security requirements of IoT networks:

-   Devices are often connected over unreliable, low-bandwidth links that may only occasionally be available. Devices may, for example, only dial up once in a day to the network to fetch commands for execution. Therefore Cumulocity communicates asynchronously with devices.


-   Device protocols are often not designed for secure online communication. They may not pass NAT networks, firewalls and web proxies. They may not be secure enough for public exposure on the Internet. Cumulocity offers the possibility to connect these devices as HTTPS clients.
-   It may not even be possible to reach a mobile device over the Internet. Cumulocity uses push technology to send operations to devices.

To pass an operation from an application to a device, a process of several steps is required as illustrated in the image below. Assume that the user issues a remote control operation for a device (such as a device restart) from an application. The application creates the operation in Cumulocity (Step "1"). Cumulocity will queue the operation for execution and return control back to the application immediately. 

At some point in time, the agent responsible for the device will request operations that are queued for the devices that it manages ("Step 2"). This will happen immediately through Cumulocity's push mechanism or at a regular or scheduled interval. 

The agent will execute the operations on the devices that it manages (Step "3"), and will update Cumulocity with the results of the execution (Step "4"). The devices that the agent manages are direct or indirect children ("childDevices") of the agent.

Finally, the application can query the results of the operation (Step "5"). Audit records are generated both for the original request to run the device control operation and for the acknowledgement that the operation was actually run.

![Device control architecture](/guides/images/concepts-guide/control.png)

If there are communication issues while delivering an operation to a device, an alarm should be raised by the agent.

Sometimes there are delays between sending an operation to a device and retrieving a response. The system assumes a delivery unless an error is reported to maintain functionality.

### Designing operations for reliability

Operations should always be idempotent. Idempotent means that no matter how often you run the operation, the outcome is always the same.

For example, an operation to set a switch to a certain state is idempotent. No matter how often the switch is set to "on", it will be "on" afterwards. An operation to toggle a switch is not idempotent -- the result depends on whether the operation was run an odd or an even number of times.

More information can be found in [device control](/guides/reference/device-control) in the Reference guide.

