---
weight: 45
title: Certificate authority
layout: bundle
sector:
  - device_management
---

Currently, X.509 certificate authentication in {{< product-c8y-iot >}} requires customers to manage their own PKI infrastructure, creating a significant adoption barrier.
Without a built-in way to issue and manage certificates on devices, adopting this secure authentication method becomes complex and operationally burdensome.
{{< product-c8y-iot >}} already supports certificate-based device authentication, ensuring secure communication through mutual authentication. However, this introduces an additional responsibility:

Each device must have a trusted certificate, issued after legitimacy checks.
These certificates need to be managed over time, including renewal and revocation.

To streamline certificate management, {{< product-c8y-iot >}} has been enhanced to function as a Certificate Authority (CA), providing the following capabilities:
    Manage signing certificates
    Accept Certificate Signing Requests (CSR)
    Perform legitimacy checks, as defined by each tenant
    Issue signed X.509 certificates trusted by the device tenant

This enhancement removes the need for external PKI management, allowing customers to adopt X.509 authentication more easily and seamlessly.
The {{< product-c8y-iot >}} CA service is based on the EST protocol due to its simple interactions between devices and the CA service. The following REST API endpoints support the provisioning and renewal of device certificates.
* `/.well-known/est/simpleenroll` to be used by a device to get a fresh new certificate. The device has to authenticate itself using its tenant, identifier and security token as the BasicAuth realm, user and password. These tenant, identifier and security token must be shared with {{< product-c8y-iot >}}.
* `/.well-known/est/simplereenroll` to be used by a device to renew its certificate or to substitute for a certificate. The device has to authenticate itself using its password or a JWT token (obtained using its certificate over MQTT).

{{< c8y-admon-info >}}
This feature is initially released as a public preview and is disabled by default at both the instance and tenant levels.
{{< /c8y-admon-info >}}