---
weight: 40
title: Domain name
layout: redirect
sector:
  - platform_administration
---

A key feature of the {{< enterprise-tenant >}} is the ability to operate the {{< product-c8y-iot >}} platform using a custom domain name. This means that you can configure the platform to serve you and your customers using a host name of choice, for example *.iot.mycompany.com rather than the default URL of {{< product-c8y-iot >}}. In addition you'll be able to create subtenants
using your domain. These will be using **\<subtenantName\>.iot.mycompany.com** as their host names.

{{< c8y-admon-req >}}
APPLICATION ACCESS:

The domain management feature comes as default with the {{<enterprise-tenant>}} tenant and is available in the Administration application.

The domain management functionality is enabled by subscribing to the "sslmanagement" microservice.

ROLES & PERMISSIONS:

* To upload certificate:
    * READ, ADMIN permission for the "Inventory" permission type;
    * READ, ADMIN permission for the "Options management" permission type;
    * READ, ADMIN permission for the "Application management" permission type;

On tenant creation, there are default roles available that can be used as a sample configuration for the above-mentioned permissions:
* Tenant Manager - manages tenant-wide configurations like applications, tenant options and retention rules

PREREQUISITES

There are three prerequisites for using a custom domain:

1. To activate your domain, a valid license that covers your wildcard domain is required.
   Please contact [product support](/additional-resources/contacting-support/) to install a license for your domain.
2. You've obtained a valid wildcard SSL certificate for your IoT domain, for
   example a certificate for *\*.iot.mycompany.com*.
3. There is a valid DNS configuration for your domain which ensures that all requests to *\*.iot.mycompany.com* are
   routed to {{< product-c8y-iot >}}. (see below).

SSL CERTIFICATE REQUIREMENTS

The following criteria must be met by any SSL certificate to be used with the {{< enterprise-tenant >}} feature:

* The certificate is currently valid and has not expired. More specifically, validFrom points to a point in time in the
  past, and validTo to a point in the future.
* The certificate has been issued by a well-established certificate authority (CA). Self-signed certificates are
  explicitly not supported.
* The certificate is a wildcard certificate issued for your domain *\*.iot.mycompany.com*. The use of a wildcard
  certificate is mandatory, as it will also be used for subdomains created from your {{< enterprise-tenant >}}.
* Every single certificate in the chain is provided using the X509 format.
* The common name (CN) in the subject of the primary certificate (the first one in the chain) holds the value of your
  wildcard domain name, for example, "CN=\*.iot.mycompany.com".

{{< product-c8y-iot >}} supports a single certificate that is signed by the root CA, as well as a full chain certificate which
contains one or more intermediate certificates.

{{< /c8y-admon-req >}}


{{< c8y-admon-info >}}
The custom domain name functionality is only available for {{< product-c8y-iot >}} cloud installations or on-prem installations which don't use a custom load balancer.
{{< /c8y-admon-info >}}


### To package the SSL certificate in PKCS #12 {#to-package-the-ssl-certificate-in-pkcs-12}

In order to use an SSL certificate with {{< product-c8y-iot >}}, the certificate together with its private key must be uploaded to the platform in a single file, using the PKCS #12 file format.

Most certificate authorities deliver their certificates and corresponding private keys in the PEM file format, using two
separate text files for the certificate chain and the private key. Make sure that the private key is not
protected with a password/passphrase.

Such PEM files can easily be repackaged into #PKCS #12 using [OpenSSL](https://www.openssl.org/). In the following
example, OpenSSL is used to combine a certificate chain (*chain.cert*) and the corresponding key (*privkey.pem*) into a
PKCS #12 keystore file (*out_keystore.p12*) that can be used with {{< product-c8y-iot >}}.

```shell
openssl pkcs12 -export -out out_keystore.p12 -inkey privkey.pem -in cert.pem -certfile chain.pem
```

### DNS requirements for enterprise domains {#dns-requirements-for-enterprise-domains}

The DNS entries for your custom domain must be configured in a way that all requests are routed to the {{< product-c8y-iot >}} platform.

