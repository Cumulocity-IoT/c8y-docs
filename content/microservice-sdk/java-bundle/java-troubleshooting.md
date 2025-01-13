---
weight: 60
layout: redirect
title: Troubleshooting
---

Some common problems and their solutions have been identified and documented below.

##### SSL or certificate errors {#ssl-or-certificate-errors}

You can use both HTTP and HTTPS from the Java client libraries. To use HTTPS, you may need to import the {{< product-c8y-iot >}} production certificate into your Java Runtime Environment. Download the certificate with the following command:

```shell
$ echo | openssl s_client -servername *.cumulocity.com -connect *.cumulocity.com:443 |sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' > cumulocity.com.crt
```

Import the certificate using the following command:

```shell
$ $JAVA_HOME/bin/keytool -import -alias cumulocity -file cumulocity.com.crt -storepass changeit
```

Confirm that you trust this certificate.

Use the following argument to run Java:

```shell
-Djavax.net.ssl.trustStore=<home directory>/.keystore
```

If you use Eclipse/OSGi, open the **Run Configurations...** dialog in the **Run** menu. Double-click **OSGi Framework**, then open the **Arguments** tab on the right side. In the **VM arguments** text box, add the above parameter.

Since the Java SDK comes with its own set of trusted root certificates, you might still get the error message "java.security.cert.CertificateException: Certificate Not Trusted". In this case, make sure that the GoDaddy Certificate Authority (CACert) is available for your Java environment using the following command:

```shell
$ keytool -import -v -trustcacerts -alias root -file gd_bundle.crt -keystore $JAVA_HOME/lib/security/cacerts
```

The *gd\_bundle.crt* certificate can be downloaded directly from the [GoDaddy repository](https://certs.godaddy.com/anonymous/repository.pki).

##### When I install the SDK, Eclipse complains about compatibility problems {#when-i-install-the-sdk-eclipse-complains-about-compatibility-problems}

Make sure that you use the **Target Platform** preferences page to install the SDK as described in the instructions. **Install New Software** installs software into your running Eclipse IDE, but you must install the SDK as a separate server software.

##### I get "Expected to find an object at table index" when running a microservice or application {#i-get-expected-to-find-an-object-at-table-index-when-running-a-microservice-or-application}

This error occurs due to a bug in particular Eclipse versions. As a workaround, select **Run** from the main menu and then **Run Configurations ...**. On the left, select the launch configuration that you have been using, for example, **OSGi Framework**. On the right, click the **Arguments** tab. Append a " -clean" to the **Program Arguments** and click **Apply**.

##### The microservice or application won't start {#the-microservice-or-application-wont-start}

Verify that all required plug-ins are checked in your launch configuration. Go to **Run** > **Run Configurations** and select the **OSGi Framework** launch configuration. Click **Select All** and try running it again.

Check if the required plug-ins are started. While the application or microservice is running, type "ss" into the console and hit the return key. All listed plug-ins should be either in the ACTIVE or RESOLVED state.

Check if you are using the correct target platform. Go to the **Target Platform** page in the preferences and check if "{{< company-c8y >}} runtime" is checked.

##### The microservice application does not compile. I get "Access Restriction" messages {#the-microservice-application-does-not-compile-i-get-access-restriction-messages}

This error may be caused because of a missing package import. Navigate to the **Dependencies** tab of the project manifest file and check if the package of the type that contains the method giving the access restriction is present in the Import-Package section.

You can find the package by opening the declaration of the method (right-click and select **Open Declaration** from the context menu).

##### When starting an application I get "address already in use" messages {#when-starting-an-application-i-get-address-already-in-use-messages}

Check if you are running another instance of the application. Click on the **Display Selected Console** icon in the console toolbar (the terminal icon) to browse through your consoles. Terminate other running instances by clicking the red **Stop** icon in the toolbar.

Under Unix/macOS you can also use the `lsof` command to see which process is using a particular port. For example, to see which process is using TCP port 8080 enter:

```shell
$ lsof -i tcp:8080
```

It will return something like:

```shell
COMMAND    PID  USER  FD   TYPE      DEVICE  SIZE/OFF  NODE  NAME
java     12985   neo  45u  IPv6  0x077c76d0       0t0   TCP  *:8080 (LISTEN)
```

This means that the process 12985 is using the 8080 port and it can be killed if necessary.

##### When trying to build an application I get a "BeanCreationException: Error creating bean with name methodSecurityInterceptor" error {#when-trying-to-build-an-application-i-get-a-beancreationexception-error-creating-bean-with-name-methodsecurityinterceptor-error}

This is caused mainly by versions incompatibility between the SDK and Spring Boot specified in your _pom.xml_ file. If you want to use a recent version of the SDK, for example, 1016.0.0, the version of Spring Boot must be compatible or equal to version 2.5.4.

##### When using the SDK endpoints /env, /configprops, or /quartz I get return values masked with "******" {#when-using-the-sdk-endpoints-env-configprops-or-quartz-i-get-return-values-masked}

This behavior changed with the update to Spring Boot version 3.2 in the Microservice SDK. To configure or restore the previous behavior, refer to the [Spring Boot documentation](https://docs.spring.io/spring-boot/docs/3.2.2/reference/html/actuator.html#actuator.endpoints.sanitization).

##### Endpoints with a trailing slash like /some/greeting/ are not accepted any more {#endpoints-with-a-trailng-slash-like-some-greeting-are-not-accepted-any-more}

The behavior changed with the update to Spring Boot version 3.2 in the MS SDK. To configure the previous behaviour, please refer to the [Spring Boot migration guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Migration-Guide#web-application-changes).

##### Missing Docker permissions in Linux {#missing-docker-permissions-in-linux}

When you build a microservice application via `mvn`, you might get this error:

```shell
[ERROR] Failed to execute goal com.nsn.cumulocity.clients-java:microservice-package-maven-plugin:1004.6.12:package (package) on project hello-microservice-java: Execution package of goal com.nsn.cumulocity.clients-java:microservice-package-maven-plugin:1004.6.12:package failed: org.apache.maven.plugin.MojoExecutionException: Exception caught: java.util.concurrent.ExecutionException: com.spotify.docker.client.shaded.javax.ws.rs.ProcessingException: java.io.IOException: Permission denied -> [Help 1]
```

This is an issue with Docker in Linux OS.
You can verify that your user is lacking permissions for Docker by running:

```shell
$ docker ps
Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/v1.40/containers/json: dial unix /var/run/docker.sock: connect: permission denied
```

In order to fix this, do the following:

1. Create the Docker group.

   ```shell
   $ sudo groupadd docker
   ```

2. Add your user to the Docker group.

   ```shell
   $ sudo usermod -aG docker $your_user_name
   ```

3. Log out and log back in, so that your group membership is updated. Alternatively, run

   ```shell
   $ newgrp docker
   ```

4. Try running a Docker command again.

Also refer to [Docker Engine > Installation per distro > Optional post-installation steps](https://docs.docker.com/engine/install/linux-postinstall/) in the Docker documentation.
