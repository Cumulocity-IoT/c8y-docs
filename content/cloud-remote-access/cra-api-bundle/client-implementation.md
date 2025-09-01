---
title: Client implementation
weight: 10
layout: bundle
date: '2025-09-01T10:26:32Z'
lastmod: '2025-09-01T10:40:43Z'
---
Each device supporting Cloud Remote Access uses a fragment called `c8y_RemoteAccessList` to hold a list with the configured
endpoints that can be accessed via this device.

An entry in the `c8y_RemoteAccessList` fragment holds the following fragments:

| <div style="width: 20em;">Field </div> | Data Type | Mandatory | Details                                                                                                                                                                                                                                                                                                                                              |
|----------------------------------------|---|---|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `id`                                   | String | Yes | Identifies the configuration of the remote access entry.                                                                                                                                                                                                                                                                                             |
| `port`                                 | Number (Integer) | Yes | The port number of the service on the remote device.                                                                                                                                                                                                                                                                                                 |
| `name`                                 | String | Yes | A user-friendly name for the remote access entry.                                                                                                                                                                                                                                                                                                    |
| `hostname`                             | String | Yes | The hostname or IP address of the service to be accessed remotely.                                                                                                                                                                                                                                                                                   |
| `protocol`                             | String | Yes | The protocol used to access the service.  Either `PASSTHROUGH`, `TCP`, `VNC`, `TELNET` or `SSH`.                                                                                                                                                                                                                                                     |
| `credentials`                          | Object | Yes | An object containing authentication credentials for accessing the remote service.                                                                                                                                                                                                                                                                    |
| `credentials.privateKey`               | String | See details | **Mandatory if `credentials.type` is `KEY_PAIR` or `CERTIFICATE`.** Otherwise, not applicable.                                                                                                                                                                                                                                                       |
| `credentials.password`                 | String | See details | **Mandatory if `credentials.type` is `PASS_ONLY` or `USER_PASS`.** Otherwise, not applicable.                                                                                                                                                                                                                                                        |
| `credentials.certificate`              | String | See details | **Mandatory if `credentials.type` is `CERTIFICATE`.** Otherwise, not applicable.                                                                                                                                                                                                                                                                     |
| `credentials.publicKey`                | String | No | Public key for authentication, if applicable.                                                                                                                                                                                                                                                                                                        |
| `credentials.hostKey`                  | String | No | Host key for authentication, if applicable.                                                                                                                                                                                                                                                                                                          |
| `credentials.type`                     | String | Yes | Type of credentials. Possible values are: <br/>-`NONE`: No credentials required. <br />-`PASS_ONLY`: Only `password` is required. <br />-`USER_PASS`: Both `username` and `password` are required. <br />-`KEY_PAIR`: Both `username` and `privateKey` are required. <br />-`CERTIFICATE`: `username`, `privateKey`, and `certificate` are required. |
| `credentials.username`                 | String | See details | **Mandatory if `credentials.type` is `USER_PASS`, `KEY_PAIR`, or `CERTIFICATE`.** Otherwise, not applicable.                                                                                                                                                                                                                                         |


##### Example 

```json
"c8y_RemoteAccessList": [
        {
            "hostname": "localhost",
            "protocol": "PASSTHROUGH",
            "credentials": {
                "privateKey": null,
                "password": null,
                "certificate": null,
                "publicKey": null,
                "hostKey": null,
                "type": "NONE",
                "username": null
            },
            "port": 33123,
            "name": "My HTTP Echo Server",
            "id": "1"
        }
    ]
```

In the example above a local HTTP echo server is reachable from the device at *http://localhost:33123*. The configuration ID is `1`.
To connect a client application, the client must open a WebSocket to the following URL.


```http
wss://<tenant domain>/service/remoteaccess/client/<device id>/configurations/<configuration id>
```

### WebSocket HTTP headers {#websocket-http-headers}

The Cloud Remote Access service uses the binary WebSocket subprotocol, regardless of which protocol is requested by the client.  Hence, we recommend pinning the WebSocket subprotocol to `binary` using the `Sec-WebSocket-Protocol` header.
Additionally,  a valid authorization header is required, see [Authentication](https://cumulocity.com/api/core/#section/Authentication) in the {{< openapi >}}.

```http
Sec-WebSocket-Protocol: binary 
Authorization: <auth header>
```

### Sending and receiving traffic {#sending-and-receiving-traffic}

Once the WebSocket connection is established, traffic for the endpoint can simply be sent to the WebSocket. Data from the endpoint can be consumed by reading from the WebSocket.
To implement a local forwarding proxy, data from a local server socket must be written to the WebSocket and vice versa.
