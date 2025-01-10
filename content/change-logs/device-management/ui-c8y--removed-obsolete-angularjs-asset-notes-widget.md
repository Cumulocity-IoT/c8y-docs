---
date: ""
title: Removed obsolete AngularJS asset notes widget
product_area: Device management & connectivity
change_type:
  - value: change-3BQrQ6adS
    label: API change
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-3090
version: ""
---
As a result of the asset notes widget migration to Angular, the obsolete AngularJS asset notes module has been removed from the `@c8y/ng1-modules` package. If your application uses the **Asset notes widget**, you can use the new asset notes widget from the `@c8y/ngx-components/widget`s definitions as a replacement.