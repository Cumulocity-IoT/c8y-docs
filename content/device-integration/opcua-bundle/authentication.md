---
weight: 70
title: Authentication
layout: redirect
---

The authentication setting is used to authenticate and authorize the server user. It tells the gateway how to create a user identity and how to send it to the OPC UA server when establishing a connection.

The following authentication methods can be selected:

- Anonymous - Will only work when the OPC UA server allows such connections.
- Username/Password - With this setting the gateway will connect to the server as a specific user represented by a username and password.
- Key-based authentication - The gateway will use an existing certificate to authenticate as a specific user. JKS keystore must be uploaded to {{< product-c8y-iot >}} as a binary with type "application/octet-stream". This keystore must follow the following rules:
  - It must be a Java keystore (JKS).
  - The keystore itself must be password-protected.
  - The keystore must contain a user certificate with the "opcuauser" alias.
  - The user certificate must be password-protected.

{{< c8y-admon-info >}}
The OPC UA gateway connects as an OPC UA client to the OPC UA server. If key-based authentication is used, the gateway uses a certificate and a corresponding private key to authenticate at the OPC UA server. Both certificate and private key must be stored in a keystore file, using the alias "opcuauser". This way, the gateway precisely can determine which certificate and private key must be used in case a keystore file should contain more data.
{{< /c8y-admon-info >}}

The keystore can be created via the following Java keytool command:

```shell
keytool -genkey -keyalg RSA -alias opcuauser -keystore keystore.jks -storepass passw0rd_a -validity 3600 -keysize 2048
```

With the above command, the key pass is set to the same value as the keystore password.

![terminal](/images/device-protocols/opcua/opcua-terminal.png)

The keystore can be verified by using a tool like KeystoreExplorer. It can then be uploaded to {{< product-c8y-iot >}} as a binary and used in the server configuration.

![Opcua Keystore](/images/device-protocols/opcua/opcua-keystore.png)

{{< c8y-admon-info >}}
If you don't have the certificate trusted by your OPC UA server, the server will reject the connection. If you have problems trusting a certificate in your OPC UA server, contact your OPC UA server provider.
{{< /c8y-admon-info >}}

{{< c8y-admon-info >}}
Beside the above authentication certificate, the device gateway also automatically creates a so-called application identity certificate to identify itself with the OPC UA server. This must be trusted by the OPC UA server as well.
{{< /c8y-admon-info >}}

### Child devices {#child-devices}

All server connections are listed as child devices even if the servers are disconnected. To stop a server connection, either delete the server child device or disable/remove the connection from the **OPC UA server** tab.

![Gateway child devices](/images/device-protocols/opcua/opcua-server-child-device.png)

### Address space {#address-space}

When you navigate to the child device of the gateway, the **Address space** tab shows the attributes and references of the address space node of the servers. The filter searches through the whole hierarchy to find "nodeId", "browserName" or "displayName" of an attribute. In case of multiple "ancestorNodeIds", you can click on the desired node to be redirected.

The address space is automatically scanned when a connection between the gateway and the server is established. The duration of the scan depends on the size of the address space. The address space information is stored locally once it is scanned and then used by this applying process. If the address space information is not yet available, for example, the address space has not been scanned, another scan will be triggered without synchronizing data into {{< product-c8y-iot >}}. Performing another address space operation will update the address space information.

In case a node cannot be read, the scan process skips this node and continues.
An error entry is written to the opcua-device-gateway log file to provide information (more information available in debug level).

![Gateway events tab](/images/device-protocols/opcua/opcua-address.png)

### Monitoring measurements {#monitoring-measurements}

On the gateway device, the **Measurements** tab provides visualization of data in the form of charts. In total the gateway contains the following six charts:

<table>
<colgroup>
<col span="1" style="width: 20%;">
<col span="1" style="width: 80%;">
</colgroup>
<thead>
<tr>
<th align="left">Charts</th>
<th align="left">Description</th>
</tr>
</thead>

<tbody>
<tr>
<td align="left">Connected servers</td>
<td align="left">Provides the number of connected and disconnected servers.</td>
</tr>

<tr>
<td align="left">Gateway active threads</td>
<td align="left">Shows the number of active threads for the alarm/measurements/event flushes and for the executor. You can also see whether the threadpool size limit is not sufficient, based on the threadpool configurations in the gateway. If the maximum threadpool size is reached then any new activities which require a new thread will be blocked until a thread is available. </td>
</tr>

<tr>
<td align="left">Gateway cyclic reads</td>
<td align="left">Number of active cyclic reads done by the gateway. Cyclic reads are actively reading from the OPC UA server within an interval based on the configuration of the device protocol.</td>
</tr>

<tr>
<td align="left">Gateway memory</td>
<td align="left">Represents the "free", "max" and "allocated" memory values of the gateway.</td>
</tr>

<tr>
<td align="left">Gateway repository queues</td>
<td align="left">Before a thread is flushed it is first added to the queue. This chart shows how many threads are currently in the queue. </td>
</tr>

