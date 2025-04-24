---
weight: 100
title: REST APIs
layout: redirect
---

While the {{< product-c8y-iot >}} user interface for OPC UA provides an easy and visual way to configure and build your OPC UA solution, the OPC UA management microservice gives you the possibility to do it via RESTful web service.

The full API definitions can be found at */service/opcua-mgmt-service/swagger-ui.html*.

### OPC UA server resources {#opc-ua-server-resources}

#### Connect a new OPC UA server to the gateway {#connect-a-new-opc-ua-server-to-the-gateway}

**Endpoint**

 `POST /service/opcua-mgmt-service/gateways/{gatewayId}/servers`

**Description**

Connect a new OPC UA server to the gateway or update the existing server with a new configuration.

**Payload**

```json
{
    "name": "My Server",
    "config": {
        "securityMode": "NONE",
        "serverUrl": "opc.tcp://127.0.0.1:53530/OPCUA/SimulationServer",
        "autoScanAddressSpace": true
    }
}
```

Payload data structure explained:

<table>
<colgroup>
<col style="width: 20%;">
<col style="width: 20%;">
<col style="width: 10%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Mandatory</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>id</td>
<td>string</td>
<td>yes/no</td>
<td>String. Id of the OPC UA server in case of updating an existing server. When connecting a new server, this must not be provided.</td>
</tr>
<tr>
<td>name</td>
<td>string</td>
<td>yes</td>
<td>Server managed object name.</td>
</tr>
<tr>
<td>requiredInterval</td>
<td>integer</td>
<td>no</td>
<td>How frequently the server is expected to send data to the {{< product-c8y-iot >}} platform.</td>
</tr>
<tr>
<td>config</td>
<td><em>ServerConnectionConfig</em></td>
<td>yes</td>
<td>Connection configuration to the OPC UA server.</td>
</tr>
</tbody>
</table>

Data structure for ServerConnectionConfig:

<table>
<colgroup>
<col style="width: 25%;">
<col style="width: 10%;">
<col style="width: 5%;">
<col style="width: 60%;">
</colgroup>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Mandatory</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>securityMode</td>
<td>string</td>
<td>yes</td>
<td>String enum, mandatory. Security mode for connection to OPC UA server. Possible values: <code>NONE,&nbsp;BASIC128RSA15_SIGN,&nbsp;BASIC128RSA15_SIGN_ENCRYPT,&nbsp;BASIC256_SIGN, BASIC256_SIGN, BASIC256_SIGN_ENCRYPT, BASIC256SHA256_SIGN, BASIC256SHA256_SIGN_ENCRYPT</code>.</td>
</tr>
<tr>
<td>serverUrl</td>
<td>string</td>
<td>yes</td>
<td>String, mandatory. OPC UA server URL.</td>
</tr>
<tr>
<td>autoScanAddressSpace</td>
<td>Boolean</td>
<td>no</td>
<td>Boolean. Whether the gateway should scan the address space automatically the first time it connects. Default is true.</td>
</tr>
<tr>
<td>rescanCron</td>
<td>string</td>
<td>no</td>
<td>String. Regular expression that defines how the address space rescanning should be scheduled. If this is not set, no auto-rescan will be triggered.</td>
</tr>
<tr>
<td>autoReconnect</td>
<td>Boolean</td>
<td>no</td>
<td>Boolean. Whether the gateway should try to reconnect to the OPC UA server once the connection drop is detected. Default is true.</td>
</tr>
<tr>
<td>timeout</td>
<td>integer</td>
<td>no</td>
<td>Integer. Define the default communication timeout that is used for each synchronous service call. This value is set to each service request and the OPC UA gateway will wait for the response message for&nbsp;that long.</td>
</tr>
<tr>
<td>statusCheckInterval</td>
<td>integer</td>
<td>no</td>
<td>Integer. Define the status check interval, that is, how often the server status is read. Default is 3 (seconds).</td>
</tr>
<tr>
<td>maxResponseMessageSize</td>
<td>long</td>
<td>no</td>
<td>Integer. Define the maximum size, in bytes, for the body of any response message from the server. Default is 50.000.000 (50 MB). To make it unlimited, set this to 0.</td>
</tr>
<tr>
<td>targetConnectionState</td>
<td>string</td>
<td>no</td>
<td>String enum. Possibe values: <code>enabled/disabled</code>. Whether the connection the the target OPC UA server is enabled.</td>
</tr>
<tr>
<td>userIdentityMode</td>
<td>string</td>
<td>no</td>
<td>User identity. Possible values: <code>Anonymous, UserName, Certificate, IssuedToken</code>. Default is <code>Anonymous</code>.</td>
</tr>
<tr>
<td>userName</td>
<td>string</td>
<td>yes/no</td>
<td>Authentication username when user identity mode is <code>UserName</code>.</td>
</tr>
<tr>
<td>userPassword</td>
<td>string</td>
<td>no</td>
<td>Authentication password when user identity mode is <code>UserName</code>. Set the value in order to change the authentication password. If it is not set, the previously stored authentication password is preserved.</td>
</tr>
<tr>
<td>keystoreBinaryId</td>
<td>string</td>
<td>yes/no</td>
<td>If the user identity mode is <code>Certificate</code>, this is the binary object ID of the uploaded keystore.</td>
</tr>
<tr>
<td>keystorePass</td>
<td>string</td>
<td>no</td>
<td>If the user identity mode is <code>Certificate</code>, this is the password of the uploaded keystore.</td>
</tr>
<tr>
<td>certificatePass</td>
<td>string</td>
<td>no</td>
<td>If the user identity mode is <code>Certificate</code>, this is the password of the private key embedded in the keystore.</td>
</tr>
<tr>
<td>cyclicReadBulkSize</td>
<td>integer</td>
<td>no</td>
<td>For cyclic reads, this defines how many nodes can be read at once from the OPC UA server. This is applicable only for nodes resulting from the application with the same device type, matching root node and sharing the same reading parameters (rate and max age). Default is 1000 as defined in the application YAML file.</td>
</tr>
<tr>
<td>alarmSeverityMappings</td>
<td>map&lt;string, string&gt;</td>
<td>no</td>
<td>Alarm severity mappings from the OPC UA event severity to the {{< product-c8y-iot >}} alarm severity. This is applicable only for UAAlarmCreation. The key of this map is the lower bound value of the OPC UA event severity in the range. The value of this map is the expected severity of the alarm being created. For example, to map the OPC UA severity of the range 200-400 to a <em>MINOR</em>&nbsp;{{< product-c8y-iot >}} alarm, put this entry to the map: <code>"200": "MINOR"</code>.<br>If this is given, it will override the alarm severity mappings that are specified in the configuration YAML file.<br>Note that, if the&nbsp;<em>severity</em>&nbsp;field for alarm mapping is provided, this <em>alarmSeverityMappings</em>&nbsp;will have no effect.<br><em><strong>Example</strong></em>:&nbsp;<code>"201": "WARNING",</br>"401": "MINOR",</br>"601": "MAJOR",</br>"801": "CRITICAL"</br></code>
Additionally, the <em>Severity</em> attribute should be added in the subscribed attributes (uaEventMappings -> attributes) in the device type in order to get the severity value of the OPC UA event.</td>
</tr>
<tr>
<td rowspan="1">alarmStatusMappings</td>
<td>map&lt;string, string&gt;</td>
<td>no</td>
<td>The status of an alarm in {{< product-c8y-iot >}} is defined by multiple conditions on OPC UA servers. For example, if the value of <code>AcknowledgedState</code> node is "Acked" and <code>ConfirmedState</code> is "Confirmed",
then the status of the alarm in {{< product-c8y-iot >}} is expected as ACKNOWLEDGED. They might vary with different servers as well. This field enables the user to configure the desired conditions (based on the information retrieved
from the event type nodes of the OPC UA server) while creating alarms via UA event mappings (this is not applicable for OPC UA data value alarm creation).
The example below shows that the keys of the map are the user-defined expressions and the value represents their corresponding desired status of the alarm. The variables that can be used in the expressions are the selected
attributes provided in the subscription definition of the device type. It can be written down either by using the relevant node names
(for example <code>EnabledState.text == 'Enabled'</code>), or the qualified browse name with namespace index (for example <code>['0:EnabledState'].text == 'Enabled'</code>).
If the variables are not provided in the subscribed attributes (uaEventMappings -> attributes), they are considered null.
If the alarm status is explicitly provided in the alarm mapping (uaEventMappings -> alarmCreation) of the device type, these alarm status mappings have no effect.
The Spring Expression Language(SpEL) has been used to parse these conditions, but only Boolean expressions are allowed.

