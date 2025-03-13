---
weight: 20
title: The protocol
layout: redirect
---

SmartREST is built upon the well-established HTTP protocol making it work everywhere since most popular platforms provide an HTTP client through which SmartREST can be accessed. SmartREST communicates exclusively through the `/s` resource using the HTTP `POST` method for bidirectional communication. The payload data format in CSV (comma-separated values).

The following example shows the communication between a client and the  SmartREST endpoint. Note the `Authorization` header and the custom `X-Id` header in the request which specifies the SmartREST template to use for this request.

	POST /s HTTP/1.0
	Authorization: Basic ...
	X-Id: ...
	Transfer-Encoding: chunked

	100,1234456

Each SmartREST request is represented by one row having a unique unsigned integer as its first value determining the action and subsequent values for parameters.

The SmartREST endpoint yields the following response. Note that the HTTP response code is always `200` unless the SmartREST endpoint is not available.

	HTTP/1.1 200 OK
	Transfer-Encoding: chunked

	200,1,123456,Request result

Each row yielded by the SmartREST endpoint represents a set of extracted values from the result of a SmartREST request containing a unique unsigned integer, the SmartREST request line number and the extracted data values, respectively.

{{< c8y-admon-info >}}
If the response from {{< product-c8y-iot >}} REST API was empty (for example like after deleting a Managed Object) then the response from SmartREST would be empty as well, regardless of registered response templates.
{{< /c8y-admon-info >}}

{{< c8y-admon-info >}}
Inventory access via SmartREST is limited to inventory objects which are global or for which the client is the owner. Role assignments are not evaluated.
{{< /c8y-admon-info >}}

### Data format {#data-format}

The CSV (comma-separated values) format is used for communication with the SmartREST endpoint. The following rules must be followed to ensure a frictionless communication.

* Every linebreak must be encoded by the character sequence `\n`.
* Values are always separated by a comma (`,`).
* If a value contains double-quotes (`"`), commas (`,`), leading or trailing whitespaces, line-breaks (`\n`), carriage returns (`\r`) or tab stops, it must be surrounded by quotes (`"`). Contained double-quotes (`"`) must be escaped by prepending another double-quote (`""`).

The same escaping rules apply to messages that will be sent from the server to the client.

**Examples**

The following examples illustrate the rules stated above:

	100,Hello world!
	101," I have leading whitespace!"
	102,"I have trailing whitespace!"
	103,"I contain a line
	break!"
	104,"I have ""quotes""!"
	105,I also have 'quotes'!

### Processing mode {#processing-mode}

Similar to [{{< product-c8y-iot >}} REST implementation](https://{{< domain-c8y >}}/api/core/#section/REST-implementation) every communication in SmartREST which can lead to data update (i. e., POST, PUT, DELETE) supports four processing modes, PERSISTENT, TRANSIENT, QUIESCENT or CEP.

If the data sent to the SmartREST endpoint must be both stored in {{< product-c8y-iot >}} database and be transferred to real-time processing, then PERSISTENT mode should be set. It is also enabled by default and does not require additional configuration.

In case when it is only needed to communicate data to real-time processing, the TRANSIENT processing mode should be specified by adding it to the header of HTTP request:

	POST /s HTTP/1.0
	Authorization: Basic ...
	X-Id: ...
	X-Cumulocity-Processing-Mode: TRANSIENT
	Transfer-Encoding: chunked

	100,1234456

With TRANSIENT mode in the header the body data is not persisted in {{< product-c8y-iot >}} database.

During real-time processing, CEP scripts can be used to define if updates should be stored in the database or not.

The QUIESCENT processing mode should be specified if data sent to the SmartREST endpoint must be both stored in the {{< product-c8y-iot >}} database and be transferred to real-time processing but real-time notifications must be disabled. Currently, the QUIESCENT processing mode is applicable for measurements and events only.

The CEP processing mode should be specified if data sent to the SmartREST endpoint must only be transiently sent to real-time processing engine with real-time notifications disabled. Currently, the CEP processing mode is applicable for measurements and events only.

{{< c8y-admon-info >}}
Events are always delivered to CEP/Apama for all processing modes. This is independent from real-time notifications.
{{< /c8y-admon-info >}}
