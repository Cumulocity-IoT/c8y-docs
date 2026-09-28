---
weight: 5
title: Introduction
layout: redirect
---

### MQTT ClientId {#mqtt-clientid}

Although you must send the IDs in the body of each message with SmartREST 1.0, it is still important to connect with the correct MQTT ClientId.

The MQTT ClientId must match the externalId with type `c8y_Serial` of your device. It is used to assign the correct operations and responses.

### Sending and receiving SmartREST 1.0 {#sending-and-receiving-smartrest-10}

In general, the following holds for SmartREST requests and responses via MQTT:

* All request rows will be sent as single MQTT messages. A single request message always yields a single response message instead of being split up to several response messages.
* All SmartREST response templates will be applied to the JSON response of a single request.
* Every matching response template will yield one row in the response.
* Response lines are separated by `\n`.

#### Sending SmartREST 1.0 {#sending-smartrest-10}

To send data to the server you can publish the same content as you would POST to the SmartREST endpoint <kbd>/s</kbd>.

The X-ID header is part of the topic the client must publish on.

```http
s/ul/<X-ID>
```

An X-ID acts as a protocol identifier and identifies the template collection.
An X-ID should be immutable: it always identifies exactly the same template collection.
If the template collection changes, the X-ID must also change.
An X-ID should also be globally unique: select an X-ID that is not used by anyone else.
To make sure, we recommend you to use reverse domain names, for example:

    com.acme.gw801-v1
    com.acme.gw801-v2

We also recommend you to add the protocol version as a postfix in the X-ID.

##### Processing mode {#processing-mode}

Since the {{< product-c8y-iot >}} SmartREST protocol supports TRANSIENT processing mode for avoiding storage of sent data in the database, publishing on MQTT <kbd>t/</kbd> topic instead of <kbd>s/</kbd> topic will only pass the data to real-time processing.

```http
t/ul/<X-ID>
```

The [{{< product-c8y-iot >}} SmartREST protocol also supports QUIESCENT processing mode for avoiding real-time notifications by publishing on MQTT <kbd>q/</kbd> topic instead of <kbd>s/</kbd> topic. Currently, the QUIESCENT processing mode is applicable for measurements and events only.

```http
q/ul/<X-ID>
```

The {{< product-c8y-iot >}} SmartREST protocol also supports CEP processing mode to ensure that data is only sent to the real-time event processing engine with real-time notifications, disabled by publishing on MQTT <kbd>c/</kbd> topic instead of <kbd>s/</kbd> topic. Currently, the CEP processing mode is applicable for measurements and events only.

```http
c/ul/<X-ID>
```

#### Receiving SmartREST 1.0 {#receiving-smartrest-10}

If a template triggers a response template, the returning message will be published by the server on the following topic.

```http
s/dl/<X-ID>
```

This topic can be subscribed by the client.

### Receiving operations {#receiving-operations}

SmartREST 1.0 via HTTP offers the <kbd>/notification/operations</kbd> endpoint to listen to realtime operations. You can receive the same content on the following MQTT topic.

```http
s/ol/<X-ID>
```
{{< c8y-admon-info >}}
To get notifications running, the platform device must have an external ID set which matches the MQTT client ID, otherwise it will not receive notifications.
{{< /c8y-admon-info >}}


### Limitations {#limitations}

MQTT currently does not support request/response. Therefore, if you send a request on the publish topic and receive a response on the subscribe topic, the client cannot securely match that they belong together.

You can counter this limitation by designing the templates in a way that you never need to know what request triggered the response, and the client automatically knows it by the **messageId**.
