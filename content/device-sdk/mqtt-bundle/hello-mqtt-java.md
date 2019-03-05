---
weight: 40
title: Hello MQTT Java
layout: redirect
---

In this tutorial, you will learn how to use the Java MQTT client with Cumulocity using pre-defined messages (called "static templates").

### Prerequisites

In order to follow this tutorial, check the following prerequisites:

* You have a valid tenant, a user and a password in order to access Cumulocity.
* Verify that you have Maven 3 and Java 7 installed. This example is also compatible with Java 8.

```shell
$ mvn -v
Maven home: /Library/Maven/apache-maven-3.6.0
Java version: 1.8.0_201, vendor: Oracle Corporation, runtime: /Library/Java/JavaVirtualMachines/jdk1.8.0_201.jdk/Contents/Home/jre
Default locale: en_GB, platform encoding: UTF-8
OS name: "mac os x", version: "10.14.2", arch: "x86_64", family: "mac"
```

Maven can be downloaded from the [Maven website](http://maven.apache.org).

### Developing the "Hello, MQTT world!" client

To develop a very simple "Hello, world!" MQTT client for Cumulocity, you need to

* create a Maven project,
* add a dependency to the MQTT Java client library to the _pom.xml_ (in this example we will use [Paho Java Client](https://eclipse.org/paho/clients/java/)),
* create a Java application,
* build and run the Java application.

#### Creating a Maven project

To create a plain Java project with Maven, execute the following command:

```shell
$ mvn archetype:generate -DgroupId=c8y.example -DartifactId=hello-mqtt-java -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
```

This will create a folder _hello-mqtt-java_ in the current directory with a skeleton structure for your project.

#### Adding the MQTT Java client library

Edit the _pom.xml_ in the _hello-mqtt-java_ folder. Add a dependency to the MQTT Paho Java Client.

```xml
<dependency>
    <groupId>org.eclipse.paho</groupId>
    <artifactId>org.eclipse.paho.client.mqttv3</artifactId>
    <version>1.2.0</version>
</dependency>
```
#### Creating a Java application

Edit the _App.java_ file in the folder _hello-mqtt-java/src/main/java/c8y/example_ with the following content:

```java
package c8y.example;

import org.eclipse.paho.client.mqttv3.*;
import java.util.concurrent.*;

public class App {

    public static void main(String[] args) throws Exception {

        // client, user and device details
        final String serverUrl   = "tcp://mqtt.cumulocity.com";
        final String clientId    = "my_mqtt_java_client";
        final String device_name = "My new MQTT device";
        final String tenant      = "<<tenant>>";
        final String username    = "<<username>>";
        final String password    = "<<password>>";

        // MQTT connection options
        final MqttConnectOptions options = new MqttConnectOptions();
        options.setUserName(tenant + "/" + username);
        options.setPassword(password.toCharArray());

        // connect the client to Cumulocity
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
                    System.out.println("Simulating device restart...");
                    client.publish("s/us", "501,c8y_Restart".getBytes(), 2, false);
                    System.out.println("...restarting...");
                    Thread.sleep(TimeUnit.SECONDS.toMillis(1));
                    client.publish("s/us", "503,c8y_Restart".getBytes(), 2, false);
                    System.out.println("...done...");
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

Replace `serverUrl`, `clientId` and `device_name` as needed. Do not forget to specify the user credentials setting values for `tenant`, `username` and `password`.

Cumulocity MQTT protocol supports both unsecured TCP and secured SSL connections (i.e. `tcp://mqtt.cumulocity.com:1883` or `ssl://mqtt.cumulocity.com:8883`), so you can pick the one which fits for you and use it in `serverUrl`.

What does the code in `main` do?

-   Configure the MQTT connection.
-   Connect with Cumulocity via a MQTT protocol.
-   Create a new device with a name (`device_name`) and a type (`c8y_MQTTDevice`).
-   Update the device hardware information by putting a `"S123456789"` serial, a `"MQTT test model"` model and a `"Rev0.1"` revision.
-   Subscribe to the static operation templates for the device and print all received operations to the console. In case of a c8y_Restart operation, simulate a device restart.
-   Create a new thread which sends temperature measurement every 7 seconds.

Note that the subscription is established after the device creation, otherwise if there is no device for a given ``clientId``, the server will not accept it.

#### Building and running the application

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

Additionally, if there will be a new operation created for this device (e.g. c8y_Restart), information about it will be printed to the console.

### Improving the agent

Now that you have done your first step, check out the Section [Hello MQTT](/guides/device-sdk/mqtt#hello-mqtt) to learn more about Cumulocity MQTT and improve your application.
