---
title: Release policy
layout: bundle
sector:
  - terms_conditions
weight: 95
---

### Introduction

{{< product-c8y-iot >}} operates as a cloud service that is continuously maintained and upgraded in accordance with its service level agreements (SLAs). The maintenance process is designed to be seamless and generally unnoticed by customers, with the timing and content of upgrades managed by {{< company-c8y >}}. Once new features and improvements have successfully passed {{< company-c8y >}}'s quality assurance, they are gradually rolled out to customers within their tenants.

This approach ensures that customers benefit from quick access to new functionality, as well as up-to-date security and bug fixes. Any new or updated functionality is communicated through the [change logs](/change-logs/), and the timing of upgrades can be tracked via the <a href="https://status.cumulocity.com" target="_blank">status pages</a>. To ensure that connected devices and customer-developed functionality on {{< product-c8y-iot >}} remain operational, strict [API compatibility](/concepts/compatibility-policy/) is maintained and rigorously tested.

This document is provided as a courtesy to {{< product-c8y-iot >}} customers, acknowledging that:

* IoT hardware devices and legacy industry protocols can be highly sensitive to even compatible changes and may require thorough testing. For instance, IoT device security stacks often lag in adopting recent secure communication ciphers, which {{< product-c8y-iot >}} must support for security reasons.
* Customers who are not accustomed to cloud release models, or those operating in regulated industries, may need to closely monitor and report on changes.

To address these considerations, this document outlines the various upgrade models available and answers frequently asked questions. It begins with an overview of the standard {{< product-c8y-iot >}} continuous deployment model, explains how customers can integrate this model into their own continuous deployment processes, and describes the alternative annual deployment model.

### Continuous deployment

{{< company-c8y >}}’s continuous deployment model enables cloud software upgrades to occur automatically, at any time, ensuring that customers receive the latest features, enhancements, and security improvements promptly. All cloud instances are under full support of {{< company-c8y >}}’s support services at any time according to the support service-level purchased by the customer.

Cloud instances are separated into *non-production* and *production* cloud instances to streamline upgrades and testing.
 * Non-production instances include customer development and test instances, and the public instance at eu-latest.cumulocity.com.
 * Production instances cover both customer production environments and other public cloud production instances.

The upgrade process for instances follows a staged approach.
 * After an upgrade has passed {{< product-c8y-iot >}}’s internal quality assurance, it is first deployed to non-production instances.
 * Following this initial deployment and based on the scope and complexity of the upgrade, production instances are then upgraded, typically two to three weeks after non-production deployment.

In rare circumstances, upgrades may be rolled back if significant issues are detected post-deployment.

Additionally, critical fixes, referred to as “hotfixes”, may be applied as necessary to address, for example, security vulnerabilities. Hotfixes can be applied to any {{< product-c8y-iot >}} instance at any time, ensuring that high-priority concerns are addressed rapidly.

### Device integration and application enablement

{{< product-c8y-iot >}}'s application enablement empowers customers to tailor the platform to their needs by connecting devices and building custom applications. To support these efforts, we encourage customers to adopt
{{< company-c8y >}}'s tenancy and staging model within their own development processes, facilitating a smooth transition from development to production.

During development and testing phases, unexpected behavior may occur in devices, microservices, user interfaces, or automation rules due to the presence of bugs. To mitigate risks in production environments, these components should only be connected to designated development tenants and instances, such as eu-latest.cumulocity.com.

To help ensure that applications built on {{< product-c8y-iot >}}  continue to function seamlessly across cloud service updates, {{< company-c8y >}} offers a [robust compatibility guarantee](/service-terms/compatibility-policy/). Nonetheless, we strongly recommend that customers regularly perform scheduled continuous integration and deployment of their software against development tenants and instances, like eu-latest.cumulocity.com, to identify and address potential compatibility issues before updates are applied to production environments.

### Annual deployment

For customers in particularly sensitive industries, {{< company-c8y >}} offers an annual deployment model, designed to provide a predictable, stable upgrade cycle. Each year, {{< company-c8y >}} designates one release as the annual release, which is deployed to customers following a carefully coordinated schedule, as outlined in the example below.

In the annual deployment model:
* A release candidate is made available on the last day of January for selected customers on non-production instances for a two-month period.
* The official release is published on the last day of March.
* Maintenance for each annual release ends three months after the next annual release becomes generally available (End of Maintenance, or EOM).
* After EOM, support will continue for up to three additional months (End of Sustained Support, or EOSS); however, no further fixes will be issued during this period. Customers are expected to complete upgrades within this timeframe and will receive dedicated support to facilitate this process.

Additional considerations:
* Bug fixes for annual releases under maintenance are deployed manually, not automatically, allowing for more controlled updates.
* Due to the accumulated changes in each annual release, these upgrades may take longer to complete and present a potentially higher risk compared to the continuous deployment model.
<!---
image source: https://docs.google.com/spreadsheets/d/1S3sCPPBnLpQq9TJZG6Es5X1YKIzp4dAQw6wRB_sws1k/edit?usp=sharing
-->
![Annual upgrade process](../../images/service-terms/annualrelease.png)

### Cumulocity Edge annual release cycle

{{< product-c8y-iot >}} Edge follows an annual release cycle, which occurs one month later than the [{{< product-c8y-iot >}} annual deployment](/service-terms/releases/#annual-deployment). This ensures alignment with broader system updates while providing additional time for Edge-specific testing and stability improvements.

Unlike the standard {{< product-c8y-iot >}} annual deployment, {{< product-c8y-iot >}} Edge does not include a release candidate phase. Customers are expected to adopt the general availability release directly, ensuring they perform necessary validation in their environments before deployment.

Customers using older Edge versions should refer to the latest documentation for migration guidance. Updates to the documentation will be made available in the {{< product-c8y-iot >}} Edge documentation.
<!---
image source: https://docs.google.com/spreadsheets/d/1S3sCPPBnLpQq9TJZG6Es5X1YKIzp4dAQw6wRB_sws1k/edit?usp=sharing
-->
![Edge annual upgrade process](../../images/service-terms/edgeannualrelease.png)

### Frequently asked questions (FAQ)

#### Can I check when a particular change is available in my tenant?

Due to the staged upgrade process for {{< product-c8y-iot >}} continuous deployment instances, this is currently not generally possible. The change log indicates the time when a change is made available on the first deployment to eu-latest.cumulocity.com only.

For customers using the annual deployment model, release notes for the annual release will be provided.

#### Can I receive notifications when something is deployed?

You can subscribe to updates on the status page of your cloud instance (for example, [status.cumulocity.com](https://status.cumulocity.com/)), which includes announcements for scheduled maintenance and other important updates.

#### Can I select specific changes to be applied to my tenant?

Individual changes cannot be selectively applied; all published changes are rolled out to all instances according to the selected deployment model (continuous or annual).

#### Can I request a rollback of changes?

{{< company-c8y >}} manages rollbacks automatically if issues are detected in production environments. If you encounter any issues, please contact [Cumulocity Support](/additional-resources/contacting-support/) for assistance.

#### Am I eligible for annual deployment?

Annual deployment is a premium service available for customers in regulated industries. For more information, please contact your {{< company-c8y >}} representative.
