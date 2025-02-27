---
date: ""
title: Enhanced certificate management with ability to sign and issue certificates
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-60958
version: 1021.45.0
---
{{< product-c8y-iot >}} has enhanced the certificate management with the ability for {{< product-c8y-iot >}} to sign and issue certificates. This means that the list of certificates in a tenant, which previously only contained the  trust anchor certificates, does now also include the {{< product-c8y-iot >}} signed certificates. The latter are identifiable by the words TENANT CA.