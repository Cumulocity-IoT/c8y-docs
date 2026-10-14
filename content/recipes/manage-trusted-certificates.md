---
title: Manage trusted certificates
description: Upload the CA certificates that a tenant trusts for device authentication, list and update them, prove possession of their private key, and remove them.
weight: 30
sector:
  - recipes
  - device_management
api:
  - operation: postTrustedCertificateCollectionResource
    method: POST
    path: /tenant/tenants/{tenantId}/trusted-certificates
    title: Add a new certificate
  - operation: postTrustedCertificateCollectionResourceBulk
    method: POST
    path: /tenant/tenants/{tenantId}/trusted-certificates/bulk
    title: Add multiple certificates
  - operation: getTrustedCertificateCollectionResource
    method: GET
    path: /tenant/tenants/{tenantId}/trusted-certificates
    title: Retrieve all stored certificates
  - operation: getTrustedCertificateResource
    method: GET
    path: /tenant/tenants/{tenantId}/trusted-certificates/{fingerprint}
    title: Retrieve a stored certificate
  - operation: putTrustedCertificateResource
    method: PUT
    path: /tenant/tenants/{tenantId}/trusted-certificates/{fingerprint}
    title: Update a stored certificate
  - operation: postVerificationCodeTrustedCertificatesPopResource
    method: POST
    path: /tenant/tenants/{tenantId}/trusted-certificates-pop/{fingerprint}/verification-code
    title: Generate a verification code for the proof of possession
  - operation: postTrustedCertificatePopResource
    method: POST
    path: /tenant/tenants/{tenantId}/trusted-certificates-pop/{fingerprint}/pop
    title: Provide the proof of possession
  - operation: deleteTrustedCertificateResource
    method: DELETE
    path: /tenant/tenants/{tenantId}/trusted-certificates/{fingerprint}
    title: Remove a stored certificate
---

Devices can authenticate with X.509 certificates instead of passwords. {{< product-c8y-iot >}} accepts a device certificate if the certificate authority (CA) that signed it is a trusted certificate of the tenant, and if that trusted certificate is enabled.

Upload the root certificate or an intermediate certificate of the chain that signs your device certificates. Do not upload the certificate of each device.

A trusted certificate must meet the following requirements:

* It is an X.509 certificate in PEM format.
* It is in version 3.
* It contains `BasicConstraints:[CA:true]`.
* It is still valid.
* It is not yet uploaded to {{< product-c8y-iot >}}.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To add, update, and remove trusted certificates: ROLE_TENANT_MANAGEMENT_ADMIN or ROLE_TENANT_ADMIN
* To read trusted certificates: ROLE_TENANT_MANAGEMENT_READ
{{< /c8y-admon-req >}}

The examples use `<tenant_id>` for the ID of your tenant and `<fingerprint>` for the fingerprint of a trusted certificate. The platform calculates the fingerprint when you upload the certificate. To find your tenant ID, send `GET /tenant/currentTenant` and read the `name` property. Send the header `Accept: application/json` with every POST and PUT request, otherwise the response has no body.

### To upload a certificate {#to-upload-a-certificate}

