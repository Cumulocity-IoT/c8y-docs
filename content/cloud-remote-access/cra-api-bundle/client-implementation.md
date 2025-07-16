---
title: Client implementation
weight: 10
layout: bundle
---
Each device supporting Cloud Remote Access uses a fragment called `c8y_RemoteAccessList` to hold a list with the configured
endpoints that can be accessed via this device.

```json
"c8y_RemoteAccessList": [
        {
            "serialVersionUID": 6652959747455810127,
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

In the example above a local HTTP echo server is reachable from the device at `http://localhost:33123`. The configuration id is `1`. 
To connect a client application, the client must open a WebSocket to the following URL:

```http
wss://<tenant domain>/service/remoteaccess/client/<device id>/configurations/<configuration id>
```

### Required HTTP headers {required-http-headers}

The WebSocket client must set the WebSocket subprotocol to `binary` using the `Sec-WebSocket-Protocol` header.
In addition, a valid authorization header is required, see [Authentication](https://cumulocity.com/api/core/#section/Authentication) in the {{< openapi >}}.

```http
Sec-WebSocket-Protocol: binary 
Authorization: <auth header>
```

### Sending and receiving traffic

Once the WebSocket connection is established, traffic for the endpoint can simply be sent to the WebSocket. Data from the endpoint can be consumed by reading from the WebSocket.
To implement a local forwarding proxy, data from a local server socket must be written to the WebSocket and vice versa.
