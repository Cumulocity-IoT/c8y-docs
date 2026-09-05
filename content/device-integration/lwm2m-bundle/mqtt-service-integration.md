---
weight: 100
title: Send device data to Cumulocity’s MQTT Service
layout: redirect
---

Alternatively, the LWM2M service can send the device data to {{< product-c8y-iot >}}'s MQTT Service.
Once configured, you can access and process the data using your own microservice.
This gives you the flexibility to handle the data in a way that suits your specific needs.


{{< c8y-admon-info >}}
If you're new to MQTT Service,
we recommend you to review the [MQTT Service documentation](/device-integration/mqtt/) for a better understanding.
{{< /c8y-admon-info >}}

### Why choose MQTT Service?

Cumulocity's MQTT Service offers several key advantages that can help streamline your IoT operations:

- **Multi-tenancy support**: Manage multiple tenants with a single endpoint, simplifying operations.
- **Identity management**: Easily manage service connections using {{< product-c8y-iot >}} platform credentials.
- **Efficient communication**: Benefit from low traffic overhead for quick and efficient data transfer.
- **Secure communication**: Enjoy the flexibility of WebSocket and TLS support for secure communication.
- **Scalability**: Scale your operations seamlessly as your needs grow.
- **Custom payload formats**: Data is transmitted in JSON format, wrapping SenML-JSON for device-related information.

The LWM2M service can send device data to {{< product-c8y-iot >}}'s MQTT microservice,
where it gets queued. This allows you to process and access the data via your custom service
and take advantage of {{< product-c8y-iot >}}’s integrated data analysis tools, if needed.

### How to retrieve device data from MQTT Service using your custom microservice

You can retrieve device data from the MQTT Service
by creating your own custom microservice tailored to your requirements.
To learn how to develop a {{< product-c8y-iot >}} microservice,
refer to [Microservice SDK](/microservice-sdk/).

Once your microservice is ready, deploy it to {{< product-c8y-iot >}}
by following the steps outlined in [Managing microservices](/standard-tenant/ecosystem/#managing-microservices).

Your microservice should subscribe to the `lwm2m/data` topic, where the LWM2M service sends device data.
After deployment, the microservice will authenticate using the tenant credentials associated with your deployment.
To ensure the microservice has sufficient permissions to access the MQTT Service data, assign the following roles:

- `ROLE_INVENTORY_READ`
- `ROLE_NOTIFICATION_2_ADMIN`

Note that the microservice will only have access to data from the specific tenant and its subtenants.
If you need to access data from a different tenant, a separate microservice must be deployed for that tenant.

If you need help getting started,
check out this [sample project](https://github.com/Cumulocity-IoT/lwm2m-devicedata-listener) for a detailed walkthrough.

### Understanding MQTT data payload

The data transmitted via MQTT follows a custom {{< product-c8y-iot >}} JSON format, which includes:

| Field                 | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| `timestampDataReceived` | Timestamp when the device data was received from the LWM2M service          |
| `sourceOfData`          | Describes the type of operation that triggered the data. This can be one of the following: |
|                       |  - `OBSERVATION_RESPONSE`: Data received in response to an observation request, triggered by the server. |
|                       |  - `NOTIFICATION`: Data received from the device as a notification, triggered by the device itself. |
|                       |  - `READ_RESPONSE`: Data received via any read operation, triggered by the server. |
|                       |  - `SEND`: Data received from the device via the LWM2M SEND command. |
| `deviceId`              | The device ID assigned upon registration in the platform                     |
| `tenantId`              | The ID of the tenant associated with the device                              |
| `lwm2mEndpoint`         | The device name as assigned to the platform                                  |
| `registrationId`        | The registration ID of the device                                            |
| `senMLMessage`          | Contains SenML-JSON formatted device measurement data, following the [RFC8428 specification](https://datatracker.ietf.org/doc/html/rfc8428) |

Note that in `senMLMessage` LWM2M's time resource data is always stored as a timestamp in seconds,
and the base time data is represented in scientific notation, which may include also fractional time information.

Here’s an example of the MQTT payload when a device reports composite data for Object ID
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
