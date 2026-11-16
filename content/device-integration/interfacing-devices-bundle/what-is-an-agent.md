---
weight: 20
title: What is an agent?
layout: bundle
sector: 
  - device_management
---

Internet of Things (IoT) devices come with a wide variety of protocols, parameters and network connectivity options. Protocols of devices range from low-level serial links to full-blown IT protocols such as web services. Today's IoT standards rarely define exactly how to access particular readings of particular sensors or manipulate particular controls. Devices can be connected through mobile networks and gateways.

To shield machine-to-machine applications from this numbers of access options, {{< product-c8y-iot >}} uses *agents*. An agent is a function that complies with three duties for a specific vendor and type of devices:

-   It translates the device-specific interface protocol into a single reference protocol.
-   It translates the specific domain model of the device into a reference domain model.
-   It enables secure remote communication in various network architectures.

![Agent architecture](/images/concepts-guide/agents.png)

#### Protocol translation {#protocol-translation}

The configuration of parameters, readings, events and other information is either send to an agent ("push") or queried by an agent ("pull") through a device-specific protocol on one side. The agent will convert these messages into the protocol that {{< product-c8y-iot >}} requires. It will also receive device control commands from {{< product-c8y-iot >}} ("switch off that relay") and translate these into a kind of protocol the device requires.

{{< product-c8y-iot >}} uses a simple and secure reference protocol based on REST (that is, HTTPS) and JSON, which can be used for a wide variety of programming environments down to small embedded systems. To support real-time scenarios, the protocol is designed around a "push" model, that is, data is sent as soon as it is available.

#### Model transformation {#model-transformation}

The configuration parameters, readings, events, they all have their device-specific name (and possibly units). An agent for a particular device will transform this device-specific model to the {{< product-c8y-iot >}} reference model. For example, an electricity meter provides the main reading as a parameter "Received Wh", so the agent will transform this reading into a reference "Total active energy" in kWh.

#### Secure remote communication {#secure-remote-communication}

Devices can provide a protocol that is unsuitable for secure remote communication, in particular in public cloud environments. The protocol only supports local networking and does not pass through firewalls and proxies and it can contain sensitive data in clear text form. To avoid security issues like these, an agent can be co-located to the device and provide a secure, internet-enabled link to the remote device via {{< product-c8y-iot >}}.

To summarize the benefits of the agent concept: Agents enable IoT applications to securely interface with any type of remote IoT device and without imposing any mandatory system requirement on the device itself. They drastically simplify developing IoT applications by shielding the applications from the variety of IoT devices and protocols.

### What agent architecture is supported? {#what-agent-architecture-is-supported}

Agents can be deployed in various ways, as illustrated in the picture below. We distinguish two main variants: **server-side agents** and **device-side agents**.

![Agent architectures](/images/concepts-guide/agentarchitectures.png)

**Server-side agents** are run in a cloud, hosted on {{< product-c8y-iot >}} as microservices or managed by yourself in your own cloud. Devices connect to server-side agents using their device-specific protocol. This option is mainly chosen when one or more of the following complies:

* The device is "closed", that means, it is not programmable and supports only one particular, pre-defined protocol to communicate with the outside world.
* The protocol on the device is secure and internet-enabled, that is, the device connects to the cloud and not vice-versa.

**Device-side agents** run on a device in the sensor network. These devices can be routers, mobile phones or modems. The agents perform in any kind of run-time environment the device supports, ranging from the very battery- and memory-consuming embedded microcontrollers to minicomputers running Embedded Linux. The agents will directly query connected sensors and manipulate connected controls. This usually results in a simpler architecture than server-side agents.
