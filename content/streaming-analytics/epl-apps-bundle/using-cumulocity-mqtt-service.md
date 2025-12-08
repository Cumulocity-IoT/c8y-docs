---
weight: 90
title: Using Cumulocity MQTT Service
layout: redirect
---

The {{< product-c8y-iot >}} MQTT Service is an MQTT endpoint to {{< product-c8y-iot >}} which supports publishing and subscribing arbitrary payloads. These need to be processed within {{< product-c8y-iot >}} into a format that can be consumed by the platform. This connectivity allows for that processing to be done in Streaming Analytics. The MQTT Service allows for messages to be processed by Streaming Analytics before being stored in the platform and for Streaming Analytics to send messages to the device.

{{< c8y-admon-info >}}The {{< product-c8y-iot >}} MQTT Service feature is currently in Public Preview and may be subject to change in the future.
{{< /c8y-admon-info >}}

MQTT Service samples are provided to demonstrate how to consume and publish device-specific messages using the DeviceService API. See [Create an EPL App](/streaming-analytics/epl-apps/#step-2---create-an-epl-app) for details.

For further documentation on using the MQTT Service generally, see [MQTT Service](/device-integration/mqtt-service/), and for using it within EPL Apps, see [the Apama documentation]({{<link-apama-webhelp>}}/standard-connectivity-plugins/device-service/).

Some specific EPL Apps notes:
- You do not need to add any bundles.
- To use the `BASE64_FORMAT`, you need to [create and upload a custom extension](/streaming-analytics/analytics-builder/#creating-your-own-blocks) to parse the binary data. 
