---
title: Manage the SIM card of a device
description: Configure the SIM provider of the tenant, link a SIM card to a device, read its status, activate or deactivate it, disconnect it, read its audit and usage data, and send it an SMS.
weight: 750
sector:
  - device_management
requires:
  - authentication
api:
  - operation: getManagedObjectResource
    method: GET
    path: /inventory/managedObjects/{id}
    title: Retrieve a specific managed object
  - operation: putManagedObjectResource
    method: PUT
    path: /inventory/managedObjects/{id}
    title: Update a specific managed object
---

The connectivity microservice connects {{< product-c8y-iot >}} to the platform of a SIM provider: Comarch, Ericsson, Jasper, or Kite. You manage SIM cards with the REST endpoints of the microservice at `/service/connectivity`. The microservice forwards each request to the SIM provider that is configured for the tenant. For the features and the setup of each provider, see [Connectivity](/device-management-application/connectivity/).

The microservice finds the SIM card of a device by the `c8y_Mobile` fragment of the device managed object:

* Comarch and Jasper identify the SIM card by its ICCID.
* Ericsson identifies the SIM card by its MSISDN.
* Kite needs both the ICCID and the MSISDN.

Not every provider supports every function. For example, only Comarch supports disconnecting a SIM card from its current session.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To read the provider configuration, SIM details, audit logs, and usage data: ROLE_CONNECTIVITY_READ
* To configure the provider, change the SIM status, disconnect the SIM card, and send SMS: ROLE_CONNECTIVITY_ADMIN
* To read the device: ROLE_INVENTORY_READ
* To update the device: ROLE_INVENTORY_ADMIN

Your tenant is subscribed to the connectivity microservice `connectivity`.
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the ID of the device.

Errors of the microservice have the body `{"error": "Connectivity/Error", "message": "..."}`. If a request returns HTTP 502, the microservice could not communicate with the SIM provider. Wait 5 seconds and send the request once more. If a request returns HTTP 403 with the error "Microservice/Access Denied", your tenant is not subscribed to the microservice.

### To check the SIM provider of the tenant {#to-check-the-sim-provider-of-the-tenant}

Send the following request to the microservice:

```http
GET /service/connectivity/metadata/sim/provider
```

The microservice returns HTTP 200 and the configuration. The `provider` property contains the ID of the provider. The microservice masks the credentials in the response.

If the microservice returns HTTP 404 with the message "No valid provider configuration could be found", no SIM provider is configured. All SIM requests fail until you configure one.

### To configure the SIM provider {#to-configure-the-sim-provider}

1. Send the following request to the microservice to read the properties that each provider needs:

    ```http
    GET /service/connectivity/metadata/definitions
    ```

    The microservice returns HTTP 200 and a JSON array of providers. Each provider has an `id`, a `displayName`, and a `schema`. The `id` is `jwireless` for Jasper, `comarch`, `ericsson`, or `kite`. The `schema` is the JSON schema of the properties that the provider needs, such as URLs and credentials.

2. Send a PUT request. Set `provider` to the `id` of the provider, `<provider_id>`, and add each property that its `schema` requires as `<property_name>` and `<property_value>`:

    ```http
    PUT /service/connectivity/metadata/sim/provider
    Content-Type: application/json
    Accept: application/json

    {
      "provider": "<provider_id>",
      "<property_name>": "<property_value>"
    }
    ```

The microservice returns HTTP 200 and the configuration, with the credentials masked. It stores the configuration as tenant options in the category `connectivity`. If it returns HTTP 400, the body does not match the schema of the provider.

