---
weight: 40
title: REST client examples
layout: redirect
---

### Hello REST

This section gives a very basic example how to create a device representation in {{< product-c8y-iot >}} and subsequently how to send related measurement data.

All steps are performed by calling REST interfaces. Those REST calls are demonstrated by CURL statements that can be executed on command line.

Refer to [Using the REST interface](/microservice-sdk/rest) for a short introduction to CURL.


#### Prerequisites {#prerequisites}

In order to follow this tutorial, check if the following prerequisites are met:

-   You have a valid tenant, user and password in order to access {{< product-c8y-iot >}}.
-   The command line tool CURL is installed on your system.


#### Performing the REST calls {#performing-the-rest-calls}

We will now perform a sequence of just two REST calls, which are described in detail next:

-   Step 1: Create a new device in the inventory of {{< product-c8y-iot >}}
-   Step 2: Transmit measurement data related to that device

In real world those steps are performed by the 'device agent'.

Step one is performed just once, when the device is connected to {{< product-c8y-iot >}} for the first time.

After that, actions related to that device can be performed by referencing the device by an internal ID which is returned when executing this step.

##### Create a new device {#create-a-new-device}

To create a new device in the inventory of {{< product-c8y-iot >}} the following REST request is needed:

    POST /inventory/managedObjects HTTP/1.1
    Content-Type: application/vnd.com.nsn.cumulocity.managedobject+json
    Accept: application/vnd.com.nsn.cumulocity.managedobject+json
    Authorization: Basic <<Base64 encoded credentials <tenant ID>/<username>:<password> >>
    ...
    {
        "c8y_IsDevice" : {},
        "name" : "HelloWorldDevice"
    }

This call can be done by executing the following curl statement:

    curl -v -u <username>:<password> \
       -H 'Accept: application/vnd.com.nsn.cumulocity.managedobject+json' \
       -H 'Content-type: application/vnd.com.nsn.cumulocity.managedobject+json' \
       -X POST \
       -d '{"c8y_IsDevice":{},"name":"HelloWorldDevice"}' \
       https://<{{< product-c8y-iot >}} tenant domain>/inventory/managedObjects

Replace `<username>`, `<password>` and `<tenant-ID>` with the appropriate credentials given to you when registering with {{< product-c8y-iot >}}.

The same credentials used to access the {{< product-c8y-iot >}} Web GUI can be used to execute the REST calls.

You will receive a response like that:

    HTTP/1.1 201 Created
    Content-Type: application/vnd.com.nsn.cumulocity.managedobject+json; charset=UTF-8; ver=0.9
    Authorization: Basic <<Base64 encoded credentials <tenant ID>/<username>:<password> >>
    ...
    {
        "id": "1231234"
        "lastUpdated": "2014-12-15T14:58:26.279+01:00",
        "name": "HelloWorldDevice",
        "owner": "<username>",
        "self": "https://.../inventory/managedObjects/1231234",
        "c8y_IsDevice": {},
        ...
    }

When creating a device, {{< product-c8y-iot >}} generates an ID, which is needed in further calls in order to reference the device. You can find this ID as the "id" attribute-value pair in the response.


##### Send measurement data {#send-measurement-data}

After the device is created, we can send measurement data.

In our case, we will send a temperature measurement in the unit of Celsius which was collected on a certain time:

    POST /measurement/measurements
    Content-Type: application/vnd.com.nsn.cumulocity.measurement+json
    Accept: application/vnd.com.nsn.cumulocity.measurement+json
    ...
    {
        "c8y_TemperatureMeasurement": {
            "T": {
                "value": 21.23,
                "unit":"C"
            }
        },
        "time": "2014-12-15T13:00:00.123+02:00",
        "source": {
            "id": "1231234"
        },
        "type":"c8y_PTCMeasurement"
    }

Replace the id value with the appropriate value you received in the first step.

Furthermore, you should update the time value to a recent timestamp in order to make it easy to find back the measurement on {{< product-c8y-iot >}} UI later.

