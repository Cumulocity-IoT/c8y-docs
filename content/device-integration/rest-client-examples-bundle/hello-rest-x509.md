---
weight: 15
title: Hello X509 REST
layout: redirect
---

In this section, we will learn how to generate a JWT token using mTLS protocol with {{< product-c8y-iot >}}.
For authentication with {{< product-c8y-iot >}} we use X.509 certificates. Device access token API is only accessible on port 8443.

### Prerequisites {#prerequisites}

In order to follow this tutorial, check the following prerequisites:
* Verify that you have Maven 3 and at least Java 8 installed.
* Verify that you have OpenSSL installed.

      $ mvn -v
      Maven home: /Library/Maven/apache-maven-3.6.0
      Java version: 1.8.0_201, vendor: Oracle Corporation, runtime: /Library/Java/JavaVirtualMachines/jdk1.8.0_201.jdk/Contents/Home/jre
      Default locale: en_GB, platform encoding: UTF-8
      OS name: "mac os x", version: "10.14.2", arch: "x86_64", family: "mac"

Maven can be downloaded from the [Maven website](http://maven.apache.org).

### Copy a Maven project {#copy-a-maven-project}

Copy a Java project which is configured with Maven from [cumulocity-examples](https://github.com/SoftwareAG/cumulocity-examples/tree/develop/x509-rest-client) repository and execute the following command:

    $ mvn clean install

This will compile the project.

### To generate a valid certificate {#to-generate-a-valid-certificate}

If you don't have a valid certificate, you can generate one for testing purposes, following the instructions below.

1.  Download the scripts from the [cumulocity-examples](https://github.com/SoftwareAG/cumulocity-examples/tree/develop/mqtt-client/scripts) repository.
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

### To change the configuration {#to-change-the-configuration}

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

The device can now generate a JWT token. Note that before the first connect no other actions are required, for example, creating a user. The user is created during the [auto registration](/device-integration/certificate/#device-certificates) process.

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

### Build and run the application {#build-and-run-the-application}

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
