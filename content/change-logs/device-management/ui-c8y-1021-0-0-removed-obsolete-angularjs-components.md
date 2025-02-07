---
date: 2025-02-07
title: Removed obsolete AngularJS components
product_area: Device management & connectivity
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-3707
version: 1021.0.0
---
As part of our ongoing improvements , we have in a previous version removed several legacy components related to **configuration management, device list handling, and column configuration**. These changes impact outdated services, directives, and templates that have either been **migrated to Angular or deprecated** due to lack of usage.

* **Configuration Repository**: The entire module, including its service, controllers, tests, and UI templates, has been **removed** – now **moved to Angular**.
* **Configurable Device List Columns**: Services, constants, directives, and modal components related to column customization have been **removed** – now **moved to Angular**.
* **Device List Handling**: Controllers, directives, and configuration files related to device listings have been **removed** – now **moved to Angular**.
* **Device Details & Availability**: Several templates and directives managing **device details, availability, group selection, firmware, hardware, and network information** were **removed** – **no longer used**.

If you were relying on any of the removed components, please migrate to the new **Angular-based** solutions.