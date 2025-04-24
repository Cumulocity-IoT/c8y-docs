---
weight: 50
title: JSON via MQTT
layout: bundle
sector:
  - device_management
---

{{< c8y-admon-info >}}
JSON via MQTT is meant as an addition to a device that is connected via SmartREST. This is not a standalone interface.
{{< /c8y-admon-info >}}

This section describes the JSON payload format that can be used with the {{< product-c8y-iot >}} MQTT implementation.

Compared to SmartREST 2.0 – which only works with fixed templates – JSON's support for MQTT was designed to combine the payload flexibility of our REST API with the low protocol overhead of MQTT.

The SmartREST way should still be the preferred way if it is important to reduce your payload to the minimum (mobile traffic, low capability device).

### Topic structure {#topic-structure}

The topic structure in JSON MQTT is quite similar to the REST endpoints. The main difference is in the additional action part which is included in the topic.

To publish messages:

```http
 <api>/<resource>/<action>/<resource_id>
```


To publish messages in transient mode:

```http
t/<api>/<resource>/<action>/<resource_id>
```


To publish messages in quiescent mode:

```http
q/<api>/<resource>/<action>/<resource_id>
```


To publish messages in CEP mode:

```http
c/<api>/<resource>/<action>/<resource_id>
```

{{< c8y-admon-info >}}
`<resource_id>` is not required for every `<action>`. See the examples below.
{{< /c8y-admon-info >}}

Refer to [Processing mode](https://{{< domain-c8y >}}/api/core/#section/REST-implementation/HTTP-usage) for more information about transient, quiescent and CEP data processing.

#### Topic actions {#topic-actions}

The action in the topic corresponds to the HTTP methods combined with the content-type header.

The following actions are available:

- create - corresponds to HTTP POST
- createBulk - corresponds to HTTP POST with the content-type header value set to collection media type, for example `application/vnd.com.nsn.cumulocity.measurementCollection+json;charset=UTF-8;ver=0.9`
- update - corresponds to HTTP PUT
- delete - corresponds to HTTP DELETE


### Supported endpoint {#supported-endpoint}

The current JSON MQTT implementation does not cover all SmartREST 2.0 operations, so for example the whole [device bootstrap process](/device-integration/mqtt/) must be done using SmartREST 2.0.

The following endpoints and actions are supported:

|Endpoint|create|createBulk|update|delete|
|:-------|:-----|:---------|:-----|:-----|
|[event/events](https://{{< domain-c8y >}}/api/core/#tag/Events)|x|x|x|x|
|[alarm/alarms](https://{{< domain-c8y >}}/api/core/#tag/Alarms)|x|x|x|&nbsp;|
|[measurement/measurements](https://{{< domain-c8y >}}/api/core/#tag/Measurements)|x|x|&nbsp;|x|
|[inventory/managedObjects](https://{{< domain-c8y >}}/api/core/#tag/Managed-objects)|x|&nbsp;|x|&nbsp;|
|[inventory/managedObjects/{id}/childDevices](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectChildDevicesResource)|x|&nbsp;|&nbsp;|&nbsp;|

If the operation is not supported, a proper error message will be sent to the <kbd>error</kbd> topic.

For all of the above endpoints, you can use the same payload like in the REST API. The only difference is in the "source" field - in REST this field is mandatory while for JSON MQTT there is no need to set the device ID here.
The source device ID will automatically be resolved based on the MQTT client ID. This value will always be used no matter if something is already defined there.

### Examples {#examples}

#### Create new event {#create-new-event}

Publish a message on topic <kbd>event/events/create</kbd> with payload:

```json
{
  "type": "TestEvent",
  "text": "sensor was triggered",
  "time": "2014-03-03T12:03:27.845Z"
}
```

#### Create many events {#create-many-events}

Publish a message on topic <kbd>event/events/createBulk</kbd> with payload:

```json
{
  "events": [
    {
      "type": "TestEvent1",
      "text": "sensor was triggered",
      "time": "2014-03-03T12:03:27.845Z"
    },
    {
      "type": "TestEvent2",
      "text": "sensor was triggered",
      "time": "2014-03-04T12:03:27.845Z"
    }
  ]
}
```

#### Update event {#update-event}

Publish a message on topic <kbd>/event/events/update/&lt;event_id&gt;</kbd> with payload:

```json
{
  "text": "new text"
}
```

#### Delete event {#delete-event}

Publish a message on topic <kbd>/event/events/delete/&lt;event_id&gt;</kbd> with empty payload.

#### Create a measurement data point {#create-a-measurement-data-point}

Publish a message on topic <kbd>measurement/measurements/create</kbd> with payload:

```json
{
  "type": "c8y_TemperatureMeasurement",
  "time": "2021-09-06T17:35:14.000+02:00",
  "c8y_TemperatureMeasurement": {
  	"T": {
      	"value": 20,
          "unit": "C"
    }
  }
}
```


### Error handling {#error-handling}

Use the <kbd>error</kbd> topic to subscribe for errors related to the JSON MQTT implementation. In case of invalid payload, wrong topic or any other exception, a notification will be published on this topic. The payload is in JSON format. Besides a standard error message, it also contains a message ID which helps the client in finding out which exact message was failing.

Example payload:

```json
{
  "error": "undefined/validationError",
  "message": "Following mandatory fields should be included: severity,text,time",
  "messageId": 3
}
```

### Receiving operations {#receiving-operations}

A notification client can subscribe to the <kbd>devicecontrol/notifications</kbd> topic to receive notifications of newly created operations. Initially upon subscription, all operations which are not yet forwarded will be published.

Additionally, it contains an [External ID](https://{{< domain-c8y >}}/api/core/#tag/External-IDs), so the client can identify for which child the operation is executed.

Example notification:

```json
{
  "agentId": "1",
  "creationTime": "2018-05-17T07:33:15.555Z",
  "delivery": {
    "log": [

    ],
    "status": "PENDING",
    "time": "2018-05-17T07:33:15.575Z"
  },
  "deviceId": "2",
  "id": "123",
  "status": "PENDING",
  "c8y_Command": {
    "text": "Do something"
  },
  "description": "Execute shell command",
  "externalSource": {
    "externalId": "3",
    "type": "c8y_Serial"
  }
}
```
