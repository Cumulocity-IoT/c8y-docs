---
weight: 50
title: Hello MQTT browser-based
layout: redirect
---

In this tutorial, you will learn how to use the browser-based MQTT client with {{< product-c8y-iot >}} using pre-defined messages (called "static templates").

### Prerequisites {#prerequisites}

In order to follow this tutorial, check the following prerequisites:

* You have a valid tenant, a user, and a password in order to access {{< product-c8y-iot >}}.

### Developing the "Hello, MQTT world!" client {#developing-the-hello-mqtt-world-client}

To develop a very simple "Hello, world!" MQTT client for {{< product-c8y-iot >}}, you must

* create an HTML file and include the MQTT JavaScript client (in this example we will use [Paho JavaScript Client](https://www.eclipse.org/paho/clients/js/)),
* create a JavaScript application,
* run the application.

#### Creating a JavaScript application {#creating-a-javascript-application}

Create an HTML file (for example *hello_mqtt_js.html*) with the following content:

```xml
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Hello MQTT World</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js"></script>
    <script src="main.js" defer></script>
</head>
<body>
    <div id="logger"></div>
</body>
</html>
```

Create a JavaScript file _main.js_ with the following content:

```javascript
// client, user and device details
var serverUrl   = "ws://mqtt.cumulocity.com/mqtt";     /* wss://mqtt.{{< domain-c8y >}}/mqtt for a secure connection */
var clientId    = "my_mqtt_js_client";
var device_name = "My JS MQTT device";
var tenant      = "<<tenant_ID>>";
var username    = "<<username>>";
var password    = "<<password>>";

var undeliveredMessages = [];
var temperature = 25;

// configure the client to {{< product-c8y-iot >}}
var client = new Paho.MQTT.Client(serverUrl, clientId);

// display all incoming messages
client.onMessageArrived = function (message) {
    log('Received operation "' + message.payloadString + '"');
    if (message.payloadString.indexOf("510") == 0) {
        log("Simulating device restart...");
        publish("s/us", "501,c8y_Restart");
        log("...restarting...");
        setTimeout(function() {
            publish("s/us", "503,c8y_Restart");
            log("...done...");
        }, 1000);
    }
};

// display all delivered messages
client.onMessageDelivered = function onMessageDelivered (message) {
    log('Message "' + message.payloadString + '" delivered');
    var undeliveredMessage = undeliveredMessages.pop();
    if (undeliveredMessage.onMessageDeliveredCallback) {
        undeliveredMessage.onMessageDeliveredCallback();
    }
};

function createDevice () {
    // register a new device
    publish("s/us", "100," + device_name + ",c8y_MQTTDevice", function() {
        // set hardware information
        publish("s/us", "110,S123456789,MQTT test model,Rev0.1", function() {
            publish('s/us', '114,c8y_Restart', function() {
                log('Enable restart operation support');
                //listen for operation
                client.subscribe("s/ds");
            })

            // send temperature measurement
            setInterval(function() {
                publish("s/us", '211,'+temperature);
                temperature += 0.5 - Math.random();
            }, 3000);
        });
    });
}

// send a message
function publish (topic, message, onMessageDeliveredCallback) {
    message = new Paho.MQTT.Message(message);
    message.destinationName = topic;
    message.qos = 2;
    undeliveredMessages.push({
        message: message,
        onMessageDeliveredCallback: onMessageDeliveredCallback
    });
    client.send(message);
}

// connect the client to {{< product-c8y-iot >}}
function init () {
    client.connect({
        userName: tenant + "/" + username,
        password: password,
        onSuccess: createDevice
    });
}

// display all messages on the page
function log (message) {
    document.getElementById('logger').insertAdjacentHTML('beforeend', '<div>' + message + '</div>');
}

init();
```

Replace `serverUrl`, `clientId` and `device_name` as needed. Do not forget to specify the user credentials setting values for `tenant_ID`, `username` and `password`.

The {{< product-c8y-iot >}} MQTT protocol supports both unsecured TCP and also secured SSL connections (that is, `ws://mqtt.{{< domain-c8y >}}/mqtt` or `wss://mqtt.{{< domain-c8y >}}/mqtt`), so you can pick the one which fits for you and use it in `serverUrl`.

What does the code do?

-   Configure the MQTT connection.
-   Register ``onMessageArrived`` callback function which will display all incoming messages. In case of a `c8y_Restart` operation, simulate a device restart.
-   Register ``onMessageDelivered`` callback function which will be called after a publish message has been delivered.
-   After the page is fully loaded, the function `init` is called and it connects with {{< product-c8y-iot >}} via a MQTT protocol.
-   When the connection is established, call a ``createDevice`` function.
-   Create a new device with a name (`device_name`) and a type (`c8y_MQTTDevice`).
-   Update the device hardware information by putting a `"S123456789"` serial, a `"MQTT test model"` model and a `"Rev0.1"` revision.
-   Subscribe to the static operation templates for the device – this will result in ``onMessageArrived`` method call every time a new operation is created.
-   Send a temperature measurement every 3 seconds.

Note that the subscription is established after the device creation, otherwise if there is no device for a given ``clientId``, the server will not accept it.

#### Running the application {#running-the-application}

Open the *hello_mqtt_js.html* file in a browser. You should see a new registered device in the Device Management application, listed in **All devices**. In the **Measurements** tab, you will see the temperature measurements being sent by your client.

Additionally, if there will be a new operation created for this device (for example `c8y_Restart`), related information will be displayed in the browser page.

### Improving the agent {#improving-the-agent}

Now that you have done your first step, check out the section [Hello MQTT](/device-integration/mqtt-examples/#hello-mqtt) to learn more about {{< product-c8y-iot >}} MQTT and improve your application.
