---
weight: 60
title: Limitations of inventory roles based access
layout: redirect
sector:
  - platform_administration
---

The {{< product-c8y-iot >}} inventory roles based access has some limitations and may change the behavior of the REST API. 

# [Optimized](https://{{< domain-c8y >}}/docs/standard-tenant/managing-permissions/#improving-performance)

The optimized performance can be applied only when : 
- The total number of items matching to filters is lower than **2000**. E.g. You are searching only active alarms with given type and number of such alarms is below 2000.
- You are fetching **Measurements**, **Alarms**, **Events** and **Control** for specific device

In other cases platform will apply the Legacy search algorithm.

# Legacy 

The legacy algorithm provides the following implications for REST API: 

- The **currentPage** query parameter will act as offset of scanned documents
- The REST API may return empty pages. Platform is searching the items that are accessible for user but the scan has limit per request. If in scanned items there is no accessible elements, then platform will result empty list. In such case the **statistics.next** url should be used to perform scan of next chunk. Platform will return **statistics.next** until there are items to scan. 