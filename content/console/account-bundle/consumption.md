---
weight: 20
title: Consumption
layout: redirect
sector:
  - platform_administration
---

The **Consumption** page shows the monthly drawdowns and remaining commitment. The **Summary** tab provides an overview based on your contract.

<img src="/images/console/account/consumption/summary.png" alt="Consumption Summary">

After each month completes, the system rates and processes the usage in accordance with your contract.

The widget at the top of the page contains the following information:
* **Account name** - The name of the account.
* **Contract start date** - The contract start date.
* **Contract end date** - The contract end date.
* **Total commitment** - The total spend amount as agreed in the CTC contract.
* **Remaining commitment** - The total usage charges subtracted from the total spend amount. What’s left of the commitment for the duration of the contract.
* **Cumulative spend** - The total usage charges across the active months of the contract.
* **Percentage consumed** - The cumulative spend as a percentage of the total commitment.
* **Total overage** - Depending on the contract, any overage charges applicable would be indicated here.

The **Monthly spend analysis** showcases a month-over-month comparison of the total usage charges for each active month of the contract. This enables you to quickly compare and see which months were more or less expensive.

Further down on the page, the **Product usage analysis** allows you to dive into each pricing component to understand how its usage impacts the drawdown.

<img src="/images/console/account/consumption/usage-analysis-messages.png" alt="Usage Analysis - Messages">

To quickly assess the cost of each pricing component, you can use the dropdown menu in the top right to easily swap between pricing metrics.

The **Details & History** tab provides a breakdown of the monthly consumption for each billable product.

<img src="/images/console/account/consumption/details-and-history.png" alt="Details & Histroy">

The **Consumption details** table contains a row for each billable month for the duration of the contract. You can expand and collapse each row using the caret icon <i class="dlt-c8y-icon-caret-right"></i> to the left of the bill date. 
Note that the **Bill date** corresponds to the date which the drawdown occurs. The *Usage Month* is the month in which the usage occurred. For example, the *Usage Month* of January 1, 2025 through January 31, 2025, would have a corresponding *Bill Date* of February 1, 2025. For billing purposes, UTC time is used.

Each bill contains the following information.

* **Base product** - Shows line item details. Includes the standard set of {{< company-c8y >}} pricing metrics: Deployments, Messages, and Operational Data Store. Usage is calculated into billable units, which are written in the [{{< company-c8y >}} License metrics](/service-terms/license-metrics/). Unit prices are taken from the Product Catalog of the CTC contract.
* **Add-ons** - Can be opened to view line item details. Includes any and all Add-Ons that were activated and had usage during the usage month. Usage is calculated into billable units, which are written in the [{{< company-c8y >}} License Metrics](/service-terms/license-metrics/). Unit prices are taken from the Product Catalog of the CTC contract.
* **Total usage charges** - The sum of all usage charges (Base Product plus Add-Ons).
* **Drawdown (Balance Consumed)** - How much the Commitment was drawn based on the usage charges. Will usually equal the Total Usage Charges unless there is an overage scenario, in which case the values will be different *(the remaining Commitment is less than the Total Usage Charges for that month)*. 
* **Overage** - If an overage scenario happens, this will show the outstanding balance that needs to be paid. 
* **Total bill amount** - The total additional bill amount. Should only be greater than zero when the Commitment balance runs out *(an overage scenario)*.

Each bill can be one of the following states:
* **NEW** - The usage month has passed and an empty consumption bill has been created, but not yet filled in with usage details.
* **PENDING** - The usage details and consumption drawdown have been added to the bill. Bills in this status can still be modified if needed. 
* **APPROVED** - The finalized bill has been created and no longer can be modified or deleted, as it has been passed to the {{< company-c8y >}} finance department for reconciliation. 


