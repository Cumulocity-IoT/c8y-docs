---
title: Create and renew the tenant certificate authority
description: Enable and create the certificate authority of your tenant, find and renew it, and register devices that enroll for certificates signed by it.
weight: 400
sector:
  - device_management
requires:
  - authentication
api:
  - operation: getCurrentTenantFeature
    method: GET
    path: /features/{featureKey}
    title: Retrieve a specific feature toggle with value for current tenant.
  - operation: setCurrentTenantFeatureToggleValue
    method: PUT
    path: /features/{featureKey}/by-tenant
    title: Sets the value of feature toggle override for the current tenant.
  - operation: postCertificateAuthorityResource
    method: POST
    path: /certificate-authority
    title: Create Certificate Authority(CA) for a tenant with CN as tenantID
  - operation: getTrustedCertificateCollectionResource
    method: GET
    path: /tenant/tenants/{tenantId}/trusted-certificates
    title: Retrieve all stored certificates
  - operation: postRenewCertificateAuthorityResource
    method: POST
    path: /certificate-authority/renew
    title: Renew Certificate Authority(CA) for a tenant with existing public and private keys.
  - operation: postNewDeviceRequestCollectionResource
    method: POST
    path: /devicecontrol/newDeviceRequests
    title: Create a new device request
  - operation: deleteTrustedCertificateResource
    method: DELETE
    path: /tenant/tenants/{tenantId}/trusted-certificates/{fingerprint}
    title: Remove a stored certificate
---

{{< product-c8y-iot >}} includes a certificate authority (CA) that signs X.509 certificates for your devices. Devices request their certificates with the EST protocol (Enrollment over Secure Transport). The platform signs them with the CA of your tenant.

When you create the CA, the platform does the following:

* It creates a key pair and a self-signed certificate with your tenant ID as common name (CN).
* It stores the private key in an encrypted tenant option.
* It stores the certificate as a trusted certificate of the tenant, with auto-registration enabled.

Each tenant has only one CA. The platform renews the CA automatically once a year. If you remove the CA from the trusted certificates, the platform also removes its key pair.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To create, renew, and remove the CA: ROLE_TENANT_MANAGEMENT_ADMIN or ROLE_TENANT_ADMIN
* To enable the certificate authority feature: ROLE_TENANT_MANAGEMENT_ADMIN
* To register a device for enrollment: ROLE_DEVICE_CONTROL_ADMIN
{{< /c8y-admon-req >}}

The examples use `<tenant_id>` for the ID of your tenant and `<fingerprint>` for the fingerprint of the CA certificate.

### To check that the certificate authority feature is enabled {#to-check-that-the-certificate-authority-feature-is-enabled}

The certificate authority feature is enabled by default.

