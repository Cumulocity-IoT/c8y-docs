---
weight: 60
title: Limitations of inventory roles based access
layout: redirect
sector:
  - platform_administration
---

The {{< product-c8y-iot >}} inventory roles based access has some limitations and may change the behavior of the REST API. 

### Optimized

The [optimized performance](/standard-tenant/managing-permissions/#improving-performance) can be applied only when: 
- The total number of items matching the filters is lower than **2000**. For example, if you are searching only active alarms with a given type and the number of such alarms is below 2000.
- You are fetching measurements, alarms, events, and control for a specific device.

In other cases platform will apply the Legacy search algorithm.

### Legacy 

The legacy algorithm provides the following implications for the REST API: 

- The `currentPage` query parameter will act as offset of scanned documents.
- The REST API may return empty pages. {{< product-c8y-iot >}} searches the items that are accessible for the user but the scan has a limit per request. If there is no accessible element in the scanned items, the platform will result an empty list. In such case, the `statistics.next` URL should be used to perform a scan of the next chunk. {{< product-c8y-iot >}} will return **statistics.next** until there are items to scan. 