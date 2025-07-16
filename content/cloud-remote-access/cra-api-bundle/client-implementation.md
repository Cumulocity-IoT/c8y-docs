---
title: Client Implementation
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
To connect a client application the client needs to open a websocket to the following URL:

```http
wss://<tenant domain>/service/remoteaccess/client/<device id>/configurations/<configuration id>
```

### Required HTTP Headers

The websocket client needs to set the Websocket subprotocol to `binary` using the `Sec-WebSocket-Protocol` header.
In addition, a valid authorization header is required (see [OpenAPI:Authentication](https://cumulocity.com/api/core/#section/Authentication)).

```http
Sec-WebSocket-Protocol: binary 
Authorization: <auth header>
```

### Sending and receiving traffic

Once the web socket connection is established, traffic for the endpoint can simply be sent to the websocket. Data from the endpoint can be consumed by reading from the websocket.
To implement a local forwarding proxy, data from a local server socket needs to be simply written to the websocket and vice versa.
