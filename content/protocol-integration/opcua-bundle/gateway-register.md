---
weight: 20
title: Gateway configuration and registration
layout: redirect
---

YAML file and spring profiles are used for the configuration of the gateway. A default configuration file is embedded in the gateway JAR file, so you only need to set the properties which are different from the default.

> **Important**: When editing the YAML file, make sure to provide valid indentations.

To run the gateway locally, the default settings should be overridden in a customized profile. To use the customized profile, create a YAML file which must follow the naming convention:

    application-<<Profile_name>>.yaml

For example, to connect to a tenant, first a profile named *application-myTenant.yaml* will be created. The following properties will be added to the file:

```yaml
C8Y:
    baseUrl: https://<<yourTenant>>.cumulocity.com
gateway:
    bootstrap:
        tenantId: <<yourTenantId>>
    identifier: Gateway_Device
    name: My Gateway
    db:
# The gateway uses the local database to store platform credentials and local cache. This parameter shows the location in which the local data should be stored.
        baseDir: C:/Users/<<userName>>/.opcua/data
```

> **Info:** Windows OS is used for the example.

### Configuration profile location on the filesystem

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

The number of profiles you may have is not limited. To use a specific profile on runtime, the "--spring.profiles.active" JVM argument has to be passed when running the gateway JAR file. For example, let’s use the previously created profile. Start a terminal and use the following command:

```shell
java -jar opcua-device-gateway-<<version>>.jar --spring.profiles.active=default,myTenant
```

The command above will start a gateway with the default profile and it will override the default properties with the properties defined in the “myTenant” profile. The list of profiles has to be provided as an ordered, comma-separated list. The default profile always needs to be the first profile in the list.

**Optional**: To specify your own configuration, Spring arguments can be used in your terminal to run the gateway JAR file. Multiple locations have to be comma-separated. The configuration locations should be either YAML files or directories. In case of directories, they must end with “/”. For example:

```shell
java -jar opcua-device-gateway-<<version>>.jar --spring.config.location=file:<<location>>/.opcua/conf/application-myTenant.yaml,file:<<location>>/.opcua/conf/
```

If both arguments "--spring.config.location" and "--spring.profiles.active" are provided, the configuration locations should be directories instead of files. Otherwise, the profile-specific variants will not be considered.

### Additional customizations

> **Info**: If no additional customizations are required, you can skip this section.

The following properties can be manually configured in the YAML file:

```yaml
# Name of the application - this should not change
name: opcua-device-gateway
# Platform location and configuration
C8Y:
  # This is the base URL pointing to the Cumulocity IoT platform. This must always be customized in an application profile.
  baseUrl: http://localhost
  # This is an internal setting of the Cumulocity IoT SDK. It is set to true, because we typically
  # want to configure the Cumulocity IoT SDK to always use the baseURL provided during initialization.
  # Otherwise, the gateway would use the links in the `self` fragment of the core API responses as the host name.
  # This is helpful in deployment scenarios where the Cumulocity IoT instance is
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

  # These settings control the device bootstrap process of the gateway
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
      maxPerRoute: 50
      # Maximum total size of the HTTP connection pool used for external, custom actions.
      maxTotal: 100
      # The inactivityLeaseTimeout setting defines a period, after which persistent connections to
      # the HTTP server must be reevaluated. See PoolingHttpClientConnectionManager for more information
      inactivityLeaseTimeout: 50000 #ms
      # Aggregate number of alarms if something goes wrong with the execution of external custom actions
      failureAlarmAggregate: true
      # How often is the alarm aggregation for failed external calls invoked?
      failureAlarmFixedDelay: 15 # seconds

    # The OPC UA gateway regularly fetches all device types ("mappings") from the server. The refreshInterval
    # configures how often this happens.
    refreshInterval: 60000

    # Threadpool configuration for the mapping execution
    # Each value arriving in the gateway will be handled by one or more action handlers defined in the device type. Each handler will be executed in one single thread.
    # Hence, this threadpool must be large enough to cope with the parallel processing needs of values
    # received from the OPC UA server.
    threadpool:
      size: 200

  # Mapping-specific settings
  mappings:
    # In OPC UA, alarm severity is specified by an integer range between 0 and 1000. The alarmSeverityMap
    # allows to configure how OPC UA severity is mapped into Cumulocity IoT severity levels.
    alarmSeverityMap:
      1001: CRITICAL
      801: CRITICAL
      601: MAJOR
      401: MINOR
      1: WARNING

  # Cyclic-Reader specific settings
  cyclicRead:
    # The cyclic readers use a dedicated threadpool to perform periodic read tasks.
    threadpool:
      # Allows the size of the threadpool for cyclic reads to be configured
      size: 30

  # OPC UA subscription settings: These settings allow global OPC UA configuration parameters
  # for subscription-based data reporting
  subscription:
    # The reporting rate corresponds to the publishing rate for monitored items.
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

  # Timeout scanning address space in minutes
  scanAddressSpace:
    timeout: 1440
    retries: 5
```

### Logging

Custom logging configuration can be set during startup by passing the "--logging.config" JVM argument. For more info on how to set up custom logging settings, refer to the [“Logback” documentation](http://logback.qos.ch/manual/configuration.html).
A sample logging config file may look like this:

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