<tr>
<td align="left">Server response time</td>
<td align="left">Shows the response time of each currently connected server. </td>
</tr>
</tbody>
</table>

![Gateway measurements tab](/images/device-protocols/opcua/opcua-gateway-memory.png)

#### Monitoring measurement details {#monitoring-measurement-details}

The following is the full list of monitoring measurements created by the gateway:



<table>
<colgroup>
<col span="1" style="width: 16%;">
<col span="1" style="width: 25%;">
<col span="1" style="width: 23%;">
<col span="1" style="width: 14%;">
<col span="1" style="width: 22%;">
</colgroup>
<thead>
<tr>
<th align="left">Chart</th>
<th align="left">Measurement type</th>
<th align="left">Measurement series</th>
<th align="left">Unit</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">Connected servers</td>
<td align="left">c8y_connectedServers</td>
<td align="left">connected servers</td>
<td align="left">num</td>
<td align="left">Number of connected servers</td>
</tr>
<tr>
<td align="left">Connected servers</td>
<td align="left">c8y_connectedServers</td>
<td align="left">disconnected servers</td>
<td align="left">num</td>
<td align="left">Number of disconnected servers</td>
</tr>
<tr>
<td align="left">Gateway active threads</td>
<td align="left">c8y_gatewayActiveThreads</td>
<td align="left">event_flush</td>
<td align="left">threads</td>
<td align="left">Number of active threads for event flushing</td>
</tr>
<tr>
<td align="left">Gateway active threads</td>
<td align="left">c8y_gatewayActiveThreads</td>
<td align="left">alarm_flush</td>
<td align="left">threads</td>
<td align="left">Number of active threads for alarm flushing</td>
</tr>
<tr>
<td align="left">Gateway active threads</td>
<td align="left">c8y_gatewayActiveThreads</td>
<td align="left">measurement_flush</td>
<td align="left">threads</td>
<td align="left">Number of active threads for measurement flushing</td>
</tr>
<tr>
<td align="left">Gateway active threads</td>
<td align="left">c8y_gatewayActiveThreads</td>
<td align="left">event_flush_queued</td>
<td align="left">threads</td>
<td align="left">Number of queued threads for event flushing</td>
</tr>
<tr>
<td align="left">Gateway active threads</td>
<td align="left">c8y_gatewayActiveThreads</td>
<td align="left">alarm_flush_queued</td>
<td align="left">threads</td>
<td align="left">Number of queued threads for alarm flushing</td>
</tr>
<tr>
<td align="left">Gateway active threads</td>
<td align="left">c8y_gatewayActiveThreads</td>
<td align="left">measurement_flush_queued</td>
<td align="left">threads</td>
<td align="left">Number of queued threads for measurement flushing</td>
</tr>
<tr>
<td align="left">Gateway cyclic reads</td>
<td align="left">c8y_gatewayCyclicReads</td>
<td align="left">scheduled_reads</td>
<td align="left">scheduled</td>
<td align="left">Number of cyclic reads that have been scheduled</td>
</tr>
<tr>
<td align="left">Gateway cyclic reads</td>
<td align="left">c8y_gatewayCyclicReads</td>
<td align="left">active_reads</td>
<td align="left">threads</td>
<td align="left">Number of active cyclic reads</td>
</tr>
<tr>
<td align="left">Gateway cyclic reads</td>
<td align="left">c8y_gatewayCyclicReads</td>
<td align="left">avg_interval</td>
<td align="left">ms</td>
<td align="left">Average cyclic read rate overall</td>
</tr>
<tr>
<td align="left">Gateway memory	</td>
<td align="left">c8y_gatewayMemory</td>
<td align="left">max</td>
<td align="left">MB</td>
<td align="left">Gateway JVM max memory</td>
</tr>
<tr>
<td align="left">Gateway memory	</td>
<td align="left">c8y_gatewayMemory</td>
<td align="left">allocated</td>
<td align="left">MB</td>
<td align="left">Gateway JVM total allocated memory</td>
</tr>
<tr>
<td align="left">Gateway memory</td>
<td align="left">c8y_gatewayMemory</td>
<td align="left">free</td>
<td align="left">MB</td>
<td align="left">Gateway JVM free memory</td>
</tr>
<tr>
<td align="left">Gateway repository queues</td>
<td align="left">c8y_gatewayRepositoryQueues</td>
<td align="left">measurement_queue</td>
<td align="left">measurements</td>
<td align="left">Number of measurements currently in the queue</td>
</tr>
<tr>
<td align="left">Gateway repository queues</td>
<td align="left">c8y_gatewayRepositoryQueues</td>
<td align="left">event_queue</td>
<td align="left">events</td>
<td align="left">Number of events currently in the queue</td>
</tr>
<tr>
<td align="left">Gateway repository queues</td>
<td align="left">c8y_gatewayRepositoryQueues</td>
<td align="left">alarm_queue</td>
<td align="left">alarms</td>
<td align="left">Number of alarms currently in the queue</td>
</tr>
<tr>
<td align="left">Server response time</td>
<td align="left">c8y_serverResponseTime</td>
<td align="left">response_time</td>
<td align="left">ms</td>
<td align="left">OPC UA server response time</td>
</tr>
</tbody>
</table>

