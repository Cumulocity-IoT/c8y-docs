---
weight: 20
title: Configure the Loriot agent endpoint credentials via the Loriot Network Server and register devices on receiving uplink messages
layout: redirect
---

Before using LoRa devices with {{< product-c8y-iot >}}, you must configure the {{< product-c8y-iot >}} Loriot agent endpoint details in LORIOT Network Server.

### <a name="map-loriot-endpoint-with-credentials">Configuring the Loriot endpoint using Basic authentication</a>

In LORIOT Network Server you can create multiple applications. Each application allows you to configure LoRa devices.

To specify the Loriot agent endpoint with user credentials, navigate to one of the applications in your LORIOT Network Server account and select **Output** in the **Application** menu in the navigator.

LORIOT Network Server forwards the LoRa device messages to the external applications using different connectors which are available in the **Output** section.

![Output page with https forwarder](/images/device-protocols/lora-loriot/loriot-output-https-page.png)

Use {{< product-c8y-iot >}} data forwarder for configuring the Loriot endpoint using Basic authentication.

![Setting endpoint credentials](/images/device-protocols/lora-loriot/loriot-endpoint-assignment.png)

Always keep the **Gateway Information** option enabled because the Loriot agent only processes "gw" (gateway information) messages.

![Enable gateway information option](/images/device-protocols/lora-loriot/loriot-gateway-option-enabled.png)

The Loriot devices can now be registered in Cumulocity when uplink messages are received. 

## <a name="uplink-message-device-creation">Device Creation via Loriot Uplink Message</a>

While processing the Loriot LoRa device request, the Loriot agent automatically creates the device in the {{< product-c8y-iot >}} platform, if it does not yet exist. This means that the user does not need to register the Loriot LoRa device explicitly.

LORIOT Network Server forwards two types of messages to the Loriot agent: "rx" (uplink message) and "gw" (gateway information).

The Loriot LoRa agent only processes "gw" messages to avoid duplicate measurements or events in {{< product-c8y-iot >}}, because most of the information matches with "gw" message whereas "gw" message also carries
all gateway information.

{{< c8y-admon-info >}}
You must enable the "gw" message option on LORIOT Network Server while connecting to the Loriot LoRa agent, see [Configuring the Loriot agent endpoint credentials](#configure-loriot-credentials).
{{< /c8y-admon-info >}}

In the below Loriot LoRa device message `gws` represents a list of gateways involved in the network.

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

The Loriot Lora agent picks `gw` with the oldest timestamp for processing.
The Loriot LoRa agent maps the `rssi` value to the standard {{< product-c8y-iot >}} `SignalStrength` object and updates the device managed object with the `lat` and `lon` values.

The device registered with the EUI above, must be re-registered via the provided Cumulocity API (see [Configure the Loriot agent endpoint credentials and register the devices via Cumulocity](#configure-loriot-credentials-cumulocity)), to be associated with an LNS Connection and a particular device type, in order to be able to send downlink messages