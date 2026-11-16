---
weight: 30
title: Device authentication
layout: redirect
---

Devices can authenticate to the {{< product-c8y-iot >}} platform using:
* Device user credentials, that is, using the device username and password,
* Certificate Authentication, that is, using X509 certificates over a defined REST endpoint protocol to procure the JWT session token on port 8443.

Mutual TLS (mTLS) is a security protocol that uses X.509 certificates for both client and server authentication in a communication session.

The mTLS protocol is commonly used to secure [connections](/data-broker/data-broker-application/) in web services, APIs, and other networked applications. When generating tokens using mTLS, the process involves the authentication of both the client and the server using X.509 certificates.

Retrieving device access tokens from the platform with certificates does not require the tenant ID, username and password. Authentication information will be obtained from the certificates.
The device access token can be retrieved by sending only the device leaf certificate if an immediate issuer of the device certificate is uploaded to the trusted certificates list. If the uploaded trusted certificate is not an immediate issuer of the device certificate but belongs to the device's chain of trust, then the device must send the entire certificate chain in the `X-Ssl-Cert-Chain` to be authenticated successfully and retrieve the device access token.
You can define which organization you trust by uploading the CA certificate (root/intermediate) to {{< product-c8y-iot >}}. For details, see [Trusted certificates](/device-certificate-authentication/device-certificates). Alternatively, you can use the Certificate Authority feature. In this case, the root CA certificate is created by {{< product-c8y-iot >}}, along with a device certificate that is signed by this CA. For details, see [Certificate Authority](/device-certificate-authentication/certificate-authority).

### JWT session token retrieval {#jwt-session-token-retrieval}

The devices can authenticate using X.509 certificates against {{< product-c8y-iot >}} by using the below endpoint only. In response, a JWT session token is issued by {{< product-c8y-iot >}} after successful authentication which can later be used to make subsequent requests.

The device access token API can be called by executing the following curl statement:

    curl -v --cert domain-cert.pem --key domain-private-key.pem \
       -H 'Accept: application/json' \
       -H 'X-Ssl-Cert-Chain:<device certificate chain>' \
       -X POST \
       https://<{{< product-c8y-iot >}} tenant domain>:8443/devicecontrol/deviceAccessToken

Replace `<device certificate chain>` with your valid certificate chain when registering with {{< product-c8y-iot >}}. The header `X-Ssl-Cert-Chain` is not mandatory if you have an immediate issuer of the device certificate in {{< product-c8y-iot >}}.

    curl -v --cert domain-cert.pem --key domain-private-key.pem \
       -H 'Accept: application/json' \
       -X POST \
       https://<{{< product-c8y-iot >}} tenant domain>:8443/devicecontrol/deviceAccessToken

You will receive a response like that:

    HTTP/1.1 200 Success
    Content-Type: application/vnd.com.nsn.cumulocity.managedobject+json; charset=UTF-8; ver=0.9
    ...
    {
        "accessToken": "eyJhbGciOiJSUI6IkpXVCJ9.eyJktYTJmYy0x...S 04HPk3GQUd-fHyJ2oKSuetWFWpUSBPzJzl_73_3yauIlplHorlSoQ"
    }
A device token is used to access {{< product-c8y-iot >}} via REST calls. There is no need to send the certificate in subsequent requests once a device token is acquired.
A device token lifetime can be configured using tenant options with a category of `oauth.internal` and a key of `device-token.lifespan.seconds`.
The default value is 1 hour.
The minimum allowed value is 5 minutes.
Refer to the [Tenant API](https://{{< domain-c8y >}}/api/core/#tag/Tenant-API) in the {{< openapi >}} for more details.

It is recommended that the devices invalidate the session by explicitly calling the `logout` API before closing the HTTP connection. This will avoid any misuse of JWT session tokens generated.
Here is the logout API. Refer to the [Users API](https://{{< domain-c8y >}}/api/core/#tag/Users) in the {{< openapi >}} for more details.

        POST /user/logout
        Accept: application/json
        Content-Type: application/json
        Authorization: Bearer "JWT Session token"

{{< c8y-admon-caution >}}
Only devices that are registered to use certificate authentication can retrieve a JWT session token using this endpoint. Once the device successfully authenticates using certificates (that is, by using its private key and the certificate chain), the device retrieves the JWT session token. This mTLS over HTTP endpoint can be leveraged only over this endpoint on port 8443.
{{< /c8y-admon-caution >}}
