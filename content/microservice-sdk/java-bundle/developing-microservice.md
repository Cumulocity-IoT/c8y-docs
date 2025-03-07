---
weight: 40
title: Developing microservices
layout: redirect

---

See below for the different microservice SDK features, including annotations, services, configuration files, logging and the Maven build plugin.

There are two possible deployment types on the platform:

* Hosted deployment - The default for microservices and the suggested one for typical use cases.
* External/legacy deployment - Requires custom installation of the platform and agent.

For development and testing purposes, one can deploy a microservice on a local Docker container.

### Annotations {#annotations}

The simplest way to add required behavior to your application is to annotate a main class with `@MicroserviceApplication`. This is a collective annotation consisting of:

Annotation | Description
-----------|------------
@SpringBootApplication | Comes from Spring Boot auto configure package
@EnableContextSupport | Required to use `@UserScope` or `@TenantScope` scopes for method invocations
@EnableHealthIndicator | Provides a standard health endpoint used by the platform to monitor the microservice availability
@EnableMicroserviceSecurity | Provides a standard security mechanism, verifying user and roles against the platform
@EnableMicroserviceSubscription | Responsible for subscribing microservices to the platform, updating metadata and listening to tenant subscription change events
@EnableMicroservicePlatformInternalApi | Injects the platform API services into Spring context for a microservice to use
@EnableTenantOptionSettings | Provides microservice configuration within tenant options and allows overriding default properties from files

### Context support {#context-support}

The context support is covered by the annotation `@EnableContextSupport`. It allows to choose between `@TenantScope` and `@UserScope` which is related to the user management of microservices, as described in [General aspects](/microservice-sdk/general-aspects) in {{< product-c8y-iot >}}.

Each microservice has a service user which can be used for the interaction with the platform. The roles associated with this user are specified in the manifest.
Within the tenant scope, the credentials of this service user are used for the communication with the platform, while within the user scope the credentials of the authenticated user sending the request to the microservice are used.

#### Setting the context
You can explicitly set the context along with the credentials to be used through `ContextService`. To use the credentials of the user sending the request, use `ContextService<UserCredentials>`. Accordingly, `ContextService<MicroserviceCredentials>` can be used for service user credentials.
Examples on how to use `ContextService` are given below.

```java
@Autowired
private ContextService<UserCredentials> contextService;
@Autowired
private EventApi userEventApi;

public List<EventRepresentation> getEvents () {
  final ArrayList<EventRepresentation> events = new ArrayList<>();
  contextService.runWithinContext(contextService.getContext(), () -> {
    userEventApi.getEvents().get().getEvents().forEach(event -> events.add(event));
  });
  return events;
}
```
In this first example, the events are obtained using the credentials of the authenticated user.


In the second example, the credentials of the service user will be utilized to retrieve the events.
```java
@Autowired
private ContextService<MicroserviceCredentials> contextService;
@Autowired
private EventApi eventApi;

public List<EventRepresentation> getEvents () {
  final ArrayList<EventRepresentation> events = new ArrayList<>();
  contextService.runWithinContext(contextService.getContext(), () -> {
    eventApi.getEvents().get().getEvents().forEach(event -> events.add(event));
  });
  return events;
}
```

To demonstrate usage of `ContextService` with simple code examples above, `eventApi` and `userEventApi` have been used while they are already attached to the desired context.
In more complex applications, care must be taken to not use Platform API related beans with tenant scope in a user scope context and vice versa.

Another use case for setting the required context for an arbitrary tenant user is shown in the example below.
Typically, this user's credentials object already exist within the application and does not need to be created locally like in this example.

```java
@Autowired
private ContextService<UserCredentials> contextService;
@Autowired
private EventApi userEventApi;

public List<EventRepresentation> getEvents () {
  UserCredentials myUserContext = new UserCredentials("<tenant>", "<user>", "<password>", ... );
  final ArrayList<EventRepresentation> events = new ArrayList<>();
  contextService.runWithinContext(myUserContext, () -> {
    userEventApi.getEvents().get().getEvents().forEach(event -> events.add(event));
  });
  return events;
}
```

