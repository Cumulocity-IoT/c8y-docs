---
date: 
title: DevEUI retrieved from uplink request if not explicitly provided
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc--fVxjY7du
    label: actility-agent
ticket: DM-4592
version: 2.0.45
---
Previously, the Actility agent failed to process device requests when the DevEUI (end device identifier) was not included in the request payload.
This issue has been resolved - the agent now correctly retrieves the DevEUI from the uplink request if it is not explicitly provided, ensuring proper request handling.

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