Send an [Add a new certificate](https://{{< domain-c8y >}}/api/core/#operation/postTrustedCertificateCollectionResource) request:

```http
POST /tenant/tenants/<tenant_id>/trusted-certificates
Content-Type: application/json
Accept: application/json

{
  "certInPemFormat": "-----BEGIN CERTIFICATE-----\nMIIDhzCCAm+gAwIBAgIUQ...\n-----END CERTIFICATE-----",
  "name": "My device CA",
  "status": "ENABLED",
  "autoRegistrationEnabled": false
}
```

The request has the following properties:

* `certInPemFormat`: The certificate in PEM format, with the line breaks escaped as `\n`.
* `name`: A name of your choice. {{< product-c8y-iot >}} does not use it.
* `status`: ENABLED or DISABLED. Devices with a certificate that is signed by a DISABLED certificate cannot connect.
* `autoRegistrationEnabled`: If `true`, the platform automatically registers new devices that connect with a certificate signed by this CA. This does not apply to devices that use the LWM2M protocol.

The platform returns HTTP 201 and the stored certificate. Note its `fingerprint` as `<fingerprint>`. The platform reads `issuer`, `subject`, `notBefore`, `notAfter`, `serialNumber`, and the other certificate details from the certificate. You cannot change them.

If the platform returns HTTP 409, the certificate is already uploaded. If it returns HTTP 422, the certificate does not meet the requirements.

### To upload several certificates at once {#to-upload-several-certificates-at-once}

Send an [Add multiple certificates](https://{{< domain-c8y >}}/api/core/#operation/postTrustedCertificateCollectionResourceBulk) request with one entry per certificate:

```http
POST /tenant/tenants/<tenant_id>/trusted-certificates/bulk
Content-Type: application/json
Accept: application/json

{
  "certificates": [
    {
      "certInPemFormat": "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----",
      "name": "Plant A CA",
      "status": "ENABLED",
      "autoRegistrationEnabled": false
    },
    {
      "certInPemFormat": "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----",
      "name": "Plant B CA",
      "status": "ENABLED",
      "autoRegistrationEnabled": false
    }
  ]
}
```

The platform returns HTTP 201 and the stored certificates with their fingerprints. If one of the certificates is already uploaded, the platform returns HTTP 409. Remove that certificate from the list and send the request again.

### To list and read trusted certificates {#to-list-and-read-trusted-certificates}

To list all trusted certificates of the tenant, send a [Retrieve all stored certificates](https://{{< domain-c8y >}}/api/core/#operation/getTrustedCertificateCollectionResource) request:

```http
GET /tenant/tenants/<tenant_id>/trusted-certificates?pageSize=2000
```

The `certificates` array of the response contains each certificate with its `fingerprint`, `name`, `status`, and validity.

To read one certificate, send a [Retrieve a stored certificate](https://{{< domain-c8y >}}/api/core/#operation/getTrustedCertificateResource) request:

```http
GET /tenant/tenants/<tenant_id>/trusted-certificates/<fingerprint>
```

### To enable, disable, or rename a trusted certificate {#to-enable-disable-or-rename-a-trusted-certificate}

You can change the `name`, the `status`, and `autoRegistrationEnabled`. All other properties come from the certificate and cannot be changed.

Send an [Update a stored certificate](https://{{< domain-c8y >}}/api/core/#operation/putTrustedCertificateResource) request:

```http
PUT /tenant/tenants/<tenant_id>/trusted-certificates/<fingerprint>
Content-Type: application/json
Accept: application/json

{
  "name": "My device CA (old)",
  "status": "DISABLED"
}
```

The platform returns HTTP 200 and the updated certificate. After you disable a certificate, devices with a certificate signed by this CA cannot connect anymore.

### To prove possession of the private key {#to-prove-possession-of-the-private-key}

The public part of a certificate is not secret, so anyone can upload it. With a proof of possession, you show that you own the private key of the certificate. See [Perform a proof of possession](/device-certificate-authentication/device-certificates/#perform-a-proof-of-possession) for the background.

1. Send a [Generate a verification code](https://{{< domain-c8y >}}/api/core/#operation/postVerificationCodeTrustedCertificatesPopResource) request without a body:

    ```http
    POST /tenant/tenants/<tenant_id>/trusted-certificates-pop/<fingerprint>/verification-code
    Accept: application/json
    ```

    The response contains the code in `proofOfPossessionUnsignedVerificationCode` and its expiry time in `proofOfPossessionVerificationCodeUsableUntil`.

2. Save the code in a file, for example *verification_code.txt*, and sign it with the private key of the certificate:

    ```shell
    openssl dgst -sha256 -sign <private.key> verification_code.txt | openssl base64 -A
    ```

3. Send a [Provide the proof of possession](https://{{< domain-c8y >}}/api/core/#operation/postTrustedCertificatePopResource) request with the signed code:

    ```http
    POST /tenant/tenants/<tenant_id>/trusted-certificates-pop/<fingerprint>/pop
    Content-Type: application/json
    Accept: application/json

    {
      "proofOfPossessionSignedVerificationCode": "<signed_verification_code>"
    }
    ```

The platform returns HTTP 200 and the certificate with `"proofOfPossessionValid": true`. If it returns HTTP 400, the signed code is wrong. Sign the current code again and send it again.

### To remove a trusted certificate {#to-remove-a-trusted-certificate}

{{< c8y-admon-caution >}}
When you remove a trusted certificate, the platform closes the MQTT connections of all devices that use a certificate signed by this CA.
{{< /c8y-admon-caution >}}

Send a [Remove a stored certificate](https://{{< domain-c8y >}}/api/core/#operation/deleteTrustedCertificateResource) request:

```http
DELETE /tenant/tenants/<tenant_id>/trusted-certificates/<fingerprint>
```

The platform returns HTTP 204. If it returns HTTP 404, the certificate does not exist anymore.
