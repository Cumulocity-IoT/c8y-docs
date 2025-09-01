---
weight: 150
title: Remote access
layout: bundle
sector:
- device_management
date: '2025-09-01T10:26:32Z'
lastmod: '2025-09-01T10:40:39Z'
---
The **Remote access** tab is used to configure and access devices for remote control through remote control protocols.

The **Remote access** tab is available if the following criteria are met:

* The Cloud Remote Access microservice is subscribed to the needed tenant
* The user has the correct permissions granted (Remote access admin rights)
* `c8y_RemoteAccessConnect` is added to the device's ```c8y_SupportedOperations```

For more information, see [Using Cloud Remote Access](/cloud-remote-access/cra-introduction/).

### Remote access connect {#remote-access-connect}

When a user selects a remote access endpoint and clicks the **Connect** button a ```c8y_RemoteAccessConnect``` operation is created.

```json
{
   "c8y_RemoteAccessConnect": {
     "hostname": "10.0.0.67",
     "port": 5900,
     "connectionKey": "eb5e9d13-1caa-486b-bdda-130ca0d87df8"
   }
}
```

|Field|DataType|Mandatory|Details|
|----|----|----|----|
|connectionKey|string|Yes|Shared secret to authenticate the connection request from device side|
|hostname|string|Yes|Endpoint on local network to connect to|
|port|integer|Yes|Port to be used on the local network endpoint|


With this operation the device must open a WebSocket connection to the microservice endpoint using the connection key for authentication `(wss://<c8y host>/service/remoteaccess/device/<connectionKey>)` and a local socket to the specified hostname and port. Then it must establish bidirectional forwarding of data between the WebSocket and the local socket.

{{< product-c8y-iot >}} currently supports VNC, SSH, and Telnet. The device agent should be implemented independently of the remote access protocol used. The operation intentionally does not transfer the protocol. The agent must be capable of forward arbitrary data between both its established sockets.

The device is expected to perform the following actions:

1. Set operation status to EXECUTING
2. Establish WebSocket connection to remote access microservice
3. Establish local socket connection to the specified host and port
4. Establish bidirectional forwarding between WebSocket and local socket
5. Set operation status to SUCCESSFUL

The operation is set to SUCCESSFUL after the connection is established. Disconnecting happens silently. Even if the connection was not terminated gracefully by any of the involved components, the operation status must stay in SUCCESSFUL. Whenever one of the connections is terminated (WebSocket or TCP) the device agent should consider the session as ended and should also terminate both connections.

**SmartREST example**

The 530 static response template is available for receiving ```c8y_RemoteAccessConnect``` operations:

1. Receive ```c8y_RemoteAccessConnect``` operation <br>
  `530,DeviceSerial,10.0.0.67,22,eb5e9d13-1caa-486b-bdda-130ca0d87df8`
2. Device sets operation status to EXECUTING<br>
  `501,c8y_RemoteAccessConnect`
3. Establish WebSocket connection using HTTP
4. Establish local socket connection
5. Device sets operation status to SUCCESSFUL<br>
  `503,c8y_RemoteAccessConnect`