We **strongly recommend** you to use a wildcard CNAME entry for this purpose. The CNAME must contain your wildcard
domain from the certificate in the NAME field. The VALUE field of the CNAME entry must point to the hostname of {{< product-c8y-iot >}}. This target hostname can be easily determined by looking at your current tenant URL. If your tenant URL
is *http://mytenant.{{< domain-c8y >}}*, the target hostname is *mytenant.{{< domain-c8y >}}*. Please also make sure to delete any
conflicting A entries.

**Example:**

If you want to use **.iot.mycompany.com* for your enterprise subtenants and if you're using the {{< product-c8y-iot >}} at *mytenant.{{< domain-c8y >}}*, the following CNAME entry must be added to your DNS zone:

```shell
NAME                   TYPE   VALUE
----------------------------------------------------
*.iot.mycompany.com.   CNAME  mytenant.{{< domain-c8y >}}.
```

We highly discourage any use of alternative DNS configurations for the following reasons:

- *Wildcard A entries* take the IP address of the platform in the value field and hence redirect all requests based on
  the given IP rather than a hostname. This results in major problems if the IP address of the IoT platform should
  change in the future.
- *Singular A entries or singular CNAME entries* instead of DNS wild cards require a single DNS entry for each
  enterprise domain being created. This is very error prone and prevents the creation of subtenants without always
  tampering with DNS settings.

### To upload the certificate and activate your domain {#to-upload-the-certificate-and-activate-your-domain}

Once the DNS configuration is in place and if a certificate with the given requirements is available, it can be easily
uploaded to the platform.

On the **Domain name** tab in the **{{< enterprise-tenant >}}** page, click **Upload certificate**. Select the certificate from your file system and click **Upload**.

Afterwards, you can activate the domain with a single click on its name. After the domain has been activated, you will be redirected
to your {{< enterprise-tenant >}} using the new domain name. You will also receive an email with information about the
activation. Note that your {{< management-tenant >}} domain name is static, for example, if your wildcard domain is "*
.iot.mycompany.com" then your {{< management-tenant >}} domain will be "management.iot.mycompany.com".

{{< c8y-admon-info >}}
After the activation is completed you will no longer be able to access your tenant with the {{< product-c8y-iot >}} domain name. Instead, use your custom domain name.
{{< /c8y-admon-info >}}

### To update your certificate {#to-update-your-certificate}

When your certificate expires, you must update your certificate with a new one with an extended validation period. When updating a certificate, you must make sure that the certificate meets the following requirements:

* It is valid, like when being uploaded for the first time.
* It is currently valid (validFrom in the past and validTo in the future).
* It has exactly the same common name (domain name) as the currently active certificate.

{{< c8y-admon-info >}}
Keep in mind that after replacing the certificate it may take some minutes until the new certificate has been delivered to the users/browsers.
{{< /c8y-admon-info >}}


### To deactivate your certificate {#to-deactivate-your-certificate}

If you wish to return to your old domain at {{< product-c8y-iot >}}, you can simply deactivate you certificate.

{{< c8y-admon-important >}}
Use with care. Your customers will not be able to access their subtenants anymore.
{{< /c8y-admon-important >}}

### Troubleshooting {#troubleshooting}

In case you cannot reach {{< product-c8y-iot >}} using your custom domain, we recommend you to perform the following checks to verify your DNS setup.

**Check if the DNS entry is correct**

Execute the following command:

```shell
host management.<your domain name>
```

The following result should be returned:

```shell
management.<your domain name> is an alias for <instance domain name>
<instance domain name> has address <ip address>
```


**Check if the API is responding**

Execute the following command:

```shell
curl -v -u '<tenant ID>/<your user>:<your password>' --head http://management.<your domain name>/inventory/managedObjects
```

The following result should be returned:

```shell
...
HTTP/1.1 200 OK
...
```


{{< c8y-admon-info >}}
Keep in mind that after changing the DNS entry it might take up to 24 hours until the new entry has been propagated.
{{< /c8y-admon-info >}}
