---
weight: 20
title: Device registration via uplink message
layout: redirect
---

Before using LoRa devices with {{< product-c8y-iot >}}, you must configure the {{< product-c8y-iot >}} Loriot agent endpoint details in LORIOT Network Server.

### Configuring the Loriot endpoint using basic authentication {#configuring-the-loriot-endpoint-using-basic-authentication}

In LORIOT Network Server you can create multiple applications. Each application allows you to configure LoRa devices.

To specify the Loriot agent endpoint with user credentials, navigate to one of the applications in your LORIOT Network Server account and select **Output** in the **Application** menu in the navigator.

LORIOT Network Server forwards the LoRa device messages to the external applications using different connectors which are available in the **Output** section.

![Output page with https forwarder](/images/device-protocols/lora-loriot/loriot-output-https-page.png)

Use {{< product-c8y-iot >}} data forwarder for configuring the Loriot endpoint using basic authentication.

![Setting endpoint credentials](/images/device-protocols/lora-loriot/loriot-endpoint-assignment.png)

Always keep the **Gateway Information** option enabled because the Loriot agent only processes "gw" (gateway information) messages.

![Enable gateway information option](/images/device-protocols/lora-loriot/loriot-gateway-option-enabled.png)

The Loriot devices can now be registered in {{< product-c8y-iot >}} when uplink messages are received.

### Device creation via Loriot uplink message {#device-creation-via-loriot-uplink-message}

While processing the Loriot LoRa device request, the Loriot agent automatically creates the device in the {{< product-c8y-iot >}} platform, if it does not yet exist.
This means that you do not need to register the Loriot LoRa device explicitly.

LORIOT Network Server forwards two types of messages to the Loriot agent: "rx" (uplink message) and "gw" (gateway information).

The Loriot LoRa agent only processes "gw" messages to avoid duplicate measurements or events in {{< product-c8y-iot >}}, because most of the information matches with "gw" message whereas "gw" message also carries all gateway information.

{{< c8y-admon-info >}}
You must enable the "gw" message option on LORIOT Network Server while connecting to the Loriot LoRa agent, see [Device registration via {{< product-c8y-iot >}}](#device-registration-via-platform).
{{< /c8y-admon-info >}}

In the Loriot LoRa device message below, `gws` represents a list of gateways involved in the network:

```
{
    "cmd"  : "gw",
    "EUI"  : "0102030405060708",
    "ts"   : 1470850675433,
    "ack"  : false,
    "fcnt" : 1,
    "port" : 1,
    "data" : "0102AABB",
    "freq" : 868500000,
    "dr"   : "SF12 BW125 4/5",
    "gws"  : [
        {
            "rssi"  : -130,
            "snr"   : 1.2,
            "ts"    : 43424140,
            "gweui" : "1122334455667788.0",
            "lat"   : 47.284687,
            "lon"   :  8.565746
        }
    ]
}

```

The Loriot LoRa agent picks `gw` with the oldest timestamp for processing.
The Loriot LoRa agent maps the `rssi` value to the standard {{< product-c8y-iot >}} `SignalStrength` object and updates the device managed object with the `lat` and `lon` values.

In order to be able to send downlink operations, the devices registered via uplink message must be re-registered using {{< product-c8y-iot >}} (see [Device registration via {{< product-c8y-iot >}}](#device-registration-via-platform)), to be associated with a connection and a device type.