### Monitoring alarms {#monitoring-alarms}

On the gateway device, the **Alarms** tab shows all alarms raised either on the gateway or on the servers.

There are three alarm types which can be raised:

- Connection loss - If the gateway fails to connect to the OPC UA server a critical alarm is raised.
- Gateway crash - If the gateway crashes or is abruptly shut down a major alarm is raised.
- No data arrived within interval - If the status interval check value in the OPC UA server configuration is exceeded a major alarm is raised.

![Gateway alarms tab](/images/device-protocols/opcua/opcua-alarms.png)

#### Monitoring alarm details {#monitoring-alarm-details}

The following is the full list of monitoring alarms created by the gateway:

<table>
<colgroup>
<col span="1" style="width: 30%;">
<col span="1" style="width: 30%;">
<col span="1" style="width: 10%;">
<col span="1" style="width: 30%;">
</colgroup>
<thead>
<tr>
<th align="left">Text</th>
<th align="left">Alarm type</th>
<th align="left">Severity</th>
<th align="left">Note</th>
</tr>
</thead>

<tbody>
<tr>
<td align="left">EventRepository is constantly growing! Possible memory overflow which will result in gateway crash!</td>
<td align="left">c8y_ua_GatewayQueueGrowth_EventRepository</td>
<td align="left">CRITICAL</td>
<td align="left"></td>
</tr>
<tr>
<td align="left">AlarmRepository is constantly growing! Possible memory overflow which will result in gateway crash!</td>
<td align="left">c8y_ua_GatewayQueueGrowth_AlarmRepository</td>
<td align="left">CRITICAL</td>
<td align="left"></td>
</tr>
<tr>
<td align="left">MeasurementRepository is constantly growing! Possible memory overflow which will result in gateway crash!</td>
<td align="left">c8y_ua_GatewayQueueGrowth_MeasurementRepository</td>
<td align="left">CRITICAL</td>
<td align="left"></td>
</tr>
<tr>
<td align="left">Gateway crashed on last run! Please check the log files and memory dumps to see what caused this</td>
<td align="left">c8y_ua_GatewayCrash</td>
<td align="left">MAJOR</td>
<td align="left">This alarm is also raised when the gateway process was not terminated gracefully</td>
</tr>
<tr>
<td align="left">Failed to connect to server [{serverId}], reason: {reason}</td>
<td align="left">c8y_ua_ServerConnectionFailed</td>
<td align="left">CRITICAL</td>
<td align="left">This alarm will be cleared by the gateway when the connection to the server has been established successfully</td>
</tr>
<tr>
<td align="left">Connection dropped on server: {serverId}</td>
<td align="left">c8y_ua_ConnectionDropped</td>
<td align="left">CRITICAL</td>
<td align="left">This alarm will be cleared by the gateway when the connection has been restored</td>
</tr>
</tbody>
</table>

### Monitoring events {#monitoring-events}

On the gateway device, the **Events** tab shows all events related to the gateway-server connection. Additionally, you can see when the gateway has started and when it ends.

![Gateway events tab](/images/device-protocols/opcua/opcua-events.png)

#### Monitoring event details {#monitoring-event-details}
The following is the full list of monitoring events created by the gateway:
<table>
<colgroup>
<col span="1" style="width: 25%;">
<col span="1" style="width: 25%;">
<col span="1" style="width: 15%;">
<col span="1" style="width: 35%;">
</colgroup>
<thead>
<tr>
<th align="left">Text</th>
<th align="left">Event type</th>
<th align="left">Event source</th>
<th align="left">Description</th>
</tr>
</thead>

<tbody>
<tr>
<td align="left">Gateway [{gateway identifier}, {gateway name}] started</td>
<td align="left">c8y_ua_GatewayStarted</td>
<td align="left">The gateway managed object</td>
<td align="left">This event is created when the gateway has been started and authenticated with the {{< product-c8y-iot >}} platform</td>
</tr>
<tr>
<td align="left">Connection established to server: {server ID}</td>
<td align="left">c8y_ua_ConnectionEstablished</td>
<td align="left">The server managed object</td>
<td align="left">This event is created when the server connection is established - either first time or a reconnection</td>
</tr>
<tr>
<td align="left">Server {server ID} connected</td>
<td align="left">c8y_ua_ServerConnected</td>
<td align="left">The server managed object</td>
<td align="left">This event is created when server is connected successfully by the Connection Manager. This event is not created if it is a reconnection. This event is normally followed by an event of type c8y_ua_ConnectionEstablished</td>
</tr>
<tr>
<td align="left">Server disconnected: {server ID}</td>
<td align="left">c8y_ua_ServerDisconnected</td>
<td align="left">The server managed object</td>
<td align="left">This event is created when the server is disconnected proactively by the Connection Manager</td>
</tr>
</tbody>
</table>
