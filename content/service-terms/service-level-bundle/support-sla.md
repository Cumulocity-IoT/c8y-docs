---
title: Support service-level agreement
layout: bundle
weight: 30
aliases:
  - /support-sla/
---

This agreement is made between {{< company-c8y >}} ("Provider") and the Customer ("Customer") who wishes to use support services for {{< product-c8y-iot >}}.

### Service description

This document outlines the maintenance and support services provided for different levels of support.
The services are provided as follows for the different pricing packs, as detailed on Provider's pricing page: https://www.cumulocity.com/pricing/.

* **Starter** and **free trial** include community-based support via {{< company-c8y >}}'s Tech Community, https://community.cumulocity.com/, where the team responds on a best-effort basis.
* **Business** includes **Standard** support by default. Upgrading to **Premium** is possible for a fee.
* **Enterprise** includes **Premium** support by default.

### Definitions

The following terms apply across all support levels unless otherwise specified:

* **Business Day**: Monday to Friday, excluding public holidays, in the country specified in the Customer address field of the Cumulocity Product order form.
* **Business Hour**: 8:00 AM to 5:00 PM on a Business Day of the support hub within the Customer's Support Region.
  * EMEA: Central European Time (CET).
  * APJ: Malaysia Time (MYT).
  * AME: US Mountain Time (MT).
* **Cumulocity Product:** The Cumulocity IOT Platform and its components as specified in the Cumulocity Product order form. Hereafter also called Product.
* **Error**: Any verifiable and reproducible failure of the Cumulocity Product to substantially conform to the specifications for such Product. Notwithstanding the foregoing, Error shall not include any such failure that is caused by:
  1. the use or operation of the Product with any other software or code or in an environment other than that intended or recommended in this documentation,
  2. modifications to the Product not made or approved by the Provider in writing, or
  3. any bug, defect, or error in third-party software used with the Product.
* **Error Correction**:  A modification, addition, or deletion that brings the Cumulocity Product into substantial conformance with specifications or reduces the adverse effect of the Error. It may include a workaround, service update, or solution provided by the Provider.
* **Authorized Technical Contact (ATC)**: A uniquely identified individual authorized by the Customer to access the Provider’s Support Portal, submit support requests, and receive support-related communications, with appropriate professional and technical qualifications. Shared group accounts are not allowed.
* **Support**: The Provider’s Support Organization responsible for delivering maintenance and support services to the Customer.
* **Support Portal**: The Provider’s web-based support system that permits browsing and submitting support tickets.
* **Support Region**: The region of a customer is the region where that customer is located or has opted to define that region as their region. For example, the region for an EMEA customer is EMEA, however an EMEA customer may opt for another region, say APJ, to be their default region. For Premium support, the region can be chosen per ATC.


### Incident classification

Support will classify support tickets into three levels of severity according to the following:

* **Crisis Incidents**: Customer’s problem has a severe business impact, such as production down. Customer is unable to use the Product, resulting in a major impact on Customer’s operations. Work cannot reasonably continue.
* **Critical Incidents**: Customer’s problem has a significant business impact; however, operations can continue in a restricted fashion. The Product is usable but severely limited. There is no acceptable workaround available. Customer is experiencing a significant loss of service.
* **Standard Incidents**: Customer’s problem has some business impact. The Product is usable and causes only minor inconvenience. It may be a minor Error, documentation Error, or incorrect operation of the Product, which does not significantly impede the operation of the Product.

### Support services and response times



| **Service**                          | **Standard**               | **Premium**              |
| ------------------------------------ | -------------------------- | ------------------------ |
| **Support Portal access for ATCs**   | 24/7                       | 24/7                     |
| **Crisis phone**                     | 24/7                       | 24/7                     |
| **Number of ATCs**                   | 7                          | Unlimited                |
| **Prioritized queuing**              | No                         | Yes                      |
| **Ticket escalation**                | Yes                        | Yes                      |
| **Onboarding**                       | Email                      | Email and/or web meeting |
| **SDKs & thin-edge.io** | Community support only | Incident support for supported versions; see below |



| **Response Times**\*     | **Standard**           |  **Premium**          |
| ------------------------ | ---------------------- | --------------------- |
| **Crisis - initially**   | 1 hour                 | 30 minutes            |
|        **- updates**     | Once per Business Hour | Once per hour         |
| **Critical - initially** | 4 Business Hours       | 2 hours               |
|        **- updates**     | Once per Business Day  | Once per Business Day |
| **Standard - initially** | 1 Business Day         | 1 day                 |
|        **- updates**     | Once per week          | Twice per week        |
| **Escalated Tickets**    | Twice per week         | Once per Business Day |

