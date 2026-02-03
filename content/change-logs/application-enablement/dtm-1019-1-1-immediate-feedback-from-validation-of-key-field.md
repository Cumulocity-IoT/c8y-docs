---
date: 2023-12-14
title: Immediate feedback from validation of Key field
product_area: Application enablement & solutions
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-651
version: 1019.1.1
---
During the creation of asset models, asset properties and assets, upon entering input in the **Key** field, if the value entered is invalid then an error message will be shown, and if the value is valid and all required fields in the form are filled, the **Save** button will be enabled - no need to click outside the field. With de-bouncing implementation, the API requests are triggered after a short delay following the last key entry, significantly reducing the frequency of calls and enhancing the responsiveness of the application.