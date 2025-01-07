---
weight: 20
title: Hello MQTT
layout: redirect
---

In this tutorial, you will learn how to use MQTT with {{< product-c8y-iot >}} using pre-defined messages (called "static templates").

### Prerequisites {#prerequisites}

In order to follow this tutorial, check the following prerequisites:

* You have a valid tenant, a user and a password in order to access {{< product-c8y-iot >}}.
* You have installed [MQTTBox](https://chrome.google.com/webstore/detail/mqttbox/kaajoficamnjijhkeomgfljpicifbkaf) or a similar MQTT tool.

{{< c8y-admon-info >}}
The screenshots in the tutorial use MQTTBox. Other tools may look different.
{{< /c8y-admon-info >}}

{{< c8y-admon-info >}}
If you are using a trial tenant, the default user will not work with this tutorial. Create an additional user instead. The tenant ID and URL data will also differ from trial tenant information.
{{< /c8y-admon-info >}}

### Talking MQTT {#talking-mqtt}

#### Configuring the MQTT connection {#configuring-the-mqtt-connection}

To configure the MQTT connection, you must pass the following connection parameters (see the screenshot below).

*   MQTT Client Name – Give your client a name to identify it, for example, {{< product-c8y-iot >}} MQTT.
*   MQTT Client Id – You can use the "Generate a random ID" button (most tools will offer such a button) or provide one yourself. This ID will be linked to your device in {{< product-c8y-iot >}}. To reconnect to the same device, use the same ID.
*   Protocol – Select the protocol to be used, for example, mqtt/tcp.
*   Host – Provide in the URL your tenant domain, for example, _mytenant.{{< domain-c8y >}}/mqtt_.
*   Username – In this case, the username is formed as &lt;tenantID>/&lt;service-user>. You can use the same credentials you use to log into the {{< product-c8y-iot >}} platform (user alias is not supported). As seen in the example below, for the tenant ID "t76543210" and service user "manga" the username is "t76543210/manga".
*   Password: The password of the service user.

{{< product-c8y-iot >}} supports MQTT both via TCP and WebSockets. As URL you can use your tenant domain (for example _mytenant.{{< domain-c8y >}}/mqtt_) or the domain of the instance in the format mqtt.&lt;instance_domain> (for example _mqtt.{{< domain-c8y >}}_).

![Example MQTTBox Configuration](/images/mqtt/mqttBoxConfig.png)

{{< c8y-admon-info >}}
You may review [Tenants > Tenant ID and tenant domain](https://{{< domain-c8y >}}/api/core/#tag/Tenants) in the {{< openapi >}} to get a better understanding between tenant ID and tenant domain.
{{< /c8y-admon-info >}}

Other configurations like "clean session" are not important for this example. You can change them to your needs. After clicking **Save**, you will see a screen similar to the following screenshot.

![MQTTBox Established Connection](/images/mqtt/mqttBoxSuccess.png)

If there is a blue button on the top bar with a label **Not Connected**, verify your configuration (especially username and password). If the button is green, you successfully established an MQTT connection to {{< product-c8y-iot >}}.

#### Sending data {#sending-data}

All MQTT publish messages in this tutorial will be sent to the topic <kbd>s/us</kbd>. This is the topic used for {{< product-c8y-iot >}}'s pre-provided static templates.

![MQTTBox Publish Message](/images/mqtt/mqttBoxPublish.png)

##### Creating the device {#creating-the-device}

The first message sent will create our device. Although the static templates support automatic device creation, in this example we will create the device manually. The template `100` will create a new device. It can be used with two optional parameters (deviceName, deviceType).

```text
100,My first MQTT device,c8y_MQTTdevice
```

Afterwards, you will find this device in the Device Management application as a new device. If you switch to the **Identity** tab of the device you will notice that there was an identity created automatically to link the device to the MQTT ClientId.

Besides the name and the type, the device does not have more information, so master data must be added.

You can use multiple static templates per publishing separated by a line break (one template per row). This feature is used to set the hardware and the required interval for the device in a single published message.

The hardware can be set with the template `110`. It can take 3 parameters (serialNumber, model, revision). Optional parameters in static templates can be left empty if you don't want to set them. For the hardware all parameters are optional.

The required interval can be set with the template `117` and just takes a single parameter (the interval in minutes).

```text
110,,MQTT test model,1.2.3
117,10
```

After a reload of the **Info** page of your device in the Device Management application, you should see the information we just added.

##### Creating measurements {#creating-measurements}

Now the device has some master data and we can start sending some measurements.
There are a couple of measurements that can be created directly by using a static template:

* 210: Signal strength measurement
* 211: Temperature measurement
* 212: Battery measurement

The temperature and battery measurement just take the value and time as parameters. For the signal strength, you can pass two values (RSSI and BER).

Passing timestamps in the {{< product-c8y-iot >}} MQTT implementation is always optional. If you don't pass them along, the server will automatically create a timestamp with the current server time.

We will make use of this feature in this example. Also, if you do not set the last parameters, you do not need to enter the remaining commas.

```text
210,-87
211,24
212,95
```

Besides the measurements above, we can also use the template `200` to create a more custom measurement. It will take the measurement fragment, series, value, unit and time as its parameters.

```text
200,myCustomTemperatureMeasurement,fahrenheit,75.2,F
```

After a reload in the Device Management application, you should see 4 graphs with the newly added measurements in the **Measurements** tab of your device.

##### Creating alarms {#creating-alarms}

Now we will create some alarms for this device. There are templates to create alarms for the 4 alarm severities:

* 301: CRITICAL
* 302: MAJOR
* 303: MINOR
* 304: WARNING

Each of them note a type (which is mandatory), a text and a time (both optional).

```text
301,gpio_critical,There is a GPIO alarm
304,simple_warning
```

The alarm list of your device should now contain one critical alarm and one warning.

Note that we did not set any text for the warning, so it was created with a default alarm text.

Now we will clear the critical alarm again. To achieve this, we use the template `306` which refers to the type of the alarm that should be cleared.

```text
306,gpio_critical
```

The critical alarm should be cleared afterwards.

Note that you did not have to handle any alarm IDs with the MQTT implementation. {{< product-c8y-iot >}} will take over this part so that the device communication can be as easy as possible.

##### Creating events {#creating-events}

Next, we will create some location events for the device. If you wish, you may use the [LatLong website](https://www.latlong.net/) to get the latitude and longitude of your city.

The template `401` lets you create location events and takes latitude, longitude, altitude, accuracy and the time as parameters, but for now we will just use the first two.

```text
401,51.227741,6.773456
```

In the Device Management application, you can see one event in the event list but the location has not been updated. This is because on REST these are different requests. Instead of the template `401`, you can use the template `402` in MQTT. It works exactly the same as `401` but additionally it also updates the position of the device itself.

```text
402,51.227741,6.773456
```

Now you should see both the **Location** and the **Tracking** tab in the device with the **Location** tab having the same latitude and longitude as the last location event.


#### Receiving data {#receiving-data}

So far we have only used MQTT to send data from the client to the server. Now we will send data from the server to the client.

To achieve this, we must first subscribe to the responsible topic. We will do two subscriptions:

* s/ds : This will subscribe to the static operation templates for the device
* s/e :  This will subscribe to an error topic that can be used for debugging

You can enter both topics after another in the **Subscribe** field and click **Subscribe**. The QoS selection does not matter for this example.

Afterwards, your MQTTBox should look like this:

![MQTTBox Subscribed Topics](/images/mqtt/mqttBoxAfterSubscribe.png)

##### Receiving operations {#receiving-operations}

At the current state, the UI does not show any tabs for operations. Up to this point, it was unknown what exactly the device supports, but the list of supported operations can be modified with the template `114`. A list of supported operations can be added here.

We will add support for the configuration and shell.

```text
114,c8y_Command,c8y_Configuration
```

After reloading the UI, the two new tabs will appear (**Configuration** and **Shell**).

We can now create a shell command from the UI and click **Execute**.

In the MQTTBox, you should now have received a new message for the <kbd>s/ds</kbd> subscription.

![MQTTBox Received Operation](/images/mqtt/mqttBoxReceivedOperation.png)

The `511` is indicating what kind of operation we received (in this case `c8y_Command`). This will be followed by the **deviceIdentifier** to locate the device with the dedicated operation. This is required if you have a hierarchy with multiple children. In such case, you must know for which of the children the operation was dedicated. Finally, you have the operation specific parameters, which in the case of `c8y_Command` is only the command text.

After receiving the operation, we can start executing it to initiate the client's handling the operation. Similar to changing the status of an alarm, you can add the type of operation to the template.

```text
501,c8y_Command
```

After completing the handling, the operation can be set to successful with the template `503`.

Besides the operation type, this operation can also take additional parameters based on what kind of operation it was. We can return a result for the `c8y_Command`.

```text
503,c8y_Command,Everything went fine
```

##### Learning from errors {#learning-from-errors}

The topic <kbd>s/e</kbd> can help you debugging in case something went wrong.
For instance, if we try to send

```text
999,I made this up
```

we can see a message on the topic because the template `999` is unknown.

```text
40,999,No static template for this message id
```
