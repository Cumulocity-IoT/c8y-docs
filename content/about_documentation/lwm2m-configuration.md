---
weight: 70
title: Configuration
layout: bundle
section:
  - product-components
---

### LWM2M configuration {#lwm2m-configuration}

{{< c8y-admon-info >}}
It is now possible to set Californium properties directly via the Lwm2m-service
configuration file. See [Californium configuration](#californium-configuration) for
more details.
- DTLS Connection ID (CID) support is enabled by default in the LWM2M service.
See [Connection ID (CID) configuration](#cid-configuration) for more details.
{{< /c8y-admon-info >}}

On Kubernetes the LWM2M service configuration is managed by a `ConfigMap` which is consumed by the LWM2M pod. The properties are modifiable via the *values.yaml* of the Helm chart.
The pod can access the configuration parameters through volume mounts.


#### General configuration {#general-configuration}

<table>
    <thead>
        <tr>
            <th style="width: 30%;">Parameter</th>
            <th style="width: 40%;">Description</th>
            <th style="width: 30%;">Default</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>server.port</td>
            <td>LWM2M service's main HTTP port (spring boot attribute) - do not change if it's not necessary</td>
            <td>8068</td>
        </tr>
        <tr>
            <td>application.name</td>
            <td>Name of service - do not change</td>
            <td>lwm2m-agent</td>
        </tr>
        <tr>
            <td>C8Y.baseUrl</td>
            <td>C8Y platform URL or HA proxy address if connecting to multiple core nodes. The HA proxy must use some form of sticky routing, for example, IP hashing in order to make long polling work.</td>
            <td>http://cumulocity.default.svc.cluster.local</td>
        </tr>
        <tr>
            <td>C8Y.forceInitialHost</td>
            <td>Set forceInitialHost to one if run in Docker environment</td>
            <td>true</td>
        </tr>
        <tr>
            <td>C8Y.bootstrap.tenant</td>
            <td>Bootstrap user tenant</td>
            <td>management</td>
        </tr>
        <tr>
            <td>C8Y.bootstrap.user</td>
            <td>Bootstrap user username</td>
            <td>admin</td>
        </tr>
        <tr>
            <td>C8Y.bootstrap.password</td>
            <td>Bootstrap user password</td>
            <td>-</td>
        </tr>
        <tr>
            <td>eclipse.californium.coap.port</td>
            <td>LwM2M server port</td>
            <td>5783</td>
        </tr>
        <tr>
            <td>eclipse.californium.coaps.port</td>
            <td>LwM2M server port for secure connections</td>
            <td>5784</td>
        </tr>
        <tr>
            <td>eclipse.californium.bootstrap.coap.host</td>
            <td>LwM2M bootstrap server host</td>
            <td>0.0.0.0</td>
        </tr>
        <tr>
            <td>eclipse.californium.bootstrap.coap.port</td>
            <td>LwM2M bootstrap server port</td>
            <td>5683</td>
        </tr>
        <tr>
            <td>eclipse.californium.bootstrap.coaps.host</td>
            <td>LwM2M bootstrap server host for secure connections</td>
            <td>0.0.0.0</td>
        </tr>
        <tr>
            <td>eclipse.californium.bootstrap.coaps.port</td>
            <td>LwM2M bootstrap server port for secure connections</td>
            <td>5684</td>
        </tr>
        <tr>
            <td>bootstrap.device.lifetime.default</td>
            <td>Default LwM2M device lifetime sent as bootstrap info</td>
            <td>432000</td>
        </tr>
        <tr>
            <td>C8Y.lwm2m.gracePeriodOfRegistrationLifetime</td>
            <td>Grace period (in seconds) over registration lifetime</td>
            <td>14400</td>
        </tr>
        <tr>
            <td>c8y.lwm2m.autoManageAvailabilityRequiredInterval</td>
            <td>true/false - when true the LWM2M agent automatically sets the required interval in registered devices. Changing this property does not affect already created devices.</td>
            <td>true</td>
        </tr>
        <tr>
            <td>eclipse.leshan.cluster.c8y.tenant</td>
            <td>Eclipse Leshan cluster store -- tenant, this need to be subscribed to LwM2M service</td>
            <td>management</td>
        </tr>
        <tr>
            <td>C8Y.lwm2m.decoder.execution.fixedDelay</td>
            <td>Delay in milliseconds between executing events for external decoders - default value is 10 seconds</td>
            <td>10000</td>
        </tr>
        <tr>
            <td>C8Y.objectmappings.setdefault</td>
            <td>Should LWM2M service set default object mappings in {{< product-c8y-iot >}}</td>
            <td>true</td>
        </tr>
        <tr>
            <td>C8Y.objectmappings.fetch.fixedDelay</td>
            <td>LWM2M object mapping fetch delay in milliseconds - how often LwM2M service queries {{< product-c8y-iot >}} (subscribed tenants) for new / updated object mappings</td>
            <td>600000</td>
        </tr>
        <tr>
            <td>C8Y.event.retry.fixedDelay</td>
            <td>Event delivery retry delay in milliseconds</td>
            <td>30000</td>
        </tr>
        <tr>
            <td>C8Y.lwm2m.fwupdate.address</td>
            <td>Firmware update server address</td>
            <td>127.0.0.1</td>
        </tr>
        <tr>
            <td>C8Y.lwm2m.fwupdate.httpPort</td>
            <td>Firmware update server HTTP port</td>
            <td>8773</td>
        </tr>
        <tr>
            <td>C8Y.lwm2m.fwupdate.httpsPort</td>
            <td>Firmware update server HTTPS port</td>
            <td>8774</td>
        </tr>
        <tr>
            <td>C8Y.lwm2mEventLoggingEnabled</td>
            <td>Should LwM2M device communication be logged in {{< product-c8y-iot >}} events</td>
            <td>false</td>
        </tr>
        <tr>
            <td>C8Y.event.retry.maxRetryCount</td>
            <td>Maximum number of event delivery retries</td>
            <td>10</td>
        </tr>
        <tr>
            <td>C8Y.lwm2mRequestTimeout</td>
            <td>Timeout in milliseconds used by server when sending shell operations like read, write, execute, and so on.</td>
            <td>180000</td>
        </tr>
        <tr>
            <td>C8Y.lwm2mMaxRequestTimeout</td>
            <td>Timeout in milliseconds used by server to check individual device request timeout and C8Y.lwm2mRequestTimeout must not be greater than this limit</td>
            <td>600000</td>
        </tr>
        <tr>
            <td>C8Y.lwm2mMinRequestTimeout</td>
            <td>Timeout in milliseconds used by server to check individual device request timeout and C8Y.lwm2mRequestTimeout must not be lower than this limit</td>
            <td>10000</td>
        </tr>
        <tr>
            <td>C8Y.lwm2m.client_awake_time</td>
            <td>Time after which the service considers a device to be offline and doesn't send commands anymore. 0 = never consider a device to be offline</td>
            <td>0</td>
        </tr>
        <tr>
            <td>C8Y.coapThreadCount</td>
            <td>CoAP Californium senders and receivers thread count</td>
            <td>1000</td>
        </tr>
        <tr>
            <td>C8Y.lwm2m.hazelcast.environment</td>
            <td>Hazelcast property to enable auto-discovery of pods in the Kubernetes cluster</td>
            <td>Kubernetes</td>
        </tr>
        <tr>
            <td>C8Y.lwm2m.hazelcast.backupCount</td>
            <td>Hazelcast property to set required number of backups</td>
            <td>4</td>
        </tr>
        <tr>
            <td>C8Y.lwm2m.deduplicateObservationPaths</td>
            <td>This property helps in enabling or disabling the deduplication of observations by path</td>
            <td>true</td>
        </tr>
        <tr>
            <td>C8Y.lwm2m.failStarvedOperation.fixedDelay</td>
            <td>Interval in milliseconds describing how often starved operations are failed</td>
            <td>86400000</td>
        </tr>
        <tr>
            <td>C8Y.lwm2m.failStarvedOperation.enable</td>
            <td>Enable/disable automatic failing of LwM2M starved operation</td>
            <td>48</td>
        </tr>
        <tr>
            <td>C8Y.lwm2m.operationMaxAgeHours</td>
            <td>EXECUTING operations older than this maximum time period will be automatically failed</td>
            <td>86400000</td>
        </tr>
        <tr>
            <td>C8Y.lwm2m.postReg.maxPendingOperationExecutions</td>
            <td>When a device sends a registration, as part of the post registration actions, the service fetches the device's pending operations and executes them. This is to limit the number of pending operations to be executed in the post registration process. The operations are fetched in the order of their creation date (first created, first fetched).</td>
            <td>50</td>
        </tr>
        <tr>
            <td>C8Y.lwm2m.supportDeprecatedContentFormat</td>
            <td>Support deprecated content format: 1542 and 1543</td>
            <td>true</td>
        </tr>
        <tr>
            <td>C8Y.lwm2m.realtimeDisabledTenants</td>
            <td>This property can be used to disable the real-time subscription for devices of a tenant. A comma-separated list of tenants can be provided here or '*' which will skip real-time for all tenants. Empty means all devices will subscribe to the real-time channel.</td>
            <td></td>
        </tr>
        <tr>
            <td>C8Y.lwm2m.additionalGracePeriodForAsyncRegMigration</td>
            <td>The migration operation of all devices for each tenant and their corresponding registrations is executed asynchronously. This property specifies an additional grace period (in hours) for the migration of the registration objects after completing the device migration.</td>
            <td>6</td>
        </tr>
        <tr>
            <td>C8Y.lwm2m.connector.tenantLockTimeout</td>
            <td>During the execution of LwM2M connector device operations, the corresponding tenant is locked until the execution is completed. This property enables the user to set a global timeout (in seconds) on the tenant lock.</td>
            <td>900000</td>
        </tr>
        <tr>
            <td>c8y.lwm2m.rest.publicHealthEndpoint</td>
            <td>Controls if the health endpoint is available via /service/lwm2m-agent/health</td>
            <td>true</td>
        </tr>
    </tbody>
</table>


#### Operation execution settings {#operation-execution-settings}

<table>
    <tr>
        <th style="width: 40%;">Parameter</th>
        <th style="width: 45%;">Description</th>
        <th style="width: 15%;">Default</th>
    </tr>
    <tr>
        <td>c8y.lwm2m.opexec.executorCorePoolSize</td>
        <td>Operation executor core pool size</td>
        <td>100</td>
    </tr>
    <tr>
        <td>c8y.lwm2m.opexec.executorMaxPoolSize</td>
        <td>Operation executor max pool size</td>
        <td>200</td>
    </tr>
    <tr>
        <td>c8y.lwm2m.opexec.executionTimeoutMils</td>
        <td>Operation execution timeout, from when the operation is being executed by the executor.</td>
        <td>600000</td>
    </tr>
    <tr>
        <td>c8y.lwm2m.opexec.maxOperationQueueSizePerDevice</td>
        <td>Max operation queue size per device</td>
        <td>1000</td>
    </tr>
    <tr>
        <td>c8y.lwm2m.opexec.realtimeSubscriptionTtl</td>
        <td>Realtime device operation subscription (COMET) lifetime in milliseconds. After this period, the subscription is automatically canceled.</td>
        <td>180000</td>
    </tr>
    <tr>
        <td>c8y.lwm2m.opexec.realtimeSubscriptionTtlExtension</td>
        <td>This parameter reflects whether TTL is extended when an operation is received via a real-time subscription channel. When a new message arrives, a new TTL will be set to the current time plus the `realtimeSubscriptionTtlExtension` value.</td>
        <td>1000</td>
    </tr>
</table>

#### External decoder executor configuration {#external-decoder-executor-configuration}

<table>
    <tr>
        <th style="width: 40%;">Parameter</th>
        <th style="width: 45%;">Description</th>
        <th style="width: 15%;">Default</th>
    </tr>
    <tr>
        <td>c8y.lwm2m.decoderexec.executorCorePoolSize</td>
        <td>External decoder executor pool size</td>
        <td>10</td>
    </tr>
    <tr>
        <td>c8y.lwm2m.decoderexec.executorMaxPoolSize</td>
        <td>External decoder executor maximum pool size</td>
        <td>20</td>
    </tr>
    <tr>
        <td>C8Y.lwm2m.decoder.processEventForMonths</td>
        <td>The decoder engine will fetch events from the specified number of months.</td>
        <td>1</td>
    </tr>
    <tr>
        <td>C8Y.lwm2m.decoder.maxRetries</td>
        <td>The maximum number of retries before a decoder event is failed.</td>
        <td>6</td>
    </tr>
    <tr>
        <td>C8Y.lwm2m.decoder.retryDelayMinutes</td>
        <td>Delay (in minutes) between two retries of the same decoder event processing.</td>
        <td>10</td>
    </tr>
    <tr>
        <td>C8Y.lwm2m.decoder.maxQueueSizeOfDecoderEvents</td>
        <td>Maximum number of elements added to the distributed queue while processing decoder events.</td>
        <td>10000</td>
    </tr>
    <tr>
        <td>C8Y.lwm2m.decoder.serviceUnavailabilityDelayInMinutes</td>
        <td>Delay (minutes) before processing any decoder event with same service key if the external decoder service is unavailable.</td>
        <td>10</td>
    </tr>
</table>

#### Bulk registration operation execution configuration {#bulk-registration-operation-execution-configuration}

| Parameter                                          | Description                                                    | Default |
|----------------------------------------------------|----------------------------------------------------------------|---------|
| c8y.lwm2m.bulkoperation.maxSizeOfPendingOperations | Maximum number pending bulk operations allowed for the service | 20      |
| c8y.lwm2m.bulkoperation.executorCorePoolSize       | Bulk operation executor core pool size                         | 10      |
| c8y.lwm2m.bulkoperation.executorMaxPoolSize        | Bulk operation executor maximum pool size                      | 20      |
| c8y.lwm2m.bulkoperation.maxAwaitTerminationSeconds | Time to wait for termination in case of service shutdown       | 1000    |


 #### Cluster tenant managed object cleanup execution configuration (deprecated) {#cluster-tenant-managed-object-cleanup-execution-configuration-deprecated}

| Parameter                                                             | Description                                                                              | Default |
|-----------------------------------------------------------------------|------------------------------------------------------------------------------------------|---------|
| C8Y.lwm2m.clustertenant.cleanup.staleCheck.enable                     | Enable/Disable cluster tenant stale object check task                                    | false   |
| C8Y.lwm2m.clustertenant.cleanup.staleCheck.delayInDays                | Cluster tenant stale object check interval in days to mark dangling objects as stale     | 10      |
| C8Y.lwm2m.clustertenant.cleanup.staleCheck.lastUpdatedBeforeInDays    | Check cluster tenant objects if last updated date before in days                         | 30      |
| C8Y.lwm2m.clustertenant.cleanup.expiredDelete.enable                  | Enable/Disable cluster tenant stale object deletion if expired task                      | false   |
| C8Y.lwm2m.clustertenant.cleanup.expiredDelete.delayInDays             | Cluster tenant stale object deletion if expired task interval in days                    | 1       |
| C8Y.lwm2m.clustertenant.cleanup.expiredDelete.lastUpdatedBeforeInDays | Stale cluster tenant object is considered as expired if last updated date before in days | 120     |


#### Security configuration

<table>
<colgroup>
<col style="width: 30%;">
<col style="width: 35%;">
<col style="width: 35%;">
</colgroup>
<thead>
<tr>
<th>Paramater</th>
<th>Description</th>
<th>Default</th>
</tr>
</thead>
<tbody>
<tr>
<td>c8y.coap.security.settings.ignoredSrcPorts</td>
<td>Ignores packets coming from these source ports. Some common UDP protocols set as default</td>
<td>53,137,123,520,5353,17,19,389,514,161,162,67,68</td>
</tr>
</tbody>
</table>


### Adjusting HTTP client pool settings for the core platform requests {#adjusting-http-client-pool-settings-for-core-platform-requests}

When the LWM2M service sends a request to the {{< product-c8y-iot >}} core platform, a HTTP client thread is used from the pool to do the request.
Below are the most relevant configurations to adjust these settings:

| Property                         | Description                                | Default by Microservice SDK | LWM2M defaults |
|----------------------------------|--------------------------------------------|-----------------------------|----------------|
| C8Y.httpClient.pool.perHost      | Max connections per host                   | 50                          | 150            |
| C8Y.httpClient.pool.max          | Max total connections                      | 100                         | 300            |
| C8Y.httpClient.pool.awaitTimeout | Wait time to lease a thread (milliseconds) | 10000                       | 30000          |

When the frequency of the LWM2M device connections coming to the LWM2M service are above 10K connections during peak hours, the default values are not sufficient.
However, the load on the core nodes must be monitored during peak connection hours and adjusted if needed.

To override the default configuration, the desired values can be added under the properties of *values.yaml*.

If `C8Y.forceInitialHost` is enabled, the target host of all core platform requests is the same and the maximum concurrent connections is the value of `C8Y.httpClient.pool.perHost`.

`C8Y.forceInitialHost` is enabled by default (see [LWM2M configuration](#lwm2m-configuration)).


### Californium DTLS additional settings {#californium-dtls-additional-settings}

{{< c8y-admon-info >}}
The additional Californium DTLS settings operations are deprecated and will
be removed in the next releases. In case you want to do additional DTLS settings,
see [Californium configuration](#californium-configuration) for more details.
{{< /c8y-admon-info >}}

Use the following parameters to configure the DTLS connection configurations of the LWM2M server.
The values specified here are the defaults from Californium. If nothing is specified the server is configured with the following values:

```
# Initial retransmission timeout (in milliseconds)
eclipse.californium.scandium.dtlsConnector.retransmissionTimeout=2000
# Maximum retransmission timeout (in milliseconds). This value must not be lower than eclipse.californium.scandium.dtlsConnector.retransmissionTimeout value
eclipse.californium.scandium.dtlsConnector.maxRetransmissionTimeout=60000
# Maximum numbers of DTLS retransmissions
eclipse.californium.scandium.dtlsConnector.maxRetransmissions=4
# Maximum active connections supported by the connector
eclipse.californium.scandium.dtlsConnector.maxConnections=150000
```

#### Californium configuration {#californium-configuration}

LWM2M configuration allows to set specific Californium properties if the customer needs some additional
low level protocol configuration to the Californium third party library. This can be done using the
prefix `californium3.properties.` followed by the name of the Californium property and its value.
For example, if customers want to set a DTLS initial retransmission timeout, the Californium property
is `DTLS.RETRANSMISSION_TIMEOUT`. To set this property for the LWM2M service configuration, use `californium3.properties.DTLS.RETRANSMISSION_TIMEOUT=2000`

##### Example for setting up DTLS transmission {#example-for-setting-up-DTLS-transmission}

These Californium settings are necessary in case the devices are running in a slow network and DTLS connection requests time out.
Note that setting too low values for `DTLS.RETRANSMISSION_TIMEOUT` can lead the LWM2M service to
flood the device with the same request or response. Also `DTLS.MAX_RETRANSMISSIONS` counts the number
of retransmissions per session, not per packet.
```
# Californium DTLS additional settings
# Initial retransmission timeout (in milliseconds)
californium3.properties.DTLS.RETRANSMISSION_TIMEOUT=2000
# Maximum retransmission timeout (in milliseconds). This value must not be lower than eclipse.californium.scandium.dtlsConnector.retransmissionTimeout value
californium3.properties.DTLS.MAX_RETRANSMISSION_TIMEOUT=60000
# Maximum numbers of DTLS retransmissions
californium3.properties.DTLS.MAX_RETRANSMISSIONS=4
# Maximum active connections supported by the connector
californium3.properties.DTLS.MAX_CONNECTIONS=150000
```

If  customers are running LWM2M devices with a slow network connectivity the
same way as DTLS configuration they can use the following Californium
CoAP parameters to increase or decrease the response timeout. Keep in mind
that setting too low values for `COAP.ACK_TIMEOUT` could lead the LWM2M service to
flood the device with the same request or response. Also `COAP.MAX_RETRANSMIT`
counts the number of retransmissions per session, not per packet.
```
# Initial CoAP acknowledge timeout for CON messages (in milliseconds).
californium3.properties.COAP.ACK_TIMEOUT=2000
# Maximum CoAP acknowledge timeout for CON messages (in milliseconds).
californium3.properties.COAP.MAX_ACK_TIMEOUT=60000
# Random factor applied to the initial CoAP acknowledge timeout.
californium3.properties.COAP.ACK_INIT_RANDOM=1.5
# Factor as back-off applied to follow-up CoAP acknowledge timeout.
californium3.properties.COAP.ACK_TIMEOUT_SCALE=2.0
# Maximum numbers of retransmissions.
californium3.properties.COAP.MAX_RETRANSMIT=4
```

In case there are too many devices, which in parallel reports data over
encrypted connection, you can increase the number of DTLS threads. The
receiver thread counts `DTLS.RECEIVER_THREAD_COUNT` and are responsible for
receiving the messages and parsing them into a structured records. The
connector threads `DTLS.CONNECTOR_THREAD_COUNT` are responsible for the remaining
cryptographic functions for both incoming and outgoing messages.
```
# Specify the number of DTLS receiver threads used by Californium
californium3.properties.DTLS.RECEIVER_THREAD_COUNT=500
# Specify the number of DTLS connector threads used by Californium
californium3.properties.DTLS.CONNECTOR_THREAD_COUNT=500
```

The same way, if the LWM2M service has a significant delay processing many parallel
connections in the same time, then customers can increase the number of the
UDP sender and received threads. This allows the LWM2M service to handle more
UDP connections in the same period of time.
```
# Number of UDP receiver threads.
californium3.properties.UDP.RECEIVER_THREAD_COUNT=10
# Number of UDP sender threads.
californium3.properties.UDP.SENDER_THREAD_COUNT=10
```

{{< c8y-admon-important >}}
Keep in mind that increasing the number of the threads can increase the LWM2M
agent's performance, but can also lead to a significant increase of the LWM2M
agent's CPU and memory usage.
{{< /c8y-admon-important >}}

Some LWM2M service properties are also representing some of the Californium
properties. These properties are necessary for the initial LWM2M service setup.
That is why the LWM2M service properties are overriding and taking precedence over the
Californium properties.

Below is a list of the LWM2M service properties which take precedence over Californium properties:

<table>
<colgroup>
<col style="width: 30%;">
<col style="width: 35%;">
<col style="width: 35%;">
</colgroup>
<thead>
<tr>
<th>LWM2M service property (takes precedence over)</th>
<th>Californium property</th>
<th>Additional comments </th>
</tr>
</thead>
<tbody>
<tr>
<td>C8Y.coapThreadCount <br> COAP.PROTOCOL_STAGE_THREAD_COUNT</td>
       <td>DTLS.RETRANSMISSION_TIMEOUT</td>
       <td>eclipse.californium.scandium.dtlsConnector.retransmissionTimeout is deprecated
       and it will be removed from the next releases. If both parameters appear at the same time as the
       DTLS.RETRANSMISSION_TIMEOUT parameter in the current configuration, then the LWM2M service parameter is taking precedence
       over the Californium parameter.</td>
   </tr>
   <tr>
       <td>eclipse.californium.scandium.dtlsConnector.maxRetransmissions</td>
       <td>DTLS.MAX_RETRANSMISSIONS</td>
       <td>eclipse.californium.scandium.dtlsConnector.maxRetransmissions is deprecated
       and it will be removed from the next releases. If both parameters appear at the same time as the
       DTLS.MAX_RETRANSMISSIONS parameter in the current configuration, then the LWM2M service parameter is taking precedence
       over the Californium parameter.</td>
   </tr>
   <tr>
       <td>eclipse.californium.scandium.dtlsConnector.maxRetransmissionTimeout</td>
       <td>DTLS.MAX_RETRANSMISSION_TIMEOUT</td>
       <td>eclipse.californium.scandium.dtlsConnector.maxRetransmissionTimeout is deprecated
       and it will be removed from the next releases. If both parameters appear at the same time as the
       DTLS.MAX_RETRANSMISSION_TIMEOUT parameter in the current configuration, then the LWM2M service parameter is taking precedence
       over the Californium parameter</td>
   </tr>
   <tr>
       <td>eclipse.californium.scandium.dtlsConnector.maxConnections</td>
       <td>DTLS.MAX_CONNECTIONS</td>
       <td>eclipse.californium.scandium.dtlsConnector.maxConnections is deprecated
       and it will be removed from the next releases. If both parameters appear at the same time as the
       DTLS.MAX_CONNECTIONS parameter in the current configuration, then the LWM2M service parameter is taking precedence
       over the Californium parameter</td>
   </tr>
</table>

#### Connection ID (CID) configuration {#cid-configuration}

In case you use devices whose IP address or connection port changes very often (for example, the location of the device changes
very often and the device must connect to another cell or mobile provider, or the device is connected behind a NAT
and the router changes the outgoing connection port) you might prefer to connect this device to the LWM2M service using
a secure connection and enable the DTLS Connection ID (CID) on both the client and server side. This option allows the
device to send and receive data without an additional new registration update during the active period of the device.

By default, CID is enabled for the LWM2M service. To change its default value update the `californium3.properties.DTLS.CONNECTION_ID_LENGTH`
property to a value greater than zero. This value specifies the length of the CID byte. By default, `californium3.properties.DTLS.CONNECTION_ID_LENGTH`
is 3. To update this value, follow the instructions below to find out the proper byte length. When setting
this value, ensure that the device support is equal to or greater than the number of bytes set for this property. To disable
CID for the LWM2M service, set `californium3.properties.DTLS.CONNECTION_ID_LENGTH` to zero.

Before setting the `californium3.properties.DTLS.CONNECTION_ID_LENGTH` property, it is important to know how many
concurrent devices might connect to the LWM2M server using DTLS. The `californium3.properties.DTLS.CONNECTION_ID_LENGTH` value
must be large enough for the number of considered peers. When you choose the CID length, we recommend you to think to have 100
times more values than concurrent devices, or at least one more byte length. For example, if you have 65000 devices, then
two bytes are enough for the CID length in theory, because this allows 65536 concurrent devices. Nevertheless, we recommend you to
choose 3 bytes.

This is what the configuration should look like in the LWM2M service configuration:
```
# Enable 65000 concurrent devices
californium3.properties.DTLS.CONNECTION_ID_LENGTH=3
```
### Configuration of notifications mechanism (optional) {#configuration-of-notifications-mechanism-optional}

By default, LWM2M agent uses realtime (cometd) notification mechanism. Nothing has to be additionally configured for this mechanism to work.
If the platform supports "Notifications 2.0 via Pulsar" and "notification2.tenant.all.apis" feature, then optionally this feature can be enabled by setting:

<table>
<colgroup>
<col style="width: 35%;">
<col style="width: 45%;">
<col style="width: 20%;">
</colgroup>
<thead>
<tr>
<th>Property</th>
<th>Description</th>
<th>Default</th>
</tr>
</thead>
<tbody>
<tr>
<td>c8y.lwm2m.notification.provider=notifications2</td>
<td>Notifications provider: notifications2 or realtime</td>
<td>realtime</td>
</tr>
<tr>
<td>c8y.lwm2m.notification.websocketUrl</td>
<td>WebSocket URL pointing to platform Pulsar installation (if empty provider will fall back to realtime), example: ws://127.0.0.1:31020</td>
<td>empty</td>
</tr>
</tbody>
</table>

Note that for notifications2 to work, "notification2.tenant.all.apis" feature must be enabled on tenant level. If it's disabled, provider will fall back to realtime.

To check if the platform supports notifications2 you can:
1) Verify that Pulsar is installed in the cluster (See [Monitoring Pulsar deployment](/messaging-service/messaging-monitoring/#monitoring-pulsar-deployment) for additional information.)
2) Verify that "notification2.tenant.all.apis" feature exists by sending a GET request to {{< management-tenant >}} feature API:
```
{{url}}/features/notification2.tenant.all.apis
```

### Adjusting LWM2M Java configuration / Memory settings {#adjusting-lwm2m-java-configuration-memory-settings}

The JVM parameters can be configured via the Helm chart using the `JAVA_TOOL_OPTIONS` environment variable.
To apply the desired JVM parameters specify the following in the *values.yaml*:
```
env:
  - name: 'JAVA_TOOL_OPTIONS'
    value: "-Xmx4g -XX:MaxMetaspaceSize=512m"
```

### Configuration of data sink properties {#configuration-of-data-sink-properties}

| Property                           | Description                                                                      | Default |
|------------------------------------|----------------------------------------------------------------------------------|---------|
| C8Y.lwm2m.sinks.flush.initialDelay | The measurement, alarms and event sinks will be flushed with an initial delay    | 60000   |
| C8Y.lwm2m.sinks.flush.fixedDelay   | The measurement, alarms and event sinks will be flushed with this fixed interval | 600000  |

The LWM2M service persists the events and alarms directly to the platform using multiple threads from their respective thread pool.
The number of executor threads can be configured separately for events and alarms using the following configuration.

| Property                                            | Description                                      | Default |
|-----------------------------------------------------|--------------------------------------------------|---------|
| c8y.lwm2m.sinks.flush.alarmSinkExecutorCorePoolSize | Executor core pool size for alarm persistence    | 10      |
| c8y.lwm2m.sinks.flush.alarmSinkExecutorMaxPoolSize  | Executor maximum pool size for alarm persistence | 20      |
| c8y.lwm2m.sinks.flush.eventSinkExecutorCorePoolSize | Executor core pool size for event persistence    | 10      |
| c8y.lwm2m.sinks.flush.eventSinkExecutorMaxPoolSize  | Executor maximum pool size for event persistence | 20      |

In case of failures during persistence (for example, due to a network issue or a core node being unavailable), the events and alarms are stored in a separate queue
and the service tries to flush the queue of failed elements at a regular interval.
The flush interval of the failed queue can be configured with the following properties.

| Property                                          | Description                                                                            | Default |
|---------------------------------------------------|----------------------------------------------------------------------------------------|---------|
| C8Y.lwm2m.sinks.flush.failedElements.initialDelay | The failed elements of alarms and event sinks will be flushed with an initial delay    | 300000  |
| C8Y.lwm2m.sinks.flush.failedElements.fixedDelay   | The failed elements of alarms and event sinks will be flushed with this fixed interval | 300000  |

However, in case of measurement data the service stores them in the queue at first and then flushes them in batches at a regular interval using another thread pool executor.
The flush interval of measurement data can be configured as:

| Property                                        | Description    | Default |
|-------------------------------------------------|----------------|---------|
| C8Y.lwm2m.sinks.flush.measurements.initialDelay | Initial delay  | 10000   |
| C8Y.lwm2m.sinks.flush.measurements.fixedDelay   | Fixed interval | 10000   |

The number of executor threads for measurement flush mechanism can be configured as:

| Property                                                  | Description                        | Default |
|-----------------------------------------------------------|------------------------------------|---------|
| c8y.lwm2m.sinks.flush.measurementSinkExecutorCorePoolSize | Core pool size of executor threads | 10      |
| c8y.lwm2m.sinks.flush.measurementSinkExecutorMaxPoolSize  | Maximum pool size                  | 20      |

### LWM2M/Bootstrap server certificate configuration {#lwm2m-bootstrap-server-certificate-configuration}

The LWM2M service supports device authentication using X509 client certificates. In order to be able to connect LWM2M
devices using certificates, a DTLS server certificate must be configured. The server certificate is used for both DTLS
endpoints of the LWM2M service, namely the bootstrap server and the LWM2M server. The certificates are used to indicate
the identity of the LWM2M service towards the device. This enables a LWM2M device to validate if it is connecting to a
valid DTLS endpoint.

The ciphersuites standardized in the LWM2M require the use of elliptic curves. Using both self-signed certificates and
certificates issued by a third-party certificate authority are supported.
See [OMA LWM2M specifications](http://www.openmobilealliance.org/release/LightweightM2M/V1_1-20180612-C/OMA-TS-LightweightM2M_Transport-V1_1-20180612-C.html#5-2-8-7-0-5287-Certificate-Usage-Field)
for more details. X509 certificates must contain an ECDSA signature along with a fully qualified domain name (FQDN)
in the common name.

#### Using a third-party certificate provider to issue a certificate for LWM2M {#using-a-third-party-certificate-provider-to-issue-a-certificate-for-lwm2m}

The certificate can be issued by a third-party certificate provider. However, not all certificate providers are able to issue certificates that meet these specifications. Make sure the
chosen certificate provider supports the
required compliant cipher
suites. See [OMA LWM2M specifications](http://www.openmobilealliance.org/release/LightweightM2M/V1_1-20180612-C/OMA-TS-LightweightM2M_Transport-V1_1-20180612-C.html#5-2-8-7-0-5287-Certificate-Usage-Field). To obtain a certificate from a third-party certificate provider, you'll need to submit a Certificate Signing
Request (CSR). To create a CSR, first a private key in accordance to the LWM2M specifications must be generated and
using that a CSR can be created. As an example, the following commands can be followed to create a CSR.

+ Generate a private key in accordance to the LWM2M standards which states that an elliptical curve key with curve
  groups more than 255 bits must be used. Therefore `ecparam` subcommand is used with `-name prime256v1` to create a key
  with the P-256 curve.

    ```bash
    openssl ecparam -name prime256v1 -genkey -noout -out server_cert.key
    ```

+ Create the CSR using the elliptical curve key and `-sha256` argument to generate a SHA256 signature with ECDSA. Then
  add the necessary information like FQDN in the Common Name.

    ```bash
    openssl req -new -sha256 -key server_cert.key -out server_cert.csr
    ```

The next step is to submit the CSR to your chosen trusted third-party certificate provider. The process may vary
slightly depending on the
certificate provider, and some may require domain validation before issuing the certificate. Finally, verify if the signature algorithm is as expected. Refer to the image below if needed. Once the certificate is
issued, simply follow
the steps in the [Upload the certificate to the platform](#upload-the-certificate-to-the-platform) section to complete
the process. 

![Certificate signature algorithms for LWM2M](/images/lwm2m-agent/lwm2m-certificate-signature-algorithm.png)

#### Creating a self-signed certificate for LWM2M {#creating-a-self-signed-certificate-for-lwm2m}

Self-signed certificates are also permitted under
the [OMA LWM2M specifications](http://www.openmobilealliance.org/release/LightweightM2M/V1_1-20180612-C/OMA-TS-LightweightM2M_Transport-V1_1-20180612-C.html#5-2-8-7-0-5287-Certificate-Usage-Field).
The certificate must contain an
ECDSA signature and a valid FQDN in the common name. To create the self-signed certificate, use an elliptical curve key
and Certificate Signing Request (CSR) with an SHA-256
signature. The uploaded certificate and private key should be in the PEM
format encoded using Base64. As an example, the following commands can be used to generate a self-signed certificate
using OpenSSL, the compiled script is available at the end.

+ Generate a private key in accordance to the LWM2M standards which states that an elliptical curve key with curve
  groups more than 255 bits must be used. Therefore `ecparam` subcommand is used with `-name prime256v1` to create a key
  with the P-256 curve.

    ```bash
    openssl ecparam -name prime256v1 -genkey -noout -out server_cert.key
    ```

+ Create the CSR using the elliptical curve key and `-sha256` argument to generate a SHA256 signature with ECDSA. Then
  add the necessary information like FQDN in the Common Name.

    ```bash
    openssl req -new -sha256 -key server_cert.key -out server_cert.csr
    ```

+ Use the CSR and the key to generate a self-signed X509 certificate. The generated certificate contains the P-256
  elliptical curve key and the SHA-256 signature with ECDSA.

    ```bash
    openssl req -x509 -sha256 -days 36500 -key server_cert.key -in server_cert.csr -out server_cert.crt
    ```

+ If the certificate or the key is not in PEM format, convert it into the PEM format.

    ```bash
    openssl pkcs8 -topk8 -inform PEM -outform PEM -in server_cert.key -out server_cert_key.pem -nocrypt
    ```

+ Encode the PEM formatted certificate and private key in Base64. These are the values that are uploaded to the service.

   ```bash
   touch encodedCertFromPem.txt
   echo "========== BASE64 ENCODED CERTIFICATE ==========" >> encodedCertFromPem.txt
   (cat server_cert.crt | openssl base64 -e -A ; echo) >> encodedCertFromPem.txt

   echo "========== BASE64 ENCODED PRIVATE KEY ==========" >> encodedCertFromPem.txt
   (cat server_cert_key.pem | openssl base64 -e -A ; echo) >> encodedCertFromPem.txt
  ```

The following script is a compilation of the steps to generate a self-signed certificate. It creates the private
key, CSR, server certificate in both CERT and PEM formats, and a text file that contains the BASE64-encoded PEM format
of the certificate and private key.

   ```
   #!/bin/sh
   openssl ecparam -name prime256v1 -genkey -noout -out server_cert.key
   openssl req -new -sha256 -key server_cert.key -out server_cert.csr
   openssl req -x509 -sha256 -days 36500 -key server_cert.key -in server_cert.csr -out server_cert.crt
   openssl pkcs8 -topk8 -inform PEM -outform PEM -in server_cert.key -out server_cert_key.pem -nocrypt
   touch encodedCertFromPem.txt
   echo "========== BASE64 ENCODED CERTIFICATE ==========" >> encodedCertFromPem.txt
   (cat server_cert.crt | openssl base64 -e -A ; echo) >> encodedCertFromPem.txt
   echo "========== BASE64 ENCODED PRIVATE KEY ==========" >> encodedCertFromPem.txt
   (cat server_cert_key.pem | openssl base64 -e -A ; echo) >> encodedCertFromPem.txt
   ```

#### Upload the certificate to the platform {#upload-the-certificate-to-the-platform}

To let the LWM2M service use the server certificate, upload it to the {{< management-tenant >}} as a tenant option. This
is done via the following steps:

1. If the certificate or the key is not already available as a PEM file, convert the it to the PEM file format.

   ```bash
   openssl pkcs8 -topk8 -inform PEM -outform PEM -in server_cert.key -out server_cert_key.pem -nocrypt
   ```

2. Encode the PEM content in Base64 format, for example:

   ```bash
   touch encodedCertFromPem.txt
   echo "========== BASE64 ENCODED CERTIFICATE ==========" >> encodedCertFromPem.txt
   (cat server_cert.crt | openssl base64 -e -A ; echo) >> encodedCertFromPem.txt
   echo "========== BASE64 ENCODED PRIVATE KEY ==========" >> encodedCertFromPem.txt
   (cat server_cert_key.pem | openssl base64 -e -A ; echo) >> encodedCertFromPem.txt
    ```

   The script mentioned above creates a file *encodedCertFromPem.txt* where you can find the Base64-encoded certificate
   and its private key.

3. Store the encoded string as a tenant option in the {{< management-tenant >}} using the key `dtls.x509.certificate.default`.
   ```
   POST {{url}}/tenant/options
    {
      "category": "lwm2m-agent",
      "key": "dtls.x509.certificate.default",
      "value": "<base64 encoded string (without markers)>"
    }
    ```
   ```
   curl --location 'https://<TENANT_DOMAIN>/tenant/options' \
   --header 'Content-Type: application/vnd.com.nsn.cumulocity.option+json' \
   --header 'Accept: application/vnd.com.nsn.cumulocity.option+json' \
   --header 'Authorization: <AUTH HEADER>' \
   --data '  {
   	   	"category": "lwm2m-agent",
    	 	"key": "dtls.x509.certificate.default",
     		"value": "<base64 encoded string (without markers)>"
    	  }'   
    ```
{{< c8y-admon-info >}}
Be aware that `dtls.x509.certificate.default` must be used for the default server certificate configuration. Technically, the LWM2M service already supports the configuration of multiple server certificates. They will be used once the LWM2M service support SNI. Additional certificates can also be configured with the prefix `dtls.x509.certificate` and a different identifier at the end, for example: `dtls.x509.certificate.sample`.
{{</c8y-admon-info >}}

4. Store the private key of the certificate in a similar way. Encode the private key PEM to Base64 and store it as a tenant option in the {{< management-tenant >}} using `credentials.dtls.x509.certificateKey.default` as the key.
   The *encodedCertFromPem.txt* file from the example above also provides the encoded private key.
   ```
   POST {{url}}/tenant/options
    {
      "category": "lwm2m-agent",
      "key": "credentials.dtls.x509.certificateKey.default",
      "value": "<encoded key for certificate>"
    }
   ```
   ```
   curl --location 'https://<TENANT_DOMAIN>/tenant/options' \
   --header 'Content-Type: application/vnd.com.nsn.cumulocity.option+json' \
   --header 'Accept: application/vnd.com.nsn.cumulocity.option+json' \
   --header 'Authorization: <AUTH HEADER>' \
   --data '  {
   	   	"category": "lwm2m-agent",
    	 	"key": "credentials.dtls.x509.certificateKey.default",
     		"value": "<encoded key for certificate>"
    	  }'   
    ```
{{< c8y-admon-info >}}
The private key is automatically encrypted, as it is stored as an encrypted tenant option.
{{< /c8y-admon-info >}}

### Firmware update secure endpoint configuration {#firmware-update-secure-endpoint-configuration}

The LWM2M service allows a device to pull the firmware resource through a secure HTTPS endpoint.
The certificate associated with this endpoint can also be pre-configured as a tenant option in the {{< management-tenant >}}.
However, in this case if a certificate is not found during the agent's startup, it automatically generates a self-signed certificate.
The certificate common name is taken from the property "C8Y.lwm2m.fwupdate.address" in the agent's configuration.
The process for configuring this certificate is similar to the approach described in the previous section.
1. Assuming the X509 certificate already exists, the certificate PEM must be encoded in Base64 format, for example: `cat fwCertificate.pem | base64`
2. Store the encoded certificate string as a tenant option with the key `firmware.x509.certificate.default`.
   ```
   POST {{url}}/tenant/options
    {
      "category": "lwm2m-agent",
      "key": "firmware.x509.certificate.default",
      "value": "<base64 encoded string>"
    }
    ```
     ```
   curl --location 'https://<TENANT_DOMAIN>/tenant/options' \
   --header 'Content-Type: application/vnd.com.nsn.cumulocity.option+json' \
   --header 'Accept: application/vnd.com.nsn.cumulocity.option+json' \
   --header 'Authorization: <AUTH HEADER>' \
   --data '  {
   	   	"category": "lwm2m-agent",
    	 	"key": "firmware.x509.certificate.default",
     	"value": "<base64 encoded string>"
    	  }'   
    ```
3. Similarly, encode the private key PEM in Base64 format, for example: `cat fwPrivateKey.pem | base64`
4. Store the encoded private key as a tenant option with the key `credentials.firmware.x509.certificateKey.default`
   ```
   POST {{url}}/tenant/options
    {
      "category": "lwm2m-agent",
      "key": "credentials.firmware.x509.certificateKey.default",
      "value": "<encoded key for certificate>"
    }
   ```
   ```
   curl --location 'https://<TENANT_DOMAIN>/tenant/options' \
   --header 'Content-Type: application/vnd.com.nsn.cumulocity.option+json' \
   --header 'Accept: application/vnd.com.nsn.cumulocity.option+json' \
   --header 'Authorization: <AUTH HEADER>' \
   --data '  {
   	   	"category": "lwm2m-agent",
    	 	"key": "credentials.firmware.x509.certificateKey.default",
     		"value": "<encoded key for certificate>"
    	  }'   
    ```
### Required configuration of core nodes {#required-configuration-of-core-nodes}

There is no specific requirement for core nodes configuration. However, if the LWM2M service connects to a platform with multiple core nodes, it must connect via HA proxy that supports sticky routing (for example, IP hashing) for the long polling to work.

### Transmission of Device Data to Cumulocity’s MQTT Service

{{< c8y-admon-important >}}
Before configuring the system as outlined below, verify that Pulsar is properly deployed, 
the Core platform is configured for integration with Pulsar, and that the MQTT Service is operational.
{{< /c8y-admon-important >}}

To enable the LWM2M service for the transmission of device data to Cumulocity’s MQTT Service, 
the following configuration parameters must be specified. These settings can either be applied 
to the LWM2M Service’s Helm chart by modifying the appropriate properties within the `values.yaml` 
file, or alternatively, directly to the LWM2M Service's POD by editing the `lwm2m-agent-server.properties` ConfigMap.

| **Property** | **Description** |
|--------------|-----------------|
| `C8Y.mqtt.messaging.service.url` | Specify the WebSocket URL for the MQTT service (for example, `ws://cumulocity.default.svc.cluster.local`). |
| `C8Y.mqtt.messaging.service.enabledForTenants` | Provide a comma-separated list of tenant identifiers to direct device data to the MQTT Service. |

These configuration parameters are applied globally across the system. 
Following any modifications, a restart of the LWM2M Service is required to implement the changes.

It is important to note that if the MQTT service URL is defined without corresponding tenant identifiers, 
the LWM2M service will be unable to establish a connection to the MQTT Service.

Once the LWM2M service has been configured to forward device data to the MQTT Service, 
you must deploy a microservice specifically designed to consume the transmitted data. 
You can independently deploy this microservice by following the steps 
outlined in [Managing microservices](/standard-tenant/ecosystem/#managing-microservices).

### System options {#system-options}

No system option configurations are required.

### Tenant options {#tenant-options}

LWM2M service requires a tenant option in the {{< management-tenant >}} to register its HTTP address to the {{< product-c8y-iot >}} core platform:
The Kubernetes service name can be used here, for example, lwm2m-agent-service or lwm2m-agent-service.<namespace>.svc.cluster.local
```
{
     "category": "lwm2m-agent",
     "key": "microservice.url",
     "value": "http://lwm2m-agent-service:8068"
}
```

### Other configurations {#other-configurations}

- LWM2M must be subscribed by the {{< management-tenant >}} and the central tenant for registration/observation data (defined in `eclipse.leshan.cluster.c8y.tenant`).
- The firmware update IP address (specified by `C8Y.lwm2m.fwupdate.address`) must be accessible by the devices. It should be the IP address or fully-qualified domain name (FQDN) of the load balancer.
- Tuning configuration: Apart from the RAM, CPU, available disk space, there is another configuration that can be tuned for better performance if there are many device connections. `C8Y.coapThreadCount` defines how many sending/receiving threads can be running concurrently. The more number of devices, the bigger number of this field must be set.
