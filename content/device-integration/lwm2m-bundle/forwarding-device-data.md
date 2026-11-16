---
weight: 100
title: Forwarding device data to the Messaging Service
layout: redirect
---

In addition to mapping device data to the {{< product-c8y-iot >}} domain model, the LWM2M service can forward the data that it receives from LWM2M devices to the {{< product-c8y-iot >}} Messaging Service.
The Messaging Service is a deployment of [Apache Pulsar](https://pulsar.apache.org/) that stores messages on topics until a consumer processes them.
You can consume the forwarded data with your own microservice or external application and process it as your use case requires.

{{< c8y-admon-preview >}}
Forwarding device data to the Messaging Service is in Private Preview. It is not enabled by default and may be subject to change in the future. To have it enabled for your tenant, contact [product support](/additional-resources/contacting-support/). For more information on previews, see [Previewing features](/service-terms/previews/).
{{< /c8y-admon-preview >}}

### How data forwarding works {#how-data-forwarding-works}

{{< company-c8y >}} enables data forwarding for individual tenants in the configuration of the LWM2M service.

When data forwarding is enabled for a tenant, the LWM2M service publishes one message for every set of resource values that it receives from a device of that tenant.
This includes the responses to read and observe requests, the notifications for observed resources, and the data that a device sends with the LWM2M Send operation.

The LWM2M service publishes all messages of a tenant to a single Pulsar topic:

| Component        | Value        | Description                                                                             |
|------------------|--------------|-----------------------------------------------------------------------------------------|
| Pulsar tenant    | `<tenantID>` | The Pulsar tenant matches the ID of your {{< product-c8y-iot >}} tenant.                |
| Pulsar namespace | `lwm2m`      | The namespace is reserved for the LWM2M service.                                        |
| Topic name       | `lwm2m/data` | The topic contains the data of all LWM2M devices in the tenant.                         |

Forwarding has the following properties:

- **Tenant isolation**: Each tenant has its own topic. A consumer only receives the data of the tenant that it authenticates against.
- **Persistent storage**: The Messaging Service retains each message until every registered consumer acknowledges it, or until the message reaches its time-to-live limit. A consumer that reconnects after an interruption receives the messages that it missed.
- **Independent processing**: Forwarding does not change how the LWM2M service processes device data. The configured [LWM2M device protocols](/device-integration/lwm2m/#device-protocols) still create measurements, events, and alarms.
- **Retries**: If the LWM2M service cannot publish a message, for example because the Messaging Service is temporarily unavailable or the backlog quota of the topic is reached, it buffers the message and retries a limited number of times. The LWM2M service discards messages that still cannot be published after the last retry, and the device does not receive an error.

### Consuming the forwarded device data {#consuming-forwarded-device-data}

Your microservice or external application consumes the forwarded data through the WebSocket consumer endpoint of the [Notifications 2.0](/notifications/notifications-overview/) API.
To learn how to develop and deploy a microservice, refer to [Microservice SDK](/microservice-sdk/) and [Managing microservices](/standard-tenant/ecosystem/#managing-microservices).

To consume the data, follow these steps:

1. Request a token for the LWM2M topic.
   Send a [create token request](https://cumulocity.com/api/core/#operation/postNotificationTokenResource) with the following fields:

   ```http
   POST /notification2/token
   Content-Type: application/json

   {
     "subscriber": "lwm2mDataConsumer",
     "subscription": "lwm2m/data",
     "type": "lwm2m",
     "expiresInMinutes": 1440
   }
   ```

   | Field              | Description                                                                                                  |
   |--------------------|--------------------------------------------------------------------------------------------------------------|
   | `subscriber`       | A unique alphanumeric name for your consumer. Use the same name every time the consumer connects, so that the Messaging Service resumes delivery where the consumer stopped. |
   | `subscription`     | The name of the topic. The value must be `lwm2m/data`.                                                       |
   | `type`             | The token type. The value must be `lwm2m`, which selects the `lwm2m` namespace.                              |
   | `expiresInMinutes` | The validity period of the token. Request a new token before the current token expires.                      |

2. Open a WebSocket connection to `wss://<tenant_domain>/notification2/consumer/?token=<token>`.
   For details on the endpoint, see [Consumer protocol](/notifications/consumer-protocol/).

3. Decode each message that you receive.
   A message consists of two parts that are separated by a line break: an acknowledgment header and the Base64-encoded message body.
   The message body is an [Apache Avro](https://avro.apache.org/) record with a `payload` field, which contains the device data as UTF-8 encoded JSON, and a `metadata` field, which contains the topic name.
   For the structure of the JSON document, see [Device data payload](#device-data-payload).

4. Acknowledge each message after you have processed it by sending its acknowledgment header back on the same connection.
   The Messaging Service redelivers messages that are not acknowledged.

The user that requests the token must have the following role.
For a microservice, add the role to the `requiredRoles` section of the [microservice manifest](/microservice-sdk/general-aspects/#microservice-manifest):

- `ROLE_NOTIFICATION_2_ADMIN`

A consumer only has access to the data of the tenant that issued its token.
To consume the data of several tenants, subscribe each tenant to your microservice and request one token per tenant with the service user of that tenant.

{{< c8y-admon-caution >}}
The Messaging Service applies a backlog quota and a message time-to-live limit to the topic.
If your consumer does not acknowledge messages or stays disconnected for a long time, the topic reaches its backlog quota and new device data is no longer forwarded.
Process and acknowledge messages promptly, and unsubscribe consumers that you no longer need.
For details, see [Notification 2.0 Service Quotas](/notifications/notifications-overview/#notification-2-0-service-quotas).
{{< /c8y-admon-caution >}}

### Device data payload {#device-data-payload}

The payload of each message is a JSON document with the following fields:

| Field                   | Description                                                                                         |
|-------------------------|-----------------------------------------------------------------------------------------------------|
| `timestampDataReceived` | The time at which the LWM2M service received the data, in ISO 8601 format.                           |
| `sourceOfData`          | The LWM2M interaction that delivered the data. See the table below for the possible values.         |
| `deviceId`              | The ID of the device managed object in the platform.                                                |
| `tenantId`              | The ID of the tenant that the device belongs to.                                                    |
| `lwm2mEndpoint`         | The LWM2M endpoint name of the device.                                                              |
| `registrationId`        | The ID of the LWM2M registration in which the data was received.                                    |
| `senMLMessage`          | The device data in SenML-JSON format, as defined in [RFC 8428](https://datatracker.ietf.org/doc/html/rfc8428). |

The field `sourceOfData` has one of the following values:

| Value                  | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| `READ_RESPONSE`        | The device returned the data in response to a read request from the server. |
| `OBSERVATION_RESPONSE` | The device returned the data in response to an observe request from the server. |
| `NOTIFICATION`         | The device sent the data as a notification for an observed resource.        |
| `SEND`                 | The device sent the data with the LWM2M Send operation.                     |

In `senMLMessage`, the values of LWM2M resources of type Time are timestamps in seconds.
The base time (`bt`) is a timestamp in seconds that can include fractions of a second and is written in scientific notation.

The following example shows the payload for a device that reports composite data for object 6 (Location) and object 3303 (Temperature):

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
