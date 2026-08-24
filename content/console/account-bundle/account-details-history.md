---
title: Details & History
outputs:
  - html
  - json
weight: 30
helpcontent:
  - label: account-details-history
    title: account-details-history
    content: "The **Details & History** tab provides a detailed breakdown of monthly consumption for each billable product.


      **Consumption details table** - Contains a row for each billable month for the duration of the contract. Expand and collapse each row using the caret icon to view details. The **Bill date** corresponds to the date on which the drawdown occurs, while the **Usage month** is the month in which the usage occurred. For billing purposes, UTC time is used.


      Each bill contains the following information:

      **Base product** - Shows line item details including the standard set of Cumulocity pricing metrics such as Deployments, Messages, and Operational Data Store (ODS). Usage is calculated into billable units.

      **Add-ons** - Can be expanded to view line item details. Includes any add-ons that were activated and had usage during the usage month.

      **Total usage charges** - The sum of all usage charges (base product plus add-ons).

      **Drawdown (Balance consumed)** - How much the commitment was drawn based on the usage charges.

      **Overage** - Any charges exceeding the available commitment for the month.

      **Total bill amount** - The final bill amount for the month.


      Bill status: **NEW** (empty bill created), **PENDING** (usage details added, can be modified), **APPROVED** (finalized bill, cannot be modified)."
---

The **Details & History** tab provides a detailed breakdown of monthly consumption for each billable product.

<img src="/images/console/account/account-details-history.png" alt="Details & History">

### Consumption details {#consumption-details}

The consumption details table contains a row for each billable month for the duration of the contract. Expand and collapse each row using the caret icon <i class="dlt-c8y-icon-chevron-right"></i> to the left of the bill date.

The **Bill date** corresponds to the date on which the drawdown occurs. The **Usage Month** is the month in which the usage occurred. For example, the usage month of January 1, 2025 through January 31, 2025 would have a corresponding bill date of February 1, 2025. For billing purposes, UTC time is used.

Each bill contains the following information:

* **Base product** - Shows line item details including the standard set of {{< company-c8y >}} pricing metrics such as Deployments, Messages, and Operational Data Store (ODS). Usage is calculated into billable units, which are defined in the [{{< product-c8y-iot >}} license metrics](/service-terms/license-metrics/). Unit prices are taken from the product catalog of the contract.
* **Add-ons** - Can be expanded to view line item details. Includes any add-ons that were activated and had usage during the usage month. Usage is calculated into billable units as defined in the [{{< product-c8y-iot >}} license metrics](/service-terms/license-metrics/). Unit prices are taken from the product catalog of the contract.
* **Total usage charges** - The sum of all usage charges (base product plus add-ons).
* **Drawdown (Balance consumed)** - How much the commitment was drawn based on the usage charges. This usually equals the total usage charges unless there is an overage scenario, in which case the values will be different (the remaining commitment is less than the total usage charges for that month).
* **Overage** - Any charges exceeding the available commitment for the month.
* **Total bill amount** - The final bill amount for the month.

Each bill can be one of the following states:
* **NEW** - The usage month has passed and an empty consumption bill has been created, but not yet filled in with usage details.
* **PENDING** - The usage details and consumption drawdown have been added to the bill. Bills in this status can still be modified if needed. 
* **APPROVED** - The finalized bill has been created and no longer can be modified or deleted, as it has been passed to the {{< company-c8y >}} finance department for reconciliation.
