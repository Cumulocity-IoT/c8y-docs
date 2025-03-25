---
date: '2025-04-01'
title: Enhanced certificate management with ability to sign and issue certificates
product_area: Platform services
change_type:
  - value: change-pXAlHAWka
    label: Preview
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-62765
---
{{< c8y-admon-preview >}}
This feature is in Public Preview, that is, it is not enabled by default and maybe subject to change in the future.
{{< /c8y-admon-preview >}}

{{< product-c8y-iot >}} has enhanced the certificate management with the ability for {{< product-c8y-iot >}} to sign and issue certificates. This means that the list of certificates in a tenant, which previously only contained the  trust anchor certificates, does now also include the {{< product-c8y-iot >}} signed certificates. The latter are identifiable by the words TENANT CA.