---
weight: 20
title: Gateway configuration and registration
layout: redirect
---

YAML file and spring profiles are used for the configuration of the gateway. A default configuration file is embedded in the gateway JAR file, so you only must set the properties which are different from the default.

{{< c8y-admon-important >}}
When editing the YAML file, make sure to provide valid indentations.
{{< /c8y-admon-important >}}

To run the gateway locally, the default settings should be overridden in a customized profile. To use the customized profile, create a YAML file which must follow the naming convention:

    application-<<Profile_name>>.yaml

For example, to connect to a tenant, first a profile named *application-myTenant.yaml* will be created. The following properties will be added to the file:

```yaml
C8Y:
    baseUrl: https://<<yourTenant>>.{{< domain-c8y >}}
gateway:
    bootstrap:
        tenantId: <<yourTenantId>>
    identifier: Gateway_Device
    name: Gateway_Device
    db:
# The gateway uses the local database to store platform credentials and local cache. This parameter shows the location in which the local data should be stored.
        baseDir: C:/Users/<<userName>>/.opcua/data
```

{{< c8y-admon-info >}}
Windows OS is used for the example.
{{< /c8y-admon-info >}}

### Thin Edge {#thin-edge}

The OPC UA gateway can also be registered and operated via [thin-edge.io](https://thin-edge.io/). In contrast to the standalone mode, `thinEdge` configurations must be added to the YAML file:

```yaml
C8Y:
    baseUrl: https://<<yourTenant>>.{{< domain-c8y >}}
gateway:
    bootstrap:
        tenantId: <<yourTenantId>>
    identifier: Gateway_Device
    name: Gateway_Device
    db:
# The gateway uses the local database to store platform credentials and local cache. This parameter shows the location in which the local data should be stored.
        baseDir: C:/Users/<<userName>>/.opcua/data
    thinEdge:
        enabled: true
        mqttServerURL: tcp://<<thinEdge MQTT broker>>
        deviceId: Thin-Edge_Device
```

With the configuration `gateway.thinEdge.enabled: true` you switch to the thinEdge mode. This means that the authentication and registration to the platform will be done via Thin Edge. The OPC UA gateway is automatically registered and created as a sub-device under the Thin Edge device. `gateway.thinEdge.mqttServerURL` and `gateway.thinEdge.deviceId` are the connection information for the MQTT client to connect to the local Thin Edge MQTT broker.

### Configuration profile location on the filesystem {#configuration-profile-location-on-the-filesystem}

The configuration profile can be stored either in the *same directory as the JAR file* or in a *default configuration directory*.
Depending on the operating system, the following default configuration directories can be used:

```
Windows OS
    /C:/opcua/
Linux OS
    /etc/opcua/
    /etc/opcua/data
Mac OS
    /opt/opcua/
    /opt/opcua/data
```

The number of profiles you may have is not limited. To use a specific profile on runtime, the "--spring.profiles.active" JVM argument must be passed when running the gateway JAR file. For example, let's use the previously created profile. Start a terminal and use the following command:

```shell
java -jar opcua-device-gateway-<<version>>.jar --spring.profiles.active=default,myTenant
```

The command above will start a gateway with the default profile and it will override the default properties with the properties defined in the "myTenant" profile. The list of profiles must be provided as an ordered, comma-separated list. The default profile must always be the first profile in the list.

**Optional**: To specify your own configuration, Spring arguments can be used in your terminal to run the gateway JAR file. Multiple locations must be comma-separated. The configuration locations should be either YAML files or directories. In case of directories, they must end with "/". For example:

```shell
java -jar opcua-device-gateway-<<version>>.jar --spring.config.location=file:<<location>>/.opcua/conf/application-myTenant.yaml,file:<<location>>/.opcua/conf/
```

If both arguments "--spring.config.location" and "--spring.profiles.active" are provided, the configuration locations should be directories instead of files. Otherwise, the profile-specific variants will not be considered.

### Additional customizations {#additional-customizations}

{{< c8y-admon-info >}}
If no additional customizations are required, you can skip this section.
{{< /c8y-admon-info >}}

{{< c8y-admon-info >}}
Starting from version 10.11.0, the opcua-device-gateway process creates the address space local db files with a new filename (cumulocity-opcua-server-&lt;serverId&gt;-address-space-pv4.bin) due to a dependency change to avoid conflicts.
The legacy address space local db files are cleaned up at the start of the opcua-device-gateway process automatically by default.
Deletion of the legacy files can be turned off by setting the "gateway.db.addressSpace.legacyCleanup" to false as described below.
{{< /c8y-admon-info >}}

The following properties can be manually configured in the YAML file:

```yaml
# Name of the application - this should not change
name: opcua-device-gateway
# Platform location and configuration
C8Y:
  # This is the base URL pointing to the {{< product-c8y-iot >}} platform. This must always be customized in an application profile.
  baseUrl: http://localhost
  # This is an internal setting of the {{< product-c8y-iot >}} SDK. It is set to true, because we typically
  # want to configure the {{< product-c8y-iot >}} SDK to always use the baseURL provided during initialization.
  # Otherwise, the gateway would use the links in the `self` fragment of the core API responses as the host name.
  # This is helpful in deployment scenarios where the {{< product-c8y-iot >}} instance is
  # reachable only with an IP address.
  forceInitialHost: true

#
# Gateway-specific settings
#
gateway:
  # The version of the gateway - this is filled automatically during the build process - do not change this property
  version: ${project.version}
  # The following two properties will be set to the name of the user that is running the gateway unless it's overridden manually
  identifier: mygateway
  name: mygateway
  # The gateway uses a local database to store platform credentials and a local cache. This setting tells
  # where local data is stored.
  db:
    baseDir: ${user.home}/.opcua/data
    addressSpace:
      # Starting from version 10.11, the opcua-device-gateway process creates the address space local db files are with a new filename
      # (cumulocity-opcua-server-<serverId>-address-space-pv4.bin) due to a dependency change to avoid conflicts.
      # The legacy address space local db files can be cleaned up at the start of the opcua-device-gateway process
      # automatically when the legacyCleanup is set to true, which is the default setting.
      # If the legacy files wanted to be kept or if the mechanism for clearing is not needed, set legacyCleanup to false.
      legacyCleanup: true
  # These settings configure and enable/disable Thin Edge mode (registration and operating OPC UA gateway via Thin Edge).
  thinEdge:
    # Enable Thin Edge if the OPC UA gateway is running next to Thin Edge and should use it to connect to {{< product-c8y-iot >}}.
    # Set enabled to false if the OPC UA gateway is running without Thin Edge.
    enabled: false
    # MQTT Server URL of Thin Edge (localhost).
    mqttServerURL: tcp://127.0.0.1:1883
    # Enable this if the MQTT client uses a single steady connection. Note that MQTT is only used to retrieve the JWT, which is dependent on how long the JWT is valid. See https://{{< domain-c8y >}}/guides/device-integration/mqtt/#jwt-token-retrieval.
    # We recommend you to use a steady connection only if the JWT is valid for a short time. If the JWT is valid for a longer time, the standard is one hour. It is generally not recommended to have a steady MQTT connection.
    mqttSteadyConnection: false
    # The Thin Edge deviceId must be changed, depending on the configured deviceId of the Thin Edge certificate.
    deviceId: my-thin-edge-device
  # These settings control the device bootstrap process of the gateway.
  # In general, the default settings are sufficient, and should not be changed.
  # Contact product support (https://{{< domain-c8y >}}/guides/<latest-release>/additional-resources/contacting-support/).
  # in case the bootstrap credentials are different.
  bootstrap:
    # Tenant ID to be used for device bootstrap
    tenantId: management
    # Credentials for the device bootstrap user
    username: devicebootstrap
    password: <devicebootstrap user password>
    # When the gateway starts, it waits <delay> milliseconds before connecting to the platform and searching for
    # the device.
    delay: 5000
    # If set to true, the gateway will drop any stored device credentials and fetch new ones from the platform.
    force: false

  # Scheduled tasks and thread pools configuration
  # Only change the settings here if really necessary. Wrong scheduler configurations can
  # disturb the gateway's operation.
  scheduler:
    # Threadpool specific settings
    threadpool:
      # This setting corresponds to the size of the threadpool used for periodic tasks.
      size: 15
  # These settings control the threadpool of our internal task executor, which is used for generic background
  # execution and asynchronous tasks.
  executor:
    threadpool:
      coreSize: 30
      maxSize: 60
  # The following settings control the settings of the device type mappings execution.
  mappingExecution:
    # This section contains all settings related to external, custom-action execution.
    http:
      # Connection request timeout (milliseconds)
      connectionRequestTimeout: 3000
      # Connection timeout (milliseconds)
      connectionTimeout: 3000
      # Socket timeout (milliseconds)
      socketTimeout: 5000
      # Maximum number of connections via HTTP route
      maxPerRoute: 100
      # Maximum total size of the HTTP connection pool used for external, custom actions.
      maxTotal: 100
      # The inactivityLeaseTimeout setting defines a period, after which persistent connections to
      # the HTTP server must be reevaluated. See PoolingHttpClientConnectionManager for more information
      inactivityLeaseTimeout: 50000 #ms
      # Aggregate number of alarms if something goes wrong with the execution of external custom actions
      failureAlarmAggregate: true
      # How often is the alarm aggregation for failed external calls invoked?
      failureAlarmFixedDelay: 15 # seconds
      failureHandling:
        # Whether a failed HTTP POST should be retried later or not. This can be overridden by the configuration in device type. Default is false
        enabled: false
        # Number of retries a failed HTTP POST will be resent
        maxRetries: 5
        # If retry is enabled, the exceptions of HTTP status codes can be provided here, comma separated. A HTTP POST which failed with one of these codes will not be retried. This can be overridden by the configuration in the device type. Default is empty which means that all failed http posts will be retried if enabled. Example: 400,500
        noRetryHttpCodes:
        # Minimum delay in seconds between two retries
        retryDelay: 120
      # Max queue size of the HTTP POST actions queue
      maxQueueSize: 50000
      # Worker thread (which performs the actual HTTP request) pool size
      threadPoolSize: 200

    # Threadpool configuration for the mapping execution
    # Each value arriving in the gateway will be handled by one or more action handlers defined in the device type. Each handler will be executed in one single thread.
    # Hence, this threadpool must be large enough to cope with the parallel processing needs of values
    # received from the OPC UA server.
    threadpool:
      size: 200

    # To avoid many REST calls to the inventory an in-memory map with a crash backup functionality is included.
    alarmStatusStore:
      # Expected number of maximum alarms at the same time
      maxEntries: 100000
      # The average size of the keys on the map. Needed for calculation of the size of the database file.
      averageKeySize: 30
      # The number of maxEntries multiplied with this factor results in the real max size of the database file. Resize is done only if needed.
      maxBloatFactor: 5.0

  # Mapping-specific settings
  mappings:

  # In OPC UA, alarm severity is specified by an integer range between 0 and 1000. The alarmSeverityMap
  # allows to configure how OPC UA severity is mapped into {{< product-c8y-iot >}} severity levels. The following is the default mappings:
  # alarmSeverityMap:
    # 1001: CRITICAL
    # 801: CRITICAL
    # 601: MAJOR
    # 401: MINOR
    # 1: WARNING

    # Mapping synchronization interval
    # The OPC UA gateway periodically fetches the OPC UA device types. With the following settings, this
    # interval can be adjusted.

    # Sync interval in milliseconds. The default is 43200000ms (12 hours)
    syncInterval: 43200000

  # Operation settings
  operation:
    # Default behavior that controls if the OPC UA gateway performs an address space scan when it connects the first time to an OPC UA server. Can be overridden in the OPC UA Server config.
    autoScanAddressSpace: true
    # Validates if the nodes given for the operation belongs to device's address space. If the validation fails an alarm is created for the device. If disabled, the opcua-device-gateway will execute the operation directly. The default is set to true.
    validateDeviceOperationNodes: true
  # Cyclic-Reader settings
  cyclicRead:
    # The cyclic readers use a dedicated threadpool to perform periodic read tasks.
    threadpool:
      # Allows the size of the threadpool for cyclic reads to be configured
      size: 30
    # How many nodes can be read at once for the cyclic read of the same device protocol, server, root node and the same parameters (rate, max-age).
    defaultBulkSize: 1000

  # OPC UA subscription settings: These settings allow global OPC UA configuration parameters
  # for subscription-based data reporting
  subscription:
    # The reporting rate (in milliseconds) corresponds to the publishing rate for monitored items.
    reportingRate: 100
    # The maxKeepAliveCount specifies the maximum number of OPC UA reporting intervals with no data that
    # can be skipped before the OPC UA server sends an empty response to the gateway, informing about
    # a yet active, but idle OPC UA subscription.
    maxKeepAliveCount: 200
    # The lifeTimeCount specifies the maximum number of reporting intervals without a value being sent.
    # After the lifetime count has exceeded, the subscription is terminated.
    # Must be 3 times greater than maxKeepAliveCount
    lifetimeCount: 600
    # The notificationBufferSize defines how many monitored item values should be buffered to receive
    # subscription notification data from the OPC UA server. The subscription reporting rate (publish interval)  
    # and the volume of sampling data should be taken into account to choose a suitable buffer size.
    notificationBufferSize: 500
    # The recreateFailedItems flag can be used to enable the feature of a subscription so that it automatically retries to create the monitored items
    # if they fail due to error code Bad_NodeIdUnknown. It assumes that the NodeIds are correct, but it hasn't been added to the
    # server's address space yet. The default value is false.
    recreateFailedItems: false

  # Subscription update settings
  subscriptionUpdate:
    # The subscription update interval controls how often the OPC UA gateway updates the subscription
    # settings for connected OPC UA servers. Expects: Interval duration in milliseconds.
    interval: 60000

  # Server connectivity configuration
  connectivity:
    # If autoReconnect in the client configuration is set to false, the gateway tries to reconnect manually.
    # triggerManualReconnectOnConnectionDrop can be used to stop the manual reconnect as well if set to false. The default value is true.
    triggerManualReconnectOnConnectionDrop: true

    # As a default, the OPC UA stack validates the endpoints returned by the OPC UA server. With this
    # setting, the default can be toggled.
    # This global setting can be individually overridden for each OPC UA server using the
    # "validateDiscoveredEndpoints" configuration fragment.
    # validateDiscoveredEndpoints: true

  # Internal repository configurations
  repositories:
    # Interval in milliseconds describing how often the repositories are flushed to the platform
    flushInterval: 10000
    # Threadpool size for the event queue flushing
    eventsThreadpool: 30
    # Threadpool size for the alarm queue flushing
    alarmsThreadpool: 30
    # Threadpool for the measurement queue flushing
    measurementsThreadpool: 60

    # Maximum capacity. If a repository grows over this size, the OPC UA communication will be shut off!
    maximumCapacity: 250000

    # Re-enable threshold. If OPC UA communication has been disabled due to exceeding maximum capacity, this threshold
    # controls when OPC UA communication is enabled again
    reenableThresholdSize:  10

  # The settings below describe platform-specific connection parameters.
  platform:
    inventory:
      update:
        # Default processing mode for inventory managed objects update to the {{< product-c8y-iot >}} platform.
        defaultProcessingMode: QUIESCENT
        # Processing mode for inventory update of the gateway device managed objects to the {{< product-c8y-iot >}} platform.
        gateway:
          processingMode: QUIESCENT
        # Processing mode for inventory update of the OPC UA server device managed objects to the {{< product-c8y-iot >}} platform.
        server:
          processingMode: QUIESCENT
        # Processing mode for inventory update of value-map managed objects to the {{< product-c8y-iot >}} platform.
        valuemap:
          processingMode: QUIESCENT
    # Connection pool configuration
    connectionPool:
      # Overall maximum size of the connection pool
      max: 250
      # Max connections used for a single host
      perHost: 150

  # Gateway self-monitoring configuration

  # First, the gateway internally measures different metrics and populates them to the platform.
  # Second, the gateway actively checks if a server connection is active and working by regularly
  # browsing the root node of an OPC UA server.
  monitoring:
    # The interval below in milliseconds configures the frequency of this monitoring task.
    interval: 10000
    # The interval below in milliseconds configures how often we investigate the thread executor queue sizes to prevent overflow
    checkQueueSizes: 10000

  # The OPC UA gateway persists all latest values of an OPC UA server in a dedicated managed object,
  # the so-called value map. These value maps are locally kept on the device for a certain time
  # before being pushed to the platform, allowing for local aggregation of all last-seen values.
  valueMap:
    # The lifetime of a local value map in seconds
    lifeTime: 30

  # How often (in milliseconds) does the gateway check for changes in configured servers.
  # This setting controls how long it takes for the gateway to discover an added or a removed server
  childrenAddedOrRemoveCheck:
    interval: 15000

  # How often (in milliseconds and if enabled) the gateway reads pending operations from the platform.
  shortPolling:
    enabled: true
    fixedDelay: 15000

  # Time in days for which the certificate is valid.
  applicationIdentity:
    validityTime: 3650

  # Timeout scanning address space in minutes and a pause between retries in milliseconds
  scanAddressSpace:
    timeout: 1440
    retries: 5
    pauseMillisForRetry: 700
```

### Logging {#logging}

Custom logging configuration can be set during startup by passing the "--logging.config" JVM argument. For more info on how to set up custom logging settings, refer to the ["Logback" documentation](http://logback.qos.ch/manual/configuration.html).
A sample logging configuration file may look like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration scan="true" scanPeriod="30 seconds">

       <include resource="org/springframework/boot/logging/logback/defaults.xml" />
       <appender name="FILE"
                         class="ch.qos.logback.core.rolling.RollingFileAppender">
               <file>/${user.home}/.opcua/log/device-gateway.log</file>
               <encoder>
                       <pattern>${FILE_LOG_PATTERN}</pattern>
               </encoder>

               <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
                       <!-- rollover daily -->
                       <fileNamePattern>/${user.home}/.opcua/log/device-agent-%d{yyyy-MM-dd}.%i.log
                       </fileNamePattern>
                       <timeBasedFileNamingAndTriggeringPolicy
                                       class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                               <maxFileSize>50MB</maxFileSize>
                       </timeBasedFileNamingAndTriggeringPolicy>
                       <maxHistory>5</maxHistory>
               </rollingPolicy>
       </appender>

       <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
               <encoder>
                       <pattern>${CONSOLE_LOG_PATTERN}</pattern>
                       <charset>utf8</charset>
               </encoder>
       </appender>

       <logger name="com.cumulocity.opcua.client.gateway" level="INFO" />
       <logger name="com.cumulocity" level="INFO" />
       <logger name="c8y" level="INFO" />

       <root level="INFO">
               <appender-ref ref="FILE" />
               <appender-ref ref="STDOUT" />
       </root>
</configuration>
```

### Deletion of gateway {#deletion-of-gateway}

An OPC UA gateway can be associated with multiple OPC UA servers, and the servers can have multiple child devices
connected to them. The cleanest approach to delete a gateway is to first delete the OPC UA server managed objects and all its child devices.

The server can be either deleted from the **OPC UA server** tab of the gateway (recommended way of deletion), or from the device list itself. If the server is
deleted from the **OPC UA server** tab, then the server managed object and all the address space managed objects are deleted by the OPC UA management service,
but the child devices associated with the server must be deleted separately.

On the other hand, if the server is deleted from the device list, then the
child devices associated with the server can be deleted by selecting the checkbox **Also delete child devices of this device**. The deletion is detected by the gateway,
and the address space managed objects are deleted for the corresponding server. If the gateway is offline, then the address space managed objects will not be removed.

The process of deletion is asynchronous for both cases, so it may take a while to
completely remove all the associated managed objects. Thereafter, the gateway can be deleted from the list of devices along with the device user by selecting the checkbox
**Also delete associated device owner "device&#95;&#60;gateway&#95;name&#62;"**.

If the gateway is directly deleted from the list of devices before deleting gateway's servers and devices of those servers, by selecting the checkbox **Also delete child devices of this device**,
then the server managed object will be deleted, but the corresponding address space objects will not be deleted as they are not children of the gateway.

### Downgrade to an earlier version {#downgrade-to-an-earlier-version}

Due to security improvements, downgrades from 10.12.0 to previous versions are not directly supported.
However, if required, a downgrade is possible by following the instructions below:

1. Shut down the current version of the gateway and remember the gateway managed object ID from the devices list.
2. Send an HTTP PUT command to your tenant to reset the identity:

PUT {url_to_your_tenant}/inventory/managedObjects/{device_id}
```json
   {
   "c8y_ua_IdentityConfig":null
   }
```
3. The response code should be 200 OK.
4. Start the old version of the gateway.

After completing these steps a new identity will be created in the old structure.

It is possible to upgrade to version 10.12.0 or above at a later stage. The necessary conversion will be done automatically.
