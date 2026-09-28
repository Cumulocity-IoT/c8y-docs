---
weight: 20
title: SmartREST 2.0
layout: bundle
sector:
  - device_management
---

This section describes the SmartREST 2.0 payload format that can be used with the {{< product-c8y-iot >}} MQTT implementation.

SmartREST 2.0 was designed to make use of the MQTT protocol, so it may reduce the payload even more than the SmartREST 1.0 via HTTP.

SmartREST 2.0 is only available via MQTT and it offers the following MQTT topics for the main communication:

To publish messages:

```http
s/uc/<X-ID>
```

To publish messages in transient mode:

```http
t/uc/<X-ID>
```

To publish messages in quiescent mode:

```http
q/uc/<X-ID>
```

To publish messages in CEP mode:

```http
c/uc/<X-ID>
```

Refer to [Processing mode](/smartrest/smartrest-one/#processing-mode) for more information about transient, quiescent & CEP data processing.

To subscribe for responses:

```http
s/dc/<X-ID>
```

The topics for creating templates are described in [Creating templates via MQTT](#creating-templates-via-mqtt).


### Changes from SmartREST 1.0 {#changes-from-smartrest-10}

In its base, SmartREST 2.0 is like the previous version: a CSV-like payload format that is backed by previously created templates to finally create the targeted JSON structure.

Several changes in the functionality have been made:

* Templates no longer contain IDs of objects (instead, IDs will be resolved by, for example, MQTT ClientId)
* Managed objects can be created and retrieved directly with external IDs
* Creating request templates now uses JSON path (like response templates)
* Support for lists in responses
* Responses also return if only part of the patterns were found
* Declaring a default X-ID for the connection


### Supported templates {#supported-templates}

SmartREST 2.0 lets you create templates for the following matching HTTP methods:

|   API   |GET|POST|PUT|
|:--------|:--------|:--------|:--------|
|Inventory|    x    |    x    |    x    |
|Alarm    | &nbsp;  |    x    |    x    |
|Event    | &nbsp;  |    x    |  &nbsp; |
|Measurement|&nbsp; |    x    |  &nbsp; |
|Operation| &nbsp;  |  &nbsp; |    x    |

Additionally, you can create templates to return certain values from responses and operations.

### Template collections {#template-collections}

A template collection is a set of request and response templates that specifies a device communication protocol. Each collection is referenced by a unique ID (called X-ID).

#### Creating templates via MQTT {#creating-templates-via-mqtt}

Like in SmartREST 1.0, you must pass all templates in a collection in one message. After the creation of a template collection, it can no longer be modified through MQTT.

When creating templates, the client must publish to the following topic:

```http
s/ut/<X-ID>
```

To verify if a template collection exists, the client can subscribe to the topic:

```http
s/dt
```

When subscribed, the client can send an empty message to the creation topic which will trigger a new message about the creation status of this X-ID.

**Examples**

Empty publish to <kbd>s/ut/myExistingTemplateCollection</kbd>

```text
20,myExistingTemplateCollection,<ID of collection>
```

Empty publish to <kbd>s/ut/myNotExistingTemplateCollection</kbd>

```text
41,myNotExistingTemplateCollection
```

#### Request templates {#request-templates}

A request template contains the following basic fields:

<table>
<colgroup>
<col width="15%">
<col width="20%">
<col width="15%">
<col width="10%">
<col width="40%">
</colgroup>
<thead>
<tr>
<th style="text-align:left">Field</th>
<th style="text-align:left">Data type</th>
<th style="text-align:left">Possible values</th>
<th style="text-align:left">Mandatory</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">messageId</td>
<td style="text-align:left">String</td>
<td style="text-align:left">&nbsp;</td>
<td style="text-align:left">Y</td>
<td style="text-align:left">Unique ID to reference the template within the collection</td>
</tr>
<tr>
<td style="text-align:left">method</td>
<td style="text-align:left">String</td>
<td style="text-align:left">GET<br>PUT<br>POST</td>
<td style="text-align:left">Y</td>
<td style="text-align:left">Whether to get, update or create data</td>
</tr>
<tr>
<td style="text-align:left">api</td>
<td style="text-align:left">String</td>
<td style="text-align:left">INVENTORY<br>MEASUREMENT<br>ALARM<br>EVENT<br>OPERATION</td>
<td style="text-align:left">Y</td>
<td style="text-align:left">{{< product-c8y-iot >}} API to be used</td>
</tr>
<tr>
<td style="text-align:left">response</td>
<td style="text-align:left">Boolean</td>
<td style="text-align:left">true<br>false</td>
<td style="text-align:left">N</td>
<td style="text-align:left">Whether the request should trigger response templates. For GET templates by default true otherwise by default false</td>
</tr>
<tr>
<td style="text-align:left">mandatoryValues</td>
<td style="text-align:left">List&lt;String&gt;</td>
<td style="text-align:left">&nbsp;</td>
<td style="text-align:left">Y</td>
<td style="text-align:left">Values for the mandatory fields on the API. The values depend on the API and method the template uses</td>
</tr>
<tr>
<td style="text-align:left">customValues</td>
<td style="text-align:left">List&lt;CustomValue&gt;</td>
<td style="text-align:left">&nbsp;</td>
<td style="text-align:left">N</td>
<td style="text-align:left">Custom values that should be added to the object</td>
</tr>
</tbody>
</table>

A request template lists all the fragments in the object structure (mandatory and custom) that should be added when creating or updating the data.
It can set fixed values in the template that will then be replaced by the server. If it does not set the value in the template, the value must be included in the publish message (this includes mandatoryValues).

{{< c8y-admon-info >}}
If the message rate limit per second is exceeded, the requests are delayed and kept in queue. If the queue limit number is exceeded, the client messages are rejected and the client is disconnected.
{{< /c8y-admon-info >}}

**Example**

We create a template to create a measurement like this (measurements have two mandatory values: type and time)

```bash
# 10,msgId,method,api,response,type,time,custom1.path,custom1.type,custom1.value
10,999,POST,MEASUREMENT,,c8y_MyMeasurement,,c8y_MyMeasurement.M.value,NUMBER,
```

This template defines one additional custom property for the measurement. It leaves two fields empty in the template declaration (time and the custom property), so to use the template the client must send these two values:

```bash
999,2016-06-22T17:03:14.000+02:00,25
# We can also use server time by leaving the time empty
999,,25
```

The following sections will get into more detail of how to create and use different templates.

##### GET templates {#get-templates}

GET templates for the inventory do not need any mandatory or custom values. Instead, they use two different fields.

With SmartREST 2.0 you have the option to either get an object from inventory by its ID or by an external ID directly. Therefore, instead of the fields **mandatoryValues** and **customValues**, the following two fields are used:

<table>
<colgroup>
  <col width="15%">
  <col width="10%">
  <col width="15%">
  <col width="10%">
  <col width="50%">
</colgroup>
<thead>
<tr>
<th style="text-align:left">Field</th>
<th style="text-align:left">Data type</th>
<th style="text-align:left">Possible values</th>
<th style="text-align:left">Mandatory</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">byId</td>
<td style="text-align:left">Boolean</td>
<td style="text-align:left">true<br>false</td>
<td style="text-align:left">Y</td>
<td style="text-align:left">Whether the GET should be executed by {{< product-c8y-iot >}} ID (=true) or externalId (=false)</td>
</tr>
<tr>
<td style="text-align:left">externalIdType</td>
<td style="text-align:left">String</td>
<td style="text-align:left">&nbsp;</td>
<td style="text-align:left">N</td>
<td style="text-align:left">Sets a fixed externalIdType if the template calls by externalId</td>
</tr>
</tbody>
</table>

This enables you to query inventory in three different ways:

**By {{< product-c8y-iot >}} ID**

```bash
# Creation:
10,999,GET,INVENTORY,,true
# Usage:
999,123456
```

**By external ID with a fixed type in the template**

```bash
# Creation:
10,999,GET,INVENTORY,,false,c8y_Serial
# Usage:
999,myDeviceImei
```

**By external ID without fixed type in the template**

```bash
# Creation:
10,999,GET,INVENTORY,,false
# Usage:
999,c8y_Serial,myDeviceImei
```

##### POST templates {#post-templates}

POST templates require a different set of mandatory values based on the API:

|API|mandatory values|
|:-------|:-------|
|MEASUREMENT|type, time|
|EVENT|type, text, time|
|ALARM|type, text, status, severity, time|
|INVENTORY|externalIdType|

This results in the following minimal template creations:

```bash
# Creation:
10,100,POST,MEASUREMENT,false,c8y_MyMeasurement,,c8y_MyMeasurement.M.value,NUMBER,
10,101,POST,EVENT,,c8y_CustomEvent,mytext,,
10,102,POST,ALARM,,c8y_CustomAlarm,mytext,ACTIVE,MAJOR,

# Usage:
100
101
102
```

Creating data on the inventory optionally includes the creation of an externalId for that object.
This is controlled by the mandatory value externalIdType.

{{< c8y-admon-important >}}
POST Inventory templates start with the value of the externalId after the msgId. Leaving this column empty will result in not creating an external ID.
{{< /c8y-admon-important >}}

```bash
# Creation:
10,100,POST,INVENTORY,,c8y_MySerial
# Usage:
# Create object with externalId c8y_MySerial/myImei
100,myImei
# Create object with externalId c8y_MySerial/myImei
101,myImei,c8y_MySerial
# This message will result in not creating an external ID
101,,c8y_MySerial
```

##### PUT templates {#put-templates}

PUT templates for inventory follow the same logic as the GET templates, and with the addition that you can also use custom values for PUT.

```bash
# Creation:
# 10,msgId,method,api,response,byId,externalIdTyoe,custom1.path,custom1.type,custom1.value
10,999,PUT,INVENTORY,,false,c8y_Serial,c8y_MyCustomValue,STRING,
# Usage:
999,myDeviceImei,myValue
```

The PUT template for alarms uses the type of the alarm to find the alarm to update. It will first check the ACTIVE alarms and, if there is no ACTIVE alarm, it will check the ACKNOWLEDGED alarms.

```bash
# Creation:
# 10,msgId,method,api,response,type,custom1.path,custom1.type,custom1.value
10,999,PUT,ALARM,,c8y_MyCustomAlarm,status,ALARMSTATUS
# Usage:
999,CLEARED
```

PUT templates for operations use the fragment of the operation to find the operation. It will first check the EXECUTING operations and, if there is no EXECUTING operation, it will check the PENDING operations.

```bash
# Creation:
# 10,msgId,method,api,response,fragment,custom1.path,custom1.type,custom1.value
10,999,PUT,OPERATION,,c8y_MyOperation,status,OPERATIONSTATUS,SUCCESSFUL,c8y_Fragment.val,NUMBER,
# Usage:
999,24
```

##### Adding custom properties {#adding-custom-properties}

All POST and PUT values enable you to add custom properties to the results of the templates.

A single custom property requires you to add the following three values to your template creation:

|Field|Description|
|:-------|:-------|
|path|A JsonPath for the value that should be set|
|type|An optional data type of the value. Default: STRING|
|value|The value to be set. Leaving this field empty requires the client to send the value when using the template|

|Type|Description|
|:-------|:-------|
|STRING|The default type. No additional verification of the value|
|DATE|A time stamp in the ISO 8601 format. Using date and not sending a time stamp results in the use of server time|
|NUMBER|An integer or number with decimal places|
|INTEGER|An integer|
|UNSIGNED|An integer (only positive)|
|FLAG|An empty map (for example c8y_IsDevice: {}). The client does not need to send anything for this value|
|SEVERITY|A severity of an alarm. Used to update the severity field of alarms|
|ALARMSTATUS|A status of an alarm. Used to update the status field of alarms|
|OPERATIONSTATUS|A status of an operation. Used to update the status field of operations|

##### Examples {#examples}

Template for clearing an alarm with an additional custom property

```bash
# Creation:
10,999,PUT,ALARM,,c8y_MyCustomALarm,status,ALARMSTATUS,CLEARED,c8y_CustomFragment.reason,STRING,
# Usage:
999,Device resolved alarm on its own
```

Template for creating a custom measurement

```bash
# Creation:
10,999,POST,MEASUREMENT,,c8y_CustomMeasurement,,c8y_CustomMeasurement.custom.value,NUMBER,,c8y_CustomMeasurement.custom.unit,STRING,X
# Usage:
999,30.6
```

Template for updating a property in the device

```bash
# Creation:
10,999,PUT,INVENTORY,,false,c8y_Serial,c8y_MyCustomValue,STRING,
# Usage:
999,myDeviceImei,updatedValue
```

#### Response templates {#response-templates}

The SmartREST 2.0 response templates use the same structure as in SmartREST 1.0.

|Field|Data type|Mandatory|Description|
|:-------|:-------|:-------|:-------|
|messageId|String|Y|Unique ID to reference the template within the collection|
|base|String|N|A JsonPath prefix that all patterns will use|
|condition|String|N|A JsonPath that must exist in the object to use the pattern|
|pattern|List&lt;String&gt;|Y|A list of JsonPath that will be extracted from the object and returned to the device|

Response templates will be used for every operation and for any request template that defines the response field with true. In each case, the server will try every registered response template, so there might be multiple response lines for a single operation or request.

SmartREST 2.0 will always return a response template if the condition is true (or no condition was defined). Patterns that did not resolve will be returned as empty string.

You should make use of the condition field to control when response templates should be returned.

In the examples below, you can see how to query data and parse custom operations.

##### Querying data from the device object {#querying-data-from-the-device-object}

Device object:

```json
{
  "id": "12345",
  "type": "myMqttDevice",
  "c8y_IsDevice": {},
  "c8y_Configuration": "val1=1\nval2=2"
}
```

Template creation:

```text
10,999,GET,INVENTORY,,true
11,888,,c8y_IsDevice,type,c8y_Test,c8y_Configuration
```

Client publishes:

```text
999,12345
```

Client receives:

```text
888,myMqttDevice,,"val1=1\nval2=2"
```

##### Parsing custom operations {#parsing-custom-operations}

Operation object:

```json
{
  "id": "12345",
  "deviceId": "67890",
  "agentId": "67890",
  "status": "PENDING",
  "c8y_CustomConfiguration": {
    "val1": "1",
    "val2": "2",
    "customValues": ["a", "b", "c"]
  },
  "description": "Send custom configuration"
}
```

Template creation:

```text
11,111,c8y_CustomConfiguration,deviceId,val1,val2,customValues[*]
11,222,,deviceId,c8y_CustomConfiguration.val1,c8y_CustomConfiguration.val2
11,333,,deviceId,val1,val2,customValues[*]
11,444,c8y_CustomConfiguration,c8y_CustomConfiguration.val3,val1,val2,customValues[*]
```

Client receives (assuming the ClientId is "myMqttTestDevice"):

```plaintext
111,myMqttTestDevice,1,2,a,b,c
222,myMqttTestDevice,1,2
333,myMqttTestDevice,,,
```

The template 444 is not returned as the condition does not match the operation.

##### Querying data from the device object containing key with multiple objects {#querying-data-from-the-device-object-containing-key-with-multiple-objects}

Device object:

```json
{
  "id": "12345",
  "name": "test",
  "type": "c8y_MQTTdevice",
  "c8y_IsDevice": {},
  "myList": [
      {
          "pid": 12345,
          "type": "test"
      },
      {
          "pid": 123456,
          "type": "test2"
      }
  ]
}
```

Template creation:

```text
10,999,GET,INVENTORY,,true
11,888,,,"$.myList[*].type"
```

Client publishes:

```text
999,12345
```

Client receives:

```text
888,test,test2
```

### Using a default collection {#using-a-default-collection}

Having the X-ID as part of the topic gives you the freedom to easily use multiple template collections, but adds additional bytes for every message.
If anyway the device uses mostly (or completely) a single collection, it makes sense to specify this collection as your default collection.

With a default collection specified, the client can use special topics which do not require the X-ID, and instead the server will use the X-ID previously specified. The topics are <kbd>s/ud</kbd> for publishing and <kbd>s/dd</kbd> for subscribing.

You can specify one X-ID within your MQTT ClientId (see [MQTT implementation](/device-integration/mqtt/#mqtt-clientid)).

Your MQTT ClientId could look like this:

```text
d:myDeviceSerial:myDefaultTemplateXID
```

{{< c8y-admon-info >}}
If you use a default X-ID, you must include in the **ClientId** the `d:` at the beginning to specify that the client is a device.
{{< /c8y-admon-info >}}

It is not required that the default template exists at the time of establishing the MQTT connection (it will be verified once the client uses it).
