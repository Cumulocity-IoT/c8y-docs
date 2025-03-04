---
weight: 20
title: Create certificate authority
layout: redirect
---

The {{< product-c8y-iot >}} certificate management allows {{< product-c8y-iot >}} to sign and issue certificates. Along with the trust anchor certificates the list of certificates in a  tenant shows the {{< product-c8y-iot >}} signed certificates. The {{< product-c8y-iot >}} signed certificates are identifiable by the words TENANT CA.
In this tutorial, you will learn how to create certificate authority(CA) for tenant with {{< product-c8y-iot >}}.

### Prerequisites {#prerequisites}

In order to follow this tutorial, check the following prerequisites:

* You have a valid tenant, a user and a password in order to access {{< product-c8y-iot >}}.
* Certificate Authority feature enabled on instance and tenant level.

For creating a new tenant's certificate authority(CA) create certificate authority API need to be called. These following things happen when we call this API:

* Create a new key pair and self-sign a certificate with <tenantID> as the Common Name (CN).
* Store the private key in an encrypted tenant option.
* Store the certificate in the trusted certificate repository with auto-registration unchecked by default. The devices can be registered automatically only when device administrator checks this option ON.
* If the CA certificate is removed from the trusted certificate list, remove the corresponding private key from the database collection.
* If a CA is already present, return a message indicating the CA is already present.

This is example of REST request:

    POST /certificate-authority
    Content-Type: application/json
    Authorization: Basic <<Base64 encoded bootstrap credentials>>

The following response is returned:

    HTTP/1.1 201 OK
    Content-Type: application/json
    Content-Length: ...
    {
        ......
        "subject":"CN={tenantId}, O=Cumulocity, C=United States",
        "tenantCertificateAuthority":true,
        "autoRegistrationEnabled":false,
        "status":"ENABLED"
        ....
    }
This certificate identified as a TENANT CA and it has attribute `"tenantCertificateAuthority":true`.

{{< c8y-admon-info >}}
Note that it is possible to call this endpoint without the ROLE_TENANT_MANAGEMENT_ADMIN or ROLE_TENANT_MANAGEMENT_READ role, but only when user is a service user. Otherwise, if the the user does not have the required role, an HTTP response 403 will be returned.
<section><h5>Required roles</h5>
ROLE_TENANT_MANAGEMENT_ADMIN
ROLE_TENANT_MANAGEMENT_READ
</section>
{{< /c8y-admon-info >}}