See the **alarmStatusMappings example** below the table.

{{< c8y-admon-info >}}
There are three alarm statuses in {{< product-c8y-iot >}}, namely ACTIVE, ACKNOWLEDGED, and CLEARED. If the user-defined conditions overlap and as a result more than one alarm status is realized during the alarm creation, then the status is selected based on priority. ACTIVE has the highest priority, followed by ACKNOWLEDGED and then CLEARED status with the least priority. If the expression could not be evaluated then the gateway logs a warning and the alarm status is assumed as ACTIVE. The alarm status is also assumed as ACTIVE, if the default status is not specified, and the parameters do not match any other defined condition.
{{< /c8y-admon-info >}}

</td>
</tr>
<tr>
<td>subscribeModelChangeEvent</td>
<td>Boolean</td>
<td>no</td>
<td>The subscription to model change event can be enabled/disabled using this property. Default value is "false" (disabled),
which means any change in the address space nodes of the OPC UA server in runtime will not automatically be updated in the address space of {{< product-c8y-iot >}}.
This property must be explicitly set to "true" to detect and persist the address space changes on runtime. </td>
</tr>
<tr>
<td>validateDiscoveredEndpoints</td>
<td>Boolean</td>
<td>no</td>
<td>
The protocol stack of the OPC UA gateway validates whether the endpoint it is connecting to is present in the list of endpoints returned by the OPC UA server. By default, this validation is enabled (true). However, a setting in the server configuration can override the global gateway configuration setting, which can be configured using <code>gateway.connectivity.validateDiscoveredEndpoints</code>.

We strongly recommend you to keep this validation enabled unless there are compelling reasons to disable it. Disabling the endpoint validation should only be done when absolutely necessary.
</td>
</tr>
</tbody>
</table>

**alarmStatusMappings example**

```json
{
    "alarmStatusMappings": {
        "['0:ActiveState'].text == 'Active' and ['0:AckedState'].text != 'Acknowledged'": "ACTIVE",
        "['0:ActiveState'].text == 'Active' and ['0:AckedState'].text == 'Acknowledged'": "ACKNOWLEDGED",
        "['0:ActiveState'].text == 'Inactive'": "CLEARED",
        "default": "ACTIVE"
    }
}
```

**Alarms status changed by OPC UA server**

If events operated on the OPC UA server change their status, these changes can be reflected as internal alarms.

