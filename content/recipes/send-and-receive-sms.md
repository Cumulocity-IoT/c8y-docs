---
title: Send and receive SMS
description: Configure the SMS provider of the tenant, send an SMS through the SMS gateway microservice, and read the messages received for an address.
weight: 760
sector:
  - app_enablement
requires:
  - authentication
---

The SMS gateway microservice `sms-gateway` sends and receives SMS through the SMS provider that is configured for the tenant. The platform also uses this provider for other features, for example for two-factor authentication. You use the REST endpoints of the microservice at `/service/messaging`, see [SMS management endpoints](/microservice-sdk/java/#sms-management-endpoints).

Addresses have the form `<protocol>:<number>`, for example `tel:+491701234567`. The protocol is `tel` for a phone number, or `iccid`, `acr`, or `short`.

To send an SMS through the SIM provider of a device instead, see [Manage the SIM card of a device](/recipes/manage-sim-connectivity/#to-send-an-sms-to-the-device).

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To read the provider configuration and received messages: ROLE_SMS_READ
* To configure the provider and send SMS: ROLE_SMS_ADMIN

Your tenant is subscribed to the SMS gateway microservice `sms-gateway`.
{{< /c8y-admon-req >}}

If a request returns HTTP 403 with the error "Microservice/Access Denied", your tenant is not subscribed to the microservice. Any other HTTP 403 means that your user lacks the role for the request.

### To check the SMS provider of the tenant {#to-check-the-sms-provider-of-the-tenant}

Send the following request to the microservice:

```http
GET /service/messaging/providers/configuration
```

The microservice returns HTTP 200 and the configuration. The `provider` property contains the ID of the provider.

If the microservice returns HTTP 404 with the message "No provider configuration could be found", no SMS provider is configured. You cannot send or receive SMS until you configure one.

### To configure the SMS provider {#to-configure-the-sms-provider}

1. Send the following request to the microservice to read the properties that each provider needs:

    ```http
    GET /service/messaging/providers/definitions
    ```

    The microservice returns HTTP 200 and a JSON array of providers. Each provider has an `id`, a `displayName`, and a `schema`. The `schema` is the JSON schema of the properties that the provider needs, such as URLs and credentials.

2. Send a PUT request. Set `provider` to the `id` of the provider, `<provider_id>`, and add each property that its `schema` requires as `<property_name>` and `<property_value>`:

    ```http
    PUT /service/messaging/providers/configuration
    Content-Type: application/json
    Accept: application/json

    {
      "provider": "<provider_id>",
      "<property_name>": "<property_value>"
    }
    ```

The microservice deletes the current configuration before it saves the new one. Always send the complete configuration, not only the changed properties.

The microservice returns HTTP 200 and the saved configuration. If it returns HTTP 400, the body does not match the schema of the provider.

You can also configure the provider in the Administration application, see [SMS provider](/standard-tenant/changing-settings/#sms-provider).

{{< c8y-admon-caution >}}
`DELETE /service/messaging/providers/configuration` removes the provider configuration and disables SMS for the whole tenant. Do not delete a configuration that you did not create.
{{< /c8y-admon-caution >}}

### To send an SMS {#to-send-an-sms}

The example uses `<sender_address>` for the address of the sender and `<recipient_address>` for the address of the recipient, both in the form `<protocol>:<number>`.

Send a request to send a message, as described in [SMS management endpoints](/microservice-sdk/java/#sms-management-endpoints), with the sender address in the path:

```http
POST /service/messaging/smsmessaging/outbound/<sender_address>/requests
Content-Type: application/json
Accept: application/json

{
  "outboundSMSMessageRequest": {
    "senderAddress": "<sender_address>",
    "address": ["<recipient_address>"],
    "outboundSMSTextMessage": {
      "message": "Hello device"
    }
  }
}
```

The `address` array can contain several recipients. Optional properties of `outboundSMSMessageRequest` are `senderName`, `clientCorrelator`, and `receiptRequest`.

The microservice returns HTTP 200 and the `outboundSMSMessageRequest` with the `senderAddress`, the `address`, and the message.

If the microservice returns an error, check the status:

* **HTTP 409** with the message "Missing provider in tenant option, category: messaging": No SMS provider is configured. See [To configure the SMS provider](#to-configure-the-sms-provider).
* **HTTP 400**: The provider rejected the request, or an address is not in the form `<protocol>:<number>`. The error body contains the details.

You cannot undo a sent SMS. The REST API does not report the delivery status of a sent SMS.

### To read received messages {#to-read-received-messages}

The example uses `<registration_address>` for the address that received the messages, in the form `<protocol>:<number>`. Not every SMS provider supports receiving messages.

Send a request to receive all messages, as described in [SMS management endpoints](/microservice-sdk/java/#sms-management-endpoints):

```http
GET /service/messaging/smsmessaging/inbound/registrations/<registration_address>/messages
```

The microservice returns HTTP 200 and the received messages in the `inboundSMSMessageList` array. Each `inboundSMSMessage` contains its `messageId`, `message`, `senderAddress`, `destinationAddress`, and `dateTime`.

To read one message, add its ID, `<message_id>`, to the path:

```http
GET /service/messaging/smsmessaging/inbound/registrations/<registration_address>/messages/<message_id>
```

If the microservice returns HTTP 409, no SMS provider is configured. If it returns HTTP 400, the address is not in the form `<protocol>:<number>`.
