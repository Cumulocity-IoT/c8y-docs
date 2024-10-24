---
weight: 40
title: Configuration requirements for Notifications 2.0
layout: redirect
---
Streaming Analytics can use the {{< product-c8y-iot >}} Notifications 2.0 reliable data forwarding capability to receive notifications for measurements, events, alarms, managed objects and operations that are processed by the {{< product-c8y-iot >}} platform. For more information, see [About Notifications 2.0](https://{{< domain-c8y >}}/api/core/#tag/About-notifications-2.0) in the {{< openapi >}}.

The availability of this feature is governed by two feature flags:

- `notification2.streaming-analytics` <br>
    The {{< product-c8y-iot >}} Notifications 2.0 feature is currently in private preview. If you want to have it enabled for your tenant, you must contact [product support](/additional-resources/contacting-support/) to set this feature flag.

- `streaming-analytics.messaging` <br>
    In addition to this, if you are using one of the variants of the Apama-ctrl microservice, you must also set this feature flag. You then need to resubscribe the Apama-ctrl microservice to pick up changes to the feature flag.
    Use the feature toggles REST API to do so; see [Feature toggles API](https://{{< domain-c8y >}}/api/core/#tag/Feature-toggles-API) in the {{< openapi >}}.
    <!-- For further information on these feature flags and on feature flags in general, see (TODO: this doc has not yet been written). -->

If you are using a custom microservice, you must also add the `ROLE_NOTIFICATION_2_ADMIN` permission to the microservice manifest once the `notification2.streaming-analytics` feature flag has been activated; see also [Required settings in the microservice manifest](/streaming-analytics/epl-apps/#required-settings-in-the-microservice-manifest).
For the Apama-ctrl microservices, it is not required to add this permission manually as it is set as the default; see also [Modifying microservice permissions and resource usage](/streaming-analytics/analytics-customization/#microservice-permissions).

{{< c8y-admon-info >}}
Keep in mind that you must also resubscribe the microservice to pick up changes to the feature flag.
{{< /c8y-admon-info >}}