To catch these events and convert them into internal alarms, a UA event mapping with the alarmCreation definition in device protocol and alarmStatusMappings in server configuration are required.

For better performance an in-memory map is used to store the alarm type and the internal representation. These values are also stored on the filesystem and survive a possible crash or restart of the gateway. When the alarm is cleared then its entry is removed from the in-memory map.

The size of the map can be adjusted by several parameters in the configuration file.
With `maxEntries` you can specify the expected number of alarms at the same time, and it is hard-connected with the `maxBloatFactor`.
This factor lets you define a possible maximum of `maxEntries` to be extended. For example, a default `maxEntries` value of "100000" and 'maxBloatFactor' set to "5.0" results in a maximum of 500000 entries.
The `avarageKeySize` defines the used key size resulting from the length of the type and the external ID.
It's used to calculate the local file size bound to the entry size.
  ```yaml
  # To avoid many REST calls to the inventory an in-memory map with a crash backup functionality is included.
  alarmStatusStore:
    # Expected number of maximum alarms at the same time
    maxEntries: 100000
    # The average size of the keys on the map. Needed for calculation of the size of the database file.
    averageKeySize: 30
    # The number of maxEntries multiplied with this factor results in the real max size of the database file. Resize is done only if needed.
    maxBloatFactor: 5.0
  ```

#### Get all servers of a gateway device {#get-all-servers-of-a-gateway-device}

**Method**

`GET /service/opcua-mgmt-service/gateways/{gatewayId}/servers`

**Parameters**

<table>
<colgroup>
<col style="width: 20%;">
<col style="width: 20%;">
<col style="width: 60%;">
</colgroup>
<thead>
<tr>
<th>Field</th>
<th>Field type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>gatewayId</td>
<td>Path variable</td>
<td>Managed object ID of the gateway that should connect to the OPC UA server.</td>
</tr>
</tbody>
</table>

**Example response**

```json
[
    {
        "id": "25197",
        "gatewayId": "800",
        "name": "My OPC UA server",
        "requiredInterval": 1,
        "config": {
            "securityMode": "NONE",
            "serverUrl": "opc.tcp://127.0.0.1:12686/CumulocityOPCUAServer",
            "userIdentityMode": "Anonymous",
            "timeout": 30,
            "autoReconnect": true,
            "statusCheckInterval": 40,
            "targetConnectionState": "enabled"
        },
        "namespaceTable": [
            "http://opcfoundation.org/UA/",
            "urn:cumulocity:opcua:test:server:ee8ff646-cc83-4a1f-ad29-97356c496ef0",
            "urn:cumulocity:opcua:test:server"
        ],
        "c8y_Availability": {
            "lastMessage": "2020-08-27T12:43:22.585+0000",
            "status": "UNAVAILABLE"
        },
        "c8y_Connection": {
            "status": "DISCONNECTED"
        },
        "c8y_RequiredAvailability": {
            "responseInterval": 1
        }
    }
]
```

#### Delete and disconnect an OPC UA server {#delete-and-disconnect-an-opc-ua-server}

**Endpoint**

`DELETE /service/opcua-mgmt-service/servers/{serverId}`

**Description**

Delete the OPC UA server managed object. Once the DELETE request is received by the OPC UA management service, the specified server along with all its address space nodes created in the {{< product-c8y-iot >}} platform will be deleted.
The service will retain all the child devices of the server, and their corresponding data, which were created by the device protocols.

**Parameters**

<table>
<colgroup>
<col style="width: 20%;">
<col style="width: 20%;">
<col style="width: 60%;">
</colgroup>
<thead>
<tr>
<th>Field</th>
<th>Field type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>serverId</td>
<td>Path variable</td>
<td>Managed object ID of the OPC UA server.</td>
</tr>
</tbody>
</table>

**Response**

`200 OK`

### Address space resources {#address-space-resources}

#### Get an address space node by ID {#get-an-address-space-node-by-id}

**Endpoint**

`GET /service/opcua-mgmt-service/servers/{serverId}/address-spaces/get`

**Description**

Get a node in the server address space specified by the given node ID. The node ID must be URL encoded.

**Parameters**

<table>
<colgroup>
<col style="width: 20%;">
<col style="width: 20%;">
<col style="width: 60%;">
</colgroup>
<thead>
<tr>
<th>Parameter</th>
<th>Parameter Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>serverId</td>
<td>Path variable</td>
<td>Integer, mandatory. OPC UA server managed object ID.</td>
</tr>
<tr>
<td>nodeId</td>
<td>Query param</td>
<td>Mandatory. Node ID of the node to get.</td>
</tr>
<tr>
<td>withUri</td>
<td>Query param</td>
<td>Boolean, default is false. Whether the result should use address space URI instead of index.</td>
</tr>
</tbody>
</table>

**Example**

Endpoint: `GET /service/opcua-mgmt-service/servers/10/address-spaces/get?nodeId=i%3D84`

```json
{
    "nodeId": "i=84",
    "nodeClass": 1,
    "nodeClassName": "Object",
    "browseName": "0:Root",
    "browsePath": null,
    "displayName": "Root",
    "description": "The root of the server address space.",
    "references": [
        {
            "referenceId": "i=35",
            "targetId": "i=87",
            "referenceLabel": "Organizes",
            "targetLabel": "Views",
            "targetBrowseName": "Views",
            "inverse": false,
            "hierarchical": true
        },
        {
            "referenceId": "i=40",
            "targetId": "i=61",
            "referenceLabel": "HasTypeDefinition",
            "targetLabel": "FolderType",
            "targetBrowseName": "FolderType",
            "inverse": false,
            "hierarchical": false
        }
    ],
    "attributes": {
        "eventNotifier": 0
    },
    "absolutePaths": [
        [
            "0:Root"
        ]
    ],
    "ancestorNodeIds": [
        []
    ]
}
```