#### Tenant scope  
The tenant scope is associated with the usage of the service user credentials and is annotated with `@TenantScope`.
To create a bean, named `tenantEventApi` in the tenant scope, use the annotation `@TenantScope`, as in the following code example.

```java
@Autowired
private Platform platform;

@TenantScope
@Bean(name = "tenantEventApi")
public EventApi eventApi (Platform platform) throws SDKException {
  return platform.getEventApi();
}  
```

By default, the Platform API related beans provided by the Microservice SDK are created in the tenant scope and use the service user to communicate with the platform.  

There are predefined beans both in the `@TenantScope` and `@UserScope`.
The name of a bean in the tenant scope consists of the prefix `"tenant"` and the name of the respective API. Thus, to use the Event API in the tenant scope, you can specify @Qualifier("tenantEventApi"), as shown in the example below. As the tenant scope is the default context for the created beans, the annotation can also be omitted. Therefore, the following two excerpts are equivalent and both suggest that the service user credentials will be used for the communication with the platform.

```java
@Autowired
@Qualifier("tenantEventApi")
private EventApi eventApi;
```

```java
@Autowired
private EventApi eventApi;
```
In both cases, beans within the tenant scope will be auto-wired.

#### User scope
In certain situations the microservice should not use the service user credentials but the credentials of the user sending the request.

To create a bean in the user scope, specify `@UserScope`:

```java
@Autowired
private Platform platform;

@UserScope
@Bean(name = "userEventApi")
public EventApi eventApi (Platform platform) throws SDKException {
  return platform.getEventApi();
}  
```

Analogously to the tenant scope case, there are predefined beans in the user scope. The name of such beans consists of the prefix "user" and the name of the API. An example of auto-wiring a bean of the `@UserScope` is given below.

```java
@Autowired
@Qualifier("userEventApi")
private EventApi eventApi;
```

Within the user scope, the created beans use the credentials of the authenticated user sending the request instead of the default service user for the communication with the platform.

There are several predefined Platform API related beans with this naming pattern
* <library-name>Api - in tenant scope like inventoryApi
* tenant<library-name>Api - in tenant scope like tenantInventoryApi
* user<library-name>Api - in user scope like userInventoryApi

These beans are
* inventoryApi
* identityApi
* measurementApi
* deviceControlApi
* alarmApi
* eventApi
* eventBinaryApi
* auditRecordApi
* deviceCredentialsApi
* binariesApi
* userApi
* tenantOptionApi
* systemOptionApi
* tokenApi
* notificationSubscriptionApi


### Microservice security {#microservice-security}

The `@EnableMicroserviceSecurity` annotation sets up the standard security configuration for microservices. It requires basic authorization for all endpoints (except for health check endpoint configured using `@EnableHealthIndicator`). A developer can secure its endpoints using standard Spring security annotations, for example, `@PreAuthorize("hasRole('ROLE_A')")` and user's permissions will be validated against user's roles stored on the platform.

### Microservice subscription {#microservice-subscription}

The microservice subscription module is responsible for two main features:

* Registration
* Tenant subscription event listening

The default behavior for the package is self-registration, which means that after you run the application it will try to register and use the generated credentials for the communication with the platform. The self-registration is required to correctly deploy the microservice on the platform.

The other way to register an application to the platform is to do it manually. This can be done by creating a new application on the platform with the same application name and providing the following properties into the microservice:

```properties
application.name=<application_name>
C8Y.bootstrap.register=false
C8Y.bootstrap.tenant=<tenant>
C8Y.bootstrap.user=<username>
C8Y.bootstrap.password=<password>
```

