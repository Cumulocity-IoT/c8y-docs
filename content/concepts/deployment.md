---
title: Cumulocity IoT releases
layout: bundle
sector:
  - getting_started
weight: 110
---

### Introduction

Cumulocity IoT operates as a cloud service that is continuously maintained and upgraded in accordance with its Service Level Agreement (SLA). The maintenance process is designed to be seamless and generally unnoticed by customers, with the timing and content of upgrades managed by Cumulocity. Once new features and improvements have successfully passed Cumulocity's quality assurance, they are gradually rolled out to customers within their tenants.

This approach ensures that customers benefit from quick access to new functionality, as well as up-to-date security and bug fixes. Any new or updated functionality is communicated through the [change logs](https://cumulocity.com/docs/change-logs/), and the timing of upgrades can be tracked via the [status pages](https://status.cumulocity.com). To ensure that connected devices and customer-developed functionality on Cumulocity remain operational, strict [API compatibility](https://cumulocity.com/docs/concepts/compatibility-policy/) is maintained and rigorously tested.

This document is provided as a courtesy to Cumulocity IoT customers, acknowledging that:

* IoT hardware devices and legacy industry protocols can be highly sensitive to even compatible changes and may require thorough testing. For instance, IoT device security stacks often lag in adopting recent secure communication ciphers, which Cumulocity IoT must support for security reasons.
* Customers who are not accustomed to cloud release models, or those operating in regulated industries, may need to closely monitor and report on changes.

To address these considerations, this document outlines the various upgrade models available and answers frequently asked questions. It begins with an overview of the standard Cumulocity IoT continuous deployment model, explains how customers can integrate this model into their own continuous deployment processes, and describes the alternative annual deployment model. Additionally, it discusses how customers can opt to gain early access to Cumulocity IoT's new features through private and public previews.

### Continuous deployment

* At any time, automated deployment, automated fixes.
* Private/public preview releases (eu-latest), or customer dev environment.
* Customer information for new features and changes through change log.
* Normal ongoing support.
* Staged deployment: From QA -> eu-latest/customer dev -> commercial/ customer prod
  * Proposal: Use "staged" or "phased" instead of "zonal" because "zonal" is used data center zones.
  * Proposal: Only distinguish QA, zone 1/dev and commercial. Other communication is a bit odd and zone 2 is left out in some parts of Rumi's doc.
* Promotion: Automatically, time depending on size/complexity (~2-3 weeks after upgrade), rollback in case of issues.
* Hotfixes any time.

### Application enablement

* API compatibility, cloning (references to doc).
* CI/CD against eu-latest for critical cases.

### Annual deployment

* Upgrades once a year, manual, as project with tight time coordination and support from C8Y.
* Exact time frames for test periods, upgrade periods, end of maintenance and end of support.
* Manual bug fix installation.
* Longer upgrade duration (due to larger size).
* Image from Rumi

### Private and public feature previews

Cumulocity IoT offers a preview program allowing customers early access to new features before they become Generally Available (GA). This program is divided into two stages: **Private Preview** and **Public Preview**.

#### Private Preview

* **Participation**: A limited group of selected customers is invited to participate. Activation of features is managed by the Cumulocity team.
* **Stability & Testing**: Features in this stage have been tested in development, but they are still experimental. Functional changes are expected, and there is no guarantee of stability or backwards compatibility.
* **Support**: Limited support is provided on a best-effort basis, and standard service level agreements (SLAs) do not apply.
* **Feedback**: Feedback is actively collected by the R\&D team working on the feature.

#### Public Preview

* **Participation**: Any customer can opt into the public preview via the changelog.
* **Stability & Testing**: Additional testing has been done beyond the private preview stage, but the same limitations regarding stability and backwards compatibility apply.
* **Support**: Similar to private preview, limited support is provided, and SLAs do not apply.
* **Feedback**: Customers are encouraged to provide feedback through the Aha\! platform.

#### Considerations for Customers

1. **Purpose of the Preview Program**: The main goal is to gather customer feedback to refine features before their official release. This feedback helps identify bugs, evaluate usability, and ensure the features meet customer needs.
2. **Using Preview Features**: Customers are advised to use preview features only in development or testing environments due to potential instability and the possibility of breaking changes.
3. **Documentation**:
   * **Private Preview**: Documentation is available only to participating customers and is restricted to a dedicated section.
   * **Public Preview**: Documentation is publicly accessible, clearly marked as relevant to preview features, and will be integrated into the main documentation once the feature reaches GA.
4. **Communication & Awareness**:
   * **Private Preview**: Participation is by invitation only, and customers are selected based on their suitability to provide valuable feedback.
   * **Public Preview**: Customers can find information about available public previews in the changelog and other communication channels.
5. **Transition to GA**: Once a feature successfully passes through the preview stages, it will be made generally available to all customers, at which point it will receive full support and be included in the main product documentation.


### FAQ

#### Can I check when a particular change is available in my tenant?

Proposal: Can we link change log updates with eu-latest deployments? E.g., have some soft statement here like "Generally, after a change is published in the change log, it is part of the next eu-latest upgrade/it was part of the last eu-latest upgrade."

#### Can I get notification when something is deployed?

Proposal: You can subscribe to notifications from the [status page](https://status.cumulocity.com) for your region.

TBD: Can we make the status page subscriptions more granular, at least for the shared instances? (Requires likely the next better status page plan.)

#### Can I cherry pick changes?

Changes are published to all instances unless you are on the annual upgrade plan for regulated environments.

#### Can I roll back changes?

Changes are transparently rolled back by Cumulocity should a problem in production occurr. If you encounter a problem, please contact support.


#### Who is eligible for annual deployment?

Annual deployment is a premium service for regulated customers. Please contact your Cumulocity representative for more information.

TBD: Does anyone know what the exact regulatory requirements are where we need to support our customers?