1. Send a [Retrieve a specific feature toggle with value for current tenant.](https://{{< domain-c8y >}}/api/core/#operation/getCurrentTenantFeature) request:

    ```http
    GET /features/certificate-authority
    ```

    The platform returns HTTP 200 and the feature toggle. If it contains `"active": true`, continue with [To create the certificate authority](#to-create-the-certificate-authority).

2. If the response contains `"active": false`, send a [Sets the value of feature toggle override for the current tenant.](https://{{< domain-c8y >}}/api/core/#operation/setCurrentTenantFeatureToggleValue) request:

    ```http
    PUT /features/certificate-authority/by-tenant
    Content-Type: application/json
    Accept: application/json

    {
      "active": true
    }
    ```

    The platform returns HTTP 200. Check the feature again with step 1.

### To create the certificate authority {#to-create-the-certificate-authority}

Send a [Create Certificate Authority(CA) for a tenant with CN as tenantID](https://{{< domain-c8y >}}/api/core/#operation/postCertificateAuthorityResource) request without a body:

```http
POST /certificate-authority
Accept: application/json
```

The platform returns HTTP 201 and the trusted certificate of the CA with the following properties:

* `"tenantCertificateAuthority": true`: The certificate is the CA of the tenant.
* `"status": "ENABLED"`
* `"autoRegistrationEnabled": true`
* `fingerprint`: Note it as `<fingerprint>`.

To change the name, the status, or the auto-registration of the CA, update it like any other trusted certificate, see [Manage trusted certificates](/skills/manage-trusted-certificates/#to-enable-disable-or-rename-a-trusted-certificate).

The platform returns the following errors:

* **HTTP 409**: The tenant already has a CA. Do not create a second one and do not remove the existing one. Find it as described in [To find the certificate authority](#to-find-the-certificate-authority).
* **HTTP 404**: The certificate authority feature is not available for your tenant. Check the feature, see [To check that the certificate authority feature is enabled](#to-check-that-the-certificate-authority-feature-is-enabled).
* **HTTP 422**: The key pair configuration is invalid.

### To find the certificate authority {#to-find-the-certificate-authority}

The CA is one of the trusted certificates of your tenant. To find it, send a [Retrieve all stored certificates](https://{{< domain-c8y >}}/api/core/#operation/getTrustedCertificateCollectionResource) request with the parameter `certificateAuthority=true`:

```http
GET /tenant/tenants/<tenant_id>/trusted-certificates?certificateAuthority=true&pageSize=100
```

The platform returns HTTP 200. The `certificates` array contains one certificate with `"tenantCertificateAuthority": true`. Note its `fingerprint` as `<fingerprint>`. If the array is empty, the tenant has no CA. Create it as described in [To create the certificate authority](#to-create-the-certificate-authority).

### To renew the certificate authority {#to-renew-the-certificate-authority}

The platform renews the CA automatically. Renew it yourself only if the automatic renewal failed. The renewal keeps the existing key pair and changes only the validity of the certificate.

Send a [Renew Certificate Authority(CA) for a tenant with existing public and private keys.](https://{{< domain-c8y >}}/api/core/#operation/postRenewCertificateAuthorityResource) request without a body:

```http
POST /certificate-authority/renew
Accept: application/json
```

The platform returns HTTP 201 and the trusted certificate of the CA with the new `notBefore` and `notAfter` dates.

If the platform returns HTTP 404, the tenant has no CA, or the CA has more than 18 months of validity left and cannot be renewed yet. In the second case, the CA stays valid without changes.

### To register a device for certificate enrollment {#to-register-a-device-for-certificate-enrollment}

Before a device can request a certificate, register its ID together with a one-time password. The device uses both as temporary credentials when it requests its first certificate.

The example uses `<device_serial>` for the ID of the device, for example its serial number, and `<one_time_password>` for the one-time password.

Send a [Create a new device request](https://{{< domain-c8y >}}/api/core/#operation/postNewDeviceRequestCollectionResource) request with the one-time password in `enrollmentToken`:

```http
POST /devicecontrol/newDeviceRequests
Content-Type: application/json
Accept: application/json

{
  "id": "<device_serial>",
  "enrollmentToken": "<one_time_password>"
}
```

The platform returns HTTP 201 and the new device request. The device is added to the device registrations with the status ACCEPTED.

To register many devices at once, upload a CSV file with the columns `ID`, `AUTH_TYPE` with the value `CERTIFICATES`, and `ENROLLMENT_OTP` with the one-time password, see [Simple device enrollment](/device-certificate-authentication/device-enroll-and-re-enroll/).

The device then requests its certificate itself. You do not send these requests:

* To get its first certificate, the device sends a certificate signing request (CSR) in PKCS#10 format to `POST /.well-known/est/simpleenroll` with the header `Content-Type: application/pkcs10`. It authenticates with basic authentication, using its ID and the one-time password. The common name (CN) of the CSR must be the ID of the device. A CSR with the constraint `CA:TRUE` is not supported.
* The platform returns HTTP 201 and the device certificate in PKCS#7 format (`application/pkcs7-mime;smime-type=certs-only`), signed by the CA of the tenant. If the platform returns HTTP 401, the ID and the one-time password are not registered or are wrong. Register them again.
* To renew its certificate, the device sends a new CSR to `POST /.well-known/est/simplereenroll`. It authenticates with its current credentials or with a JWT token that it obtained with its current certificate.

For the requests of the device, see [Device enrollment](https://{{< domain-c8y >}}/api/core/#tag/Device-enrollment) in the {{< openapi >}} and [Simple device enrollment](/device-certificate-authentication/device-enroll-and-re-enroll/).

### To remove the certificate authority {#to-remove-the-certificate-authority}

{{< c8y-admon-caution >}}
When you remove the CA, the platform also removes its key pair and closes the MQTT connections of all devices that use a certificate signed by the CA. Remove the CA only if you want to replace it.
{{< /c8y-admon-caution >}}

Send a [Remove a stored certificate](https://{{< domain-c8y >}}/api/core/#operation/deleteTrustedCertificateResource) request with the fingerprint of the CA:

```http
DELETE /tenant/tenants/<tenant_id>/trusted-certificates/<fingerprint>
```

The platform returns HTTP 204. You can then create a new CA.
