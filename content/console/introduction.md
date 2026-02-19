---
title: Introduction
layout: bundle
sector:
  - platform_administration
weight: 10
---

The contracting and pricing model of {{< company-c8y >}} is referred to as **Commit-to-Consume** (CTC). In the CTC model, customers do not have an explicit bill of materials for all their purchased {{< product-c8y-iot >}} components. Instead, customers commit to a certain spend amount, and their actual consumption of {{< product-c8y-iot >}} components draws down this commitment over the duration of the contract. The CTC model gives customers flexibility with {{< company-c8y >}}'s offerings, allowing them to optimize consumption, try new features, and understand usage.

Given that the spend amount is drawn-down by usage each month, it is important for customers to have transparency with their usage and consumption details. The Console application is a new application within {{< product-c8y-iot >}} where customers on the CTC model can view their usage and consumption. 

{{< c8y-admon-preview >}}
The Console application is in Private Preview, that is, it is not enabled by default and may be subject to change in the future. This application is subscribed to your tenant if you are on the new CTC model. If you are unable to access this application, please contact [product support](/additional-resources/contacting-support/) to request the application subscription for your tenant.

At this time, the Console application is not supported on Dedicated environments. This will be enabled soon. 
{{< /c8y-admon-preview >}}

{{< c8y-admon-req >}}
To use the Console application, you need:
* The Console application and stratos-client microservice subscribed to your tenant.
* READ permission for the permission type "Console".
{{< /c8y-admon-req >}}


### Glossary {#glossary}
This glossary provides definitions for key terms and concepts used throughout this documentation.

#### Add-ons {#add-ons}
A part of the new pricing model comprising any additional features, functionality, or components used within {{< product-c8y-iot >}}. Includes components such as {{< product-c8y-iot >}} DataHub, additional tenants, custom domains, and more. A complete list of Add-ons is found in the Product Catalog addendum of the contract.

#### Commit-to-Consume (CTC) {#commit-to-consume-ctc}
The new contract type enacted by {{< company-c8y >}} in 2025 where customers commit to a spend amount (Commitment) and monthly usage draws down against this spend amount. If the spend amount runs out before the contract expiry date, the customer enters overage scenarios.

#### Commitment {#commitment}
The total pre-tax spend credit for {{< company-c8y >}} products and services that the customer has contractually agreed to pay. This balance is drawn down each month based on the customer's consumption.

#### Console application {#console-application}
A {{< product-c8y-iot >}}-built solution that sits within the product and acts as a one-stop shop solution for customers interacting with their subscription and usage data. The Console application provides transparency with usage and billing to customers on a CTC contract.

#### Consumption {#consumption}
The details relating to the Drawdown amounts and how much of the Commitment remains after each month. The monthly Consumption report available in the Console application gives a breakdown of all components used, their associated prices and quantities, and statistics on the remaining balance.

#### Drawdown {#drawdown}
The process of calculating a customer’s monthly consumption of services (at pre-tax rates) and deducting that from their remaining Commitment balance. 

#### Environment {#environment}
An individual instance of {{< product-c8y-iot >}}. Customers can have multiple environments for their account, including both Dedicated (Private) SaaS environments and Public SaaS environments. For drawdown purposes, usage is aggregated across all environments.

#### Overage {#overage}
The status a customer enters when their commitment has been fully depleted before their contract term has ended. The exact specifics of the Overage scenario are determined by the clauses listed in the respective contracts, and are different from customer to customer.

#### Product catalog {#product-catalog}
The customer-specific price list appended to a CTC contract that defines the pre-tax rates for all available {{< company-c8y >}} products and services.

#### Stratos {#stratos}
The {{< company-c8y >}} internal project name for the Console application and any associated backend services.

#### Usage {#usage}
Statistics and other data points on the usage of {{< product-c8y-iot >}}. Usage is collected per-tenant on a monthly basis, and is available within the Console application for analysis. Usage data is also available via the Usage Statistics APIs. 