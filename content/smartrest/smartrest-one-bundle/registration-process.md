---
weight: 40
title: Registration process
layout: redirect
---

This reference guide solely focusses on the registration of SmartREST templates using the SmartREST `/s` endpoint. Alternatively, templates can also be registered using the platform inventory API.

Before a SmartREST template can be registered, its existence must be checked. If the template already exists, a registration is not necessary and yields an error message.

The existence of a SmartREST template can be checked by making an empty request:

	POST /s HTTP/1.0
	Authorization: Basic ...
	X-Id: ...
	Transfer-Encoding: chunked

If the template exists, the following response is yielded where the message identifier `20` indicates that the template exists in the inventory and the parameter `123456` indicates the managed object GId of the template:

	HTTP/1.1 200 OK
	Transfer-Encoding: chunked

	20,12345

If the template does not exist, a response containing an error message is yielded:

	HTTP/1.1 200 OK
	Transfer-Encoding: chunked

	40,"No template for this X-ID."

If the template does not exist, a template registration request can be issued using the previously checked `X-Id`.

Templates can be registered with one single request containing SmartREST template in the form of CSV data. The difference between a template registration request and a normal SmartREST request is that rows are not processed individually during template registration.

	POST /s HTTP/1.0
	Authorization: Basic ...
	X-Id: ...
	Transfer-Encoding: chunked

	10,100,POST,/inventory/managedObjects,application/vnd.com.nsn.cumulocity.managedObject+json,application/vnd.com.nsn.cumulocity.managedObject+json,,,"{""name"":""Test Device"",""type"":""com_example_TestDevice"",""c8y_IsDevice"":{}}"
	11,201,,"$.c8y_IsDevice","$.id"

If the template registration is successful, a response like below will be returned.

	HTTP/1.1 200 OK
	Transfer-Encoding: chunked

	20,12345

### Syntax {#syntax}

Each request and response template is contained within one row of the template data. Request templates are indicated by the message identifier `10` and response templates by the identifier `11`. Should one of those message identifiers occour in a SmartREST request, the entire request is treated as a template. Thus any other message identifier besides `10` and `11` will yield an error.

#### Request templates {#request-templates}

Request templates have the following syntax:

	10,<ID>,<METHOD>,<URI>,<CONTENT>,<ACCEPT>,<PLACEHOLDER>,<PARAMS>,<TEMPLATE>

Where:

* `<ID>` is the message identifier of the request template.
* `<METHOD>` is the HTTP method used for the request. `GET`, `POST`, `PUT` and `DELETE` are supported.
* `<URI>` is the resource identifier.
* `<CONTENT>` is the `Content-Type` header field value.
* `<ACCEPT>` is the `Accept` header field value. This is mostly equal to `<CONTENT>`.
* `<PLACEHOLDER>` is the placeholder string which is replaced by parameters in the request URI and template string.
* `<PARAMS>` is a space-separated list of parameter types which are required for the template. The number of occourances of the placeholder string in the request URI and template string must be equal to the number of parameters specified.
  * `STRING` parameters will only yield an error if no value is specified.
  * `UNSIGNED` parameters will yield an error if the supplied parameter is not an unsigned integer.
  * `INTEGER` parameters will yield an error if the supplied parameter is not a signed integer.
  * `NUMBER` parameters will yield an error if the supplied parameter is not a floating-point number.
  * `DATE` parameters will yield an error if the parameter cannot be parsed as a date.
  * `NOW` parameters will never yield an error. No request parameter is required.
* `<TEMPLATE>` is the actual template string which gets sent as payload to the platform after the placeholders have been replaced with the parameter values.

Here is a set of example requests:

```
10,100,POST,/alarm/alarms,application/vnd.com.nsn.cumulocity.alarm+json,application/vnd.com.nsn.cumulocity.alarm+json,&&,UNSIGNED NOW,"{""source"":{""id"":""&&""},""type"":""c8y_MyAlarmFromSmartREST"",""text"":""This alarm was created by using SmartREST"",""severity"":""MAJOR"",""status"":""ACTIVE"",""time"":""&&""}"
10,200,POST,/measurement/measurements,application/vnd.com.nsn.cumulocity.measurement+json,application/vnd.com.nsn.cumulocity.measurement+json,&&,UNSIGNED UNSIGNED NOW UNSIGNED,"{""c8y_SmartMeasurement"":{""temp1"":{""value"":&&,""unit"":""C""},""temp2"":{""value"":&&,""unit"":""F""}},""time"":""&&"",""source"":{""id"":""&&""},""type"":""c8y_SmartMeasurement""}"
10,300,PUT,/inventory/managedObjects/&&,application/vnd.com.nsn.cumulocity.managedObject+json,,&&,,"{""c8y_Hardware"":{""model"":""&&"",""revision"":""&&""}}"
10,301,PUT,/alarm/alarms/&&,application/vnd.com.nsn.cumulocity.alarm+json,,&&,,"{""status"":""CLEARED""}"
10,302,PUT,/devicecontrol/operations/&&,application/vnd.com.nsn.cumulocity.operation+json,,&&,,"{""status"":""SUCCESSFUL""}"
10,600,GET,/identity/externalIds/c8y_Serial/&&,,,&&,,
10,601,GET,/devicecontrol/operations?deviceId=##&status=PENDING,,,##,,
10,602,GET,/inventory/managedObjects/&&,,,&&,,
```

The example requests are also included in our Postman collection.
See [Using Postman](/microservice-sdk/rest/#using-postman) to learn how to import the collection into Postman.
In the Postman collection, the set of requests is located in **SmartREST > Register Request Templates**.

##### Example {#example}

Create a device:

	10,100,POST,/inventory/managedObjects,application/vnd.com.nsn.cumulocity.managedObject+json,application/vnd.com.nsn.cumulocity.managedObject+json,%%,STRING,"{""name"":""%%"",""type"":""com_example_TestDevice"",""c8y_IsDevice"":{}}"

Explanation:

* `10` describes a request template.
* `100` is the message identifier of the request template.
* `POST` is the HTTP method used.
* `/inventory/managedObjects` is the resource identifier.
* `application/vnd.com.nsn.cumulocity.managedObject+json` is the content type.
* `application/vnd.com.nsn.cumulocity.managedObject+json` is the accept content type.
* `%%` is the placeholder string.
* `STRING` specifies that the request accepts one parameter which must be a string.

Update operation to EXECUTING:

	10,101,PUT,/devicecontrol/operations/%%, application/vnd.com.nsn.cumulocity.operation+json, application/vnd.com.nsn.cumulocity.operation+json,%%,INTEGER,"{""status"":""EXECUTING""}"

#### Response templates {#response-templates}

Response templates have the following syntax:

	11,<ID>,<BASE>,<COND>,<VALUE>[,<VALUE>]

Where:

* `<ID>` is the message identifier of the response template.
* `<BASE>` is the base JSON path pointing to an object or object list from which the values are extracted.
* `<COND>` is a conditional JSON path which gets checked for existance. Only if the path exists, values are extracted.
* `<VALUE>` is a JSON path pointing to a value to extract within the base object or object in the base object list. An unlimited number of `<VALUE>`s can be specified.

##### Example {#example}

	11,201,,"$.c8y_IsDevice","$.id"

Explanation:

* `11` describes a response template.
* `201` is the message identifier of the response template.
* The base object JSON path is empty, thus `$` is assumed.
* `$.c8y_IsDevice` specifies that values are only extracted if the object has a fragment called `c8y_IsDevice`.
* `$.id` is the value extracted, namely the device ID.
