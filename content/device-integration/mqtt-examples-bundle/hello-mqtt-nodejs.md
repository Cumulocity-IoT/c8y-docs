---
weight: 55
title: Hello MQTT Node.js
layout: redirect
---

In this tutorial, you will learn how to use the Node.js MQTT client with {{< product-c8y-iot >}} using pre-defined messages (called "static templates").

### Prerequisites {#prerequisites}

In order to follow this tutorial, check the following prerequisites:

* You have Node.js and the package manager (npm) installed.
* You have a valid tenant, a user, and a password in order to access {{< product-c8y-iot >}}.

### Developing the "Hello, MQTT world!" client {#developing-the-hello-mqtt-world-client}

To develop a very simple "Hello, world!" MQTT client for {{< product-c8y-iot >}}, you must

* create a Node.js application,
* install the MQTT middleware (in this example we will use the library [MQTT.js](https://github.com/mqttjs/MQTT.js)),
* run the application.

#### Creating a Node.js application {#creating-a-nodejs-application}

Create the _package.json_ file to list down the dependencies and other basic information about your application.

```json
{
  "dependencies": {
    "mqtt": "*"
  },
  "scripts": {
    "start": "node app.js"
  }
}
```

Create the start script (_app.js_) specified in the _package.json_ file with the following content:

```javascript
// MQTT dependency https://github.com/mqttjs/MQTT.js
const mqtt = require("mqtt");

// client, user and device details
const serverUrl   = "tcp://mqtt.cumulocity.com";
const clientId    = "my_mqtt_nodejs_client";
const device_name = "My Node.js MQTT device";
const tenant      = "<<tenant_ID>>";
const username    = "<<username>>";
const password    = "<<password>>";

var temperature   = 25;

// connect the client to {{< product-c8y-iot >}}
const client = mqtt.connect(serverUrl, {
    username: tenant + "/" + username,
    password: password,
    clientId: clientId
});

// once connected...
client.on("connect", function () {
    // ...register a new device with restart operation
    client.publish("s/us", "100," + device_name + ",c8y_MQTTDevice", function() {
        client.publish("s/us", "114,c8y_Restart", function() {
            console.log("Device registered with restart operation support");
        });

        // listen for operations
        client.subscribe("s/ds");

        // send a temperature measurement every 3 seconds
        setInterval(function() {
            console.log("Sending temperature measurement: " + temperature + "º");
            client.publish("s/us", "211," + temperature);
            temperature += 0.5 - Math.random();
        }, 3000);
    });

    console.log("\nUpdating hardware information...");
    client.publish("s/us", "110,S123456789,MQTT test model,Rev0.1");
});

// display all incoming messages
client.on("message", function (topic, message) {
    console.log('Received operation "' + message + '"');
    if (message.toString().indexOf("510") == 0) {
        console.log("Simulating device restart...");
        client.publish("s/us", "501,c8y_Restart");
        console.log("...restarting...");
        setTimeout(function() {
            client.publish("s/us", "503,c8y_Restart");
            console.log("...done...");
        }, 1000);
    }
});
```

Replace `serverUrl`, `clientId` and `device_name` as needed. Do not forget to specify the user credentials setting values for `tenant_ID`, `username` and `password`.

The {{< product-c8y-iot >}} MQTT protocol supports both unsecured TCP and secured SSL connections. No matter which connection type you select, your `serverUrl` should stay the same (like `mqtt.{{< domain-c8y >}}`).

What does the code do?

-   Configure the MQTT connection.
-   When the connection is established, register a new device with a name (`device_name`) and a type (`c8y_MQTTDevice`).
-   Add restart capabilities to the device.
-   Subscribe to listen for operations.
-   Send a random temperature measurement every 3 seconds.
-   Update the device hardware information by putting a `"S123456789"` serial, a `"MQTT test model"` model and a `"Rev0.1"` revision.
-   Listen to all incoming messages. In case of a `c8y_Restart` operation, simulate a device restart.

Note that the subscription is established after the device creation, otherwise if there is no device for a given `clientId`, the server will not accept it.

#### Running the application {#running-the-application}

Before running the application, the MQTT middleware must be installed. To achieve this, execute the following command:

```shell
$ npm install
```

Installation needs to be done only once. Afterwards, you only must execute the following command:

```shell
$ npm start
```

You should see a new registered device in the Device Management application, listed in **All devices**. In the **Measurements** tab, you will see the temperature measurements being sent by your client.

Additionally, if there will be a new operation created for this device (for example `c8y_Restart`), related information about it will be printed to the console.

### Improving the agent {#improving-the-agent}

Now that you have done your first step, check out the section [Hello MQTT](/device-integration/mqtt-examples/#hello-mqtt) to learn more about {{< product-c8y-iot >}} MQTT and improve your application.