Note the data format for timestamp values which is explained as `date-time` in the [Swagger/OpenAPI Specification](https://swagger.io/specification/#data-types).

    curl -v -u <username>:<password> \
       -H 'Accept: application/vnd.com.nsn.cumulocity.measurement+json' \
       -H 'Content-type: application/vnd.com.nsn.cumulocity.measurement+json' \
       -X POST \
       -d '{"c8y_TemperatureMeasurement":{"T":{"value":21.23,"unit":"C"}},"time":"2014-12-15T13:00:00.123+02:00","source":{"id":"1231234"},"type":"c8y_PTCMeasurement"}' \
       https://<{{< product-c8y-iot >}} tenant domain>/measurement/measurements/

The response to that request will look like this:

    HTTP/1.1 201 Created
    Content-Type: application/vnd.com.nsn.cumulocity.measurement+json; charset=UTF-8; ver=0.9
    ...
    {
        "id": "4711",
        "self": "https://.../measurement/measurements/4711",
        "source": {
            "id": "1231234",
            "self": "https://.../inventory/managedObjects/1231234"
        },
        "time": "2014-12-15T12:00:00.123+01:00",
        "type": "c8y_PTCMeasurement",
        "c8y_TemperatureMeasurement": {
            "T" : {
                "unit" : "C",
                "value" : 21.23
            }
        }
    }

If you like to, you can repeat sending measurements. Before sending the request again, you should update the timestamp (value of attribute 'time') in order to create a time series.

Now you are done. Enter the Device Management application in the {{< product-c8y-iot >}} UI, select your device on the "All devices" page and switch to the "Measurements" tab. Here you can see your measurement data.

If you do not see data, you might need to change the filter setting to, for example, "last week" to include the timestamp you used in your submitted measurement.


#### Going further {#going-further}

The sequence of REST calls demonstrated here is just a shortened procedure of those described in [Device integration](/device-integration/device-integration-rest/).
The first step (creating a new device) is part of the 'startup phase', whereas step two (sending measurements) references to the 'cycle phase'.

Refer to the section on [Device integration](/device-integration/device-integration-rest/) to get the necessary information required for implementing real-world agents.

### Hello X509 REST

In this section, we will learn how to generate a JWT token using mTLS protocol with {{< product-c8y-iot >}}.
For authentication with {{< product-c8y-iot >}} we use X.509 certificates. Device access token API is only accessible on port 8443.

#### Prerequisites {#prerequisites}

In order to follow this tutorial, check the following prerequisites:
* Verify that you have Maven 3 and at least Java 8 installed.
* Verify that you have OpenSSL installed.

      $ mvn -v
      Maven home: /Library/Maven/apache-maven-3.6.0
      Java version: 1.8.0_201, vendor: Oracle Corporation, runtime: /Library/Java/JavaVirtualMachines/jdk1.8.0_201.jdk/Contents/Home/jre
      Default locale: en_GB, platform encoding: UTF-8
      OS name: "mac os x", version: "10.14.2", arch: "x86_64", family: "mac"

Maven can be downloaded from the [Maven website](http://maven.apache.org).

#### Copying a Maven project {#copying-a-maven-project}

Copy a Java project which is configured with Maven from [cumulocity-examples]({{< link-c8y-github >}}/cumulocity-examples/tree/develop/x509-rest-client) repository and execute the following command:

    $ mvn clean install

This will compile the project.

#### Generating a valid certificate {#generating-a-valid-certificate}

If you don't have a valid certificate, you can generate one for testing purposes, following the instructions below.

1.  Download the scripts from the [cumulocity-examples]({{< link-c8y-github >}}/cumulocity-examples/tree/develop/mqtt-client/scripts) repository.
2.  Create a root self-signed certificate (execute the script *00createRootSelfSignedCertificate.sh*) and upload it to your tenant. You can do it via [the Device Management application in the UI](/device-management-application/managing-device-data/#managing-trusted-certificates) or via [REST](https://{{< domain-c8y >}}/api/core/#tag/Tenant-API).
3.  Create and sign the certificate (execute the script *01createSignedCertificate.sh*).
4.  Move the certificates to keystore (execute the script *02moveCertificatesToKeystore.sh*).
5. Download the public server key from the respective environment and import it into JKS using this command:

       $ keytool -import -file platform.dev.c8y.io.crt -alias servercertificate -keystore truststore.jks

The following configuration is required before calling the device access token API using:

* KEYSTORE_NAME - The path to your keystore which contains the private key and the chain of certificates, which the device uses to authenticate itself.
* KEYSTORE_PASSWORD - The password created for keystore to use its private key.
* KEYSTORE_FORMAT - Either "JKS" or "PKCS12" depending on the file format. The path is provided by KEYSTORE_NAME.
* TRUSTSTORE_NAME - The path to your truststore which contains the certificate of the server.
* TRUSTSTORE_PASSWORD - The password to access the truststore.
* TRUSTSTORE_FORMAT - Either "JKS" or "PKCS12" depending on the file format. The path is provided by TRUSTSTORE.
* PLATFORM_URL - The URL of the platform.
* PLATFORM_MTLS_PORT - Port 8443 is available for device access token API
* DEVICE_ACCESS_TOKEN_PATH API - The endpoint responsible for the mTLS protocol.
* LOCAL_DEVICE_CHAIN - The whole chain in PEM format. This header is not mandatory, if you have uploaded the immediate issuer of the device certificate as trusted certificate in {{< product-c8y-iot >}}.

#### Changing the configuration {#changing-the-configuration}

To change the configuration in the REST Java client, copy the file *chain-with-private-key-iot-device-0001.jks* into the resource folder and set the configuration. Note that the script employed (Step 4.) uses the password `changeit`. If you changed the value in the script, also do it for `KEYSTORE_PASSWORD` and `TRUSTSTORE_PASSWORD` in the following example.

            private static final String KEYSTORE_NAME = "chain-with-private-key-iot-device-0001.jks";
            private static final String KEYSTORE_PASSWORD = "changeit";
            private static final String KEYSTORE_FORMAT = "jks";
            private static final String TRUSTSTORE_NAME = "truststore.jks";
            private static final String TRUSTSTORE_PASSWORD = "changeit";
            private static final String TRUSTSTORE_FORMAT = "jks";
            private static final String LOCAL_DEVICE_CHAIN = "-----BEGIN CERTIFICATE----- MIIcQhNJJ0F/lfjm -----END CERTIFICATE-----";
            private static final String PLATFORM_URL = "<URL of the platform>";
            private static final String PLATFORM_MTLS_PORT = "8443";

The device can now generate a JWT token. Note that before the first connect no other actions are required, for example, creating a user. The user is created during the [auto registration](/device-integration/device-certificates/) process.

{{< c8y-admon-info >}}
You do not need to set a password, user or tenant for the REST java client using certificates. {{< product-c8y-iot >}} will recognize the tenant and the user by the provided certificate.
{{< /c8y-admon-info >}}

After filling in this data, the example client uses the provided data to retrieve the device access token to the specified platform using certificates.

In general, the mTLS protocol client uses the Java Secure Socket Extension, which is part of the Java Development Kit, to provide secure connections via SSL.
JSSE provides the Java implementation of the SSL and TLS protocol which can be configured by developers using its classes.
The documentation of the Java Secure Socket Extension shows how the SSL connection is established and provides some examples of customizing the implementation.
The full document is available on the [official Oracle website](https://docs.oracle.com/javase/8/docs/technotes/guides/security/jsse/JSSERefGuide.html).
{{< product-c8y-iot >}} mTLS protocol supports secured SSL connections.

What does the code in `main` do?

-   Configure the mTLS connection.
-   Connect with {{< product-c8y-iot >}} via a mTLS protocol.
-   Generate a JWT token after successful authentication using X.509 certificates.
-   Using this JWT token the further rest operation can be done without any certificates.

#### Building and running the application {#building-and-running-the-application}

Use the following commands to build the application:

          $ cd x509-rest-client
          $ mvn clean install
          ...
          [INFO]
          [INFO] --- maven-jar-plugin:2.4:jar (default-jar) @ x509-rest-client ---
          [INFO] Building jar: /home/schm/Pulpit/device-jwt-rest-client/target/x509-rest-client-1.0-SNAPSHOT.jar
          [INFO]
          [INFO] --- maven-install-plugin:2.4:install (default-install) @ x509-rest-client ---
          [INFO] Installing /home/schm/Pulpit/x509-rest-client/target/x509-rest-client-1.0-SNAPSHOT.jar to /home/schm/.m2/repository/c8y/example/x509/x509-rest-client/1.0-SNAPSHOT/x509-rest-client-1.0-SNAPSHOT.jar
          [INFO] Installing /home/schm/Pulpit/x509-rest-client/pom.xml to /home/schm/.m2/repository/c8y/example/x509/x509-rest-client/1.0-SNAPSHOT/x509-rest-client-1.0-SNAPSHOT.pom
          [INFO] ------------------------------------------------------------------------
          [INFO] BUILD SUCCESS
          [INFO] ------------------------------------------------------------------------
          [INFO] Total time: 2.642 s
          [INFO] Finished at: 2017-03-14T09:16:25+01:00
          [INFO] Final Memory: 14M/301M
          [INFO] ------------------------------------------------------------------------

and this command to run it:

          $ mvn exec:java -Dexec.mainClass="c8y.example.x509.X509RestClient"
          ...
          [INFO]                                                                         
          [INFO] ------------------------------------------------------------------------
          [INFO] Building x509-rest-client 1.0-SNAPSHOT
          [INFO] ------------------------------------------------------------------------
          [INFO]
          [INFO] --- exec-maven-plugin:1.6.0:java (default-cli) @ x509-rest-client ---
          access_token ="eyJhbGciOiJSUI6IkpXVCJ9.eyJktYTJmYy0x...S 04HPk3GQUd-fHyJ2oKSuetWFWpUSBPzJzl_73_3yauIlplHorlSoQ"
