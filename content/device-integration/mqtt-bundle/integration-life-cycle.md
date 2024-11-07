---
weight: 20
title: Integration life cycle
layout: redirect
---

The basic life cycle for integrating devices into {{< product-c8y-iot >}} is discussed in [Interfacing devices](/concepts/interfacing-devices).

In this section, we will show how this life cycle can be managed using the MQTT implementation.

The life cycle consists of two phases, a startup phase and a cycle phase.

The [startup phase](#startup-phase) can be as short as just checking the credentials:

* [Step 0](#step-0-request-device-credentials): Request device credentials, if they have not been requested yet.
* [Step 1](#step-1-verify-device): Ensure that the device exists.
* [Step 2](#step-2-verify-children): Ensure that the device children exist.
* [Step 3](#step-3-subscribe-topics): Subscribe to the topics.

The [cycle phase](#cycle-phase) consists of two kinds of actions:

* [Step A](#step-a-send-csv-data): Send CSV data
* [Step B](#step-b-receive-csv-operations): Receive CSV operations

![MQTT phases](/images/mqtt/mqttDeviceIntegration.png)

{{< c8y-admon-req >}}
* Access via bootstrap user credentials. See [Device credentials](https://{{< domain-c8y >}}/api/core/#tag/Device-credentials) for more information on how to obtain and use bootstrap credentials.
{{< /c8y-admon-req >}}


### Startup phase {#startup-phase}

#### Step 0: Request device credentials {#step-0-request-device-credentials}

In {{< product-c8y-iot >}}, every MQTT connection must be authenticated. You can use the device credentials topics in the MQTT implementation to generate new credentials for a device.

Once the device retrieved the credentials, it needs to store them locally for further connections.

To establish a connection you must configure the following parameters:

- Host: &lt;your&#95;cumulocity_url>
- User: &lt;tenantID>/&lt;username> (user alias is not supported)
- Password: &lt;your&#95;cumulocity_password>

For more information, refer to the [Hello MQTT](/device-integration/mqtt-examples/#hello-mqtt) section.

The process works as follows:

* {{< product-c8y-iot >}} assumes that each device has some form of unique ID. For instance, a good device identifier can be the MAC address of the network adapter, the IMEI of a mobile device or a hardware serial number.
* When you take a new device into use, you enter this unique ID into **Device registration** in the Device Management application in {{< product-c8y-iot >}}, and start the device.
* The device will use this ID as part of the [MQTT ClientId](/device-integration/mqtt#mqtt-clientid) and static user credentials that can be enquired from [product support](/additional-resources/contacting-support/).
* The device subscribes to the topic <kbd>s/dcr</kbd>.
* The device starts publishing continuous empty messages on the topic <kbd>s/ucr</kbd> to notify the server that it is ready to retrieve credentials.
* Next, you must accept the connection from the device in the **Device Registration** page.
* When the device sends the next empty message it should receive credentials in the format `70,<tenantID>,<username>,<password>`.

After receiving the credentials, the device can close the MQTT connection and create a new one with the received credentials.

#### Step 1: Verify device {#step-1-verify-device}

As MQTT supports an automatic device creation if the client sends data and there is no device present, this step is only required if you want to create the device manually.

The device creation can be achieved by employing the [static template 100](/smartrest/mqtt-static-templates/#100). This template can be blindly used on every boot of the device as it will only create the device if it is not already present.

The device will be linked automatically to the ID the client uses with its MQTT ClientId.

```text
100,Device Name,Device Type
```
{{< c8y-admon-info >}}
The topic used for {{< product-c8y-iot >}}'s pre-provided static templates is <kbd>s/us</kbd>.
{{< /c8y-admon-info >}}

#### Step 2: Verify children {#step-2-verify-children}

Like the root device, also its children are covered by the automatic device creation.

To handle this step manually you can send the [static template 101](/smartrest/mqtt-static-templates/#101) for creating a child device. The template will only create the child if it does not already exist.

```text
101,Unique Child ID,Child Name,Child Type
```

#### Step 3: Subscribe topics {#step-3-subscribe-topics}

If the device supports operations, it should subscribe to all required topics (static templates and SmartREST 2.0).

### Cycle phase {#cycle-phase}

#### Step A: Send CSV data {#step-a-send-csv-data}

While the device holds an active MQTT connection, it can publish either on the topics for static templates or on the topics for a SmartREST template to send data to the server.

Based on the MQTT ClientId, the physical device is directly connected to the device object in {{< product-c8y-iot >}}. Therefore, the data you send is automatically connected to the device.

To send data to a child device, publish the data to the topics described in [Device hierarchies](/device-integration/mqtt/#device-hierarchies).

#### Step B: Receive CSV operations {#step-b-receive-csv-operations}

By subscribing to a topic the device automatically tells {{< product-c8y-iot >}} that it wants to receive operations. Any operation created will be automatically parsed using either the static templates or the templates the device defines.
