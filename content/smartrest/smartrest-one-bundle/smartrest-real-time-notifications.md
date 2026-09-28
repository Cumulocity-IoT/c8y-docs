---
weight: 60
title: SmartREST Real-time Notifications
layout: redirect
---

All available real-time notification endpoints and channels of the {{< product-c8y-iot >}} platform are also available in a SmartREST syntax.
See the [Real-time notification API](https://{{< domain-c8y >}}/api/core/#tag/Real-time-notification-API) to understand the general functionality of the [Bayeux protocol](https://docs.cometd.org/current/reference/#_concepts_bayeux_protocol) and to get an overview of our available endpoints and channels for real-time notifications.

### Using Real-time Notifications with SmartREST {#using-real-time-notifications-with-smartrest}

To tell the {{< product-c8y-iot >}} platform that the real-time notifications should use SmartREST all requests send to the URL must contain the `X-Id` header.

#### Message identifiers {#message-identifiers}

Message identifier | Message parameters              | Description
-------------------|-------------------------|------------
80 | *None* | Initial handshake that will return a unique bayeux clientId.
81 | clientId,channel | Subscribe for the given channel.
82 | clientId,channel | Unsubscribe for the given channel.
83 | clientId | Establish conntection for receiving the notifications (long-polling).
84 | clientId | Disconnect the client from the server.

#### Handshake {#handshake}

Example request:

	80

Example response:

	Un1q31d3nt1f13r


#### Subscribe {#subscribe}

Example request:

	81,Un1q31d3nt1f13r,/mychannel

Example response:

Unless there is an error there is no specific response for the subscribe

#### Unsubscribe {#unsubscribe}

Example request:

	82,Un1q31d3nt1f13r,/mychannel

Example response:

Unless there is an error there is no specific response for the unsubscribe

#### Connect {#connect}

Example request:

	83,Un1q31d3nt1f13r

Example response:

The response is formed by the response templates registered via SmartREST for the `X-Id`. Every received notification via real-time will be parsed  with the available templates and every matching template will be returned as response for the connect request.

Keep-Alive:

The {{< product-c8y-iot >}} platform will send every 10 minutes a space character through an open long-polling connection to detect connection loss. A response for a connect that has been open for a longer time could contain leading space characters in the first line of the response.

#### Disconnect {#disconnect}

Example request:

	84,Un1q31d3nt1f13r

Example response:

Unless there is an error there is no specific response for the disconnect

#### The advice response {#the-advice-response}

The bayeux protocol has a special fragment to tell the client about the recommended settings for timeout of a connection, interval between connect requests and the policy for the follow up after a response for a connect. The advice will be communicated via SmartREST also as a seperate line in the response and can be contained in any response of the above requests.

Response Structure:

	86,<timeout>,<interval>,<reconnect policy>

Timeout and interval will be numbers defining the time in millisecons. The reconnect policy can be one of three values:
- none: do not reconnect after the response from a connect.
- retry: do reconnect after the response from a connect.
- handshake: start with a new handshake (for example because the clientId is invalid / server has closed session).

An advice response line does not need to have every value filled

Example:

	86,,10000,retry

### Subscribing with multiple templates {#subscribing-with-multiple-templates}

If your device uses multiple templates (for example, child devices have a different template than the parent) it is possible to add these templates to your subscribe request. The server will than use all templates (from header and subscribe statement) to parse the responses.

Example request:

	POST /notification/operations HTTP/1.0
	Authorization: Basic ...
	X-Id: mytemplate1

	81,Un1q31d3nt1f13r,/mychannel,mytemplate2,mytemplate3

In this case multiple templates are used and the response will contain an additional line that indicates which lines are parsed with which templates:

87,{number of  parsed rows},{X-Id used to parse the following rows}

Example response:

	HTTP/1.0 200 OK

 	87,2,mytemplate1
	100,myvalue
	101,myvalue2
	87,1,mytemplate3
	100,myvalue3
