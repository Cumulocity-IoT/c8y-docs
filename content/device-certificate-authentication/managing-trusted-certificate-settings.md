---
weight: 41
title: Managing trusted certificate settings
layout: redirect
helpcontent:
  - label: managing-trusted-certificate-settings
    title: Trusted certificates settings
    content: "Administrators can configure the Certificate Revocation List (CRL) settings (online or offline). If the revoked certificate information is maintained by the issuing Certificate Authority (CA), the online check option can be selected. If the CA does not maintain the CRL information, the offline setup can be selected. In offline setup, the revoked certificate serial number can either be added manually or can be uploaded in bulk using the file template attached."
---

{{< product-c8y-iot >}} allows administrators to fine-tune various certificate configurations.
Currently, Certificate Revocation List (CRL) is supported.

{{< c8y-admon-info >}}
This section targets at advanced users for granular control over certificate attributes like CRL, OCSP, Certificate
Policy and PKI.
If you are unfamiliar with these terms it's advisable to leave the defaults.
Bad configuration might result in changes which cannot be reversed.
{{< /c8y-admon-info >}}

### CRL settings {#crl-settings}

In general, Certificate Revocation List (CRL) contains a list of serial numbers of revoked certificates.
These are issued by Certificate Authorities (CAs) periodically and published through an endpoint called CRL
Distribution Point (CDP).
Revocation reasons and dates are included in the CRL.

In {{< product-c8y-iot >}} terms, if there is a breach at device certificates signed by a trust anchor, users
can inform the platform about the revoked certificates in two ways:

1. Online revocation :
   To perform online revocation checks, the device administrator is expected to upload a trusted CA
   which maintains the CRLs with the list of revoked certificate serial numbers
   and should provide this information in its CDP attribute.
2. Offline revocation :
    The trusted CA doesn't maintain the revocation details of the certificates, in which case, the platform users
   can manually upload the serial numbers of the revoked certificates.

Note that both online and offline CRL checks are by default **unchecked**.

{{< c8y-admon-important >}}
Certificate revocation is an irreversible process. So, offline entries once made cannot be removed.
{{< /c8y-admon-important >}}

#### To enable online revocation {#to-enable-online-revocation}

![CRl Details](/images/users-guide/DeviceManagement/devmgmt-crl-online-option-check.png)

1. Click **CRL check** in the upper right corner of the screen.
2. Enable the **Online** option.

#### To enable offline revocation {#to-enable-offline-revocation}

![CRl Details](/images/users-guide/DeviceManagement/devmgmt-crl-offline-option-check.png)

1. Click **CRL check** in the upper right corner to enable the offline revocation of the screen.
2. Check the **Offline** checkbox.
3. To add revoked certificate serial numbers manually, enter the serial number and date in the **Revoked certificates list**
   panel.

   Click <img src="/images/icons/add-more.png" alt="Down" style="max-width: 100%; display: inline-block; margin-bottom: 3px;"> to add new entries in the format below:
   | Field | Description | Example |
   |:------------------|:------------------------------------------------------------|:----------|
   | Serial number | Must be a hexadecimal value.| 0b8a5b9dd501a88775399b9a048811a3 |
   | Date (optional)       | Date format: `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`. | 2024-01-17T10:48:51.000Z |
4. 4. Click **Save** to confirm your entries.

{{< c8y-admon-info >}}
If the date field is empty or a future date, then the current date is used.
{{< /c8y-admon-info >}}

#### Offline CRL bulk upload {#offline-crl-bulk-upload}

{{< c8y-admon-info >}}
Revoked certificate serial numbers can be added in bulk.
Each file can hold at maximum 5000 revocation entries.
If the date is in the future then it defaults to the current date.
In case of a duplicate, the existing entry is retained.
{{< /c8y-admon-info >}}

To bulk upload, follow these steps:

1. Download the CSV template from the **Revoked certificates list** panel.
2. Fill in all revoked certificate serial numbers and revocation dates.
3. Upload the filled CSV file using file upload.

#### To download or view the offline CRL file {#to-download-or-view-the-offline-crl-file}

In the **Revoked certificates list** panel, click **Download CRL file**.
