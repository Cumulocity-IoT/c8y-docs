---
weight: 80
title: MQTT JWT session token retrieval
layout: redirect
---

The code of the {{< product-c8y-iot >}} MQTT example client implemented in Java, which connects to the platform using x.509 certificates, is available here: {{< link-c8y-github >}}/cumulocity-examples/tree/develop/mqtt-client.
This example client uses the implementation of Eclipse Paho, which is described in detail on their website: https://www.eclipse.org/paho/index.php?page=documentation.php.

Here is an example that shows how to add the needed dependency in Maven to use the Eclipse Paho client:

    <dependency>
        <groupId>org.eclipse.paho</groupId>
        <artifactId>org.eclipse.paho.client.mqttv3</artifactId>
        <version>${paho.version}</version>
    </dependency>

Then the instance of the MQTT client can be created with a single line:


    MqttClient mqttClient = new MqttClient(BROKER_URL, "d:" + CLIENT_ID, new MemoryPersistence());

The BROKER_URL must contain the protocol, URL and port to which the client will connect, like this: `ssl://<cumulocity url>:8883`.
The CLIENT_ID value must match the value of the common name of the device certificate that will be used.
The certificate's common name should not contain `:` characters, see [MQTT ClientId](#mqtt-clientid) for more information.
The "d:" prefix is used in {{< product-c8y-iot >}} for device connections and it should not be removed or changed.
Now the only thing that must be configured to establish the SSL connection is to fill paths in the code fragment:

    sslProperties.put(SSLSocketFactoryFactory.KEYSTORE, getClass().getClassLoader().getResource(KEYSTORE_NAME).getPath());
    sslProperties.put(SSLSocketFactoryFactory.KEYSTOREPWD, KEYSTORE_PASSWORD);
    sslProperties.put(SSLSocketFactoryFactory.KEYSTORETYPE, KEYSTORE_FORMAT);
    sslProperties.put(SSLSocketFactoryFactory.TRUSTSTORE, getClass().getClassLoader().getResource(TRUSTSTORE_NAME).getPath());
    sslProperties.put(SSLSocketFactoryFactory.TRUSTSTOREPWD, TRUSTSTORE_PASSWORD);
    sslProperties.put(SSLSocketFactoryFactory.TRUSTSTORETYPE, TRUSTSTORE_FORMAT);

* The certificate's common name should not contain `:` characters, see [MQTT ClientId](#mqtt-clientid) for more information.
* KEYSTORE_NAME - The path to your keystore which contains the private key and the chain of certificates, which the device uses to authenticate itself.
* KEYSTORE_PASSWORD - The password created for keystore to use its private key.
* KEYSTORE_FORMAT - Either "JKS" or "PKCS12" depending on the file format. The path is provided by KEYSTORE_NAME.
* TRUSTSTORE_NAME - The path to your truststore which contains the certificate of the server.
* TRUSTSTORE_PASSWORD - The password to access the truststore.
* TRUSTSTORE_FORMAT - Either "JKS" or "PKCS12" depending on the file format. The path is provided by TRUSTSTORE.

After filling in this data, the example client will use the provided data to connect to the specified platform using certificates.
The example also shows how to create the callback for the connection.
First thing is to create the class which implements the interface `MqttCallbackExtended`.
Then such a class can be created and an instance of it can be provided to the MQTT client: `mqttClient.setCallback(this);`.

In general, the MQTT Eclipse Paho client uses the Java Secure Socket Extension, which is part of the Java Development Kit, to provide secure connections via SSL.
JSSE provides the Java implementation of the SSL and TLS protocol, which can be configured by developers using its classes.
The documentation of the Java Secure Socket Extension shows how the SSL connection is established and provides some examples of customizing the implementation.
The full document is available on the [official Oracle website](https://docs.oracle.com/javase/8/docs/technotes/guides/security/jsse/JSSERefGuide.html).
