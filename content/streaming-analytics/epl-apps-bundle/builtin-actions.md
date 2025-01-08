---
weight: 20
title: Built-in actions
layout: redirect
---

### Overview {#overview}

With Apama EPL, it is possible to utilize functions, called "actions". Every monitor will have at least one action - the `onload` action. This section covers the already built-in actions ready to use.

See also the [API Reference for EPL (ApamaDoc)]({{< link-apamadoc-api >}}) for actions on the built-in types.

### Querying {{< product-c8y-iot >}} data {#querying-platform-data}

To interact with your historical data, you can use one of the following request-response event pairs to look up resources.

Example: To look up alarms, you can send a `com.apama.cumulocity.FindAlarm` request event with appropriate query parameters to the `FindAlarm.SEND_CHANNEL` channel.
In response, you can expect 0 or more `com.apama.cumulocity.FindAlarmResponse` events (depending on the number of resources that match the lookup request)
and a `com.apama.cumulocity.FindAlarmResponseAck` event on the `FindAlarmResponse.SUBSCRIBE_CHANNEL` channel.
Similar functionality is also provided for looking up managed objects, events, measurements and operations.

The events listed in the following table are part of the `com.apama.cumulocity` package.

|To look up|Request-Response Events|Example|
|:---------|:-----------------|:---------|
|ManagedObject|FindManagedObject <br/>FindManagedObjectResponse <br/>FindManagedObjectResponseAck|[Example]({{< link-apama-webhelp >}}/standard-connectivity-plugins/the-cumulocity-iot-transport-connectivity-plug-in/#querying-for-managed-objects)|
|Alarm|FindAlarm <br/>FindAlarmResponse <br/>FindAlarmResponseAck|[Example]({{< link-apama-webhelp >}}/standard-connectivity-plugins/the-cumulocity-iot-transport-connectivity-plug-in/#querying-for-alarms)|
|Event|FindEvent <br/>FindEventResponse <br/>FindEventResponseAck|[Example]({{< link-apama-webhelp >}}/standard-connectivity-plugins/the-cumulocity-iot-transport-connectivity-plug-in/#querying-for-events)|
|Measurement|FindMeasurement <br/>FindMeasurementResponse <br/>FindMeasurementResponseAck|[Example]({{< link-apama-webhelp >}}/standard-connectivity-plugins/the-cumulocity-iot-transport-connectivity-plug-in/#querying-for-measurements)|
|Operation|FindOperation <br/>FindOperationResponse <br/>FindOperationResponseAck|[Example]({{< link-apama-webhelp >}}/standard-connectivity-plugins/the-cumulocity-iot-transport-connectivity-plug-in/#querying-for-operations)|
|CurrentUser|CurrentUser <br/>GetCurrentUser <br/>GetCurrentUserResponse|[Example]({{< link-apama-webhelp >}}/standard-connectivity-plugins/the-cumulocity-iot-transport-connectivity-plug-in/#getting-user-details)|
|TenantOption|TenantOption <br/>FindTenantOptions  <br/>FindTenantOptionsResponse|[Documentation]({{< link-apama-webhelp >}}/standard-connectivity-plugins/the-cumulocity-iot-transport-connectivity-plug-in/#finding-tenant-options)|


### Invoking other parts of the {{< product-c8y-iot >}} REST API {#other-parts}

The {{< product-c8y-iot >}} REST API covers some extra functionality which is not covered with the individual event types. To invoke any other part of the REST API, a generic request-response API is provided which you can use to invoke any part of the {{< product-c8y-iot >}} API.

You can use the following request-response events:

* com.apama.cumulocity.GenericRequest
* com.apama.cumulocity.GenericResponse
* com.apama.cumulocity.GenericResponseComplete

{{< c8y-admon-info >}}
The Apama-ctrl microservice, and thus all EPL apps code within it, runs with a number of permissions which permit the EPL to access all objects in the inventory and also read user details.  
This includes personal identifiable information, such as username, email address, and so on.
{{< /c8y-admon-info >}}

For more information, see [REST implementation](https://{{< domain-c8y >}}/api/core/#section/REST-implementation) in the {{< openapi >}}
and [Invoking other parts of the Cumulocity REST API]({{< link-apama-webhelp >}}/standard-connectivity-plugins/the-cumulocity-iot-transport-connectivity-plug-in/#invoking-other-parts-of-the-cumulocity-rest-api) in the Apama documentation.

### Invoking HTTP services {#invoking-http-services}

{{< c8y-admon-info >}}
The information below is for interacting with *external* HTTP services. For making requests to other parts of the {{< product-c8y-iot >}} REST API,
see [Invoking other parts of the {{< product-c8y-iot >}} REST API](#other-parts).
For making requests to anything else on the platform, including other microservices, see [Connecting Apama to other microservices](/streaming-analytics/epl-apps/#microservices).
{{< /c8y-admon-info >}}

To interact with HTTP services using REST and JSON, create a `com.softwareag.connectivity.httpclient.HttpTransport` instance using one of the factory methods:

* HttpTransport.getOrCreate(string host, integer port) returns HttpTransport
* HttpTransport.getOrCreateWithConfiguration(string host, integer port, dictionary &lt;string, string&gt; configurations) returns HttpTransport (the keys in the configurations dictionary are the constants on HttpTransport with the `CONFIG_` prefix)

On the `HttpTransport` object, call one of the create methods, passing a path and payload as needed, to produce a `Request` object.

On the `Request` object, you may set cookies, headers or query parameters as needed, and can then invoke the request with the `execute(action<Response> callback)`. Supply the name of an action in your monitor for the callback, and it will be invoked with the `Response` when the request has completed (or timed out).

In the callback, the `Response` object is supplied with `statusCode` and `payload`. Fields on the payload are accessible via the `com.apama.util.AnyExtractor` object it is supplied in - see the information on [access fragments](/streaming-analytics/epl-apps/#access-fragments) below.

Refer to the [API Reference for EPL (ApamaDoc)]({{< link-apamadoc-api >}}) for further details.

### Utility functions {#utility-functions}

#### Access fragments {#access-fragments}

You can access fragments via the `params` dictionary of most events. The `AnyExtractor` object can be constructed to help you extract data from any objects containing multiple subfragments and access:

* action getInteger(string path) returns integer

* action getFloat(string path) returns float

* action getString(string path) returns string

* action getBoolean(string path) returns Boolean

* action getSequence(string path) returns sequence&lt;any&gt;

* action getDictionary(string path) returns dictionary&lt;any, any&gt;

You can use a JSON path to navigate in the object structure. For example:

```java
string s := AnyExtractor(measurement.params["fragment"]).getString("sub.fragment.object");
```

>Example "fragment": "c8y_TemperatureMeasurement".<br>
>Example "sub.fragment.object": "c8y_TemperatureMeasurement.T.Unit".

#### Casting "any" values {#casting-any-values}

Alternatively, use a cast to convert an `any` to a particular type:

```java
string s := <string> measurement.params["strfragment"];
```

Note that a cast operation will throw if the object is of a different type.

#### currentTime and the TimeFormatter {#currenttime-and-the-timeformatter}

The read-only variable `currentTime` can be used to obtain the current server time. Apama deals with time using seconds since the Unix Epoch (1 Jan 1970 UTC). You can easily transform it to a human-readable form using the `TimeFormat` object.
The `TimeFormat` object can be used for formatting dates and times, and also for parsing them.

Example:

```java
using com.apama.correlator.timeformat.TimeFormat;

monitor Example {
    action onload {
        log TimeFormat.format(currentTime, "yyyy.MM.dd 'at' HH:mm:ss") at INFO;
    }
}
```

For more information on `TimeFormat` and its functions, see [Using the TimeFormat Event Library]({{< link-apama-webhelp >}}/developing-apama-applications-in-epl/using-epl-plug-ins/#using-the-timeformat-event-library) in the Apama documentation and the API Reference for EPL (ApamaDoc).

#### inMaintenanceMode {#inmaintenancemode}

The `Util.inMaintenanceMode()` function is a fast way to check if the device is currently in maintenance mode. It takes a managed object as a parameter and returns a Boolean which is true if the device is in maintenance mode.

Example:

```java
using com.apama.cumulocity.Measurement;
using com.apama.cumulocity.Event;
using com.apama.cumulocity.FindManagedObject;
using com.apama.cumulocity.FindManagedObjectResponse;
using com.apama.cumulocity.FindManagedObjectResponseAck;

using com.apama.cumulocity.Util;

monitor ExampleMonitor {
  action onload() {
    // Subscribe to Measurement.SUBSCRIBE_CHANNEL to receive all measurements
    monitor.subscribe(Measurement.SUBSCRIBE_CHANNEL);
    monitor.subscribe(FindManagedObjectResponse.SUBSCRIBE_CHANNEL);
    on all Measurement() as m {
      integer reqId := integer.getUnique();
      send FindManagedObject(reqId, m.source, new dictionary<string,string>) to FindManagedObject.SEND_CHANNEL;
      on FindManagedObjectResponse(reqId = reqId, id = m.source) as d and not FindManagedObjectResponseAck(reqId = reqId) {
        if not Util.inMaintenanceMode(d.managedObject) {
          send Event("", "c8y_Event", m.source, currentTime, "Received measurement from active device", new dictionary<string,any>) to Event.SEND_CHANNEL;
        }
      }
    }
  }
}
```

#### replacePlaceholders {#replaceplaceholders}

To build strings, you can use concatenation as follows:

```java
string s:= "An event with the text " + evt.text + " has been created.";
```

If the texts get longer and have more values that are dynamically set from the data, you can use the `Util.replacePlaceholders()` function.
In your text string, you mark the placeholders with the field name from the event and surround it by `#{}`.
The second parameter to `replacePlaceholders` can be any event type.

`Utils::replacePlaceholders` looks up the field name specified in the event or in the parameters of the event to generate the text replacement.
You can use field names of type `#{X.Y}` to access nested structures in the event.

```java
myMailText := Util.replacePlaceholders("The device #{source} created an event with the text #{text} at #{time}", alarm);
```

If the replacement string is of a form such as `#{source.name}` where `source.name` is the name of the underlying managed object/device
or `#{source.c8y_Hardware.notes}` where `c8y_Hardware` is a fragment on the managed object,
then special handling is required to achieve the replacement.
After the initial replacement, you must update the placeholder field name and run `Util::replacePlaceholders` again with the source `managedObject`.


```java
myMailText := Util.replacePlaceholders("The device #{source} with the serial number #{source.c8y_Hardware.serialNumber} created an event with the text #{text} at #{time}. The device is located at #{source.c8y_Address.street} in #{source.c8y_Address.city}.", alarm);
myMailText := myMailText.replaceAll("#{source.", "#{");
myMailText := Util.replacePlaceholders(myMailText, managedObject);
```
