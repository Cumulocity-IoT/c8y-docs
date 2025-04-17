---
date: '2025-04-17'
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
This feature is in Public Preview, that is, it is not enabled by default and may be subject to change in the future.

In order to determine if the feature is enabled go to the Device Management app and look at the Management/Trusted Certificates page. If on the top right of the page you see `Add CA Certificate` then the feature is enabled. If it is not enabled please contact Global Support to request the feature to be enabled.
{{< /c8y-admon-preview >}}

{{< product-c8y-iot >}} has has been enhanced to function as a Certificate Authority (CA), providing the following capabilities:
- Manage signing certificates
- Accept Certificate Signing Requests (CSR)
- Perform legitimacy checks, as defined by each tenant
- Issue signed X.509 certificates trusted by the device tenant

For more details about this feature refer to [Certificate Authority (CA)](/device-integration/certificate-authority-bundle/create-certificate-authority.md).