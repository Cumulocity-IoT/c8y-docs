---
weight: 60
title: Provisioned certificates
layout: bundle
sector:
  - device_management
outputs:
  - html
  - json
helpcontent:
  - label: provisioned-certificates
    title: Provisioned certificates
    content: "Cumulocity-issued certificates are displayed in the device details on the **X509** tab."
---


This section describes how to view and revoke provisioned certificates.

Open the **x509** tab in the details of a specific device to view currently issued certificates.

![List of provisioned certificates](/images/certificate-authority/provisionedCertificates.png) 

| Field         | Description                                                                                                  | Example             |
|---------------|--------------------------------------------------------------------------------------------------------------|---------------------|
| Serial number | Serial number of the certificate in hexadecimal format.                                                      | 1989853f938         |
| Not after     | The date and time after which the certificate is no longer valid. This is effectively the certificate's **expiry date**, and any connection attempt using it after this time will fail the TLS/SSL handshake. | Aug 11, 2027, 2:21:36 PM |
| Not before    | The date and time before which the certificate is not yet valid. This is typically the **issuance date**, and a certificate cannot be used before this point in time. | Aug 11, 2026, 2:21:36 PM |


{{< c8y-admon-info >}}
Issued certificates have a validity of 1 year, which is not configurable.
{{< /c8y-admon-info >}}

Only certificates that are used during a successful handshake with the platform are recorded in the provisioned certificates list.

Although only the last 5 entries are stored (based on the issue date), there is no restriction on the number of certificates that can be issued for a given device.


### To revoke a provisioned certificate {#to-revoke-a-provisioned-certificate}

Provisioned certificates can be revoked by clicking the adjacent delete icon <i class="dlt-c8y-icon-editing-trash text-danger icon-20"></i> for each entry, or by using multi-select. 

![Revocation of provisioned certificates](/images/certificate-authority/provisionedCeritificateRevocation.png) 

Alternatively, revocation can also be performed from the existing [CRL settings](/device-certificate-authentication/managing-trusted-certificate-settings/#to-enable-offline-revocation).
