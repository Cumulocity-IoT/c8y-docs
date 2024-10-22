---
weight: 20
title: Hello world tutorial for Java
layout: redirect

---

Here you will learn how to create your first microservice that can be deployed on the [{{< product-c8y-iot >}} platform](https://{{< domain-c8y >}}) using the Microservice SDK for Java.

Requests to a microservice can be authenticated using basic authentication or OAuth. Refer to [Authentication and authorization](/microservice-sdk/general-aspects/#authentication-and-authorization) for more details.

### Prerequisites {#prerequisites}

You must have {{< product-c8y-iot >}} credentials and a dedicated tenant. In case you do not have that yet, create an account on the [{{< product-c8y-iot >}} platform](https://{{< domain-c8y >}}), for example by using a free trial. At this step you will be provided with a dedicated URL address for your tenant.

Verify that you have a recommended Java version installed together with Maven 3 or higher. It can be downloaded from the [Maven website](https://maven.apache.org/download.cgi).

```shell
$ mvn -v
Apache Maven 3.8.5
Maven home: /Library/Maven/apache-maven-3.8.5
Java version: 17.0.6, vendor: Oracle Corporation
Java home (runtime): /Library/Java/JavaVirtualMachines/jdk-17.0.6.jdk/Contents/Home
OS name: "mac os x", version: "10.14.6", arch: "x86_64", family: "mac"
```

You will also need a Docker installation, and in case that you don't have it yet, go to the [Docker website](https://www.docker.com/get-started) to download and install it.

{{< product-c8y-iot >}} microservices are Docker containers for the Linux/Amd64 platform. Other architectures are currently not supported. The Docker engine must provide the API version 1.38 or newer. This is the case for Docker versions 18.06 and later. Use the following command to verify your Docker installation:

```shell
$ docker version
Client: Docker Engine - Community
 Version:           20.10.14
 API version:       1.41
 Go version:        go1.16.15
 Git commit:        a224086
 Built:             Thu Mar 24 01:47:57 2022
 OS/Arch:           linux/amd64
 Context:           default
 Experimental:      true

Server: Docker Engine - Community
 Engine:
  Version:          20.10.14
  API version:      1.41 (minimum version 1.12)
  Go version:       go1.16.15
  Git commit:       87a90dc
  Built:            Thu Mar 24 01:45:46 2022
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          1.5.11
  GitCommit:        3df54a852345ae127d1fa3092b95168e4a88e2f8
 runc:
  Version:          1.0.3
  GitCommit:        v1.0.3-0-gf46b6ba
 docker-init:
  Version:          0.19.0
  GitCommit:        de40ad0
```

### Developing the "Hello world" microservice {#developing-the-hello-world-microservice}

You can download the source code of this example from our [GitHub]({{< link-c8y-github >}}/cumulocity-examples/tree/develop/hello-world-microservice) repository to build and run it using your favorite IDE, or follow the instructions below to guide you step-by-step for you to have a better understanding of the code and what must be done/configured.

{{< c8y-admon-important >}}
This microservice example has been tested under macOS, Ubuntu and Windows 10 with Java 17, Maven 3.8.5, Docker 20.10.14; latest version of IntelliJ IDEA as IDE. Other tools or Java versions may require different configurations.
{{< /c8y-admon-important >}}

#### Create a Maven project {#create-a-maven-project}

Use the [Maven Archetype Plugin](https://maven.apache.org/archetype/maven-archetype-plugin/) to create a Java project from an existing Maven template. Use `c8y.example` as your groupId, `hello-microservice-java` as your artifactId, and set the version following the SemVer format as specified in [Microservice manifest](/microservice-sdk/general-aspects/#microservice-manifest).

```shell
$ mvn archetype:generate -DgroupId=c8y.example -DartifactId=hello-microservice-java -Dversion=1.0.0-SNAPSHOT -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
```

This will create a folder *hello-microservice-java* in the current directory with a skeleton structure for your project.

#### Specify the properties {#specify-the-properties}

You will find the _pom.xml_ file inside the *hello-microservice-java* folder. Edit this file and add a `<properties>` element to set the `-source` and `-target` of the [Java Compiler](https://maven.apache.org/plugins/maven-compiler-plugin/examples/set-compiler-source-and-target.html) using version 17. This example uses [Spring Boot](https://spring.io/projects/spring-boot) to quickly build and create the application using the Spring Framework. Hence, also specify in the `<properties>` element the version to use as follows:

```xml
<properties>
    <java.version>17</java.version>
    <maven.compiler.source>${java.version}</maven.compiler.source>
    <maven.compiler.target>${java.version}</maven.compiler.target>
    <spring-boot-dependencies.version>2.5.14</spring-boot-dependencies.version>
</properties>
```

#### Add the microservice library {#add-the-microservice-library}

You must specify the version of the {{< product-c8y-iot >}}'s microservice library to be used. This can be found on the platform; at the top-right corner, click the tenant user and find the backend version on the pop-up menu.

Alternatively, you can retrieve the backend version with a GET request to <kbd><URL>/tenant/system/options/system/version</kbd>.

The response looks like this:

```json
{
    "category": "system",
    "value": "1016.0.117",
    "key": "version"
}
```

See also [Tenants](https://{{< domain-c8y >}}/api/core/#tag/Tenants) in the {{< openapi >}}.

In the `<properties>` element specified above, add a child element `<c8y.version>` with the backend version of your tenant. Also add a `<microservice.name>` child element to name your microservice application.

```xml
    <c8y.version>1016.0.117</c8y.version>
    <microservice.name>hello-microservice-java</microservice.name>
```

{{< c8y-admon-important >}}
When naming your microservice application use only lower-case letters, digits and dashes. The maximum length for the name is 23 characters.
{{< /c8y-admon-important >}}

#### Add repositories and dependencies {#add-repositories-and-dependencies}

Your _pom.xml_ file must have `<repository>` and `<pluginRepository>` elements to point to the {{< product-c8y-iot >}} Maven repository which stores the client libraries.

```xml
<repositories>
    <repository>
        <id>cumulocity</id>
        <layout>default</layout>
        <url>https://download.cumulocity.com/maven/repository</url>
    </repository>
</repositories>
<pluginRepositories>
    <pluginRepository>
        <id>public</id>
        <url>https://download.cumulocity.com/maven/repository</url>
    </pluginRepository>
</pluginRepositories>
```

Also add a dependency for the Microservice SDK library inside the `<dependencies>` node.

```xml
<dependencies>
    ...
    <dependency>
        <groupId>com.nsn.cumulocity.clients-java</groupId>
        <artifactId>microservice-autoconfigure</artifactId>
        <version>${c8y.version}</version>
    </dependency>
</dependencies>
```

Add a `<dependencyManagement>` element to automatically manage the required artifacts needed for your microservice application.

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.nsn.cumulocity.clients-java</groupId>
            <artifactId>microservice-dependencies</artifactId>
            <version>${c8y.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

#### Configure the build plugins {#configure-the-build-plugins}

Your microservice application must be packed as a Docker image in a ZIP file including all the required dependencies. To achieve that, include in your _pom.xml_ file build plugins as follows:

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <version>${spring-boot-dependencies.version}</version>
            <configuration>
                <mainClass>c8y.example.App</mainClass>
            </configuration>
            <executions>
                <execution>
                    <goals>
                        <goal>repackage</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
        <plugin>
            <groupId>com.nsn.cumulocity.clients-java</groupId>
            <artifactId>microservice-package-maven-plugin</artifactId>
            <version>${c8y.version}</version>
            <executions>
                <execution>
                    <id>package</id>
                    <phase>package</phase>
                    <goals>
                        <goal>package</goal>
                    </goals>
                    <configuration>
                        <name>${microservice.name}</name>
                        <image>${microservice.name}</image>
                        <encoding>UTF-8</encoding>
                    </configuration>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

The name of the generated ZIP file is specified in the image element as `<image>${microservice.name}</image>`. It takes the name from the previously defined property `microservice.name`, which in this case is *hello-microservice-java*.


#### Create a Java application {#create-a-java-application}

Edit the _App.java_ file located in the folder */src/main/java/c8y/example* with the following content:

```java
package c8y.example;

import com.cumulocity.microservice.autoconfigure.MicroserviceApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@MicroserviceApplication
@RestController
public class App {
    public static void main (String[] args) {
        SpringApplication.run(App.class, args);
    }

    @RequestMapping("hello")
    public String greeting (@RequestParam(value = "name", defaultValue = "World") String you) {
        return "Hello " + you + "!";
    }
}
```

The code uses four annotations; three are part of the Spring Framework and one of the {{< product-c8y-iot >}} Microservice SDK. The `@RestController` annotation marks the class as a controller where every method returns a domain object instead of a view. The `@RequestMapping` annotation ensures that HTTP requests to the <kbd>/service/&lt;microservice-name>/hello</kbd> endpoint are mapped to the `greeting()` method. `@RequestParam` binds the value of the query string parameter <kbd>name</kbd> into the `you` parameter of the `greeting()` method. Refer to the [Spring Guides](https://spring.io/guides) for more details about building RESTful Web Services using the Spring Framework.

Employing the `@MicroserviceApplication` annotation is a simple way to add the required behavior for {{< product-c8y-iot >}} microservices including:

* Security
* Subscription
* Health check endpoint at <kbd>/service/&lt;microservice-name>/health</kbd>
* Context
* Settings
* Internal platform API
* Spring Boot application

#### Configure the microservice application {#configure-the-microservice-application}

Create the directory _src/main/resources_ to contain an _application.properties_ file specifiying the name of the microservice application and the server port:

```properties
application.name=my-first-microservice
server.port=80
```

Create the directory _src/main/configuration_ to contain a _cumulocity.json_ file. This is the [manifest](/microservice-sdk/general-aspects/#microservice-manifest) file and it is required to deploy the microservice in the {{< product-c8y-iot >}} platform.

```json
{
  "apiVersion": "2",
  "version": "@project.version@",
  "provider": {
    "name": "{{< company-c8y >}}"
  },
  "isolation": "MULTI_TENANT",
  "replicas": 2,
  "livenessProbe": {
    "httpGet": {
      "path": "/health"
    },
    "initialDelaySeconds": 60
  },
  "readinessProbe": {
    "httpGet": {
      "path": "/health"
    },
    "initialDelaySeconds": 60
  },
  "requiredRoles": [ ]
}
```

#### Build the microservice application {#build-the-microservice-application}

In a terminal, navigate to the folder where your _pom.xml_ is located and execute the following Maven command:

```shell
$ mvn clean install
```

After a successful build, you will find a ZIP file inside the _target_ directory.

```shell
$ ls target | grep zip
hello-microservice-java-1.0.0-SNAPSHOT.zip
```

### Deploying the "Hello world" microservice {#deploying-the-hello-world-microservice}

To deploy your microservice on the {{< product-c8y-iot >}} platform you need:

* A valid tenant, a user and a password in order to access {{< product-c8y-iot >}}.
* The ZIP file built with Maven on the previous steps.

{{< c8y-admon-important >}}
The **Microservice hosting** feature must be activated on your tenant, otherwise your request will return an error message like "security/Forbidden, access is denied". This feature is not assigned to tenants by default, so trial accounts won't have it. Contact [product support](/additional-resources/contacting-support/) so that we can assist you with the activation. Note that this is a paid feature.
{{< /c8y-admon-important >}}

In the Administration application, navigate to **Ecosystem** > **Microservices**, and click **Add microservice**.

Upload the ZIP file for your microservice application and click **Subscribe** to subscribe the microservice to your tenant.

Once the ZIP file has been uploaded successfully, you will see a new microservice application created.

#### Test the deployed microservice {#test-the-deployed-microservice}

Employing your tenant credentials, you can test the microservice on any web browser using the URL as follows:

```http
https://<yourTenantDomain>/service/hello-microservice-java/health
```

You can also use third-party applications or commands to make a GET request to your microservice endpoint. To do so, you need:

* A valid tenant, a user and a password in order to access {{< product-c8y-iot >}}.
* A basic authorization header `"Authorization: Basic <Base64(<tenantID>/<username>:<password>)>"`.

For instance, if your tenant ID, username and password are **t0071234**, **testuser** and **secret123** respectively, you can get the Base64 string with the following command:

```shell
$ echo -n t0071234/testuser:secret123 | base64
dDAwNzEyMzQvdGVzdHVzZXI6c2VjcmV0MTIz
```

and your authorization header would look like `Authorization: Basic dDAwNzEyMzQvdGVzdHVzZXI6c2VjcmV0MTIz`. Employing the cURL command you can test your microservice as follows:

```shell
$ curl -H "Authorization: <AUTHORIZATION>" https://<yourTenantDomain>/service/hello-microservice-java/hello?name=Skywalker
```

Most tools should already support the {{< product-c8y-iot >}} Authorization header out of the box. Simply use `<tenantId>/<username>` as username and `<password>` as password. In modern versions, for example, the above cURL command can also look like below, and the header will be generated automatically:

```shell
$ curl --user "<TENANTID>/<USERNAME>:<PASSWORD>" https://<yourTenantDomain>/service/hello-microservice-java/hello?name=Skywalker
```


### Running the microservice locally {#running-the-microservice-locally}

You can run the Docker container locally in order to test the REST calls from the microservice to {{< product-c8y-iot >}}.

To run a microservice which uses the {{< product-c8y-iot >}} API locally, you need:

* A valid tenant, a user and a password in order to access {{< product-c8y-iot >}}.
* An authorization header as "Basic &lt;Base64(&lt;tenantID>/&lt;username>:&lt;password>)>".

#### Create the application {#create-the-application}

If the application does not exist, create a new application on the {{< product-c8y-iot >}} platform employing a POST request.

```http
POST <URL>/application/applications

HEADERS:
  "Authorization": "<AUTHORIZATION>"
  "Content-Type": "application/vnd.com.nsn.cumulocity.application+json"
  "Accept": "application/vnd.com.nsn.cumulocity.application+json"

BODY:
{
  "name": "<APPLICATION_NAME>",
  "type": "MICROSERVICE",
  "key": "<APPLICATION_NAME>-key"
}
```

You must replace the values `<URL>` with the URL of your {{< product-c8y-iot >}} tenant (domain), `<AUTHORIZATION>` is Basic with a Base64 encoded string, and for `<APPLICATION_NAME>` use the desired name for your microservice application and its `key` name.

{{< c8y-admon-important >}}
When naming your microservice application use only lower-case letters, digits and dashes. The maximum length for the name is 23 characters.
{{< /c8y-admon-important >}}

The cURL command can be used to create the application with a POST request:

```shell
$ curl -X POST -s \
  -d '{"name":"local-microservice-java","type":"MICROSERVICE","key":"my-hello-world-ms-key"}' \
  -H "Authorization: <AUTHORIZATION>" \
  -H "Content-Type: application/vnd.com.nsn.cumulocity.application+json" \
  -H "Accept: application/vnd.com.nsn.cumulocity.application+json" \
  "<URL>/application/applications"
```

In case of errors, such as invalid names, you will get the details printed in the console. When the application is created successfully, you will get a response in JSON format similar to the following example:

```json
{
    "availability": "PRIVATE",
    "contextPath": "local-microservice-java",
    "id": "<APPLICATION_ID>",
    "key": "my-hello-world-ms-key",
    "manifest": {
        "noAppSwitcher": true,
        "settingsCategory": null
    },
    "name": "local-microservice-java",
    "owner": {
        "self": "...",
        "tenant": {
            "id": "<TENANT_ID>"
        }
    },
    "requiredRoles": [],
    "roles": [],
    "self": "<URL>/application/applications/<APPLICATION_ID>",
    "type": "MICROSERVICE"
}
```

In the Administration application, navigate to **Ecosystem** > **Microservices**. There you will see the created microservice.

#### Acquire the microservice bootstrap user {#acquire-the-microservice-bootstrap-user}

You will need the bootstrap user credentials in order to run the microservice locally. Get the details of your bootstrap user with a GET request.

```http
GET <URL>/application/applications/<APPLICATION_ID>/bootstrapUser

HEADERS:
  "Authorization": <AUTHORIZATION>
  "Content-Type": application/vnd.com.nsn.cumulocity.user+json
```

{{< c8y-admon-info >}}
Besides the cURL command, you can also employ a graphical interface such as Postman.
{{< /c8y-admon-info >}}

The response looks like this:

```json
{
    "password": "<BOOTSTRAP_USER_PASSWORD>",
    "name": "<BOOTSTRAP_USER_NAME>",
    "tenant": "<BOOTSTRAP_USER_TENANT>"
}
```

#### Run the Docker container {#run-the-docker-container}

The Docker image was built using your local Docker repository during the [Maven build](#build-the-microservice-application). **Note, that by default the image is deleted to keep your registry clean during development**. You can change this by adding the property `microservice.package.deleteImage=false` to the maven command or *pom.xml*.

```shell
$ mvn clean install -Dmicroservice.package.deleteImage=false
```

You can list all the Docker images available with the following command:

```shell
$ docker images
```

It yields an output similar to this:

```plain
REPOSITORY                TAG                 IMAGE ID            CREATED             SIZE
hello-microservice-java   1.0.0-SNAPSHOT      3e5e7aeea7bc        52 minutes ago      143MB
```


Get your IMAGE ID and TAG from the list. While not strictly a means of identifying a container, you can specify a version of an image (TAG) you would like to run the container with. Run the Docker container for the microservice:

```shell
$ docker run -p 8082:80 -e C8Y_BOOTSTRAP_TENANT=<BOOTSTRAP_USER_TENANT> \
  -e C8Y_BOOTSTRAP_USER=<BOOTSTRAP_USER_NAME> \
  -e C8Y_BOOTSTRAP_PASSWORD=<BOOTSTRAP_USER_PASSWORD> \
  -e C8Y_MICROSERVICE_ISOLATION=MULTI_TENANT \
  -i -t -e C8Y_BASEURL=<URL> <IMAGE_ID>
```

`-p 8082:80` will expose your port 80 to a port on your host system, for example, 8082.

If your Docker image has run successfully, you shall see the output on the console similar to the one below.

```plain
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v2.5.14)

2022-10-21 15:53:07.510  INFO 7 --- [main] c8y.example.App                          : Starting App on dff01acae6d8 with PID 7 (/data/hello-microservice-java.jar started by root in /)
...
2022-10-21 15:53:17.583  INFO 7 --- [main] s.b.c.e.t.TomcatEmbeddedServletContainer : Tomcat started on port(s): 80 (http)
2022-10-21 15:53:17.598  INFO 7 --- [main] c8y.example.App                          : Started App in 11.32 seconds (JVM running for 12.192)
```

#### Subscribe to the microservice {#subscribe-to-the-microservice}

In the Administration application, navigate to **Ecosystem** > **Microservices**. Locate your microservice application and click it to open its details. On the top right, click **Subscribe**.

At this point, you may open your favorite browser and test your microservice at <http://localhost:8082/hello>. Enter your bootstrap user credentials using &lt;tenant>/&lt;username> and your password.

You may also use the name parameter, for example, <http://localhost:8082/hello?name=Neo>.

### Improving the microservice {#improving-the-microservice}

Now that you have done your first steps, check out the section [Developing microservices](/microservice-sdk/java#developing-microservice) to find out what else can be implemented. Review also the [Java example](/microservice-sdk/java/#create-a-java-application) in this guide to learn using more features of the microservice SDK and REST API by employing third-party services.
