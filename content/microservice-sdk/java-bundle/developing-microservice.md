---
weight: 40
title: Developing microservices
layout: redirect

---

The {{< product-c8y-iot >}} Microservice SDK is an open source toolkit for building microservices using the popular [Spring Boot](https://spring.io/projects/spring-boot) framework and the {{< product-c8y-iot >}} [platform APIs](https://{{< domain-c8y >}}/api/core). It accelerates development by offering preconfigured annotations, built-in services, and a Maven plugin for creating Docker containers and {{< product-c8y-iot >}} applications. The SDK source code is available on GitHub in the
[cumulocity-clients-java](https://github.com/Cumulocity-IoT/cumulocity-clients-java) repository.

In this section, you will learn how to:
* Use SDK annotations to simplify the setup.
* Access platform APIs via dependency injection.
* Authenticate towards the platform APIs.
* Secure access to your microservice APIs.
* Handle subscriptions and multi-tenant access.
* Configure your microservice.
* Upload and run your microservice.
* Manage and monitor your microservice.
* Set up external or legacy deployments.

### Using annotations {#annotations}

As shown in the ["Hello world" tutorial](/microservice-sdk/java/#create-a-java-application), the easiest way to enable default microservice behavior is to annotate your main class with `@MicroserviceApplication`. This composite annotation includes:

| Annotation                             | Description                                                                                      |
| -------------------------------------- | ------------------------------------------------------------------------------------------------ |
| @SpringBootApplication                 | Enables Spring Boot’s auto-configuration                                                         |
| @EnableContextSupport                  | Allows use of @UserScope and @TenantScope for method-level context switching                     |
| @EnableHealthIndicator                 | Exposes a standard health endpoint for platform monitoring                                       |
| @EnableMicroserviceSecurity            | Enables security by verifying users and roles against the platform                               |
| @EnableMicroserviceSubscription        | Manages subscriptions, metadata updates, and listens to tenant subscription changes              |
| @EnableMicroservicePlatformInternalApi | Injects platform API services into the Spring context                                            |
| @EnableTenantOptionSettings            | Allows configuration through tenant options and supports overriding default properties via files |

### Accessing platform APIs {#acessing-platform-api}

The {{< product-c8y-iot >}} Microservice SDK includes a set of Java APIs that are automatically injected into the Spring context and allow you to operate the REST APIs from Java in a simple manner. The REST APIs correspond to Java APIs as follows:

* Alarm - AlarmApi
* AuditRecord - AuditRecordApi
* Operation - DeviceControlApi
* Event - EventApi
* EventBinary - EventBinaryApi
* ExternalID - IdentityApi
* Binary - BinariesApi
* ManagedObject - InventoryApi
* Measurement - MeasurementApi
* DeviceCredentials - DeviceCredentialsApi
* User - UserApi
* TenantOption - TenantOptionApi
* SystemOption - SystemOptionApi
* Token - TokenApi
* Notification - NotificationSubscriptionApi

Each API supports standard "CRUD" operations (create, read, update, delete). For example, the `AlarmApi` interface provides:

```java
// Create
AlarmRepresentation create(AlarmRepresentation alarm) throws SDKException;
Future createAsync(AlarmRepresentation alarm) throws SDKException;
// Read
AlarmRepresentation getAlarm(GId gid) throws SDKException;
AlarmCollection getAlarms() throws SDKException;
AlarmCollection getAlarmsByFilter(AlarmFilter filter) throws SDKException;
// Update
AlarmRepresentation updateAlarm(AlarmRepresentation alarm) throws SDKException;
// Delete
void deleteAlarmsByFilter(AlarmFilter filter) throws IllegalArgumentException, SDKException;
```

This is an example of retrieving all devices registered in all subscribed tenants:

```java
@Autowired
MicroserviceSubscriptionsService subscriptionsService;

@Autowired
InventoryApi inventoryApi;

public List<ManagedObjectRepresentation> getAllDevicesTenants() {
  List<ManagedObjectRepresentation> managedObjectsList = new ArrayList<>();
  InventoryFilter filter = new InventoryFilter().byFragmentType(IsDevice.class);
  subscriptionsService.runForEachTenant( () -> {
    inventoryApi.getManagedObjectsByFilter(filter).get().allPages().forEach(mor -> {
      managedObjectsList.add(mor);
    });
  });
  return managedObjectsList;
}
```

More details on using the APIs are available in the [Client library](/microservice-sdk/java/#client-library) section.

### Authenticating and authorizing towards the platform {#authenticating-and-authorizing-towards-the-platform}

API requests in {{< product-c8y-iot >}} microservices can run in two authentication scopes:
 * Tenant scope – uses the service user's credentials.
 * User scope – uses the credentials of the authenticated user who triggered the request.

Each microservice has a service user whose roles are defined in the `cumulocity.json` manifest. 

**API requests must be executed in one of these contexts: tenant scope or user scope**.

To execute API requests in the tenant scope in any thread of the application, the `MicroserviceSubscriptionsService` can be used to wrap the request like in the next example:

```java
@Autowired
MicroserviceSubscriptionsService subscriptionsService;

@Autowired
private EventApi eventApi;

public List<EventRepresentation> getAllEvents() {
  List<EventRepresentation> eventsList = new ArrayList<>();
  subscriptionsService.runForEachTenant( () -> {
    eventApi.getEvents().get().getEvents().forEach(event -> {
      eventsList.add(event);
    });
  });
  return eventsList;
}
```

Tenant scope is the default context in:
* Classes annotated with `@RestController`
* Methods annotated with `@EventListener`

In these cases, the `MicroserviceSubscriptionsService` is not needed.
The API service beans like `eventApi` or `inventoryApi` are executed in the tenant scope by default:

#### @EventListener annotation and scope

Example for `@EventListener` annotation and tenant scope:

```java
@Autowired
InventoryApi tenantInventoryApi;

@EventListener
public void initialize(MicroserviceSubscriptionAddedEvent event) {
   String tenant = event.getCredentials().getTenant();
   log.info("Tenant {} - Microservice subscribed", tenant);
   tenantInventoryApi.getManagedObjects().get().allPages();
}
```

#### @RestController annotation and scope

The next examples show the execution of API calls in tenant scope and user scope for @RestController classes.

Example of an API request in the tenant scope:

```java
@RestController
@RequestMapping("/devices")
public class DeviceController {
    
    @Autowired
    InventoryApi inventoryApi;

    @GetMapping(path = "/devicesTenantScope", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ManagedObjectRepresentation>> getAllDevicesTenantScope() {
        List<ManagedObjectRepresentation> managedObjectsList = new ArrayList<>();
        InventoryFilter filter = new InventoryFilter().byFragmentType(IsDevice.class);
        inventoryApi.getManagedObjectsByFilter(filter).get().allPages().forEach(mor -> {
            managedObjectsList.add(mor);
        });
        return new ResponseEntity<>(managedObjectsList, HttpStatus.OK);
    }
  
}
```

To execute an API request in the user scope, the API service bean must be injected with a qualifier annotation like `@Qualifier("userInventoryApi")`:

```java
@RestController
@RequestMapping("/devices")
public class DeviceController {

    @Autowired
    @Qualifier("userInventoryApi")
    InventoryApi userInventoryApi;

    @GetMapping(path = "/devicesUserScope", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ManagedObjectRepresentation>> getAllDevicesUserScope() {
      List<ManagedObjectRepresentation> managedObjectsList = new ArrayList<>();
      InventoryFilter filter = new InventoryFilter().byFragmentType(IsDevice.class);
      userInventoryApi.getManagedObjectsByFilter(filter).get().allPages().forEach(mor -> {
        managedObjectsList.add(mor);
      });
      return new ResponseEntity<>(managedObjectsList, HttpStatus.OK);
    }
  
}
```

#### API service beans

The Microservice SDK provides both tenant-scope and user-scope beans with the following names:

| Bean names in tenant scope                                     | Qualifier for user scope        |
| -------------------------------------------------------------- | ------------------------------- |
| inventoryApi, tenantInventoryApi                               | userInventoryApi                |
| identityApi, tenantIdentityApi                                 | userIdentityApi                 |
| measurementApi, tenantMeasurementApi                           | userMeasurementApi              |
| deviceControlApi, tenantDeviceControlApi                       | userDeviceControlApi            |
| alarmApi, tenantAlarmApi                                       | userAlarmApi                    |
| eventApi, tenantEventApi                                       | userEventApi                    |
| eventBinaryApi, tenantEventBinaryApi                           | userEventBinaryApi              |
| auditRecordApi, tenantAuditRecordApi                           | userAuditRecordApi              |
| deviceCredentialsApi, tenantDeviceCredentialsApi               | userDeviceCredentialsApi        |
| binariesApi, tenantBinariesApi                                 | userBinariesApi                 |
| userApi, tenantUserApi                                         | userUserApi                     |
| tenantOptionApi, tenantTenantOptionApi                         | userTenantOptionApi             |
| systemOptionApi, tenantSystemOptionApi                         | userSystemOptionApi             |
| tokenApi, tenantTokenApi                                       | userTokenApi                    |
| notificationSubscriptionApi, tenantNotificationSubscriptionApi | userNotificationSubscriptionApi |

Various examples demonstrating use cases of the platform API can be found in the GitHub repositories
[Cumulocity microservice templates](https://github.com/Cumulocity-IoT/cumulocity-microservice-templates) and
[Cumulocity examples](https://github.com/Cumulocity-IoT/cumulocity-examples).

### Securing your microservice {#microservice-security}

The `@EnableMicroserviceSecurity` annotation sets up the standard security configuration for microservices.
It enforces basic authentication or other standard authentication mechanisms (refer to [Authentication and authorization](/microservice-sdk/general-aspects/#authentication-and-authorization))
for all endpoints -- except for the health check endpoint configured via `@EnableHealthIndicator`.

You can configure security for your endpoints using standard Spring Security annotations. For example, you can restrict access based on platform roles using `@PreAuthorize("hasRole('ROLE_A')")`.

### Microservice subscription {#microservice-subscription}

The microservice subscription module handles two core functions:

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

To create an application and acquire credentials, refer to [Creating applications](/microservice-sdk/rest/#creating-applications) and [Acquiring microservice credentials](/microservice-sdk/rest#acquiring-microservice-credentials) in the **Using the REST interface** section.

The subscription package provides means to monitor and it acts upon changes in tenant subscriptions to a microservice. To add a custom behavior, a developer can add an event listener for `MicroserviceSubscriptionAddedEvent` and `MicroserviceSubscriptionRemovedEvent` as the following example:

```java
@EventListener
public void onAdded (MicroserviceSubscriptionAddedEvent event {
    log.info("subscription added for tenant: " + event.getCredentials().getTenant());
});
```

On application startup, the `MicroserviceSubscriptionAddedEvent` is triggered for all subscribed tenants.

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
Note that the defined tenant option category must be unique within the tenant.
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
<project>
  ...
  <build>
    ...
    <plugins>
    ...
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
                    <goal>package</goal>
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
      ...
    </plugins>
    ...
  </build>
  ...
</project>
```

#### Package goal {#package-goal}

The package plugin is responsible for the creation of a Docker container, RPM file and for creating a ZIP file that can be deployed on the platform.
It can be configured with the following parameters:  
(If a single xml tag is specified as parameter in the following list, use embracing xml tags like \<tag>...\</tag> to set those parameters. "..." must be replaced by the respective value of the corresponding data type.)

| Parameter<br>short form<br>for pom.xml entries<br> in \<configuration> section |                                      Data type                                       |                                               Parmameter<br>command<br>line name                                                |                                             Default value                                              | Description                                                                                                                                                                                                                                    |
|:------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|                                  \<arguments>                                  |                                    List\<String>                                     |                                            &#8209;Dagent-package.arguments=[...,]...                                            |                                                   ""                                                   | General command line arguments for jar startup.<br>Specify with "," separated arguments.                                                                                                                                                       |
|                                \<containerSkip>                                |                                       Boolean                                        |                                            &#8209;Dskip.agent.package.container=...                                             |                                                 false                                                  | Skip the container packaging                                                                                                                                                                                                                   |
|                                 \<description>                                 |                                        String                                        |                                                 &#8209;Dpackage.description=...                                                 |                                         ${project.description}                                         | Microservice description                                                                                                                                                                                                                       |
|                             \<dockerBuildTimeout>                              |                                         Int                                          |                                       &#8209;Dmicroservice.package.dockerBuildTimeout=...                                       |                                                  360                                                   | Timeout value in seconds for the generation of a docker build                                                                                                                                                                                  |
|                                  \<encoding>                                   |                                        String                                        |                                            &#8209;Dproject.build.sourceEncoding=...                                             |                                                 UTF-8                                                  | Define String encoding                                                                                                                                                                                                                         |
|           \<heap><br>\<min>...\</min><br>\<max>...\<max><br>\</heap>           | min, max : \<Int>m<br>(m:megabytes; for available units refer to Java documentation) | &#8209;&#8209;<br>[(Setting complex<br>command line parameter)](/microservice-sdk/java/#package-goal-command-line-complex-data) |                                        min = 128m<br>max = 384m                                        | \<heap> parameter results to &#8209;Xms\<min> &#8209;Xmx\<max> Java runtime arguments for the microservice startup.                                                                                                                                        |
|                                   \<jvmArgs>                                   |                                    List\<String>                                     |                                             &#8209;Dagent-package.jvmArgs=[...,]...                                             | "&#8209;XX:+UseG1GC<br>&#8209;XX:+UseStringDeduplication<br>&#8209;XX:MinHeapFreeRatio=25<br>&#8209;XX:MaxHeapFreeRatio=75" | Java runtime arguments for the microservice startup. Specify with "," separated arguments. Default values will be overwritten if other options are provided.                                                                                   |
|                                \<manifestFile>                                 |                                        String                                        |                                                    &#8209;DmanifestFile=...                                                     |                        "$\{basedir}/src/main/<br>configuration/cumulocity.json"                        | Path to the microservice manifest file location                                                                                                                                                                                                |
|      \<metaspace><br>\<min>...\</min><br>\<max>...\<max><br>\</metaspace>      |       min, max : \<Int>m<br>(m:megabytes; for available units refer to Java documentation)        |  &#8209;&#8209;<br>[(Setting complex<br>command line parameter)](/microservice-sdk/java/#package-goal-command-line-complex-data)   |                                        min = 64m<br>max = 128m                                         | \<metaspace> parameter is combined<br>with \<perm> parameter values if available which results in &#8209;XX:MetaspaceSize=\<min> &#8209;XX:MaxMetaspaceSize=\<max> Java runtime arguments for the microservice startup.                        |
|                                    \<name>                                     |                                        String                                        |                                                    &#8209;Dpackage.name=...                                                     |                                         ${project.artifactId}                                          | Microservice name                                                                                                                                                                                                                              |
|           \<perm><br>\<min>...\</min><br>\<max>...\<max><br>\</perm>           |       min, max : \<Int>m<br>(m:megabytes; for available units refer to Java documentation)        |  &#8209;&#8209;<br>[(Setting complex<br>command line parameter)](/microservice-sdk/java/#package-goal-command-line-complex-data)   |                                        min = 64m<br>max = 128m                                         | \<perm> parameter is combined with \<metaspace> parameter values for compatibility reasons if available which results in &#8209;XX:MetaspaceSize=\<min> &#8209;XX:MaxMetaspaceSize=\<max> Java runtime arguments for the microservice startup. |
|                                   \<rpmSkip>                                   |                                       Boolean                                        |                                               &#8209;Dskip.agent.package.rpm=...                                                |                                                  true                                                  | Skip the rpm packaging                                                                                                                                                                                                                         |
|                                    \<skip>                                     |                                       Boolean                                        |                                                 &#8209;Dskip.agent.package=...                                                  |                                                 false                                                  | Skip the whole packaging                                                                                                                                                                                                                       |


Example configuration in pom.xml:

```xml
...
<plugin>
  <groupId>com.nsn.cumulocity.clients-java</groupId>
  <artifactId>microservice-package-maven-plugin</artifactId>
  <version>${c8y.version}</version>
  <executions>
    <execution>
      <configuration>
        <name>hello-world</name>
        <encoding>UTF-8</encoding>
        <rpmSkip>true</rpmSkip>
        <containerSkip>false</containerSkip>
        <manifestFile>${basedir}/src/main/microservice/cumulocity.json</manifestFile>
        <heap>
          <min>200m</min>
          <max>600m</max>
        </heap>
        <metaspace>
          <min>200m</min>
          <max>300m</max>
        </metaspace>
      </configuration>
    </execution>
  </executions>
</plugin>
...
```
{{< c8y-admon-info >}}
Settings for heap and metaspace must be aligned with your settings of `resources/memory` in the microservice manifest
file `cumulocity.json`. You have to be sure about the effect those parameters might have. Those parameters are directly
used for the microservice start without further verification. For example be sure that the heap values meet the
condition: Xms < Xmx.
{{< /c8y-admon-info >}}

##### Setting parameters on command line {#package-goal-command-line}

For information about how and whether it is possible to set parameters on command line refer to column
"Parameter command line name" of table in chapter [Package goal](/microservice-sdk/java/#package-goal).

###### Primitive configuration values {#package-goal-command-line-primitive-data}

Primitive configuration values or lists can be set on the Maven command line directly as usual for Maven command line
properties. Items of lists are specified with `,` as separation character.<br>
<br>
Example:
```sh
-Dskip.agent.package.rpm=true
-Dagent-package.arguments=XX:+PrintCommandLineFlags,-XX:+UseCompressedClassPointers,-XX:+UseCompressedOops
```

###### Complex data types as for heap and metaspace parameter {#package-goal-command-line-complex-data}

Properties must be used if you want to specify data of complex data types on the command line. This is the case for
memory data like heap and metaspace. In this case you have to specify each primitive value separately as pom property
which is then used inside the configuration of the microservice-package-maven-plugin.

Example for the definition of primitive default parameters in pom.xml:
```xml
<project ... >
  ...
  <properties>
    ...
    <custom-property.metaspace.min>200m</custom-property.metaspace.min>
    <custom-property.metaspace.max>300m</custom-property.metaspace.max>
    ...
  </properties>
  ...
</project>
```
These properties can be used inside the configuration section of the microservice-package-maven-plugin 
defined in the pom.xml file of your microservice project:

```xml
<project ... >
  ...
  <build>
    ...
    <plugins>
      ...
      <plugin>
        <groupId>com.nsn.cumulocity.clients-java</groupId>
        <artifactId>microservice-package-maven-plugin</artifactId>
        <version>…</version>
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
              ...
              <metaspace>
                <min>${custom-property.metaspace.min}</min>
                <max>${custom-property.metaspace.max}</max>
              </metaspace>
              ...
            </configuration>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
</project>
```

If you have defined the custom properties in your pom.xml file you can specify those parameters on command line:
```
mvn clean install -Dcustom-property.metaspace.min=400m -Dcustom-property.metaspace.max=500m
```

#### Validate REST security goal {#validate-rest-security-goal}

The validate REST security goal scans compiled classes to ensure all REST controller endpoints have proper security annotations. This provides build-time verification that your microservice endpoints are adequately secured.

The goal verifies that all REST endpoints are either secured with one of the recognized security annotations or explicitly marked as unsecured.

##### Configuring the goal

Add the following to your microservice *pom.xml* file:

```xml
<plugin>
    <groupId>com.nsn.cumulocity.clients-java</groupId>
    <artifactId>microservice-package-maven-plugin</artifactId>
    <version>...</version>
    <executions>
        <execution>
            <id>validate-rest-security</id>
            <goals>
                <goal>validate-rest-security</goal>
            </goals>
            <phase>prepare-package</phase>
            <configuration>
                <enabled>true</enabled>
                <failOnError>true</failOnError>
            </configuration>
        </execution>
    </executions>
</plugin>
```

##### Configuration parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| enabled | false | Enable the validation. Must be set to `true` to activate. |
| failOnError | true | Fail the build if unsecured endpoints are found. Set to `false` to log warnings only. |

##### Securing your endpoints

All endpoints in your @RestController classes must be either secured or explicitly marked as unsecured.

**Securing an endpoint with role-based access:**

```java
@RestController
@RequestMapping("/api")
public class UserController {
    
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.findAll();
    }
}
```

**Marking an endpoint as explicitly unsecured:**

```java
@RestController
@RequestMapping("/api")
public class HealthController {
    
    @UnauthorizedEndpoint("Public health check endpoint")
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("OK");
    }
}
```

The validator recognizes the following security annotations:

* `@org.springframework.security.access.prepost.PreAuthorize`
* `@org.springframework.security.access.annotation.Secured`
* `@jakarta.annotation.security.RolesAllowed`
* `@javax.annotation.security.RolesAllowed`

Use the `@UnauthorizedEndpoint` annotation from the `com.cumulocity.microservice.security.annotation` package to mark endpoints that intentionally do not require authentication. The annotation accepts an optional parameter to document why the endpoint is unsecured.

##### Example build output

When validation succeeds, you see a message similar to:

```
[INFO] Starting REST endpoint security validation...
[INFO] Found 5 REST controller classes
[INFO] ✓ All REST endpoints are properly secured!
```

When validation fails with unsecured endpoints, the build stops with error messages:

```
[ERROR] Found 2 unsecured REST endpoints:
[ERROR]   - REST endpoint not secured: com.example.UserController.deleteAll.
[ERROR]     Must be annotated with @PreAuthorize, @Secured, @RolesAllowed, or @UnauthorizedEndpoint.
[ERROR]   - REST endpoint not secured: com.example.ConfigController.reset.
[ERROR]     Must be annotated with @PreAuthorize, @Secured, @RolesAllowed, or @UnauthorizedEndpoint.
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


#### Using Maven in debug mode {#using-maven-in-debug-mode}

Running Maven CLI commands in debug mode (for example, `mvn clean install --debug ...`) may
generate a very large volume of HTTP-related log output, such as logs from resource downloads. 
Analyzing this data might quickly become tedious.

To reduce such logging information, HTTP logging can be suppressed with these command line options:
```
-Dorg.slf4j.simpleLogger.log.org.apache.http=off
-Dorg.slf4j.simpleLogger.log.org.apache.http.wire=off
```
Besides `off`, `error` or `warn` might also be appropriate values. The parameters can also be added to the Maven configuration file `${MAVEN_HOME}/conf/logging/simplelogger.properties` 
or to the `MAVEN_OPTS` environment variable. Related documentation can be found in [Maven logging](https://maven.apache.org/maven-logging.html).


### Heap and perm/metadata {#heap-and-permmetadata}

To calculate heap and perm/metadata, it takes the limit defined in the [microservice manifest](/microservice-sdk/general-aspects/#microservice-manifest) (`resources/memory`) and it is converted into Megabytes (MB). For Java applications developed using the Java Microservice SDK the minimal value is 178MB. <br>
10% is reserved for "system", but not less than 50 MB. <br>
10% is taken for metaspace, but not less than 64 MB and not more than 1024MB. <br>
The rest is allocated for heap size.<br>
Refer to [Package goal](/microservice-sdk/java/#package-goal) for information on how to change the heap and metaspace settings.

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
$ docker run -e "C8Y_BASEURL=<C8Y_BASEURL>" -e "C8Y_BASEURL_MQTT=<C8Y_BASEURL_MQTT>" -e "C8Y_BASEURL_PULSAR=<C8Y_BASEURL_PULSAR>" <IMAGE_NAME>
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
declaration for applications to start. Refer to the [Spring Security release notes](https://github.com/spring-projects/spring-security/releases/tag/5.8.0) for more details.

