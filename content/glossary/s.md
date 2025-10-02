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


<!---### Smart rules {#smart-rules}

* **Status:** Existing  
* **Review status:**  **Checked by PM**    
* **Description:** Cumulocity includes Streaming Analytics to analyze data in realtime and to perform actions based on data. The Cockpit application includes a “smart rules” builder which allows you to easily create rules from a list of predefined templates. With the new smart rules (2.0 update) these rules can easily be extended via Analytics Builder.   
* **Related terms:** Alarm, Analytics Builder, Cockpit application, Cumulocity Core, Cumulocity Streaming Analytics, Event, Measurement, Operation  
* **API detailsTo review by R\&D:** Configured via Cockpit UI. Powered by the Apama engine and the smartrule microservice. There is no public API for creating the rule definitions themselves.  
* **Sources:** [https://cumulocity.com/docs/cockpit/smart-rules/](https://cumulocity.com/docs/cockpit/smart-rules/)
--->

### Software {#software}

Software refers to software packages that can be remotely managed on a [device](#device). In the [Device Management application](#device-management-application), [users](#user) can track the installed software on a device and perform [operations](#operation) to install, update, or uninstall packages. See also [Firmware](#firmware).  


### SSO (Single sign-on) {#sso}

* **Status:** New  
* **Review status:**  **To review by PM**    
* **Description:** An [authentication](#authentication) method that allows [users](#user) to log into {{< product-c8y-iot >}} using credentials from an external, third-party identity provider (IdP) that supports the OAuth2 protocol, such as Azure AD.  


<!---#### **Standard tenant**

* **Status:** Existing  
* **Review status:**  **Review in progress**    
* **Description:** The base-level tenant in the Cumulocity tenant hierarchy. A Standard tenant provides the core device management and application enablement functionalities but lacks the multi-tenancy and advanced administrative features of an Enterprise tenant or a tenant with the relevant Add-Ons, such as creating subtenants or applying custom branding.  
* Proposal Niko: A Cumulocity tenant that does not have tenant management capabilities. Unlike an Enterprise or Management tenant, a Standard tenant lacks multi-tenancy features and cannot create subtenants.  
* **Related terms:** Enterprise tenant, Management tenant, Tenant, Tenant hierarchy  
* **API detailsTo review by R\&D:** Uses core REST APIs but lacks access to multi-tenant administrative APIs available to Enterprise/Management tenants.  
* **Sources:** [https://cumulocity.com/docs/concepts/tenant-hierarchy/](https://cumulocity.com/docs/concepts/tenant-hierarchy/), [https://cumulocity.com/api/core/\#tag/Tenant-API](https://cumulocity.com/api/core/#tag/Tenant-API)
--->

<!---#### **Subscription**

* **Status:** Existing  
* **Review status:**  **Review in progress**    
* **Description:** In Cumulocity, a subscription is the process by which a tenant (or its subtenants) gains access to an application from the platform’s basic application marketplace. Applications can be subscribed to the tenant where they were deployed or to any of its subtenants.The application concept of Cumulocity includes a basic application marketplace. ApplicationsTenants can be subscribed to the tenant on which they were deployed or any sub tenant of this tenant.tenantsapplications which have been deployed by their superior tenant (Management tenant or Enterprise tenant).  
* **Related terms:** Administration application, Application, Enterprise tenant, Management tenant, Microservice, Tenant  
* **API detailsTo review by R\&D:** Managed via Tenant API (POST /tenant/tenants/{tenantId}/applications) and Application API (POST /application/applications/{applicationId}/subscription). Microservices use GET /application/currentApplication/subscriptions to list subscribed tenants.  
* **Sources:** [https://cumulocity.com/docs/enterprise-tenant/managing-tenants/\#subscribing-applications](https://cumulocity.com/docs/enterprise-tenant/managing-tenants/#subscribing-applications), [https://cumulocity.com/api/core/\#tag/Tenant-applications](https://cumulocity.com/api/core/#tag/Tenant-applications)
--->
<!---#### **Subtenant** {#subtenant}

* **Status:** New  
* **Review status:**  **Review in progress**    
* **Description:** A tenant created and managed under a parent tenant (either an Enterprise tenant or the Management tenant) within the Cumulocity tenant hierarchy. Also known as “Child Tenant.”   
* **Related terms:** Tenant, Tenant hierarchy, Enterprise tenant, Management tenant  
* **API detailsTo review by R\&D:** Subtenants are created and managed via the Tenant API (/tenant/tenants) by an administrator of a parent Enterprise or Management tenant.  
* **Sources:** [https://cumulocity.com/docs/concepts/tenant-hierarchy/](https://cumulocity.com/docs/concepts/tenant-hierarchy/)
--->
