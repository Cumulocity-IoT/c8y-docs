---
weight: 30
title: Subscribe
layout: redirect
---

A notification client can send subscribe messages and specify there the desired channel to receive output messages from Cumulocity IoT server. The client will receive the messages in succeeding connect requests.

The format of channels names is different according to the REST API in which the real-time notification service is used. See [Device control](/reference/device-control) for more details.

### Request

|Name|Type|Occurs|Description|
|:---|:---|:-----|:----------|
|id|Integer|1|ID of message, required to match response message.|
|channel|String|1|Name of channel, required value "/meta/subscribe"|
|clientId|String|1|Unique ID of client received during handshake.|
|subscription|String|1|Name of channel to subscribe to.|

Example Request:
```http
POST /cep/realtime
Host: ...
Authorization: Basic ...
Content-Length: ...
Content-Type: application/json
[
  {
    "channel": "/meta/subscribe",
    "clientId": "Un1q31d3nt1f13r",
    "subscription": "/alarms/<Device ID>"
  }
]
```

### Response

|Name|Type|Occurs|Description|
|:---|:---|:-----|:----------|
|id|Integer|1|ID of message passed in request message.|
|channel|URI|1|Name of channel, required value "/meta/subscribe".|
|clientId|String|1|Unique ID of client.|
|subscription|String|1|Name of channel.|
|successful|Boolean|1|Result of subscription.|
|error|String|0..1|Subscription failure reason.|

Example response:

```http
HTTP/1.1 200 OK
Content-Type: application/json
[
  {
    "channel": "/meta/subscribe",
    "clientId": "Un1q31d3nt1f13r",
    "subscription": "/alarms/<Device ID>",
    "successful": true,
    "error": ""
  }
]
```
