---
title: Overview
outputs:
  - html
  - json
weight: 10
helpcontent:
  - label: usage-overview
    title: usage-overview
    content: "The **Overview** tab provides a dashboard with comprehensive usage statistics for all your environments and tenants. Use the filters at the top of the page to customize your view:


      **Environment filter** - Select which environment or specific tenant you want to view data from. You can view data from any environment without logging into it directly.

      **Date filter** - Select the time range for the displayed data. Only completed month's data is available.


      The dashboard displays usage data across multiple widgets and graphs, showing metrics for storage, messages, devices, microservices (CPU and memory), and add-ons. Each metric includes percentage change indicators comparing the first and last months in your selected time range.
        
      The **Overview** tab includes several sections for analyzing usage data:

      **Usage statistics** - Display the latest metrics from the last available month for environments, tenants, storage (Operational Data Store), messages, devices, and microservices (CPU and memory). All tenants across all environments are aggregated in these metrics.

      **Messages graph** - Shows the total number of messages across the selected time range. Toggle **Show breakdown** to view all components of the messages metric.

      **Operational Data Store graph** - Displays the total aggregated storage used across all selected environments and tenants.

      **Add-ons graph** - Select any deployed add-on from the selector to view its specific usage metrics over the selected time range.


      For details see also the user documentation."
---


The **Overview** tab provides a dashboard with all usage statistics relating to your environments and tenants.

<img src="/images/console/usage/usage-overview/overview.png" alt="Usage overview">

### Filters {#filters}

At the top of the page, you will find the following two filters:

* **Environment filter** - Allows you to select from which environment you want to view the data. You do not need to be in the environment to view the data from it. For example, if you have a production environment and a development environment, you can view the data from the development environment even if you are logged in and viewing the Console application from the production environment. You can also dive into the individual tenant data, in case you want to identify high-usage tenants. In the following screenshot, you can see the filter showing three environments, with a tenant called "subtenant-prod" being selected from the production environment. As a reminder, you can name each environment in the **Environments** page of the Console application.

<img src="/images/console/usage/usage-overview/environments-filter.png" alt="Environments Filter">

* **Date filter** - Allows you to select the time range you want to view in the graphs below. The default range is "Last 1 Year", but it can be adjusted to whatever months are desired. As a reminder, only the completed month's data is available in the Console application.

<img src="/images/console/usage/usage-overview/date-filter.png" alt="Date Filter">

### Usage statistics {#usage-statistics}

The first usage widget shows the data for the last available month in the selected time range. The month can be viewed in the top right corner of each tile.

<img src="/images/console/usage/usage-overview/last-month-statistics.png" alt="Last Month Statistics">

The following tiles are included:

* **Environments and tenants** - Displays the number of environments and total tenants, including the type of environment (public cloud versus dedicated cloud) and if they are active or not.
* **Storage** - Displays the latest total Operational Data Store metric from the last month. All tenants across all environments are aggregated in this metric.
* **Messages** - Displays the latest total messages metric from the last month. All tenants across all environments are aggregated in this metric. The full calculation of messages can be found in the [{{< product-c8y-iot >}} license metrics](/service-terms/license-metrics/) documentation.
* **Devices** - Displays the latest total number of devices from the last month. All tenants across all environments are aggregated in this metric.
* **CPU(S)** - Displays the latest total amount of CPU power used for microservices in the last month. All tenants across all environments are aggregated in this metric.
* **Memory** - Displays the latest total amount of memory used for microservices in the last month. All tenants across all environments are aggregated in this metric.

Each tile includes a percentage change indicator. This represents the percentage difference between the first month of your selected time range and the last month displayed on the tile.

### Messages graph {#messages-graph}

The messages graph displays the total number of messages across the selected time range.

<img src="/images/console/usage/usage-overview/messages.png" alt="Messages">

Toggle **Show breakdown** to display all components of the messages metric.

<img src="/images/console/usage/usage-overview/messages-breakdown.png" alt="Messages Breakdown">

### Operational Data Store graph {#operational-data-store-graph}

The Operational Data Store (ODS) graph displays the total aggregated storage used across all the selected environments and tenants.

<img src="/images/console/usage/usage-overview/operational-data-store.png" alt="Operational Data Store">

### Add-ons graph {#addons-graph}

The add-ons graph allows you to select one of the add-ons and view the usage data from it.

<img src="/images/console/usage/usage-overview/addons.png" alt="Add-ons">

Use the selector at the top right to select one of the add-ons that are deployed on your environment. Each add-on has its own usage metrics that are then displayed in the graph.

<img src="/images/console/usage/usage-overview/addons-selector.png" alt="Add-ons Selector">
