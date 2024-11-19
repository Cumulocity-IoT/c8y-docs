---
title: Compatibility policy
layout: bundle
sector:
  - terms_conditions
aliases:
  - /concepts-introduction/
  - /concepts/compatibility-policy/
weight: 95
---

{{< product-c8y-iot >}} provides the highest possible level of compatibility to make sure that your investments into developing solutions with {{< product-c8y-iot >}} are maintained.

{{< c8y-admon-info >}}
For details on the release types (such as GA release, Yearly release or Maintenance release) and their version labels see [Release types](https://{{< domain-c8y >}}/releasenotes/about/release-types/).
{{< /c8y-admon-info >}}

The current compatibility statements are described as follows.

#### API compatibility {#api-compatibility}

{{< product-c8y-iot >}}'s REST, SmartREST and MQTT APIs as documented in the product documentation are backwards compatible. You can find such documentation in:

* [{{< openapi >}}](https://{{< domain-c8y >}}/api/core/)
* [SmartREST 2.0](/smartrest/smartrest-two/)
* [Device integration using MQTT](/device-integration/mqtt/)


{{< product-c8y-iot >}} is continually improving the user experience and product capabilities and may improve the API from time-to-time. In general, applications must always obey a few basic rules:

* Clients must only use documented API methods and documented behavior. Do not rely on undocumented but observed behavior.
* Clients must only rely on behavior that is explicitly described in the documentation. For instance, clients shall not rely on a sequence of results if no sort order is guaranteed, or on the order of properties in a JSON object.
* Clients can rely on a stable inventory API where they can manage their inventory objects. However, the data structures for objects owned by the {{< product-c8y-iot >}} platform can change.
* APIs will evolve within the boundaries of backward compatibility; as examples optional fields might be added in the request and APIs might return additional JSON fields. Therefore, clients must be written in a way that they ignore such changes and should not assume an upper limit on such changes.
* There is no forward compatibility specified for the {{< product-c8y-iot >}} APIs, therefore newer clients built against a newer API (or SDK) are not guaranteed to work with older {{< product-c8y-iot >}} APIs.


{{< c8y-admon-info >}}
If changes result in breaking backward compatibility, to provide our customers with the time to change their solution, such changes will in general be announced at least 6 months ahead of the version in which the change becoming effective.

In some cases we may have to change an API due to external factors, for example in order to support a security enhancement or to achieve compliance with the underlying standard. Under these circumstances the change will also be announced, but based on an assessment of impact the announcement might not happen ahead of time.
{{< /c8y-admon-info >}}

#### Preview APIs {#preview-apis}

To maintain API and product quality we may, from time to time, hold back new APIs in a preview state to make sure that they are robust, properly documented, and provide the capability required. These APIs may change without a prior announcement. Please keep this in mind if you start using APIs that are documented as beta in our [API documentation](https://{{< domain-c8y >}}/api/core/).

#### Data model compatibility

While one of {{< product-c8y-iot >}}'s strengths lies in handling complex, dynamic and evolving IoT data models, some limitations apply when evolving data models and managing multiple versions of a data model within a single tenant. This section outlines specific limitations and best practices to help you maintain compatibility for the data models you provide within {{< product-c8y-iot >}}.

When designing data models, we recommend you to start in a dedicated development tenant. Development and testing often involve experimentation with data structures, and a development environment allows for flexibility without the risks of compatibility issues or the accumulation of outdated data that might affect production workflows.

Your data model should extend the standard [{{< product-c8y-iot >}} data model](/concepts/domain-model/) and remain within the cardinality limits specified in the [service quotas](/service-terms/quotas/). Note that additional constraints apply when working with {{< product-c8y-iot >}} DataHub, which requires alignment between data modeling and offloading capabilities as detailed in the [DataHub documentation](/datahub/working-with-datahub/#aligning-data-modeling-and-offloading).

If your model uses the [fragment library](/device-integration/fragment-library/), it’s essential to ensure that data types in your model align with those specified in the library. For instance, the `c8y_Position` fragment requires coordinate data to be numeric; therefore, any location data you send should adhere to this numeric format rather than using, for example, string values. Likewise, if you configure properties in the [properties library](/standard-tenant/changing-settings/#properties-library), the data types of your properties must correspond to the predefined types.

Changes to data types for a given property — such as switching from a number to a text string, or from a text string to an array of strings — can invalidate property definitions, rules, offloading configurations, and other settings that depend on the original data type. Although certain areas of {{< product-c8y-iot >}} may still function with these changes, maintaining multiple data types for the same property within a single tenant is currently unsupported and can lead to unforeseen issues.

While {{< product-c8y-iot >}} does not strictly enforce adherence to these guidelines, following them is strongly recommended to ensure the proper processing of your data.

#### SDK and client library compatibility {#sdk-and-client-library-compatibility}

{{< product-c8y-iot >}} developer libraries and SDKs (like Java, JavaScript) may be changed. The libraries and SDKs help developers to access the {{< product-c8y-iot >}} APIs in their custom implementation and are typically bundled with the custom implementation. The programming interfaces for {{< product-c8y-iot >}} developer libraries and SDKs might change with new versions, requiring the custom implementation using these libraries or SDKs to be changed. It is not required to upgrade the custom implementation since the underlying REST and MQTT APIs remain compatible as long as no breaking changes to the APIs happen (see [API compatibility](#api-compatibility)).

{{< c8y-admon-info >}}
Regular upgrades to the latest SDK versions are strongly recommended to be able to benefit from new product features as well as the latest bug and security fixes. Changes are communicated as part of the {{< product-c8y-iot >}} release notes or change logs. Whenever possible, it is also strongly recommended to consider software updates for devices from the start.
{{< /c8y-admon-info >}}


#### Maintenance release {#maintenance-release}

For clarification, maintenance releases for the same Yearly release contain only corrective functional changes but no breaking API changes.

#### Applications and microservices {#applications-and-microservices}

In general, you can run an older application or microservice version against a newer {{< product-c8y-iot >}} backend, as long as the application or microservice uses documented APIs only. In the rare case of announced breaking changes it might be required to update the application or microservice with a more recent version of an SDK before the change becomes effective.

#### {{< product-c8y-iot >}} functionality {#platform-functionality}

{{< product-c8y-iot >}} microservices and user interface features may be deprecated. In this case, the {{< product-c8y-iot >}} deprecation process provides an early indication to users of the features. Deprecation notices are included in the documentation and the change logs at least 6 months ahead of the version in which the change becomes effective.
