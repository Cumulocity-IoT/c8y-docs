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
As thin-edge.io is a key initiative for Cumulocity, customer feedback highlights the need for a simpler approach to certificate management.

Proposed Solution: Cumulocity as a Certificate Authority (CA)
To streamline certificate management, we propose extending Cumulocity to:
    Manage signing certificates
    Accept Certificate Signing Requests (CSR)
    Perform legitimacy checks, as defined by each tenant
    Issue signed X.509 certificates trusted by the device tenant

This enhancement will eliminate the need for external PKI management, making it easier for customers to adopt X.509 authentication seamlessly.

* `/.well-known/est/simpleenroll` to be used by a device to get a fresh new certificate. The device has to authenticate itself using its tenant, identifier and security token as the BasicAuth realm, user and password. These tenant, identifier and security token must be shared with {{< product-c8y-iot >}}.
* `/.well-known/est/simplereenroll` to be used by a device to renew its certificate or to substitute for a certificate. The device has to authenticate itself using its password or a JWT token (obtained using its certificate over MQTT).

{{< c8y-admon-info >}}
This feature is initially released as a public preview and is disabled by default at both the instance and tenant levels.
{{< /c8y-admon-info >}}