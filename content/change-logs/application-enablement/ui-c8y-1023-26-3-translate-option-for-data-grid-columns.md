---
date: ""
title: Simplified translation of data grid column values via translate option
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-65874
version: 1023.26.3
---
The data grid's column interface has been extended with the `translate` option. If set to `true` and no custom cell renderer component is used, then the `translate` pipe will automatically be applied to the column's value. This change makes it easier to translate column values. Previously, it required using a custom renderer template or component. For this option to work, the column values must be in English and the corresponding translations must be available in the loaded translation resources, for example in the standard application translations, or in the custom ones provided via the [localization feature](/standard-tenant/changing-settings/#localization) or in the [application options](/web/application-configuration/#languages-customization).