You can also configure the provider in the Administration application, see [Configuring the connectivity for the SIM provider](/device-management-application/connectivity/#configuring-the-connectivity-for-the-sim-provider).

{{< c8y-admon-caution >}}
`DELETE /service/connectivity/metadata/sim/provider` removes the provider configuration and disables SIM management for the whole tenant. Do not delete a configuration that you did not create.
{{< /c8y-admon-caution >}}

### To link a SIM card to a device {#to-link-a-sim-card-to-a-device}

1. Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

    ```http
    GET /inventory/managedObjects/<device_id>
    ```

    Check that the fragment `c8y_Mobile` contains the `iccid` or the `msisdn` that your provider needs. Most devices report them automatically.

2. If they are missing, send an [Update a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/putManagedObjectResource) request with both values:

    ```http
    PUT /inventory/managedObjects/<device_id>
    Content-Type: application/json
    Accept: application/json

    {
      "c8y_Mobile": {
        "iccid": "89100423481F445593U",
        "msisdn": "380561234567"
      }
    }
    ```

    The platform returns HTTP 200 and the updated device.

The SIM card must be managed by the provider account of the tenant. See [Connectivity](/device-integration/fragment-library/#connectivity) for the `c8y_Mobile` fragment.

### To read the SIM statuses and functions of the provider {#to-read-the-sim-statuses-and-functions-of-the-provider}

Send the following requests to the microservice:

```http
GET /service/connectivity/metadata/sim/statuses
```

```http
GET /service/connectivity/metadata/sim/functionalities
```

The microservice returns HTTP 200 for each request:

* `statuses`: The SIM statuses of the provider, each with its `status` and `readOnly`. You can only set a status whose `readOnly` is not `true`.
* `functionalities`: The functions that the provider supports, for example `SIM_STATUS`, `SMS`, `SESSION`, `AUDIT`, and `DATA_USAGE`.

### To read the SIM details of a device {#to-read-the-sim-details-of-a-device}

Send the following request to the microservice:

```http
GET /service/connectivity/mo/<device_id>/op/terminal
```

The microservice returns HTTP 200 and the SIM card with its `iccid` and `status`. It can also contain `ipAddress`, `fixedIpAddress`, `inSession`, `sessionStartTime`, and `customFields`.

If the microservice returns HTTP 400, check the message:

* **"Mobile fragment not found"**: The device has no `c8y_Mobile` fragment.
* **"Iccid or msisdn must be filled"**: The `c8y_Mobile` fragment has no `iccid` and no `msisdn`.
* **Another message that contains "not found"**: The device does not exist.

### To activate or deactivate a SIM card {#to-activate-or-deactivate-a-sim-card}

Send a PUT request with the new status as `<sim_status>`. Use a `status` from the list of SIM statuses of the provider, see [To read the SIM statuses and functions of the provider](#to-read-the-sim-statuses-and-functions-of-the-provider):

```http
PUT /service/connectivity/mo/<device_id>/op/terminal/sim/status
Content-Type: application/json
Accept: application/json

{
  "status": "<sim_status>"
}
```

The microservice returns HTTP 200. If it returns HTTP 400 with the message "Unknown sim status", the provider does not know the status.

After you activate a SIM card, it can take a while until the network activates it. Some devices need a restart to connect to the network again.

### To disconnect a SIM card {#to-disconnect-a-sim-card}

To end the current data session of the SIM card, send a POST request with an empty JSON object:

```http
POST /service/connectivity/mo/<device_id>/op/terminal/sim/disconnect/session
Content-Type: application/json

{}
```

To detach the SIM card from the network, send the same request to `/service/connectivity/mo/<device_id>/op/terminal/sim/disconnect/network`.

The microservice returns HTTP 200. If it returns HTTP 405, the provider does not support this function.

### To read audit logs and usage data {#to-read-audit-logs-and-usage-data}

Send one of the following requests to the microservice. Write `<date_from>` and `<date_to>` as dates in the format `YYYY-MM-DD`, for example `2026-08-01`:

* `GET /service/connectivity/mo/<device_id>/op/terminal/audit`: The changes to the SIM card. `dateFrom` is optional.
* `GET /service/connectivity/mo/<device_id>/op/sms?dateFrom=<date_from>`: The SMS sent to and received from the device.
* `GET /service/connectivity/mo/<device_id>/op/billing`: The usage summary of the SIM card.
* `GET /service/connectivity/mo/<device_id>/op/billing/data?dateFrom=<date_from>`: The data usage. Use `/billing/sms` for text messages and `/billing/voice` for voice calls.

For example:

```http
GET /service/connectivity/mo/<device_id>/op/billing/data?dateFrom=<date_from>&dateTo=<date_to>
```

`dateTo` is optional for all requests. The microservice returns HTTP 200 and the requested data. If it returns HTTP 400 with a message about a missing parameter, add `dateFrom`.

### To send an SMS to the device {#to-send-an-sms-to-the-device}

Send a POST request with the text of the message, 1 to 1000 characters:

```http
POST /service/connectivity/mo/<device_id>/op/sms
Content-Type: application/json
Accept: application/json

{
  "text": "Hello device"
}
```

To see the messages that were sent to and received from the device, read the SMS audit, see [To read audit logs and usage data](#to-read-audit-logs-and-usage-data).

Use this request to send an SMS through the SIM provider, for example to set the APN parameters of the device. To send an SMS through the SMS provider of the tenant instead, see [Send and receive SMS](/recipes/send-and-receive-sms/).
