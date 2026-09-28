---
weight: 30
title: Templates
layout: redirect
---

SmartREST templates are a collection of request and response templates used for the conversion of CSV data and {{< product-c8y-iot >}} REST API calls. Additionally, SmartREST templates contain a template identifier which is compared to the custom `X-Id` header field to identify the SmartREST template used for processing.

Each request and response template has a unique numeric identifier called the message identifier which is referenced by the first value of each SmartREST request or response row. To avoid collision with one of the default message identifiers, developers are advised to select message identifiers starting at `100`.

### Request templates {#request-templates}

A request template contains all necessary information to convert a SmartREST request into a corresponding REST API call which is then sent to the platform.

A request template contains the following information:

* A unique unsigned integer as a message identifier
* The request method, for example, `GET` or `POST`.
* The resource URI, for instance `/inventory/managedObjects`
* The `Content-Type` and `Accept` header values of the sent and received data
* A placeholder such as `%%`
* The expected request parameters such as `STRING`s, `NUMBER`s, `UNSIGNED` integers and `DATE`s
* The template string with placeholders for each parameter

### Response templates {#response-templates}

A response template contains the necessary information to extract data values from a platform REST API call response which are then sent back to the client in the CSV data format.

The following information is contained within a response template:

* A unique unsigned integer as a message identifier
* A JSON path referencing a base object or object list to extract data from, for example, `$` or `$.managedObjects`. If the JSON path points to a list of objects, one row of extracted data for each object in the list is yielded.
* A JSON path which must exist within the base object or base object list in order to extract values, for example, `$.id`. The value is not added to the response.
* A variable number of JSON paths for each value to extract, for example, `$.id`, `$.name` or `$.type`. Values are added to the response in the order they were defined in the template.
