---
weight: 10
title: Optimizing requests with concurrent connections
layout: redirect
---

In order to provide better performance for requests to the {{< product-c8y-iot >}} platform, Streaming Analytics uses multiple client connections to perform requests concurrently.
This can provide improved performance, but may also change the ordering in which requests are executed and responses are returned.
By default, the {{< product-c8y-iot >}} transport tries to use multiple connections and restricts ordering to avoid races that may affect your EPL application.

An attempt is made to ensure order is maintained when required. For example, all updates to a single managed object are performed serially in the order they were sent to the transport.
For more details see [Optimizing requests to {{< product-c8y-iot >}} with concurrent connections]({{< link-apama-webhelp >}}index.html#page/pam-webhelp%2Fco-ConApaAppToExtCom_cumulocity_optimizing_requests_to_cumulocity_iot_with_concurrent_connections.html) in the Apama documentation.

You can adjust the default number of client connections with the `client.numClients` tenant option in the `streaminganalytics` category. For example:

```
{
   "category": "streaminganalytics",
   "key": "client.numClients",
   "value": "5"
}
```
If you require a fully serial transport, set the value of `client.numClients` to 1.

{{< c8y-admon-info >}}
This does not apply to the Apama-ctrl-smartrules and Apama-ctrl-smartrulesmt microservices. They have a fixed value of 1 (that is, fully serial) for this option, which is not configurable.
{{< /c8y-admon-info >}}
