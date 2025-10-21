---
date: '2025-10-16'
title: Enhanced certificate management with ability to sign and issue certificates
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-64106
version: 2025.348.0
---
The certificate authority feature previously released in [Public Preview](/change-logs/?component=.component-authentication%2C.component-web-sdk#cumulocity-undefined-certificate-authority-feature-preview) is now Generally Available (GA).
It is available in CD versions 2025.348.0 and higher, and in the 2026 annual release.

The feature can be accessed in the Device Management application under Management → Trusted certificates, where the **Add CA Certificate** option is now available by default.

{{< product-c8y-iot >}} has been enhanced to function as a Certificate Authority (CA), providing the following capabilities:
- Manage signing certificates
- Accept Certificate Signing Requests (CSR)
- Perform legitimacy checks, as defined by each tenant
- Issue signed X.509 certificates trusted by the device tenant

For more details about this feature refer to [Certificate Authority (CA)](/device-certificate-authentication/certificate-authority).

{{< c8y-admon-caution >}}
Migration from Public Preview to General Availability - action required.

As part of the move to General Availability you need to remove all the devices you have registered under Public Preview and re-register them. All such devices will continue to be able to connect, but none of the other capabilities of the certificate lifecycle management will be available until they are re-registered.
{{< /c8y-admon-caution >}}