---
title: Manage the OPC UA servers of a gateway
description: Check an OPC UA gateway, connect an OPC UA server to it, list, read, and update its servers, and delete a server with the OPC UA management service.
when: "the user wants to connect an OPC UA server to a gateway, or list, update, or delete the servers of a gateway"
weight: 600
requires:
  - authentication
api:
  - operation: getManagedObjectResource
    method: GET
    path: /inventory/managedObjects/{id}
    title: Retrieve a specific managed object
---

The OPC UA device gateway connects {{< product-c8y-iot >}} to one or more OPC UA servers. The gateway registers itself as a device. You then tell the gateway which servers to connect to with the REST API of the OPC UA management service, see [REST APIs](/device-integration/opcua/#rest-api).

The skill works with the following managed objects:

* **Gateway**: A managed object of type `c8y_OPCUA_Device_Agent`. The gateway creates it when it registers as a device.
* **Server**: A managed object of type `c8y_OpcuaServer`. It is a child device of the gateway and contains the connection configuration in the fragment `c8y_ua_ClientConfig`. After the gateway reports the connection status, the server also contains `c8y_Availability` and `c8y_Connection` with the status CONNECTED or DISCONNECTED.

Requests to the OPC UA management service go to `/service/opcua-mgmt-service`. Your tenant must be subscribed to the "opcua-mgmt-service" microservice. Otherwise, the requests return HTTP 403 with the error `Microservice/Access Denied`.

The OPC UA management service does not support partial updates. When you update a server, the configuration that you send replaces the stored configuration completely.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To check the gateway: ROLE_INVENTORY_READ
* To list and read servers: ROLE_OPCUA_SERVICE_READ
* To connect, update, and delete servers: ROLE_OPCUA_SERVICE_ADMIN
{{< /c8y-admon-req >}}

The examples use `<gateway_id>` for the managed object ID of the gateway and `<server_id>` for the managed object ID of an OPC UA server. Use the IDs, not the names of the devices.

### To check the gateway {#to-check-the-gateway}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<gateway_id>
```

The platform returns HTTP 200 and the managed object. Check that its `type` is `c8y_OPCUA_Device_Agent`. If the type is different, the managed object is not an OPC UA gateway. If the platform returns HTTP 404, the managed object does not exist.

### To connect an OPC UA server to the gateway {#to-connect-an-opc-ua-server-to-the-gateway}

Send a request to the OPC UA management service, see [Connect a new OPC UA server to the gateway](/device-integration/opcua/#connect-a-new-opc-ua-server-to-the-gateway):

```http
POST /service/opcua-mgmt-service/gateways/<gateway_id>/servers
Content-Type: application/json
Accept: application/json

{
  "name": "My OPC UA server",
  "config": {
    "securityMode": "NONE",
    "serverUrl": "opc.tcp://127.0.0.1:53530/OPCUA/SimulationServer",
    "autoScanAddressSpace": true
  }
}
```

The request has the following properties:

* `name`: The name of the server managed object. Mandatory.
* `config.securityMode`: How the gateway secures the connection. Mandatory. One of NONE, BASIC128RSA15_SIGN, BASIC128RSA15_SIGN_ENCRYPT, BASIC256_SIGN, BASIC256_SIGN_ENCRYPT, BASIC256SHA256_SIGN, and BASIC256SHA256_SIGN_ENCRYPT. See [Security modes](/device-integration/opcua/#security-modes).
* `config.serverUrl`: The URL of the OPC UA server. Mandatory. The scheme must be `opc.tcp`, `http`, or `https`.
* `config.autoScanAddressSpace`: If `true`, the gateway scans the address space of the server when it connects for the first time. The default is `true`.
* `config.userIdentityMode`: How the gateway authenticates with the OPC UA server. `Anonymous` is the default. With `UserName`, also send `userName` and `userPassword`. With `Certificate`, also send `keystoreBinaryId`, `keystorePass`, and `certificatePass`. See [Authentication](/device-integration/opcua/#authentication).

Do not send an `id` when you connect a new server. For further settings, for example `autoReconnect`, `statusCheckInterval`, and `targetConnectionState`, see the data structure for ServerConnectionConfig in [Connect a new OPC UA server to the gateway](/device-integration/opcua/#connect-a-new-opc-ua-server-to-the-gateway).

The service returns HTTP 200 and the server with its `id` and `"gatewayId": "<gateway_id>"`. Note the `id` as `<server_id>`.

If the service returns HTTP 404 with the message "Gateway managed object not found", the gateway does not exist. If it returns HTTP 400 with the error `INVALID_PARAMETERS`, the body is not valid. For example, `name`, `config`, `securityMode`, or `serverUrl` is missing, the `serverUrl` has another scheme, or `requiredInterval` is not a positive number.

### To list the servers of a gateway {#to-list-the-servers-of-a-gateway}

Send a request to the OPC UA management service, see [Get all servers of a gateway device](/device-integration/opcua/#get-all-servers-of-a-gateway-device):

```http
GET /service/opcua-mgmt-service/gateways/<gateway_id>/servers
```

The service returns HTTP 200 and an array with one entry per server. Each entry contains the `id`, the `name`, and the `config` of the server. After the gateway connects to the server, the entry also contains the `namespaceTable` of the server, `c8y_Availability`, and `c8y_Connection`.

If `c8y_Connection.status` is DISCONNECTED, or `c8y_Connection` is missing, the gateway is offline or is not connected to the OPC UA server yet. The service stores the server configuration anyway. If the service returns HTTP 404, the gateway does not exist.

### To read a server {#to-read-a-server}

Send a request to the OPC UA management service:

```http
GET /service/opcua-mgmt-service/servers/<server_id>
```

The service returns HTTP 200 and the server with its `id`, `gatewayId`, `name`, and `config`.

If the service returns HTTP 404, check the message:

* **Server managed object not found**: The server does not exist.
* **Gateway managed object not found**: The server exists, but none of its parent devices is a managed object of type `c8y_OPCUA_Device_Agent`.

### To update a server {#to-update-a-server}

To update a server, send the request that connects a server again, with the `id` of the server and the complete configuration:

```http
POST /service/opcua-mgmt-service/gateways/<gateway_id>/servers
Content-Type: application/json
Accept: application/json

{
  "id": "<server_id>",
  "name": "My OPC UA server",
  "config": {
    "securityMode": "NONE",
    "serverUrl": "opc.tcp://127.0.0.1:53530/OPCUA/SimulationServer",
    "autoScanAddressSpace": true,
    "targetConnectionState": "disabled"
  }
}
```

The example disables the connection to the OPC UA server with `"targetConnectionState": "disabled"`. The configuration that you send replaces the stored configuration completely. Read the server first and send all settings that you want to keep. Only `userPassword` is an exception: if you do not send it, the service keeps the stored password.

The service returns HTTP 200 and the updated server.

### To delete a server {#to-delete-a-server}

Send a request to the OPC UA management service, see [Delete and disconnect an OPC UA server](/device-integration/opcua/#delete-and-disconnect-an-opc-ua-server):

```http
DELETE /service/opcua-mgmt-service/servers/<server_id>
```

The service returns HTTP 200 without a body. It deletes the server managed object and all address space nodes of the server in the background, so the deletion can take a while. It keeps the child devices that device protocols create for the server, and their data. Delete these child devices separately, see [Deletion of gateway](/device-integration/opcua/#deletion-of-gateway).

If the service returns HTTP 404, the server is already deleted.
