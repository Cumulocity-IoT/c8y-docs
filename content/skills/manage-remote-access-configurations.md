---
title: Manage remote access endpoints of a device
description: List, create, read, update, and delete the Cloud Remote Access endpoint configurations of a device, so that users can connect to SSH, Telnet, VNC, and passthrough services behind the device.
weight: 730
sector:
  - device_management
requires:
  - authentication
api:
  - operation: getManagedObjectResource
    method: GET
    path: /inventory/managedObjects/{id}
    title: Retrieve a specific managed object
---

With Cloud Remote Access, users connect to a service in the local network of a device, for example an SSH server, through the device. An endpoint configuration describes one such service: its host, its port, the protocol, and the credentials. The Cloud Remote Access microservice stores the configurations in the `c8y_RemoteAccessList` fragment of the device managed object. You manage them with the REST endpoints of the microservice at `/service/remoteaccess`, see [Cloud Remote Access API](/cloud-remote-access/cra-api/).

Creating a configuration does not open a connection. A user or client connects to a configuration later, see [Client implementation](/cloud-remote-access/cra-api/#client-implementation). To generate SSH keys or store the host key of an SSH server, see [Manage SSH keys for Cloud Remote Access](/skills/manage-remote-access-keys/).

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To list, read, create, update, and delete endpoint configurations: ROLE_REMOTE_ACCESS_ADMIN
* To configure endpoints in the Device Management application: ADMIN permission for "Remote access" and "Device control"
* To read the device: ROLE_INVENTORY_READ

Your tenant is subscribed to the Cloud Remote Access microservice `remoteaccess`.
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the ID of the device and `<configuration_id>` for the ID of an endpoint configuration.

If a request returns HTTP 403 with the error "Microservice/Access Denied", your tenant is not subscribed to the microservice. Any other HTTP 403 means that your user lacks ROLE_REMOTE_ACCESS_ADMIN.

### To check that the device supports Cloud Remote Access {#to-check-that-the-device-supports-cloud-remote-access}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<device_id>
```

The platform returns HTTP 200 and the device. Check the following properties in the response:

* The array `c8y_SupportedOperations` contains `"c8y_RemoteAccessConnect"`. Otherwise, the device cannot open connections for Cloud Remote Access.
* The array `c8y_RemoteAccessSupportedProtocols`, if present, lists the protocols that the device supports, for example `["PASSTHROUGH", "SSH"]`. See [Declaring supported protocols](/cloud-remote-access/cra-api/#declaring-supported-protocols).

### To list the endpoint configurations {#to-list-the-endpoint-configurations}

Send the following request to the microservice:

```http
GET /service/remoteaccess/devices/<device_id>/configurations
```

The microservice returns HTTP 200 and a JSON array of the configurations of the device. Each configuration contains its `id`, `name`, `hostname`, `port`, and `protocol`. If the microservice returns HTTP 404, the device does not exist.

### To create an endpoint configuration {#to-create-an-endpoint-configuration}

Send a POST request with the configuration. The following example creates a passthrough endpoint, which needs no credentials:

```http
POST /service/remoteaccess/devices/<device_id>/configurations
Content-Type: application/json
Accept: application/json

{
  "name": "Gateway SSH",
  "hostname": "127.0.0.1",
  "port": 22,
  "protocol": "PASSTHROUGH",
  "credentialsType": "NONE"
}
```

The request has the following properties:

* `name`: A name of your choice. Required.
* `hostname`: The IPv4 address, IPv6 address, host name, or domain of the service in the local network of the device. Required.
* `port`: The port of the service. Required.
* `protocol`: SSH, TELNET, VNC, or PASSTHROUGH. Required.
* `credentialsType`: How Cloud Remote Access signs in to the service, see below.
* `username`, `password`, `privateKey`, `publicKey`, `certificate`: The credentials, as the credentials type requires them.
* `hostKey`: The host key of the SSH server. Optional.

The credentials type defines which credentials you send:

* **NONE**: No credentials. PASSTHROUGH and TELNET accept NONE, SSH does not.
* **PASS_ONLY**: `password`, for example for a VNC server.
* **USER_PASS**: `username` and `password`.
* **KEY_PAIR**: `username` and `privateKey`. You can also send the `publicKey`.
* **CERTIFICATE**: `username`, `privateKey`, and `certificate`.

The microservice returns HTTP 201 and the configuration with its `id`. Note the `id` as `<configuration_id>`. In the `c8y_RemoteAccessList` fragment of the device, the credentials of the configuration are in a `credentials` object, with the credentials type in `credentials.type`.

If the microservice returns HTTP 422, a required property is missing or invalid, or the protocol does not support the credentials type. For example, the message "Protocol SSH does not support NONE" means that an SSH endpoint needs credentials. If it returns HTTP 404, the device does not exist.

### To read an endpoint configuration {#to-read-an-endpoint-configuration}

Send the following request to the microservice:

```http
GET /service/remoteaccess/devices/<device_id>/configurations/<configuration_id>
```

The microservice returns HTTP 200 and the configuration with its `id`, `name`, `hostname`, `port`, and `protocol`. If it returns HTTP 404, the configuration does not exist on this device.

### To update an endpoint configuration {#to-update-an-endpoint-configuration}

The microservice replaces the configuration with the body that you send. Always send the complete configuration, with your changes, not only the changed properties.

Send a PUT request:

```http
PUT /service/remoteaccess/devices/<device_id>/configurations/<configuration_id>
Content-Type: application/json
Accept: application/json

{
  "name": "Gateway SSH",
  "hostname": "127.0.0.1",
  "port": 2222,
  "protocol": "PASSTHROUGH",
  "credentialsType": "NONE"
}
```

The microservice returns HTTP 200 and the updated configuration. It returns HTTP 422 for the same reasons as for the POST request, and HTTP 404 if the configuration does not exist on this device.

### To delete an endpoint configuration {#to-delete-an-endpoint-configuration}

Send a DELETE request:

```http
DELETE /service/remoteaccess/devices/<device_id>/configurations/<configuration_id>
```

The microservice returns HTTP 204. If it returns HTTP 404, the configuration does not exist anymore.

Deleting a configuration does not close a connection that is open at the moment. See [Managing endpoints](/cloud-remote-access/setting-up-cloud-remote-access/#endpoints).