#### Get children of a given node {#get-children-of-a-given-node}

**Endpoint**

`GET /service/opcua-mgmt-service/servers/{serverId}/address-spaces/children`

**Description**

Get all child nodes of the given node specified by the node ID in the server address space. The node ID must be properly URL encoded.

**Parameters**

<table>
<colgroup>
<col style="width: 20%;">
<col style="width: 20%;">
<col style="width: 60%;">
</colgroup>
<thead>
<tr>
<th>Parameter</th>
<th>Parameter Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>serverId</td>
<td>Path variable</td>
<td>Integer, mandatory. OPC UA server managed object ID.</td>
</tr>
<tr>
<td>nodeId</td>
<td>Query param</td>
<td>Mandatory. Node ID of the node to get.</td>
</tr>
<tr>
<td>withUri</td>
<td>Query param</td>
<td>Boolean, default is false. Whether the result should use address space URI instead of index.</td>
</tr>
</tbody>
</table>

**Example**

Endpoint: `GET /service/opcua-mgmt-service/servers/10/address-spaces/children?nodeId=i%3D84`

```json
[
    {
        "nodeId": "i=86",
        "nodeClass": 1,
        "nodeClassName": "Object",
        "browseName": "0:Types",
        "browsePath": null,
        "displayName": "Types",
        "description": "The browse entry point when looking for types in the server address space.",
        "references": [
            {
                "referenceId": "i=40",
                "targetId": "i=61",
                "referenceLabel": "HasTypeDefinition",
                "targetLabel": "FolderType",
                "targetBrowseName": "FolderType",
                "inverse": false,
                "hierarchical": false
            },
            {
                "referenceId": "i=35",
                "targetId": "i=86",
                "referenceLabel": "OrganizedBy",
                "targetLabel": "Types",
                "targetBrowseName": "Types",
                "inverse": true,
                "hierarchical": true
            }
        ],
        "attributes": {
            "eventNotifier": 0
        },
        "absolutePaths": [
            [
                "0:Root",
                "0:Types"
            ]
        ],
        "ancestorNodeIds": [
            [
                "i=84"
            ]
        ]
    }
]
```

#### Browse a node {#browse-a-node}

**Endpoint**

`GET /service/opcua-mgmt-service/servers/{serverId}/address-spaces/browse`

**Description**

Browse a node from a base node following the given browse path. This basically searches for a node with relative browse path to the other node.

**Parameters**

<table>
<colgroup>
<col style="width: 20%;">
<col style="width: 20%;">
<col style="width: 60%;">
</colgroup>
<thead>
<tr>
<th>Parameter</th>
<th>Parameter Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>serverId</td>
<td>Path variable</td>
<td>Integer, mandatory. OPC UA server managed object ID.</td>
</tr>
<tr>
<td>nodeId</td>
<td>Query param</td>
<td>Node ID of the node to browse from. Default is root node (i=84).</td>
</tr>
<tr>
<td>browsePath</td>
<td>Query param</td>
<td>Mandatory. Browse path to browse from the give node. Browse path can be a single param or an array to represent a path from the given node to the target node. To specify the browsePath as an array, repeat the browsePath query. Example: <code>.../browse?browsePath=L1&amp;browsePath=L2</code>.</td>
</tr>
<tr>
<td>withUri</td>
<td>Query param</td>
<td>Boolean, default is false. Whether the result should use address space URI instead of index.</td>
</tr>
</tbody>
</table>

**Example**

Endpoint: `GET /service/opcua-mgmt-service/servers/10/address-spaces/browse?nodeId=i%3D84&browsePath=Objects`

```json
[
    {
        "nodeId": "i=85",
        "nodeClass": 1,
        "nodeClassName": "Object",
        "browseName": "0:Objects",
        "browsePath": null,
        "displayName": "Objects",
        "description": "The browse entry point when looking for objects in the server address space.",
        "references": [
            {
                "referenceId": "i=35",
                "targetId": "i=2253",
                "referenceLabel": "Organizes",
                "targetLabel": "Server",
                "targetBrowseName": "Server",
                "inverse": false,
                "hierarchical": true
            },
            {
                "referenceId": "i=35",
                "targetId": "ns=2;s=Cumulocity",
                "referenceLabel": "Organizes",
                "targetLabel": "Cumulocity",
                "targetBrowseName": "2:Cumulocity",
                "inverse": false,
                "hierarchical": true
            }
        ],
        "attributes": {
            "eventNotifier": 0
        },
        "absolutePaths": [
            [
                "0:Root",
                "0:Objects"
            ]
        ],
        "ancestorNodeIds": [
            [
                "i=84"
            ]
        ]
    }
]
```

### Device type resources {#device-type-resources}

These resources provide the APIs for manipulating device types.

#### Creating a new device type {#creating-a-new-device-type}

**Endpoint**

`POST /service/opcua-mgmt-service/device-types`

**Sample payloads**

- Measurement mappings using subscription

  ```json
  {
      "name": "My device type",
      "enabled": true,
      "mappings": [
          {
              "browsePath": [
                  "2:Dynamic",
                  "2:Double"
              ],
              "measurementCreation": {
                  "unit": "T",
                  "type": "MyMeasurementType",
                  "fragmentName": "MyMeasurement",
                  "series": "MySeries"
              }
          }
      ],
      "subscriptionType": {
          "type": "Subscription",
          "subscriptionParameters": {
              "samplingRate": 5000
          }
      }
  }
  ```
