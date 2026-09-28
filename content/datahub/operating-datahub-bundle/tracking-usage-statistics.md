---
weight: 20
title: Tracking usage statistics
layout: redirect
helpcontent:
  - label: tracking-usage-statistics
    title: Tracking usage statistics
    content: "If enabled, the system tracks **usage statistics** on the amount of data being processed. For offloading queries the amount of data being read from the base collection is tracked. For ad-hoc queries the amount of data being read from the data lake is tracked.

    The top panels show overall **summary statistics** as well as statistics separated for offloading and ad-hoc queries. The table shows the details on a per-day basis for the selected month. The date of each entry links to the **Query log**, which lists all queries for the respective day.

    The statistics are updated once per hour. They are deleted after a retention period, so months statistics may no longer be available for longer past."
---

If enabled, {{< product-c8y-iot >}} DataHub tracks usage statistics on the amount of data being processed. These statistics are collected for offloading queries and track the amount of data these queries read from the Operational Store of {{< product-c8y-iot >}}. The statistics are also collected for ad-hoc queries and track the amount of data these queries read from the data lake. The usage statistics can be utilized for a volume-based charging. They can also be utilized to pinpoint resource-intensive queries in terms of network load.

{{< c8y-admon-info >}}
The tracking of usage statistics is supported for the {{< product-c8y-iot >}} DataHub Cloud edition. It is not supported for the {{< product-c8y-iot >}} DataHub Edge edition.
{{< /c8y-admon-info >}}

In the navigator, select **Administration** and then **Usage statistics** to view the usage statistics.

In the action bar, a date control allows you to select the month for which you want to see the usage statistics.

The three top panels show overall summary statistics as well as statistics separated for offloading and ad-hoc queries. If data from the month before the selected month is available, a tendency arrow illustrates whether the data volume of the selected month has decreased, increased, or stayed flat. The panels with the offloading and the ad-hoc query statistics additionally list the days with minimum/maximum volume as well as the daily average volume.

The table below the summary statistics shows the details on a per-day basis for the selected month. For each day, the volume offloaded and the volume queried are shown as well as their sum, which constitutes the daily volume. In addition the percentage of the monthly volume is shown, that is, how much did the daily volume contribute to the overall monthly volume. The date of each entry links to the [Query log](/datahub/operating-datahub/#viewing-audit-logs), which lists all queries for the respective day.

{{< c8y-admon-info >}}
The statistics are refreshed once per hour. Therefore, the statistics for the current month may not include the latest data. The statistics are deleted after a retention period, so for older months statistics may no longer be available.
{{< /c8y-admon-info >}}
