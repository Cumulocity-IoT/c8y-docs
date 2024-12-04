---
weight: 30
title: Hello MQTT C
layout: redirect
---

In this tutorial, you will learn how to use MQTT client in C with {{< product-c8y-iot >}} using pre-defined messages (called "static templates").

### Prerequisites {#prerequisites}

In order to follow this tutorial, check the following prerequisites:

* You have a valid tenant, a user, and a password in order to access {{< product-c8y-iot >}}.
* Verify that you have a gcc compiler installed:


```shell  
$ gcc --version
gcc (Ubuntu 5.4.0-6ubuntu1~16.04.4) 5.4.0 20160609
Copyright (C) 2015 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

* Download, compile and install the MQTT C Paho Client. You will find more details about Paho on the [Paho website](http://www.eclipse.org/paho/clients/c/).


### Developing the "Hello, MQTT world!" client {#developing-the-hello-mqtt-world-client}

To develop a very simple "Hello, world!" MQTT client for {{< product-c8y-iot >}}, you must

* create the application,
* build and run the application.

#### Creating the application {#creating-the-application}

Create a source file (for example *hello_mqtt.c*) with the following content:

```cpp
#include "stdlib.h"
#include "string.h"
#include "unistd.h"
#include "MQTTClient.h"

#define ADDRESS     "<<serverUrl>>"
#define CLIENTID    "<<clientId>>"

void publish(MQTTClient client, char* topic, char* payload) {
    MQTTClient_message pubmsg = MQTTClient_message_initializer;
    pubmsg.payload = payload;
    pubmsg.payloadlen = strlen(pubmsg.payload);
    pubmsg.qos = 2;
    pubmsg.retained = 0;
    MQTTClient_deliveryToken token;
    MQTTClient_publishMessage(client, topic, &pubmsg, &token);
    MQTTClient_waitForCompletion(client, token, 1000L);
    printf("Message '%s' with delivery token %d delivered\n", payload, token);
}

int on_message(void *context, char *topicName, int topicLen, MQTTClient_message *message) {
    char* payload = message->payload;
    printf("Received operation %s\n", payload);
    MQTTClient_freeMessage(&message);
    MQTTClient_free(topicName);
    return 1;
}

int main(int argc, char* argv[]) {
    MQTTClient client;
    MQTTClient_create(&client, ADDRESS, CLIENTID, MQTTCLIENT_PERSISTENCE_NONE, NULL);
    MQTTClient_connectOptions conn_opts = MQTTClient_connectOptions_initializer;
    conn_opts.username = "<<tenant_ID>>/<<username>>";
    conn_opts.password = "<<password>>";

    MQTTClient_setCallbacks(client, NULL, NULL, on_message, NULL);

    int rc;
    if ((rc = MQTTClient_connect(client, &conn_opts)) != MQTTCLIENT_SUCCESS) {
        printf("Failed to connect, return code %d\n", rc);
        exit(-1);
    }
    //create device
    publish(client, "s/us", "100,C MQTT,c8y_MQTTDevice");
    //set hardware information
    publish(client, "s/us", "110,S123456789,MQTT test model,Rev0.1");
    //listen for operation
    MQTTClient_subscribe(client, "s/ds", 0);

    for (;;) {
        //send temperature measurement
        publish(client, "s/us", "211,25");
        sleep(3);
    }
    MQTTClient_disconnect(client, 1000);
    MQTTClient_destroy(&client);
    return rc;
}
```

Replace `<<clientId>>`, `<<serverUrl>>`, `<<tenant_ID>>`, `<<username>>` and `<<password>>` with your data.

The {{< product-c8y-iot >}} MQTT protocol supports both unsecured TCP and secured SSL connections (for example ``tcp://mqtt.{{< domain-c8y >}}:1883`` or ``ssl://mqtt.{{< domain-c8y >}}:8883``), so as the `<<serverUrl>>` you can pick the one which fits for you.
When using SSL remember to configure ``MQTTClient_SSLOptions`` and set it in the ``MQTTClient_connectOptions``.

What does the code in `main` do?

-   Configure an MQTT connection.
-   Register a ``on_message`` callback function which will print incoming messages.
-   Connect with {{< product-c8y-iot >}} via MQTT protocol.
-   Create a new device with ``C MQTT`` name and ``c8y_MQTTDevice`` type.
-   Update the device hardware information by putting a ``"S123456789"`` serial, a ``"MQTT test model"`` model and a ``"Rev0.1"`` revision.
-   Subscribe to the static operation templates for the device - this will result in an ``on_message`` method call every time a new operation is created.
-   Send temperature measurement every 3 seconds.

What does the code in `publish` do?

-   Create a new MQTT message and set a payload.
-   Publish message via MQTT protocol.
-   Wait maximum 1 second for a message delivered ACK from the server.

Note that the subscription is established after the device creation, otherwise if there is no device for a given ``clientId`` the server will not accept it.

#### Building and running the application {#building-and-running-the-application}

To build the application, enter

```shell
$ gcc hello_mqtt.c -o hello_mqtt -lpaho-mqtt3c
```

To run the application, enter

```shell
$ ./hello_mqtt
Message '100,C MQTT,c8y_MQTTDevice' with delivery token 1 delivered
...
```

After starting the application, you should see a new device in the Device Management application, listed in **All devices**.

Additionally, if there will be a new operation created for this device (for example `c8y_Restart`), information about it will be printed to the console.

### Improving the agent {#improving-the-agent}

Now that you have done your first step, check out the section [Hello MQTT](/device-integration/mqtt-examples/#hello-mqtt) to learn more about {{< product-c8y-iot >}} MQTT and improve your application.