* Event mappings using cyclic read

  ```json
  {
      "name": "My device type",
      "enabled": true,
      "mappings": [
          {
              "browsePath": [
                  "2:Dynamic",
                  "2:Integer"
              ],
              "eventCreation": {
                  "type": "MyEventType",
                  "text": "My event with value ${value}"
              }
          }
      ],
      "subscriptionType": {
          "type": "Cyclicread",
          "rate": 5000
      }
  }
  ```

* Alarm mappings using subscription

  ```json
  {
      "name": "My device type",
      "enabled": true,
      "mappings": [
          {
              "browsePath": [
                  "2:Dynamic",
                  "2:Boolean"
              ],
              "alarmCreation": {
                  "type": "MyAlarm",
                  "severity": "MAJOR",
                  "text": "Heads up, the level is high!"
              }
          }
      ],
      "subscriptionType": {
          "type": "Subscription",
          "subscriptionParameters": {
              "samplingRate": 5000
          }
      }
  }
  ```

* UA events mappings into alarm and event

  ```json
  {
      "name": "My device type",
      "enabled": true,
      "uaEventMappings": [
          {
              "browsePath": [
                  "Server"
              ],
              "eventTypeId": "i=2041",
              "attributes": [
                  "Message",
                  "Severity"
              ],
              "alarmCreation": {
                  "text": "ALARM! message: ${0}",
                  "severity": "MAJOR",
                  "status": "ACTIVE",
                  "type": "c8y_myEvent_alarm_${1}"
              }
          }
      ]
  }
  ```

Full payload data structure explained:

<table>
<colgroup>
<col style="width: 25%;">
<col style="width: 20%;">
<col style="width: 10%;">
<col style="width: 45%;">
</colgroup>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Mandatory</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>name</td>
<td>string</td>
<td>yes</td>
<td>Device type name.</td>
</tr>
<tr>
<td>enabled</td>
<td>Boolean</td>
<td>no</td>
<td>Whether the device type is enabled and should be applied to the connected servers or not. Default is false.</td>
</tr>
<tr>
<td>description</td>
<td>string</td>
<td>no</td>
<td></td>
</tr>
<tr>
<td>mappings</td>
<td>array&lt;<em>Mapping</em>&gt;</td>
<td>no</td>
<td>Define the mappings from OPC UA data into {{< product-c8y-iot >}} measurements, events and alarms.</td>
</tr>
<tr>
<td>uaMappings</td>
<td>array&lt;<em>UAMapping</em>&gt;</td>
<td>no</td>
<td>Define the mappings from OPC UA alarms and events into {{< product-c8y-iot >}} alarms and events.</td>
</tr>
<tr>
<td>referencedNamespaceTable</td>
<td>array<string></string></td>
<td>no</td>
<td>Reference namespace table if known. This is then used to convert the browse paths with namespace index into namespace URL. This is to make sure that the mappings are still the same even when the namespace index gets changed.</td>
</tr>
<tr>
<td>subscriptionType</td>
<td><em>SubscriptionType</em></td>
<td>no</td>
<td>Define the mechanism how to collect data from the OPC UA servers. There are two mechanisms that can be used: Cyclic read and subscription. This is not mandatory however if the device type is enabled and no subscription type is specified, the device will not be applied to any node.</td>
</tr>
<tr>
<td>processingMode</td>
<td>string</td>
<td>no</td>
<td>Define the {{< product-c8y-iot >}} processing mode for incoming data. Refer to <a href="https://{{< domain-c8y >}}/api/core/#section/REST-implementation/HTTP-usage"> <b>HTTP usage > Process mode</b></a> in the {{< openapi >}} for more information. Possible values: PERSISTENT, TRANSIENT, QUIESCENT, CEP. Default is PERSISTENT. Note that for the alarm mappings, only the PERSISTENT mode is supported regardless what is being given here.</td>
</tr>
<tr>
<td>overiddenSubscriptions</td>
<td><em>OverriddenSubscription</em></td>
<td>no</td>
<td>While the subscriptionType defines how data can be collected from the OPC UA server, this option allows you to override the mechanism for particular browse paths. For example you can have a subscription applied globally with a sampling rate of 1000ms but you can apply sampling rate of 500ms for particular browse paths.</td>
</tr>
<tr>
<td>applyConstraints</td>
<td><em>ApplyConstraint</em></td>
<td>no</td>
<td>Limit the places in the address space where the device type should be applied.</td>
</tr>
</tbody>
</table>

**Data structure for *Mapping***

