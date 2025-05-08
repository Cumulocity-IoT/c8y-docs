---
weight: 90
title: Using Cumulocity MQTT Service
layout: redirect
---

The {{< product-c8y-iot >}} MQTT Service is an MQTT endpoint to {{< product-c8y-iot >}} which supports publishing and subscribing arbitrary payloads. These need to be processed within {{< product-c8y-iot >}} into a format that can be consumed by the platform. This connectivity allows for that processing to be done in Streaming Analytics. The MQTT Service allows for messages to be processed by Streaming Analytics before being stored in the platform.

{{< c8y-admon-info >}}The {{< product-c8y-iot >}} MQTT Service feature is currently in private preview. If you would like to have it enabled for your tenant, please contact {{< product-c8y-iot >}} [product support](/additional-resources/contacting-support/).{{< /c8y-admon-info >}}

There are various MQTT Service samples provided to demonstrate usage, see [Create an EPL App](/streaming-analytics/epl-apps/#step-2---create-an-epl-app).

For further documentation on using MQTT Service within EPL Apps, see [the Apama documentation]({{<link-apama-webhelp>}}//standard-connectivity-plugins/cumulocity-mqtt-service/).

Some specific EPL Apps notes:
- You do not need to add any bundles.
- To use the `BASE64_FORMAT`, you need to [create and upload a custom extension](/streaming-analytics/analytics-builder/#creating-your-own-blocks) to parse the binary data. 
