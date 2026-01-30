---
weight: 50
title: Simple device enrollment
layout: bundle
---

In this tutorial, you will learn how to create a device certificate which is signed by a tenant's Certificate Authority (CA) with {{< product-c8y-iot >}} using the existing [bulk device registration](/device-management-application/registering-devices/#bulk-device-registration).

To connect larger amounts of devices, {{< product-c8y-iot >}} offers the option to bulk-register devices, that means, to register larger amounts of devices by uploading a CSV file.
The CSV files must contain at least the **ID** as device identifier, **AUTH_TYPE** as `CERTIFICATES` and **ENROLLMENT_OTP** as one time password of the devices.
In addition to these columns the file can also contain other columns like ICCID, NAME, TYPE as shown in the following example:

```
ID;TYPE;NAME;ICCID;IDTYPE;PATH;SHELL;AUTH_TYPE;ENROLLMENT_OTP
006064ce800a;c8y_Device;Sample_Device1;+491555555;c8y_Serial;bulk group/subgroup1;1;CERTIFICATES;somePassword@123
006064ce8077;c8y_Device;Sample_Device2;+491555555;c8y_Serial;bulk group/subgroup2;1;CERTIFICATES;password@345
```

* These EST [Enrollment Over Secure Transport](https://www.sectigo.com/resource-library/what-is-enrollment-over-secure-transport) devices will be added to the Bulk devices registration list, with their status set to Accepted.
* These enrollment OTPs (value of column `ENROLLMENT_OTP`) act as temporary device user credentials, which are used for authentication when calling the `/.well-known/est/simpleenroll` endpoint.
* This enhancement simplifies the enrollment process for multiple devices, ensuring a seamless and secure onboarding experience.

### Prerequisites {#prerequisites}

In order to follow this tutorial, check the following prerequisites:

* You have a valid tenant, a user and a password in order to access {{< product-c8y-iot >}}.
* A Certificate Authority (CA) has already been created for this tenant.

### Enroll a device certificate {#enroll-a-device-certificate}

On creating a new device certificate the Device enroll API is called. This triggers the following actions:

* The Device enroll API is used by a device to get a fresh new certificate.
* If no CA is available an error occurred with message `Tenant CA certificate is either missing, expired, or has a validity of less than one year`.
* If tenant's keypair is not found then an error occurred with message `Failed to retrieve tenant keypair`.
* The Common Name (CN) field in the Certificate Signing Request (CSR) subject must exactly match the device ID supplied during the device registration process. If the request does not contain a valid [Certificate Signing Request](https://en.wikipedia.org/wiki/Certificate_signing_request) an error will be returned. 

{{< c8y-admon-info >}}
As per [EST standards](https://datatracker.ietf.org/doc/html/rfc7030#autoid-58), the certificate in response is in `PKCS7` format by default. Clients can optionally request for a `PKCS10` format by sending `Accept: application/pkcs10` in the request header.
{{< /c8y-admon-info >}}

This is an example of a REST request without `Accept: application/pkcs10` (default):

    POST /.well-known/est/simpleenroll
    Authorization: Basic <<Base64 encoded bootstrap credentials>>
    Content-Type: application/pkcs10
    Content-Transfer-Encoding: base64
    ...
    {
        MIICVjCCAT4CAQAwETEPMA0GA1UEAwwGSWRfMTA0MIIBIjANBgkqhkiG9w0BAQEF
        AAOCAQ8AMIIBCgKCAQEAtz41ucrtb28Hk4FDkGK19DRHD6Z3oyZ6CtS1xycWkf9h
        za+6DI6ugBLRsxgRQi+VcBSQ8BRgPQTj3eEKi6s+7ySLpzuA4HlihPWo7dWhioXM
        3lZ4jiyPlCAZALYHNWbgk6Pehk6eNKMz8998Kq2GnzUQ65grAjjr4Q+HQJGOUYx/
        gsEQoCdhKRjG0xcI75OE+CW9Wg/VU4RMboMke5LUNHwnHIDy8Ie2C3VozVS6mRgE
        1VIBXWDm9fjaGEzYf25yWk0fzo/d/osLxReJgBq3FOz1TM4m9c3CtJUiedVXmeuf
        OPwNlTjGDOWgQfeMmXaPC0jHp0YNfV+txdWwEPev6QIDAQABoAAwDQYJKoZIhvcN
        AQELBQADggEBAHIZu0WR6hfiIsPxhBrdo5w0bt/2X6gy+tHdTI017rf1FUww6OLs
        wKtpPC0km4BS20hxbD9NLb3FNQEUCf80YQFSGbi0ziY0okVN7gaes6XiNofZbYx9
        TQF0oo+QWTa+otjoXpw8lLY9Ak6T9MppYh2GlRIiio2VzFu4Vg+FEoyNw9jvQwLj
        LP0eYTIQ/2SX1DnxMBzCm4MzieXJ7DJPHAdqADUfKbFNuaVjdxG9uRZdP3LRL90g
        6YxfFb8c+RcOL/lAKdSP5/rIUI05z0agzGMajsEnqxRXSk+CwlZo2D02++STStY9
        pELozQsItNjEVrfWta6353kOguYYqjB1rNY=
    }

The following response is returned:

    HTTP/1.1 201 OK
    Content-Type: application/pkcs7-mime;smime-type=certs-only
    Content-Length: ...
    {
        MIIBpQYJKoZIhvcNAQcCoIIBljCCAZICAQExADALBgkqhkiG9w0BBwGgggF6MIIB
        djCCARygAwIBAgIDCnqWMAoGCCqGSM49BAMCMBcxFTATBgNVBAMTDGVzdEV4YW1w
        bGVDQTAeFw0yNTA1MjIwNjUwMzJaFw0yNjA1MjIwNjUwMzJaMBQxEjAQBgNVBAMM
        CWV4YW1wbGUwMTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABI882KOUAoc5DCKF
        u0zansWbtL84zKJa7SnconIF3AYjvHl3zBUnkv+/7+tSA13mBbYdq4oGh6Yg83zj
        zhEJ0eujWjBYMAkGA1UdEwQCMAAwCwYDVR0PBAQDAgeAMB0GA1UdDgQWBBTsMXNm
        ZMWaR8B74Imk6XckmUvOXTAfBgNVHSMEGDAWgBQa3zmEwlbmbM8qtCal/QzSQ/U9
        PjAKBggqhkjOPQQDAgNIADBFAiEAhrhYYDGcvsFkJpg9U4fr8d7LuqearEnMn+TF
        RWWgCmICIGPUvHHKzSc8GbgwuKddhe0Ef+HTamyEmqQBX3z/iE3GMQA=
    }

And an example of a REST request with `Accept: application/pkcs10` (optional):    

    POST /.well-known/est/simpleenroll
    Authorization: Basic <<Base64 encoded bootstrap credentials>>
    Content-Type: application/pkcs10
    Content-Transfer-Encoding: base64
    Accept: application/pkcs10
    ...
    {
        MIICVjCCAT4CAQAwETEPMA0GA1UEAwwGSWRfMTA0MIIBIjANBgkqhkiG9w0BAQEF
        AAOCAQ8AMIIBCgKCAQEAtz41ucrtb28Hk4FDkGK19DRHD6Z3oyZ6CtS1xycWkf9h
        za+6DI6ugBLRsxgRQi+VcBSQ8BRgPQTj3eEKi6s+7ySLpzuA4HlihPWo7dWhioXM
        3lZ4jiyPlCAZALYHNWbgk6Pehk6eNKMz8998Kq2GnzUQ65grAjjr4Q+HQJGOUYx/
        gsEQoCdhKRjG0xcI75OE+CW9Wg/VU4RMboMke5LUNHwnHIDy8Ie2C3VozVS6mRgE
        1VIBXWDm9fjaGEzYf25yWk0fzo/d/osLxReJgBq3FOz1TM4m9c3CtJUiedVXmeuf
        OPwNlTjGDOWgQfeMmXaPC0jHp0YNfV+txdWwEPev6QIDAQABoAAwDQYJKoZIhvcN
        AQELBQADggEBAHIZu0WR6hfiIsPxhBrdo5w0bt/2X6gy+tHdTI017rf1FUww6OLs
        wKtpPC0km4BS20hxbD9NLb3FNQEUCf80YQFSGbi0ziY0okVN7gaes6XiNofZbYx9
        TQF0oo+QWTa+otjoXpw8lLY9Ak6T9MppYh2GlRIiio2VzFu4Vg+FEoyNw9jvQwLj
        LP0eYTIQ/2SX1DnxMBzCm4MzieXJ7DJPHAdqADUfKbFNuaVjdxG9uRZdP3LRL90g
        6YxfFb8c+RcOL/lAKdSP5/rIUI05z0agzGMajsEnqxRXSk+CwlZo2D02++STStY9
        pELozQsItNjEVrfWta6353kOguYYqjB1rNY=
    }

 The following response is returned:

    HTTP/1.1 201 OK
    Content-Type: application/pkcs10
    Content-Length: ...
    {
        -----BEGIN CERTIFICATE-----
        MIIBdjCCARygAwIBAgIDCnqWMAoGCCqGSM49BAMCMBcxFTATBgNVBAMTDGVzdEV4
        YW1wbGVDQTAeFw0yNTA1MjIwNjUwMzJaFw0yNjA1MjIwNjUwMzJaMBQxEjAQBgNV
        BAMMCWV4YW1wbGUwMTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABI882KOUAoc5
        DCKFu0zansWbtL84zKJa7SnconIF3AYjvHl3zBUnkv+/7+tSA13mBbYdq4oGh6Yg
        83zjzhEJ0eujWjBYMAkGA1UdEwQCMAAwCwYDVR0PBAQDAgeAMB0GA1UdDgQWBBTs
        MXNmZMWaR8B74Imk6XckmUvOXTAfBgNVHSMEGDAWgBQa3zmEwlbmbM8qtCal/QzS
        Q/U9PjAKBggqhkjOPQQDAgNIADBFAiEAhrhYYDGcvsFkJpg9U4fr8d7LuqearEnM
        n+TFRWWgCmICIGPUvHHKzSc8GbgwuKddhe0Ef+HTamyEmqQBX3z/iE3G
        -----END CERTIFICATE-----
    }   

### Re-enroll a device certificate {#re-issue-device-certificate}

The Device re-enroll API is used by a device to renew its certificate or to substitute the current credentials for a certificate (a password or a certificate generated by another CA). The device has to authenticate itself using its password or a JWT token.

    POST /.well-known/est/simplereenroll
    Authorization: Basic <<Base64 encoded bootstrap credentials>>
    Content-Type: application/pkcs10
    Content-Transfer-Encoding: base64
    ...
    {
        MIICVjCCAT4CAQAwETEPMA0GA1UEAwwGSWRfMTA0MIIBIjANBgkqhkiG9w0BAQEF
        AAOCAQ8AMIIBCgKCAQEAtz41ucrtb28Hk4FDkGK19DRHD6Z3oyZ6CtS1xycWkf9h
        za+6DI6ugBLRsxgRQi+VcBSQ8BRgPQTj3eEKi6s+7ySLpzuA4HlihPWo7dWhioXM
        3lZ4jiyPlCAZALYHNWbgk6Pehk6eNKMz8998Kq2GnzUQ65grAjjr4Q+HQJGOUYx/
        gsEQoCdhKRjG0xcI75OE+CW9Wg/VU4RMboMke5LUNHwnHIDy8Ie2C3VozVS6mRgE
        1VIBXWDm9fjaGEzYf25yWk0fzo/d/osLxReJgBq3FOz1TM4m9c3CtJUiedVXmeuf
        OPwNlTjGDOWgQfeMmXaPC0jHp0YNfV+txdWwEPev6QIDAQABoAAwDQYJKoZIhvcN
        AQELBQADggEBAHIZu0WR6hfiIsPxhBrdo5w0bt/2X6gy+tHdTI017rf1FUww6OLs
        wKtpPC0km4BS20hxbD9NLb3FNQEUCf80YQFSGbi0ziY0okVN7gaes6XiNofZbYx9
        TQF0oo+QWTa+otjoXpw8lLY9Ak6T9MppYh2GlRIiio2VzFu4Vg+FEoyNw9jvQwLj
        LP0eYTIQ/2SX1DnxMBzCm4MzieXJ7DJPHAdqADUfKbFNuaVjdxG9uRZdP3LRL90g
        6YxfFb8c+RcOL/lAKdSP5/rIUI05z0agzGMajsEnqxRXSk+CwlZo2D02++STStY9
        pELozQsItNjEVrfWta6353kOguYYqjB1rNY=
    }

The following response is returned:

    HTTP/1.1 201 OK
    Content-Type: application/pkcs7-mime;smime-type=certs-only
    Content-Length: ...
    {
        -----BEGIN CERTIFICATE-----
        MIIEGjCCAwKgAwIBAgIEEgEgJDANBgkqhkiG9w0BAQsFADBSMQswCQYDVQQGEwJF
        VTELMAkGA1UECAwCUEwxGzAZBgNVBAoMEklvdCBEZXZpY2UgRmFjdG9yeTEZMBcG
        A1UEAwwQSW90RGV2RmFjdG9yeUludDAeFw0yNDA5MDIxMjA1MDlaFw0yNTA5MTIx
        MjA1MDlaME8xCzAJBgNVBAYTAkVVMQswCQYDVQQIDAJQTDEbMBkGA1UECgwSSW90
        IERldmljZSBGYWN0b3J5MRYwFAYDVQQDDA1Jb3REZXZpY2UyMDAwMIIBIjANBgkq
        hkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAumzj99zMfC9wyTHun3dEIsL/wk3VyWTw
        dtgdFx/lt5uPfvTAJ62GLWzYsCe2Q54G13IG/S1SJTfsNURlvUrPvXed97/yhe/o
        g0IjLz5VGNfsNUw+51KI7Tcc1SunHvUKD7TtgZ4rVga5q1DFxmzZ/dFXJpG5VAgu
        pwojACMv+T6qKGlUsF5F/1coOVrUo26aby4mg7C6ZsbwzXj2PbIvNXHCcrBrUU7S
        L2EI89RTgFZCVnZtW1SozDBn8S+WafKFBSgD0GwNtAkkffNWji1fW645gDc80u7w
        bQuA/xtPXK6+giGB8jN3daVjp6pzbzrYzDTYoC2vyL2A4F4zUedBhwIDAQABo4H6
        MIH3MAkGA1UdEwQCMAAwEQYJYIZIAYb4QgEBBAQDAgWgMDMGCWCGSAGG+EIBDQQm
        FiRPcGVuU1NMIEdlbmVyYXRlZCBDbGllbnQgQ2VydGlmaWNhdGUwHQYDVR0OBBYE
        FONhE6IdItEwn95lmf7uKjVLYpJ1MB8GA1UdIwQYMBaAFFSopCQWaJLzT3DYQi8n
        +nA1S86RMA4GA1UdDwEB/wQEAwIF4DAdBgNVHSUEFjAUBggrBgEFBQcDAgYIKwYB
        BQUHAwEwMwYDVR0fBCwwKjAooCagJIYiaHR0cDovL2xvY2FsaG9zdDoxNTAwMC9v
        bmxpbmUtY3JsczANBgkqhkiG9w0BAQsFAAOCAQEAJmPPKVSR4nAf8TZG3dPeGRX4
        V6a8mT52HKQYTilicq0cwec1zSyjayX6lsvqbENkA/L8fN64fpOSmb/+HUbSWP7Y
        F3ZYKalZVS9XlDUz6TWSA1LiWiDx1E28W2ubCOzUBRg7ux+59hoSGldtGrpxZ1Ox
        +H9kemart76xC+l85EYys7YARL5vk5Jwyr/f1/FpXasaGBFbC4aJ+2fNJkn1LJal
        II8Fl3GElheLpYM20VNw2J0PoD8I17htLfT+j7IwPyJ+uZcNxl60GiqDoBafRWuq
        oTL1SYqewv/dTU98aZUXG9yFLPgldQ2YfMli6vOC2gcjW2vun+IP7T/5ZU/xtA==
        -----END CERTIFICATE-----
    }
