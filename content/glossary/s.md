---
weight: 150
title: S
layout: bundle
sector:
  - getting_started
---




### {{< standard-tenant >}} {#standard-tenant}

A tenant type in the [{{< product-c8y-iot >}} tenant hierarchy](/glossary/t/#tenant-hierarchy).

At the bottom of the tenant hierarchy you can find single tenants which are represented by the concept of {{< standard-tenant >}}.
A {{< standard-tenant >}} offers most of the device management and monitoring functionality of the {{< product-c8y-iot >}} platform, but has certain limitations when it comes to administrative aspects.

See also [{{< enterprise-tenant >}}](/glossary/e/#enterprise-tenant) and [{{< management-tenant >}}](/glossary/m/#management-tenant).


### Subscription {#subscription}

The application concept of {{< product-c8y-iot >}} includes a basic application marketplace.
Tenants can be subscribed to applications which have been deployed by their superior tenant ({{< management-tenant >}} or {{< enterprise-tenant >}}).
Granting access to subtenants and subscribing to applications is done in the Administration application.

For details see [Platform administration > {{< enterprise-tenant >}} administration > Managing tenants > Subscribing applications](/enterprise-tenant/managing-tenants/#subscribing-applications) and [Platform administration > {{< standard-tenant >}} administration > Managing the ecosystem > Managing applications](/standard-tenant/ecosystem/#managing-applications).




### Service user {#service-user}

A service user is a non-human user account that is created automatically when a [tenant](#tenant) subscribes to a [microservice](#microservice). It allows the microservice to interact with the tenant's data via the [REST API](#rest-api) for background tasks, independent of any end-user's session.  


### Smart groups {#smart-groups}

Smart groups are [groups](#group) whose membership is dynamically determined based on [device](#device) properties matching defined criteria, rather than static assignment. This is a feature of the [Device Management application](#device-management-application).  


### SmartREST {#smartrest}

SmartREST is a lightweight, CSV-based [device protocol](#device-protocol) to exchange data between [devices](#device) and the platform. SmartREST uses standard MQTT. The protocol enables devices to send and receive structured messages using templates that map message fields to object properties, reducing the message size and simplifying the integration for resource-constrained IoT devices.


<!---
### Smart rules {#smart-rules}

{{< product-c8y-iot >}} includes [Streaming Analytics](#streaming-analytics) to analyze data in realtime and to perform actions based on data. The [Cockpit application](#cockpit-application) includes a “smart rules” builder which allows you to easily create rules from a list of predefined templates. With the new smart rules (2.0 update) these rules can easily be extended via Analytics Builder.
 
* **Related terms:** Alarm, Analytics Builder, Cockpit application, Cumulocity Core, Cumulocity Streaming Analytics, Event, Measurement, Operation  

--->

### SSO (Single sign-on) {#sso}

* **Status:** New  
* **Review status:**  **To review by PM**    
* **Description:** An [authentication](#authentication) method that allows [users](#user) to log into {{< product-c8y-iot >}} using credentials from an external, third-party identity provider (IdP) that supports the OAuth2 protocol, such as Azure AD.  


### {{< standard-tenant >}} {#standard-tenant}

A standard tenant is a [tenant](#tenant) that does not have tenant management capabilities. Unlike an [{{< enterprise-tenant >}}](#enterprise-tenant) or [{{< management-tenant >}}](#management-tenant), a {{< standard-tenant >}} lacks [multi-tenancy](#multi-tenancy) features and cannot create [subtenants](#subtenant).


### Subscription

In {{< product-c8y-iot >}}, a subscription denotes the process by which a [tenant](#tenant) (or its [subtenants](#subtenant)) gains access to an [application](#application) from the platform’s application marketplace. Applications can be subscribed to the tenant on which they were deployed or to any of its subtenants.


### **Subtenant** {#subtenant}

A subtenant is a [tenant](#tenant) created and managed under a parent tenant (either an [{{< enterprise-tenant >}}](#enterprise-tenant) or the [{{< management-tenant >}}](#management-tenant)) within the {{< product-c8y-iot >}} [tenant hierarchy](#tenant-hierarchy).
