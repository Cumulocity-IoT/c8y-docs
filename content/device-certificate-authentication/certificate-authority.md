---
weight: 40
title: Certificate Authority
layout: bundle
sector:
  - device_management
---


{{< product-c8y-iot >}} includes a Certificate Authority (CA), providing the following capabilities:

- Manage signing certificates
- Accept Certificate Signing Requests (CSR)
- Perform legitimacy checks as defined by each tenant
- Issue signed X.509 certificates trusted by the device tenant

The {{< product-c8y-iot >}} CA service is based on the EST protocol due to its simple interactions between devices and the CA service. The following REST API endpoints support the provisioning and renewal of device certificates.
* `/.well-known/est/simpleenroll` to be used by a device to get a fresh new certificate. The device has to authenticate itself using its tenant, device serial, and one-time password as the BasicAuth. These credentials must be shared with {{< product-c8y-iot >}}.
* `/.well-known/est/simplereenroll` to be used by a device to renew its certificate or to substitute for a certificate. The device has to authenticate itself using its device-serial and password or a JWT token (obtained using its certificate over MQTT).

{{< c8y-admon-caution >}}
Migration from Public Preview to General Availability - action required.

As part of the move to General Availability you need to remove all the devices you have registered under Public Preview and re-register them. All such devices will continue to be able to connect, but none of the other capabilities of the certificate lifecycle management will be available until they are re-registered.
{{< /c8y-admon-caution >}}

The {{< product-c8y-iot >}} certificate management allows {{< product-c8y-iot >}} to sign and issue certificates.

The {{< product-c8y-iot >}} signed certificates are shown in the list of certificate authority (CA) certificates for a tenant along with the trust anchor certificates. In this list, the {{< product-c8y-iot >}} signed certificates are identifiable by the words TENANT CA.

This section outlines how to create a Certificate Authority (CA) for a tenant with {{< product-c8y-iot >}}.

### Prerequisites {#prerequisites}

To use the Certificate Authority API, this feature must be enabled at the tenant level. By default, it is enabled. You can verify whether the feature is enabled in your tenant using the following API:

    GET /features/certificate-authority
    Content-Type: application/json
    Authorization: Basic <<Base64 encoded bootstrap credentials>>

If you get 200 with `active: false` then the feature is disabled for the tenant.

    HTTP/1.1 200 OK
    Content-Type: application/json
    Content-Length: ...
    {
        "phase":"PUBLIC_PREVIEW",
        "active":false,
        "strategy":"TENANT",
        "key":"certificate-authority"
    }

There are two ways to enable the feature in your tenant.

Tenant Administrators who have the role `ROLE_TENANT_MANAGEMENT_ADMIN` can use the following API:

    PUT /features/certificate-authority/by-tenant
    Content-Type: application/json
    Authorization: Basic <<Base64 encoded bootstrap credentials>>
    ...
    {
       "active": true
    }

Operations team personnel, who have access to the {{< management-tenant >}} using a user with the role `ROLE_TENANT_MANAGEMENT_ADMIN`, can enable the feature in any subtenant using the following API:

    PUT /features/certificate-authority/by-tenant/{{tenantId}}
    Content-Type: application/json
    Authorization: Basic <<Base64 encoded bootstrap credentials>>
    ...
    {
       "active": true
    }

### Creating a CA certificate via REST {#creating-a-ca-certificate-via-the-rest}

To create a new CA certificate for a tenant the Certificate Authority API must be called. This triggers the following actions:

* A new key pair is created and a certificate is self-signed with `tenantID` as the Common Name (CN).
* The private key is stored in an encrypted tenant option.
* The certificate is stored in the trusted certificate repository with auto-registration turned on by default. Devices can only be registered automatically when the administrator turns this option on.
* If a CA is already present, a respective message is returned.
* If the CA is removed from the trusted certificate list, the corresponding private key is removed from the database collection.

This is an example of a REST request:

    POST /certificate-authority
    Content-Type: application/json
    Authorization: Basic <<Base64 encoded bootstrap credentials>>

The following response is returned:

    HTTP/1.1 201 OK
    Content-Type: application/json
    Content-Length: ...
    {
        ......
        "subject":"CN={tenantId}, O=Cumulocity",
        "tenantCertificateAuthority":true,
        "autoRegistrationEnabled":true,
        "status":"ENABLED"
        ....
    }
This certificate is identified as a TENANT CA and it has the attribute `"tenantCertificateAuthority":true`.

{{< c8y-admon-info >}}
To call `/certificate-authority`, your role must include ADMIN permission for "Tenant" (API string = `ROLE_TENANT_ADMIN`) or "Tenant management" (API string = `ROLE_TENANT_MANAGEMENT_ADMIN`). Without this, the request will fail (HTTP 403 error).
{{< /c8y-admon-info >}}

### Creating a CA certificate via the UI {#creating-a-ca-certificate-via-the-ui}

If the Certificate Authority feature is disabled the button **Add CA certificate** is not visible.

![CA is disabled](/images/certificate-authority/disabledCertificateAuthority.png)

Follow the instructions in [Prerequisites](#prerequisites) to enable it. After enabling the feature, the UI will show the button **Add CA certificate**.

![CA is enabled](/images/certificate-authority/enabledCertificateAuthority.png)

1. In the Device Management application, navigate to the **Management** menu in the navigator and select **Trusted certificates**.
2. Click **Add CA certificate** at the top right to create the CA certificate.
3. Once the CA has been created the **Add CA certificate** button and the API are both disabled as only one CA is allowed per tenant. If you want to replace the certificate you need to remove the current CA.

The new CA certificate will be added to the trusted certificates list:

![Trusted CA certificate added](/images/certificate-authority/trustedCAadded.png)

### Auto-renewal of CA certificates {#auto-renewal-of-ca-certificate}

Tenant Certificate Authority (CA) is automatically renewed on 2 October at 02:00 AM every year. The renewal process ensures that existing device certificates remain valid until their expiration. This auto-renewal mechanism ensures uninterrupted certificate management while maintaining security and compliance.
If automatic renewal fails, the renewal can also be performed via API, but only if the current Certificate Authority (CA) has less than 24 months remaining before expiration.

This is an example of a REST request:

    POST /certificate-authority/renew
    Content-Type: application/json
    Authorization: Basic <<Base64 encoded bootstrap credentials>>

The following response is returned:

    HTTP/1.1 200 OK
    Content-Type: application/json
    Content-Length: ...
    {
        ......
        "subject":"CN={tenantId}, O=Cumulocity",
        "tenantCertificateAuthority":true,
        "autoRegistrationEnabled":true,
        "status":"ENABLED"
        ....
    }

{{< c8y-admon-info >}}
In order to call `/certificate-authority/renew` one of the following roles is required: ROLE_TENANT_MANAGEMENT_ADMIN or ROLE_TENANT_ADMIN. Otherwise, an HTTP response 403 is returned.
{{< /c8y-admon-info >}}

* Each CA certificate has a validity of 1095 days (3 years) and undergoes automatic renewal in the background.
* All CA metadata, private keys, and public keys remain unchanged, ensuring a seamless renewal process. Only `NotAfter` and `NotBefore` wil be changed.
* Device certificates issued by the CA continue to have 1 year validity from issuance date, and new device certificates can be issued without disruption.
* If a CA certificate has a near expiration date, then an error banner will be displayed in the UI for this certificate.
* An audit log is generated both when the CA certificate is refreshed and when a refresh is determined to be not yet required.
