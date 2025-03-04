---
weight: 20
title: Creating a certificate authority (CA)
layout: redirect
---

The {{< product-c8y-iot >}} certificate management allows {{< product-c8y-iot >}} to sign and issue certificates. Along with the trust anchor certificates the list of certificates in a  tenant shows the {{< product-c8y-iot >}} signed certificates. The {{< product-c8y-iot >}} signed certificates are identifiable by the words TENANT CA.
In this tutorial, you will learn how to create a certificate authority (CA) for a tenant with {{< product-c8y-iot >}}.

### Prerequisites {#prerequisites}

In order to follow this tutorial, check the following prerequisites:

* You have a valid tenant, a user and a password in order to access {{< product-c8y-iot >}}.
* The Certificate Authority feature is enabled on instance and tenant level.
* For enabling this feature on instance level need to contact support to enable.
* On tenant level we can simply check with this API:

      GET /features/certificate-authority
      Content-Type: application/json
      Authorization: Basic <<Base64 encoded bootstrap credentials>>

If we get 400 or 200 with `active: false` then it is disabled for tenant. 

    HTTP/1.1 200 OK
    Content-Type: application/json
    Content-Length: ...
    {
        "phase":"PUBLIC_PREVIEW",
        "active":false,
        "strategy":"TENANT",
        "key":"certificate-authority"
    }
For enabling this feature we need to call this API

    PUT /features/certificate-authority/by-tenant
    Content-Type: application/json
    Authorization: Basic <<Base64 encoded bootstrap credentials>>
    ...
    {
       "phase": "PUBLIC_PREVIEW",
       "active": true,
       "strategy": "TENANT",
       "key": "certificate-authority"
    }
This call can be done by executing the following curl statement:
  
    curl -v -u <username>:<password> \
       -H 'Content-Type: application/json' \
       -X PUT \
       -d '{"phase": "IN_DEVELOPMENT","active": true,"strategy": "TENANT","key": "certificate-authority"}' \
       https://<{{< product-c8y-iot >}} tenant domain>/features/certificate-authority/by-tenant

Replace `<username>`, `<password>` with the appropriate credentials given to you when registering with {{< product-c8y-iot >}}.

**Via REST:**

For creating a new tenant's certificate authority(CA) create certificate authority API need to be called. These following things happen when we call this API:

* A new key pair is created and a certificate is self-signed with `tenantID` as the Common Name (CN).
* The private key is stored in an encrypted tenant option.
* Store the certificate in the trusted certificate repository with auto-registration unchecked by default. The devices can be registered automatically only when device administrator checks this option ON.
* If the CA certificate is removed from the trusted certificate list, remove the corresponding private key from the database collection.
* If a CA is already present, return a message indicating the CA is already present.
* Tenant CA certificate can also be created via UI
Moreover, if the CA is removed from the trusted certificate list, the corresponding private key is removed from the database collection.
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
This certificate identified as a TENANT CA and it has attribute `tenantCertificateAuthority":true`.

{{< c8y-admon-info >}}
Note that it is possible to call this endpoint without the ROLE_TENANT_MANAGEMENT_ADMIN or ROLE_TENANT_MANAGEMENT_READ role, but only when user is a service user. Otherwise, if the the user does not have the required role, an HTTP response 403 will be returned.
<section><h5>Required roles</h5>
ROLE_TENANT_MANAGEMENT_ADMIN
ROLE_TENANT_MANAGEMENT_READ
</section>
{{< /c8y-admon-info >}}

**Via UI:**

If it is disabled then button `Add CA certificate` is not visible.

![CA is disabled](/images/certificate-authority/disabledCertificateAuthority.png)

We can simply follow instructions from [Prerequisites](#prerequisites) to enable it. After enabling UI will have button `Add CA certificate`.

![CA is enabled](/images/certificate-authority/enabledCertificateAuthority.png)

1. In the Device Management application, navigate to the **Management** menu in the navigator and select **Trusted certificates**.
2. Right corner there is a button `Add CA certificate`, after clicking this button CA will be created and listed down in page **Trusted certificates**.
3. Same things will be created when CA is created which is mentioned in API section.
4. After CA is created button `Add CA certificate` will be disabled. And from API we will not be able to create CA certificate as each tenant can have maximum one tenant CA.

Then new CA certificate will be added to the trusted certificates list:

![Trusted CA certificate added](/images/certificate-authority/trustedCAadded.png)