To create an application and acquire credentials, refer to [Creating applications](/microservice-sdk/rest#creating-application) and [Acquiring microservice credentials](/microservice-sdk/rest#acquiring-microservice-credentials) in the **Using the REST interface** section.

The subscription package provides means to monitor and it acts upon changes in tenant subscriptions to a microservice. To add a custom behavior, a developer can add an event listener for `MicroserviceSubscriptionAddedEvent` and `MicroserviceSubscriptionRemovedEvent` as the following example:

```java
@EventListener
public void onAdded (MicroserviceSubscriptionAddedEvent event {
    log.info("subscription added for tenant: " + event.getCredentials().getTenant());
});
```

On application startup, the `MicroserviceSubscriptionAddedEvent` is triggered for all subscribed tenants.

### Heap and perm/metadata {#heap-and-permmetadata}

To calculate heap and perm/metadata, it takes the limit defined on the [microservice manifest](/microservice-sdk/general-aspects/#microservice-manifest) and it is converted into Megabytes (MB). For Java applications developed using the Java Microservice SDK the minimal value is 178MB. <br>
10% is reserved for "system", but not less than 50 MB. <br>
10% is taken for Metaspace, but not less than 64 MB and not more than 1024MB. <br>
The rest is allocated for heap size.

### Platform API {#platform-api}

The package consists of a number of services that are built and injected into Spring context. A developer can use them to perform basic operations against the platform. The beans are built based on the properties read from a file. For hosted deployment, most of the properties are provided by the platform.

The API provides the following services:

* Alarm - AlarmApi
* AuditRecord - AuditRecordApi
* Operation - DeviceControlApi
* Event - EventApi
* ExternalID - IdentityApi
* Binary - BinariesApi
* ManagedObject - InventoryApi
* Measurement - MeasurementApi

The API provides basic CRUD methods. The following is an alarm interface example:

```java
// Methods
AlarmRepresentation create(final AlarmRepresentation alarm)
Future createAsync(final AlarmRepresentation alarm)

AlarmRepresentation getAlarm(final GId gid)
AlarmCollection getAlarms()
AlarmCollection getAlarmsByFilter(final AlarmFilter filter)

AlarmRepresentation update(final AlarmRepresentation alarm)
```

Sample usage:

```java
@Autowired
private AlarmApi alarms;

public AlarmRepresentation addHelloAlarm (){
    AlarmRepresentation alarm = new AlarmRepresentation();
    alarm.setSeverity("CRITICAL");
    alarm.setStatus("Hello");

    return alarms.create(alarm);
}
```

### Configuration files {#configuration-files}

The *application.properties* file used by the hosted deployment must be located in *src/main/resources/*.

The following properties are used by a microservice:

#### General properties {#general-properties}

| Property                   | Description                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------ |
| application.name           | The name of the microservice application.                                                              |
| C8Y.bootstrap.register     | Indicates if a microservice should follow the self-registration process. True by default.              |
| C8Y.baseURL                | Address of the platform. Provided by the deployment process.                                           |
| C8Y.baseURL.mqtt           | Address of the MQTT service. Provided by the platform.                                                 |
| C8Y.bootstrap.tenant       | The tenant ID, owner of the microservice.                                                              |
| C8Y.bootstrap.user         | Username used by a microservice or by the microservice registration process.                           |
| C8Y.bootstrap.password     | Password used by a microservice or by the microservice registration process.                           |
| C8Y.bootstrap.delay        | Subscription refresh delay (milliseconds).                                                             |
| C8Y.bootstrap.initialDelay | Initial subscription delay (milliseconds).                                                             |
| C8Y.microservice.isolation | Microservice isolation. Only PER_TENANT or MULTI_TENANT values are available. MULTI_TENANT by default. |

#### HTTP client configuration properties {#http-client-configuration-properties}

| Property                         | Description                                                    | Default value |
| -------------------------------- | -------------------------------------------------------------- | ------------- |
| C8Y.httpClient.httpReadTimeout   | HTTP read timeout (milliseconds).                              | 180000        |
| C8Y.httpClient.pool.enabled      | HTTP connection pooling enabled.                               | true          |
| C8Y.httpClient.pool.perHost      | Max connections per host if the connection pooling is enabled. | 50            |
| C8Y.httpClient.pool.max          | Max total connections if the connection pooling is enabled.    | 100           |
| C8Y.httpClient.pool.awaitTimeout | Connection manager timeout (milliseconds).                     | 10000         |

{{< c8y-admon-info >}}
No changes should be made unless the request/connection timeouts or HTTP client related exceptions are being experienced for the requests to the microservice where the network environment is fully understood.
{{< /c8y-admon-info >}}

### Microservice settings {#microservice-settings}

The microservice settings module provides two features:

* Configure a microservice by defining tenant options
* Override existing properties - Tenant options can override default values from properties files

By default the microservice loads the tenant options for the category specified by the microservice context path.
The custom settings category can be specified by the manifest parameter: `settingsCategory`.
When neither settings category nor context path is provided in the microservice manifest, the application name is used.

{{< c8y-admon-info >}}
Once the microservice is deployed it is not possible to change the category during application upgrade.
{{< /c8y-admon-info >}}

Options can be configured for the application owner or the subscriber. The subscriber can override the owner's option value only when such option is defined as editable.

Settings are lazy cached for 10 minutes, so when they were accessed previously, the user must wait the remaining time to see the change being applied.
When the access attempt occurs to fetch settings without the tenant context being specified, the application owner is used to complete the request.

{{< c8y-admon-info >}}
For security reasons, the functionality is not available when running the microservice in legacy mode, that is, local development or RPM installation.
{{< /c8y-admon-info >}}

Tenant option settings can be accessed in two ways:  

Using Environment:

```java
@Autowired
private Environment environment;  

public int getAccessTimeout() {
    return environment.getProperty("access.timeout", Integer.class, 30);
}
```

Using settings service:

```java
@Autowired
private MicroserviceSettingsService settingsService;

public String getAccessTimeout() {
    return settingsService.get("access.timeout");
}
```

Settings can be encrypted by using the *credentials.* prefix for the tenant option key. They will be decrypted and become available within the microservice environment.

Defining tenant options for a microservice with the same key as it was defined in the configuration files, such as *.properties* or the manifest file, will override the particular property.

For instance, there is a property defined in the _application.properties_ file of the microservice hello-world with context path _helloworld_:

```properties
access.timeout=25
```

Now the microservice owner can override it by defining the following setting in the _cumulocity.json_ manifest file:

```json
"settings": [{
    "key": "access.timeout",
    "defaultValue": "35",
    "editable": true
}]
```

Because the `access.timeout` setting is defined as editable, the subscriber can override it by creating an own tenant option via REST API:

```http
POST <URL>/tenant/options

BODY:
  {
    "category": "helloworld",
    "key": "access.timeout",
    "value": "40"
  }
```

{{< c8y-admon-info >}}
You cannot override a property injected by Spring `@Value("${property.name}")`.
{{< /c8y-admon-info >}}

### Logging {#logging}

The standard output should be used for hosted deployments.
For more details on how to use your own log configuration file refer to [Logging](/microservice-sdk/java/#legacy-logging).

### Maven plugin {#maven-plugin}

The package module provides a Maven plugin to prepare a ZIP file required by the microservice deployment. The build requires an executable JAR file. To create one, a developer can use `spring-boot-maven-plugin`. An example with minimum configuration is presented below:

```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <executions>
        <execution>
            <goals>
                <goal>repackage</goal>
            </goals>
        </execution>
    </executions>
    <configuration>
        <mainClass>${main.class}</mainClass>
    </configuration>
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
              <name>hello-world</name>
              <encoding>UTF-8</encoding>
              <rpmSkip>true</rpmSkip>
              <containerSkip>false</containerSkip>
            </configuration>
        </execution>
        <execution>
            <id>microservice-package</id>
            <phase>package</phase>
            <goals>
              <goal>microservice-package</goal>
            </goals>
            <configuration>
              <name>hello-world</name>
              <image>hello-world</image>
              <encoding>UTF-8</encoding>
              <skip>false</skip>
            </configuration>
        </execution>
    </executions>
</plugin>
```

#### Package goal {#package-goal}

The package plugin is responsible for the creation of a Docker container, rpm file and for creating a ZIP file that can be deployed on the platform.
It can be configured with the following parameters:

* name (alias package.name) - defaults to project.artifactId
* description (alias package.description) - defaults to project.description
* jvmArgs (alias agent-package.jvmArgs) - jvm-gc arguments. The default value is `-XX:+UseG1GC -XX:+UseStringDeduplication -XX:MinHeapFreeRatio=25 -XX:MaxHeapFreeRatio=75`. It will be overwritten if other options are provided
* arguments (alias agent-package.arguments) - arguments passed during application startup
* encoding (alias project.build.sourceEncoding) - defaults to UTF-8
* heap (alias agent-package.heap) - defaults to min = 128MB max = 384MB
* perm (alias agent-package.perm) - defaults to min = 64MB max = 128MB
* skip (alias skip.agent.package) - to skip the whole packaging part
* rpmSkip (alias skip.agent.package.rpm) - to skip rpm file creation. False by default
* containerSkip (alias skip.agent.package.container) - to skip Docker image creation. True by default
* manifestFile - points to a manifest file location. Default value: $<basedir>/src/main/configuration/cumulocity.json
* dockerBuildTimeout - specifies the timeout in seconds for the docker image build. Defaults to 360s

Example configuration:

```xml
<configuration>
    <name>hello-world</name>
    <encoding>UTF-8</encoding>
    <rpmSkip>true</rpmSkip>
    <containerSkip>false</containerSkip>
    <manifestFile>${basedir}/src/main/microservice/cumulocity.json</manifestFile>
</configuration>
```

#### Push goal {#push-goal}

The push plugin is responsible for pushing the Docker image to a registry. The registry can be configured by:

* containerSkip (alias skip.agent.package.container) - Prevents the push to execute. True by default
* registry (alias agent-package.container.registry) - Docker registry address

Example configuration:

```xml
<configuration>
    <registry>http://{yourregistry.com}</registry>
    <containerSkip>false</containerSkip>
</configuration>
```

#### Upload goal {#upload-goal}

The upload goal is responsible for deploying the microservice to a server.
There are three options to configure the server URL and credentials:

* _settings.xml_ - Maven global configuration placed at *~/.m2/settings.xml*
* _pom.xml_ - Maven project configuration file
* Command line

All three ways can be used together, for example, a goal partially can be configured in the _settings.xml_ and partially in the _pom.xml_.
In case of conflicts, the command line configuration has the highest priority and _settings.xml_ configuration the lowest.

To upload a microservice to the server you must configure the following properties:

* url - Mandatory URL that will be used for deployment. Empty by default.
* username - Mandatory tenant ID and username used for authorization. Empty by default.
* password - Mandatory password used for authorization. Empty by default.
* name - Optional name of the uploaded application. By default it is the same as `package.name` property or `artifactId` if `package.name` is not provided.
* skipMicroserviceUpload (alias `skip.microservice.upload`) - Controls if the microservice upload should be skipped. True by default so for the goal to work it must be set to `false`)

#### settings.xml {#settingsxml}

To configure the goal in the _settings.xml_ file, add the server configuration as follows:

```xml
<server>
    <id>microservice</id>
    <username>demos/username</username>
    <password>******</password>
    <configuration>
        <url>https://demos.cumulocity.com</url>
    </configuration>
</server>
```

#### pom.xml {#pomxml}

To configure the plugin in the _pom.xml_ file, add the server configuration as follows:

```xml
<plugin>
    <groupId>com.nsn.cumulocity.clients-java</groupId>
    <artifactId>microservice-package-maven-plugin</artifactId>
    <configuration>
        <application>
            <name>helloworld</name>
        </application>

        <!-- please note that the credentials are optional if they are already configured in settings.xml -->
        <credentials>
            <url>https://demos.cumulocity.com</url>
            <username>demos/username</username>
            <password>******</password>
        </credentials>

        <skipMicroserviceUpload>false</skipMicroserviceUpload>
    </configuration>
</plugin>
```

#### Command line {#command-line}

To pass the configuration only to the particular build, execute the following command:

```shell
$ mvn microservice:upload -Dupload.application.name=helloworld -Dupload.url=https://demos.cumulocity.com -Dupload.username=demos/username -Dupload.password=****** -Dskip.microservice.upload=false
```


### Deployment {#deployment}

#### Hosted deployment {#hosted-deployment}

{{< c8y-admon-info >}}
For your convenience, {{< product-c8y-iot >}} provides a [Microservice utility tool](/microservice-sdk/general-aspects/#microservice-utility-tool) for easy packaging, deployment and subscription.
{{< /c8y-admon-info >}}

To deploy an application on an environment you need the following:

* URL address of your tenant
* Authorization header as "Basic <Base64(<username>:<password>)>"
* Tenant - tenant ID
* ZIP build from previous steps


##### Step 1 - Create the application {#step-1---create-the-application}

If the application does not exist, create a new application on the platform:

```http
POST /application/applications
Host: ...
Authorization: Basic xxxxxxxxxxxxxxxxxxx
Content-Type: "application/json"

BODY:
  {
		"name": "<APPLICATION_NAME>",
		"type": "MICROSERVICE",
		"key": "<APPLICATION_NAME>-microservice-key"
  }
```

Example:

```shell
$ curl -X POST -s \
      -d '{"name":"hello-microservice-1","type":"MICROSERVICE","key":"hello-microservice-1-key"}' \
      -H "Authorization: <AUTHORIZATION>" \
      -H "Content-type: application/json" \
      "<URL>/application/applications"
```

If the application has been created correctly, you can GET the application ID:

```http
GET /application/applicationsByName/<APPLICATION_NAME>
Host: ...
Authorization: Basic xxxxxxxxxxxxxxxxxxx
Accept: "application/json"
```

Example:

```shell
$ curl -H "Authorization:<AUTHORIZATION>" \
     <URL>/application/applicationsByName/hello-world
```

##### Step 2 - Upload the ZIP file {#step-2---upload-the-zip-file}

```http
POST /application/applications/<APPLICATION_ID>/binaries
Host: ...
Authorization: Basic xxxxxxxxxxxxxxxxxxx
Content-Type: "multipart/form-data"
```

Example:

```shell
$ curl -F "data=@<PATH_TO_ZIP>" \
	     -H "Authorization: <AUTHORIZATION>" \
	     "<URL>/application/applications/<APPLICATION_ID>/binaries"
```

##### Step 3 - Subscribe to the microservice {#step-3---subscribe-to-the-microservice}

```http
POST /tenant/tenants/<TENANT_ID>/applications
Host: ...
Authorization: Basic xxxxxxxxxxxxxxxxxxx
Content-Type: "multipart/form-data"

BODY:
  {
    "application": {
        "id": "<APPLICATION_ID>"
    }
  }
```

Example:

```shell
$ curl -X POST -d '{"application":{"id": "<APPLICATION_ID>"}}'  \
       -H "Authorization: <AUTHORIZATION>" \
       -H "Content-type: application/json" \
       "<URL>/tenant/tenants/<TENANT_ID>/applications"
```

#### Local Docker deployment {#local-docker-deployment}

To deploy the application on a local Docker container, one must inject the environment variables into a container. This is done with the Docker `run -e` command. The full description of available parameters is available in [Environment variables](/microservice-sdk/general-aspects/#environment-variables).

An example execution could be:

```shell
$ docker run -e "C8Y_BASEURL=<C8Y_BASEURL>" -e "C8Y_BASEURL_MQTT=<C8Y_BASEURL_MQTT>" <IMAGE_NAME>
```

### Monitoring {#monitoring}

The microservice's health endpoint can be checked to verify if a hosted microservice is running successfully.
This endpoint is enabled by default for all microservices that are developed using the Java Microservice SDK.

```http
GET <URL>/service/<APPLICATION_NAME>/health
```

Example response when the microservice is functional:

```json
HTTP/1.1 200
{
  "status": "UP"
}
```

or in case it is not working:

```json
HTTP/1.1 503
{
  "status": "DOWN"
}
```

### Legacy Deployment {#legacy-deployment}

#### Properties {#properties}

For external/legacy deployment, the following paths will be searched in order to find a properties file specific for the environment the application is run on:

* {UPPERCASE(application_name)}_CONF_DIR/.{application_name}
* {UPPERCASE(application_name)}_CONF_DIR/{application_name}
* {user/home}/.{application_name}
* {user/home}/{application_name}
* {CONF_DIR}/.{application_name}
* {CONF_DIR}/{application_name}
* /etc/{application_name}

#### Logging {#legacy-logging}

##### Add your own log configuration file

* To customize the logging configuration for your microservice instead of using the default configuration, create a log
configuration file in the _configuration_ folder of your microservice project.
* The file must adhere to the naming convention *\<application-name\>-logging.xml*. 
This ensures that your custom log configuration replaces the default configuration file 
with the same name in the resulting Docker image.
* Once deployed, the customized log configuration file will be located in the */etc/\<artifactId\>*
directory within the microservice pod.

##### Locations to be searched for log configuration file

For external/legacy deployments, logging into the application implies using [Spring Logging](https://docs.spring.io/spring-boot/docs/current/reference/html/howto-logging.html).
The following locations are searched for the logback configuration file:

* {UPPERCASE(application_name)}_CONF_DIR/.{application_name}/*-logging.xml
* {UPPERCASE(application_name)}_CONF_DIR/{application_name}/*-logging.xml
* {user/home}/.{application_name}/*-logging.xml
* {user/home}/{application_name}/*-logging.xml
* {CONF_DIR}/.{application_name}/*-logging.xml
* {CONF_DIR}/{application_name}/*-logging.xml
* /etc/{application_name}/*-logging.xml

### Upgrade to Microservice SDK 10.13+ {#upgrade-to-microservice-sdk-1013}

A Spring Boot library was upgraded to 2.5.8, hence upgrading Microservice SDK to 10.13+ may require some additional development.

* The `content(matcher)` method of RestAssured has been replaced with `body(matcher)`, see [RequestSpecification#content()](https://javadoc.io/doc/io.rest-assured/rest-assured/3.0.0/io/restassured/specification/RequestSpecification.html#content-byte:A-)
* Spring Boot BOM does not define a version for joda-time, you may need to explicitly define version.

  Maven example:
    ```
    <dependency>
      <groupId>joda-time</groupId>
      <artifactId>joda-time</artifactId>
      <version>2.10.10</version>
    </dependency>
    ```
* Jackson 2.12.x does not provide the Joda Module by default, it might be required to add `jackson-datatype-joda` dependency and define Joda Module:
  `new ObjectMapper().addModule(new JodaModule());` in a custom Microservice code.
* Spring Boot 2.5.8 does not provide the _Bean Validation 2.0_ provider  as a transitive dependency anymore. Developers may have to explicitly define a validation provider, for example `hibernate-validator`, or add the `spring-boot-starter-validation` dependency.

  Maven example:
     ```
     <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-validation</artifactId>
     </dependency>
    ```
* `junit-vintage-engine` was removed from the `spring-boot-starter-test` dependency, if you still use JUnit 4.x you must add the Vintage engine explicitly:
     ```
     <dependency>
       <groupId>org.junit.vintage</groupId>
       <artifactId>junit-vintage-engine</artifactId>
       <scope>test</scope>
     </dependency>
     ```

* The `message` field and binding errors are disabled by default for Spring Boot native error responses. This can be enabled by overriding the `microservice_error_attributes.properties` file.

  Sample content:
   ```
   server.error.include-message=ALWAYS
   server.error.include-binding-errors=ALWAYS
   ```
### Upgrade to Microservice SDK 10.17+ {#upgrade-to-microservice-sdk-1017}

A Spring Boot library was upgraded to 2.7.6, hence upgrading Microservice SDK to 10.17+ may require some additional development.

There was a change in the internal microservice security configuration following
the deprecation of `WebSecurityConfigurerAdapter` by Spring Security. The Microservice SDK now uses a direct
declaration of the `SecurityFilterChain` bean in its internal configuration instead. At the same time, Spring Security
only allows one of these configuration approaches in a single application. This means that if the old,
adapter-based method has been used in your code before, you will have to migrate to the new, direct filters
declaration for applications to start. Refer to the [Spring Security documentation](https://docs.spring.io/spring-security/reference/5.8/migration/servlet/config.html#_stop_using_websecurityconfigureradapter) for more details.
