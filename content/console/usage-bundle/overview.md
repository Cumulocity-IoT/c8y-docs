---
weight: 10
title: Usage overview
layout: redirect
sector:
  - platform_administration
---

The **Usage Overview** page provides a dashboard with all usage statistics relating to your environments and tenants.

<img src="/images/console/usage/overview/overview.png" alt="Usage Overview">

At the top of the page, you find two filters:
* **Environment filter** - Allows you to select from which environment you want to view data. You do not need to be in the environment to view data from it. For example, if you have a production environment and a development environment, you can view the data from the development environment even if you are logged in and viewing the Console application from the production environment. You can also dive into the individual tenant data, in case you want to identify high-usage tenants. In the following screenshot, you can see the filter showing three environments, with a tenant called "subtenant-prod" being selected from the production environment. As a reminder, you can name each environment in the **Environments** page of the Console application.
<img src="/images/console/usage/overview/environments-filter.png" alt="Environments Filter">

* **Date filter** - Allows you to select the time range you want to view in the graphs below. The default range is "Last 1 Year", but can be adjusted to whatever months are desired. As a reminder, only the completed month's data is available in the Console application.
<img src="/images/console/usage/overview/date-filter.png" alt="Date Filter">

The first usage widget shows the data for the last available month in the selected time range. The month can be viewed in the top right corner of each tile.
<img src="/images/console/usage/overview/last-month-statistics.png" alt="Last Month Statistics">

The following tiles are included:
* **Environments and Tenants** - Displays the number of environments and total tenants, including the type of environment *(public cloud versus dedicated cloud)* and if they are active or not. 
* **Storage** - Displays the latest total Operational Data Store metric from last month. All tenants across all environments are aggregated in this metric.
* **Messages** - Displays the latest total Messages metric from the last month. All tenants across all environments are aggregated in this metric. The full calculation of Messages can be found in the {{< company-c8y >}} License Metrics documentation.
* **Devices** - Displays the latest total number of devices from last month. All tenants across all environments are aggregated in this metric. 
* **CPU(S)** - Displays the latest total amount of CPU power used for microservices in the last month. All tenants across all environments are aggregated in this metric.
* **Memory** - Displays the latest total amount of Memory used for microservices in the last month. All tenants across all environments are aggregated in this metric. 

Note that each tile includes a percentage change indicator. This represents the percentage difference between the first month of your selected time range and the last month displayed on the tile.

The next widget is the **Messages** graph, which displays the total number of Messages across the selected time range.
<img src="/images/console/usage/overview/messages.png" alt="Messages">

You can toggle the **Show breakdown** to show all components of the Messages metric.
<img src="/images/console/usage/overview/messages-breakdown.png" alt="Messages Breakdown">

The next widget is the **Operational Data Store (ODS)** graph, which displays the total aggregated storage use across all selected environments and tenants.
<img src="/images/console/usage/overview/operational-data-store.png" alt="Operational Data Store">

The last widget on the page is the **Add-ons** graph, which allows you to select one of the Add-ons and view usage data from it.
<img src="/images/console/usage/overview/addons.png" alt="Add-ons">

You can use the selector in the top right to select one of the add-ons that are deployed on your environments. Each add-on has its own usage metrics that are then displayed in the graph.
<img src="/images/console/usage/overview/addons-selector.png" alt="Add-ons Selector">