<table>
<colgroup>
<col style="width: 20%;">
<col style="width: 20%;">
<col style="width: 10%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Mandatory</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>name</td>
<td>string</td>
<td>no</td>
<td></td>
</tr>
<tr>
<td>browsePath</td>
<td>array<string></string></td>
<td>yes</td>
<td>The browse path. The path can be the exact browse path or a regular expression of the browse path. Each browse path in the list of mappings must be unique. Duplication is not allowed by the API. If it is a regular expression, it must be wrapped inside *regex(...)*. For example: `regex(2:Objects)` or `regex(urn:test.namespace:Objects\\d)`. Note that the namespace index and the namespace URI are not part of the regular expression itself but they will be quoted as literal strings. When using a regular expression, keep in mind that it might be matching many nodes in the address space and resulting in unexpected incoming data. Our recommendation is to use it with great care and together with other exact browse paths in the same mapping if possible. For example, `&#91;"2:Objects", "regex(2:MyDevice\\d)", "..."&#93;`</td>
</tr>
<tr>
<td>measurementCreation</td>
<td><em>MeasurementCreation</em></td>
<td>no</td>
<td>Mappings for measurement.</td>
</tr>
<tr>
<td>eventCreation</td>
<td><em>EventCreation</em></td>
<td>no</td>
<td>Mappings for event.</td>
</tr>
<tr>
<td>alarmCreation</td>
<td><em>AlarmCreation</em></td>
<td>no</td>
<td>Mappings for alarm. If the value of the mapped resource is "true" (in case of Boolean), or a positive number (in case of integer/double), then the alarms are created in ACTIVE state.
The alarm de-duplication prevents the creation of multiple alarms with the same source and type, thereby only incrementing the count of the existing alarm. The alarms will be CLEARED as soon as the value
is changed to "false", or a number that is less than or equals to 0.</td>
</tr>
<tr>
<td>customAction</td>
<td><em>HttpPostAction</em></td>
<td>no</td>
<td>Mappings for custom action. Only HTTP POST is supported so far.</td>
</tr>
</tbody>
</table>

**Data structure for *UAMapping***

<table>
<colgroup>
<col style="width: 20%;">
<col style="width: 20%;">
<col style="width: 10%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Mandatory</th>
<th>Description</th>
</thead>
<tbody>
<tr>
<td>browsePath</td>
<td>array<string></string></td>
<td>yes</td>
<td>The browse path.</td>
</tr>
<tr>
<td>eventTypeId</td>
<td>string</td>
<td>yes</td>
<td>The event type ID.</td>
</tr>
<tr>
<td>attributes</td>
<td>array</td>
<td>yes</td>
<td>Selectable event attributes. The nodeId of the event source
is added by default as the last selected attribute by
the OPC UA device gateway.
If <em>alarmSeverityMappings</em> are defined, also the <em>Severity</em> attribute must be added to the attributes.
If <em>alarmStatusMappings</em> are defined, also the variables used in the expression must be added to the attributes.
</td>
</tr>
<tr>
<td>eventCreation</td>
<td><em>UAEventCreation</em></td>
<td>no</td>
<td>Mappings for event.</td>
</tr>
<tr>
<td>alarmCreation</td>
<td><em>UAAlarmCreation</em></td>
<td>no</td>
<td>Mappings for alarm.</td>
</tr>
</tbody>
</table>

**Data structure for *SubscriptionType***

<table>
<colgroup>
<col style="width: 20%;">
<col style="width: 20%;">
<col style="width: 10%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Mandatory</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>type</td>
<td>string</td>
<td>yes</td>
<td>Subscription type. Possible values: Subscription, CyclicRead, None.</td>
</tr>
<tr>
<td>subscriptionParameters</td>
<td><em>SubscriptionParameter</em></td>
<td>yes/no</td>
<td>In case the subscription type is <em>Subscription</em>, this is required. This defines the OPC UA subscription configuration, such as sampling rate, queue size, and more.</td>
</tr>
<tr>
<td>cyclicReadParameters</td>
<td><em>CyclicReadParameter</em></td>
<td>yes/no</td>
<td>In case the subscription type is <em>CyclicRead</em>, this is required. This defines the cyclic read configuration, such as rate.</td>
</tr>
</tbody>
</table>

**Data structure for *OverriddenSubscription***

<table>
<colgroup>
<col style="width: 25%;">
<col style="width: 15%;">
<col style="width: 10%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Mandatory</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>browsePath</td>
<td>array<string></string></td>
<td>yes</td>
<td>The browse path.</td>
</tr>
<tr>
<td>subscriptionType</td>
<td><em>SubscriptionType</em></td>
<td>yes</td>
<td>The custom subscription type that overrides the global one.</td>
</tr>
</tbody>
</table>

**Data structure for *ApplyConstraints***

<table>
<colgroup>
<col style="width: 25%;">
<col style="width: 15%;">
<col style="width: 10%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Mandatory</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>matchesServerIds</td>
<td>array<string></string></td>
<td>no</td>
<td>Limit the servers by server managed object ID where the device type should be applied.</td>
</tr>
<tr>
<td>serverObjectHasFragment</td>
<td>string</td>
<td>no</td>
<td>Limit the servers by their custom fragment where the device type should be applied.</td>
</tr>
<tr>
<td>matchesNodeIds</td>
<td>array<string></string></td>
<td>no</td>
<td>Limit the nodes in the server address space where the device type should be applied.</td>
</tr>
<tr>
<td>browsePathMatchesRegex</td>
<td>string</td>
<td>no</td>
<td>Regular expression of the browse paths where the device type should be applied.</td>
</tr>
<tr>
<td>serverHasNodeWithValues</td>
<td><em>ServerNodeValues</em></td>
<td>no</td>
<td>Limit the servers which have particular nodes with given values.</td>
</tr>
</tbody>
</table>

**Data structure for *MeasurementCreation***

