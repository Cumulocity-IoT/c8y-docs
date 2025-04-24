---
weight: 130
title: Troubleshooting
layout: redirect
---

### Permission denied error when running the gateway JAR file on a Linux OS {#permission-denied-error-when-running-the-gateway-jar-file-on-a-linux-os}

![Permission denied](/images/device-protocols/opcua/opcua-permission-denied-error.png)

If the following error appears,  add a baseDir property to the YAML file. For example:

```
db:
  baseDir: ${user.home}/.opcua/profile/data
```

### Unknown host exception when running the gateway JAR {#unknown-host-exception-when-running-the-gateway-jar}

This error appears if the provided baseUrl property in the YAML file is incorrect.

### Failed to load property source from location when running the gateway JAR {#failed-to-load-property-source-from-location-when-running-the-gateway-jar}

The following error appears if the indentation of the properties in the YAML file is incorrect.

![Failed to load](/images/device-protocols/opcua/opcua-failed-to-load.png)

### java.net.BindException: Address already in use {#javanetbindexception-address-already-in-use}

![Address in use](/images/device-protocols/opcua/opcua-address-in-use.png)

If this error appears, a Java process is running in the background. To fix this issue, the process must be stopped/killed.

### Changing the log level for troubleshooting {#changing-the-log-level-for-troubleshooting}

For troubleshooting purposes, we recommend you to enable the DEBUG log level for subpackages and root if required, and send the log file to [product support](/additional-resources/contacting-support/).

For example:

```
    <logger name="com.cumulocity.opcua.client.gateway" level="DEBUG"/>
    <logger name="com.cumulocity" level="DEBUG"/>
    <logger name="c8y" level="DEBUG"/>

    <root level="DEBUG">
        <appender-ref ref="FILE" />
        <appender-ref ref="STDOUT"/>
    </root>
```

If there is an unknown error during the address space scans, enable DEBUG or TRACE log level specifically for the scanners:

```
    <logger name="com.cumulocity.opcua.client.BaseAddressSpaceScanner" level="DEBUG" />
    <logger name="com.cumulocity.opcua.client.OpcuaAddressSpaceFullScanner" level="DEBUG" />
    <logger name="com.cumulocity.opcua.client.OpcuaAddressSpaceLightScanner" level="DEBUG" />
    <logger name="com.cumulocity.opcua.client.OpcuaAddressSpaceReverseFullScanner" level="DEBUG" />

    <root level="INFO">
        <appender-ref ref="FILE" />
        <appender-ref ref="STDOUT"/>
    </root>
```

For additional information about log levels, refer to the [Logback architecture documentation](http://logback.qos.ch/manual/architecture.html#effectiveLevel).

### Java Management Extensions (JMX) {#java-management-extensions-jmx}

For additional monitoring, the gateway component provides MBeans. These MBeans get exposed if the following configuration is set in the *application.yaml* file:

```
spring:
     jmx:
         enabled: true
```

Via jconsole the MBeans can be selected and the following attributes can be accessed:

![jconsole MBeans](/images/device-protocols/opcua/opcua-jmx-mbeans.png)

It can be useful to get some statistics for custom actions in particular. These attributes can be retrieved from the CustomActionMBean:

1. Table of all called URLs seperated by HTTP return code and retry count.

    ![jconsole MBeans CustomActionMBean CounterTable](/images/device-protocols/opcua/opcua-jmx-customActionMBean-CounterTable.png)

    The key entry of the table consists of:

    ```
    {URL}_{HTTP Response Code}_{Retry Count}
    ```

2. If retry is enabled, the queue size of the retry queue can be monitored.

    ![jconsole MBeans CustomActionMBean RetryQueueSize](/images/device-protocols/opcua/opcua-jmx-customActionMBean-RetryQueueSize.png)
