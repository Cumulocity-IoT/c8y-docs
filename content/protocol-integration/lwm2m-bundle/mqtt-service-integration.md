---
weight: 100
title: Send Device Data to Cumulocity’s MQTT Service
layout: redirect
---

This guide helps you configure the {{< product-c8y-iot >}} to send device data to Cumulocity's MQTT Service. 
Once configured, you can easily access and process the data using your own microservice, giving you the flexibility 
to handle the data in a way that suits your specific needs.

{{< c8y-admon-important >}}
To ensure a smooth setup, please make sure that both Pulsar and the MQTT Service are properly configured and 
running before starting the {{< product-c8y-iot >}} configuration. Missing these prerequisites may result in excessive log 
entries indicating that the {{< product-c8y-iot >}} cannot establish a connection to the MQTT Service.
{{< /c8y-admon-important >}}

{{< c8y-admon-info >}}
If you are not familiar with MQTT, we recommend reviewing one of the many online resources available. For more 
details, you can visit the [MQTT website](https://mqtt.org/mqtt-specification/).
{{< /c8y-admon-info >}}

### What is MQTT Service?

The MQTT Service, developed by Cumulocity, offers several important benefits:

- **Multi-tenancy support**: A single endpoint serves multiple tenants, simplifying management.
- **Identity management**: Services connected to the MQTT Service use Cumulocity tenant platform credentials.
- **Efficient communication**: Low traffic overhead, ensuring efficient data transfer.
- **WebSocket and TLS support**: Secure and flexible communication options.
- **Scalability**: The service scales horizontally to meet your growing needs.
- **Custom payload formats**: The service uses SENML-JSON, a widely-used format for device measurement data.

Starting from release 2025, the {{< product-c8y-iot >}} can send device data to Cumulocity’s MQTT microservice, where the 
data is queued. This enables you to process and read the data via your custom service, with the added benefit 
of being able to leverage Cumulocity's integrated data analysis tools, should you choose to do so.

### Configuration Instructions

Follow these steps to configure the {{< product-c8y-iot >}} to send device data to the MQTT Service:

| **Property** | **Description** |
|--------------|-----------------|
| `C8Y.mqtt.messaging.service.url` | Enter the WebSocket URL for the MQTT service (e.g., `ws://cumulocity.default.svc.cluster.local`). |
| `C8Y.mqtt.messaging.service.enabledForTenants` | List the tenants whose device data should be sent to the MQTT Service, separated by commas. |

If you provide the MQTT service URL but do not specify any tenants, 
the {{< product-c8y-iot >}} will not establish a connection.

To retrieve data from the MQTT Service, you can deploy a custom microservice using the Microservice Deployer. 
The microservice will use the tenant’s credentials and must have the following roles assigned to function correctly:

- `ROLE_INVENTORY_READ`
- `ROLE_NOTIFICATION_2_ADMIN`
- `ROLE_MQTT_SERVICE_ADMIN`

Once deployed, the microservice will subscribe to the `lwm2m/data` topic, where the {{< product-c8y-iot >}} 
sends the device data. Note that it will only retrieve data for the specified tenant and its subtenants. 
If you need data from another tenant, you’ll need to deploy a separate microservice for that tenant.

For a detailed example of how to develop your own microservice, check out this 
[sample project](https://github.com/Cumulocity-IoT/lwm2m-devicedata-listener).

### MQTT Data Payload

The MQTT data payload uses the SENML-JSON format and follows the 
[RFC8428 specification](https://datatracker.ietf.org/doc/html/rfc8428). Keep in mind that 
LWM2M’s Time resource data is stored as a timestamp in seconds, while the Base Time may include 
fractional data and is represented in scientific notation.