<table>
<colgroup>
<col style="width: 25%;">
<col style="width: 15%;">
<col style="width: 10%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Mandatory</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>type</td>
<td>string</td>
<td>yes</td>
<td>Measurement type.</td>
</tr>
<tr>
<td>series</td>
<td>string</td>
<td>no</td>
<td>Measurement series. If this is omitted, it will be automatically generated by the gateway.</td>
</tr>
<tr>
<td>unit</td>
<td>string</td>
<td>yes</td>
<td>Measurement unit.</td>
</tr>
<tr>
<td>fragmentName</td>
<td>string</td>
<td>no</td>
<td>Measurement fragment name. If this is omitted, it will be automatically generated by the gateway.</td>
</tr>
<tr>
<td>staticFragments</td>
<td>array<string></string></td>
<td>no</td>
<td>Static fragments that should be populated to the measurement.</td>
</tr>
<tr>
<td>overriddenProcessingMode</td>
<td>string</td>
<td>no</td>
<td>Custom processing mode applied to the measurement to be created. Possible values: PERSISTENT, TRANSIENT, QUIESCENT, CEP. Default: PERSISTENT.</td>
</tr>
</tbody>
</table>

**Data structure for *EventCreation***

<table>
<colgroup>
<col style="width: 25%;">
<col style="width: 15%;">
<col style="width: 10%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Mandatory</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>type</td>
<td>string</td>
<td>yes</td>
<td>Event type.</td>
</tr>
<tr>
<td>text</td>
<td>string</td>
<td>yes</td>
<td>Event text. This event text can be parameterized by the value of the subscribed node by using the placeholder: <code>${value}</code>.</td>
</tr>
<tr>
<td>staticFragments</td>
<td>array<string></string></td>
<td>no</td>
<td>Static fragments that should be populated to the measurement.</td>
</tr>
<tr>
<td>overriddenProcessingMode</td>
<td>string</td>
<td>no</td>
<td>Custom processing mode applied to the event to be created. Possible values: PERSISTENT, TRANSIENT, QUIESCENT, CEP. Default: PERSISTENT.</td>
</tr>
</tbody>
</table>

**Data structure for *AlarmCreation***

<table>
<colgroup>
<col style="width: 25%;">
<col style="width: 15%;">
<col style="width: 10%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Mandatory</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>type</td>
<td>string</td>
<td>yes</td>
<td>Alarm type.</td>
</tr>
<tr>
<td>text</td>
<td>string</td>
<td>yes</td>
<td>Alarm text.</td>
</tr>
<tr>
<td>severity</td>
<td>string</td>
<td>yes</td>
<td>Alarm severity. Possible values: WARNING, MINOR, MAJOR, CRITICAL.</td>
</tr>
<tr>
<td>staticFragments</td>
<td>array<string></string></td>
<td>no</td>
<td>Static fragments that should be populated to the alarm.</td>
</tr>
<tr>
<td>overriddenProcessingMode</td>
<td>string</td>
<td>no</td>
<td>Custom processing mode applied to the alarm to be created. Possible values: PERSISTENT.</td>
</tr>
</tbody>
</table>

**Data structure for *HttpPostAction***

<table>
<colgroup>
<col style="width: 20%;">
<col style="width: 20%;">
<col style="width: 15%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Mandatory</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>endpoint</td>
<td>string</td>
<td>yes</td>
<td>Endpoint of the HTTP POST request.</td>
</tr>
<tr>
<td>headers</td>
<td>map&lt;string, string&gt;</td>
<td>no</td>
<td>HTTP headers of the HTTP request.</td>
</tr>
<tr>
<td>bodyTemplate</td>
<td>string</td>
<td>yes</td>
<td>Template of the request body. This can be parameterized by the following placeholders:<br><code>${value}</code>: Data value of the OPC UA node.&nbsp;<br><code>${serverId}</code>: OPC UA server managed object ID.<br><code>${nodeId}</code>: ID of the node where the data is coming from.<br><code>${deviceId}</code>: Managed object ID of the source manage object.</td>
</tr>
<tr>
<td>retryEnabled</td>
<td>Boolean</td>
<td>no</td>
<td>Whether a failed HTTP POST should be retried or not. This overrides the configuration in the gateway. If this is not provided, the configuration in the gateway will be taken.</td>
</tr>
<tr>
<td>noRetryHttpCodes</td>
<td>array&lt;integer&gt;</td>
<td>no</td>
<td>Array of HTTP POST status exceptions by which the failed HTTP POST should not be retried if enabled. Example: [400, 500]. Note that, if this is null or missing, the exceptions will be taken from the gateway configuration. If this is provided, even with an empty array, the configuration in the gateway is disregarded.</td>
</tr>
</tbody>
</table>

**Data structure for *UAEventCreation***

This has exactly the same fields as *EventCreation*, however the *text* and *type* field can be parameterized with different parameters.

<table>
<colgroup>
<col style="width: 15%;">
<col style="width: 15%;">
<col style="width: 10%;">
<col style="width: 60%;">
</colgroup>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Mandatory</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>text</td>
<td>string</td>
<td>yes</td>
<td>Event text. This event text can be parameterized by the data value of selected attributes. Put <code>${i}</code>&nbsp;to parameterize it by the data value of attribute at index <code>i</code>. The index starts from 0, so put <code>${0}</code>&nbsp;to take the first attribute, <code>${1}</code>&nbsp;to select second attribute, and so on.</td>
</tr>
<tr>
<td>type</td>
<td>string</td>
<td>yes</td>
<td>Event type. This event type can be parameterized by the data value of selected attributes. Put <code>${i}</code> to parameterize it by the data value of attribute at index <code>i</code>. The index starts from 0, so put <code>${0}</code> to take the first attribute, <code>${1}</code> to select second attribute, and so on.</td>
</tr>
</tbody>
</table>

**Data structure for *UAAlarmCreation***

