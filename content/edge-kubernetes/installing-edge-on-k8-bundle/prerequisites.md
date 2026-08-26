---
weight: 10
title: Prerequisites
layout: redirect
---

|<div style="width:170px">Item</div>|Details|
|:---|:---|
|CPU|<p>6 cores, x86-64 architecture.</p><p>**The CPU must support AVX instructions** (required by MongoDB). Verify with `lscpu` on the target host. AVX2 is **not** required.</p>|
|RAM|10 GB|
|Disk space|<p>100 GB.</p><p>Most of this is consumed as Kubernetes Persistent Volumes; the underlying storage depends on your Kubernetes distribution and configured storage classes. If you install with the **c8yedge** tool, this space is consumed under `/var/lib/rancher/`.</p>|
|Add-on: {{< product-c8y-iot >}} Messaging Service|When enabled, add **2 CPU cores**, **4 GB RAM**, and **15 GB disk** on top of the base requirements above.|
|Add-on: {{< product-c8y-iot >}} DataHub|<p>When enabled, add **10 CPU cores** (minimum 6), **16 GB RAM** (minimum 10 GB), and **100 GB disk** on top of the base requirements above.</p><p>DataHub's data lake contents should be written to a NAS location of your choice rather than to the local Persistent Volume.</p>|
|Add-on: custom microservices|These are the minimum system requirements for deploying Edge itself. Any custom microservice resource needs must be allocated **on top of** the requirements above. For example, a microservice needing 2 CPU cores and 4 GB RAM means the Kubernetes node must have an additional 2 CPU cores and 4 GB RAM available.|
|Edge license file|<p>To request the license file for Edge, [contact product support](/additional-resources/contacting-support/).</p><p>In the email, you must include:</p><ul><li>Your company name, under which the license has been bought.</li><li>The domain name (for example, *myown.iot.com*), where Edge will be reachable.</li></ul><p>For more information, see [Domain name validation for Edge license key generation](/edge-kubernetes/installing-edge-on-k8/#domain-name-validation-for-edge-license-key-generation).</p>|
|Edge registry credentials|You will receive the Edge registry credentials along with the Edge license.|
|TLS/SSL key and certificates|<p>Optional.</p><p>TLS/SSL private key and domain certificates in PEM format. Generate a TLS/SSL key pair and a Certificate Signing Request (CSR) following your organization's policies, specifying either a wildcard domain in the Common Name (CN) (for example, **.iot.com*) or listing required domains in the Subject Alternative Name (SAN) field, including the Edge tenant, {{< management-tenant >}}, and, if applicable, {{< product-c8y-iot >}} DataHub domains (for example, *myown.iot.com*, *management-myown.iot.com*, *datahub-myown.iot.com*).</p><p>Verify that the TLS/SSL certificate includes the complete certificate chain in the correct order.</p>|
|Connect Edge to the cloud|<p>Optional.</p><p>To connect and manage one or more Edge deployments from your {{< product-c8y-iot >}} cloud tenant, you will need an active {{< product-c8y-iot >}} {{< standard-tenant >}} with a subscription plan that includes the _advanced-software-mgmt_ microservice.</p><p>See [Registering Edge in the cloud tenant](/edge-kubernetes/k8-edge-connecting-edge-to-cloud/#k8-edge-register-edge-on-cloud) for the configuration steps.</p>|

### Domain name validation for Edge license key generation

To procure the Edge license, you must provide the right domain name to product support for Edge license key generation.

When you provide the domain name, consider the following points:

* The domain name does not need to be a Fully Qualified Domain Name (FQDN). For example, to access Edge with the domain name **myown.iot.com**, request the Edge license for **myown.iot.com** or **iot.com** (without the subdomain **myown**).

* If you exclude the subdomain from the domain name in the Edge license, you must possess a wildcard SSL certificate which can be used with multiple subdomains (**myown** or others) of the domain (**iot.com**).<br>
For example, if you provide **iot.com** as the domain name, you must possess an SSL certificate for **.iot.com**.

* If you have an Internationalized Domain Name (IDN), then you must provide the translated ASCII equivalent domain name.<br>
For example, if your domain name is **myown.iöt.com** (for example, containing **ö**), then you must use **myown.xn--it-fka.com**.<br>Also, provide the same translated ASCII equivalent domain name as the tenant domain name during the Edge installation process.<br>

	{{< c8y-admon-info >}}
An Internationalized Domain Name (IDN) is an internet domain name that contains at least one label, in whole or in part, in a language-specific script or alphabet, such as Arabic, Chinese, Cyrillic, Devanagari, Hebrew or the Latin alphabet-based characters with diacritics or ligatures, such as French. The internationalization of domain names is a technical solution to translate names written in language-native scripts into an ASCII text representation that is compatible with the Domain Name System. See [Wikipedia](https://en.wikipedia.org/wiki/Internationalized_domain_name).
	{{< /c8y-admon-info >}}

* Ensure that you adhere to the following domain name validation rules:
	* The domain name must be a combination of case-insensitive alphanumeric characters (a-z, 0-9) separated by dot ( . ) or hyphen ( - ).
		* Cannot contain non-ASCII letters from scripts such as Chinese, Cyrillic, or Arabic, or Latin letters with diacritics. If your domain contains such characters, supply its Punycode (xn--...) ASCII equivalent, as described above.
		* Cannot contain any special characters like (+ , ! @ # $ % ^ & * ( ) ; \ \ / | < > \ " \ ' ) other than dot ( . ) or hyphen ( - ).
	* The length of the domain name including the dot must not exceed 255 characters.
	* The domain name must contain at least one dot.
	* Each segment of the domain name must be separated by a dot.
		* The domain name must be between 1 to 63 characters long.
		* The Top-Level Domain (TLD) which refers to the last segment of the domain name must be between two to six characters long.
		* The domain name cannot begin or end with a hyphen.