*\* Provider and Customer can mutually agree on a different schedule on a per-ticket basis. This will generally happen after the initial investigations have been performed and a resolution is being implemented.*


The services are defined as follows:

* **Crisis phone**: The support telephone number is available in the Support Portal. Telephone support is provided in English only.
* **Response times**: Customer will receive an initial human response to a new support ticket within the defined initial response times. Follow-up communication times of updates to existing support tickets are targeted but not guaranteed.
* **Resolution plan for Crisis:** Provider aims to provide a concrete resolution plan within the first 4 hours, detailing the intended solution, a workaround, or a documented action plan with timelines.
* **Follow-the-sun:** For Premium customers, Provider actively hands over Crisis tickets between global regions (EMEA, APJ, AME) to ensure 24/7 progress.
* **Number of ATCs**: Restrictions to the number of ATCs apply per Customer, not per contract. Customer may contract for additional ATCs.
* **Prioritized queuing**: Support tickets are prioritized ahead of other support incidents of the same severity level but lower support level.
* **Ticket escalation:** If a support ticket requires extra attention due to a serious change in business impact (for example, an approaching deadline or increased severity), Customer can raise an escalation request via the Support Portal or email. Provider will review the new context and will ensure high visibility on its internal dashboards.
* **Onboarding:** Provider welcomes new ATCs and provides information about the Support Portal access, support ticket handling process and Support team.
* **SDKs, thin-edge.io and device-side software:** For Standard support, {{< company-c8y >}}-provided SDKs, libraries, and thin-edge.io are available on a community-support basis only. Support may, at its discretion, provide general guidance but does not assume incident ownership for these components. For Premium support, refer to the section below.

#### Scope of Premium support for SDKs and device-side software

Premium support also covers additional components  that are not part of {{< product-c8y-iot >}} platform operated as Software-as-a-Service (SaaS). This includes versions of the following components that have been published within the last 12 months:

- [thin-edge.io ](https://thin-edge.io/)
- {{< product-c8y-iot >}} [Web SDK](/web/introduction/)
- {{< product-c8y-iot >}} [Microservice SDK for Java](/microservice-sdk/java/)

For these components, the following services are included:
* Assistance with incident analysis and troubleshooting where the issue can be reproduced on the latest SDK or thin-edge.io version.
* Guidance on recommended configuration and upgrade paths for supported SDKs and the most recent thin-edge.io version.
* Coordination of Error Corrections for confirmed defects in supported SDKs or thin-edge.io versions that materially affect the operation of {{< product-c8y-iot >}}.

Premium support does not include:

* Development services (for example, implementing features, refactoring Customer code, or writing custom device firmware).
* Support for forks, custom builds, or third-party modifications of SDKs or thin-edge.io.
* Support for device-side operating systems, drivers, or connectivity services not controlled by {{< company-c8y >}}.
* Support for **thin-edge.io** when not used in conjunction with the {{< product-c8y-iot >}} platform.

#### Professional Services for SDKs and device-side software

Assistance with developing, debugging, or customizing SDKs, thin-edge.io, device firmware, or other device-side software is outside the scope of all support levels. Such services can be requested separately from {{< company-c8y >}} [Professional Services](https://www.cumulocity.com/professional-services/).

### Processing customer requests

#### General support processing

The following conditions apply to all support levels:

* Customer requests will be received by Support and will be documented in Support Portal for further processing. Customer will be given a support ticket number for future reference.
* When reaching Support by telephone, Customer is to provide the support ticket number so that work on the issue can commence.
* Support has no obligation to solve the Customer’s issue within the response or any other time frame.

### Customer responsibilities

* Customer assigns Authorized Technical Contacts (ATCs) and communicates any changes to the list of ATCs to Provider.
* Customer's ATC is responsible for cooperating with Provider's Support and providing necessary information to reproduce, troubleshoot and resolve the experienced issue.
* When a support ticket is submitted by an ATC to Provider's Support Portal, Customer authorizes Provider, for the purposes of troubleshooting and resolving such issue, to access Customer’s cloud environment for the duration of the submitted support ticket.
* Customer must explain the business impact in the Support ticket. Explaining why an issue is severe (for example, "Production line stopped", "Upcoming go-live at risk", "Data loss imminent") allows Provider to validate the priority and allocate the right resources immediately.
* Customer ensures availability of ATCs to answer support tickets. While Provider waiting for a response, Response Time counting is paused.


