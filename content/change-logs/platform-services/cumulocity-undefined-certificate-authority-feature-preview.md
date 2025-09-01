---
date: '2025-04-17'
title: Enhanced certificate management with ability to sign and issue 
  certificates
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
lastmod: '2025-09-01T10:40:42Z'
---
{{< c8y-admon-preview >}}
This feature is in Public Preview, that is, it is not enabled by default and may be subject to change in the future.

To determine whether the feature is enabled, go to the Device Management application and navigate to Management → Trusted Certificates. If you see Add CA Certificate in the top-right corner of the page, the feature is enabled. If it is not enabled, please use the Feature Toggles REST endpoints or contact Global Support to enable the feature.
{{< /c8y-admon-preview >}}

{{< product-c8y-iot >}} has has been enhanced to function as a Certificate Authority (CA), providing the following capabilities:
- Manage signing certificates
- Accept Certificate Signing Requests (CSR)
- Perform legitimacy checks, as defined by each tenant
- Issue signed X.509 certificates trusted by the device tenant

For more details about this feature refer to [Certificate Authority (CA)](/device-certificate-authentication/certificate-authority).