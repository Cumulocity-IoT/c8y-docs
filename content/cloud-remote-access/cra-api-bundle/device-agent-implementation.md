---
title: Device agent implementation
weight: 20
layout: bundle
---

This section describes how to implement a device agent deployed on a gateway. The device agent is responsible for
creating the device part of the tunnel between a TCP/IP connection at private network and the secure device WebSocket
endpoint.

### Enable Cloud Remote Access in supported operations {#supported-operation}

A device agent that implements an integration with Cloud Remote Access must consume `c8y_RemoteAccessConnect` operations. They are used to inform the
device about tunnel connections it should establish. In order to mark your device being capable of handling them, it needs to include `c8y_RemoteAccessConnect` as
a supported operation in its managed object:

```json

"c8y_SupportedOperations" : [
...
"c8y_RemoteAccessConnect",
...
]
```

### Connect operation {#connect-operation}

This operation is created when the application generates a connect request. The operation is then sent to the device
agent, which establishes a connection between the WebSocket endpoint at the server and the local network endpoint.

Example of an `c8y_RemoteAccessConnect` operation:

```json
{
  ...
  "c8y_RemoteAccessConnect": {
    "hostname": "10.0.0.67",
    "port": 5900,
    "connectionKey": "eb5e9d13-1caa-486b-bdda-130ca0d87df8"
  }
  ...
}
```

| Field         | Data type | Details                                                                |
|:--------------|:----------|:-----------------------------------------------------------------------|
| connectionKey | String    | Shared secret to authenticate the connection request from device side  |
| hostname      | Number    | Endpoint on the local network to connect to                            |
| port          | String    | Port to be used on local network endpoint                              |

### Connecting to a new endpoint {#connecting-to-a-new-endpoint}

For each `c8y_RemoteAccessConnect` operation the device agent receives, it opens a TCP client socket to the provided
hostname and port. Using the provided ConnectionKey the agent also securely connects to the WebSocket endpoint on server
side.

The following steps need to be implemented by the device agent when it receives a `c8y_RemoteAccessConnect` operation.

* The device sets the operation status to EXECUTING.
* The device establishes a connection to the {{< product-c8y-iot >}} Cloud Remote Access WebSocket at the following URL:
  ```http
  wss://<hostname>/service/remoteaccess/device/<connectionKey>
  ```
* The device sets up a TCP connection to the given hostname and port. Depending on the protocol (VNC, Telnet, SSH) the device will
  initiate a protocol-specific handshake. All data should be forwarded directly to the WebSocket endpoint (if already
  established).
* The operation status is set to SUCCESSFUL or FAILED based on the status of the previous steps.

#### Operating a connected endpoint {#operating-a-connected-endpoint}

When both connections are established and fully functional the agent simply must forward all binary packets between the
TCP connection and the WebSocket in both directions.

#### Disconnecting an endpoint {#disconnecting-an-endpoint}

Whenever one of the connections is terminated (WebSocket or TCP) the device agent should consider the session as ended
and should also terminate both connections associated with the tunnel.

#### Recommendations {#recommendations}

It is highly recommended to implement a small buffer especially for bootstrapping when one connection is already
functional while the other is not setup yet.

### Declaring supported protocols {#declaring-supported-protocols}
A device should declare which remote access protocols it supports. This allows the UI to show only compatible options
when a user configures a remote endpoint. If a device doesn't declare its protocols, the platform will display all
available types by default.
You can declare protocols using either the REST API or SmartREST.

#### Using the REST API {#using-the-restapi}
To declare protocols via REST, set the device's managed object with the `c8y_RemoteAccessSupportedProtocols` fragment.
This fragment holds an array of strings listing the supported protocols.

Valid protocol values are `SSH`, `TELNET`, `VNC`, and `PASSTHROUGH`.

##### Example 
```json
{
    "c8y_RemoteAccessSupportedProtocols": ["PASSTHROUGH", "SSH"]
}
```

#### Using SmartREST {#using-smartrest}
Alternatively, the set of supported CRA protocols can be configured using the SmartREST template 150. It sets the fragment using a message containing a list
of supported protocol names. See [MQTT Static template 150](/smartrest/mqtt-static-templates/#150) for more information.
##### Example
```text
150,SSH,PASSTHROUGH
```
