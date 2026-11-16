---
title: Register an LWM2M device
description: Register an LWM2M device on the LWM2M agent, one at a time or in bulk from a CSV file, check the managed object of the device, and delete the registration.
when: "the user wants to register LWM2M devices, one at a time or in bulk, or delete their registration"
weight: 500
requires:
  - authentication
api:
  - operation: getCurrentTenantResource
    method: GET
    path: /tenant/currentTenant
    title: Retrieve the current tenant
  - operation: getManagedObjectResource
    method: GET
    path: /inventory/managedObjects/{id}
    title: Retrieve a specific managed object
---

LWM2M devices connect to {{< product-c8y-iot >}} through the LWM2M agent microservice. Before a device can connect, you register it on the LWM2M agent with its endpoint client ID and its security settings. The registration creates the managed object of the device immediately. The device itself connects later, when it starts its bootstrap over CoAP.

All requests to the LWM2M agent start with `/service/lwm2m-agent`. For the background and the full list of registration fields, see [Registering LWM2M devices](/device-integration/lwm2m/#registering-lwm2m-devices).

Keep the following rules in mind:

* The endpoint client ID must be unique across all tenants. The same applies to the PSK IDs of the device.
* Delete LWM2M devices through the LWM2M agent, not with the inventory API. If you delete the managed object directly, the agent keeps its identities for the endpoint, and you cannot register the same endpoint again later.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To register and delete LWM2M devices: ROLE_INVENTORY_ADMIN, ROLE_INVENTORY_CREATE, or ROLE_LWM2M_ADMIN
* To read the managed object of the device: ROLE_INVENTORY_READ
{{< /c8y-admon-req >}}

The examples use `<endpoint_id>` for the endpoint client ID of the device, for example `urn:my:example:device`, and `<device_id>` for the ID of the managed object that the registration creates.

### To check that the LWM2M agent is available {#to-check-that-the-lwm2m-agent-is-available}

Send a [Retrieve the current tenant](https://{{< domain-c8y >}}/api/core/#operation/getCurrentTenantResource) request:

```http
GET /tenant/currentTenant
```

The platform returns HTTP 200. Check that the `applications.references` array contains an entry whose `application.contextPath` is `lwm2m-agent`. If an entry has no `contextPath`, check its `application.name` instead.

If no entry matches, your tenant is not subscribed to the LWM2M agent microservice, and you cannot register LWM2M devices.

### To select the security modes {#to-select-the-security-modes}

An LWM2M device uses two connections, each with its own security mode:

* **Bootstrap connection**: The device connects to the bootstrap server to receive its server configuration. You configure it in the `bootstrapSecurity` object.
* **Server connection**: The device connects to the LWM2M server to exchange data. You configure it in the `serverSecurity` object.

For the bootstrap connection, set `bootstrapSecurityMode` to one of the following values:

* `NO_SEC`: The device connects without security. No further fields.
* `PSK`: The device connects with DTLS and a pre-shared key. Also set `bootstrapId`, the bootstrap PSK ID, and `bootstrapKey`, the hex-encoded key. The manufacturer preconfigures both values on the device.
* `X509`: The device connects with an X.509 certificate. No further fields. The manufacturer preconfigures the certificate, the private key, and the trust store on the device.

For the server connection, set `securityMode` to one of the following values:

* `NO_SEC`: The device connects without security. No further fields.
* `PSK`: Also set `publicKeyOrId`, the PSK ID, and `secretKey`, the hex-encoded key. The bootstrap server writes these credentials to the device.
* `PSK_GENERATED`: No further fields. The agent uses the endpoint client ID as the PSK ID and generates a random key. The bootstrap server writes them to the device.
* `X509`: The device connects with an X.509 certificate. If the bootstrap server provisions the certificate, also set `x509ClientCertificate` and `x509ClientPrivateKey` in PEM format, `x509CertificateUsage` (CA_CONSTRAINT, SERVICE_CERTIFICATE_CONSTRAINT, TRUST_ANCHOR_ASSERTION, or DOMAIN_ISSUER_CERTIFICATE), and `serverPublicKey`, the name of the server certificate. If the device already has its certificate, leave these fields out.

For X.509, the certificate authority that issued the device certificates must be a trusted certificate of your tenant, see [Manage trusted certificates](/skills/device-management/manage-trusted-certificates/). For details on all security fields, see [Security settings](/device-integration/lwm2m/#security-settings).

### To register a device {#to-register-a-device}

Send a POST request to the device registration endpoint of the LWM2M agent, see [REST-based single LWM2M device registration](/device-integration/lwm2m/#rest-lwm2m-single-registration). The example registers a device without security:

```http
POST /service/lwm2m-agent/deviceRegistration
Content-Type: application/json
Accept: application/json

{
  "endpointId": "<endpoint_id>",
  "bootstrapSecurity": {
    "bootstrapSecurityMode": "NO_SEC"
  },
  "serverSecurity": {
    "securityMode": "NO_SEC"
  },
  "lwm2mServerUri": "<lwm2m_server_uri>",
  "bootstrapShortServerId": 0,
  "lwm2mShortServerId": 1,
  "securityInstanceOffset": 0
}
```

The request has the following properties:

* `endpointId`: The endpoint client ID of the device.
* `bootstrapSecurity` and `serverSecurity`: The security modes and their fields, see [To select the security modes](#to-select-the-security-modes).
* `lwm2mServerUri`: The URI of the LWM2M server, `<lwm2m_server_uri>` in the example. For the host name and the ports of {{< product-c8y-iot >}}, see [Bootstrap settings](/device-integration/lwm2m/#bootstrap-settings).
* `bootstrapShortServerId`, `lwm2mShortServerId`, and `securityInstanceOffset`: Optional. The example shows the default values.

For a device that uses PSK for both connections, the security objects look like this, with `<bootstrap_psk_id>` and `<bootstrap_psk_key>` for the bootstrap connection and `<psk_id>` and `<psk_key>` for the server connection:

```json
"bootstrapSecurity": {
  "bootstrapSecurityMode": "PSK",
  "bootstrapId": "<bootstrap_psk_id>",
  "bootstrapKey": "<bootstrap_psk_key>"
},
"serverSecurity": {
  "securityMode": "PSK",
  "publicKeyOrId": "<psk_id>",
  "secretKey": "<psk_key>"
}
```

The agent accepts further optional fields, for example `registrationLifetime` or `bindingMode`, as in the example in [REST-based single LWM2M device registration](/device-integration/lwm2m/#rest-lwm2m-single-registration). To get the list of all fields, send a GET request to `/service/lwm2m-agent/deviceRegistration/metadata`.

The agent returns HTTP 201 and the registration with the `id` of the new managed object and the `endpointId`. Note the `id` as `<device_id>`.

If the agent returns an error, check the response:

* **HTTP 400 with `"error": "Parameter validation error"`**: The `message` lists every problem, for example a missing mandatory field or a key that is not hex-encoded. If the message says that the endpoint or a PSK ID "already exists for another device", another device already uses this value. Choose another value or keep the existing registration.
* **HTTP 409**: The endpoint client ID is already registered.

### To check the managed object of the device {#to-check-the-managed-object-of-the-device}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<device_id>
```

The platform returns HTTP 200 and the managed object with the following properties:

* `name` is the endpoint client ID.
* `type` is `c8y_lwm2m`, unless you set another device type in the registration.
* The fragments `c8y_IsDevice`, `c8y_IsLwm2mDevice`, and `com_cumulocity_model_Agent` are present.

The managed object exists before the device connects. After the first registration of the device, its `c8y_SupportedOperations` array contains `c8y_Command`, and you can send shell commands to it, see [Read and write LWM2M resources with shell commands](/skills/device-management/lwm2m-shell-resources/).

### To register several devices from a CSV file {#to-register-several-devices-from-a-csv-file}

Upload a CSV file with one device per line to the bulk registration endpoint of the LWM2M agent, see [REST-based bulk registration for LWM2M devices](/device-integration/lwm2m/#rest-lwm2m-bulk-registration). The file can have up to 10 MB. Send it as multipart form data in a part named `file`:

```http
POST /service/lwm2m-agent/deviceRegistration/bulk
Content-Type: multipart/form-data; boundary=boundary
Accept: application/json

--boundary
Content-Disposition: form-data; name="file"; filename="<csv_file>"
Content-Type: text/csv

<csv_content>
--boundary--
```

The column names of the CSV file are the CSV field names of the registration fields, for example `endpoint id`, `securityMode`, `bootstrapSecurityMode`, `lwm2m psk_id`, `lwm2m psk_key`, `bootstrap psk_id`, `bootstrap psk_key`, and `lwm2m server uri`. For all fields, see [Device settings](/device-integration/lwm2m/#device-settings) and the sections that follow it.

The agent returns HTTP 200 with `operationId` and `sourceDeviceId`. The agent registers the devices asynchronously in an operation of the [LWM2M connector device](/device-integration/lwm2m/#connector-device): `sourceDeviceId` is the ID of the connector device and `operationId` the ID of the operation. Follow the operation as described in [Send an operation to a device](/skills/device-management/send-operation/#to-follow-the-status-of-the-operation). The result of the operation shows the outcome for each device, including duplicate endpoint client IDs.

If the agent returns HTTP 422, the CSV file is invalid, for example because of its format, its column names, or its size.

### To delete a registered device {#to-delete-a-registered-device}

Send a DELETE request with the managed object ID of the device to the LWM2M agent, see [REST-based single LWM2M device deletion](/device-integration/lwm2m/#lwm2m-single-device-deletion-using-restapi):

```http
DELETE /service/lwm2m-agent/deviceRegistration/<device_id>
```

The agent returns HTTP 204. It deletes the managed object of the device and its own identities for the endpoint. You can then register the endpoint again.

To delete several devices, send a DELETE request to `/service/lwm2m-agent/deviceRegistration/bulk` with a CSV file in the same format as for the bulk registration, see [REST-based bulk LWM2M device deletion](/device-integration/lwm2m/#lwm2m-bulk-device-deletion-using-restapi).