<table>
<colgroup>
<col style="width: 15%;">
<col style="width: 15%;">
<col style="width: 10%;">
<col style="width: 60%;">
</colgroup>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Mandatory</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>text</td>
<td>string</td>
<td>yes</td>
<td>Alarm text. This alarm text can be parameterized by the data value of selected attributes. Put <code>${i}</code>&nbsp;to parameterize it by the data value of attribute at index <code>i</code>. The index starts from 0, so put <code>${0}</code>&nbsp;to take the first attribute, <code>${1}</code>&nbsp;to select second attribute, and so on.</td>
</tr>
<tr>
<td>type</td>
<td>string</td>
<td>yes</td>
<td>Alarm type. This alarm type can be parameterized by the data value of selected attributes. Put <code>${i}</code> to parameterize it by the data value of attribute at index <code>i</code>. The index starts from 0, so put <code>${0}</code> to take the first attribute, <code>${1}</code> to select second attribute, and so on.</td>
</tr>
<tr>
<td>severity</td>
<td>string</td>
<td>no</td>
<td>For UAAlarmCreation, the severity is optional. If this is not provided, the severity of the alarm will be mapped using the severity mappings specified in the default gateway configuration YAML file or in the server configuration.</td>
</tr>
<tr>
<td>status</td>
<td>string</td>
<td>no</td>
<td>Alarm status. The possible values are ACTIVE, ACKNOWLEDGED, CLEARED. If this is given, the <em>alarmStatusMappings</em> setting in <em>ServerConnectionConfig</em> is ignored.</td>
</tr>
</tbody>
</table>

**Data structure for *SubscriptionParameter***

<table>
<colgroup>
<col style="width: 20%;">
<col style="width: 15%;">
<col style="width: 15%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Mandatory</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>samplingRate</td>
<td>integer</td>
<td>yes</td>
<td>Subscription sampling rate in milliseconds. Minimum allowed value is 50.</td>
</tr>
<tr>
<td>deadbandType</td>
<td>string</td>
<td>no</td>
<td>Possible values: Percent, Absolute.</td>
</tr>
<tr>
<td>deadbandValue</td>
<td>double</td>
<td>no</td>
<td>If the&nbsp;<em>deadbandType</em>&nbsp;is <em>Percent</em>, this ranges from 0 to 100. If the <em>deadbandType</em>&nbsp;is <em>Absolute</em>, this can be any double value.</td>
</tr>
<tr>
<td>queueSize</td>
<td>integer</td>
<td>no</td>
<td>Subscription queue size.</td>
</tr>
<tr>
<td>dataChangeTrigger</td>
<td>string</td>
<td>no</td>
<td>Default value is StatusValue. Possible values:&nbsp;Status, StatusValue, StatusValueTimestamp.</td>
</tr>
<tr>
<td>discardOldest</td>
<td>Boolean</td>
<td>no</td>
<td>Default is true. When this is true and the reported data is exceeding the queue size, the oldest elements in the queue will be discarded. If this is false, the newer elements will be discarded.</td>
</tr>
<tr>
<td>ranges</td>
<td>string</td>
<td>no</td>
<td>When the subcribed node is array type, you can provide the data range you want to get. For example: <em>"0:3"</em> to get elements from index 0 to 3 from the array.</td>
</tr>
</tbody>
</table>

**Data structure for *CyclicParameter***

<table>
<colgroup>
<col style="width: 20%;">
<col style="width: 15%;">
<col style="width: 15%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Mandatory</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>rate</td>
<td>integer</td>
<td>yes</td>
<td>Cyclic read rate in milliseconds. Minimum allowed value is 50.</td>
</tr>
</tbody>
</table>

**Data structure for *ServerNodeValues***

<table>
<colgroup>
<col style="width: 20%;">
<col style="width: 15%;">
<col style="width: 15%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Mandatory</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>matchAll</td>
<td>array<matchingnode></matchingnode></td>
<td>no</td>
<td>A collection of conditions and they must all be matched.</td>
</tr>
<tr>
<td>matchOneOf</td>
<td>array<matchingnode></matchingnode></td>
<td>no</td>
<td>A collection of conditions and at least one of them must be matched.</td>
</tr>
</tbody>
</table>

**Data structure for *MatchingNode***


<table>
<colgroup>
<col style="width: 20%;">
<col style="width: 15%;">
<col style="width: 15%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Mandatory</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>nodeId</td>
<td>string</td>
<td>yes</td>
<td>The node ID to match against.</td>
</tr>
<tr>
<td>valueMatchesOneOf</td>
<td>array<string></string></td>
<td>no</td>
<td>A collection of possible values of the node, in string representation. If this is omitted, the gateway only checks for the existence of the node by given node ID.</td>
</tr>
</tbody>
</table>

####  {#}

#### Get all OPC UA device types {#get-all-opc-ua-device-types}

**Endpoint**

`GET /service/opcua-mgmt-service/device-types`

**Payload**

The endpoint returns a JSON array of all OPC UA device types.

#### Get a single device type {#get-a-single-device-type}

**Endpoint**

`GET /service/opcua-mgmt-service/device-types/{deviceTypeId}`

**Payload**

A JSON representation of the device type with the given ID if it exists. If not, an error message is returned.

**Response codes**

`200 OK`

`404 Not found`

#### Updating a device type {#updating-a-device-type}

**Endpoint**

`PUT /service/opcua-mgmt-service/device-types/{deviceTypeId}`

**Payload**

The payload of updating a device type is exactly the same as the payload of creating it. Please note that partial update is not supported. All information must be provided in the update request and will completely override the existing device type.

#### Deleting a device type {#deleting-a-device-type}

**Endpoint**

`DELETE /service/opcua-mgmt-service/device-types/{deviceTypeId}`

**Success response**

`204 No Content`
