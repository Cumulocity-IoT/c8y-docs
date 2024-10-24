---
title: Compatibility policy
layout: bundle
sector:
  - about_website
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
* Clients must only rely on behavior that is explicitly described in the documentation. For instance, clients shall not rely on a sequence of results if no sort order is guaranteed.
* Clients can rely on a stable inventory API where they can manage their inventory objects. However, the data structures for objects owned by the {{< product-c8y-iot >}} platform can change.
* APIs will evolve within the boundaries of backward compatibility; as examples optional fields might be added in the request and APIs might return additional JSON fields. Therefore, clients must be written in a way that they ignore such changes.
* There is no forward compatibility specified for the {{< product-c8y-iot >}} APIs, therefore newer clients built against a newer API (or SDK) are not guaranteed to work with older {{< product-c8y-iot >}} APIs.


{{< c8y-admon-info >}}
If changes result in breaking backward compatibility, to provide our customers with the time to change their solution, such changes will in general be announced at least 6 months ahead of the version in which the change becoming effective.

In some cases we may have to change an API due to external factors, for example in order to support a security enhancement or to achieve compliance with the underlying standard. Under these circumstances the change will also be announced, but based on an assessment of impact the announcement might not happen ahead of time.
{{< /c8y-admon-info >}}

#### Preview APIs {#preview-apis}

To maintain API and product quality we may, from time to time, hold back new APIs in a preview state to make sure that they are robust, properly documented, and provide the capability required. These APIs may change without a prior announcement. Please keep this in mind if you start using APIs that are documented as beta in our [API documentation](https://{{< domain-c8y >}}/api/core/).

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
