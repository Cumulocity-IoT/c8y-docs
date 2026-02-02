---
weight: 10
title: Overview
layout: redirect
sector:
  - platform_administration
---

The **Overview** page gives you a dashboard where you can dive into all the usage statistics relating to your environments and tenants.

<img src="/images/console-app/usage/overview/overview.png" alt="Usage Overview">

At the top of the page, you will find two filters:
* **Environment Filter** - allows you to select which environment you want to view data from. You do not need to be on the environment to view data from it. For example, if you have a production environment and a development environment, you can view the data from the development environment even if you are logged in and viewing the Console application from the production environment. You can also dive into the individual tenant data, in case you want to identify high-usage tenants. In the following screenshot, you can see the filter showing three environments, with a tenant called ‘subtenant-prod’ being selected from the ‘Production’ environment. As a reminder, you can name each environment in the Environments page of the Console application.
<img src="/images/console-app/usage/overview/environments-filter.png" alt="Environments Filter">

* **Date Filter** - allows you to select the time range you want to view in the graphs below. The default range is **Last 1 Year**, but can be adjusted to whatever months are desired. As a reminder, only previous month data is available in the Console application.
<img src="/images/console-app/usage/overview/date-filter.png" alt="Date Filter">

The first usage widget is the **Last Month Statistics**, and only ever shows the data for the last available month in the selected time range. The time range can be viewed in the top right corner of each tile.
<img src="/images/console-app/usage/overview/last-month-statistics.png" alt="Last Month Statistics">

The following tiles are included:
* **Environments and Tenants** - displays the number of environments and total tenants, including the type of environment *(public cloud versus dedicated cloud)* and if they are active or not. 
* **Storage** - displays the latest total Operational Data Store metric from last month. All tenants across all environments are aggregated in this metric.
* **Messages** - displays the latest total Messages metric from last month. All tenants across all environments are aggregated in this metric. The full calculation of Messages can be found in the {{< company-c8y >}} License Metrics documentation. 
* **Devices** - displays the latest total number of devices from last month. All tenants across all environments are aggregated in this metric. 
* **CPU(S)** - displays the latest total amount of CPU power used for microservices in the last month. All tenants across all environments are aggregated in this metric.
* **Memory** - displays the latest total amount of Memory used for microservices in the last month. All tenants across all environments are aggregated in this metric. 

Note that each tile includes a percent changed indicator. This takes the first month of the selected time range and calculates the percentage difference between that and the last month, which the tiles display the data from.

The next widget is the **Messages graph**, which displays the total number of Messages across the selected time range.
<img src="/images/console-app/usage/overview/messages.png" alt="Messages">

You can toggle the **Show Breakdown** to show all components of the Messages metric.
<img src="/images/console-app/usage/overview/messages-breakdown.png" alt="Messages Breakdown">

The next widget is the **Operational Data Store (ODS) graph**, which displays the total aggregated storage use across all selected environments and tenants.
<img src="/images/console-app/usage/overview/operational-data-store.png" alt="Operational Data Store">

The last widget on the page is the **Add-Ons graph**, which allows you to select one of the Add-Ons and view usage data from it.
<img src="/images/console-app/usage/overview/addons.png" alt="Add-Ons">

You can use the selector in the top right to select one of the Add-Ons that are deployed on your environments. Each Add-On has its own usage metrics that are then displayed in the graph.
<img src="/images/console-app/usage/overview/addons-selector.png" alt="Add-Ons Selector">






