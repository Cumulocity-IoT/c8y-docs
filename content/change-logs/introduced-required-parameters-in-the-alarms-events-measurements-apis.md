---
date: 2023-12-06T11:11:58.877Z
title: Introduced required parameters in the Alarms, Events, Measurements APIs
change_type:
  - value: change-inv-3bw8e
    label: Announcement
product_area:
  - value: product_area-T1-_TpDyv
    label: Platform services
component:
  - value: component-JlFdtOPva
    label: Rest API
technical_component:
  - value: tc-QHwMfWtBk7
    label: cumulocity
---
As announced earlier, see also [release 10.17](https://cumulocity.com/releasenotes/release-10-17-0/announcements-10-17-0), at least one query parameter limiting the affected data will now be required to prevent accidental deletion of too many objects during a bulk delete operation.
This change affects the following APIs:

* `DELETE /alarm/alarms` requires at least one of the following parameters: `source`, `dateFrom`, `dateTo`, `createdFrom`, `createdTo`
* `DELETE /event/events` requires at least one of the following parameters: `source`, `dateFrom`, `dateTo`, `createdFrom`, `createdTo`
* `DELETE /measurements/measurement` requires at least one of the following parameters: `source`, `dateFrom`, `dateTo`