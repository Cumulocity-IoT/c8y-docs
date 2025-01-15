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

### Why MQTT Service?

The MQTT Service, developed by Cumulocity, offers several important benefits:

- **Multi-tenancy support**: A single endpoint serves multiple tenants, simplifying management.
- **Identity management**: Services connected to the MQTT Service use Cumulocity tenant platform credentials.
- **Efficient communication**: Low traffic overhead, ensuring efficient data transfer.
- **WebSocket and TLS support**: Secure and flexible communication options.
- **Scalability**: The service scales horizontally to meet your growing needs.
- **Custom payload formats**: The service uses SenML-JSON, a widely used format for device measurement data.

Starting from release 2025, the {{< product-c8y-iot >}} can send device data to Cumulocity’s MQTT microservice, where the 
data is queued. This enables you to process and read the data via your custom service, with the added benefit 
of being able to leverage Cumulocity's integrated data analysis tools, should you choose to do so.

### Retrieving Device Data from the MQTT Service Using a Custom Microservice

To retrieve device data from the MQTT Service, 
you can create a custom microservice that suits your specific requirements. 
Once the microservice is developed, simply share it with your Operations Team, who will deploy it to the Platform for your tenant.

The microservice should be configured to subscribe to the `lwm2m/data` topic, 
where the {{< product-c8y-iot >}} sends the device data. After deployment, 
the microservice will authenticate using the tenant credentials associated with the deployment. 
For the microservice to function correctly, ensure that the following roles are assigned:

- `ROLE_INVENTORY_READ`
- `ROLE_NOTIFICATION_2_ADMIN`
- `ROLE_MQTT_SERVICE_ADMIN`

Please note that the microservice will only have access to data from the specified tenant and its subtenants. 
If you need to access data from a different tenant, a separate microservice must be deployed for that tenant.

If you need help developing your own microservice, 
you can refer to this [sample project](https://github.com/Cumulocity-IoT/lwm2m-devicedata-listener) for detailed guidance.

### MQTT Data Payload

The data sent via MQTT uses the SenML-JSON format, 
following the [RFC8428 specification](https://datatracker.ietf.org/doc/html/rfc8428). 
Keep in mind that LWM2M’s Time resource data is stored as a timestamp in seconds. 
Additionally, the Base Time may include fractional data and is represented in scientific notation.

Here’s an example of what the MQTT payload looks like when a device reports composite data for Object ID 
6 (Location) and Object ID 3303 (Temperature sensor):

```json
{
  "timestampDataReceived": "2025-01-15T18:03:52.881594523+01:00",
  "sourceOfData": "READ_RESPONSE",
  "deviceId": "65107",
  "tenantId": "management",
  "lwm2mEndpoint": "imei:test:device",
  "registrationId": "HKYbqsjcP7",
  "senMLMessage": [
    {
      "bn": "/6/0/",
      "bt": 1.7369606328815944E9,
      "n": "0",
      "v": 35.0
    },
    {
      "n": "1",
      "v": 21.0
    },
    {
      "n": "5",
      "v": 1736960596
    },
    {
      "bn": "/3303/0/",
      "bt": 1.7369606328815944E9,
      "n": "5601",
      "v": 18.2
    },
    {
      "n": "5602",
      "v": 22.3
    },
    {
      "n": "6050",
      "v": 0.25
    },
    {
      "n": "5700",
      "v": 20.6
    },
    {
      "n": "5701",
      "vs": "cel"
    },
    {
      "n": "5518",
      "v": 1736960632
    }
  ]
}
```

This JSON structure includes timestamped data for both the Location and Temperature sensor, 
along with other relevant metrics.
