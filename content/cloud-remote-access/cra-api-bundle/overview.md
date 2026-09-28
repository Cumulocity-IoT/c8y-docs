---
title: Overview
weight: 5
layout: bundle
---

```mermaid
sequenceDiagram
    actor U as User
    participant CL as Client
    participant CRA as CRA microservice
    participant CORE as {{< product-c8y-iot >}} Core
    participant DA as Device agent
    participant S as External endpoint <br/>(SSH, Telnet, VNC...)
    
    U -->> CL: Start Client session <br />(Example: SSH)
    CL ->> CRA: Connect WebSocket <br /> to CRA configuration
    activate CRA
    CRA ->> CORE: Create <br />c8y_RemoteAccessConnect<br/> operation
    CORE -->> DA: Push operation
    DA ->> CORE: Mark operation as EXECUTING
    DA ->> CRA: Connect WebSocket <br /> to connection key <br > of operation
    activate DA
    loop
        DA <<-->> S: Forward data packets <br /> to WebSocket <br /> and vice versa   
    end
    DA ->> CORE: Mark operation as SUCCESSFUL
    deactivate CRA
    deactivate DA
```

The diagram above illustrates the end-to-end integration between a user's client and the corresponding external server via Cloud Remote Access (CRA).
In such a setup, we distinguish between the following participants and components:

- A **{{< product-c8y-iot >}} user**, who wants to access an external service like a web server or SSH that is only reachable from a remote device.
- The **client**. This often is a shell in the {{< product-c8y-iot >}} UI; alternatively it can be a forwarding proxy like [C8Y Cli](https://goc8ycli.netlify.app/docs/examples/remoteaccess/) or even a custom client application seeking access to the external service.
- The **Cloud Remote Access (CRA)** microservice at `/service/remoteaccess`.
- The **{{< product-c8y-iot >}} Core platform** (see also the [{{< openapi >}} ](https://cumulocity.com/api/)).
- The **device agent**. A common open-source agent is [thin-edge.io](https://thin-edge.io/).
- An arbitrary **external endpoint**, typically a SSH, HTTP, Telnet or VNC server.

In the following, we now describe both how to implement a device-side agent and a client application that connects to the device-side agent via CRA.
