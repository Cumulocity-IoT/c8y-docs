---
weight: 100
title: Test
layout: bundle
sector:
  - terms_conditions
---


### Turning off the device authentication via certificates {#turning-off-device-authentication-via-certificates}

The two-way SSL support is enabled by default since version 10.7.0.
To disable it, change the following rule in the Chef configuration file to:

```
"MQTTClientCert" => {
    "enabled" => false,
}
```

*   `enabled` - enables two-way SSL on the port 8883 and lets devices authorize using a certificate with TCP (it is not available with WebSockets right now).

### Returning accepted issuers by the platform {#returning-accepted-issuers-by-the-platform}

The platform can return trusted issuers during the SSL handshake to let the device verify, if it contains a trusted certificate in its chain of certificates. More detailed information is available in the [RFC](https://tools.ietf.org/html/rfc5246#section-7.4.4), especially in the `certificate_authorities` paragraph.
It can be set with the platform's property:

```
auth.device-certificates.tls.return-accepted-issuers=true
```

In such a situation the device may choose, based on its implementation, not to send the certificates if they are not signed by any of the trusted issuers.
However, the platform can hide this information and not return any trusted issuers by setting this property to `false`.
In this case the device will always try to authenticate itself by sending its chain of trust.

{{< c8y-admon-info >}}
To support the devices with invalid certificates, which are trying to authenticate themselves by sending a valid username and password, this setting must be set to true to prevent the device from sending an invalid certificate.
{{< /c8y-admon-info >}}

### Proof of Possession support override {#proof-of-posession-support-override}

The Proof of Possession feature allows the tenant admin to prove ownership of his private key to the platform without having to upload it directly. If it is not possible for the admin to carry out this process himself for organizational reasons, the relevant certificate can still be confirmed by support.

The manual confirmation by the support can be achieved as follows:

```
curl --location --request POST '{tenant-url}/tenant/tenants/{tenantId}/trusted-certificates-pop/{certificateFingerprint}/confirmed' --header 'Authorization: Basic {base64EncodedAuthString}' --header 'Content-Type: application/json' --header 'Accept: application/json' -i
```

### Allowing shared trusted certificates across tenants {#allow-shared-trusted-certificate-across-tenants}

The feature flag is disabled by default, which means that each certificate must be unique across tenants. To allow the same trusted certificate to be used across multiple tenants set this property to `true` .
```
system.ssl.shared-truststore.enabled=false
```

Manual confirmation can be achieved as follows:

```
curl --location --request GET '{tenant-url}/tenant/system/options/ssl/shared-truststore.enable' --header 'Authorization: Basic {base64EncodedAuthString}' --header 'Content-Type: application/json' --header 'Accept: application/json' -i
```
{{< c8y-admon-info >}}
The configuration value is NOT to be used in the {{< product-c8y-iot >}} SaaS environments.
Trusted certificates are by default checked to ensure they are unique for each tenant as for MQTT and REST they are used to identify the tenant to which the device should connect. However, some customers who use LWM2M require to use the same trust anchor across multiple tenants. In this case we allow duplicate trust anchors across tenants.
If in doubt, contact the customer Administrator to double-check they do not intend to use MQTT or REST on the instance, as these protocols are not supported for X.509 certificate authentication when this option for duplicate certificates is enabled.
{{< /c8y-admon-info >}}
