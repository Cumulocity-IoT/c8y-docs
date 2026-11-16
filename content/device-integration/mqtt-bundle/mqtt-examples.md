---
weight: 100
title: MQTT examples
layout: redirect
---

### Hello MQTT

In this tutorial, you will learn how to use MQTT with {{< product-c8y-iot >}} using pre-defined messages (called "static templates").

#### Prerequisites {#prerequisites}

In order to follow this tutorial, check the following prerequisites:

* You have a valid tenant, a user and a password in order to access {{< product-c8y-iot >}}.
* You have installed [MQTTBox](https://chrome.google.com/webstore/detail/mqttbox/kaajoficamnjijhkeomgfljpicifbkaf) or a similar MQTT tool.

{{< c8y-admon-info >}}
- The screenshots in the tutorial use MQTTBox. Other tools may look different.
- If you are using a trial tenant, the default user will not work with this tutorial. Create an additional user instead. The tenant ID and URL data will also differ from trial tenant information.
{{< /c8y-admon-info >}}

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

##### Create the device {#create-the-device}

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

##### Create measurements {#create-measurements}

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

##### Create alarms {#create-alarms}

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

##### Create events {#create-events}

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

##### Receive operations {#receive-operations}

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

### Hello MQTT C

In this tutorial, you will learn how to use MQTT client in C with {{< product-c8y-iot >}} using pre-defined messages (called "static templates").

#### Prerequisites {#prerequisites}

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


#### Developing the "Hello, MQTT world!" client {#developing-the-hello-mqtt-world-client}

To develop a very simple "Hello, world!" MQTT client for {{< product-c8y-iot >}}, you must

* create the application,
* build and run the application.

##### Create the application {#create-the-application}

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

##### Build and run the application {#build-and-run-the-application}

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

#### Improving the agent {#improving-the-agent}

Now that you have done your first step, check out the section [Hello MQTT](/device-integration/mqtt/#hello-mqtt) to learn more about {{< product-c8y-iot >}} MQTT and improve your application.

### Hello MQTT Java

In this tutorial, you will learn how to use the Java MQTT client with {{< product-c8y-iot >}} using pre-defined messages (called "static templates").

#### Prerequisites {#prerequisites}

In order to follow this tutorial, check the following prerequisites:

* You have a valid tenant, a user and a password in order to access {{< product-c8y-iot >}}.
* Verify that you have Maven 3 and at least Java 7 installed.

```shell
$ mvn -v
Maven home: /Library/Maven/apache-maven-3.6.0
Java version: 1.8.0_201, vendor: Oracle Corporation, runtime: /Library/Java/JavaVirtualMachines/jdk1.8.0_201.jdk/Contents/Home/jre
Default locale: en_GB, platform encoding: UTF-8
OS name: "mac os x", version: "10.14.2", arch: "x86_64", family: "mac"
```

Maven can be downloaded from the [Maven website](http://maven.apache.org).

#### Developing the "Hello, MQTT world!" client {#developing-the-hello-mqtt-world-client}

To develop a very simple "Hello, world!" MQTT client for {{< product-c8y-iot >}}, you must

* create a Maven project,
* add a dependency to the MQTT Java client library to the _pom.xml_ (in this example we will use [Paho Java Client](https://eclipse.org/paho/clients/java/)),
* create a Java application,
* build and run the Java application.

##### Create a Maven project {#create-a-maven-project}

To create a plain Java project with Maven, execute the following command:

```shell
$ mvn archetype:generate -DgroupId=c8y.example -DartifactId=hello-mqtt-java -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
```

This will create a folder _hello-mqtt-java_ in the current directory with a skeleton structure for your project.

##### Add the MQTT Java client library {#add-the-mqtt-java-client-library}

Edit the _pom.xml_ in the _hello-mqtt-java_ folder. Add a dependency to the MQTT Paho Java Client.

```xml
<dependency>
    <groupId>org.eclipse.paho</groupId>
    <artifactId>org.eclipse.paho.client.mqttv3</artifactId>
    <version>[1.2.1,)</version>
</dependency>
```

If you are using Java 9 or later, you must set the source and target as described at the [Apache Maven Compiler Plugin](https://maven.apache.org/plugins/maven-compiler-plugin/) page, adding the following code:

```xml
<properties>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
</properties>
```

##### Create a Java application {#create-a-java-application}

Edit the _App.java_ file located in the folder _hello-mqtt-java/src/main/java/c8y/example_ with the following content:

```java
package c8y.example;

import org.eclipse.paho.client.mqttv3.*;
import java.util.concurrent.*;

public class App {

    public static void main(String[] args) throws Exception {

        // client, user and device details
        final String serverUrl   = "tcp://mqtt.cumulocity.com";     /* ssl://mqtt.{{< domain-c8y >}}:8883 for a secure connection */
        final String clientId    = "my_mqtt_java_client";
        final String device_name = "My Java MQTT device";
        final String tenant      = "<<tenant_ID>>";
        final String username    = "<<username>>";
        final String password    = "<<password>>";

        // MQTT connection options
        final MqttConnectOptions options = new MqttConnectOptions();
        options.setUserName(tenant + "/" + username);
        options.setPassword(password.toCharArray());

        // connect the client to {{< product-c8y-iot >}}
        final MqttClient client = new MqttClient(serverUrl, clientId, null);
        client.connect(options);

        // register a new device
        client.publish("s/us", ("100," + device_name + ",c8y_MQTTDevice").getBytes(), 2, false);

        // set device's hardware information
        client.publish("s/us", "110,S123456789,MQTT test model,Rev0.1".getBytes(), 2, false);

        // add restart operation
        client.publish("s/us", "114,c8y_Restart".getBytes(), 2, false);

        System.out.println("The device \"" + device_name + "\" has been registered successfully!");

        // listen for operations
        client.subscribe("s/ds", new IMqttMessageListener() {
            public void messageArrived (final String topic, final MqttMessage message) throws Exception {
                final String payload = new String(message.getPayload());

                System.out.println("Received operation " + payload);
                if (payload.startsWith("510")) {
                    // execute the operation in another thread to allow the MQTT client to
                    // finish processing this message and acknowledge receipt to the server
                    Executors.newSingleThreadScheduledExecutor().execute(new Runnable() {
                        public void run() {
                            try {
                                System.out.println("Simulating device restart...");
                                client.publish("s/us", "501,c8y_Restart".getBytes(), 2, false);
                                System.out.println("...restarting...");
                                Thread.sleep(TimeUnit.SECONDS.toMillis(5));
                                client.publish("s/us", "503,c8y_Restart".getBytes(), 2, false);
                                System.out.println("...done...");
                            } catch (MqttException e) {
                                e.printStackTrace();
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }
                    });
                }
            }
        });

        // generate a random temperature (10º-20º) measurement and send it every 7 seconds
        Executors.newSingleThreadScheduledExecutor().scheduleWithFixedDelay(new Runnable() {
            public void run () {
                try {
                    int temp = (int) (Math.random() * 10 + 10);

                    System.out.println("Sending temperature measurement (" + temp + "º) ...");
                    client.publish("s/us", new MqttMessage(("211," + temp).getBytes()));
                } catch (MqttException e) {
                    e.printStackTrace();
                }
            }
        }, 1, 7, TimeUnit.SECONDS);
    }
}
```

Replace `serverUrl`, `clientId` and `device_name` as needed. Do not forget to specify the user credentials setting values for `tenant_ID`, `username` and `password`.

{{< product-c8y-iot >}} MQTT protocol supports both unsecured TCP and secured SSL connections (that is, `tcp://mqtt.{{< domain-c8y >}}:1883` or `ssl://mqtt.{{< domain-c8y >}}:8883`), so you can pick the one which fits for you and use it in `serverUrl`.

What does the code in `main` do?

-   Configure the MQTT connection.
-   Connect with {{< product-c8y-iot >}} via a MQTT protocol.
-   Create a new device with a name (`device_name`) and a type (`c8y_MQTTDevice`).
-   Update the device hardware information by putting a `"S123456789"` serial, a `"MQTT test model"` model and a `"Rev0.1"` revision.
-   Subscribe to the static operation templates for the device and print all received operations to the console. In case of a `c8y_Restart` operation, simulate a device restart.
-   Create a new thread which sends temperature measurement every 7 seconds.

Note that the subscription is established after the device creation, otherwise if there is no device for a given ``clientId``, the server will not accept it.

##### Build and run the application {#build-and-run-the-application}

Use the following commands to build the application:

```shell
$ cd hello-mqtt-java
$ mvn clean install
...
[INFO]
[INFO] --- maven-jar-plugin:2.4:jar (default-jar) @ hello-mqtt-java ---
[INFO] Building jar: /home/schm/Pulpit/hello-mqtt-java/target/hello-mqtt-java-1.0-SNAPSHOT.jar
[INFO]
[INFO] --- maven-install-plugin:2.4:install (default-install) @ hello-mqtt-java ---
[INFO] Installing /home/schm/Pulpit/hello-mqtt-java/target/hello-mqtt-java-1.0-SNAPSHOT.jar to /home/schm/.m2/repository/c8y/example/hello-mqtt-java/1.0-SNAPSHOT/hello-mqtt-java-1.0-SNAPSHOT.jar
[INFO] Installing /home/schm/Pulpit/hello-mqtt-java/pom.xml to /home/schm/.m2/repository/c8y/example/hello-mqtt-java/1.0-SNAPSHOT/hello-mqtt-java-1.0-SNAPSHOT.pom
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 2.642 s
[INFO] Finished at: 2017-03-14T09:16:25+01:00
[INFO] Final Memory: 14M/301M
[INFO] ------------------------------------------------------------------------
```

and this command to run it:

```shell
$ mvn exec:java -Dexec.mainClass="c8y.example.App"
...
[INFO]                                                                         
[INFO] ------------------------------------------------------------------------
[INFO] Building hello-mqtt-java 1.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO]
[INFO] --- exec-maven-plugin:1.6.0:java (default-cli) @ hello-mqtt-java ---
Received operation 510,123456789
```

After starting the application, you should see a new registered device in the Device Management application, listed in **All devices**. In the **Measurements** tab, you will see the temperature measurements being sent by your client.

Additionally, if there will be a new operation created for this device (for example `c8y_Restart`), information about it will be printed to the console.

#### Improving the agent {#improving-the-agent}

Now that you have done your first step, check out the section [Hello MQTT](/device-integration/mqtt/#hello-mqtt) to learn more about {{< product-c8y-iot >}} MQTT and improve your application.

### Hello MQTT Java with certificates

In this tutorial, you will learn how to use the Java MQTT client with {{< product-c8y-iot >}} using X.509 certificates for authentication.

In the GitHub repository [cumulocity-examples]({{< link-c8y-github >}}/cumulocity-examples/tree/develop/mqtt-client), you can find a sample Java MQTT client using X.509 certificates and all necessary scripts used in this tutorial.

#### Prerequisites {#prerequisites}

In order to follow this tutorial, check the following prerequisites:

*   You have correctly configured the Java client based on the [Hello MQTT Java](#hello-mqtt-java) tutorial.
*   You have a valid tenant, a user and a password in order to access {{< product-c8y-iot >}}.
*   You have a valid certificate. If you don't have it, follow the instructions in the next section to generate one.

##### To generate a valid certificate {#to-generate-a-valid-certificate}

If you don't have a valid certificate, you can generate one for testing purposes following the instructions in [Device certificates](/device-certificate-authentication/device-certificates/).

1.  Download the scripts from the [cumulocity-examples]({{< link-c8y-github >}}/cumulocity-examples/tree/develop/mqtt-client/scripts) repository.
2.  Create a root self-signed certificate (execute the script *00createRootSelfSignedCertificate.sh*) and upload it to your tenant. You can do it via [the Device Management application in the UI](/device-certificate-authentication/managing-trusted-certificates/) or via [REST](https://{{< domain-c8y >}}/api/core/#tag/Tenant-API).
3.  Create and sign the certificate (execute the script *01createSignedCertificate.sh*).
4.  Move the certificates to keystore (execute the script *02moveCertificatesToKeystore.sh*). Additionally, if only the device leaf certificate is needed in the keystore, use the --leafonly option.
5.  Finally, import the trusted certificate into keystore running the following command:

```shell
$ keytool -importcert -file c8y-mqtt-server.cer -keystore chain-with-private-key-iot-device-0001.jks -alias "Alias"
```

#### Developing the "Hello, MQTT world!" client with certificates {#developing-the-hello-mqtt-world-client-with-certificates}

To develop a "Hello, world!" MQTT client for {{< product-c8y-iot >}} with certificates, you must

*  copy the certificate and upload it to the platform,
*  change the configuration in the MQTT client.

##### To copy and upload the certificate {#to-copy-and-upload-the-certificate}

Copy the certificate from the file *chain-iot-device-0001.pem* and upload it to the platform employing a POST request:

**Endpoint:**  <kbd>/tenant/tenants/{tenantId}/trusted-certificates</kbd> <br/>
**Authorization:** Basic <br/>
**Content-Type:** application/json <br/>
**Request body:**

```json
{
    "status" :  "ENABLED",
    "name" : "sampleName",
    "autoRegistrationEnabled" : "true",
    "certInPemFormat" : "<<certificate in pem format>>"
}
```

##### To change the configuration {#to-change-the-configuration}

To change the configuration in the MQTT client, copy the file *chain-with-private-key-iot-device-0001.jks* into the resource folder and set the configuration. Note that the script employed (Step 4.) uses the password `changeit`. If you changed the value in the script, also do it for `KEYSTORE_PASSWORD` and `TRUSTSTORE_PASSWORD` in the following example.

```java
// Configuration
private static final String KEYSTORE_NAME = "chain-with-private-key-iot-device-0001.jks";
private static final String KEYSTORE_PASSWORD = "changeit";
private static final String KEYSTORE_FORMAT = "jks";

private static final String TRUSTSTORE_NAME = "chain-with-private-key-iot-device-0001.jks";
private static final String TRUSTSTORE_PASSWORD = "changeit";
private static final String TRUSTSTORE_FORMAT = "jks";

private static final String CLIENT_ID = "iotdevice0001";
private static final String BROKER_URL = "<SSL URL of the platform>";

private MqttClient connect() throws MqttException {
    MqttClient mqttClient = new MqttClient(BROKER_URL, "d:" + CLIENT_ID, new MemoryPersistence());
    MqttConnectOptions options = new MqttConnectOptions();

    options.setCleanSession(true);

    Properties sslProperties = new Properties();
    sslProperties.put(SSLSocketFactoryFactory.KEYSTORE, getClass().getClassLoader().getResource(KEYSTORE_NAME).getPath());
    sslProperties.put(SSLSocketFactoryFactory.KEYSTOREPWD, KEYSTORE_PASSWORD);
    sslProperties.put(SSLSocketFactoryFactory.KEYSTORETYPE, KEYSTORE_FORMAT);
    sslProperties.put(SSLSocketFactoryFactory.TRUSTSTORE, getClass().getClassLoader().getResource(TRUSTSTORE_NAME).getPath());
    sslProperties.put(SSLSocketFactoryFactory.TRUSTSTOREPWD, TRUSTSTORE_PASSWORD);
    sslProperties.put(SSLSocketFactoryFactory.TRUSTSTORETYPE, TRUSTSTORE_FORMAT);
    sslProperties.put(SSLSocketFactoryFactory.CLIENTAUTH, true);

    options.setSSLProperties(sslProperties);
    mqttClient.setCallback(this);
    System.out.println("Connecting to the broker at " + BROKER_URL);
    mqttClient.connect(options);

    return mqttClient;
}
```  

Use the following values for a successful certificate-based connection:

* Set `BROKER_URL` to `ssl://<your tenant domain>:8883`.
* Set `CLIENT_ID` to the common name of the device certificate.
* The certificate common name must not contain `:`. For details, refer to [MQTT ClientId](/device-integration/mqtt/#mqtt-clientid).
* Keep the `"d:"` prefix in `new MqttClient(BROKER_URL, "d:" + CLIENT_ID, new MemoryPersistence())`, because it identifies device connections in {{< product-c8y-iot >}}.

The device can now publish and subscribe as a standard device. Note that before the first connect no other actions are required, for example, creating a user. The user is created during the [auto registration](/device-certificate-authentication/device-certificates/) process.

{{< c8y-admon-info >}}
You do not need to set a password, user or tenant for the MQTT client connecting using certificates. {{< product-c8y-iot >}} will recognize the tenant and the user by the provided certificate.
{{< /c8y-admon-info >}}

### Hello MQTT browser-based

In this tutorial, you will learn how to use the browser-based MQTT client with {{< product-c8y-iot >}} using pre-defined messages (called "static templates").

#### Prerequisites {#prerequisites}

In order to follow this tutorial, check the following prerequisites:

* You have a valid tenant, a user, and a password in order to access {{< product-c8y-iot >}}.

#### Developing the "Hello, MQTT world!" client {#developing-the-hello-mqtt-world-client}

To develop a very simple "Hello, world!" MQTT client for {{< product-c8y-iot >}}, you must

* create an HTML file and include the MQTT JavaScript client (in this example we will use [Paho JavaScript Client](https://www.eclipse.org/paho/clients/js/)),
* create a JavaScript application,
* run the application.

##### Create a JavaScript application {#create-a-javascript-application}

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

##### Run the application {#run-the-application}

Open the *hello_mqtt_js.html* file in a browser. You should see a new registered device in the Device Management application, listed in **All devices**. In the **Measurements** tab, you will see the temperature measurements being sent by your client.

Additionally, if there will be a new operation created for this device (for example `c8y_Restart`), related information will be displayed in the browser page.

#### Improving the agent {#improving-the-agent}

Now that you have done your first step, check out the section [Hello MQTT](/device-integration/mqtt/#hello-mqtt) to learn more about {{< product-c8y-iot >}} MQTT and improve your application.

### Hello MQTT Node.js

In this tutorial, you will learn how to use the Node.js MQTT client with {{< product-c8y-iot >}} using pre-defined messages (called "static templates").

#### Prerequisites {#prerequisites}

In order to follow this tutorial, check the following prerequisites:

* You have Node.js and the package manager (npm) installed.
* You have a valid tenant, a user, and a password in order to access {{< product-c8y-iot >}}.

#### Developing the "Hello, MQTT world!" client {#developing-the-hello-mqtt-world-client}

To develop a very simple "Hello, world!" MQTT client for {{< product-c8y-iot >}}, you must

* create a Node.js application,
* install the MQTT middleware (in this example we will use the library [MQTT.js](https://github.com/mqttjs/MQTT.js)),
* run the application.

##### Create a Node.js application {#create-a-nodejs-application}

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

##### Run the application {#run-the-application}

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

#### Improving the agent {#improving-the-agent}

Now that you have done your first step, check out the section [Hello MQTT](/device-integration/mqtt/#hello-mqtt) to learn more about {{< product-c8y-iot >}} MQTT and improve your application.

### Hello MQTT Python

In this tutorial, you will learn how to use the Python MQTT client with {{< product-c8y-iot >}} using pre-defined messages (called "static templates").

#### Prerequisites {#prerequisites}

In order to follow this tutorial, check the following prerequisites:

* You have a valid tenant, a user, and a password in order to access {{< product-c8y-iot >}}.
* Verify that you have Python 3 installed:

```shell
$ python3 --version
Python 3.8.5
```
Python can be downloaded from [www.python.org](https://www.python.org/).

* Install the Python Paho client using your system's package manager or using pip:

```shell
$ pip install paho-mqtt
```
{{< c8y-admon-info >}}
The above command installs Paho on your system. You may want to use [virtualenv](https://virtualenv.pypa.io/en/latest/how-to/install.html) to install it only for this example.
{{< /c8y-admon-info >}}

{{< c8y-admon-info >}}
On macOS you may need to execute `sudo easy_install pip` in case the `pip` command is not found.
{{< /c8y-admon-info >}}

#### Developing the "Hello, MQTT world!" client {#developing-the-hello-mqtt-world-client}

To develop a very simple "Hello, world!" MQTT client for {{< product-c8y-iot >}}, you must

* create a Python script,
* run the script.

##### Create a Python script {#create-a-python-script}

Create a script file (for example *hello_mqtt.py*) with the following content:

```python
# /usr/bin/env python3
# -*- coding: utf-8 -*-

import paho.mqtt.client as mqtt
import time, random, threading
import multiprocessing as mp

# client, user and device details
serverUrl   = "mqtt.cumulocity.com"
clientId    = "my_mqtt_python_client"
device_name = "My Python MQTT device"
tenant      = "<<tenant_ID>>"
username    = "<<username>>"
password    = "<<password>>"

# task queue to overcome a deadlock issue in the Python Paho library when using multiple threads
task_queue = mp.Queue()

# display all incoming messages
def on_message(client, userdata, message):
    payload = message.payload.decode("utf-8")
    print(" < received message " + payload)
    if payload.startswith("510"):
        task_queue.put(perform_restart)

# simulate restart
def perform_restart():
    print("Simulating device restart...")
    publish("s/us", "501,c8y_Restart", wait_for_ack = True);

    print("...restarting...")
    time.sleep(1)

    publish("s/us", "503,c8y_Restart", wait_for_ack = True);
    print("...restart completed")

# send temperature measurement
def send_measurement():
    print("Sending temperature measurement...")
    temperature = random.randint(10, 20)
    publish("s/us", "211,{}".format(temperature))

# publish a message
def publish(topic, message, wait_for_ack = False):
    QoS = 2 if wait_for_ack else 0
    message_info = client.publish(topic, message, QoS)
    if wait_for_ack:
        print(" > awaiting ACK for {}".format(message_info.mid))
        message_info.wait_for_publish()
        print(" < received ACK for {}".format(message_info.mid))

# display all outgoing messages
def on_publish(client, userdata, mid):
    print(" > published message: {}".format(mid))

# main device loop
def device_loop():
    while True:
        task_queue.put(send_measurement)
        time.sleep(7)

# connect the client to {{< product-c8y-iot >}} and register a device
client = mqtt.Client(clientId)
client.username_pw_set(tenant + "/" + username, password)
client.on_message = on_message
client.on_publish = on_publish

client.connect(serverUrl)
client.loop_start()
publish("s/us", "100," + device_name + ",c8y_MQTTDevice", wait_for_ack = True)
publish("s/us", "110,S123456789,MQTT test model,Rev0.1")
publish("s/us", "114,c8y_Restart")
print("Device registered successfully!")

client.subscribe("s/ds")

device_loop_thread = threading.Thread(target = device_loop)
device_loop_thread.daemon = True
device_loop_thread.start()

# process all tasks on queue
try:
    while True:
        task = task_queue.get()
        task()
except (KeyboardInterrupt, SystemExit):
    print("Received keyboard interrupt, quitting ...")
    exit(0)

```

Replace `serverUrl`, `clientId` and `device_name` as needed. Do not forget to specify the user credentials setting values for `tenant_ID`, `username` and `password`.

{{< product-c8y-iot >}} MQTT protocol supports both unsecured TCP and secured SSL connections, so when configuring  a port remember to use the correct one. No matter which connection type you select, your `serverUrl` should stay the same (like `mqtt.{{< domain-c8y >}}`).

The above example uses a TCP connection. If you would like to use an SSL connection, remember to use the proper configuration from the Paho MQTT client. Further information can be found at [www.eclipse.org](https://eclipse.dev/paho/files/paho.mqtt.python/html/).

What does the script do?

-   Configure a MQTT connection.
-   Register an ``on_message`` callback function which will print incoming messages. In case of a `c8y_Restart` operation, it will simulate a device restart.
-   Register an ``on_publish`` callback function which will be called after a publish message has been delivered.
-   Connect with {{< product-c8y-iot >}} via the MQTT protocol.
-   Create a new device with a name (`device_name`) and a type (`c8y_MQTTDevice`).
-   Update the device hardware information by putting a `"S123456789"` serial, a `"MQTT test model"` model and a `"Rev0.1"` revision.
-   Subscribe to the static operation templates for the device – this will result in an ``on_message`` method call every time a new operation is created.
-   Start the ``device_loop_thread`` which sends a temperature measurement every 7 seconds.
-   Prepare a ``task_queue``, used mainly to overcome a deadlock issue in the Python Paho library when using multiple threads. The task queue will run all tasks one by one.

What does the ``publish`` message do?

-   Publish a given message about the given topic via MQTT.
-   When publishing the message it uses QoS 2. So to be sure that the message was delivered, it will wait for server ACK (until the ``on_publish`` method is called with the matching message ID).

Note that the subscription is established after the device creation, otherwise if there is no device for a given ``clientId``, the server will not accept it.

##### Run the script {#run-the-script}

To run the script just use the command:

```shell
$ python3 hello_mqtt.py
```

After starting the application you should see a new registered device in the Device Management application, listed in **All devices**. In the **Measurements** tab, you will see the temperature measurements being sent by your client.

Additionally, if there will be a new operation created for this device (for example `c8y_Restart`), information about it will be printed to the console.

#### Improving the agent {#improving-the-agent}

Now that you have done your first step, check out the section [Hello MQTT](/device-integration/mqtt/#hello-mqtt) to learn more about {{< product-c8y-iot >}} MQTT and improve your application.
